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
contact. Lot **L3** (back-office) en ligne : il est la source du contenu du site en production —
voir [`backend/README.md`](backend/README.md) et « Contenu » ci-dessous. Voir
[`docs/conformite.md`](docs/conformite.md) pour le détail des exigences couvertes et les limites
assumées à ce stade.

## Mise en ligne

En ligne sur Hostinger (plan « Unlimited ») :

| | Adresse | Dépôt suivi par Hostinger (déploiement automatique à chaque push) |
| --- | --- | --- |
| Site public | `https://www.crn-convention2026.events` | `Black-0574/CRN-Convention-2026-Site-Hostinger` |
| Back-office | `https://admin.crn-convention2026.events/admin` | `Black-0574/CRN-Convention-2026-Backend-Hostinger` |

Ces deux dépôts sont des copies créées par Hostinger ; ce dépôt-ci reste la seule source de
vérité. Pour publier une modification (depuis la racine, après le push habituel sur `origin`) :

```bash
# site public
git push https://github.com/Black-0574/CRN-Convention-2026-Site-Hostinger.git main --force

# back-office (seulement si backend/ a changé)
git subtree split --prefix=backend -b backend-export
git push https://github.com/Black-0574/CRN-Convention-2026-Backend.git backend-export:main --force
git push https://github.com/Black-0574/CRN-Convention-2026-Backend-Hostinger.git backend-export:main --force
git branch -D backend-export
```

Variables de build du site (hPanel → site → *Variables d'environnement*) : `PUBLIC_CHAT_API_URL`,
`PAYLOAD_API_URL` (voir `.env.example`). Réglages du back-office : `backend/README.md`.

## Contenu

En production, **le back-office est la source du contenu** : orateurs, programme, billetterie,
FAQ, annonces, artistes, lieux et réglages s'ajoutent, se modifient, se suppriment ou
s'activent/désactivent dans l'admin. Le site reste statique (léger, sans requête du visiteur
vers l'API) :

1. une modification enregistrée dans l'admin déclenche, ~20 s plus tard (une seule fois pour
   une rafale de modifications), un commit vide sur `CRN-Convention-2026-Site-Hostinger` —
   à condition que `SITE_REBUILD_GITHUB_TOKEN` et `SITE_REBUILD_GITHUB_REPO` soient renseignés
   côté back-office (voir `backend/README.md`) ;
2. Hostinger reconstruit le site, qui lit alors le contenu via l'API (`src/lib/cms-content.ts`) ;
3. la nouvelle version est en ligne environ 2 minutes après l'enregistrement.

Si le back-office est injoignable pendant le build, le build échoue et la version en ligne reste
en place (jamais de site vide).

Sans `PAYLOAD_API_URL` dans l'environnement (développement, CI, tests), le site lit les fichiers de
`src/content/`, qui ne sont plus mis à jour depuis l'admin : ils servent de jeu de données de
référence et d'import initial d'une base vide (`node scripts/export-seed-content.mjs`, puis
démarrage du back-office). Pour construire localement depuis un back-office :
`PAYLOAD_API_URL=http://localhost:3001/api npm run build`.

## Architecture

Astro (statique) + TypeScript strict, contenu en Astro Content Collections (schémas alignés sur le
CMS Payload du back-office — `backend/`), CSS natif fondé sur les jetons du GBIS v2.1, polices
auto-hébergées (aucune dépendance vers un domaine bloqué au Gabon). Détails dans
`docs/conformite.md`.
