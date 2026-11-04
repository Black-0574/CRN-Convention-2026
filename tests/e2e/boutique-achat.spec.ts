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
import { expect, test } from '@playwright/test';

const API = (process.env.PUBLIC_BOUTIQUE_API_URL ?? 'http://localhost:3001').replace(/\/$/, '');

test.skip(!process.env.E2E_BOUTIQUE, 'Parcours d’achat : back-office local requis (E2E_BOUTIQUE=1).');
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
  await page.getByLabel('Téléphone').fill('+241 60 11 11 11');
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

  // Étape 3 : réservation de 15 minutes, puis paiement Mobile Money simulé.
  await expect(page.locator('[data-reservation]')).toContainText('réservés encore');
  await page.getByRole('button', { name: 'Payer' }).click();
  await expect(page.getByText('Validez le paiement sur votre téléphone')).toBeVisible();
  await page.getByRole('button', { name: 'Valider le paiement' }).click();

  // Suivi : commande confirmée, un billet par titulaire.
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Merci, votre commande est confirmée', { timeout: 20_000 });
  const liens = page.getByRole('link', { name: 'Télécharger (PDF)' });
  await expect(liens).toHaveCount(3);
  for (const t of TITULAIRES) await expect(page.getByText(`${t.prenom} ${t.nom}`, { exact: true })).toBeVisible();

  const reponse = await request.get(await liens.first().getAttribute('href') as string);
  expect(reponse.status()).toBe(200);
  expect(reponse.headers()['content-type']).toContain('application/pdf');
  expect((await reponse.body()).subarray(0, 5).toString()).toBe('%PDF-');
});

test('un lien de billet falsifié est refusé', async ({ request }) => {
  const r = await request.get(`${API}/api/boutique/billets/CRN-FAUX-01?exp=9999999999&sig=faux`);
  expect(r.status()).toBe(403);
});
