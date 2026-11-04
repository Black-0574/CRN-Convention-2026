import { withPayload } from '@payloadcms/next/withPayload';
import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Racine = boutique/ : le cœur métier partagé (../domaine, lié par npm) doit être résolu par
  // Turbopack ; il est écrit en TypeScript et compilé ici.
  turbopack: {
    root: path.resolve(import.meta.dirname, '..'),
  },
  transpilePackages: ['@crn-boutique/domaine'],
  // PDF, QR et pilote PostgreSQL : modules Node exécutés côté serveur uniquement.
  serverExternalPackages: ['pdf-lib', 'qrcode'],
};

export default withPayload(nextConfig);
