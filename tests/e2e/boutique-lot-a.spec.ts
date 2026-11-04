import { test, expect } from '@playwright/test';

// LOT A — le site renvoie vers sa Boutique de la Convention, sous /boutique (liens suivis, A5).
const suivi = (href: string | null, emplacement: string) => {
  const url = new URL(href ?? '', 'http://site.test');
  return (
    url.origin === 'http://site.test' &&
    (url.pathname === '/boutique' || url.pathname.startsWith('/boutique/')) &&
    url.searchParams.get('utm_source') === 'site-convention' &&
    url.searchParams.get('utm_medium') === emplacement
  );
};

test.describe('A1 — pilule d’en-tête vers la boutique', () => {
  test('libellé court sous 768 px, nom accessible complet, lien suivi', async ({ page }) => {
    await page.goto('/');
    const pilule = page.getByRole('link', { name: 'Accédez à la Boutique de la Convention' });
    await expect(pilule).toBeVisible();
    await expect(pilule).toContainText('La boutique');
    await expect(page.locator('.site-header__badge-long')).toBeHidden();
    expect(suivi(await pilule.getAttribute('href'), 'en-tete')).toBe(true);
  });

  test('libellé complet dès 768 px', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const pilule = page.getByRole('link', { name: 'Accédez à la Boutique de la Convention' });
    await expect(pilule).toContainText('Accédez à la');
    await expect(pilule).toContainText('Boutique de la Convention');
    await expect(page.locator('.site-header__badge-short')).toBeHidden();
  });

  test('focus clavier visible sur la pilule', async ({ page }) => {
    await page.goto('/programme');
    const pilule = page.getByRole('link', { name: 'Accédez à la Boutique de la Convention' });
    await pilule.focus();
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Tab');
    const outline = await pilule.evaluate((el) => getComputedStyle(el).outlineStyle);
    expect(outline).toBe('solid');
  });

  // L'en-tête tient sur une ligne, sans débordement horizontal, de 320 à 1440 px.
  for (const largeur of [320, 360, 414, 768, 1024, 1280, 1440]) {
    test(`aucun débordement horizontal à ${largeur} px`, async ({ page }) => {
      await page.setViewportSize({ width: largeur, height: 800 });
      await page.goto('/');
      const mesure = await page.evaluate(() => {
        const header = document.getElementById('site-header');
        const pilule = document.querySelector('.site-header__badge');
        return {
          page: document.documentElement.scrollWidth,
          vue: document.documentElement.clientWidth,
          piluleDroite: pilule?.getBoundingClientRect().right ?? 0,
          header: header?.scrollWidth ?? 0,
        };
      });
      expect(mesure.page).toBeLessThanOrEqual(mesure.vue);
      expect(mesure.header).toBeLessThanOrEqual(mesure.vue);
      expect(mesure.piluleDroite).toBeLessThanOrEqual(mesure.vue);
    });
  }
});

test.describe('A2 — section « La Boutique de la Convention » de l’accueil', () => {
  test('6 à 8 cartes, prix F CFA et euros, liens suivis, jamais vide', async ({ page }) => {
    await page.goto('/');
    const section = page.getByRole('region', { name: 'La Boutique de la Convention' });
    await expect(section.getByRole('heading', { name: 'Vos pass et vos articles de la Convention' })).toBeVisible();
    await expect(section.getByText('Boutique officielle')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Choisissez votre pass' })).toHaveCount(0);

    const cartes = section.locator('.produit-carte');
    const n = await cartes.count();
    expect(n).toBeGreaterThanOrEqual(6);
    expect(n).toBeLessThanOrEqual(8);

    for (let i = 0; i < n; i++) {
      const carte = cartes.nth(i);
      await expect(carte.locator('.produit-carte__xaf')).toHaveText(/^\d{1,3}(\u202f\d{3})*\u00a0F\u00a0CFA$/);
      await expect(carte.locator('.produit-carte__eur')).toHaveText(/^soit \d[\d\u202f]*\u00a0€$/);
      const lien = carte.getByRole('link', { name: /^Voir le produit/ });
      expect(suivi(await lien.getAttribute('href'), 'accueil-boutique')).toBe(true);
    }

    const tout = section.getByRole('link', { name: 'Accéder à toute la boutique' });
    expect(suivi(await tout.getAttribute('href'), 'accueil-boutique')).toBe(true);
  });

  test('aucun pass à la grille non validée dans la sélection de secours', async ({ page }) => {
    await page.goto('/');
    const section = page.getByRole('region', { name: 'La Boutique de la Convention' });
    await expect(section.getByText(/Pass (OR|Or|DIAMANT|Diamant|Génération|Convention Intégral)/)).toHaveCount(0);
  });

  test('carrousel mobile : glissement et pastilles, sans défilement automatique', async ({ page }) => {
    await page.goto('/');
    const liste = page.locator('#boutique-vitrine-liste');
    await liste.scrollIntoViewIfNeeded();
    const pastilles = page.locator('[data-pastille]');
    await expect(pastilles.first()).toBeVisible();
    await expect(pastilles.first()).toHaveAttribute('aria-current', 'true');

    const avant = await liste.evaluate((el) => el.scrollLeft);
    await page.waitForTimeout(1500);
    expect(await liste.evaluate((el) => el.scrollLeft)).toBe(avant);

    await pastilles.nth(2).click();
    await expect(pastilles.nth(2)).toHaveAttribute('aria-current', 'true');
    expect(await liste.evaluate((el) => el.scrollLeft)).toBeGreaterThan(avant);
  });

  test('grille sur ordinateur, sans pastilles', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await expect(page.locator('.boutique-vitrine__pastilles')).toBeHidden();
    const colonnes = await page
      .locator('#boutique-vitrine-liste')
      .evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length);
    expect(colonnes).toBe(4);
  });
});

test.describe('A3 — liens d’achat et page Billetterie', () => {
  test('« Prendre mon ticket » mène à la boutique', async ({ page }) => {
    await page.goto('/');
    const liens = page.locator('#plateformes-phares').getByRole('link', { name: 'Prendre mon ticket' });
    const hrefs = await liens.evaluateAll((els) => els.map((el) => el.getAttribute('href')));
    const versBoutique = hrefs.filter((h) => suivi(h, 'accueil-plateformes'));
    expect(versBoutique.length).toBeGreaterThanOrEqual(4);
    expect(hrefs).not.toContain('/billetterie');
  });

  test('la page Billetterie informe et renvoie vers la boutique, sans lien mort', async ({ page }) => {
    await page.goto('/billetterie');
    await expect(page.getByRole('heading', { name: 'Billetterie', exact: true })).toBeVisible();
    await expect(page.getByText('nominatif et intransférable').first()).toBeVisible();
    const cta = page.getByRole('link', { name: /^Accéder à la boutique/ });
    expect(suivi(await cta.getAttribute('href'), 'billetterie')).toBe(true);
    await expect(page.locator('a[href^="#billetterie-a-configurer"]')).toHaveCount(0);
    const fiches = await page
      .getByRole('link', { name: /^Voir dans la boutique/ })
      .evaluateAll((els) => els.map((el) => el.getAttribute('href')));
    expect(fiches.length).toBeGreaterThan(0);
    for (const href of fiches) expect(suivi(href, 'billetterie')).toBe(true);
  });

  for (const [chemin, emplacement] of [
    ['/diaspora', 'diaspora'],
    ['/academie', 'academie'],
  ] as const) {
    test(`${chemin} renvoie vers la boutique`, async ({ page }) => {
      await page.goto(chemin);
      const hrefs = await page.locator('main a, #contenu-principal a').evaluateAll((els) => els.map((el) => el.getAttribute('href')));
      expect(hrefs.some((h) => suivi(h, emplacement))).toBe(true);
    });
  }

  test('le widget NASTY propose la boutique', async ({ page }) => {
    await page.goto('/');
    const href = await page.locator('.chat-widget__quicklink', { hasText: 'Boutique' }).getAttribute('href');
    expect(suivi(href, 'nasty')).toBe(true);
  });
});

test.describe('A4 — FAQ', () => {
  test('« Comment acheter un pass ou un billet ? » renvoie vers la boutique', async ({ page }) => {
    await page.goto('/faq');
    await page.getByText('Comment acheter un pass ou un billet').click();
    await expect(page.getByText(/Sur la Boutique de la Convention, crn-convention2026\.events\/boutique/)).toBeVisible();
  });
});
