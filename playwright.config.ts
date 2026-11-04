import { defineConfig, devices } from '@playwright/test';

// Port surchargeable (E2E_PORT) : permet de lancer les tests d'un worktree pendant qu'un serveur de
// développement occupe déjà 4321, sans que Playwright ne réutilise ce serveur-là par erreur.
const PORT = Number(process.env.E2E_PORT ?? 4321);

// Fenêtre 360×740 : profil mobile d'entrée de gamme (NF-CNV-002), conforme au cahier des charges.
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
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
    command: `npm run build && npm run preview -- --host 127.0.0.1 --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
