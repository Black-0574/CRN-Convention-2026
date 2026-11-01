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
}

// Valeurs saisies dans le back-office en priorité (l'icône y est choisie dans la même liste que
// IconName) ; sinon le mapping ci-dessus, pour les fichiers locaux de src/content.
export const getAnnonceMeta = (id: string, data: ChampsAdmin = {}): AnnonceMeta => {
  const repli = META[id] ?? DEFAUT;
  if (!data.categorie) return repli;
  return {
    categorie: data.categorie,
    icone: (data.icone as IconName | undefined) ?? repli.icone,
    lienHref: data.lienHref,
    lienLabel: data.lienLabel,
  };
};
