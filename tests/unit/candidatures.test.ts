import { describe, expect, it } from 'vitest';
import {
  ACCEPT,
  LIMITES,
  familleDe,
  sujetCandidature,
  tailleLisible,
  verifierCandidature,
  verifierPieces,
} from '../../backend/src/candidatures/regles';

const Mo = 1024 * 1024;
const valide = { prenom: 'Awa', nom: 'Mba', email: 'awa.mba@exemple.ga', telephone: '', poste: 'Agent d’accueil', message: 'Je souhaite servir.' };

// Dépôt de candidature de la page Contact (Commanditaire, 13 novembre 2026).
describe('dépôt de candidature', () => {
  it('accepte documents Word et PDF, images, audio et vidéo, et rien d’autre', () => {
    for (const nom of ['cv.pdf', 'lettre.docx', 'lettre.doc', 'photo.JPG', 'photo.heic', 'voix.m4a', 'voix.mp3', 'demo.mp4', 'demo.mov']) expect(familleDe(nom), nom).toBeDefined();
    for (const nom of ['virus.exe', 'script.js', 'archive.zip', 'page.html', 'sans-extension']) expect(familleDe(nom), nom).toBeUndefined();
    expect(ACCEPT).toContain('.pdf');
    expect(ACCEPT).not.toContain('.exe');
  });

  it('plafonne la taille par fichier, le nombre de fichiers et le total', () => {
    expect(verifierPieces([{ nom: 'cv.pdf', taille: 2 * Mo }, { nom: 'demo.mp4', taille: 14 * Mo }])).toEqual([]);
    expect(verifierPieces([{ nom: 'cv.pdf', taille: 6 * Mo }])[0]).toMatch(/au-delà de 5\u202fMo pour un fichier document/);
    expect(verifierPieces([{ nom: 'demo.mp4', taille: 16 * Mo }])[0]).toMatch(/au-delà de 15\u202fMo/);
    expect(verifierPieces([{ nom: 'a.mp4', taille: 12 * Mo }, { nom: 'b.mp3', taille: 9 * Mo }]).at(-1)).toMatch(/au total/);
    expect(verifierPieces(Array.from({ length: LIMITES.fichiers + 1 }, (_, i) => ({ nom: `p${i}.jpg`, taille: 1000 })))[0]).toMatch(/5 fichiers au plus/);
    expect(verifierPieces([{ nom: 'vide.pdf', taille: 0 }])[0]).toMatch(/fichier vide/);
  });

  it('exige prénom, e-mail valide, titre du poste et message', () => {
    expect(verifierCandidature(valide)).toEqual([]);
    expect(verifierCandidature({ ...valide, poste: ' ' })).toContain('Le titre du poste est obligatoire.');
    expect(verifierCandidature({ ...valide, email: 'pas-un-email' })).toContain('L’adresse e-mail n’est pas valide.');
    expect(verifierCandidature({ ...valide, message: '' })).toContain('Le message est obligatoire.');
  });

  it('compose le sujet « DÉPÔT DE CANDIDATURE — poste — candidat » sur une seule ligne', () => {
    expect(sujetCandidature(valide)).toBe('DÉPÔT DE CANDIDATURE — Agent d’accueil — Awa Mba');
    expect(sujetCandidature({ ...valide, poste: 'Chantre\r\nBcc: x@y.z' })).not.toMatch(/[\r\n]/);
  });

  it('affiche les tailles en français', () => {
    expect(tailleLisible(5 * Mo)).toBe('5\u202fMo');
    expect(tailleLisible(1.5 * Mo)).toBe('1,5\u202fMo');
    expect(tailleLisible(350_000)).toBe('342\u202fKo');
  });
});
