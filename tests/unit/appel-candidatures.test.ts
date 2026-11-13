import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { blocsArticle, getAnnonceMeta } from '../../src/lib/announcements';
import { APPEL_CANDIDATURES } from '../../backend/src/seed/appel-candidatures';

const root = fileURLToPath(new URL('../../', import.meta.url));
const lire = async (f: string) => JSON.parse(await readFile(path.join(root, 'src', 'content', 'announcements', f), 'utf-8'));

// Appel à candidatures de l'équipe médias (Commanditaire, 13 novembre 2026).
describe('appel à candidatures — équipe médias', () => {
  it('publie le même article sur le site et dans le back-office, en tête, avec son visuel', async () => {
    const a = await lire(`${APPEL_CANDIDATURES.slug}.json`);
    expect(a.titre).toBe(APPEL_CANDIDATURES.titre);
    expect(a.article).toBe(APPEL_CANDIDATURES.article);
    for (const f of [a.image, a.vignette]) expect(existsSync(path.join(root, 'public', f))).toBe(true);
    expect(existsSync(path.join(root, 'backend', 'public', 'actualites', APPEL_CANDIDATURES.visuel))).toBe(true);
    for (const f of (await readdir(path.join(root, 'src', 'content', 'announcements'))).filter((x) => x !== `${APPEL_CANDIDATURES.slug}.json`)) {
      expect((await lire(f)).ordre).toBeGreaterThan(a.ordre);
    }
  });

  it('rend sous-titres, listes et le bouton vers le formulaire de candidature', () => {
    const blocs = blocsArticle(APPEL_CANDIDATURES.article);
    expect(blocs.filter((b) => b.type === 'sous-titre')).toHaveLength(6);
    const listes = blocs.filter((b) => b.type === 'liste');
    expect(listes.map((l) => (l.type === 'liste' ? l.elements.length : 0))).toEqual([5, 8]);
    expect(blocs.find((b) => b.type === 'bouton')).toMatchObject({ texte: 'Accéder au formulaire de candidature', lien: '/contact?objet=candidature#contact-form' });
    expect(APPEL_CANDIDATURES.article).toContain('22 novembre 2026');
  });

  it('n’accepte comme bouton qu’un lien interne ou en https', () => {
    expect(blocsArticle('[Cliquez](javascript:alert(1))')[0].type).toBe('paragraphe');
    expect(blocsArticle('[Site](https://crn-convention2026.events)')[0].type).toBe('bouton');
  });

  it('libellé du lien de carte selon la rubrique', () => {
    expect(getAnnonceMeta('x', { categorie: 'Appel à candidatures', article: 'Texte.' }).lienLabel).toBe('Lire l’article');
    expect(getAnnonceMeta('y', { categorie: 'Communiqué', article: 'Texte.' }).lienLabel).toBe('Lire le communiqué');
  });
});
