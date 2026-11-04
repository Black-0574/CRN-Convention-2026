/** Formats d'affichage partagés (montants : règles du cœur métier ; dates : heure de Libreville). */
export { formaterEUR, formaterXAF } from '@crn-boutique/domaine/montants';

const jour = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Africa/Libreville' });
const heure = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Libreville' });
const jourMois = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', timeZone: 'Africa/Libreville' });

/** « samedi 12 décembre, 08:00 – 11:00 » (heure de Libreville). */
export function creneau(debut: string | null, fin: string | null): string {
  if (!debut) return 'Date à annoncer';
  const d = new Date(debut);
  const h = heure.format(d).replace(':', 'h');
  const f = fin ? ` – ${heure.format(new Date(fin)).replace(':', 'h')}` : '';
  return `${jour.format(d)}, ${h}${f}`;
}

/** Dernier jour d'un palier (fin exclue) : « 30 novembre ». */
export const dernierJour = (fin: string) => jourMois.format(new Date(new Date(fin).getTime() - 1));
