/**
 * Liens du site vers la Boutique de la Convention (LOT A ; F-CNV-022, billetterie) — point unique
 * de vérité.
 *
 * A5 (mesure) : chaque lien porte `utm_source=site-convention&utm_medium=<emplacement>`, pour
 * attribuer les ventes de la boutique à l'endroit du site qui les a amenées. Aucun lien vers la
 * boutique ne s'écrit à la main ailleurs dans le site : il passe par `lienBoutique` /
 * `lienProduit`, ou par `suivreLienBoutique` pour un lien saisi dans l'admin de contenu (bandeau).
 *
 * Fiche produit : `/produits/<slug>` sur la boutique, où `<slug>` est l'identifiant du produit
 * dans le catalogue de la boutique — les mêmes que les fichiers de `src/content/products/` (contrat
 * à respecter à l'import du catalogue dans la boutique).
 */

export const BOUTIQUE_URL = 'https://boutique.crn-convention2026.events/';

const BOUTIQUE_HOTE = new URL(BOUTIQUE_URL).hostname;

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

function avecSuivi(url: URL, emplacement: EmplacementBoutique): string {
  url.searchParams.set('utm_source', 'site-convention');
  url.searchParams.set('utm_medium', emplacement);
  return url.toString();
}

/** Accueil de la boutique (ou un chemin de la boutique), avec suivi de l'emplacement. */
export function lienBoutique(emplacement: EmplacementBoutique, chemin = '/'): string {
  return avecSuivi(new URL(chemin, BOUTIQUE_URL), emplacement);
}

/** Fiche produit de la boutique, avec suivi de l'emplacement. */
export function lienProduit(slug: string, emplacement: EmplacementBoutique): string {
  return lienBoutique(emplacement, `/produits/${encodeURIComponent(slug)}`);
}

/**
 * Lien saisi librement (admin de contenu, ex. bandeau) : s'il vise la boutique, on y ajoute le
 * suivi ; tout autre lien (page du site, autre domaine) est rendu tel quel.
 */
export function suivreLienBoutique(lien: string, emplacement: EmplacementBoutique): string {
  let url: URL;
  try {
    url = new URL(lien);
  } catch {
    return lien;
  }
  return url.hostname === BOUTIQUE_HOTE ? avecSuivi(url, emplacement) : lien;
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
