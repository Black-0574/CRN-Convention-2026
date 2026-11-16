import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { avecFemme2Fois } from '../../backend/src/seed/nom-femme-2-fois';
import { visuelSeance, VISUELS } from '../../src/lib/visuels-plateformes';

const root = fileURLToPath(new URL('../../', import.meta.url));

async function fichiers(dir: string): Promise<string[]> {
  const sortie: string[] = [];
  for (const e of await readdir(path.join(root, dir), { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) sortie.push(...(await fichiers(p)));
    else if (/\.(astro|ts|json|md)$/.test(e.name)) sortie.push(p);
  }
  return sortie;
}

// « Femme de Foi » devient « Femme 2 Fois » (Commanditaire, 16 novembre 2026).
describe('Nom de la plateforme « Femme 2 Fois »', () => {
  it('ne reste nulle part dans les textes du site', async () => {
    for (const f of await fichiers('src')) {
      expect(await readFile(path.join(root, f), 'utf8'), f).not.toContain('Femme de Foi');
    }
  });

  it('est appliqué par la correction du back-office, sur l’ancienne valeur seulement', () => {
    expect(avecFemme2Fois('Femme de Foi — Live')).toBe('Femme 2 Fois — Live');
    expect(avecFemme2Fois('Académie, Femme de Foi — Live, J’ai soif')).toBe('Académie, Femme 2 Fois — Live, J’ai soif');
    expect(avecFemme2Fois('Femme 2 Fois — Live')).toBeNull();
    expect(avecFemme2Fois(null)).toBeNull();
  });

  it('garde le visuel de la séance', () => {
    expect(visuelSeance('Femme 2 Fois — Live')).toBe(VISUELS.femmeDeFoi);
  });
});
