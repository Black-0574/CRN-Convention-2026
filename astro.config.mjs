import { defineConfig } from 'astro/config';

// Convention CRN 2026 — site statique, mobile-first, sans dépendance tierce bloquée au Gabon (NF-CNV-001).
export default defineConfig({
  site: 'https://www.crn-convention2026.events',
  output: 'static',
  trailingSlash: 'never',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  redirects: {
    '/multimedia/actualites': '/actualites',
  },
});
