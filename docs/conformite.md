# Conformité — Page de la Convention CRN 2026

Tableau de traçabilité exigence → lot → statut → preuve. Statuts : **Couvert** (satisfait pour le
périmètre du lot indiqué), **Partiel** (couvert en partie, limite documentée), **Hors scope L2**
(prévu à un lot ultérieur, non traité ici). Mis à jour à chaque lot livré.

## Écart assumé par le Commanditaire — images à visages générés par IA pour les cartes Trône/Autel/Cité (1er novembre 2026)

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
hotline (+241 70 10 10 10) et e-mail (contact@crn-convention.events) repris tels qu'établis dans
`TopBar.astro` ; aucun numéro SMS/WhatsApp affiché (non arrêté, et un lien `wa.me` serait de toute
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
