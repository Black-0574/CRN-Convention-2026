/**
 * Rayons de la boutique (Billetterie : pass et tickets ; Articles officiels) et données d'affichage
 * dérivées du catalogue : dates, lieux et accès des billets. Tout vient des séances réelles du
 * produit ; ce qui manque s'affiche « à annoncer » (aucune donnée inventée).
 */
import type { VueProduit } from './boutique-api';

export type Rayon = 'pass' | 'tickets' | 'articles';

export const RAYONS: { id: Rayon; libelle: string }[] = [
  { id: 'pass', libelle: 'Pass' },
  { id: 'tickets', libelle: 'Tickets à l’unité' },
  { id: 'articles', libelle: 'Articles officiels' },
];

export const rayonDe = (p: VueProduit): Rayon => (p.type === 'pass' ? 'pass' : p.type === 'ticket' ? 'tickets' : 'articles');
export const estBillet = (p: VueProduit) => p.type === 'pass' || p.type === 'ticket';
export const parOrdre = (a: VueProduit, b: VueProduit) => a.ordre - b.ordre;

const TZ = 'Africa/Libreville';
const fJourSemaine = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', timeZone: TZ });
const fJour = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', timeZone: TZ });
const fMoisAn = new Intl.DateTimeFormat('fr-FR', { month: 'short', year: 'numeric', timeZone: TZ });
const fHeure = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: TZ });
const cleJour = new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: TZ });

const majuscule = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Séances du produit ; à défaut, celles de ses variantes (ex. une classe de l'Académie au choix). */
const seancesDe = (p: VueProduit) => (p.plateformes.length > 0 ? p.plateformes : p.variantes.flatMap((v) => v.plateformes ?? []));
const seancesAuChoix = (p: VueProduit) => p.plateformes.length === 0 && p.variantes.some((v) => (v.plateformes ?? []).length > 0);

export interface DatesBillet {
  /** « Samedi » ou « Du 8 au 13 » */
  haut: string;
  /** « 12 déc. 2026 » ou « déc. 2026 » */
  date: string;
  /** « Début à 08h00 » ou « 16 séances » */
  bas: string;
  /** horodatage de la première séance, pour le tri (0 si inconnu) */
  premier: number;
}

/** Dates d'un pass ou d'un ticket, en heure de Libreville. */
export function datesBillet(p: VueProduit): DatesBillet | null {
  const debuts = seancesDe(p).map((pl) => pl.debut).filter((d): d is string => !!d).map((d) => new Date(d)).sort((a, b) => +a - +b);
  if (debuts.length === 0) return null;
  const premier = debuts[0]!;
  const dernier = debuts[debuts.length - 1]!;
  // Séances au choix (une seule variante achetée) : on annonce le nombre de choix, pas le total.
  const bas = seancesAuChoix(p) ? `${p.variantes.length} formules au choix` : `${p.plateformes.length} séances`;
  if (cleJour.format(premier) === cleJour.format(dernier)) {
    return {
      haut: majuscule(fJourSemaine.format(premier)),
      date: `${fJour.format(premier)} ${fMoisAn.format(premier)}`,
      bas: `Début à ${fHeure.format(premier).replace(':', 'h')}`,
      premier: +premier,
    };
  }
  return {
    haut: `Du ${fJour.format(premier)} au ${fJour.format(dernier)}`,
    date: fMoisAn.format(dernier),
    bas,
    premier: +premier,
  };
}

/** Lieux distincts des séances ; « Lieu à annoncer » si aucun n'est arrêté. */
export function lieuBillet(p: VueProduit): string {
  const lieux = [...new Set(seancesDe(p).map((pl) => pl.lieu).filter((l): l is string => !!l))];
  if (lieux.length === 0) return 'Lieu à annoncer';
  return lieux.length <= 2 ? lieux.join(' · ') : 'Plusieurs sites';
}

/** Accès ouverts, regroupés par rendez-vous (« Académie », « Concert pour la vie »…). */
export function accesBillet(p: VueProduit): string[] {
  return [...new Set(seancesDe(p).map((pl) => pl.nom.split(' — ')[0]!.replace(/\s*\(.*\)$/, '').trim()))];
}

/** Texte parcouru par la recherche (nom, résumé, rayon, séances, variantes). */
export const texteRecherche = (p: VueProduit) =>
  [p.nom, p.resume, p.categorie, ...seancesDe(p).map((pl) => pl.nom), ...p.variantes.map((v) => v.libelle)].filter(Boolean).join(' ');
