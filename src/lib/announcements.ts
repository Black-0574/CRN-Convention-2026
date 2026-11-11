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
  return data.article ? { ...base, lienHref: lienArticle(id), lienLabel: 'Lire le communiqué' } : base;
};

export const lienArticle = (id: string) => `/actualites/${id}`;

/** Article saisi en texte simple : blocs séparés par une ligne vide ; « ## » intertitre, « > » citation. */
export type BlocArticle = { type: 'intertitre' | 'citation' | 'paragraphe'; texte: string };

export const blocsArticle = (article: string): BlocArticle[] =>
  article
    .split(/\r?\n\s*\r?\n/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((b) =>
      b.startsWith('## ')
        ? { type: 'intertitre', texte: b.slice(3).trim() }
        : b.startsWith('> ')
          ? { type: 'citation', texte: b.slice(2).trim() }
          : { type: 'paragraphe', texte: b },
    );
