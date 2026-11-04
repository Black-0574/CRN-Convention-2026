/**
 * Base PostgreSQL locale pour le développement de la boutique, sans installation système :
 * binaires officiels fournis par le paquet npm `embedded-postgres`, données dans `.pgdata/`
 * (non versionné). Laisser tourner pendant le développement (Ctrl+C pour arrêter).
 *
 *   npm run db
 *
 * Production : PostgreSQL du VPS (conteneur), jamais ce script.
 */
import EmbeddedPostgres from 'embedded-postgres';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ici = path.dirname(fileURLToPath(import.meta.url));
const dossier = path.resolve(ici, '..', '.pgdata');
const premiereFois = !existsSync(dossier);

const pg = new EmbeddedPostgres({
  databaseDir: dossier,
  user: 'boutique',
  password: 'boutique-local',
  port: 5433,
  persistent: true,
  onLog: () => {},
});

if (premiereFois) await pg.initialise();
await pg.start();
if (premiereFois) await pg.createDatabase('boutique');

console.log('PostgreSQL local prêt : postgres://boutique:boutique-local@127.0.0.1:5433/boutique');

const arreter = async () => {
  await pg.stop();
  process.exit(0);
};
process.on('SIGINT', arreter);
process.on('SIGTERM', arreter);
setInterval(() => {}, 1 << 30);
