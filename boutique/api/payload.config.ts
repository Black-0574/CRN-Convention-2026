import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { fr } from '@payloadcms/translations/languages/fr';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { Medias, Reglages, Utilisateurs } from './src/collections/administration';
import { Categories, Plateformes, Produits, Quotas, Variantes } from './src/collections/catalogue';
import {
  Commandes,
  Consentements,
  DroitsAcces,
  EvenementsWebhook,
  JournalActions,
  Reservations,
  Retraits,
  Scans,
  Titulaires,
} from './src/collections/ventes';
import { endpoints } from './src/endpoints';
import { journaliser } from './src/lib/journal';
import { demarrerTachesPlanifiees } from './src/lib/taches';

const dirname = path.dirname(fileURLToPath(import.meta.url));

if (process.env.BOUTIQUE_DEMO === '1' && process.env.NODE_ENV === 'production') {
  throw new Error('BOUTIQUE_DEMO=1 est réservé au développement local : refusé en production.');
}

// CRN Boutique — moteur e-commerce, API et back-office. Plan validé :
// C:\Users\Mael\.claude\plans\jaunty-cuddling-kahn.md (sections 2 et 3).
export default buildConfig({
  serverURL: process.env.API_URL || undefined,
  admin: {
    user: Utilisateurs.slug,
    importMap: { baseDir: path.resolve(dirname, 'src') },
    meta: {
      title: 'Back-office — CRN Boutique',
      titleSuffix: ' — CRN Boutique',
      icons: [{ url: '/brand/favicon.png', type: 'image/png' }],
    },
    components: {
      graphics: { Logo: '/components/admin/Logo#Logo', Icon: '/components/admin/Icon#Icon' },
      header: ['/components/admin/Header#Header'],
      beforeDashboard: ['/components/admin/TableauVentes#TableauVentes'],
    },
  },
  i18n: {
    fallbackLanguage: 'fr',
    supportedLanguages: { fr },
    translations: { fr: { general: { globals: 'Réglages généraux' } } },
  },
  collections: [
    Utilisateurs,
    Medias,
    ...[Categories, Plateformes, Quotas, Produits, Variantes].map(journaliser),
    Commandes,
    Reservations,
    EvenementsWebhook,
    Titulaires,
    DroitsAcces,
    Scans,
    Retraits,
    Consentements,
    JournalActions,
  ],
  globals: [Reglages],
  endpoints,
  // Sessions par cookie acceptées depuis la vitrine (protection CSRF de Payload : origine
  // explicitement autorisée). En production, vitrine et API partagent la même origine.
  csrf: [process.env.VITRINE_URL, process.env.API_URL].filter((u): u is string => Boolean(u)),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'src/payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || '' },
    // Développement : schéma synchronisé automatiquement. Production : migrations versionnées.
    push: process.env.NODE_ENV !== 'production',
  }),
  sharp,
  onInit: async (payload) => {
    demarrerTachesPlanifiees(payload);
  },
});
