/**
 * Variantes « Couleur — Taille » d'un article (tee-shirts officiels des gammes 1 à 4, 23 novembre
 * 2026) : la fiche propose la couleur puis la taille, au lieu d'une liste de toutes les
 * combinaisons (jusqu'à 42 par gamme).
 */
export const SEPARATEUR_VARIANTE = ' — ';

export interface AxesVariantes {
  couleurs: string[];
  tailles: string[];
  /** Variante par « couleur|taille ». */
  par: Record<string, { id: number; disponible: number | null }>;
}

/** Couleurs et tailles d'un article dont chaque variante s'appelle « Couleur — Taille », sinon `null`. */
export function axesVariantes(type: string, variantes: { id: number; libelle: string; disponible: number | null }[]): AxesVariantes | null {
  if (type !== 'physique' || variantes.length < 2) return null;
  const parties = variantes.map((v) => v.libelle.split(SEPARATEUR_VARIANTE));
  if (!parties.every((p) => p.length === 2 && p[0] && p[1])) return null;
  const axes: AxesVariantes = { couleurs: [], tailles: [], par: {} };
  variantes.forEach((v, i) => {
    const [couleur, taille] = parties[i] as [string, string];
    if (!axes.couleurs.includes(couleur)) axes.couleurs.push(couleur);
    if (!axes.tailles.includes(taille)) axes.tailles.push(taille);
    axes.par[`${couleur}|${taille}`] = { id: v.id, disponible: v.disponible };
  });
  return axes;
}
