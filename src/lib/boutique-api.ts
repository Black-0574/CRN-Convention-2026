/**
 * Boutique de la Convention, intégrée au site (/boutique) : lecture de l'API du back-office.
 *
 * - Au build : catalogue, fiches produits et réglages (pages statiques). Les photos des produits
 *   sont recopiées dans le site (`public/images/boutique/`), comme celles du contenu.
 * - Dans le navigateur : panier, commande, paiement et suivi appellent directement l'API du
 *   back-office (`PUBLIC_BOUTIQUE_API_URL`, domaine du CRN, jamais un domaine interdit — NF-CNV-001).
 *
 * Build de production (PAYLOAD_API_URL réglée) : une API injoignable fait échouer le build, plutôt
 * que de publier une boutique vide (Hostinger garde la version en ligne). Ailleurs (CI, tests),
 * la boutique s'affiche « momentanément indisponible ».
 *
 * Types : vue publique renvoyée par l'API (backend/src/boutique/lib/catalogue.ts).
 */
export interface VueVariante {
  id: number;
  libelle: string;
  disponible: number | null;
}

export interface VueProduit {
  id: number;
  slug: string;
  nom: string;
  type: 'pass' | 'ticket' | 'physique' | 'numerique';
  categorie: string | null;
  resume: string | null;
  description: string | null;
  badge: string | null;
  photos: { url: string; carte: string; fiche: string; alt: string }[];
  prixXAF: number | null;
  paliers: { prixXAF: number; debut: string; fin: string }[];
  prochaineBascule: string | null;
  nominatif: boolean;
  ageMin: number | null;
  ageMax: number | null;
  variantes: VueVariante[];
  plateformes: { nom: string; debut: string | null; fin: string | null; lieu: string | null }[];
  kit: { nom: string; quantite: number; tailles: string[] }[];
  indisponible: string | null;
  apercu: boolean;
  ordre: number;
}

export interface Reglages {
  ventesOuvertes: boolean;
  lieuRetrait: string | null;
  horairesRetrait: string | null;
  consentement: { texte?: string | null; version?: string | null };
  legal: { cgvVersion: string | null; cgv: string | null };
  demo: boolean;
}

const BACK_OFFICE_PRODUCTION = 'https://admin.crn-convention2026.events';

/** Origine du back-office (API de la boutique), lue au build et inscrite dans le code client. */
export const API_BOUTIQUE = (import.meta.env.PUBLIC_BOUTIQUE_API_URL?.trim() || BACK_OFFICE_PRODUCTION).replace(/\/$/, '');

const REQUIS = Boolean(process.env.PAYLOAD_API_URL);
const DELAI_MS = 15000;

async function lire<T>(chemin: string): Promise<T> {
  const res = await fetch(`${API_BOUTIQUE}${chemin}`, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(DELAI_MS) });
  if (!res.ok) throw new Error(`API de la boutique ${chemin} : HTTP ${res.status}`);
  return (await res.json()) as T;
}

/** Lecture au build : en production une erreur arrête le build ; ailleurs elle rend `null`. */
async function lireAuBuild<T>(chemin: string): Promise<T | null> {
  try {
    return await lire<T>(chemin);
  } catch (erreur) {
    if (REQUIS) throw erreur;
    console.warn(`Boutique : ${(erreur as Error).message} — pages de la boutique rendues sans catalogue.`);
    return null;
  }
}

const IMAGES_DIR = 'public/images/boutique';
const copies = new Map<string, Promise<string>>();

/** Recopie une photo du back-office dans le site (une fois par build). */
function recopier(url: string): Promise<string> {
  if (!url) return Promise.resolve('');
  let p = copies.get(url);
  if (!p) {
    p = (async () => {
      try {
        const absolue = new URL(url, `${API_BOUTIQUE}/`);
        const nom = decodeURIComponent(absolue.pathname.split('/').pop() ?? '').replace(/[^\w.-]/g, '_');
        if (!/\.(webp|avif|jpe?g|png)$/i.test(nom)) return '';
        const res = await fetch(absolue, { signal: AbortSignal.timeout(DELAI_MS) });
        if (!res.ok) return '';
        const { mkdir, writeFile } = await import('node:fs/promises');
        await mkdir(IMAGES_DIR, { recursive: true });
        await writeFile(`${IMAGES_DIR}/${nom}`, Buffer.from(await res.arrayBuffer()));
        return `/images/boutique/${nom}`;
      } catch {
        return '';
      }
    })();
    copies.set(url, p);
  }
  return p;
}

async function localiserPhotos(p: VueProduit): Promise<VueProduit> {
  const photos = await Promise.all(
    p.photos.map(async (ph) => ({ url: await recopier(ph.url), carte: await recopier(ph.carte), fiche: await recopier(ph.fiche), alt: ph.alt })),
  );
  return { ...p, photos: photos.filter((ph) => ph.carte || ph.fiche) };
}

let catalogueEnCours: Promise<{ demo: boolean; produits: VueProduit[] } | null> | undefined;

/** Catalogue public (lu une fois par build), ou `null` si l'API est injoignable hors production. */
export function catalogue() {
  catalogueEnCours ??= (async () => {
    const c = await lireAuBuild<{ demo: boolean; produits: VueProduit[] }>('/api/boutique/catalogue');
    return c && { demo: c.demo, produits: await Promise.all(c.produits.map(localiserPhotos)) };
  })();
  return catalogueEnCours;
}

export const reglages = () => lireAuBuild<Reglages>('/api/boutique/reglages');
