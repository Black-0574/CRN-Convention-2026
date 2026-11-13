import type { IconName } from '../components/shared/Icon.astro';

interface AnnonceMeta {
  categorie: string;
  icone: IconName;
  lienHref?: string;
  lienLabel?: string;
}

// Catégorie déduite du sujet réel de chaque annonce (pas une donnée inventée : elle reprend les
// rubriques déjà existantes du site). Nouvelle annonce sans entrée ici → repli neutre ci-dessous.
const META: Record<string, AnnonceMeta> = {
  'billetterie-ouverte': { categorie: 'Billetterie', icone: 'ticket', lienHref: '/billetterie', lienLabel: 'Voir la billetterie' },
  'revelation-orateurs': { categorie: 'Orateurs', icone: 'people', lienHref: '/orateurs', lienLabel: 'Voir les orateurs' },
  'collecte-action-sociale': { categorie: 'Action sociale', icone: 'heart', lienHref: '/action-sociale', lienLabel: 'En savoir plus' },
};

const DEFAUT: AnnonceMeta = { categorie: 'Convention', icone: 'newspaper' };

interface ChampsAdmin {
  categorie?: string;
  icone?: string;
  lienHref?: string;
  lienLabel?: string;
  article?: string;
}

// Valeurs saisies dans le back-office en priorité (l'icône y est choisie dans la même liste que
// IconName) ; sinon le mapping ci-dessus, pour les fichiers locaux de src/content. Une annonce
// avec un article complet mène à sa page /actualites/<id>.
export const getAnnonceMeta = (id: string, data: ChampsAdmin = {}): AnnonceMeta => {
  const repli = META[id] ?? DEFAUT;
  const base = data.categorie
    ? { categorie: data.categorie, icone: (data.icone as IconName | undefined) ?? repli.icone, lienHref: data.lienHref, lienLabel: data.lienLabel }
    : repli;
  if (!data.article) return base;
  return { ...base, lienHref: lienArticle(id), lienLabel: /communiqu/i.test(base.categorie) ? 'Lire le communiqué' : 'Lire l’article' };
};

export const lienArticle = (id: string) => `/actualites/${id}`;

/**
 * Article saisi en texte simple, blocs séparés par une ligne vide : « ## » intertitre, « ### »
 * sous-titre, « > » citation, lignes commençant par « - » liste à puces, « [Texte](/lien) » seul
 * sur son bloc bouton (appel à candidatures du 13 novembre 2026) ; sinon paragraphe.
 */
export type BlocArticle =
  | { type: 'intertitre' | 'sous-titre' | 'citation' | 'paragraphe'; texte: string }
  | { type: 'liste'; elements: string[] }
  | { type: 'bouton'; texte: string; lien: string };

function bloc(b: string): BlocArticle {
  if (b.startsWith('### ')) return { type: 'sous-titre', texte: b.slice(4).trim() };
  if (b.startsWith('## ')) return { type: 'intertitre', texte: b.slice(3).trim() };
  if (b.startsWith('> ')) return { type: 'citation', texte: b.slice(2).trim() };
  const lignes = b.split(/\r?\n/).map((l) => l.trim());
  if (lignes.every((l) => l.startsWith('- '))) return { type: 'liste', elements: lignes.map((l) => l.slice(2).trim()) };
  const [, libelle, lien] = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(b) ?? [];
  if (libelle && lien && /^(\/|https:\/\/)/.test(lien)) return { type: 'bouton', texte: libelle, lien };
  return { type: 'paragraphe', texte: b };
}

export const blocsArticle = (article: string): BlocArticle[] =>
  article
    .split(/\r?\n\s*\r?\n/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map(bloc);
