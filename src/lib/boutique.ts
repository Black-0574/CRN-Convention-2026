/**
 * Liens du site vers la Boutique de la Convention (LOT A ; F-CNV-022, billetterie) — point unique
 * de vérité. La boutique fait partie du site : elle vit sous `/boutique` (catalogue, fiches
 * `/boutique/produits/<slug>`, commande, suivi), sur le même domaine.
 *
 * A5 (mesure) : chaque lien porte `utm_source=site-convention&utm_medium=<emplacement>`, pour
 * attribuer les ventes à l'endroit du site qui les a amenées. Aucun lien vers la boutique ne
 * s'écrit à la main ailleurs dans le site : il passe par `lienBoutique` / `lienProduit`, ou par
 * `suivreLienBoutique` pour un lien saisi dans l'admin de contenu (bandeau).
 *
 * `<slug>` : identifiant du produit dans le catalogue de la boutique (back-office), le même que les
 * fichiers de `src/content/products/`.
 */

/** Racine de la boutique dans le site. */
export const BOUTIQUE_CHEMIN = '/boutique';

/** Hôtes du site : un lien absolu saisi dans l'admin vers la boutique y est reconnu. */
const HOTES_SITE = new Set(['crn-convention2026.events', 'www.crn-convention2026.events']);

/** Emplacements du site d'où part un lien vers la boutique (valeur de `utm_medium`). */
export type EmplacementBoutique =
  | 'en-tete'
  | 'accueil-heros'
  | 'accueil-boutique'
  | 'accueil-plateformes'
  | 'billetterie'
  | 'academie'
  | 'diaspora'
  | 'nasty'
  | 'bandeau';

function avecSuivi(url: URL, emplacement: EmplacementBoutique): URL {
  url.searchParams.set('utm_source', 'site-convention');
  url.searchParams.set('utm_medium', emplacement);
  return url;
}

const estCheminBoutique = (chemin: string) => chemin === BOUTIQUE_CHEMIN || chemin.startsWith(`${BOUTIQUE_CHEMIN}/`);

// Base fictive pour manipuler des chemins relatifs avec l'API URL.
const BASE = 'https://crn-convention2026.events';
const relatif = (url: URL) => `${url.pathname}${url.search}${url.hash}`;

/** Accueil de la boutique (ou une page de la boutique), avec suivi de l'emplacement. */
export function lienBoutique(emplacement: EmplacementBoutique, chemin = ''): string {
  const page = chemin.replace(/^\/+/, '');
  return relatif(avecSuivi(new URL(page ? `${BOUTIQUE_CHEMIN}/${page}` : BOUTIQUE_CHEMIN, BASE), emplacement));
}

/** Fiche produit de la boutique, avec suivi de l'emplacement. */
export function lienProduit(slug: string, emplacement: EmplacementBoutique): string {
  return lienBoutique(emplacement, `produits/${encodeURIComponent(slug)}`);
}

/**
 * Lien saisi librement (admin de contenu, ex. bandeau) : s'il vise la boutique (`/boutique…`,
 * relatif ou sur le domaine du site), on y ajoute le suivi ; tout autre lien est rendu tel quel.
 */
export function suivreLienBoutique(lien: string, emplacement: EmplacementBoutique): string {
  let url: URL;
  try {
    url = new URL(lien, BASE);
  } catch {
    return lien;
  }
  const estRelatif = lien.startsWith('/');
  if ((!estRelatif && !HOTES_SITE.has(url.hostname)) || !estCheminBoutique(url.pathname)) return lien;
  avecSuivi(url, emplacement);
  return estRelatif ? relatif(url) : url.toString();
}

// ——— Montants ———

/** Parité fixe du franc CFA (BEAC) : 1 € = 655,957 F CFA. */
export const PARITE_EUR_XAF = 655.957;

const ESPACE_FINE = ' ';
const ESPACE_INSECABLE = ' ';

const milliers = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ESPACE_FINE);

/** « 150 000 F CFA » : sans décimales, espace fine entre milliers, insécable avant l'unité. */
export function formatXAF(montant: number): string {
  return `${milliers(montant)}${ESPACE_INSECABLE}F${ESPACE_INSECABLE}CFA`;
}

/** Équivalent en euros à la parité fixe, arrondi à l'euro : « 229 € ». */
export function formatEUR(montantXAF: number): string {
  return `${milliers(montantXAF / PARITE_EUR_XAF)}${ESPACE_INSECABLE}€`;
}

// ——— Paliers tarifaires ———

export interface Palier {
  prixXAF: number;
  /** Début inclus (ISO 8601 avec fuseau). */
  debut: string;
  /** Fin exclue (ISO 8601 avec fuseau) : instant de la bascule suivante. */
  fin: string;
}

/** Palier en vigueur à l'instant `now` (début inclus, fin exclue), ou `undefined`. */
export function palierEnCours(paliers: readonly Palier[] | undefined, now: Date): Palier | undefined {
  const t = now.getTime();
  return paliers?.find((p) => new Date(p.debut).getTime() <= t && t < new Date(p.fin).getTime());
}

const jourLibreville = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', timeZone: 'Africa/Libreville' });

/** Dernier jour du palier, heure de Libreville (fin exclue : « 30 novembre » pour une fin au 1er décembre 0 h). */
export function dernierJourPalier(palier: Palier): string {
  return jourLibreville.format(new Date(new Date(palier.fin).getTime() - 1));
}
