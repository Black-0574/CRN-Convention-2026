/*
  Ordre d'affichage des orateurs, de gauche à droite (demande du Commanditaire, 5 novembre 2026) :
  orateurs nationaux, puis internationaux, puis les autres catégories ; dans chaque catégorie,
  champ « ordre » de l'admin (absent : en fin de groupe), puis nom.
*/
export const ORDRE_CATEGORIES = ['national', 'international', 'hote', 'prophetique', 'plateforme'] as const;

interface Orateur {
  data: { nom: string; categorie: (typeof ORDRE_CATEGORIES)[number]; ordre?: number };
}

export function trierOrateurs<T extends Orateur>(orateurs: T[]): T[] {
  return [...orateurs].sort(
    (a, b) =>
      ORDRE_CATEGORIES.indexOf(a.data.categorie) - ORDRE_CATEGORIES.indexOf(b.data.categorie) ||
      (a.data.ordre ?? Infinity) - (b.data.ordre ?? Infinity) ||
      a.data.nom.localeCompare(b.data.nom, 'fr'),
  );
}
