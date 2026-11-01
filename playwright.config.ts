import { defineConfig, devices } from '@playwright/test';

// Fenêtre 360×740 : profil mobile d'entrée de gamme (NF-CNV-002), conforme au cahier des charges.
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4321',
    viewport: { width: 360, height: 740 },
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'mobile-360',
      use: { ...devices['Pixel 7'], viewport: { width: 360, height: 740 } },
    },
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4321',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
