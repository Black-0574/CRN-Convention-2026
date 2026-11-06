# Conformité — Page de la Convention CRN 2026

Tableau de traçabilité exigence → lot → statut → preuve. Statuts : **Couvert** (satisfait pour le
périmètre du lot indiqué), **Partiel** (couvert en partie, limite documentée), **Hors scope L2**
(prévu à un lot ultérieur, non traité ici). Mis à jour à chaque lot livré.

## LOT A — le site renvoie vers la Boutique de la Convention (4 novembre 2026, branche non déployée)

Source : prompt maître « CRN Boutique », section LOT A. **Mise à jour du 4 novembre (fusion)** :
la boutique n'est plus un site séparé mais une partie du site, sous `/boutique` — les liens du
LOT A y mènent désormais (voir « Boutique intégrée au site et au back-office » plus bas). Ne pas
déployer tant que la boutique n'encaisse pas.

| Exigence | Lot | Statut | Preuve |
| --- | --- | --- | --- |
| A1 — pilule d'en-tête « Accédez à la / Boutique de la Convention », « La boutique » sous 768 px, aria-label complet, focus visible | LOT A | Couvert | `Header.astro` ; `tests/e2e/boutique-lot-a.spec.ts` (libellés 360/1440 px, focus, aucun débordement à 320, 360, 414, 768, 1024, 1280, 1440 px) |
| A2 — section « La Boutique de la Convention » (6 à 8 cartes, F CFA + euros à 655,957, badge, « Voir le produit », « Accéder à toute la boutique ») | LOT A | Couvert | `BoutiqueVitrine.astro`, `src/lib/boutique-mis-en-avant.ts` ; unitaires (repli API absente/en erreur/vide/injoignable, validation, ≤ 8 cartes) ; e2e (cartes, formats, liens) |
| A2 — carrousel tactile et pastilles sur mobile, grille 3 puis 4 colonnes, aucun défilement automatique | LOT A | Couvert | e2e : pastilles, `scrollLeft` inchangé sans action, 4 colonnes à 1440 px |
| A2 — compte à rebours du palier en cours, seulement si l'API fournit des paliers | LOT A | Couvert (mécanisme) | `Countdown.astro` (plusieurs instances, variante « carte »), `palierEnCours` testé à 23 h 59 / 00 h 00 Libreville ; inactif tant que la boutique ne publie pas de paliers |
| A3 — « Prendre mon ticket » vers la fiche produit ; héros, diaspora, Académie, NASTY, bandeau vers la boutique ; `/billetterie` devient une page d'information | LOT A | Couvert | `index.astro`, `Hero.astro`, `diaspora.astro`, `academie.astro`, `ChatWidget.astro`, `InfoBanner.astro`, `billetterie.astro` ; e2e (liens suivis, plus aucun `#billetterie-a-configurer`) |
| A4 — FAQ « Comment acheter un pass ou un billet ? » et base de NASTY | LOT A | Couvert (fichiers) | `src/content/faq/*.json`, `backend/src/seed/content.json`, `backend/src/lib/nasty.ts` ; e2e FAQ. **La FAQ et le bandeau en ligne vivent dans l'admin de contenu** : y reporter les deux réponses et le bandeau au moment de la bascule |
| A5 — liens traçables `utm_source=site-convention&utm_medium=<emplacement>` | LOT A | Couvert | `src/lib/boutique.ts` (seul point de construction des liens) ; unitaires et e2e |
| F-CNV-020 / F-CNV-022 — grille tarifaire, billetterie sans lien mort | LOT A | Couvert | Fichier de secours limité aux 8 produits au prix validé de `docs/donnees-reference.md` (test unitaire qui compare les prix) ; Pass OR/DIAMANT « À annoncer », Pass Intégral et Génération absents |
| F-CNV-021 — règles d'accès (nominatif, QR code) | LOT A | Couvert | `AccessRules.astro` en tête de `/billetterie`, FAQ, NASTY |

Décisions et points à valider :

- **Contrat avec la boutique** : `GET <back-office>/api/mis-en-avant` → liste de
  `{ slug, nom, image, prixXAF, badge, ordre, paliers?: [{ prixXAF, debut, fin }] }` (ou `{ docs }`),
  lue au build uniquement (aucune requête du visiteur, NF-CNV-001) ; photos recopiées dans le site
  (`public/images/boutique/`, non versionné). Fiches produit en `/boutique/produits/<slug>`, avec
  les slugs de `src/content/products/` (ex. `jai-soif`, `diner-des-elites`). Variable
  `BOUTIQUE_API_URL` à régler dans hPanel pour le build ; absente, le fichier de secours est utilisé.
- **Aucune photo produit réelle n'existe encore** : le fichier de secours affiche un cadre neutre
  marqué « Visuel à venir » (règle 4), jamais une image générée.
- **Paiement par carte** : la FAQ annonçait « Airtel Money, Moov Money et carte bancaire » ; le
  Palier 1 de la boutique n'encaisse que le Mobile Money → réponse corrigée (« carte bancaire
  annoncée sur la boutique »). Retrait des articles : lieu et horaires « à annoncer ». Livraison :
  « annoncée sur la boutique ».
- **Diaspora** : la carte « Donner en ligne » mène désormais à la boutique (consigne LOT A), mais
  son texte parle de dons par carte, que la boutique ne propose pas au Palier 1 — texte ou cible à
  arbitrer.
- **Concert pour la vie** (deux catégories, Standard et VIP) : « Prendre mon ticket » mène à
  l'accueil de la boutique plutôt qu'à l'une des deux fiches.
- L'annonce « Ouverture de la billetterie » (25 octobre) et le pied de page gardent leur lien vers
  `/billetterie`, qui renvoie désormais vers la boutique (aucun lien mort).
- **Adresse de la boutique configurable** (remplacée par la fusion : la boutique est sous
  `/boutique`, son API est lue via `PUBLIC_BOUTIQUE_API_URL`, voir `.env.example`). Vérifié le 4 novembre contre la boutique locale
  (`localhost:4322` / API `localhost:3101`) : sélection lue depuis l'API (8 cartes, Pass Convention
  Intégral à 150 000 F CFA, prix valable jusqu'au 30 novembre, compte à rebours), liens vers
  `localhost:4322/produits/<slug>?utm_…`. **Écart signalé** : cette sélection de l'API contient des
  pass dont la grille n'est pas validée dans `docs/donnees-reference.md` (Pass Or 500 000, Diamant
  1 000 000, Génération, Génération Plus, Convention Intégral) ; le site les affiche tels que la
  boutique les publie. À ne pas mettre en production avant validation de la grille, ou à retirer du
  « mis en avant » côté boutique.
- `playwright.config.ts` : port surchargeable par `E2E_PORT` (4321 par défaut), pour ne pas
  réutiliser par erreur un serveur de développement déjà lancé sur 4321.

**Statut : Couvert sur la branche ; mise en production subordonnée à l'ouverture de la boutique.**

## Lot L3 — habillage du back-office (1er novembre 2026) — français, charte GBIS v2.1

Demande du Commanditaire : back-office en français, design et ergonomie plus soignés, alignés sur
la charte graphique du site. Réalisé sans toucher aux données ni à la structure des collections :

- **Français** : `payload.config.ts` (`i18n.fallbackLanguage: 'fr'`, `supportedLanguages: { fr }`
  via `@payloadcms/translations`) — interface entièrement en français, pas de sélecteur de langue.
  Un intitulé resté non traduit dans le pack officiel de Payload (« Globals(es) ») corrigé via
  `i18n.translations.fr` (« Réglages généraux »). `labels` français ajoutés à chaque collection et
  au global `Settings` (`backend/src/collections/*.ts`, `backend/src/globals/Settings.ts`), ainsi
  qu'aux champs dont le nom technique ne donnait pas un intitulé français correct une fois
  auto-généré par Payload (accents manquants, mots composés).
- **Charte GBIS v2.1** : polices Source Serif 4 / Source Sans 3 auto-hébergées via `@fontsource`
  (même mécanisme que le site public — aucune requête externe, NF-CNV-001) ; accent doré de
  l'admin (anneau de focus clavier, badges, éléments actifs) recalculé à partir de `--crn-or
  #B8963E` en respectant exactement cette valeur de palette (contrastes vérifiés ≥ 4,5:1 pour le
  texte concerné) ; en-tête de marque bleu nuit sur toutes les pages, logo de la page de connexion
  et icône de navigation réutilisant l'emblème officiel déjà approuvé du site
  (`src/assets/images/emblem-convention-2026.png`, recadré et optimisé en webp) — aucune nouvelle
  image générée. Fichiers : `backend/src/app/(payload)/crn-admin-theme.css`,
  `backend/src/components/admin/{Logo,Icon,Header}.tsx`, `backend/public/brand/`.
- **Vérification** : testée dans une base SQLite jetable distincte du compte réel du Commanditaire
  (déjà créé dans `crn-convention.db` — non touché), avec un utilisateur de test temporaire
  supprimé ensuite ; `npm run typecheck` et `npm run build` passés après coup.

**Statut : Couvert.**

## Lot L3 — déploiement Hostinger : sous-domaine dédié et dépôt Git séparé (1er novembre 2026)

Décisions prises avec le Commanditaire avant la mise en ligne :

- **Sous-domaine `admin.crn-convention2026.events`**, pas un chemin sur le domaine principal (ex.
  `crn-convention2026.events/admin`). **Écart signalé avant modification** : l'admin sert aussi des
  routes `/api/...` (REST/GraphQL Payload, `/api/chat` pour NASTY) dont le site public et l'admin
  lui-même dépendent ; un montage par chemin, documenté nulle part côté Hostinger, aurait laissé ces
  routes hors de portée. Le Commanditaire a choisi le sous-domaine, solution robuste recommandée.
- **Dépôts de déploiement** : Hostinger clone un dépôt tel quel, sans réglage de sous-dossier, et
  ne voit pas les dépôts privés hors de son application GitHub. `backend/` a donc été extrait
  (`git subtree split --prefix=backend`) dans le dépôt public `Black-0574/CRN-Convention-2026-Backend`,
  dont Hostinger a créé sa propre copie privée `CRN-Convention-2026-Backend-Hostinger` ; le site
  public est déployé depuis `CRN-Convention-2026-Site-Hostinger`, copie créée par Hostinger du dépôt
  principal. Le dépôt principal reste la seule source de vérité ; les copies Hostinger se
  redéploient automatiquement à chaque push (procédure : `README.md`, section « Mise en ligne »).

**Mise en ligne effectuée le 1er novembre 2026** (plan Hostinger « Unlimited », qui inclut les
applications Node.js — le plan « Premium » ne les inclut pas) :

- **Site public** — `https://www.crn-convention2026.events` et `https://crn-convention2026.events` :
  application Node.js, préréglage Astro, Node 22, `npm run build`, sortie `dist` (site statique).
  Variables de build : `PUBLIC_CHAT_API_URL=https://admin.crn-convention2026.events/api/chat`,
  `PAYLOAD_API_URL=https://admin.crn-convention2026.events/api`. Le site « Bientôt disponible »
  (PHP/HTML vide) qui occupait le domaine a été supprimé par le Commanditaire au préalable.
- **Back-office** — `https://admin.crn-convention2026.events/admin` : préréglage Next.js, Node 20.
  Trois défauts trouvés et corrigés pendant la mise en ligne : migrations de schéma impossibles à
  lancer sans terminal (désormais appliquées par `prodMigrations` à la connexion), base SQLite et
  photos stockées dans le dossier de build recréé à chaque déploiement (désormais en chemins
  absolus hors de ce dossier, `DATABASE_URI`/`MEDIA_DIR`), CORS limité à `www` (la variante sans
  `www` est maintenant autorisée).
- **Vérifié en ligne** : pages principales en 200 sur les deux domaines avec certificat valide ;
  e-mail `contact@crn-convention2026.events` affiché ; widget NASTY → `/api/chat` du back-office en
  inter-origine, réponse reçue ; aucune ressource chargée depuis un domaine interdit (NF-CNV-001 —
  seuls des liens sortants vers les profils sociaux, déjà validés).

**Statut : Couvert** pour la mise en ligne. Restent ouverts, hors de ce point : clé
`ANTHROPIC_API_KEY` à fournir pour que NASTY réponde au-delà de son message d'attente. (Le
rebranchement du site sur le back-office est traité dans l'entrée suivante.)

## Lot L3 — le back-office devient la source du contenu du site (1er novembre 2026)

Demande du Commanditaire : le contenu affiché sur le site doit se trouver dans le back-office
(base vide jusque-là) et pouvoir y être ajouté, modifié, supprimé, activé ou désactivé.

- **Import initial** (`backend/src/seed/`) : au premier démarrage, le back-office importe le
  contenu actuel du site — 53 entrées et 10 photos, **aucune donnée inventée** (regroupement exact
  de `src/content/**`). Une seule fois (marqueur caché), reprise sans doublon après interruption.
- **Lecture par le site** (`src/lib/cms-content.ts`, `src/content.config.ts`) : en production,
  les collections Astro sont alimentées par l'API du back-office au moment du build, dans la
  forme exacte des fichiers d'origine — **pages inchangées**. Contenus désactivés exclus ; dates en
  heure de Libreville ; identifiants d'adresse des orateurs conservés (nouveau champ « Identifiant
  d'adresse », déduit du nom s'il est vide). Le site reste statique : aucune requête du visiteur
  vers l'API (NF-CNV-001, budget de poids inchangé).
- **Republication** (`backend/src/lib/site-rebuild.ts`) : toute modification déclenche, après 20 s
  de calme, un commit vide sur le dépôt suivi par Hostinger, qui reconstruit le site (~2 min).
  Nécessite un jeton GitHub limité à ce dépôt, à créer et saisir par le Commanditaire
  (procédure : `backend/README.md`, « Republication du site ») — **écart signalé** : Hostinger ne
  propose pas d'URL de déclenchement, d'où ce passage par Git.
- **Sécurité de publication** : back-office injoignable ou import initial pas encore fait → le
  build échoue volontairement et la version en ligne reste en place, jamais de site vide.

Vérifications (base jetable locale, back-office en mode production) : migrations puis import
automatiques au démarrage ; site construit depuis l'API **identique octet pour octet** au site
construit depuis les fichiers sur les 27 pages (hors adresse des photos) ; trois modifications
faites dans l'admin (FAQ désactivée, annonce renommée, orateur désactivé) visibles après
reconstruction ; build refusé quand l'API est injoignable ; 53 enregistrements → une seule
demande de republication. Lint, types, 15 tests unitaires, 11 tests e2e (dont NF-CNV-001/008) OK.

**Statut : Couvert**, la republication automatique dépendant du jeton à fournir.

## Pied de page : double logo, contacts et réseaux sociaux (3 novembre 2026)

Demande du Commanditaire : dans le bloc identité du pied de page, afficher le double logo de la
Convention, les contacts (hotline et e-mail) et, en dessous, toutes les icônes des réseaux
sociaux. `Footer.astro` : double logo (même fichier que l'en-tête) sur pavé blanc, accroche,
Hotline (appel + WhatsApp, source `src/lib/contact.ts`) et E-mail, puis les 6 réseaux CRN
(`src/lib/social.ts`) en pastilles 44 px — au survol fond or lumière et pictogramme bleu nuit,
jamais de blanc sur or. Titre « Convention CRN 2026 » conservé pour les lecteurs d'écran. Colonne
élargie sur grand écran, pleine largeur en tablette. Preuve : rendu 1440 px (e-mail sur une
ligne) et 360 px sans débordement ; lint, types, tests unitaires et e2e (dont axe) OK.

## Hotline : nouveau numéro, appel et WhatsApp (3 novembre 2026)

Demande du Commanditaire : hotline remplacée par **+241 62 70 51 83**, avec icônes téléphone et
WhatsApp. Source unique côté site `src/lib/contact.ts` (barre du haut, page Contact) ; réponses de
NASTY mises à jour côté back-office. Barre du haut : icône téléphone + numéro (`tel:+24162705183`)
puis pastille WhatsApp (`https://wa.me/24162705183`, nouvel onglet) ; sur téléphone (< 480 px),
deux pastilles de 34 px côte à côte. Page Contact : lignes « Hotline » et « WhatsApp ». Nouveau
pictogramme `whatsapp` au trait (GBIS §07). Lien de sortie uniquement, aucune ressource WhatsApp
chargée (NF-CNV-001, audit réseau e2e OK) — **à noter** : WhatsApp étant bloqué au Gabon, ce lien ne
fonctionne pour les fidèles sur place que si l'application est accessible ; l'appel reste le canal
garanti. Preuve : liens vérifiés dans le HTML, rendu 1440 et 360 px sans débordement ; lint, types,
tests unitaires et e2e OK.

## Artistes : même fiche que les orateurs, pages publiques (F-CNV-012, 2 novembre 2026)

Demande du Commanditaire : « faire de même pour les artistes ». Fiche Artiste de l'admin alignée
sur la fiche Orateur — nom, fonction, identifiant d'adresse, photo, biographie, réseaux
sociaux (définitions communes : `backend/src/fields/profil.ts`) ; la photo affiche son artiste lié.
Migration `20261102_083128` (colonnes `fonction`, `slug`, `bio`, table
`artists_reseaux_sociaux`) qui donne aux 10 artistes existants un identifiant déduit de leur nom.
Le site n'affichait aucun artiste alors que F-CNV-012 prévoit leurs fiches : ajout de `/artistes`
(liste, ordre alphabétique, « Artiste » par défaut sous le nom) et `/artistes/<identifiant>`
(fiche), rendus par le composant commun `ProfilDetails.astro` (aussi utilisé par les orateurs) ;
liens « Orateurs » et « Artistes » en pied de page, lien depuis /orateurs. Pas de date de
publication pour les artistes : « Actif » décoché les masque (révélation progressive non requise
à ce stade — **écart signalé** au regard de F-CNV-012, à arbitrer si besoin). Aucune donnée
inventée : fonction, biographie et liens restent vides tant qu'ils ne sont pas saisis ; les
artistes sans photo gardent le cadre neutre « Photo réelle à fournir ». Preuve : base jetable en
mode production → 4 migrations, import, fiche enregistrée, `http://` refusé, identifiants rejoués
sur artistes existants (accents compris) ; pages rendues avec données de test (retirées) ; lint,
types, tests unitaires et e2e OK.

## Orateurs : fonction et réseaux sociaux ; lien depuis la photo (2 novembre 2026)

Demande du Commanditaire : saisir nom, fonction, biographie et réseaux sociaux de l'orateur depuis
l'interface de sa photo. Arbitrage validé par le Commanditaire : les données restent sur la fiche
Orateur (une seule source) ; la page de la photo (Médias) affiche « Orateur lié à cette photo »
avec lien direct vers la fiche (champ `join`, rien de stocké en double ; idem pour les artistes).
Ajouts sur la fiche Orateur : « Fonction » (affichée sous le nom) et « Réseaux sociaux » (liste
réseau + adresse https obligatoire ; Facebook, Instagram, YouTube, TikTok, LinkedIn, X, site
web). Migration `20261102_074843` (colonne `fonction`, table `speakers_reseaux_sociaux`). Sur le
site, pictogrammes au trait 44 px, simples liens de sortie en nouvel onglet avec libellé
accessible — aucun widget ni script de ces plateformes chargé (NF-CNV-001). Preuve : base jetable
en mode production → 3 migrations puis import initial ; fonction et lien enregistrés, adresse
invalide refusée ; la photo affiche son orateur lié ; fiche rendue avec fonction, deux liens et
biographie (données de test retirées) ; lint, types, tests unitaires et e2e OK.

## Biographie des orateurs rédigée dans l'admin (2 novembre 2026)

Demande du Commanditaire : rédiger, modifier ou supprimer la biographie de chaque orateur depuis
le back-office. Champ « Biographie » de la fiche Orateur agrandi (12 lignes) avec consigne de
saisie ; sur le site (`src/pages/orateurs/[slug].astro`), une ligne vide sépare deux paragraphes,
les retours à la ligne sont conservés, et un champ vidé réaffiche « Biographie à paraître ». Aucune
biographie n'est inventée : les 10 orateurs restent sans biographie tant qu'elle n'est pas saisie.
Preuve : fiche rendue avec deux paragraphes à partir d'un texte de test (retiré ensuite) ; lint,
types, tests unitaires et e2e OK.

## Correctif — film de la Convention lisible au clic en 3G (NF-CNV-002/003, 1er novembre 2026)

Constat : la vidéo de 14 s derrière les deux boutons « Voir le film » (héros, section Film)
restait sur un cadre noir. Cause : fichier de 12,6 Mo (1080p, ~7 Mbit/s) avec l'index MP4
(`moov`) en fin de fichier — après 12 s, 0,3 s seulement en mémoire tampon. Correctif : ré-encodage
H.264 720p (~570 kbit/s, AAC 96 kbit/s), index en tête (`+faststart`) → **1,0 Mo**, lecture qui
démarre aussitôt ; affiche (`data-video-poster`) à la place du cadre noir pendant le chargement ;
nouveau nom de fichier pour qu'aucun cache ne serve l'ancien. Toujours chargé uniquement au clic
(aucun poids ajouté à l'accueil). Preuve : les deux boutons ouvrent le lecteur et la vidéo est à
2,8 s après 3 s, entièrement chargée.

## Correctif — photos des orateurs copiées dans le site (NF-CNV-002/003, 1er novembre 2026)

Constat du Commanditaire : photos des orateurs disparues (cadres vides). Cause : les pages
pointaient vers les photos du back-office (`admin.crn-convention2026.events`), dont le DNS n'a
plus d'adresse IPv4 (seulement IPv6) — invisibles pour tout visiteur sans IPv6. Correctif
(`src/lib/cms-content.ts`) : au build, chaque photo est téléchargée depuis l'API et publiée avec le
site (`/images/cms/…`, même domaine que les pages). Le visiteur ne dépend plus jamais du domaine
du back-office ; une résolution DNS de moins en 3G. Preuve : build depuis l'API de production →
10 photos copiées, 20/20 images chargées sur l'accueil, aucune page ne référence plus
`admin.…/api/media` ; tests unitaires et e2e OK. Reste à rétablir l'enregistrement A (IPv4) du
sous-domaine `admin` dans la zone DNS Hostinger (accès à l'admin depuis un réseau IPv4).

## Correctif — affichage mobile « décalé » (NF-CNV-002, NF-CNV-008, 1er novembre 2026)

Constat du Commanditaire (capture sur téléphone Android) : page décalée, bord gauche coupé, bande
vide à droite, menu tronqué. Cause : l'en-tête (logo + pilule « Prendre mon pass » + bouton de
menu) mesurait 461 px pour un écran de 375 px, rendant **toute la page** défilable de côté.

- **En-tête mobile compact** (`Header.astro`) : logo 40 px, pilule « Mon pass » réduite
  (« Prendre » masqué visuellement mais lu par les lecteurs d'écran, plus aucun texte sous 16 px),
  pictogramme seul sous 360 px ; tailles d'origine à partir de 640 px, bureau inchangé.
- **Menu mobile** : croix de fermeture, libellé « Ouvrir/Fermer le menu », fermeture par Échap
  (focus rendu au bouton) et par toucher hors du menu, en-tête opaque quand il est ouvert,
  hauteur limitée à l'écran avec défilement interne ; sous-menu « Multimédia » enfin replié par
  défaut (un sélecteur plus spécifique le gardait toujours déplié).
- **Héros** (`Hero.astro`) : le bouton « Voir le film », positionné à 534 px fixes, recouvrait
  « SEC » du compte à rebours selon la largeur ; il est désormais dans la même rangée que le
  compte à rebours (même emplacement voulu, sans chevauchement possible), bureau inchangé.
- **Contact** : colonne `minmax(0, 1fr)` et adresse e-mail sécable (débordait à 320 px).
- **Filet de sécurité** (`global.css`) : `overflow-x: clip` sur `html, body`.

Preuve : mesure automatique de toutes les pages (accueil, programme, billetterie, académie,
action sociale, infos pratiques, diaspora, FAQ, contact, actualités, galeries, mentions,
confidentialité, 3 pages orateurs) à 320, 360 et 375 px, **filet de sécurité désactivé** : aucune
page plus large que l'écran ; bouton du film sans chevauchement de 320 à 1440 px ; menu ouvert
contenu dans l'écran à 360 × 600 px. Lint, types, tests unitaires et e2e (axe-core inclus) OK.

**Statut : Couvert.**

**Accessibilité (NF-CNV-008) — CI rétablie le 1er novembre 2026.** Deux violations axe « serious »
faisaient échouer la CI depuis plusieurs commits, sur l'accueil, `/programme`, `/billetterie` et
`/faq` : (1) le filigrane « CONVENTION CRN 2026 » du pied de page, purement décoratif (WCAG 1.4.3
exempte la décoration), était un vrai nœud texte que l'audit mesurait — désormais généré en CSS
(`::before`, `Footer.astro`), rendu identique ; (2) la liste défilante de la bande « Écosystème »
ne contenait que des images et n'était donc pas atteignable au clavier — désormais focalisable
(`tabindex="0"`, nom accessible), défilement aux flèches, contour de focus or du GBIS
(`EcosystemBand.astro`). Preuve : `npx playwright test` (CI) — 11/11.

## Écart assumé par le Commanditaire — images à visages générés par IA pour les cartes Trône/Autel/Cité (1er novembre 2026) — **sans objet depuis le 5 novembre 2026** (images remplacées, foule de dos ; voir « Habillage du site, deuxième série »)

L'utilisateur a fourni 3 images (foule en adoration, fidèles en prière à l'autel, famille marchant
vers la ville) pour illustrer les cartes « Le Trône », « L'Autel », « La Cité ». Ces images
présentent des visages de personnes manifestement générées par IA — en écart avec la règle absolue
« Aucun visage généré par IA. Photos réelles uniquement. » **Écart signalé par écrit au
Commanditaire avant toute intégration, refusé une première fois par le prestataire.** Le
Commanditaire — auteur du cahier des charges dont est issue cette règle — a explicitement réitéré
sa demande en déclarant assumer l'entière responsabilité de cette décision pour son propre projet.
Sur cette base, les images ont été intégrées :
- `src/assets/images/mouvement-trone.webp` → carte « Le Trône »
- `src/assets/images/mouvement-autel.webp` → carte « L'Autel »
- `src/assets/images/mouvement-cite.webp` → carte « La Cité »

**Statut : Partiel.** Conforme à la décision assumée du Commanditaire, mais en écart persistant
avec la règle écrite du cahier des charges — à reconsidérer avant toute mise en production réelle
si le Commanditaire change d'avis, et à ne pas reproduire ailleurs sur le site sans confirmation
équivalente au cas par cas.

## Dérogation signalée — or en aplat sur le médaillon « Voir le film » (28 octobre 2026)

Le GBIS v2.1 et la pratique constante de ce projet interdisent l'or en aplat de fond sur un
bouton (règle appliquée partout ailleurs : CTA principal, pilule du menu, insigne « Prendre mon
pass »…). Le médaillon flottant « Voir le film » du héros de l'accueil (`Hero.astro`) déroge à
cette règle **à la demande explicite et confirmée de l'utilisateur**, après qu'il a constaté que
le fond bleu nuit initial se fondait visuellement dans le veston sombre de l'orateur en arrière-
plan, rendant le bouton peu visible. Le fond or (texte et icône en bleu nuit pour le contraste)
résout ce problème de lisibilité. **Cette dérogation est strictement limitée à cet unique élément**
— tous les autres boutons et CTA du site restent en bleu nuit, jamais en or plein.

## Dérogation signalée — défilement automatique de la bande « Écosystème digital CRN » (1er novembre 2026)

Règle absolue GBIS n°10 : « Aucun carrousel ni défilement automatique. Respect de
`prefers-reduced-motion`. » Appliquée partout ailleurs sur le site (la ligne des orateurs de
l'accueil, par exemple, ne défile qu'au clic/glissement de l'utilisateur). La bande des logos
partenaires (`EcosystemBand.astro`, visible en pied de toutes les pages) a d'abord été construite
selon cette même règle (défilement manuel aux flèches uniquement). **L'écart a été signalé par
écrit avant tout développement**, en expliquant le conflit avec la règle n°10 et en proposant
l'alternative conforme (défilement manuel enrichi, sans mouvement automatique). Le Commanditaire a
explicitement choisi l'option dérogatoire malgré cette mise en garde. Sur cette base :
- la bande défile désormais en continu, de façon autonome ;
- le défilement s'arrête au survol ou au focus clavier (« stopper au passage du curseur »), avec un
  effet de zoom sur le logo survolé ;
- les flèches prev/next manuelles restent disponibles et mettent le défilement automatique en
  pause le temps du mouvement ;
- les logos restent non cliquables (aucun lien) ;
- `prefers-reduced-motion` reste respecté : le défilement automatique ne démarre pas du tout pour
  ces utilisateurs, qui conservent le défilement manuel aux flèches.

**Extension (1er novembre 2026) — ligne des orateurs de l'accueil.** Le Commanditaire a demandé
explicitement le même traitement pour la ligne des orateurs (`index.astro`, section « Les
orateurs ») : défilement autonome, pause au survol/focus, zoom sur la photo survolée. Même
mécanique technique (second jeu de cartes dupliqué, masqué aux lecteurs d'écran/clavier via
`aria-hidden` + `inert`, boucle continue sans saut visible) et mêmes garde-fous
(`prefers-reduced-motion` désactive tout défilement automatique, flèches manuelles conservées,
cartes orateur restent cliquables — seules les photos elles-mêmes ne portent pas de lien distinct).

**Cette dérogation reste strictement limitée à ces deux éléments** (bande « Écosystème digital
CRN » et ligne des orateurs de l'accueil) — aucune autre zone du site (bannières, galeries, grille
tarifaire…) ne doit reproduire un défilement automatique sans confirmation équivalente au cas par
cas.

## Refonte des pages internes (1er novembre 2026) — cohérence visuelle

À la demande du Commanditaire (« plus d'allure, de prestance », « ergonomie »), toutes les pages
internes (hors accueil, déjà traité) reçoivent un gabarit d'en-tête commun :
- `PageHero.astro` (fil d'Ariane + étiquette + titre + intro, fond « feature » sombre identique aux
  bandeaux de l'accueil) sur les 14 pages concernées (programme, billetterie, académie, action
  sociale, infos pratiques, diaspora, FAQ, contact, orateurs, actualités, mentions légales,
  confidentialité, les 4 pages multimédia) ;
- `InfoCard.astro` (carte claire élevée, liseré or, ombre, survol) remplace les styles de carte
  ad hoc de chaque page (lieux, classes de l'Académie, blocs diaspora) ;
- `Breadcrumb.astro`, réutilisé aussi sur la fiche orateur individuelle.
- Correction au passage : la fiche orateur affichait le nom/rôle deux fois (une fois dans la carte
  photo, une fois dans le titre) — `SpeakerCard.astro` accepte désormais `hideCaption` pour ce cas.

Aucun changement de contenu ni de palette ; build de production (27 pages), `npm run typecheck` et
`npm run lint` vérifiés sans erreur après la refonte.

## Nom de domaine et hébergement (1er novembre 2026) — ARB-PAGE-02 résolu

Le Commanditaire a confirmé le nom de domaine définitif : `www.crn-convention2026.events`,
hébergement Hostinger. Reporté dans `astro.config.mjs` (`site`) et dans les gabarits `.env.example`
(racine et `backend/`).

**Reste ouvert** : le type d'offre Hostinger (mutualisé/partagé ou VPS) n'est pas encore précisé —
cela conditionne directement la faisabilité du back-office (lot L3) tel que construit (Docker +
PostgreSQL), qui nécessite un VPS. Un hébergement mutualisé classique ne permet pas de faire
tourner Docker/Postgres ; le cas échéant, le back-office devrait être hébergé ailleurs (VPS séparé)
ou son architecture reconsidérée. Signalé au Commanditaire avant toute tentative de déploiement.

## Lot L3 — Back-office (1er novembre 2026, en cours)

Scaffold du back-office demandé par le Commanditaire : `backend/` (Payload CMS 3 sur Next.js +
SQLite — voir entrée « bascule PostgreSQL → SQLite » ci-dessous), collections/globals alignés 1:1
sur `src/content.config.ts` (`Venues`, `Artists`, `Faq`, `Speakers`, `Products`, `Announcements`,
`ProgramDays`, global `Settings`), comptes `Users` avec rôle `admin`/`editeur`, script de migration
`backend/scripts/migrate-from-content.ts` (reprend le contenu réel existant, n'en invente aucun),
adaptateur de lecture `src/lib/cms.ts` côté site. Détail complet et flux de publication dans
`C:\Users\Mael\.claude\plans\jaunty-cuddling-kahn.md` (section « Lot L3 »).

**Statut : Partiel.** Démarrage réel confirmé en développement (`npm run dev`) et en production
(`npm run build` + migrations + `node server.js`) : base SQLite créée/migrée, admin Payload
accessible. Reste à confirmer sur un poste disposant de Docker : `docker compose up` (qui applique
les migrations automatiquement, voir `Dockerfile`), création du premier compte, import réel du
contenu existant, lecture du contenu importé par le site. **Les pages du site ne sont
volontairement pas encore rebranchées sur `src/lib/cms.ts`** (elles continuent de lire
`src/content/**` via Astro Content Collections) : basculer maintenant aurait rendu le site,
actuellement fonctionnel et déployé, dépendant d'un back-office non encore entièrement vérifié
(migration réelle, puis compatibilité de l'offre Hostinger). Le rebranchement interviendra une fois
le back-office confirmé opérationnel en production.

## Lot L3 — bascule PostgreSQL → SQLite (1er novembre 2026) — adaptation hébergement mutualisé

Le Commanditaire a confirmé l'hébergement retenu : `www.crn-convention2026.events` sur Hostinger,
offre **mutualisée** (Premium/Business), pas un VPS. Or l'architecture approuvée pour le lot L3
reposait sur PostgreSQL + Docker, tous deux absents d'un hébergement mutualisé. **Écart signalé par
écrit avant modification** : trois options proposées (VPS séparé, report du back-office, adaptation
à l'hébergement mutualisé) — le Commanditaire a choisi l'adaptation. Changement effectué :
adaptateur de base de données remplacé par `@payloadcms/db-sqlite` (fichier local, aucun serveur de
base de données séparé requis), dans `backend/payload.config.ts`, `backend/package.json`,
`backend/docker-compose.yml`, `backend/.env.example`, `backend/README.md` (section de déploiement
Hostinger ajoutée). Les collections, globals et le script de migration restent inchangés (API
Payload indépendante de l'adaptateur de base de données).

**Suivi du 1er novembre 2026 — disponibilité Node.js confirmée.** Le Commanditaire a vérifié dans
hPanel : une application Node.js est disponible sur son offre (section *Avancé → Node.js App*),
versions 18/20/22/24 proposées. `backend/package.json` déclare `"engines": {"node": ">=20.9.0"}`
(exigence de Payload 3.45), donc 20.x/22.x/24.x conviennent ; Hostinger détecte la version adaptée
à partir de ce champ.

Point technique résiduel traité en conséquence : l'offre Node.js App d'hPanel (modèle Phusion
Passenger) attend typiquement un fichier de démarrage qui écoute sur le port fourni via la
variable d'environnement `PORT`, pas un script `npm start` à port fixe. Un fichier
`backend/server.js` dédié a été ajouté (serveur Next.js personnalisé, `process.env.PORT`) et
**vérifié réellement** : `PORT=3055 NODE_ENV=production node server.js` démarre et sert l'admin
Payload sur ce port.

Cette vérification de bout en bout (`npm run build` puis démarrage en production) a aussi révélé
deux défauts réels, corrigés :
- `backend/scripts/migrate-from-content.ts` contenait une erreur de typage sur les identifiants
  d'orateurs (hypothèse de l'ancienne architecture Postgres, incompatible avec les identifiants
  numériques de SQLite) — détectée seulement par `next build` (pas par `tsc --noEmit` seul) et
  corrigée.
- Le mode production de Payload (contrairement au mode développement) ne crée pas le schéma de
  base automatiquement : une première tentative de démarrage en production échouait
  (`SQLITE_ERROR: no such table: users`). Ajout du flux de migrations Payload standard
  (`npm run migrate:create` / `npm run migrate`), migration initiale commitée
  (`backend/src/migrations/20261101_141150.ts`), appliquée automatiquement par le conteneur Docker
  (`Dockerfile`, `CMD`) et documentée pour Hostinger dans `backend/README.md`.

**Statut : Partiel.** Démarrage réel en production vérifié localement (build, migration, admin
accessible via `server.js` sur un port assigné dynamiquement — le mécanisme attendu par Hostinger).
Écart résiduel, non vérifiable depuis cet environnement : le comportement exact de l'interface
Node.js App d'hPanel sur le compte réel du Commanditaire (limites mémoire, étapes d'installation
propres à Hostinger) — à confirmer par le Commanditaire lors du déploiement réel. En cas
d'incompatibilité malgré cette préparation, la solution de repli reste un VPS séparé.

## Réseaux sociaux (1er novembre 2026) — liens réels

Les icônes Facebook/YouTube/TikTok/Instagram/LinkedIn/X (barre utilitaire + page Contact)
pointaient vers `#` (URL à renseigner, signalé dans le code depuis le début du lot L2). Le
Commanditaire a fourni les URL réelles des comptes CRN International : reprises telles quelles
dans `src/lib/social.ts`, en simples liens de sortie ouverts en nouvel onglet
(`target="_blank" rel="noopener noreferrer"`) — toujours aucune intégration/widget/SDK tiers,
conforme NF-CNV-001 (cf. commentaire déjà présent dans `TopBar.astro`).

## Agent d'accueil NASTY (1er novembre 2026) — chat sur site, pas de canal WhatsApp

Le Commanditaire a demandé un agent conversationnel (« NASTY ») accessible en permanence
(bouton flottant bas-droite, toutes pages) et joignable *aussi* par WhatsApp Business.

**Écart signalé et tranché avant codage** : WhatsApp (whatsapp.com) figure explicitement sur la
liste des domaines interdits (NF-CNV-001) — l'intégrer contredirait la raison d'être du site
(rester accessible sans VPN aux fidèles du Gabon, où WhatsApp/Facebook/etc. sont bloqués).
Informé de ce conflit, **le Commanditaire a choisi l'option conforme** : NASTY reste strictement
sur le site, aucun canal WhatsApp.

Implémentation :
- `src/components/shared/ChatWidget.astro` — bouton flottant bas-droite (toutes pages, via
  `BaseLayout.astro`), persona et ton définis par le Commanditaire (jeune Gabonaise de 25 ans,
  experte en communication événementielle) ; avatar en monogramme stylisé, **jamais de visage
  généré par IA** (règle n°4) ; respecte `prefers-reduced-motion` (le halo pulsé du bouton suit la
  même règle globale que les autres animations du site).
- `backend/src/lib/nasty.ts` — persona + base de connaissance, reprise mot pour mot de
  `docs/donnees-reference.md`. Les contenus interdits au public (repas DIAMANT, petit-déjeuner des
  orateurs, enregistrements médias) sont **absents de ce qu'elle sait**, plutôt que « sus mais
  consigne de ne pas dire » — elle ne peut pas révéler ce qu'elle ignore.
- `backend/src/app/(payload)/api/chat/route.ts` — point d'entrée appelé par le navigateur du
  visiteur en direct (seule exception du site à « aucun appel réseau client vers un service
  externe » : ici le service appelé, api.anthropic.com, n'est pas un domaine interdit de la liste
  NF-CNV-001). Limiteur de débit basique par IP (`backend/src/lib/rate-limit.ts`). Sans
  `ANTHROPIC_API_KEY` configurée, répond par un message d'indisponibilité élégant plutôt que de
  planter.

**Statut : Partiel.** Le widget et sa gestion d'erreur sont vérifiés dans le navigateur (ouverture/
fermeture, envoi, message de repli si le serveur ne répond pas). Le serveur `backend/` démarre
avec succès (Next.js + Payload compilent et s'initialisent correctement) et échoue exactement là
où attendu sans base de données réelle (erreur de connexion PostgreSQL, ECONNREFUSED) — confirme
que l'ensemble de la chaîne est correctement raccordé, reste à vérifier avec un vrai Postgres
(`docker compose up`, hors de ce bac à sable). L'appel réel à l'IA n'a pas pu être vérifié de bout
en bout (pas de clé API fournie au moment de l'écriture). À vérifier une fois
`ANTHROPIC_API_KEY` renseignée.

### Écart assumé par le Commanditaire — photo de NASTY (1er novembre 2026)

Le Commanditaire a fourni une photo pour représenter NASTY (badge/bannière au texte déformé,
aspect caractéristique d'une image générée par IA) — en écart avec la règle absolue « Aucun visage
généré par IA. Photos réelles uniquement. » **Écart signalé par écrit avant intégration**,
accompagné d'une seconde réserve : NASTY étant présentée aux visiteurs comme une IA
conversationnelle, lui donner un visage photoréaliste risque de laisser croire qu'un agent humain
répond derrière le chat. **Le Commanditaire a explicitement choisi d'intégrer la photo malgré ces
deux réserves**, acceptant la responsabilité de cette décision pour son propre projet (même
mécanisme que l'écart Trône/Autel/Cité ci-dessus). Sur cette base, la photo a été intégrée :
`public/images/nasty/nasty.webp`, utilisée dans `ChatWidget.astro` (bouton flottant et en-tête du
panneau) et sur sa page dédiée `src/pages/nasty.astro`.

**Statut : Partiel.** Conforme à la décision assumée du Commanditaire, en écart persistant avec la
règle écrite du cahier des charges — à reconsidérer si le Commanditaire change d'avis, et à ne pas
reproduire ailleurs sur le site sans confirmation équivalente au cas par cas.

## Page Contact (1er novembre 2026) — formulaire sans back-end

Nouvelle page `/contact` (mise en page inspirée d'un modèle fourni par le Commanditaire — jamais
son code, ses images ou sa marque, même principe qu'ailleurs sur le site) : formulaire (prénom,
nom, e-mail, téléphone facultatif, message) et volet coordonnées. **Aucune donnée inventée** :
hotline (+241 70 10 10 10) et e-mail repris tels qu'établis dans `TopBar.astro` (e-mail remplacé
le 1er novembre 2026 par `contact@crn-convention2026.events`, à la demande du Commanditaire) ; aucun numéro SMS/WhatsApp affiché (non arrêté, et un lien `wa.me` serait de toute
façon un domaine interdit — NF-CNV-001). Réseaux sociaux : mêmes icônes/liens placeholder `#` que
la barre utilitaire, à renseigner par l'équipe digitale.

**Statut : Partiel.** Ce lot (L2) n'a pas de back-end de formulaire : à la soumission, le message
est envoyé via `mailto:` (pré-rempli, ouvre la messagerie du visiteur) plutôt que publié en silence
comme « envoyé avec succès ». Une vraie passerelle (file d'attente, accusé de réception) reste à
arbitrer pour un lot ultérieur.

## Passe « motion design » (1er novembre 2026) — pas une dérogation

À la demande du Commanditaire (« rendre le site plus attrayant »), une révélation au défilement a
été ajoutée sitewide (titres de section, grilles de cartes, FAQ, actualités), ainsi que quelques
micro-interactions (entrée en cascade du héros, compteur animé de la bande « chiffres clés »,
battement des secondes du compte à rebours, retour tactile des boutons). **Ceci ne constitue pas un
écart à la règle n°10** : chaque élément n'apparaît qu'une seule fois à son entrée dans l'écran
(jamais de boucle ni de contenu qui tourne), `prefers-reduced-motion` est vérifié à la fois en JS
(révélation immédiate sans observer) et en CSS (filet de sécurité global neutralisant
durées/délais). Implémentation : `[data-reveal]`/`[data-reveal-group]` dans `global.css` +
script dans `BaseLayout.astro` ; fond, mise en page et contenu des sections inchangés.

## Métamorphose visuelle (26 octobre 2026) — évolution contemporaine de la géométrie

À la demande du Commanditaire, le système de composants a été retravaillé pour un rendu plus
audacieux et international (inspiration de dispositions et de formes d'un gabarit événementiel
commercial, jamais de son code, ses images ou son texte — même principe que l'analyse Eventro),
**en conservant intégralement la palette, les familles typographiques et les règles de contraste
du GBIS v2.1** :
- Jetons `--radius-card` (5→20 px), `--radius-control` (4→10 px) et nouveau `--radius-pill` (999 px)
  : cartes et boutons passent à une géométrie généreuse et contemporaine. Palette et typographie
  inchangées.
- CTA signature : insigne circulaire bleu nuit (« Prendre mon pass ») dans l'en-tête, seul élément
  primaire de chaque écran ; tous les autres boutons restent secondaires (contour).
- Carte centrale des « Trois mouvements » (L'Autel) et carte « Pass Académie Intégral » mises en
  avant en fond bleu nuit avec filet or — jamais l'or en aplat, toujours vérifié composant par
  composant.
- Fiches orateurs : cadre en arche avec anneau pointillé or (toujours un cadre neutre, « Photo
  réelle à fournir », jamais de visage généré).
- FAQ : état actif rempli bleu nuit (remplace un remplissage de couleur hors palette observé sur
  la référence). Onglets du programme : pastille pleine bleu nuit à l'état actif.
- Bande thème et pied de page : typographie « fantôme » surdimensionnée en contour (`-webkit-text-
  stroke`), sans aucune image ni motif « confettis » — un seul ton éditorial, sobre, dans la charte.
- Pied de page assombri (bleu nuit profond) pour un effet d'encadrement avec le héros, cohérent
  avec le principe GBIS de dominance bleu nuit sur les couvertures faîtières.
- Revérifié intégralement après refonte : `npm run typecheck` (0 erreur), `npm run lint`
  (0 erreur), `npm run test` (15/15), `npm run test:e2e` (11/11, y compris l'accessibilité sur les
  nouveaux états remplis bleu nuit — 0 violation critique/sérieuse), build de production (21 pages).

## Refonte de l'accueil (26 octobre 2026) — maquette de référence utilisateur

L'accueil a été densifié à partir d'une maquette fournie par le Commanditaire (séquence proche de
l'analyse Eventro : héros, mouvements, chiffres, film, programme, bande thème, orateurs,
plateformes, billetterie, action sociale/diaspora, FAQ/actualités), **en adaptant tout élément qui
s'écartait du GBIS** :
- Boutons dorés de la maquette → ramenés au bleu nuit (un seul bouton primaire par écran, dans
  l'en-tête) ; les CTA répétés ailleurs restent en style secondaire.
- Chiffres du compte à rebours et de la bande chiffres clés en or sur fond bleu nuit : conforme
  à la règle GBIS (grand corps, gras — contraste mesuré ≥ 7,8:1, largement au-dessus du seuil de
  3:1 pour le grand texte). Jamais d'or en texte sur fond clair (vérifié composant par composant).
- Sections sans photo réelle disponible (mouvements, chiffres, film, programme, orateurs,
  plateformes) traitées en icônes au trait (grille 24 px, 1,5 px, GBIS §07) et aplats de couleur,
  plutôt que d'inventer des visages ou des photographies d'activité.
- Section « Le film » : cadre graphique honnête « Vidéo à venir », aucune image de salle ou de
  public laissant croire à un tournage déjà réalisé. **Mise à jour du 1er novembre 2026** : une
  vidéo réelle (« Logo animé CRN Convention 2026 ») a été fournie par l'utilisateur et intégrée
  (`public/videos/film-convention-crn-2026.mp4`) ; la section et le médaillon du héros ouvrent
  désormais un lecteur modal réel au clic, chargé à la demande (aucun poids ajouté au chargement
  de la page). L'état « à venir » ne s'applique donc plus à cette section.
- Section « Actualités » : trois faits réels (ouverture billetterie, révélation des orateurs,
  collecte de l'action sociale), aucune actualité inventée.
- Section newsletter de la maquette non reprise : aucun formulaire de collecte sans traitement
  réel derrière (hors scope L2, cf. F-CNV-052).
- Nouvelle collection `announcements` (alignée sur le même principe 1:1 avec le futur CMS).
- Vérifié : `npm run typecheck` (0 erreur), `npm run lint` (0 erreur), `npm run test` (15/15),
  `npm run test:e2e` (11/11, dont l'audit réseau NF-CNV-001 sur 5 pages et l'accessibilité
  NF-CNV-008 sur 4 pages — 0 violation critique/sérieuse), build de production (21 pages),
  revue visuelle complète mobile et ordinateur dans Chrome.
- Poids de l'accueil après refonte : ~50 Ko HTML + ~36 Ko CSS + ~155 Ko image héros + ~13 Ko logo +
  polices (chargées par sous-ensemble unicode réellement utilisé) ≈ 430 Ko au pire cas, JS inline
  ≈ 8 Ko (dont les données du programme pour les onglets du jour) — toujours très en dessous du
  budget de 1,5 Mo (NF-CNV-003).

## Lot L2 — version minimale de l'état 1 (31 octobre 2026)

| Réf. | Exigence (résumé) | Statut | Preuve |
| --- | --- | --- | --- |
| F-CNV-001 | Billetterie accessible en un geste depuis toute page | Couvert | CTA « Prendre mon pass » dans `Header.astro`, présent sur toutes les pages |
| F-CNV-002 | Bascule programmée entre les trois états | **Partiel** | `computeConventionState()` (`src/lib/state.ts`) implémentée et testée (`tests/unit/state.test.ts`). Le site L2 est statique : une génération reflète un seul état. Une bascule *sans intervention du prestataire* au sens strict suppose soit l'admin CMS (L3), soit une reconstruction programmée (L5) — non encore mise en place |
| F-CNV-003 | Compte à rebours jusqu'au 6 décembre | Couvert | `Countdown.astro` + `computeCountdown()` testée unitairement |
| F-CNV-004 | Bandeau publiable en moins de 2 minutes | **Partiel** | Bandeau piloté par `src/content/settings/etat-convention.json` ; publication instantanée après modification + déploiement, mais sans interface d'édition avant l'outil d'administration (L3) |
| F-CNV-005 | Liens directs partageables par section | Couvert | Chaque section a sa propre URL (`/programme`, `/billetterie`, etc.) et le programme des ancres par jour (`#jour-AAAA-MM-JJ`) |
| F-CNV-010 | Programme maître unique, saisi une fois | Couvert | Collection `program` unique, consommée par `/programme` et par `/academie` (mêmes données) |
| F-CNV-012 | Fiches orateurs à révélation programmée | **Partiel** | `isPublished()` testée unitairement ; appliquée au moment du build (site statique), même limite que F-CNV-002 |
| F-CNV-013 | Lien classe Académie → Pass correspondant | Couvert | `/academie` renvoie vers `/billetterie#academie` |
| F-CNV-020 | Grille tarifaire conforme section VI du document de référence | Couvert | Produits seedés mot pour mot depuis `docs/donnees-reference.md` ; **reste à faire valider formellement par le Commanditaire** avant toute mise en production réelle |
| F-CNV-021 | Règles d'accès : nominatif, QR code, aucun accès verbal | Couvert | `AccessRules.astro` sur `/billetterie` ; rappelé en FAQ |
| F-CNV-022 | Billetterie transitoire, sans dépendance bloquante | **Partiel** | Lien externe placeholder (`#billetterie-a-configurer`) en attendant l'URL réelle (ARB-CONV-01) ; la Page elle-même ne dépend d'aucun service externe pour fonctionner |
| F-CNV-023 | Indication « complet » par produit | Couvert (mécanisme) | `PriceCard.astro` gère le statut `complet` ; non utilisé dans les données actuelles (aucun produit complet à ce jour) |
| NF-CNV-001 | Aucune requête vers un domaine bloqué au Gabon | Couvert | Polices auto-hébergées (Fontsource), aucun script tiers ; vérifié par `tests/e2e/parcours-et-domaines.spec.ts` sur 5 pages |
| NF-CNV-002 | Conception mobile en priorité | Couvert | CSS mobile-first (`src/styles`), tests Playwright en 360×740 |
| NF-CNV-003 | Accueil < 1,5 Mo, contenu principal < 3 s en 4G | Couvert | Mesuré sur le build de production : ~146 Ko transférés pour l'accueil (HTML + CSS + police + logo), ~1,4 Ko de JS ; très en dessous du budget. Mesure en conditions réelles 4G depuis Libreville restant à faire avant publication |
| NF-CNV-004 | Images compressées et dimensionnées | Couvert (partiel) | Logo optimisé via `astro:assets`/sharp ; à étendre aux photographies réelles une fois fournies |
| NF-CNV-008 | Accessibilité : contrastes, focus, zones tactiles, alternatives | Couvert | Focus visible (contour or 2 px), zones tactiles ≥ 44 px, `axe-core` sur 4 pages (`tests/e2e`) |
| NF-CNV-009 | Référencement : titres, descriptions, aperçu de partage | Couvert | Meta title/description/canonical/Open Graph par page (`BaseLayout.astro`) |
| SEC-CNV-003 | Aucune donnée de paiement stockée par la Page | Couvert | Aucun champ de paiement dans le modèle de données ; test de garde (`tests/unit/content-integrity.test.ts`) |
| Règle R5 | Aucune donnée inventée ; « À annoncer » pour le non arrêté | Couvert | Pass OR/DIAMANT, lieu du Dîner des Élites, orateur du 13 décembre marqués « À annoncer » ; test de garde sur les contenus interdits (repas DIAMANT, petit-déjeuner des orateurs, enregistrements) |

## Vérifications exécutées (26 octobre 2026)

- `npm run typecheck` (`astro check`) : **0 erreur**.
- `npm run lint` (ESLint) : **0 erreur**.
- `npm run test` (Vitest) : **15/15 tests verts** (machine à états, intégrité des contenus).
- `npm run build` : build de production réussi, 21 pages générées.
- Revue visuelle mobile (375 px) et ordinateur dans un navigateur réel, sur le build de production :
  accueil, orateurs (état « à venir » avant révélation), académie, billetterie — aucune anomalie
  visuelle, aucune erreur console.
- Requêtes réseau de l'accueil observées dans le navigateur : uniquement `localhost` (HTML, CSS,
  police auto-hébergée, logo) — aucune requête tierce.
- Écart technique au plan initial, sans impact sur le périmètre : Astro 7 a retiré l'ancienne API de
  collections de contenu (`src/content/config.ts`) au profit de l'API Content Layer
  (`src/content.config.ts`, loaders explicites). Migré en conséquence.

## Nouveau composant — barre hotline et réseaux sociaux

`TopBar.astro` (nouveau) : barre permanente en tête de page, hotline (`tel:+24170101010`) à gauche
et six icônes de réseaux sociaux (Facebook, YouTube, LinkedIn, Instagram, TikTok, X) à droite.
Points de conformité :
- Icônes en silhouette monochrome (GBIS §07), jamais le logo de marque en couleur.
- **Simples liens de sortie, aucune intégration/widget/SDK tiers** — conforme à NF-CNV-001 et à la
  recommandation de l'analyse Eventro (§2.3) : « acceptables en simples liens, jamais en
  intégrations ». Vérifié par `tests/e2e/parcours-et-domaines.spec.ts` (aucune requête vers
  facebook.com, youtube.com, instagram.com, tiktok.com — 0 échec après ajout).
- **`href="#"` provisoire sur chaque icône** : les URL réelles des comptes CRN (Facebook, YouTube,
  LinkedIn, Instagram, TikTok, X) ne sont pas connues du prestataire et n'ont pas été inventées
  (règle R5). **À renseigner par l'équipe digitale du CRN avant publication réelle.**
- Le bandeau d'information dynamique (`InfoBanner`, F-CNV-004, piloté par `src/content/settings`,
  champ `bandeau.actif`) reste pleinement fonctionnel dans le code — **désactivé provisoirement**
  (`actif: false`) à la demande explicite de l'utilisateur, le nouveau bloc TopBar jouant déjà le
  rôle de barre permanente en tête de page. Réactivable instantanément (repasser `actif: true`)
  sans déploiement de code : aucune perte de la capacité de publier une annonce prioritaire en
  moins de 2 minutes.

## Écart signalé — photographie du héros

**ÉLEVÉ.** L'image d'arrière-plan du héros de l'accueil (`src/assets/images/hero-venue-2.webp`,
remplace `hero-venue-1.webp` à la demande explicite de l'utilisateur) a l'apparence d'un rendu
généré par IA ou d'un photomontage (façade stylisée, blason CRN surimposé, lumière et reflets
irréels), et non d'une photographie brute d'un lieu de la Convention. Le GBIS v2.1 et le cahier des
charges demandent des photos réelles uniquement pour ce type d'usage (« Aucun visage généré par
IA » ; « Photographie : uniquement des photos réelles »). Installée ici à la demande explicite de
l'utilisateur, assumée comme visuel d'atmosphère provisoire, **sous réserve de validation du
Commanditaire** avant toute publication réelle. À remplacer par une photographie réelle du lieu dès
qu'elle sera disponible.

## Écart signalé — portrait d'orateur en héros

**ÉLEVÉ.** Un portrait d'orateur réel (`src/assets/images/hero-orateur-1.webp`, détourage avec
canal alpha) a été ajouté en composition du héros de l'accueil, à la demande explicite de
l'utilisateur, qui a confirmé qu'il s'agit d'une **photographie réelle d'un orateur de la
Convention, utilisée avec l'accord de la personne et du CRN**. Cette confirmation n'a pas pu être
vérifiée techniquement par le prestataire (aucun justificatif joint). Conformément à la règle R4
(« aucune image de personnalité publique sans accord explicite ») et SEC/vie privée du cahier des
charges, **le Commanditaire doit confirmer par écrit, avant toute publication réelle** : l'identité
de la personne représentée, son consentement explicite pour cet usage précis (page d'accueil,
composition héros), et la source/les droits d'usage de l'image. À défaut de confirmation, remplacer
par un cadre neutre comme pour les autres fiches orateurs.

## Accent or — barre utilitaire et héros (27 octobre 2026)

À la demande du Commanditaire, un traitement or plus affirmé a été appliqué à deux endroits, en
restant strictement dans la palette GBIS v2.1 et ses règles de contraste :
- **`TopBar.astro`** : fond passé en dégradé `--crn-or` / `--crn-or-lumiere` (les trois seules
  teintes or de la palette, aucune couleur hors charte). Texte et icônes (hotline, 6 réseaux
  sociaux) repassés en `--crn-bleu-nuit-profond` pour un contraste mesuré ≈ 4,8:1 (conforme WCAG AA
  texte normal). Icônes sociales agrandies (16→20 px, cercle 28→34 px). Survol : cercle qui bascule
  en bleu nuit profond avec icône or clair, léger soulèvement — jamais de texte or sur fond clair à
  aucun état.
- **Héros (accueil)** : l'eyebrow « Convention CRN 2026 », la ligne date/lieu avec ses icônes, et
  les valeurs du compte à rebours passent de `--crn-or-lumiere` à `--crn-or` (teinte plus foncée),
  toujours sur fond sombre (voile du héros) avec ombre portée — conforme au régime de contraste
  « grand corps/gras » déjà validé pour l'or sur bleu nuit.
- **Boutons du héros** (« Prendre mon pass », « Voir le programme ») : au survol, la bordure et le
  texte basculent vers l'or clair avec un léger soulèvement et une flèche animée, **le fond reste
  transparent/très faiblement teinté (jamais l'or en aplat de bouton — règle GBIS absolue)** ; c'est
  l'interprétation retenue pour « changement de couleur vers l'or au survol », qui concilie la
  demande et la règle « jamais l'or en aplat », jamais résolue en silence.

## Hors scope de ce lot (prévu L3 et suivants)

SEC-CNV-001/002/004 à 008 (HTTPS, 2FA, anti-spam, sauvegarde, journalisation — dépendent de
l'hébergement et de l'administration), F-CNV-030 à 036 (direct), F-CNV-040 à 044 (offrandes),
F-CNV-050 à 054 (écosystème, hors F-CNV-012), F-CNV-060 à 063 (administration), INT-CNV-001 à 007.

## Point de polish identifié (non bloquant)

- Apostrophes droites (`'`) corrigées en apostrophe typographique (`'`) dans tout le contenu
  (`src/content/**/*.json`). Il en reste dans le texte « en dur » de quelques pages `.astro` : un
  remplacement global y est plus risqué (l'apostrophe y sert aussi à la syntaxe JS/JSX) et a été
  laissé à une relecture dédiée avant publication réelle plutôt que traité par substitution
  automatique non supervisée.

## Refonte « La Convention » et ajout du menu Multimédia (27 octobre 2026)

- La section d'accueil « Une vision. Trois mouvements. » adopte une composition à bandeau + badge
  d'icône à cheval (demande explicite, sur un modèle de référence fourni). Le modèle montrait des
  photographies ; **aucune photo réelle n'existe pour ces trois notions abstraites** (Trône/Autel/
  Cité), donc le bandeau reste un dégradé GBIS à motif pointillé — traitement graphique, conforme
  au choix déjà acté plus haut dans ce document plutôt qu'une photo générique/fabriquée. Les
  sous-titres de carte sont la copie déjà approuvée, simplement scindée à la ponctuation
  (« : ») ; aucun mot n'a été ajouté ou changé.
- Nouvelle entrée de menu **Multimédia** (sous-menu : Galerie vidéos, Galerie photos, Galerie
  audios, Actualités), avec un sous-menu accessible au clic/tap (clavier et tactile), fermeture à
  Échap ou au clic extérieur. Pages créées en `src/pages/multimedia/` avec un état « contenu à
  venir » explicite — aucun média n'existe encore, rien n'est simulé.
- **Écart corrigé — en-tête bureau** : un bug signalé par l'utilisateur rendait le texte du menu
  invisible au survol (règle de survol générique qui forçait une couleur bleu nuit, illisible sur
  le fond sombre du menu posé sur le héros) ; corrigé en donnant à chaque état de l'en-tête sa
  propre couleur de survol. Un second bug faisait disparaître les dernières catégories du menu
  (une bordure et un `overflow` non réinitialisés pour le mode bureau recadraient le menu, hérités
  du nouveau style de menu déroulant mobile) ; corrigé par une réinitialisation explicite. Avec
  l'ajout de Multimédia (7 catégories), le menu peut désormais passer sur deux rangées à l'intérieur
  de la pilule sur certaines largeurs d'écran plutôt que de déborder ou de masquer des catégories —
  compromis assumé plutôt que de réduire le texte sous 16 px (règle GBIS absolue).

## Dette technique assumée pour L2 (à résorber en L3–L5)

- Pas de CMS : contenu en fichiers versionnés (`src/content/`). Schéma conçu 1:1 avec le futur
  Payload CMS pour une migration directe.
- Pas de reconstruction programmée : les bascules d'état et révélations progressives sont correctes
  au moment du build, mais ne se déclenchent pas seules en production tant qu'aucun déclencheur
  programmé (cron CI, ou admin L3) n'est en place.
- Lien de billetterie et moyens de paiement non branchés (attente ARB-CONV-01 et ARB-PAGE-08).

## CRN Boutique — Palier 1, cœur métier (4 novembre 2026)

Plan validé par le Commanditaire (`C:\Users\Mael\.claude\plans\jaunty-cuddling-kahn.md`) :
Payload 3 + PostgreSQL (moteur, API, back-office) et Astro SSR (vitrine), conteneurisés sur VPS
derrière Cloudflare. Bloqué en attente du CRN : hébergement (VPS), grille tarifaire validée,
programme maître, agrégateur Mobile Money, CGV, e-mail transactionnel (questions 1 à 10 du plan).

Livré sans dépendre de ces réponses — `boutique/domaine/` (pur, sans réseau ni base, réutilisé tel
quel par l'API) :
- **Heure de Libreville** (`temps.ts`) : bornes à 00h00 UTC+1, dates impossibles refusées.
- **Montants** (`montants.ts`) : XAF entiers, espace fine des milliers, « 150 000 F CFA » ; euros
  à 655,957 arrondis.
- **Paliers tarifaires** (`paliers.ts`) : palier en vigueur, prochaine bascule (compte à rebours),
  prix garanti pendant la réservation puis palier à la confirmation, contrôle de cohérence.
- **Quotas** (`quotas.ts`, F03) : réservation 15 min, confirmation, libération ; règle identique
  à l'instruction SQL atomique prévue en base.
- **Jetons de billet** (`jetons.ts`) : 128 bits + HMAC-SHA256, aucune donnée personnelle, seule
  l'empreinte est stockée, comparaison à temps constant.
- **Droits d'accès par plateforme** (`droits.ts`, correction n° 5) : un droit par séance, second
  scan refusé avec heure et poste du premier passage, tout scan journalisé.
- **Paiements** (`paiements.ts`, correction n° 8) : interface `PaymentProvider`, traitement des
  webhooks idempotent, robuste au désordre, argent reçu après expiration → « à vérifier » (jamais
  de survente silencieuse) ; prestataire « bac à sable » signé HMAC pour tests et préproduction.

Preuve : 42 tests (`npx vitest run --root boutique/domaine`) — bascule à 23h59 puis 00h00
(Libreville), 200 demandes pour 50 places → 50 acceptées, webhooks doublon / désordre / signature
invalide, double scan refusé, jetons altérés rejetés ; types stricts OK ; ajoutés à la CI. Règles
permanentes de la boutique copiées dans `CLAUDE.md`. **Statut : en cours (Palier 1).**

## CRN Boutique — boutique complète en local (4 novembre 2026)

À la demande du Commanditaire (« construire toute la boutique en local, greffée sur le site, et
l'apprécier avant de pousser ») : boutique fonctionnelle de bout en bout sur le poste, **non
poussée** (branche locale `boutique-palier-1`).

- **API et back-office** (`boutique/api`, Payload 3.45 + PostgreSQL 16 local via embedded-postgres) :
  modèle de données du plan (catalogue, paliers, quotas, variantes, commandes, réservations,
  événements de paiement, titulaires, droits par séance, journal des scans, retraits,
  consentements, journal des actions), rôles nominatifs, tableau des ventes en tête du
  back-office, exports CSV, émission des billets PDF signés, e-mails capturés en local.
- **Vitrine** (`boutique/vitrine`, Astro rendu serveur) : styles du site importés tels quels,
  accueil avec comptes à rebours réels (palier du Pass Intégral, ouverture), rangées de produits
  (carrousel mobile, pastille or 8 → 24 px), fiche produit (séances publiques, kit, variantes),
  tiroir du panier (320 ms, voile flouté), tunnel en 3 étapes sans rechargement, paiement Mobile
  Money (simulé), suivi de commande, contrôle d'accès des agents, pages légales « à fournir ».
- **Catalogue importé** : tickets, tee-shirt et pagne au prix validé ; pass Or, Diamant,
  Intégral, Génération, Génération Plus « Prix à valider » (aperçu local uniquement).
- **Déploiement** : Docker Compose (PostgreSQL, API, vitrine, Caddy HTTPS, en-têtes de sécurité,
  CSP) prêt pour le VPS — non testé (pas de Docker sur le poste).

Preuves (base locale réelle) : 200 commandes simultanées sur 50 places → 50 acceptées, 150
refusées, aucune survente ; contrôle d'accès 6/6 (second scan refusé avec heure et poste,
plateforme non incluse, QR falsifié, 10 scans simultanés → 1 accepté) ; parcours Playwright
360 × 740 (3 titulaires, paiement simulé, 3 billets PDF) et lien de billet falsifié refusé ;
cœur métier 42 tests ; types API et vitrine sans erreur ; lint du site OK.

Écarts et décisions : PostgreSQL 16 (et non 18) en local, aligné sur la production — l'outil de
schéma de Payload 3.45 gère mal les contraintes NOT NULL nommées de PostgreSQL 18 ; binaires
téléchargés par reprise (connexion instable) et empreinte SHA-512 vérifiée contre npm.
**Statut : Palier 1 complet en local ; production bloquée** par les questions au CRN (VPS,
agrégateur Mobile Money, grille validée, e-mail, CGV).

## Boutique intégrée au site et au back-office (4 novembre 2026)

Consigne du Commanditaire : « La boutique de la convention n'est pas un site à part, elle fait
partie intégrante du site officiel […] Il faut faire une fusion des 2 en frontend et backend. »
Décision validée (« Good GO ») : la boutique vit à `crn-convention2026.events/boutique` et se gère
dans le back-office existant (Payload + SQLite chez Hostinger, sans VPS).

| Élément | Avant | Après |
| --- | --- | --- |
| Pages publiques | `boutique/vitrine` (Astro rendu serveur, domaine séparé) | `src/pages/boutique/` du site : catalogue et fiches statiques générés au build, panier / commande / paiement / suivi dans le navigateur ; en-tête, pied de page et NASTY du site |
| Moteur, API, back-office | `boutique/api` (Payload + PostgreSQL) | `backend/src/boutique/` dans le back-office existant (SQLite), groupes « Boutique · … », tableau des ventes en tête |
| Cœur métier | `boutique/domaine` | `backend/src/boutique/domaine` (inchangé, 42 tests) |
| Comptes | collection séparée | collection `users` existante, rôles ajoutés : catalogue, COM Boutique, comptabilité |
| Contrôle d'accès | `/scan` de la vitrine | `admin…/scan` (même origine que l'API, session de l'agent) |
| Migration | — | `backend/src/migrations/20261104_150801_boutique` (tables de la boutique, tailles d'image produit) |
| Liens du site (LOT A) | `boutique.crn-convention2026.events` | `/boutique…` avec le même suivi `utm_*` |
| Republication | — | une modification du catalogue ou des réglages de la boutique republie le site |

Preuves (4 novembre, poste local, base SQLite réelle) : cœur métier 42/42 ; 200 commandes
simultanées sur 50 places → 50 acceptées, 0 survente ; contrôle d'accès 6/6 ; types du back-office
et du site sans erreur ; tests unitaires du site 27/27 ; `/boutique` et les fiches produits
rendues dans le gabarit du site.

Écarts et suites : réservation atomique réécrite pour SQLite (une instruction conditionnelle,
SQLite sérialisant les écritures) ; les fiches statiques se mettent à jour à chaque republication
— le prix du palier et la disponibilité font foi côté serveur à la commande. Dossier `boutique/`
retiré du dépôt (les restes locaux non versionnés — dépendances, base PostgreSQL de test — peuvent
être supprimés par le Commanditaire). **Statut : fusion faite en local, non poussée.**

## Boutique — pass nominatifs, livraison dans le réseau, paiement multi-pays (4 novembre 2026)

Consignes du Commanditaire : « Tous les pass doivent être nominatifs générés avec un QR code à
l'achat et à scanner pour donner accès aux différents sites concernés » ; « les produits physiques
[…] livrés dans les différentes églises du réseau au Gabon ou hors du Gabon, ou à domicile ou lieu
de travail à Libreville exceptionnellement » ; paiement par « un agrégateur de mobile money et
carte qui couvre plusieurs pays », sans se limiter à Airtel Money et Moov Money.

| Consigne | Réalisation | Preuve |
| --- | --- | --- |
| Pass nominatifs à QR code, scannés par site | Déjà en place (un titulaire et un QR signé par exemplaire, émis au paiement, un droit par séance) ; ajout : un pass ou ticket ne peut être mis en vente sans au moins une séance (site et heure) ; le poste de scan affiche séance, site et heure | Achat e2e (3 billets, PDF) ; scan 6/6 |
| Livraison en église du réseau, Gabon et étranger | Collection « Églises du réseau » (pays, ville, adresse, horaires, frais, délai), choix à la commande, frais ajoutés au total, destination sur la commande, les articles à remettre, l'e-mail et le suivi | e2e : tee-shirt livré à l'église (démonstration) de Paris, frais 15 000 F CFA inclus, payé par carte |
| Domicile ou lieu de travail à Libreville, exceptionnel | Réglage de la boutique (activation, zone, frais, conditions) ; adresse et téléphone obligatoires | Validation serveur (`lib/livraison.ts`) |
| Agrégateur multi-pays, Mobile Money et carte | Plus aucun opérateur imposé : redirection vers la page sécurisée de l'agrégateur, moyen (Mobile Money / carte) et détail (opérateur, pays) enregistrés ; page de paiement simulée en local | Domaine 44/44 (redirection, moyen transmis) ; e2e : MTN MoMo — Cameroun |

Décisions à valider par le CRN : le retrait sur le lieu de la Convention reste proposé en plus des
deux modes demandés (désactivable dans les réglages) ; aucune église ni aucun frais n'est saisi en
production (mode non proposé tant que la liste est vide — données en démonstration locale
seulement, marquées « démonstration ») ; textes publics mis à jour (accueil de la boutique, FAQ,
NASTY) — la FAQ en production se modifie dans le back-office. Migration de la boutique régénérée
(`20261104_172946_boutique`, jamais déployée). **Statut : fait en local, non poussé.**

## Boutique — grille des pass validée (4 novembre 2026)

Le Commanditaire valide les montants et contenus du prompt maître pour les cinq pass jusque-là en
« Prix à valider » : Pass Convention Intégral (120 000 → 150 000 → 180 000 F CFA, bascules à 00h00
heure de Libreville, palier en cours 150 000 jusqu'au 30 novembre), Pass Génération (50 000,
18 – 28 ans), Pass Génération Plus (100 000, 18 – 28 ans), Pass Partenaire Or (500 000), Pass Grand
Partenaire Diamant (1 000 000). Ils sont mis en vente (import initial de la boutique, base locale),
reportés dans `docs/donnees-reference.md` et sur la page Billetterie du site. Le repas privé des
partenaires Diamant reste non mentionné au public (règle permanente). En production, les ventes de
ces pass restent conditionnées aux quotas (Dîner des Élites, repas privé) que le CRN doit
renseigner. **Statut : fait en local, non poussé.**

## Dérogation signalée — bannière de l'accueil de la boutique en diaporama (5 novembre 2026)

Règle permanente n° 10 : « Aucun carrousel ni défilement automatique. Respect de
`prefers-reduced-motion`. » **L'écart a été signalé par écrit avant tout développement**, avec
l'alternative conforme (volets changés uniquement par le visiteur) ; le Commanditaire a choisi le
défilement automatique avec pause. Périmètre strictement limité à la bannière de `/boutique`
(`src/components/boutique/BanniereDiaporama.astro`) : un volet par rayon (Pass, Tickets,
Articles), chacun avec son titre, son texte, son prix d'appel (plus petit prix en vigueur du rayon,
calculé depuis le catalogue) et son bouton. Garde-fous :
- défilement toutes les 6 s, bouton Pause visible, premier dans l'ordre du clavier (WCAG 2.2.2) ;
- mise en attente au survol, au focus clavier et quand l'onglet est caché ; arrêt définitif dès
  que le visiteur choisit un volet (onglet, flèche, glissement au doigt, flèches du clavier) ;
- aucun défilement automatique ni animation si `prefers-reduced-motion` ;
- motif « carrousel à onglets » de l'APG WAI-ARIA (volets inactifs `inert` et `aria-hidden`,
  annonces des volets seulement quand le défilement est arrêté) ; hauteur stable (volets empilés).
Les rangées de produits restent en carrousel manuel, sans défilement automatique.
Preuve : vérification dans le navigateur (375 et 1280 px) — passage automatique au volet suivant
après 6 s, pause/reprise, arrêt après une flèche, navigation au clavier, aucun débordement.
**Statut : fait en local, non poussé.**

## Boutique — accueil en deux rubriques et pages de rayon (5 novembre 2026)

Demande du Commanditaire : ne plus étaler tous les produits sur l'accueil de `/boutique`, mais deux
rubriques, « Billetterie » (pass et tickets) et « Articles officiels », chacune avec un bouton à
droite vers la page de son rayon ; modèles de design fournis (liste « rendez-vous », catalogue
filtrable, carte article posée sur un cadre de couleur qui bascule au survol).

| Élément | Réalisation | Preuve |
| --- | --- | --- |
| Rubrique Billetterie | Lignes « rendez-vous » (`LigneBillet.astro`) : dates, visuel, nom, résumé, accès, prix d'appel, bouton Réserver, lieu — tout dérivé des séances réelles (« à annoncer » sinon, ex. lieu du Dîner) ; pastilles Tous / Pass / Tickets ; 5 lignes sur l'accueil, bouton « Toute la billetterie » | e2e : 5 lignes, pastille Tickets, lien vers `/boutique/billetterie` |
| Rubrique Articles officiels | Cartes (`CarteArticle.astro`) posées sur un cadre or invisible qui pivote au survol ou au focus (sans mouvement si `prefers-reduced-motion`) ; seconde photo, favori, aperçu rapide ; aucun avis ni note affiché (il n'en existe pas) ; bouton « Tous les articles » | Vérification dans le navigateur (survol à 1280 px) |
| Pages de rayon | `/boutique/billetterie`, `/boutique/articles`, `/boutique/recherche` (`ListeCatalogue.astro`) : filtres mot clé, catégories avec effectifs, prix maximum ; tri ; critères dans l'adresse ; filtres repliés sous « Filtrer par » sur mobile | e2e : `?categorie=tickets&tri=prix-croissant`, recherche « concert » depuis l'accueil |
| Accessibilité | Aucune violation critique ou sérieuse (axe, WCAG 2 A/AA) | e2e axe sur les 3 pages (NF-CNV-008) |

Palette GBIS respectée : boutons bleu nuit (jamais de blanc sur or), prix et dates en bleu nuit
(jamais de texte or sur fond clair), or réservé aux liserés, icônes et au cadre de survol. Les
liens de la barre de la boutique (Pass, Tickets, Articles) et de la bannière mènent aux pages de
rayon. Les tests d'achat partagent le back-office local et s'exécutent l'un après l'autre.
Résultats : boutique e2e 9/9 (`E2E_BOUTIQUE=1`), site e2e 31/31, unitaires 27/27.
**Statut : fait en local, non poussé.**

## Dérogation — couleurs du verdict au poste de contrôle d'accès (5 novembre 2026)

Règle permanente n° 7 : palette exclusive GBIS (ni vert ni rouge). À la demande explicite du
Commanditaire, le verdict affiché au poste de scan des agents (`/scan` du back-office, outil
interne, jamais vu du public) passe en **vert** (#1E7B34) quand l'entrée est acceptée et en
**rouge** (#B3261E) pour tout refus (déjà utilisé, non inclus, annulé, invalide), pour une
lecture instantanée à la porte. Texte blanc (contraste supérieur à 5:1) ; le titre énonce aussi le
verdict, la couleur n'est jamais la seule information. Les messages d'erreur du poste (ex. poste
non renseigné) gardent la palette GBIS. Périmètre : `backend/src/app/(agents)/agents.css`.
**Statut : fait en local, non poussé.**

## Back-office — heures affichées à l'heure de Libreville, statuts en français (5 novembre 2026)

Règle permanente de la boutique : heure de référence Africa/Libreville pour tous les horodatages.
Les listes du back-office suivaient le fuseau de l'ordinateur qui consulte (un passage scanné à
03:05 à Libreville apparaissait « 2:05 AM » sur un poste réglé en UTC). Toutes les dates de la
boutique (création, paiement, réservation, émission du billet, consommation d'un droit, remise
d'un article, début et fin des séances) s'affichent désormais à l'heure de Libreville, au format
français 24 h (cellule `DateLibreville`, champs `dateHeure` et `creeLe` dans
`backend/src/boutique/collections/dates.ts`) ; l'en-tête de colonne le précise. Statuts des droits
d'accès et des réservations en libellés français (Valide, Consommé, Annulé…). Aucun changement de
schéma. Reste à traiter : la saisie d'une date dans un formulaire (ex. heure d'une séance) suit
encore le fuseau de l'ordinateur — sans effet depuis Libreville, à surveiller pour une saisie
depuis un autre pays. **Statut : fait en local, non poussé.**

## LOT A, A2 — section boutique de l'accueil du site alignée sur la boutique (5 novembre 2026)

Écart signalé avant développement : A2 prévoit 6 à 8 cartes « mis en avant » (carrousel sur
mobile). Le Commanditaire a choisi d'aligner la section sur l'accueil de la boutique. Quand le
catalogue est lu au build (`src/components/home/BoutiqueVitrine.astro`) : bloc « Billetterie »
(4 lignes rendez-vous : dates, lieu, accès, prix, Réserver) et bloc « Articles officiels » (4 cartes
à cadre or au survol, sans favori ni aperçu rapide pour ne charger aucun script de la boutique),
boutons « Toute la billetterie » et « Tous les articles », lien « Accéder à toute la boutique » ;
tous les liens suivis (`utm_medium=accueil-boutique`, A5). Catalogue injoignable : les cartes A2
du fichier de secours, inchangées — la section n'est jamais vide (F-CNV-020).
Preuves : e2e « accueil du site : section boutique alignée » (`E2E_BOUTIQUE=1`) ; axe sans
violation sur `/` ; suite du site en mode CI 31/31 (repli A2 vérifié par `boutique-lot-a.spec.ts`).
**Statut : fait en local, non poussé.**

## Un seul or sur le site : l'or vieilli #B8963E (5 novembre 2026)

Décision du Commanditaire : tous les éléments qui tendent vers l'or passent à l'or vieilli
#B8963E (`--crn-or`). L'or lumière #D9C48A et l'or profond #8A6E22 de la palette GBIS ne sont plus
employés sur le site public ni dans la boutique (35 fichiers ; jetons `--crn-or-lumiere`,
`--crn-or-profond` et `--color-accent-deep` retirés de `src/styles/tokens.css`, transparences
`rgba(217, 196, 138, …)` ramenées à `rgba(184, 150, 62, …)`). Les quelques textes qui étaient en or
profond sur fond clair (étiquettes d'annonces, FAQ, fiche produit, profils, numéro de commande,
rôle de NASTY, sigle du panier) passent en bleu nuit, conformément à « jamais de texte or sur fond
clair » et au contraste minimal (#B8963E sur crème : 2,5:1). Contraste vérifié (axe, règle
color-contrast) sur 22 pages à 360 et 1 280 px : aucun défaut lié à l'or ; seul défaut relevé,
antérieur et sans rapport, la mention grise « Photo réelle à fournir » de `/artistes` (3,3:1).
Suite du site 31/31, accessibilité de la boutique 4/4. Le back-office (Payload, poste de scan)
garde pour l'instant ses propres tons. **Statut : fait en local, non poussé.**

## Cadre or au survol sur les pavés du site (5 novembre 2026)

Même effet que les cartes « Articles officiels » de la boutique : le pavé est posé sur un cadre or
vieilli invisible au repos, qui pivote derrière lui au survol (souris) ou au focus clavier ; sur
écran tactile, seul le focus le déclenche (pas de survol « collant ») ; animations réduites : le
cadre apparaît sans mouvement. Effet commun `.cadre-or` (`src/styles/global.css`) et enveloppe
`src/components/shared/CadreOr.astro`, appliqués là où le Commanditaire l'a demandé : accueil
(« Une vision. Trois mouvements. », Plateformes phares, Billetterie de la section boutique,
Action sociale, Suivre à distance) et pages Académie des Sciences Divines, Action sociale, Infos
pratiques, Diaspora. Preuves : vérification au survol (accueil, Diaspora) ; suite du site 31/31,
accessibilité 5/5 (dont l'accueil avec le catalogue). **Statut : fait en local, non poussé.**

## Visuels des plateformes intégrés (5 novembre 2026)

Le Commanditaire a fourni 10 visuels nommés par plateforme (jeu PL du document d'habillage
visuel `Convention_CRN_2026_Habillage_Visuel.docx`). Les 10 sont intégrés, convertis en WebP maîtres
(1 500 × 844, 115 à 230 Ko, bas de l'image écarté pour retirer le filigrane du générateur) dans
`src/assets/images/plateformes/`, puis déclinés par Astro (`astro:assets`) aux tailles affichées,
en chargement différé. Table unique `src/lib/visuels-plateformes.ts` (produit ou séance → visuel).
Emplacements :

| Emplacement (document) | Fichiers | Visuels |
|---|---|---|
| A-08 Plateformes phares (accueil) | `PlatformCard.astro`, `index.astro` | les 6 cartes : Académie, Femme de Foi, J'ai soif, Concert, Culte & ordination, Dîner |
| A-05 Aperçu du programme (accueil) | `ProgramPreview.astro`, `index.astro` | vignette ronde de la séance affichée |
| Séances du programme (`/programme`) | `SessionCard.astro`, `programme.astro` | Matin de gloire, Académie, Atmosphère prophétique / Pastorale, Plénière, Culte unique, ordination, Concert, Femme de Foi, J'ai soif, Dîner |
| BQ-07 Lignes des 7 tickets (boutique, rayon Billetterie, recherche, section boutique de l'accueil) | `LigneBillet.astro` | Académie (classe et Pass Académie Intégral), Femme de Foi, J'ai soif, Dîner, Concert Standard, Concert VIP |
| Fiche produit et panier des mêmes tickets | `boutique/produits/[slug].astro` | idem |
| B-02 Cartes de `/billetterie` | `PriceCard.astro`, `billetterie.astro` | idem, par groupe |

Une photo saisie dans le back-office reste prioritaire sur ces visuels.

**Visuels des pass (jeu PS, fourni le 5 novembre 2026)** : Pass Convention Intégral, Pass
Génération (18 – 28 ans), Pass Génération Plus, Pass Partenaire Or, Pass Grand Partenaire Diamant —
badge ou carte du pass mis en scène, aucun visage (règle 4 respectée sans dérogation). Maîtres
WebP carrés 1200 × 1200 (`src/assets/images/pass/`, 160 à 200 Ko, recadrés à l'affichage), reliés
par le slug du produit dans `src/lib/visuels-plateformes.ts` (`VISUELS_PASS`). Mêmes emplacements
que les tickets : lignes BQ-07 (boutique, rayon Billetterie, accueil), fiche produit et panier,
cartes B-02 du groupe « Pass » de `/billetterie`. Vérifié en local (boutique, `/billetterie`, fiche
`pass-diamant`). Ces visuels ne valident aucun tarif.

**DÉROGATION à la règle permanente n° 4** (« aucun visage généré par IA ») : les visuels
« Femme de Foi — Live » et « J'ai soif » montrent des visages générés par IA. Conflit signalé par
écrit, puis intégration choisie par le Commanditaire le 5 novembre 2026. Portée : ces deux visuels
seulement ; les 8 autres ne montrent aucun visage (lieux, objets, personnes de dos), et orateurs,
artistes et lieux restent en photos réelles. Mention ajoutée à la règle n° 4 de `CLAUDE.md`. Textes alternatifs : descriptifs sur la fiche
produit, vides là où le titre voisin nomme déjà la plateforme. **Statut : fait en local, non poussé.**

## Boutique — pins, huile d'onction, polo et casquette au rayon « Articles officiels » (5 novembre 2026)

Demande du Commanditaire du 5 novembre 2026. **Aucun prix fourni** : conformément à la règle
« aucun produit actif sans prix validé », choix du Commanditaire « Prix à valider ».

| Point | Statut | Preuve |
| --- | --- | --- |
| Pins officiel, Huile d'onction, Casquette officielle (modèle unique), Polo officiel (S à XXL, choix du Commanditaire) au rayon « Articles officiels » | Fait | `ajouterArticlesAnnonces` (`backend/src/boutique/seed.ts`), appelé par l'import initial ; base déjà importée : `npm --prefix backend run ajouter-articles` (n'ajoute que les slugs absents) |
| Hors vente tant que le prix n'est pas saisi | Fait | « Prix à valider » : invisibles en production (`estVisible`) ; en aperçu local, « À annoncer », « Ouverture des ventes à annoncer », aucun formulaire d'achat (vérifié sur `/boutique/articles` et `/boutique/produits/polo-officiel`) |
| Articles de kit sans prix (stylo, bloc-notes, gourde, ventilateurs) toujours absents du catalogue | Fait | `catalogue()` (`backend/src/boutique/lib/catalogue.ts`) : un produit sans prix n'est écarté que s'il entre dans un kit ; vérifié sur l'API `/api/boutique/catalogue` |
| Photos | À fournir | Cadre neutre « CRN — Photo à venir » (règle 4) |

**Pour les mettre en vente** : dans l'admin, Boutique · Catalogue → Produits, ajouter un palier dans « Prix (paliers datés) », décocher
« Prix à valider », cocher « Actif », renseigner les stocks et ajouter une photo réelle.
**Statut : fait en local, non poussé.**

## Habillage : vignettes des actualités, en-tête du billet et de l'e-mail, photos du tee-shirt (5 novembre 2026)

Visuels fournis par le Commanditaire le 5 novembre 2026, nommés selon les emplacements du document
d'habillage visuel. Aucun visage (règle 4 respectée sans dérogation : le tee-shirt porté est cadré
du cou à la taille).

| Emplacement (document) | Fichiers | Détail | Preuve |
| --- | --- | --- | --- |
| A-12 Actualités de l'accueil | `AnnouncementCard.astro` (variante `compacte`), `index.astro`, `src/lib/visuels-actualites.ts` | Vignette 4:3 à gauche dès 768 px (colonne étroite à côté de la FAQ), bande 16:9 en tête sur mobile | Vérifié à 1280 px |
| N-02 Vignettes de `/actualites` | `AnnouncementCard.astro`, `src/lib/visuels-actualites.ts` | Bande 16:9 en tête de carte, liseré or ; image choisie par la **rubrique** (Billetterie — et Boutique —, Orateurs, Action sociale, Programme) ; rubrique sans image → carte inchangée. La vignette « Programme » servira à la première actualité de cette rubrique | Vérifié à 375 px |
| BQ-10 En-tête du billet PDF | `backend/src/boutique/lib/billets.ts`, `backend/public/brand/bandeau-billet.jpg` (1200 × 400, 45 Ko) | Bandeau 3:1 pleine largeur, filet or, dates dessous. Bandeau plus haut que l'ancien : QR 120 pt (42 mm) et 4 séances listées (« … et N autres séances ») ; le pire cas (pass à 12 séances + kit tee-shirt) ne passe plus sous le pied de page, ce qui arrivait auparavant. Fichier absent → ancien bandeau texte | Billet d'essai généré, positions vérifiées (ligne du kit à 36 pt, pied de page 0–30 pt) |
| BQ-10 En-tête de l'e-mail de confirmation | `backend/src/boutique/lib/messagerie.ts` | Image servie par le back-office (`PUBLIC_SERVER_URL` + `/brand/bandeau-billet.jpg`), texte de remplacement « Convention CRN 2026 » sur fond bleu nuit si les images sont bloquées | `/brand/bandeau-billet.jpg` répond 200 |
| AT-01 / AT-02 Photos du tee-shirt (carte du rayon, seconde photo au survol, galerie de la fiche, panier) | `src/lib/photos-articles.ts`, `src/lib/boutique-api.ts` | Utilisées seulement si le back-office n'a aucune photo du produit. **Maquettes, pas des photos du produit fini** : la fiche affiche « Visuel non contractuel » (exigence AT-01). À remplacer par des photos réelles saisies dans l'admin, qui priment automatiquement | Fiche `/boutique/produits/tee-shirt-officiel` vérifiée à 375 px |

Images recadrées à l'intérieur du cadre or intégré aux fichiers fournis (le site pose son propre
liseré). Non-régression : typecheck, lint, unitaires (27 + 44), e2e `parcours-et-domaines` et
`boutique-lot-a` (audit réseau, axe, débordements — ces derniers verts en exécution série ; les 4
tests A2 du fichier de secours restent en échec connu quand le back-office local répond).
**Statut : fait en local, non poussé.**

## Habillage du site, deuxième série : héros des pages, accueil, articles, page 404 (5 novembre 2026)

Visuels fournis par le Commanditaire le 5 novembre 2026, nommés selon le document d'habillage
visuel. Aucun visage identifiable (personnes de dos ou mains seules) : règle 4 respectée sans
dérogation.

| Emplacement (document) | Fichier fourni | Fichiers du site | Détail |
| --- | --- | --- | --- |
| A-02 « Une vision. Trois mouvements. » | Une vision, trois mouvements (version sombre) | `ThreeMovements.astro`, `src/assets/images/mouvement-*.webp` | Les 3 scènes découpées **sans le texte incrusté** (titres déjà en HTML), choix du Commanditaire. Remplacent les images du 1er novembre (visages générés) : l'écart assumé de cette section est **levé**. La version claire n'est pas utilisée |
| A-10 Action sociale (carte) / A-11 Suivre à distance (carte) | Action sociale ; Suivre à distance | `IconCallout.astro` (prop `visuel`), `index.astro` | Bande 16:9 en tête, médaillon qui la chevauche |
| A-12 Actualités — Orateurs | Orateurs | `src/assets/images/actualites/orateurs.webp` | Remplace la vignette encadrée de la première série |
| P-01, AC-01, O-01, AR-02, IP-01, B-01, AS-01, D-01 Héros | Grande salle de l'Église Centrale ; Salle d'étude de l'Académie ; héros de la liste des orateurs / artistes / informations générales / Billetterie / action sociale / diaspora | `PageHero.astro` (prop `image`, emplacement `fond` de `Section.astro`), pages `/programme`, `/academie`, `/orateurs`, `/artistes`, `/infos-pratiques`, `/billetterie`, `/action-sociale`, `/diaspora` | Photo sous voile bleu nuit (uniforme 86 % sur mobile, dégradé 92 → 55 % dès 768 px) : contraste du texte garanti ; image décorative, chargée en priorité |
| D-02 Diaspora — Suivre à distance | Suivre la Convention à distance | `diaspora.astro` | Bande 16:9 en tête de la carte |
| G-06 Page 404 | Page 404 | `src/pages/404.astro` (nouvelle) | Page « Cette page est introuvable », liens vers l'accueil, le programme et la boutique. **À vérifier au déploiement** : que l'hébergeur sert bien `404.html` pour une adresse inconnue (sinon une directive `ErrorDocument` sera nécessaire) |
| Photos des articles | Polo ; Pagne ; Huile d'Onction ; Pins ; Casquette | `src/lib/photos-articles.ts` | Mêmes règles que le tee-shirt (photo du back-office prioritaire, « Visuel non contractuel »). **Pagne et huile recadrés** pour retirer les mentions non validées (« Pagne wax original », « 100 % coton », « Qualité premium », « Formule naturelle », « Flacon spray », « 100 ml »), choix du Commanditaire |

Poids de l'accueil : aucune image chargée en plus à l'ouverture (nouvelles images en chargement
différé). Non-régression : typecheck, lint, unitaires, e2e `parcours-et-domaines` et
`boutique-lot-a` en série (audit réseau, axe, débordements verts ; 4 tests A2 du fichier de
secours en échec connu). **Statut : fait en local, non poussé.**

**Non intégrés (signalés au Commanditaire)** : planche « tickets » (contient un ticket « Visite de
Libreville », produit inexistant), visuel « Pass Intégral » (montre Concert VIP et un kit polo,
casquette, huile, pins, pagne, alors que le pass validé comprend Concert Standard et le tee-shirt),
enveloppe dorée (BQ-09) : fichiers non disponibles dans Téléchargements. Autres fichiers présents dans
Téléchargements mais non transmis dans la demande : FAQ — héros, Héros Contact, Contact — carte,
NASTY — héros, galeries, Actualités (héros), Collage, Don à distance, Cours de l'Académie suivi à
distance, Session diaspora en visioconférence, tee-shirt officiel CRN Convention 2026.

## Habillage du site, troisième série : diaspora, héros restants, boutique, partage (5 novembre 2026)

Visuels fournis par le Commanditaire le 5 novembre 2026, nommés selon le document d'habillage.

| Emplacement (document) | Fichier fourni | Fichiers du site | Détail |
| --- | --- | --- | --- |
| D-03, D-04, D-05 Diaspora | Don à distance ; Cours de l'Académie suivi à distance ; Session diaspora en visioconférence | `diaspora.astro` | Les 4 cartes ont désormais leur bande 16:9. Visioconférence : vignettes floues, aucun visage net |
| N-01, F-01, C-01, L-01 Héros | Actualités ; FAQ — héros ; Héros Contact ; Héros des pages légales | `actualites/index.astro`, `faq.astro`, `contact.astro`, `mentions-legales.astro`, `confidentialite.astro` (prop `image` de `PageHero`) | La CGV de la boutique (`PageLegale.astro`) n'a pas de héros : inchangée. Héros Contact : accueil générique, non présenté comme le siège CRN |
| NA-01 NASTY — héros | NASTY — héros | `nasty.astro`, `heros/nasty.webp` | **Recadré sur le globe** : l'image montrait un visage net généré par IA (règle 4) ; choix du Commanditaire. L'avatar existant de NASTY est inchangé |
| C-02 Contact — « Nous sommes à votre écoute » | Contact — carte « Nous sommes à votre écoute » | `contact.astro` | Bande 4:3 en tête de l'encart |
| M-01 États d'attente des galeries | galeries de la Convention CRN 2026 | `multimedia/galerie-{photos,videos,audios}.astro` | Même image dans les 3 encarts d'attente |
| BQ-01 à BQ-03 Diaporama de la boutique | Diaporama — volets Pass, Tickets, Articles | `BanniereDiaporama.astro` (prop `image` du volet), `boutique/index.astro` | Image à droite du texte dès 900 px, masquée et non chargée sur mobile. **Volet Articles recadré sans le pagne** : son étiquette portait une marque tierce (« Madison Real Wax ») et des allégations en anglais ; choix du Commanditaire. Dérogation n° 10 (diaporama) inchangée |
| BQ-04 Bandeaux des rayons | Bannières CRN — Billetterie, Articles, Recherche | `ListeCatalogue.astro` (prop `banniere`), `boutique/{billetterie,articles,recherche}.astro` | Fond de l'en-tête, aligné à droite ; voile uniforme sur mobile, côté texte seulement dès 768 px |
| BQ-05 Atouts (4 pavés) | Icônes de billetterie, de paiement, de livraison, d'assistance | `boutique/index.astro` | Illustrations à la place des pictogrammes ; l'icône d'assistance, présente dans Téléchargements mais non transmise, complète le jeu de 4 |
| BQ-09 Confirmation de commande | Confirmation de commande | `boutique/suivi.astro` | Affichée seulement quand la commande est payée |
| G-01 Image de partage | Collage événementiel bleu marine et or | `public/og-image.jpg` (1200 × 630), `BaseLayout.astro` | Emplacement choisi par le Commanditaire (le collage n'avait pas d'emplacement nommé) ; `og:image` en adresse absolue, carte `summary_large_image` |

Non-régression : typecheck, lint, unitaires, e2e `parcours-et-domaines` et `boutique-lot-a` en série
(audit réseau, axe, débordements verts ; 4 tests A2 du fichier de secours en échec connu).
**Statut : fait en local, non poussé.**

**Toujours non intégrés** : « Vignettes des 7 tickets » (ticket « Visite de Libreville » sans
produit), « Vignettes des 5 pass » et « Vignettes des articles officiels » (non transmis ; la planche
« Pass Intégral » vue le 5 novembre contredit le contenu validé du pass), « tee-shirt officiel CRN
Convention 2026 », « Une vision, trois mouvements » version claire.

## Habillage — ajustements demandés : diaporama plein cadre, icônes des atouts, voiles allégés (5 novembre 2026)

| Demande | Fichiers | Réalisation |
| --- | --- | --- |
| Images du diaporama de la boutique sur toute la section (et non en carte à droite) | `BanniereDiaporama.astro`, `boutique-habillage/diapo-*.webp` | Fond plein cadre du volet actif, fondu enchaîné (aucun si `prefers-reduced-motion`), visible aussi sur mobile. Pass et Tickets : images d'origine entières (zone sombre prévue pour le texte). Articles : produits sans le pagne, recomposés à droite et fondus dans le bleu nuit. Voile 78 % sur mobile, dégradé 82 → 0 % dès 900 px |
| Icônes des atouts plus expressives, hors du cadre blanc | `boutique/index.astro` | 84 px, à cheval sur le filet or de la carte, ombre portée, léger soulèvement au survol (neutralisé si `prefers-reduced-motion`) |
| Voiles des héros des pages internes et des bandeaux allégés de 10 à 15 % | `PageHero.astro`, `ListeCatalogue.astro` | Héros : 86 → 73 % (mobile), 92/80/55 → 79/67/42 % (ordinateur). Bandeaux de rayon : 80 → 67 % (mobile) ; dès 768 px, visuel sur la moitié droite **sans voile**, fondu vers la gauche, recadré sans le trait or du coin gauche |

**Contraste vérifié par mesure** (script exécuté sur le rendu réel : pixels de la photo sous chaque
bloc de texte, voile appliqué, 98e centile de luminance, à 375 et 1280 px, 14 héros, 3 volets,
3 rayons). L'allègement faisait tomber plusieurs textes sous le seuil ; corrigé sans réassombrir
les photos :
- étiquette or des héros (2,3 à 2,8:1) → pastille bleu nuit derrière l'étiquette seule : 4,6 à 5,4:1 ;
- chapô des héros sur ordinateur (3,5 à 4,4:1) → blanc plein : 4,8 à 6,9:1 ;
- prix d'appel or du diaporama (3,1 à 3,3:1) → même pastille : 4,9 à 5,4:1 ; texte du volet Articles
  (3,4:1) → blanc plein : 4,7:1 ;
- fil et chapô des rayons sur mobile (4,0 à 4,4:1) → blanc plein : 5,6 à 6,2:1 ; sur ordinateur, le
  texte reste sur le bleu nuit uni (aucun chevauchement avec le visuel).

Non-régression : typecheck, lint, unitaires, e2e `parcours-et-domaines` et `boutique-lot-a` en série
(audit réseau, axe, débordements verts ; 4 tests A2 du fichier de secours en échec connu).
**Statut : fait en local, non poussé.**

## Accueil — séquence d'ouverture animée du héros (5 novembre 2026)

Demande du Commanditaire : à l'ouverture, le fond seul ; puis l'orateur entre par la droite ; puis
les écritures de gauche apparaissent en zoom sortant. `src/components/home/Hero.astro`, CSS pur
(aucune bibliothèque, aucun JavaScript ajouté : budget JS de l'accueil inchangé, règle 9).

| Temps | Élément | Mouvement |
| --- | --- | --- |
| 0 s | Fond (immeuble) | Visible dès la première image (aucun fondu : reste l'élément peint en premier), zoom arrière continu 1,08 → 1 sur 2,6 s ; un reflet doré balaie l'immeuble une fois (0,2 → 1,8 s) |
| 0,25 s | Orateur | Entrée depuis la droite (45 % de sa largeur) jusqu'à sa place, 1,1 s, courbe « expo out » |
| 0,95 → 1,47 s | Étiquette, titre, date et lieu, texte, compte à rebours, boutons | Zoom sortant (1,18 → 1) avec léger flou qui se dissipe, en cascade tous les 0,1 s, 0,85 s chacun |
| 1,9 s | Bouton « Voir le film » | Surgit (léger rebond), puis son halo pulsé démarre à 2,55 s |

Vérifié en figeant les animations à 0 / 0,3 / 0,65 / 1 / 1,25 / 1,6 / 2 / 2,7 s (opacités et
transformations calculées) : enchaînement conforme, aucun débordement horizontal à 375 px, aucun
style retenu après la séquence (effets de survol intacts). **Règle 10** : animation d'entrée jouée
une seule fois, ni carrousel ni défilement ; avec `prefers-reduced-motion`, aucune animation et
tout est visible d'emblée (règle dédiée, les délais n'étant pas couverts par la règle globale).
Non-régression : typecheck, lint, e2e `parcours-et-domaines` et `boutique-lot-a` (4 tests A2 du
fichier de secours en échec connu). **Statut : fait en local, non poussé.**

## Orateurs — biographies et fonctions (5 novembre 2026)

Source : `Biographies_orateurs_Convention_CRN_2026.md` (Téléchargements), 8 portraits. Texte repris
tel quel (aucune donnée ajoutée), seulement remis en forme : paragraphes reconstitués à partir des
lignes coupées du PDF, espaces de justification supprimés, typographie française (insécables avant
« : ; ! ? » et dans « »). Une coquille de conversion corrigée : « année académique 1990- / - Il
poursuit » → « 1990-1991. Il poursuit » (l'année « 1991. » avait été lue comme une puce).

| Orateur (identifiant) | Fonction affichée sous le nom | Biographie |
| --- | --- | --- |
| mike-jocktane | Fondateur et Président Directeur International des Ministères Christ Révélé aux Nations | Citation + 6 paragraphes |
| nadia-jocktane | Prophétesse-Évangéliste | Citation + 6 paragraphes |
| robert-ondoa | Rhematologue – Docteur de la Loi – Enseignant | Accroche + 6 paragraphes |
| francois-rabenkogo | Vicaire Général National des Ministères CRN | Accroche + 7 paragraphes |
| michel-ambouroue | Évêque des Ministères CRN – Responsable de l'Église Métropolitaine de Paris et de la Direction Occident | Accroche + 7 paragraphes |
| wilson-ndi | Presiding Bishop – Garden of Life Ministries Worldwide | Accroche + 6 paragraphes |
| silas-makangu | Professeur des Universités – Expert en géopolitique et géostratégie | Accroche + 5 paragraphes |
| jek-kalombo | Diplomate ecclésiastique – Prédicateur de la Bonne Nouvelle | Accroche + 5 paragraphes |

Carelle Ambouroué et Patricia Piebi ne figurent pas dans le document : fiche inchangée
(« Biographie à paraître »). Les noms affichés sont inchangés (le document emploie les noms
complets et titres : « Monseigneur Mike Steeve Jocktane », « Évêque Dr Robert Ondoa Enyegue »,
« Évêque Dr Ndi Wilson Njinwi », « Docteur Silas Mimile Makangu »…) — à harmoniser dans l'admin si
souhaité.

**Mise en production** : en production, le contenu des orateurs vit dans le back-office. Fichiers
de référence du site (`src/content/speakers/`) et import initial (`backend/src/seed/content.json`,
qui reprend désormais aussi la fonction) mis à jour ; au démarrage, le back-office complète les
biographies et fonctions **encore vides** (`completerProfilsOrateurs`, jamais d'écrasement d'une
saisie de l'admin). Vérifié sur la base locale : 8 profils complétés, second démarrage sans effet ;
fiche `/orateurs/mike-jocktane` contrôlée. **Statut : fait en local, non poussé.**

## Orateurs — photos remplacées et ordre d'affichage (5 novembre 2026)

**Photos** (fichiers fournis, nommés par orateur ; photos réelles, règle 4 respectée) : Carelle
Ambouroué, Nadia Jocktane, Jek Kalombo, Robert Ondoa, Silas Makangu. Recadrées au format des autres
portraits (3:4, 600 × 800, haut de l'image conservé), sous un nouveau nom `<identifiant>-2.webp`
(pas d'ancienne version servie depuis le cache) ; les 5 anciennes photos du site sont retirées.

**Ordre de gauche à droite**, demandé par le Commanditaire, sur `/orateurs` et dans la rangée de
l'accueil :
- orateurs nationaux : Mike Jocktane, Nadia Jocktane, François Rabenkogo, Michel Ambouroué,
  Carelle Ambouroué ;
- orateurs internationaux : Robert Ondoa, Silas Makangu, Wilson Ndi, Patricia Piebi, Jek Kalombo.

Conséquence assumée de ce regroupement : changement de catégorie pour Mike Jocktane (« Hôte » →
national), Carelle Ambouroué (plateforme → national), Patricia Piebi (plateforme → international),
Jek Kalombo (prophétique → international) ; leur étiquette sur la fiche suit la catégorie.

Réalisation : champ « Ordre d'affichage » (`ordre`) ajouté aux orateurs (site : schéma, chargeur,
`src/lib/orateurs.ts` qui trie nationaux → internationaux → autres catégories, puis ordre, puis nom ;
back-office : champ en barre latérale, migration `20261105_203919_orateurs_ordre`).

**Mise en production** (le contenu vit dans le back-office) : au démarrage, `organiserOrateurs` pose
catégorie et ordre une seule fois (orateurs dont l'ordre est vide, c'est-à-dire juste après la
migration), puis remplace la photo des 5 orateurs **seulement si c'est encore la photo d'origine**
(`<identifiant>.webp`), retenté à chaque démarrage. La photo est téléchargée depuis le site public :
**déployer le site avant le back-office** (sinon elle sera prise au démarrage suivant). Testé sur la
base locale : ordre et catégories posés, 5 photos remplacées, second démarrage sans effet.
Biographies (orateurs et artistes, `ProfilDetails.astro`) justifiées avec césure automatique, à la
demande du Commanditaire.
Non-régression : typecheck, lint, unitaires, e2e `parcours-et-domaines`. **Statut : fait en local,
non poussé.**

## Multimédia — héros des trois galeries (5 novembre 2026)

Visuels fournis par le Commanditaire (« Galerie photos », « Galerie vidéo », « Galerie audio »),
générés à partir des prompts remis le même jour : appareil photo et tirages, caméra devant la
scène, micro de studio et console ; aucun visage (opérateur de dos, salle floue). Posés en héros de
`/multimedia/galerie-photos`, `-videos` et `-audios` (`heros/galerie-*.webp`, 69 à 118 Ko).

Cadrage des photos de héros décalé à droite (`object-position: 70 %`) : leur sujet est composé à
droite, et sur mobile le héros étroit n'en montrait que le centre. Contraste remesuré sur les
17 héros à 375 px et sur les galeries à 1280 px : tout au-dessus des seuils (étiquette ≥ 4,6:1,
titre ≥ 4,2:1, chapô ≥ 5,4:1). **Statut : fait en local, non poussé.**

## Mise en ligne du 5 novembre 2026 (demande du Commanditaire)

Tout le travail de la branche `boutique-palier-1` est en production (`main` = `e02bf9a`) :
habillage visuel, boutique (vitrine et catalogue), héros animé, orateurs, galeries.

- **Avant le déploiement** : les 6 migrations exécutées dans l'ordre sur une base vierge (dont
  `20261104_172946_boutique`, jamais jouée jusque-là en local où le schéma est poussé), démarrage
  simulé en mode production (import du catalogue, profils des orateurs), build complet du site
  (64 pages).
- **Ventes fermées** : sans prestataire de paiement réel configuré, l'import n'ouvre pas les ventes
  (`ventesOuvertes = false` vérifié en ligne). La boutique est consultable ; au moment de commander,
  « Les ventes sont momentanément fermées ». Le CRN coche « Ventes ouvertes » (Réglages de la
  boutique) une fois l'agrégateur raccordé.
- **Ordre** : back-office d'abord (migrations au démarrage, catalogue servi en ~3 min), puis site
  (son build lit le catalogue). Back-office redémarré une fois le site en ligne, pour remplacer les
  5 photos d'orateurs ; site republié ensuite pour les afficher.
- **Page 404** : `public/.htaccess` (`ErrorDocument 404 /404.html`) — l'hébergeur servait sa propre
  page ; vérifié en ligne.
- **Vérifié en ligne** : accueil, boutique (rayons, fiches), orateurs (ordre, biographies,
  nouvelles photos), galeries, actualités, page 404.
- **À savoir pour les prochains déploiements** : le dépôt du back-office porte un commit vide de
  redémarrage absent du dépôt principal ; le prochain envoi suivra la procédure du README (`--force`).
  La republication automatique du site après une modification dans l'admin ne s'est pas déclenchée
  (`SITE_REBUILD_GITHUB_TOKEN` / `SITE_REBUILD_GITHUB_REPO` à vérifier dans hPanel).

## Boutique — prix des pins, de l'huile d'onction, du polo et de la casquette (5 novembre 2026)

Prix communiqués par le Commanditaire : **pins 5 000 F CFA, huile d'onction 3 000 F CFA, polo
12 500 F CFA, casquette 10 000 F CFA** (palier en vigueur depuis le 5 novembre, 00h00 Libreville).
Ces articles passent de « Prix à valider » à « en vente » (polo S à XXL ; stocks non suivis tant
que le CRN ne les saisit pas).

- Import initial (`ajouterArticlesAnnonces`) : créés directement au prix validé.
- Base déjà importée (production) : `appliquerPrixArticlesAnnonces`, à chaque démarrage, n'agit que
  sur un article encore en « Prix à valider » sans palier ; un article tarifé ou modifié dans l'admin
  n'est jamais touché.
- Testé en mode production : base existante (4 articles mis en vente, second démarrage sans effet)
  et base vierge (créés au prix) ; catalogue public de 18 produits.
- Volet « Articles » du diaporama : texte mis à jour avec toute la gamme ; prix d'appel calculé
  (3 000 F CFA).

Rappel : les ventes restent fermées tant qu'aucun prestataire de paiement n'est raccordé.

## Boutique — intégration du paiement SasPay (6 novembre 2026)

Agrégateur retenu par le Commanditaire : **SasPay** (saspay.me, API REST, Mobile Money et carte,
Afrique de l'Ouest et du Centre ; Gabon / XAF présent dans la liste publique des pays).
Intégration conforme à la documentation officielle (docs.saspay.me et sa spécification OpenAPI) ;
détail et procédure dans `backend/src/boutique/README.md`, variables dans `backend/.env.example`.

| Point | Réalisation | Preuve |
| --- | --- | --- |
| Création du paiement | Checkout hébergé `POST /checkout-sessions/`, XAF, montant en chaîne décimale, expiration alignée sur la réservation, retour au suivi | Tests unitaires (requête, enveloppe, erreurs) |
| Clé API côté serveur seulement | Variables d'environnement du back-office ; jamais dans le site ni dans Git ; détail d'erreur dans le journal, message neutre au client | Revue du code |
| Webhooks signés | HMAC-SHA256 de « horodatage.corps brut », comparaison en temps constant, horodatage à ± 5 min | Tests : corps modifié, mauvais secret, rejeu ancien ou futur |
| Aucune livraison sur la foi d'un webhook | Le webhook (sans référence de commande) déclenche la relecture du statut par l'API, revérifié par SasPay chez l'opérateur | `npm run test:saspay` |
| Statuts | `PAID` → payée ; `EXPIRED`/`CANCELLED` → échouée, place rendue ; essai raté sur session ouverte → en attente (le client peut réessayer) | Tests unitaires (6 cas) |
| Webhook perdu | Relecture toutes les 2 min ; commandes expirées < 24 h incluses → paiement tardif « à vérifier », jamais perdu | `npm run test:saspay` |
| Idempotence | Événements dédupliqués (contrainte d'unicité) ; rejeu sans effet | `npm run test:saspay` |

`npm run test:saspay` (faux serveur SasPay, vrais endpoints de la boutique) : 7 vérifications
réussies — session créée, webhook mal signé refusé, session ouverte sans effet, session payée →
commande payée + billet émis + place vendue, rejeu sans effet, session expirée → place rendue,
paiement sur commande expirée → « à vérifier ». Cœur métier : 61 tests.

**Non activé en production** : `PAIEMENT_PRESTATAIRE` n'y est pas défini, les ventes restent
fermées. **Prérequis signalés avant d'ouvrir les ventes** : compte SasPay vérifié et clés, webhook
créé, réseaux du Gabon confirmés ; `BILLETS_SECRET`, `LIENS_SECRET`, `PUBLIC_SERVER_URL` en
production ; **prestataire d'e-mail** (aujourd'hui aucun e-mail ne part en production) ; CGV ;
capacités des séances ; vente réelle de contrôle. **Statut : fait en local, non poussé.**

**Mise en conformité avec le guide d'intégration SasPay** (« saspay-integration » et règles pour
assistants, fournis par le Commanditaire le 6 novembre 2026 ; règles reprises dans `CLAUDE.md`) :

- **Vérifier avant de livrer** : la commande ne passe « payée » que si `GET /payments/{id}/verify/`
  renvoie `SUCCESS` (session payée mais transaction non vérifiée → reste en attente).
- **Comptabilité** : montant débité au client et net reçu notés dans le détail du paiement.
- **Webhook** : réponse immédiate, traitement en arrière-plan et en file ; **429** : arrêt de la
  relecture, reprise au passage suivant.
- **Variables** renommées comme dans le guide : `SASPAY_API_KEY`, `SASPAY_WEBHOOK_SECRET`.
- **Commande de contrôle** `npm --prefix backend run saspay:verifier` : variables, clé acceptée,
  réseaux ouverts au Gabon, plafond par paiement comparé au prix le plus élevé du catalogue (le
  Pass Diamant vaut 1 000 000 F CFA ; l'exemple de la documentation plafonne à 500 000), webhook
  déclaré et abonnements ; n'affiche aucun secret. Lancée en local sans clé : 3 points bloquants
  signalés, comme attendu.
- Tests : cœur métier 68 (dont 24 SasPay) ; `test:saspay` 9 vérifications réussies.
- **Non vérifié contre le vrai SasPay** (pas encore de clé) : session réelle, page de paiement,
  webhook réel (`webhook.test`), réseaux du Gabon.

**Déploiement du 6 novembre 2026** : code SasPay poussé sur `main` (`a6c50c1`) et sur les dépôts
du back-office suivis par Hostinger (`865a93b`). Le site n'a pas changé (pas de redéploiement).
Après déploiement : catalogue, réglages et admin répondent, ventes toujours fermées. **Limite** :
le code SasPay n'étant actif qu'avec ses variables, rien de public ne distingue la nouvelle version
de l'ancienne — la prise en compte est à confirmer dans hPanel (historique des déploiements du
back-office), puis par `npm --prefix backend run saspay:verifier` une fois les clés renseignées.

**Vérification contre le vrai SasPay (6 novembre 2026)** :
- **Configuration de production :** dans hPanel, les 12 variables sont présentes, dont `BILLETS_SECRET`, `LIENS_SECRET` et `PUBLIC_SERVER_URL`. Le back-office a été redéployé, sans erreur dans les journaux.
- **Contrôle `saspay:verifier`** (clé `sk_live_…`, portée « Encaissement ») :
  - clé acceptée ;
  - Airtel Gabon et Moov Money Gabon ouverts à l'encaissement ;
  - plafond de 10 000 000 F CFA par paiement chez Airtel : le Pass Diamant passe ;
  - webhook LIVE abonné à `transaction.success/failed/cancelled`.
- **Paiement réel de 200 F CFA** depuis un poste local (produits de test, `produits-test`) :
  - commande `CRN-DCN3ZCC` payée à la relecture suivante (≤ 2 min) ;
  - billet `CRN-DCN3ZCC-01` émis, PDF et e-mail générés ;
  - montants enregistrés : « débité 207 · net reçu 200 · frais client 7 F CFA » ;
  - webhooks `transaction.created` et `transaction.success` livrés au back-office en ligne (200).
- **Écarts constatés :**
  1. **Mode de frais :** le mode demandé par l'API est ignoré sans option du compte, et le compte était en « Ajoutés ». Le CRN a choisi « Déduits », réglé le jour même dans SasPay → Paramètres → Frais. Aucune route de l'API ne donne ce réglage, donc le contrôle le rappelle sans pouvoir le vérifier. **Preuve** : second paiement réel, commande `CRN-LPVCFMX` (pass de test). SasPay indique « mode Déduits, débité 200, net 193 XAF » ; la commande est payée et le billet `CRN-LPVCFMX-01` émis. Le libellé du détail devient « frais SasPay » : en mode « Déduits », c'est le CRN qui les paie.
  2. **Carte bancaire :** indisponible chez SasPay. Texte « ou carte bancaire » à retirer.
  3. **Webhook en double :** un second webhook à adresse tronquée renvoyait 404. Il a été supprimé, et le contrôle signale désormais ce cas.

**Confirmation de paiement et e-mails (6 novembre 2026)** :
- **Délai de confirmation côté client :** lors du test réel, la commande attendait le webhook ou la relecture toutes les 2 minutes (jusqu'à 1 min 40 d'attente). Désormais, chaque interrogation de la page de suivi (toutes les 3 s) relit SasPay pour une commande en attente, au plus une fois toutes les 5 s par commande. La confirmation suit SasPay en quelques secondes. Preuve : `npm run test:saspay`, 11 vérifications réussies, dont « paiement confirmé et billet affiché sans attendre le webhook » et « une seule lecture chez SasPay » pour deux interrogations rapprochées.
- **E-mails aux clients :** expédiés par SMTP depuis `boutique@crn-convention2026.events`, adresse choisie par le CRN. La boîte Hostinger existe et est active, et le domaine est relié à la messagerie. Dépendance `nodemailer` 10.2.1, épinglée, publiée le 22 octobre 2026. Actif dès que `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` sont renseignés. Un échec d'envoi ne bloque pas la confirmation. Essai : `npm run courriel:test`.
- **Limite signalée :** l'offre e-mail actuelle (essai gratuit Starter) plafonne à 100 envois par 24 h.
- **Essai réel d'envoi (6 novembre 2026)** :
  - `courriel:test` : connexion SMTP acceptée (`smtp.hostinger.com:465`, `boutique@crn-convention2026.events`) et e-mail d'essai envoyé à la boîte de la boutique.
  - DNS du domaine : MX Hostinger, SPF `include:_spf.mail.hostinger.com`, DKIM `hostingermail-a/b/c`, DMARC `p=none`.
