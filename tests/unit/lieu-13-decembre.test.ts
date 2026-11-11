import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { blocsArticle, getAnnonceMeta } from '../../src/lib/announcements';
import { COMMUNIQUE, LIEU_A_DETERMINER, sansNomad } from '../../backend/src/seed/lieu-13-decembre';

const root = fileURLToPath(new URL('../../', import.meta.url));

// Changement de lieu du 13 décembre (communiqué du Commanditaire, 11 novembre 2026) : le Nomad
// n'apparaît plus comme lieu nulle part, sauf dans le communiqué qui annonce ce changement.
describe('lieu du dimanche 13 décembre', () => {
  it('ne mentionne plus le Nomad comme lieu dans les contenus du site', async () => {
    const fichiers: string[] = [];
    for (const dossier of ['program', 'faq', 'products', 'venues']) {
      for (const f of await readdir(path.join(root, 'src', 'content', dossier))) fichiers.push(path.join(root, 'src', 'content', dossier, f));
    }
    fichiers.push(path.join(root, 'src', 'pages', 'index.astro'), path.join(root, 'backend', 'src', 'seed', 'content.json'));
    for (const f of fichiers) {
      const texte = await readFile(f, 'utf-8');
      expect(texte.replace(/plus au Nomad|Nomad n’accueille plus|Nomad n'accueille plus/g, ''), f).not.toMatch(/Nomad/);
    }
    const jour = JSON.parse(await readFile(path.join(root, 'src', 'content', 'program', '2026-12-13.json'), 'utf-8'));
    expect(jour.label).toBe(`Dimanche 13 décembre — ${LIEU_A_DETERMINER}`);
    expect(jour.sessions.map((s: { lieu: string }) => s.lieu)).toEqual([LIEU_A_DETERMINER, LIEU_A_DETERMINER, LIEU_A_DETERMINER]);
  });

  it('corrige les anciennes valeurs du back-office et seulement elles', () => {
    expect(sansNomad('Nomad')).toBe(LIEU_A_DETERMINER);
    expect(sansNomad('Dimanche 13 décembre, 17h, Nomad.')).toBe('Dimanche 13 décembre, 17h, lieu à déterminer.');
    expect(sansNomad('Dimanche 13 décembre — Nomad')).toBe(`Dimanche 13 décembre — ${LIEU_A_DETERMINER}`);
    expect(sansNomad('Le 13 décembre, la Convention se conclut au Nomad : culte unique')).toBe('Le 13 décembre, la Convention se conclut dans un lieu à déterminer : culte unique');
    expect(sansNomad('Église Centrale')).toBeNull();
    expect(sansNomad(null)).toBeNull();
  });

  it('publie le communiqué avec son visuel, en tête des actualités', async () => {
    const annonce = JSON.parse(await readFile(path.join(root, 'src', 'content', 'announcements', 'changement-lieu-13-decembre.json'), 'utf-8'));
    expect(annonce.titre).toBe(COMMUNIQUE.titre);
    expect(annonce.article).toBe(COMMUNIQUE.article);
    for (const f of [annonce.image, annonce.vignette]) expect(existsSync(path.join(root, 'public', f))).toBe(true);
    expect(existsSync(path.join(root, 'backend', 'public', 'actualites', 'changement-lieu-13-decembre.webp'))).toBe(true);
    const autres = await readdir(path.join(root, 'src', 'content', 'announcements'));
    for (const f of autres.filter((x) => x !== 'changement-lieu-13-decembre.json')) {
      expect(JSON.parse(await readFile(path.join(root, 'src', 'content', 'announcements', f), 'utf-8')).ordre).toBeGreaterThan(annonce.ordre);
    }
    // Typographie française : espace insécable avant les deux-points.
    expect(annonce.titre).toContain('2026 : changement');
  });

  it('mène la carte vers la page de l’article et découpe le texte en blocs', () => {
    expect(getAnnonceMeta('changement-lieu-13-decembre', { categorie: 'Communiqué', icone: 'pin', article: 'Texte.' })).toMatchObject({
      lienHref: '/actualites/changement-lieu-13-decembre',
    });
    expect(blocsArticle(COMMUNIQUE.article).map((b) => b.type)).toEqual([
      'paragraphe', 'paragraphe', 'intertitre', 'paragraphe', 'paragraphe', 'citation', 'intertitre', 'paragraphe', 'paragraphe', 'paragraphe',
    ]);
  });
});
