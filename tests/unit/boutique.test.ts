import { readFile } from 'node:fs/promises';
import { describe, expect, it, vi } from 'vitest';
import {
  dernierJourPalier,
  formatEUR,
  formatXAF,
  lienBoutique,
  lienProduit,
  palierEnCours,
  suivreLienBoutique,
} from '../../src/lib/boutique';
import { chargerMisEnAvant, normaliserMisEnAvant } from '../../src/lib/boutique-mis-en-avant';
import secours from '../../src/data/boutique-mis-en-avant.json';

const FINE = ' ';
const INSECABLE = ' ';

// LOT A, A5 — liens traçables du site vers la boutique.
describe('liens vers la boutique (A5)', () => {
  it('ajoute la source et l’emplacement à l’accueil de la boutique', () => {
    expect(lienBoutique('en-tete')).toBe(
      'https://boutique.crn-convention2026.events/?utm_source=site-convention&utm_medium=en-tete',
    );
  });

  it('mène à la fiche produit avec suivi', () => {
    const url = new URL(lienProduit('jai-soif', 'accueil-plateformes'));
    expect(url.origin).toBe('https://boutique.crn-convention2026.events');
    expect(url.pathname).toBe('/produits/jai-soif');
    expect(url.searchParams.get('utm_source')).toBe('site-convention');
    expect(url.searchParams.get('utm_medium')).toBe('accueil-plateformes');
  });

  it('suit un lien saisi dans l’admin seulement s’il vise la boutique', () => {
    expect(suivreLienBoutique('https://boutique.crn-convention2026.events/', 'bandeau')).toContain('utm_medium=bandeau');
    expect(suivreLienBoutique('/programme', 'bandeau')).toBe('/programme');
    expect(suivreLienBoutique('https://example.org/', 'bandeau')).toBe('https://example.org/');
  });
});

describe('montants', () => {
  it('affiche les F CFA sans décimales, avec espace fine entre milliers', () => {
    expect(formatXAF(150000)).toBe(`150${FINE}000${INSECABLE}F${INSECABLE}CFA`);
    expect(formatXAF(1000000)).toBe(`1${FINE}000${FINE}000${INSECABLE}F${INSECABLE}CFA`);
    expect(formatXAF(5000)).toBe(`5${FINE}000${INSECABLE}F${INSECABLE}CFA`);
  });

  it('convertit en euros à la parité fixe 655,957, arrondi à l’euro', () => {
    expect(formatEUR(150000)).toBe(`229${INSECABLE}€`);
    expect(formatEUR(10000)).toBe(`15${INSECABLE}€`);
    expect(formatEUR(1000000)).toBe(`1${FINE}524${INSECABLE}€`);
  });
});

describe('paliers tarifaires (heure de Libreville)', () => {
  const paliers = [
    { prixXAF: 120000, debut: '2026-10-01T00:00:00+01:00', fin: '2026-11-01T00:00:00+01:00' },
    { prixXAF: 150000, debut: '2026-11-01T00:00:00+01:00', fin: '2026-12-01T00:00:00+01:00' },
  ];

  it('bascule à 00h00 pile, heure de Libreville', () => {
    expect(palierEnCours(paliers, new Date('2026-10-31T23:59:59+01:00'))?.prixXAF).toBe(120000);
    expect(palierEnCours(paliers, new Date('2026-11-01T00:00:00+01:00'))?.prixXAF).toBe(150000);
    expect(palierEnCours(paliers, new Date('2026-12-01T00:00:00+01:00'))).toBeUndefined();
    expect(palierEnCours(undefined, new Date())).toBeUndefined();
  });

  it('annonce le dernier jour inclus du palier', () => {
    expect(dernierJourPalier({ prixXAF: 150000, debut: '2026-11-01T00:00:00+01:00', fin: '2026-12-01T00:00:00+01:00' })).toBe('30 novembre');
  });
});

// LOT A, A2 — sélection « mis en avant » : jamais vide, jamais de prix non validé.
describe('sélection « mis en avant » (A2)', () => {
  it('ignore les produits incomplets, trie par ordre et limite à 8 cartes', () => {
    const produits = normaliserMisEnAvant([
      { slug: 'b', nom: 'B', prixXAF: 5000, ordre: 2 },
      { slug: 'a', nom: 'A', prixXAF: 10000, ordre: 1, image: '', badge: ' ' },
      { slug: 'sans-prix', nom: 'Sans prix', prixXAF: null, ordre: 0 },
      { nom: 'Sans slug', prixXAF: 5000, ordre: 0 },
      ...Array.from({ length: 10 }, (_, i) => ({ slug: `x${i}`, nom: `X${i}`, prixXAF: 1000, ordre: 10 + i })),
    ]);
    expect(produits).toHaveLength(8);
    expect(produits.slice(0, 2).map((p) => p.slug)).toEqual(['a', 'b']);
    expect(produits[0]?.image).toBeNull();
    expect(produits[0]?.badge).toBeNull();
  });

  it('ne garde que les paliers complets, triés par date', () => {
    const [p] = normaliserMisEnAvant([
      {
        slug: 'pass',
        nom: 'Pass',
        prixXAF: 150000,
        ordre: 1,
        paliers: [
          { prixXAF: 180000, debut: '2026-12-01T00:00:00+01:00', fin: '2026-12-14T00:00:00+01:00' },
          { prixXAF: 150000, debut: '2026-11-01T00:00:00+01:00', fin: '2026-12-01T00:00:00+01:00' },
          { prixXAF: 0, debut: 'pas une date', fin: '' },
        ],
      },
    ]);
    expect(p?.paliers?.map((x) => x.prixXAF)).toEqual([150000, 180000]);
  });

  it('se rabat sur le fichier de secours sans API, ou si l’API est en erreur ou vide', async () => {
    const journal = vi.fn();
    expect((await chargerMisEnAvant({ apiUrl: undefined, journal })).source).toBe('secours');

    const enErreur = vi.fn(async () => new Response('erreur', { status: 503 }));
    const r1 = await chargerMisEnAvant({ apiUrl: 'https://boutique.test', fetcher: enErreur as typeof fetch, journal });
    expect(enErreur).toHaveBeenCalledWith('https://boutique.test/api/mis-en-avant', expect.anything());
    expect(r1.source).toBe('secours');
    expect(r1.produits.length).toBeGreaterThanOrEqual(6);

    const vide = vi.fn(async () => Response.json([]));
    expect((await chargerMisEnAvant({ apiUrl: 'https://boutique.test', fetcher: vide as typeof fetch, journal })).source).toBe('secours');

    const injoignable = vi.fn(async () => {
      throw new TypeError('fetch failed');
    });
    expect((await chargerMisEnAvant({ apiUrl: 'https://boutique.test', fetcher: injoignable as typeof fetch, journal })).source).toBe('secours');
    expect(journal).toHaveBeenCalledTimes(3);
  });

  it('utilise la sélection de l’API quand elle est exploitable (photo introuvable : cadre neutre)', async () => {
    const fetcher = vi.fn(async (url: string | URL) =>
      String(url).endsWith('/api/mis-en-avant')
        ? Response.json([{ slug: 'tee-shirt-officiel', nom: 'Tee-shirt officiel', prixXAF: 10000, ordre: 1, image: '/media/absente.webp' }])
        : new Response(null, { status: 404 }),
    );
    const { produits, source } = await chargerMisEnAvant({ apiUrl: 'https://boutique.test/', fetcher: fetcher as typeof fetch });
    expect(source).toBe('api');
    expect(produits).toEqual([expect.objectContaining({ slug: 'tee-shirt-officiel', image: null })]);
  });

  it('le fichier de secours compte 6 à 8 produits, tous au prix validé de donnees-reference.md', async () => {
    const produits = normaliserMisEnAvant(secours);
    expect(produits.length).toBeGreaterThanOrEqual(6);
    expect(produits.length).toBeLessThanOrEqual(8);

    const reference = await readFile(new URL('../../docs/donnees-reference.md', import.meta.url), 'utf-8');
    const prixValides = new Map(
      [...reference.matchAll(/^\| (.+?) \| (\d[\d ]*) \|/gm)].map((m) => [String(m[1]).replace(/'/g, '’'), Number(String(m[2]).replace(/ /g, ''))]),
    );
    for (const p of produits) {
      expect(prixValides.get(p.nom), `${p.nom} absent de la grille validée`).toBe(p.prixXAF);
      expect(p.nom).not.toMatch(/Or|Diamant|DIAMANT|Génération|Convention Intégral/);
    }
  });
});
