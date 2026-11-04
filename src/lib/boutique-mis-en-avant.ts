/**
 * Sélection « mis en avant » de la boutique, affichée sur l'accueil (LOT A, A2).
 *
 * Lue au build depuis `${BOUTIQUE_API_URL}/api/mis-en-avant` (drapeau « mis en avant » et ordre
 * réglés dans le back-office de la boutique). Si la variable est absente, si l'API ne répond pas
 * dans le délai, renvoie une erreur ou une liste vide ou invalide, on retombe sur le fichier de
 * secours versionné `src/data/boutique-mis-en-avant.json` : la section ne s'affiche jamais vide.
 *
 * F-CNV-020 : le fichier de secours ne contient que des produits au prix validé (`docs/donnees-reference.md`) ;
 * les pass dont la grille n'est pas validée (Or, Diamant, Intégral, Génération) n'y figurent pas.
 *
 * Contrat de l'API : liste de `{ slug, nom, image, prixXAF, badge, ordre, paliers? }`, `paliers`
 * étant `[{ prixXAF, debut, fin }]` (ISO 8601). Lecture au build uniquement : aucune requête du
 * visiteur vers la boutique pour afficher l'accueil (NF-CNV-001) ; les photos sont recopiées dans
 * le site (`public/images/boutique/`, non versionné).
 */
import secours from '../data/boutique-mis-en-avant.json';
import type { Palier } from './boutique';

export interface ProduitMisEnAvant {
  slug: string;
  nom: string;
  /** Chemin local de la photo, ou `null` : cadre neutre marqué (jamais d'image inventée). */
  image: string | null;
  prixXAF: number;
  badge: string | null;
  ordre: number;
  paliers?: Palier[];
}

export const NB_MAX_CARTES = 8;
const DELAI_API_MS = 8000;

const estTexte = (v: unknown): v is string => typeof v === 'string' && v.trim() !== '';
const estMontant = (v: unknown): v is number => typeof v === 'number' && Number.isInteger(v) && v > 0;
const estDate = (v: unknown) => estTexte(v) && !Number.isNaN(new Date(v).getTime());

function normaliserPaliers(v: unknown): Palier[] | undefined {
  if (!Array.isArray(v)) return undefined;
  const paliers = v
    .filter((p): p is Palier => !!p && estMontant(p.prixXAF) && estDate(p.debut) && estDate(p.fin))
    .map((p) => ({ prixXAF: p.prixXAF, debut: p.debut, fin: p.fin }))
    .sort((a, b) => new Date(a.debut).getTime() - new Date(b.debut).getTime());
  return paliers.length > 0 ? paliers : undefined;
}

/**
 * Valide une réponse de l'API (ou le fichier de secours) : ne garde que les produits complets,
 * triés par ordre, au plus `NB_MAX_CARTES`. Renvoie une liste vide si rien n'est exploitable.
 */
export function normaliserMisEnAvant(donnees: unknown): ProduitMisEnAvant[] {
  const liste = Array.isArray(donnees) ? donnees : (donnees as { docs?: unknown })?.docs;
  if (!Array.isArray(liste)) return [];
  return liste
    .filter((p) => !!p && estTexte(p.slug) && estTexte(p.nom) && estMontant(p.prixXAF))
    .map((p) => ({
      slug: p.slug.trim(),
      nom: p.nom.trim(),
      image: estTexte(p.image) ? p.image : null,
      prixXAF: p.prixXAF,
      badge: estTexte(p.badge) ? p.badge.trim() : null,
      ordre: typeof p.ordre === 'number' ? p.ordre : Number.MAX_SAFE_INTEGER,
      paliers: normaliserPaliers(p.paliers),
    }))
    .sort((a, b) => a.ordre - b.ordre)
    .slice(0, NB_MAX_CARTES);
}

const IMAGES_DIR = 'public/images/boutique';

/** Recopie la photo dans le site ; en cas d'échec, cadre neutre plutôt qu'une image cassée. */
async function recopierImage(url: string, base: string, fetcher: typeof fetch): Promise<string | null> {
  try {
    const absolue = new URL(url, base);
    const res = await fetcher(absolue, { signal: AbortSignal.timeout(DELAI_API_MS) });
    const nom = absolue.pathname.split('/').pop()?.replace(/[^\w.-]/g, '_');
    if (!res.ok || !nom || !/\.(webp|avif|jpe?g|png)$/i.test(nom)) return null;
    const { mkdir, writeFile } = await import('node:fs/promises');
    await mkdir(IMAGES_DIR, { recursive: true });
    await writeFile(`${IMAGES_DIR}/${nom}`, Buffer.from(await res.arrayBuffer()));
    return `/images/boutique/${nom}`;
  } catch {
    return null;
  }
}

export interface OptionsChargement {
  apiUrl?: string;
  fetcher?: typeof fetch;
  journal?: (message: string) => void;
}

/** Sélection à afficher : celle de l'API si elle est exploitable, sinon le fichier de secours. */
export async function chargerMisEnAvant({
  apiUrl = process.env.BOUTIQUE_API_URL,
  fetcher = fetch,
  journal = (m) => console.warn(m),
}: OptionsChargement = {}): Promise<{ produits: ProduitMisEnAvant[]; source: 'api' | 'secours' }> {
  const base = apiUrl?.replace(/\/$/, '');
  if (base) {
    try {
      const res = await fetcher(`${base}/api/mis-en-avant`, { signal: AbortSignal.timeout(DELAI_API_MS) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const produits = normaliserMisEnAvant(await res.json());
      if (produits.length === 0) throw new Error('aucun produit exploitable');
      for (const p of produits) {
        if (p.image) p.image = await recopierImage(p.image, `${base}/`, fetcher);
      }
      return { produits, source: 'api' };
    } catch (erreur) {
      journal(`Boutique : sélection « mis en avant » indisponible (${(erreur as Error).message}), fichier de secours utilisé.`);
    }
  }
  return { produits: normaliserMisEnAvant(secours), source: 'secours' };
}
