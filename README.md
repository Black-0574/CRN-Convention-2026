# Convention CRN 2026 — Page de la Convention

Site web de la Convention CRN 2026 (6 – 13 décembre, Libreville), point de convergence numérique
accessible sans VPN pour les fidèles du Gabon et la diaspora. Voir [`docs/CONV-PAGE.md`](docs/CONV-PAGE.md)
pour le cahier des charges complet et [`CLAUDE.md`](CLAUDE.md) pour les règles permanentes du projet.

## Démarrage

```bash
npm install
npm run dev
```

## Commandes

| Commande | Effet |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Vérification des types puis build de production |
| `npm run preview` | Sert le build de production localement |
| `npm run typecheck` | `astro check` |
| `npm run lint` | ESLint |
| `npm run test` | Tests unitaires (Vitest) |
| `npm run test:e2e` | Tests de bout en bout (Playwright) — audit réseau et accessibilité inclus |

## État du projet

Lot **L2** (version minimale de l'état 1) livré : accueil, programme, orateurs, billetterie,
académie, action sociale, infos pratiques, diaspora, FAQ, mentions légales, confidentialité,
contact. Lot **L3** (back-office) en cours — voir [`backend/README.md`](backend/README.md). Voir
[`docs/conformite.md`](docs/conformite.md) pour le détail des exigences couvertes et les limites
assumées à ce stade.

## Architecture

Astro (statique) + TypeScript strict, contenu en Astro Content Collections (schémas alignés sur le
CMS Payload du back-office — `backend/`), CSS natif fondé sur les jetons du GBIS v2.1, polices
auto-hébergées (aucune dépendance vers un domaine bloqué au Gabon). Détails dans
`docs/conformite.md`.
