// @ts-check
import node from '@astrojs/node';
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

const chemin = (relatif) => fileURLToPath(new URL(relatif, import.meta.url));

// Vitrine de la CRN Boutique — rendu serveur (stock, prix du palier en vigueur, statut des
// commandes toujours à jour). Styles du site de la Convention importés tels quels (`@site`) :
// continuité visuelle totale. En développement, /api est relayé vers l'API (Payload) pour que la
// vitrine et l'API partagent la même origine, comme en production derrière le proxy.
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  site: process.env.VITRINE_URL || 'http://localhost:4322',
  server: { port: 4322 },
  vite: {
    resolve: {
      alias: {
        '@site': chemin('../../src'),
        // Polices auto-hébergées (NF-CNV-001) résolues depuis les dépendances de la vitrine.
        '@fontsource': chemin('./node_modules/@fontsource'),
      },
    },
    server: {
      fs: { allow: [chemin('..'), chemin('../../src')] },
      proxy: { '/api': { target: process.env.API_URL || 'http://localhost:3101', changeOrigin: false } },
    },
  },
});
