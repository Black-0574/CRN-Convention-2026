/**
 * Calcul de l'état courant de la Page de la Convention (F-CNV-002).
 * Toutes les dates de bascule sont des chaînes ISO avec décalage Africa/Libreville (+01:00,
 * sans heure d'été) ; Date() les interprète en instants absolus, donc ce module n'a pas besoin
 * d'une bibliothèque de fuseaux horaires pour rester correct quel que soit le fuseau du serveur.
 */

export type EtatConvention = 'campagne' | 'evenement' | 'prolongement';

export interface BasculesConvention {
  campagneDebut: string;
  evenementDebut: string;
  prolongementDebut: string;
  ecosystemeVisibleDes: string;
}

/**
 * Détermine l'état à afficher. Le forçage manuel (administration, hors scope L2) prime toujours
 * sur le calcul automatique, conformément à F-CNV-002.
 */
export function computeConventionState(
  now: Date,
  bascules: BasculesConvention,
  forcageManuel: boolean,
  etatForce: EtatConvention,
): EtatConvention {
  if (forcageManuel) return etatForce;

  const t = now.getTime();
  const evenementDebut = new Date(bascules.evenementDebut).getTime();
  const prolongementDebut = new Date(bascules.prolongementDebut).getTime();

  if (t >= prolongementDebut) return 'prolongement';
  if (t >= evenementDebut) return 'evenement';
  return 'campagne';
}

/** Section Écosystème (F-CNV-054) : invisible avant la date programmée, visible après. */
export function isEcosystemeVisible(now: Date, bascules: BasculesConvention): boolean {
  return now.getTime() >= new Date(bascules.ecosystemeVisibleDes).getTime();
}

/** Fiche orateur/artiste à révélation progressive (F-CNV-012) : invisible avant sa date de publication. */
export function isPublished(now: Date, datePublicationISO: string | undefined): boolean {
  if (!datePublicationISO) return true;
  return now.getTime() >= new Date(datePublicationISO).getTime();
}

export interface CompteARebours {
  jours: number;
  heures: number;
  minutes: number;
  secondes: number;
  termine: boolean;
}

/** Compte à rebours jusqu'à une cible (F-CNV-003), utilisable côté serveur comme côté client. */
export function computeCountdown(now: Date, cible: Date): CompteARebours {
  const diffMs = cible.getTime() - now.getTime();
  if (diffMs <= 0) {
    return { jours: 0, heures: 0, minutes: 0, secondes: 0, termine: true };
  }
  const totalSecondes = Math.floor(diffMs / 1000);
  const jours = Math.floor(totalSecondes / 86400);
  const heures = Math.floor((totalSecondes % 86400) / 3600);
  const minutes = Math.floor((totalSecondes % 3600) / 60);
  const secondes = totalSecondes % 60;
  return { jours, heures, minutes, secondes, termine: false };
}
