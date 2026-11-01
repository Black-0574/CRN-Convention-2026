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
contact. Lot **L3** (back-office) en ligne, le site n'y est pas encore rebranché — voir
[`backend/README.md`](backend/README.md). Voir
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

Le site est statique : un changement de contenu fait dans le back-office n'apparaît sur le site
qu'après un nouveau build. Variables de build du site (hPanel → site → *Variables
d'environnement*) : `PUBLIC_CHAT_API_URL`, `PAYLOAD_API_URL` (voir `.env.example`). Réglages du
back-office : `backend/README.md`.

## Architecture

Astro (statique) + TypeScript strict, contenu en Astro Content Collections (schémas alignés sur le
CMS Payload du back-office — `backend/`), CSS natif fondé sur les jetons du GBIS v2.1, polices
auto-hébergées (aucune dépendance vers un domaine bloqué au Gabon). Détails dans
`docs/conformite.md`.
