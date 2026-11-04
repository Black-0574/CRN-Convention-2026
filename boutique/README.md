# CRN Boutique — boutique officielle de la Convention CRN 2026

Boutique mono-vendeur des Ministères Christ Révélé aux Nations (CRN) : pass et billets nominatifs
de la Convention, articles officiels, puis librairie, terroir et numérique (Palier 3). Plan
validé : `C:\Users\Mael\.claude\plans\jaunty-cuddling-kahn.md`. Règles permanentes : `../CLAUDE.md`.

| Dossier | Rôle | Technologie |
| --- | --- | --- |
| `domaine/` | Cœur métier pur : paliers tarifaires, montants, quotas, jetons de billet, droits d’accès, paiements | TypeScript, testé (Vitest) |
| `api/` | Moteur e-commerce, API, back-office en français, émission des billets | Payload 3 + PostgreSQL (Next.js) |
| `vitrine/` | Boutique publique : catalogue, fiche produit, panier, tunnel en 3 étapes, suivi, scan | Astro (rendu serveur), styles du site |

## Lancer la boutique en local

Prérequis : Node 22.12 ou plus. Aucune installation de PostgreSQL : la base locale est fournie par
le paquet `embedded-postgres`.

```bash
# 1. Dépendances (une fois)
cd boutique/api && npm install
cd ../vitrine && npm install

# 2. Configuration (une fois) : copier les modèles et renseigner les secrets
cp boutique/api/.env.example boutique/api/.env
cp boutique/vitrine/.env.example boutique/vitrine/.env

# 3. Trois terminaux
cd boutique/api && npm run db        # PostgreSQL local (port 5433), à laisser tourner
cd boutique/api && npm run dev       # API + back-office : http://localhost:3101/admin
cd boutique/vitrine && npm run dev   # Boutique : http://localhost:4322

# 4. Catalogue initial (une fois, l'API ayant démarré au moins une fois pour créer le schéma)
cd boutique/api && npm run seed
```

`BOUTIQUE_DEMO=1` (local uniquement, refusé en production) affiche aussi les pass au tarif non
validé, marqués « Aperçu », et utilise des capacités et stocks de démonstration. Les paiements
passent par le prestataire « bac à sable » : la page de paiement propose « Valider » / « Refuser »
à la place du téléphone. Les e-mails ne partent pas : ils sont écrits dans `api/.courriels/` et
listés sur la page de suivi de commande.

## Ce qui est vendu

- **En vente** : prix validés pour le site (`docs/donnees-reference.md`) — 7 tickets à l’unité,
  tee-shirt officiel (S à XXL), pagne officiel.
- **« Prix à valider »** (jamais en vente en production) : Pass Partenaire Or, Pass Grand
  Partenaire Diamant, Pass Convention Intégral (paliers 120 000 → 150 000 → 180 000 F CFA),
  Pass Génération, Pass Génération Plus — montants du prompt maître, en attente de la grille
  validée par le CRN. Un produit au prix non validé ne peut pas être activé (contrôle du
  back-office).
- **Capacités et stocks** : inconnus → vides en production (quota vide = ventes bloquées ; stock
  vide = non suivi, signalé au tableau de bord).

## Garanties

- **Aucune survente** : chaque stock et quota est réservé par une instruction SQL conditionnelle
  unique, pendant 15 minutes, puis vendu ou libéré (`api/src/lib/ventes.ts`) ;
  `npm run test:concurrence` : 200 commandes simultanées sur 50 places.
- **Paliers tarifaires** basculant à 00h00, heure de Libreville ; prix garanti pendant la
  réservation.
- **Billets** : un par titulaire, QR = jeton aléatoire signé (HMAC), aucune donnée personnelle ;
  droits d’accès par séance, consommés séparément ; second scan refusé et journalisé.
- **Paiements** derrière l’interface `PaymentProvider` ; webhooks signés, idempotents, robustes au
  désordre ; argent reçu après expiration → commande « à vérifier ».
- **Back-office** : rôles nominatifs (administrateur, catalogue, COM Boutique, comptabilité),
  journal des actions, tableau des ventes, exports CSV.

## Reste à raccorder avant la mise en production (questions au CRN)

Agrégateur Mobile Money (identifiants), prestataire d’e-mail, hébergement (VPS, conteneurs,
préproduction), grille tarifaire validée, capacités et stocks, lieu de retrait, CGV / mentions /
confidentialité, double authentification (Cloudflare Access) devant `/admin`.
