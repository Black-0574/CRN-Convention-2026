import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// NF-CNV-001 — aucune ressource chargée depuis un service bloqué au Gabon ou un service tiers
// non auto-hébergé (polices, scripts, lecteurs, pixels publicitaires, réseaux sociaux).
const DOMAINES_INTERDITS = [
  'facebook.com',
  'fbcdn.net',
  'youtube.com',
  'ytimg.com',
  'youtube-nocookie.com',
  'instagram.com',
  'cdninstagram.com',
  'tiktok.com',
  'tiktokcdn.com',
  'whatsapp.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'google-analytics.com',
  'googletagmanager.com',
];

function collecterRequetes(page: import('@playwright/test').Page) {
  const urls: string[] = [];
  page.on('request', (req) => urls.push(req.url()));
  return urls;
}

function hoteInterdit(url: string): string | undefined {
  let host: string;
  try {
    host = new URL(url).hostname;
  } catch {
    return undefined;
  }
  return DOMAINES_INTERDITS.find((d) => host === d || host.endsWith(`.${d}`));
}

test.describe('Audit réseau — accès sans VPN (NF-CNV-001)', () => {
  for (const chemin of ['/', '/programme', '/billetterie', '/infos-pratiques', '/faq']) {
    test(`aucune requête vers un domaine interdit sur ${chemin}`, async ({ page }) => {
      const urls = collecterRequetes(page);
      await page.goto(chemin);
      await page.waitForLoadState('networkidle');

      const interdites = urls.map((u) => ({ u, d: hoteInterdit(u) })).filter((r) => r.d);
      expect(interdites, `Requêtes vers des domaines interdits : ${JSON.stringify(interdites)}`).toHaveLength(0);
    });
  }
});

test.describe('Parcours principal (inspiré de l’analyse Eventro, habillé CRN)', () => {
  test('accueil → programme → billetterie, bouton d’achat toujours accessible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText("Du Trône à l'autel");
    await expect(page.getByRole('link', { name: 'Prendre mon pass' }).first()).toBeVisible();

    await page.getByRole('link', { name: 'Voir le programme', exact: true }).click();
    await expect(page).toHaveURL(/\/programme$/);
    await expect(page.getByRole('heading', { name: 'Programme', exact: true })).toBeVisible();

    await page.goto('/billetterie');
    await expect(page.getByRole('heading', { name: 'Billetterie', exact: true })).toBeVisible();
    await expect(page.getByText('Pass OR')).toBeVisible();
    await expect(page.getByText('À annoncer').first()).toBeVisible();
  });

  test('la FAQ affirme l’accès sans VPN', async ({ page }) => {
    await page.goto('/faq');
    await page.getByText('VPN').first().click();
    await expect(page.getByText(/sans VPN/i).first()).toBeVisible();
  });
});

test.describe('Accessibilité (NF-CNV-008)', () => {
  for (const chemin of ['/', '/programme', '/billetterie', '/faq']) {
    test(`axe ne relève aucune violation critique sur ${chemin}`, async ({ page }) => {
      // Audit de l'état final : sans cela, axe mesure parfois des éléments en plein fondu d'entrée
      // (compteurs de la bande de chiffres), d'où des contrastes transitoires aléatoires en CI.
      // Le site respecte prefers-reduced-motion (règle 10), qui affiche directement cet état final.
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(chemin);
      const resultats = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();
      const critiques = resultats.violations.filter((v) => v.impact === 'critical' || v.impact === 'serious');
      expect(critiques, JSON.stringify(critiques, null, 2)).toHaveLength(0);
    });
  }
});
