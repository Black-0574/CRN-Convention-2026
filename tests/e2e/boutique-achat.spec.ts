/**
 * Boutique de la Convention (/boutique) — parcours d'achat de bout en bout (prompt maître
 * « CRN Boutique », « Tests ») sur un écran 360 × 740 : billet pour trois titulaires, paiement
 * Mobile Money en bac à sable, réception des billets (PDF).
 *
 * Nécessite le back-office local avec la boutique (`npm --prefix backend run dev`, BOUTIQUE_DEMO=1)
 * et le site servi avec PUBLIC_BOUTIQUE_API_URL vers lui ; activé par E2E_BOUTIQUE=1 :
 *
 *   E2E_BOUTIQUE=1 npx playwright test tests/e2e/boutique-achat.spec.ts
 */
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const API = (process.env.PUBLIC_BOUTIQUE_API_URL ?? 'http://localhost:3001').replace(/\/$/, '');

test.skip(!process.env.E2E_BOUTIQUE, 'Parcours d’achat : back-office local requis (E2E_BOUTIQUE=1).');
// Un seul back-office local (serveur de développement) et les mêmes stocks pour tous : les
// parcours s'exécutent l'un après l'autre, sinon les réservations dépassent le délai d'attente.
test.describe.configure({ mode: 'default' });
test.use({ viewport: { width: 360, height: 740 } });
// Parcours long (trois titulaires, paiement, émission des billets) : marge pour un poste lent.
test.setTimeout(90_000);

const TITULAIRES = [
  { prenom: 'Awa', nom: 'Essono', telephone: '+241 60 11 11 11', email: 'awa.essono@exemple.org' },
  { prenom: 'Jean', nom: 'Mba', telephone: '+241 60 22 22 22', email: 'jean.mba@exemple.org' },
  { prenom: 'Grâce', nom: 'Ndong', telephone: '+241 60 33 33 33', email: 'grace.ndong@exemple.org' },
];

test('achat de trois billets « Concert pour la vie — VIP », paiement simulé, billets PDF', async ({ page, request }) => {
  await page.goto('/boutique');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Vos pass et vos articles de la Convention');
  // Aucun débordement horizontal à 360 px.
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);

  await page.goto('/boutique/produits/concert-vip');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Concert pour la vie — VIP');
  await page.getByLabel('Quantité').fill('3');
  await page.getByRole('button', { name: 'Ajouter au panier' }).click();
  const tiroir = page.locator('[data-tiroir]');
  await expect(tiroir).toBeVisible();
  await expect(tiroir.locator('[data-total-tiroir]')).toContainText('75');
  await tiroir.getByRole('link', { name: 'Commander' }).click();

  // Étape 1 : acheteur (compte express).
  await page.getByLabel('Prénom').fill('Awa');
  await page.getByLabel('Nom', { exact: true }).fill('Essono');
  await page.getByLabel('E-mail').fill('awa.essono@exemple.org');
  await page.locator('[data-etape="1"]').getByLabel('Téléphone').fill('+241 60 11 11 11');
  await page.getByRole('button', { name: 'Continuer' }).click();

  // Étape 2 : trois titulaires ; le consentement n'est jamais pré-coché.
  const blocs = page.locator('[data-titulaire]');
  await expect(blocs).toHaveCount(3);
  await expect(page.locator('input[name="consentement"]')).not.toBeChecked();
  for (const [i, t] of TITULAIRES.entries()) {
    const bloc = blocs.nth(i);
    await bloc.getByLabel('Prénom').fill(t.prenom);
    await bloc.getByLabel('Nom', { exact: true }).fill(t.nom);
    await bloc.getByLabel('Téléphone').fill(t.telephone);
    await bloc.getByLabel('E-mail').fill(t.email);
  }
  await page.locator('input[name="cgv"]').check();
  await page.getByRole('button', { name: 'Valider et passer au paiement' }).click();

  // Billets seuls : aucune livraison demandée.
  // Étape 3 : réservation de 15 minutes, puis page de paiement de l'agrégateur (simulée) :
  // Mobile Money d'un autre pays que le Gabon.
  await expect(page.locator('[data-reservation]')).toContainText('réservés encore');
  await page.getByRole('button', { name: /^Payer/ }).click();
  await page.waitForURL(/\/paiement-simule\?/);
  await page.getByLabel('Pays', { exact: true }).fill('Cameroun');
  await page.getByLabel('Opérateur', { exact: true }).fill('MTN MoMo');
  await page.getByRole('button', { name: /^Payer/ }).click();
  await page.waitForURL(/\/boutique\/suivi\?commande=/);

  // Suivi : commande confirmée, un billet par titulaire.
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Merci, votre commande est confirmée', { timeout: 20_000 });
  const liens = page.getByRole('link', { name: 'Télécharger (PDF)' });
  await expect(liens).toHaveCount(3);
  for (const t of TITULAIRES) await expect(page.getByText(`${t.prenom} ${t.nom}`, { exact: true })).toBeVisible();
  await expect(page.getByText('Payé par Mobile Money : MTN MoMo — Cameroun')).toBeVisible();

  const reponse = await request.get(await liens.first().getAttribute('href') as string);
  expect(reponse.status()).toBe(200);
  expect(reponse.headers()['content-type']).toContain('application/pdf');
  expect((await reponse.body()).subarray(0, 5).toString()).toBe('%PDF-');
});

test('tee-shirt livré dans une église du réseau hors du Gabon, payé par carte, frais inclus', async ({ page }) => {
  await page.goto('/boutique/produits/tee-shirt-officiel');
  await page.getByRole('button', { name: 'Ajouter au panier' }).click();
  await page.locator('[data-tiroir]').getByRole('link', { name: 'Commander' }).click();

  await page.getByLabel('Prénom').fill('Awa');
  await page.getByLabel('Nom', { exact: true }).fill('Essono');
  await page.getByLabel('E-mail').fill('awa.essono@exemple.org');
  await page.locator('[data-etape="1"]').getByLabel('Téléphone').fill('+241 60 11 11 11');
  await page.getByRole('button', { name: 'Continuer' }).click();

  // Livraison : église du réseau à l'étranger (démonstration : Paris, 15 000 F CFA de frais).
  await page.getByText('Dans une église du réseau').click();
  await page.locator('select[name="pointLivraison"]').selectOption({ label: 'Église de démonstration — Paris — Paris' });
  await expect(page.locator('[data-recap-lignes]')).toContainText('Livraison');
  await page.locator('input[name="cgv"]').check();
  await page.getByRole('button', { name: 'Valider et passer au paiement' }).click();

  await expect(page.locator('[data-reservation]')).toContainText('25 000');
  await page.getByRole('button', { name: /^Payer/ }).click();
  await page.waitForURL(/\/paiement-simule\?/);
  await page.getByText('Carte bancaire').click();
  await page.getByRole('button', { name: /^Payer/ }).click();
  await page.waitForURL(/\/boutique\/suivi\?commande=/);

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Merci, votre commande est confirmée', { timeout: 20_000 });
  await expect(page.getByText('Livraison à l’église du réseau : Église de démonstration — Paris — Paris, France.', { exact: false })).toBeVisible();
  await expect(page.getByText('Payé par carte bancaire', { exact: false })).toBeVisible();
});

test('Pass Partenaire Or (grille validée) : billet nominatif à QR code et kit livré à une église du réseau', async ({ page }) => {
  await page.goto('/boutique/produits/pass-or');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pass Partenaire Or');
  await page.getByRole('button', { name: 'Ajouter au panier' }).click();
  await page.locator('[data-tiroir]').getByRole('link', { name: 'Commander' }).click();

  await page.getByLabel('Prénom').fill('Jean');
  await page.getByLabel('Nom', { exact: true }).fill('Mba');
  await page.getByLabel('E-mail').fill('jean.mba@exemple.org');
  await page.locator('[data-etape="1"]').getByLabel('Téléphone').fill('+241 60 22 22 22');
  await page.getByRole('button', { name: 'Continuer' }).click();

  const titulaire = page.locator('[data-titulaire]');
  await expect(titulaire).toHaveCount(1);
  await titulaire.getByRole('button', { name: /C’est moi/ }).click();
  for (const taille of await titulaire.locator('select').all()) await taille.selectOption({ index: 1 });
  await page.getByText('Dans une église du réseau').click();
  await page.locator('select[name="pointLivraison"]').selectOption({ label: 'Église de démonstration — Libreville — Libreville' });
  await page.locator('input[name="cgv"]').check();
  await page.getByRole('button', { name: 'Valider et passer au paiement' }).click();

  await expect(page.locator('[data-reservation]')).toContainText('500 000');
  await page.getByRole('button', { name: /^Payer/ }).click();
  await page.waitForURL(/\/paiement-simule\?/);
  await page.getByRole('button', { name: /^Payer/ }).click();
  await page.waitForURL(/\/boutique\/suivi\?commande=/);

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Merci, votre commande est confirmée', { timeout: 20_000 });
  await expect(page.getByRole('link', { name: 'Télécharger (PDF)' })).toHaveCount(1);
  await expect(page.getByText('Livraison à l’église du réseau', { exact: false })).toBeVisible();
});

test('accueil : rubriques Billetterie et Articles officiels, accès aux pages des rayons', async ({ page }) => {
  await page.goto('/boutique');
  const billetterie = page.getByRole('region', { name: 'Billetterie' });
  await expect(billetterie.locator('[data-produit]:visible')).toHaveCount(5);
  await billetterie.getByRole('button', { name: 'Tickets', exact: true }).click();
  await expect(billetterie.locator('[data-produit][data-rayon="pass"]:visible')).toHaveCount(0);
  await expect(page.getByRole('region', { name: 'Articles officiels' }).locator('.article')).not.toHaveCount(0);

  await billetterie.getByRole('link', { name: /Toute la billetterie/ }).click();
  await expect(page).toHaveURL(/\/boutique\/billetterie$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Billetterie');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
});

test('rayon Billetterie : filtres dans l’adresse, tri par prix, recherche de l’accueil', async ({ page }) => {
  await page.goto('/boutique/billetterie?categorie=tickets&tri=prix-croissant');
  const prix = await page.locator('[data-produit]:visible').evaluateAll((els) => els.map((el) => Number((el as HTMLElement).dataset.prix)));
  expect(prix.length).toBeGreaterThan(0);
  expect(prix).toEqual([...prix].sort((a, b) => a - b));
  await expect(page.locator('[data-produit][data-rayon="pass"]:visible')).toHaveCount(0);

  await page.goto('/boutique');
  await page.getByLabel('Mot clé').fill('concert');
  await page.getByRole('button', { name: 'Rechercher' }).click();
  await expect(page).toHaveURL(/\/boutique\/recherche\?q=concert/);
  await expect(page.getByText('Concert pour la vie — VIP', { exact: true }).first()).toBeVisible();
  await expect(page.locator('[data-produit][data-rayon="articles"]:visible')).toHaveCount(0);
});

test('accueil du site : section boutique alignée (Billetterie, Articles officiels), liens suivis', async ({ page }) => {
  await page.goto('/');
  const section = page.getByRole('region', { name: 'La Boutique de la Convention' });
  await expect(section.locator('.billet')).not.toHaveCount(0);
  await expect(section.locator('.article')).not.toHaveCount(0);
  for (const nom of [/Toute la billetterie/, /Tous les articles/]) {
    const href = await section.getByRole('link', { name: nom }).getAttribute('href');
    expect(href).toMatch(/^\/boutique\/(billetterie|articles)\?utm_source=site-convention&utm_medium=accueil-boutique$/);
  }
  const fiche = await section.locator('.billet').first().getByRole('link', { name: /^Réserver/ }).getAttribute('href');
  expect(fiche).toMatch(/^\/boutique\/produits\/[^?]+\?utm_source=site-convention&utm_medium=accueil-boutique$/);
  // Pas de favori ni d'aperçu rapide (scripts de la boutique) sur l'accueil du site.
  await expect(section.locator('[data-favori], [data-apercu-rapide]')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
});

for (const chemin of ['/', '/boutique', '/boutique/billetterie', '/boutique/articles']) {
  test(`axe ne relève aucune violation critique sur ${chemin} (NF-CNV-008)`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(chemin);
    const resultats = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    const critiques = resultats.violations.filter((v) => v.impact === 'critical' || v.impact === 'serious');
    expect(critiques, JSON.stringify(critiques, null, 2)).toHaveLength(0);
  });
}

test('un lien de billet falsifié est refusé', async ({ request }) => {
  const r = await request.get(`${API}/api/boutique/billets/CRN-FAUX-01?exp=9999999999&sig=faux`);
  expect(r.status()).toBe(403);
});
