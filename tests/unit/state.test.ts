import { describe, expect, it } from 'vitest';
import {
  computeConventionState,
  computeCountdown,
  isEcosystemeVisible,
  isPublished,
  type BasculesConvention,
} from '../../src/lib/state';

const bascules: BasculesConvention = {
  campagneDebut: '2026-10-31T00:00:00+01:00',
  evenementDebut: '2026-12-06T00:00:00+01:00',
  prolongementDebut: '2026-12-14T00:00:00+01:00',
  ecosystemeVisibleDes: '2026-12-13T12:00:00+01:00',
};

// F-CNV-002 — basculement programmé entre les trois états, sans intervention du prestataire.
describe('computeConventionState', () => {
  it('reste en campagne avant la bascule du 6 décembre', () => {
    const veille = new Date('2026-12-05T23:59:59+01:00');
    expect(computeConventionState(veille, bascules, false, 'campagne')).toBe('campagne');
  });

  it('bascule vers "evenement" exactement au 6 décembre 00h00', () => {
    const bascule = new Date('2026-12-06T00:00:00+01:00');
    expect(computeConventionState(bascule, bascules, false, 'campagne')).toBe('evenement');
  });

  it('reste en "evenement" le 13 décembre, avant la fin de la Convention', () => {
    const dernierJour = new Date('2026-12-13T18:00:00+01:00');
    expect(computeConventionState(dernierJour, bascules, false, 'campagne')).toBe('evenement');
  });

  it('bascule vers "prolongement" exactement au 14 décembre 00h00', () => {
    const bascule = new Date('2026-12-14T00:00:00+01:00');
    expect(computeConventionState(bascule, bascules, false, 'campagne')).toBe('prolongement');
  });

  it('le forçage manuel prime toujours sur le calcul automatique', () => {
    const pendantLEvenement = new Date('2026-12-08T10:00:00+01:00');
    expect(computeConventionState(pendantLEvenement, bascules, true, 'prolongement')).toBe('prolongement');
  });
});

// F-CNV-054 — section écosystème invisible avant le 13 décembre 12h, visible après.
describe('isEcosystemeVisible', () => {
  it('est masquée juste avant 12h00', () => {
    const avant = new Date('2026-12-13T11:59:59+01:00');
    expect(isEcosystemeVisible(avant, bascules)).toBe(false);
  });

  it('est visible à partir de 12h00 pile', () => {
    const pile = new Date('2026-12-13T12:00:00+01:00');
    expect(isEcosystemeVisible(pile, bascules)).toBe(true);
  });
});

// F-CNV-012 — fiche orateur invisible avant sa date de publication, visible après.
describe('isPublished', () => {
  it('masque une fiche dont la date de publication est future', () => {
    const avant = new Date('2026-11-01T00:00:00+01:00');
    expect(isPublished(avant, '2026-11-02T00:00:00+01:00')).toBe(false);
  });

  it('affiche une fiche dont la date de publication est passée', () => {
    const apres = new Date('2026-11-03T00:00:00+01:00');
    expect(isPublished(apres, '2026-11-02T00:00:00+01:00')).toBe(true);
  });

  it('affiche toujours une fiche sans date de publication', () => {
    expect(isPublished(new Date(), undefined)).toBe(true);
  });
});

// F-CNV-003 — compte à rebours jusqu'au 6 décembre.
describe('computeCountdown', () => {
  it('calcule correctement jours/heures/minutes/secondes restants', () => {
    const now = new Date('2026-12-04T10:00:00+01:00');
    const cible = new Date('2026-12-06T12:30:15+01:00');
    const c = computeCountdown(now, cible);
    expect(c.termine).toBe(false);
    expect(c.jours).toBe(2);
    expect(c.heures).toBe(2);
    expect(c.minutes).toBe(30);
    expect(c.secondes).toBe(15);
  });

  it('signale la fin du compte à rebours une fois la cible atteinte', () => {
    const now = new Date('2026-12-06T09:00:00+01:00');
    const cible = new Date('2026-12-06T09:00:00+01:00');
    expect(computeCountdown(now, cible).termine).toBe(true);
  });
});
