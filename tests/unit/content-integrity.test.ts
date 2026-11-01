import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('../../', import.meta.url));

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- contenu JSON arbitraire, vérifié par les assertions ci-dessous
async function readJsonCollection(collection: string): Promise<Array<{ file: string; data: any }>> {
  const dir = path.join(root, 'src', 'content', collection);
  const files = (await readdir(dir)).filter((f) => f.endsWith('.json'));
  return Promise.all(
    files.map(async (file) => ({
      file,
      data: JSON.parse(await readFile(path.join(dir, file), 'utf-8')),
    })),
  );
}

// Règle permanente CLAUDE.md : aucune donnée inventée ; Pass OR/DIAMANT "À annoncer" jusqu'à arbitrage.
describe('intégrité des contenus — billetterie', () => {
  it("affiche Pass OR et Pass DIAMANT comme « à annoncer », sans prix inventé", async () => {
    const products = await readJsonCollection('products');
    const passesNonArretes = products.filter((p) => /^Pass (OR|DIAMANT)$/.test(p.data.nom));
    expect(passesNonArretes).toHaveLength(2);
    for (const p of passesNonArretes) {
      expect(p.data.prixFCFA).toBeNull();
      expect(p.data.statut).toBe('a_annoncer');
    }
  });

  it('ne conserve aucune donnée de paiement sur un produit (SEC-CNV-003)', async () => {
    const products = await readJsonCollection('products');
    for (const p of products) {
      expect(p.data).not.toHaveProperty('numeroCarteBancaire');
      expect(p.data).not.toHaveProperty('cvv');
    }
  });
});

// Règle permanente CLAUDE.md : jamais le repas DIAMANT, le petit-déjeuner des orateurs,
// ni les enregistrements médias dans le programme public.
describe('intégrité des contenus — programme public', () => {
  it('ne mentionne jamais le repas DIAMANT, le petit-déjeuner des orateurs ou les enregistrements', async () => {
    const days = await readJsonCollection('program');
    const motsInterdits = [/repas\s+diamant/i, /petit[- ]déjeuner des orateurs/i, /enregistrement/i];
    for (const day of days) {
      for (const session of day.data.sessions) {
        for (const re of motsInterdits) {
          expect(session.titre).not.toMatch(re);
        }
      }
    }
  });
});
