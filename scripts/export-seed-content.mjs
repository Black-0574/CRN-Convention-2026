// Regroupe src/content/** en un seul fichier importé par le back-office pour son import initial
// (backend/src/seed/content.json). Usage : node scripts/export-seed-content.mjs
// Une fois l'import fait en production, le back-office devient la source du contenu : ce fichier
// ne sert plus qu'à initialiser une base vide (nouvel environnement, poste de développement).
import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const contentRoot = path.join(root, 'src/content');
const out = path.join(root, 'backend/src/seed/content.json');

const collections = {};
for (const dir of (await fs.readdir(contentRoot, { withFileTypes: true })).filter((d) => d.isDirectory())) {
  const files = (await fs.readdir(path.join(contentRoot, dir.name))).filter((f) => f.endsWith('.json')).sort();
  collections[dir.name] = await Promise.all(
    files.map(async (f) => ({
      id: path.basename(f, '.json'),
      data: JSON.parse(await fs.readFile(path.join(contentRoot, dir.name, f), 'utf8')),
    })),
  );
}

await fs.mkdir(path.dirname(out), { recursive: true });
await fs.writeFile(out, `${JSON.stringify(collections, null, 2)}\n`);
console.log(`✓ ${path.relative(root, out)} — ${Object.entries(collections).map(([k, v]) => `${k}: ${v.length}`).join(', ')}`);
