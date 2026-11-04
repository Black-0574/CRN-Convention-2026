# CLAUDE.md — Règles permanentes, Page de la Convention CRN 2026

Ce projet développe la « Page de la Convention CRN 2026 » conformément au cahier des charges
`docs/CONV-PAGE.md` et à l'identité visuelle `docs/GBIS-v2.1.md`. Ces règles s'appliquent à toutes
les sessions de travail sur ce dépôt.

## Règles non négociables

1. **Le cahier des charges fait foi.** `docs/CONV-PAGE.md` prime sur tout autre document en cas de
   conflit ; tout conflit se signale par écrit avant de coder, jamais résolu en silence.
2. **Aucune donnée inventée.** Tout ce qui n'est pas arrêté (voir `docs/donnees-reference.md` et
   l'Annexe A de `docs/CONV-PAGE.md`) s'affiche « À annoncer ». Ne jamais afficher au public le repas
   DIAMANT, le petit-déjeuner des orateurs ni les enregistrements médias.
3. **Aucune dépendance vers un domaine interdit** (NF-CNV-001) : facebook.com, fbcdn.net, youtube.com,
   ytimg.com, youtube-nocookie.com, instagram.com, cdninstagram.com, tiktok.com, tiktokcdn.com,
   whatsapp.com, et aucune police/script chargé depuis un service externe (Google Fonts compris).
   Toute ressource est auto-hébergée.
4. **Aucun visage généré par IA.** Photos réelles uniquement ; cadre neutre marqué si la photo manque.
5. **Chaque exigence implémentée est référencée** par son identifiant (F-CNV-xxx, NF-CNV-xxx,
   SEC-CNV-xxx, INT-CNV-xxx) dans le code ou les tests concernés.
6. **`docs/conformite.md` est tenu à jour** : tableau exigence → lot → statut → preuve (test ou capture).
7. **Palette exclusive** (GBIS v2.1 §3) : `#1A2C5B` `#16244A` `#B8963E` `#D9C48A` `#8A6E22` `#F7F5F0`
   `#FFFFFF` `#101010` `#6B6B6B` `#D8D4CB`. Jamais de blanc sur or ; jamais de texte or sur fond clair.
   Deux familles (Source Serif 4 / Source Sans 3), Regular et Bold uniquement, rien sous 16 px.
8. **Tout texte public est en français** et suit la typographie française (espaces insécables avant
   `: ; ! ?`, apostrophe typographique `'`).
9. **Mobile d'abord.** Conçu pour Android d'entrée de gamme en 3G/4G variable, sans VPN, depuis
   Libreville. Budget : page d'accueil < 1,5 Mo, JS d'accueil < 100 Ko compressé.
10. **Aucun carrousel ni défilement automatique.** Respect de `prefers-reduced-motion`.

## CRN Boutique (`boutique/`) — règles permanentes

Source : prompt maître « CRN Boutique » (2 novembre 2026). Ordre de priorité des sources : programme
maître de la Convention → grille tarifaire validée par le Commanditaire → prompt maître → dossier
d'architecture. S'appliquent en plus des règles ci-dessus :

- Les sources de vérité et les corrections obligatoires du prompt priment sur le dossier.
- Aucune donnée inventée ; **aucun produit actif sans prix validé** (grille validée).
- Toute ambiguïté se signale par écrit avant de coder.
- Aucune modification du site officiel sans test de non-régression.
- Typographie française dans tous les textes affichés : espaces insécables avant « : ; ! ? » et dans
  les guillemets « », apostrophe typographique.
- Montants : F CFA sans décimales, espace fine comme séparateur de milliers (150 000 F CFA) ; euros à
  la parité fixe 1 € = 655,957 F CFA, arrondis à l'affichage.
- Heure de référence : Africa/Libreville (UTC+1, sans heure d'été) pour toutes les dates, bascules
  tarifaires et horodatages.
- Dépendances épinglées à une version exacte publiée depuis au moins 14 jours.

## Commandes utiles

- `npm run dev` — serveur de développement
- `npm run typecheck` — `astro check`
- `npm run lint` — ESLint
- `npm run test` — tests unitaires (Vitest)
- `npm run test:e2e` — tests de bout en bout (Playwright), audit réseau inclus
- `npm run build` — build de production

## État du projet

Site officiel en production (Astro statique, contenu piloté par le back-office Payload `backend/`).
En cours : **CRN Boutique, Palier 1** (échéance 13 novembre 2026) — cœur métier dans
`boutique/domaine/` ; LOT A (renvois du site vers la boutique) sur une branche dédiée, non déployé
tant que la boutique n'encaisse pas. Voir `docs/conformite.md` et
`C:\Users\Mael\.claude\plans\jaunty-cuddling-kahn.md` (plan validé).
