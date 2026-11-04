import { defineConfig, devices } from '@playwright/test';

// Tests de bout en bout de la CRN Boutique — écran de référence du prompt maître : 360 × 740.
// Suppose la boutique locale déjà lancée (voir boutique/README.md).
export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  fullyParallel: false,
  reporter: [['list']],
  use: {
    baseURL: process.env.VITRINE_URL || 'http://localhost:4322',
    ...devices['Pixel 5'],
    viewport: { width: 360, height: 740 },
    locale: 'fr-FR',
    timezoneId: 'Africa/Libreville',
  },
});
