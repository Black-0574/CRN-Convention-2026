


## CONVENTION CRN 2026 — PAGE DE LA CONVENTION
Prompts maîtres
Claude Design et Claude Code
- Maquette de web design haut de gamme dans Claude Design
- Développement de la page premium dans Claude Code
Du Trône à l’autel, de l’autel à la cité

Mission CRN-AXX-2026-P2 — Transformation digitale 360° du CRN
Référence du document CRN-AXX-2026-P2/CONV-PROMPTS — version 1.0
Date 24 octobre 2026
Établi par Chef de Mission — Axxion Consulting Ltd
Documents sources
Programme et organisation — Convention CRN 2026 ; TDR et cahier des charges de la
Page (CONV-PAGE) ; Volets 1 et 2 ; GBIS v2.1, Volumes 1, 2 et 4
## Statut
Document de travail interne. Les maquettes et le code produits restent soumis à
validation du Commanditaire.

## STRICTEMENT CONFIDENTIEL

CRN-AXX-2026-P2 Page de la Convention — Prompts maîtres Claude Design et Claude Code
STRICTEMENT CONFIDENTIEL — Document de travail interne Page 2 / 11
## Préambule
## Objet
Ce document fournit deux prompts maîtres, prêts à copier, pour produire la Page de la Convention CRN 2026 à
partir du cahier des charges CONV-PAGE :
▪ Prompt 1 — Claude Design : produire une maquette de web design haut de gamme, mobile et ordinateur,
pour les trois états de la Page, avec sa bibliothèque de composants.
▪ Prompt 2 — Claude Code : développer la Page en production, conforme aux exigences F-, NF-, SEC- et INT-
CNV, avec son outil d’administration, ses tests et sa documentation.
Chaque prompt est suivi de prompts de relance pour les itérations et d’une grille de contrôle. Les blocs à copier
sont présentés sur fond crème, avec un filet doré.
Chaîne de production recommandée
## Étape Outil Sortie Validation
1 Claude Design — prompt 1
Maquettes des écrans clés et bibliothèque de
composants
Chef de Mission, puis
## Commanditaire
2 Claude Design — relances Variantes, états 2 et 3, revue de conformité GBIS Chef de Mission
3 Claude Design — export
Spécification de passage au développement
(jetons, composants, écrans)
Chef de Mission
4 Claude Code — prompt 2
Plan technique, puis développement par lot (L2 à
## L9)
Recette par lot, procès-verbal

Corrections et précisions apportées
CRITIQUE — Pastilles de statut de l’écosystème : correction de couleurs
Le Volet 2 et le cahier des charges (section 16) prévoyaient des pastilles verte et grise. Le vert est hors palette : il
enfreint la règle chromatique absolue du GBIS (Volume 2, section 3.7, usage proscrit de niveau Bloquant).
Les prompts retiennent donc des pastilles conformes : En service = fond bleu nuit #1A2C5B, texte blanc ; Aperçu = fond
or #B8963E, texte noir #101010 ; En chantier = contour gris clair #D8D4CB, texte gris #6B6B6B. Le Volet 2 et le cahier
des charges sont à aligner sur cette correction.

ÉLEVÉ — Typographies provisoires
Le GBIS fixe le principe (un sérif à contraste modéré pour le titrage, une linéale humaniste pour le labeur, Regular et
Bold uniquement), mais la licence typographique reste en attente d’arbitrage (Volume 2, section 5.5).
Les prompts retiennent à titre provisoire deux familles sous licence libre (scénario A) : Source Serif 4 (titrage) et Source
Sans 3 (labeur), auto-hébergées. Elles sont remplaçables sans refonte si le Commanditaire retient un autre scénario.

INFO — Données non arrêtées
Les Pass OR et DIAMANT, le lieu du Dîner des Élites et l’orateur du culte du 13 décembre ne sont pas arrêtés. Les
prompts imposent de les afficher « À annoncer » et interdisent d’inventer toute donnée.

CRN-AXX-2026-P2 Page de la Convention — Prompts maîtres Claude Design et Claude Code
STRICTEMENT CONFIDENTIEL — Document de travail interne Page 3 / 11
Mode d’emploi
## Pour Claude Design
▪ Ouvrir un nouveau projet de design et coller le prompt 1 en entier.
▪ Joindre si possible : GBIS Volumes 2 et 4, les fichiers du logo CRN et de la marque CRN International, et
quelques photos réelles de l’Église Centrale et des cultes.
▪ Procéder écran par écran avec les prompts de relance ; valider l’écran d’accueil avant de décliner les autres.
## Pour Claude Code
▪ Créer un dépôt vide ; y placer, dans un dossier docs/, le cahier des charges CONV-PAGE et l’export de la
maquette, convertis en Markdown.
▪ Coller le prompt 2 comme premier message, en mode planification : Claude Code doit d’abord produire un
plan et attendre la validation avant d’écrire du code.
▪ Enregistrer la section « Règles permanentes » du prompt 2 dans un fichier CLAUDE.md à la racine du dépôt,
pour qu’elles s’appliquent à toutes les sessions.
▪ Avancer lot par lot avec les prompts de phase ; faire recetter chaque lot avant le suivant.

CRN-AXX-2026-P2 Page de la Convention — Prompts maîtres Claude Design et Claude Code
STRICTEMENT CONFIDENTIEL — Document de travail interne Page 4 / 11
Partie 1 — Prompt maître Claude Design
1.1 Prompt maître
À coller en entier dans un nouveau projet Claude Design.
## ## RÔLE
Tu es directeur artistique et designer d’interface senior, spécialiste des sites éditoriaux et
événementiels haut de gamme, à l’aise avec les marques institutionnelles et religieuses. Tu conçois
pour des usages mobiles réels en Afrique centrale.

## ## MISSION
Concevoir la maquette complète de la « Page de la Convention CRN 2026 » : un site web léger, hébergé
sur le domaine du CRN (Ministères Christ Révélé aux Nations, Libreville, Gabon), qui sert de point
d’entrée numérique unique à la Convention, avant, pendant et après l’événement. Niveau attendu :
premium, digne d’une institution, à la hauteur des meilleurs sites éditoriaux internationaux.

## ## CONTEXTE
- Convention CRN 2026, du dimanche 6 au dimanche 13 décembre 2026 à Libreville ; pré-convention
sociale le samedi 5 décembre.
- Thème : « Du Trône à l’autel, de l’autel à la cité ». Hôte : Dr. Mike Jocktane, Évêque Général.
- Lieu principal : Église Centrale. Au Nomad le 13 décembre : culte unique de toutes les églises,
ordination, Concert pour la vie. Repas DIAMANT au Palais de l’Orient. Dîner des Élites : lieu à
annoncer.
- Les réseaux sociaux (Facebook, YouTube, Instagram, TikTok) sont suspendus au Gabon. Cette page
est le seul canal numérique commun aux fidèles du Gabon (sans VPN) et à la diaspora (Paris,
Toulouse, Marseille et autres pays).
- Public principal : fidèles sur smartphone Android d’entrée de gamme, en 3G ou 4G variable,
arrivant souvent par un QR code d’affiche ou de panneau.

## ## DIRECTION ARTISTIQUE
- Positionnement : apostolique et intellectuel. Ton solennel et chaleureux, jamais sensationnel. La
marque ne recherche pas le clic : pas de codes d’alerte, pas de typographie criarde, pas d’effets
racoleurs.
- Références d’esprit : la sobriété d’une grande maison d’édition, la clarté d’un programme de
festival culturel de référence, la solennité d’une cathédrale contemporaine.
- Fil narratif visuel, dérivé du thème : trois mouvements, le Trône, l’Autel, la Cité. Exprime-les
par la composition (élévation, axe vertical, filets dorés, passage progressif de la verticalité
vers l’horizontalité de la cité), jamais par des symboles religieux clichés ni par des codes
visuels du registre politique.
- La Convention relève de la Colonne 2, CRN International (archétype du Créateur) : dominante or
sur fonds clairs crème ou blanc, bleu nuit en support, bleu nuit profond en accent.
- Générosité de l’espace, grille rigoureuse, grande typographie de titrage, photographie réelle en
pleine largeur.

## SYSTÈME DE MARQUE (GBIS v2.1, opposable)
Palette exclusive. Aucune autre couleur, sous aucune forme (ni dégradé vers une couleur hors
palette, ni vert ou rouge d’interface) :
- Bleu nuit #1A2C5B ; Bleu nuit profond #16244A
- Or #B8963E ; Or lumière #D9C48A ; Or profond #8A6E22
- Crème #F7F5F0 (fond) ; Blanc #FFFFFF ; Noir #101010
- Gris fonctionnel #6B6B6B ; Gris clair des filets #D8D4CB
Proportions pour la Colonne 2 : or environ 40 % des surfaces colorées ; bleu nuit en support ; bleu
nuit profond en accent ; fonds crème ou blanc.
Règles de contraste absolues :
- Sur fond or, le texte est noir. Le blanc sur or est proscrit.
- Sur fond blanc ou crème, l’or ne porte jamais de texte : il porte des filets, des ornements, des
signatures graphiques.
- Le texte courant est noir ou bleu nuit sur crème ou blanc, ou blanc sur bleu nuit.

CRN-AXX-2026-P2 Page de la Convention — Prompts maîtres Claude Design et Claude Code
STRICTEMENT CONFIDENTIEL — Document de travail interne Page 5 / 11
## Typographie :
- Deux familles seulement. Titrage : Source Serif 4 (sérif à contraste modéré). Labeur : Source
Sans 3 (linéale humaniste). Graisses Regular et Bold uniquement.
- Échelle au ratio 1,25, base 16 px : H1 49 px (Bold, interligne 1,15, une seule occurrence par
écran) ; H2 39 px (Bold, 1,20) ; H3 31 px (Regular, 1,25) ; H4 25 px (Source Sans 3 Bold, 1,30) ;
20 px ; 16 px.
- Sur mobile, les titres descendent d’un niveau dans cette même échelle (H1 à 39 px), jamais en
dehors.
- Aucun texte sous 16 px, y compris les légendes et mentions.
- Texte courant aligné à gauche, 60 à 75 signes par ligne. Centrage réservé aux blocs de moins de
trois lignes.
- Italique réservé aux citations et titres d’œuvres. Capitales réservées aux titres courts et aux
étiquettes.

## ## CONTRAINTES DE CONCEPTION
- Mobile d’abord : concevoir à 360 px de large, puis décliner à 1440 px.
- Aucun widget de réseau social intégré, aucun lecteur YouTube : prévoir notre propre cadre de
lecteur vidéo.
- Images légères : prévoir des compositions qui restent belles avec peu de photos et beaucoup de
typographie.
- Accessibilité : contrastes conformes, zones tactiles d’au moins 44 px, états de focus visibles.
- Photographie : uniquement des photos réelles. Aucun visage généré par IA. Utilise des cadres de
substitution clairement marqués « Photo réelle à fournir ».
- Aucune donnée inventée. Ce qui n’est pas arrêté s’affiche « À annoncer ».

## ## CONTENUS RÉELS À UTILISER
Billetterie (ouverture le 25 octobre 2026), en F CFA :
- Une classe de l’Académie : 20 000 (classe complète sur trois jours) ; Pass Académie Intégral : 50
000 (trois classes)
- Femme de Foi — Live : 10 000 ; J’ai soif : 5 000 ; Dîner des Élites : 100 000
- Concert pour la vie : Standard 5 000, VIP 25 000
- Pagne officiel mixte : 10 000 ; Tee-shirt officiel : 10 000
- Pass OR et Pass DIAMANT : « À annoncer »
Règle d’accès : ticket ou pass électronique nominatif et intransférable, QR code unique, scanné à
chaque entrée ; aucun accès verbal.
## Programme :
- Sam. 5 déc., 9h–12h : Action sociale (pré-convention), Église Centrale
- Dim. 6 déc., 9h–12h : Culte unique, Robert Ondoa
- Lun. 7 déc., 9h–15h : Pastorale CRN ; 17h–21h : Cérémonie d’ouverture, Dr. Mike Jocktane
- Mar. 8 au jeu. 10 déc. : 6h–7h30 Matin de gloire ; 9h–12h30 Académie des Sciences Divines ; 14h–
16h Atmosphère prophétique ; 17h–21h Plénière
- Atmosphères prophétiques : mar. Jek Kalombo ; mer. Wilson Ndi ; jeu. Nadia Jocktane
- Plénières : mar. Robert Ondoa et Michel Ambouroué ; mer. Silas Makangu et François Rabenkogo ;
jeu. Wilson Ndi et Silas Makangu
- Académie, mêmes horaires les trois jours : 9h–10h « Bâtisseurs d’Autels » (Robert Ondoa, Nadia
Jocktane) ; 10h15–11h15 « Le Mystère des Trônes » (Dr. Mike Jocktane, François Rabenkogo) ;
11h30–12h30 « Architectes de la Cité » (Silas Makangu, Michel Ambouroué)
- Ven. 11 déc. : 6h–7h30 Matin de gloire spécial, Sainte Cène et prière pour les familles ; 17h–21h
Soirée africaine et prophétique (Nadia Jocktane, Wilson Ndi, Jek Kalombo)
- Sam. 12 déc. : 8h–11h Femme de Foi — Live (Patricia Piebi) ; 13h–16h30 J’ai soif (Jek Kalombo,
Carelle Ambouroué) ; 19h–22h Dîner des Élites (lieu à annoncer)
- Dim. 13 déc., au Nomad : 9h–12h Culte unique de toutes les églises (orateur à annoncer) ; 13h–
14h30 Cérémonie d’ordination ; 17h Concert pour la vie
Orateurs : Dr. Mike Jocktane (hôte) ; internationaux : Robert Ondoa, Silas Makangu, Wilson Ndi ;
nationaux : Michel Ambouroué, Nadia Jocktane, François Rabenkogo ; prophétique : Jek Kalombo ;
plateformes : Patricia Piebi, Carelle Ambouroué.
Artistes du Concert pour la vie (programmation exclusivement nationale et locale) : Grâce Jocktane,
Diane Omega, Betty Onanga, Bienvenu Moussounda, Orphelia Njoya, Priscille Ngouwa, Lisa Kate, Annick
## Nzie, Valentin Mouyama, Charlène Nzamba.
Ne montre ni le repas DIAMANT, ni le petit-déjeuner des orateurs, ni les enregistrements médias dans
le programme public.

CRN-AXX-2026-P2 Page de la Convention — Prompts maîtres Claude Design et Claude Code
STRICTEMENT CONFIDENTIEL — Document de travail interne Page 6 / 11

## ## LES TROIS ÉTATS DE LA PAGE
- État 1, Campagne (31 oct. – 5 déc.) : convoquer et vendre. Accueil avec compte à rebours,
programme, orateurs et artistes (révélation progressive), billetterie, Académie, action sociale
(collecte du 9 au 27 novembre), infos pratiques, diaspora, FAQ.
- État 2, Événement (6 – 13 déc.) : faire vivre. Programme du jour en tête, direct, Journal de la
Convention (vidéo quotidienne), offrandes en ligne, bandeau d’information.
- État 3, Prolongement (à partir du 13 déc.) : envoyer. Remerciements, bilan, rapport de l’action
sociale, replays, section « Écosystème digital du CRN ».

## ÉCRANS À PRODUIRE (mobile 360 px et ordinateur 1440 px)
- Accueil, état 1 : thème, dates, compte à rebours, appel « Prendre mon pass », aperçu des trois
mouvements, temps forts.
- Programme : vue par jour, filtre par plateforme, cartes de séance (horaire, lieu, intervenants,
mode de diffusion).
- Fiche orateur : photo, biographie, interventions, vidéo d’invitation.
- Billetterie : grille tarifaire, contenu de chaque pass, règles d’accès par QR code, appel vers
l’achat.
- Académie des Sciences Divines : trois classes, orateurs, horaires, mise en avant du Pass
## Intégral.
- Infos pratiques et FAQ : lieux, accès, horaires, règles d’accès.
- Diaspora : suivre à distance, donner, session en ligne du 19 décembre.
- Accueil, état 2 : programme du jour, lecteur du direct, Journal de la Convention, appel aux
offrandes, bandeau d’information.
- Offrandes et dons : choix du montant et de l’affectation, Airtel Money, Moov Money, carte
bancaire, confirmation.
- Écosystème digital, état 3 : récit, statut de chaque interface, calendrier par trimestre,
formulaire d’inscription avec consentement.

## ## SECTION ÉCOSYSTÈME : CONTENU ET PASTILLES
Interfaces : MJO Global ; LIDERCIEL (Académie apostolique) ; Éditions ; Business (Boutique CRN) ;
CRN Fondation ; Cercle Royaume ; Portail ; Média (Webzine, WebTV, WebRadio).
Pastilles de statut, conformes à la palette :
- « Disponible » : fond bleu nuit, texte blanc
- « Aperçu — bientôt disponible » : fond or, texte noir
- « En construction — [trimestre] » : contour gris clair, texte gris
Calendrier exprimé par trimestre uniquement, jamais par date précise. Prévois deux variantes de
récit : regroupement par le thème (Trône, Autel, Cité) et regroupement par les usages du fidèle
(écouter, apprendre, lire, participer, soutenir, appartenir).
Formulaire d’inscription : nom et prénom, téléphone, e-mail facultatif, église de rattachement, pays
et ville, centres d’intérêt facultatifs, case de consentement non pré-cochée et distincte.

## ## BIBLIOTHÈQUE DE COMPOSANTS
Boutons (principal, secondaire, texte) et leurs états ; en-tête et menu mobile ; compte à rebours ;
carte de séance ; carte d’orateur ; carte de produit ou de pass ; bandeau d’information ; cadre de
lecteur vidéo (en direct, en attente, coupure, replay) ; pastilles de statut ; champs de formulaire
et case de consentement ; pied de page ; signalétique des trois mouvements.

## ## LIVRABLES ATTENDUS
- Les dix écrans, en mobile et en ordinateur.
- La bibliothèque de composants et les jetons de design : couleurs, typographie, espacements,
rayons, ombres.
- Une note courte justifiant les choix de direction artistique.
- Une auto-évaluation de conformité au GBIS, point par point, en signalant tout écart.

## ## MÉTHODE
Commence par l’écran d’accueil de l’état 1 en mobile, avec deux pistes de direction artistique
contrastées. Arrête-toi pour validation avant de décliner le reste. Toute ambiguïté se signale ;
elle ne se résout pas en silence.

CRN-AXX-2026-P2 Page de la Convention — Prompts maîtres Claude Design et Claude Code
STRICTEMENT CONFIDENTIEL — Document de travail interne Page 7 / 11

1.2 Prompts de relance
Usage Prompt de relance à copier
Choisir et approfondir une
piste
Retiens la piste [A ou B]. Pousse-la plus loin : affine la grille, la hiérarchie typographique et le
rythme des sections. Montre l’accueil de l’état 1 en mobile et en ordinateur, puis arrête-toi.
Décliner les écrans
Décline maintenant les écrans 2 à 7 dans la piste validée, en mobile d’abord. Réutilise
strictement les composants existants ; si un nouveau composant est nécessaire, ajoute-le à la
bibliothèque et signale-le.
## État 2 — Événement
Conçois l’état 2 (écrans 8 et 9). Priorité : lisibilité en plein soleil, consultation en moins de dix
secondes, programme du jour en tête. Montre les quatre états du lecteur : en direct, en
attente, coupure, replay.
## État 3 — Écosystème
Conçois l’écran 10 dans ses deux variantes de récit (par le thème, par les usages). Les pastilles
respectent strictement la palette. Aucune date précise, uniquement des trimestres.
Revue de conformité GBIS
Fais la revue de conformité GBIS de tous les écrans : couleurs hors palette, or portant du texte
sur fond clair, blanc sur or, texte sous 16 px, graisses autres que Regular et Bold, plus de deux
familles, lignes de plus de 75 signes. Liste chaque écart et corrige-le.
Préparer le passage au
développement
Prépare la spécification de passage au développement : jetons de design au format JSON,
inventaire des composants avec leurs variantes et états, points de rupture, comportements
interactifs, et liste des contenus à fournir par le CRN.

1.3 Grille de contrôle de la maquette
Contrôle Référence OK
Aucune couleur hors des dix valeurs de la palette GBIS V2, 3.3 et 3.7 ☐
Aucun texte or sur fond clair ; aucun blanc sur or GBIS V2, règles de contraste ☐
Deux familles, Regular et Bold, aucun texte sous 16 px GBIS V2, 5.2 et 5.3 ☐
Proportions de la Colonne 2 respectées GBIS V2, 3.4 ☐
Aucun visage généré ; photos réelles ou cadres de substitution Règle R3 ☐
Aucune donnée inventée ; « À annoncer » pour les points non arrêtés Règle R5 ☐
Aucun widget de réseau social ni lecteur YouTube NF-CNV-001 ☐
Billetterie conforme à la section VI du document de référence F-CNV-020 ☐
Pastilles conformes à la palette ; calendrier par trimestre F-CNV-050 et 051 ☐
Consentement non pré-coché et distinct F-CNV-052 ☐
Zones tactiles d’au moins 44 px ; focus visible NF-CNV-008 ☐

CRN-AXX-2026-P2 Page de la Convention — Prompts maîtres Claude Design et Claude Code
STRICTEMENT CONFIDENTIEL — Document de travail interne Page 8 / 11
Partie 2 — Prompt maître Claude Code
2.1 Préparer le dépôt
## Fichier Contenu
docs/CONV-PAGE.md Termes de référence et cahier des charges de la Page, convertis en Markdown
docs/maquette/ Export de Claude Design : jetons JSON, inventaire des composants, captures des écrans
docs/donnees-reference.md
Programme, orateurs, artistes et tarifs, repris du document de référence (section «
Contenus réels » du prompt 1)
docs/conformite.md Créé par Claude Code ; tableau de conformité des exigences
CLAUDE.md Section « Règles permanentes » du prompt 2

2.2 Prompt maître
À coller comme premier message, en mode planification.
## ## RÔLE
Tu es ingénieur logiciel principal full-stack, expert en performance web, sécurité et sites
événementiels à forte affluence. Tu livres du code de production, testé, documenté et maintenable
par une petite équipe.

## ## MISSION
Développer la « Page de la Convention CRN 2026 », site web premium du CRN (Ministères Christ Révélé
aux Nations, Libreville, Gabon), conformément au cahier des charges docs/CONV-PAGE.md et à la
maquette docs/maquette/. En cas de conflit, le cahier des charges prime sur la maquette ; signale
tout conflit.

## ## CONTEXTE CRITIQUE
- Facebook, YouTube, Instagram et TikTok sont bloqués au Gabon ; WhatsApp est perturbé. L’accès
général à Internet fonctionne.
- La page doit s’afficher intégralement, sans VPN, sur smartphone Android d’entrée de gamme en 3G
ou 4G variable.
- Fuseau horaire de référence : Africa/Libreville (UTC+1). Toute date et toute bascule sont
calculées dans ce fuseau.
- Pics de trafic attendus : passages de QR codes pendant la campagne, directs du 6 au 13 décembre,
culte au Nomad le 13 décembre.

## ARCHITECTURE PAR DÉFAUT (à confirmer dans ton plan)
- Frontal : Astro, TypeScript strict, rendu statique pour l’essentiel, rendu serveur pour les
parties dynamiques (bandeau, programme du jour, état du direct), mise en cache HTTP courte.
- CSS natif fondé sur les jetons de design de la maquette. JavaScript limité à quelques îlots :
compte à rebours, filtres du programme, lecteur, formulaires.
- Outil d’administration : CMS auto-hébergé, en français, avec rôles, brouillons, historique des
versions et publication programmée. Défaut : Payload CMS sur PostgreSQL ; Directus est acceptable
si tu le justifies.
- Vidéo : lecteur HLS (hls.js auto-hébergé), source configurable dans l’administration (brique B5
du Socle si livrée, sinon service tiers accessible au Gabon).
- Paiement : couche d’abstraction PaymentProvider avec adaptateurs. L’agrégateur n’est pas choisi :
livre un adaptateur fictif pour les tests et le contrat d’interface (mobile money Airtel et Moov,
carte, webhook signé, idempotence).
- Mesure d’audience auto-hébergée et respectueuse de la vie privée (Matomo ou Plausible).
- Déploiement : Docker Compose, portable chez n’importe quel hébergeur, derrière un CDN.
- Versions : épingle chaque dépendance à une version exacte, publiée depuis au moins 14 jours.

CRN-AXX-2026-P2 Page de la Convention — Prompts maîtres Claude Design et Claude Code
STRICTEMENT CONFIDENTIEL — Document de travail interne Page 9 / 11

## ## MODÈLE DE CONTENU
- Settings : calendrier des états, bascule manuelle, bandeau d’information, configuration du
direct.
- Venue, Day, Session (plateforme, début, fin, lieu, intervenants, mode de diffusion : direct,
extraits, différé, non diffusé, à arbitrer ; visibilité publique).
- Speaker et Artist (catégorie, biographie, photo, vidéo, date de publication).
- Product (prix en F CFA, contenu, lien d’achat, statut « complet », « À annoncer »).
- Faq, JournalEntry, Replay, LegalPage.
- EcosystemInterface (nom, mouvement, usage, statut : en_service, apercu, chantier ; horizon par
trimestre ; lien seulement si en_service).
- Registration (champs du formulaire, texte et version du consentement, horodatage, source).
- Donation (référence du prestataire, montant, affectation, statut ; jamais de donnée de carte).
Le programme est une source unique : toute modification se propage partout sans double saisie.

## ## ÉTATS ET BASCULES
- État 1 jusqu’au 5 déc. à 23h59 ; état 2 du 6 déc. à 00h00 au 13 déc. à 23h59 ; état 3 à partir du
14 déc. à 00h00 ; section écosystème visible le 13 déc. à 12h00, heure de Libreville.
- Bascules programmées, avec un forçage manuel dans l’administration ; aucun redéploiement
nécessaire.
- Bandeau d’information publiable en moins de 2 minutes, visible partout en moins de 2 minutes.

## ## EXIGENCES NON NÉGOCIABLES
- NF-CNV-001 : aucune requête vers facebook.com, fbcdn.net, youtube.com, ytimg.com, youtube-
nocookie.com, instagram.com, cdninstagram.com, tiktok.com, tiktokcdn.com, whatsapp.com. Polices,
scripts et lecteurs sont auto-hébergés.
- Budget de performance : accueil sous 1,5 Mo au total, JavaScript de l’accueil sous 100 Ko
compressé, contenu principal affiché en moins de 3 secondes sur un profil 4G lent.
- Sécurité : HTTPS partout ; double authentification pour l’administration (si le CMS ne l’offre
pas nativement, place l’administration derrière une authentification à double facteur) ; comptes
nominatifs ; protection anti-spam auto-hébergée sans service Google ; limitation de débit ; en-
têtes de sécurité dont une politique CSP stricte ; sauvegarde quotidienne avec restauration
testée ; journal des actions d’administration.
- Données personnelles : consentement non pré-coché, distinct, horodaté, avec texte versionné ;
export CSV complet ; aucune donnée de paiement stockée.
- Accessibilité : contrastes conformes, navigation au clavier, textes alternatifs, sous-titres,
zones tactiles d’au moins 44 px.
- Typographie française : espaces insécables avant « : ; ! ? » et à l’intérieur des guillemets « »
; apostrophe typographique ’ dans les textes affichés.

## GBIS (identité visuelle, opposable)
Palette exclusive : #1A2C5B, #16244A, #B8963E, #D9C48A, #8A6E22, #F7F5F0, #FFFFFF, #101010, #6B6B6B,
#D8D4CB. Sur fond or, texte noir ; jamais de blanc sur or ; jamais de texte or sur fond clair.
Source Serif 4 et Source Sans 3, Regular et Bold uniquement ; aucun texte sous 16 px. Pastilles
d’écosystème : bleu nuit et texte blanc ; or et texte noir ; contour gris clair et texte gris.

## ## TESTS ET CONTRÔLES AUTOMATISÉS (CI)
- Lint, vérification des types, tests unitaires (Vitest).
- Tests de bout en bout (Playwright) sur une fenêtre de 360 × 740, avec capture du trafic réseau :
échec si un domaine interdit est appelé.
- Analyse du code construit à la recherche des domaines interdits.
- Accessibilité (axe) sur toutes les pages.
- Budgets Lighthouse CI.
- Script de test de charge (k6) pour l’accueil, le programme du jour et le lecteur.
- Tests des bascules d’état, avec horloge simulée dans le fuseau Africa/Libreville.

## ## DONNÉES DE DÉPART

CRN-AXX-2026-P2 Page de la Convention — Prompts maîtres Claude Design et Claude Code
STRICTEMENT CONFIDENTIEL — Document de travail interne Page 10 / 11
Crée un jeu de données initial à partir de docs/donnees-reference.md (programme, orateurs, artistes,
tarifs). N’invente rien : ce qui n’est pas arrêté (Pass OR et DIAMANT, lieu du Dîner des Élites,
orateur du culte du 13 décembre) s’affiche « À annoncer ». N’affiche jamais au public le repas
DIAMANT, le petit-déjeuner des orateurs ni les enregistrements médias. Les photos manquantes
utilisent un cadre neutre ; jamais de visage généré.

## ## LOTS DE LIVRAISON
- L2, au 31 oct. : version minimale de l’état 1 (accueil, programme, lien de billetterie, infos
pratiques, FAQ), en production.
- L3, au 9 nov. : état 1 complet et outil d’administration.
- L4, au 20 nov. : état 2 (direct, Journal, offrandes, bandeau), intégrations testées.
- L5, au 2 déc. : recette générale, test de charge, sécurité, sauvegarde et restauration.
- L6, au 4 déc. : état 3 prêt, non publié.
- L8 et L9 : replays, bilan, documentation, plan de réversibilité vers le Portail.
Définition du « terminé » pour chaque lot : exigences MUST du lot satisfaites, CI au vert,
démonstration sur un environnement de préproduction, notes de version.

## RÈGLES PERMANENTES (à copier dans CLAUDE.md)
- Le cahier des charges docs/CONV-PAGE.md fait foi.
- Aucune donnée inventée ; aucune dépendance vers un domaine interdit ; aucun visage généré.
- Toute ambiguïté ou tout conflit se signale par écrit avant de coder ; rien n’est résolu en
silence.
- Chaque exigence implémentée est référencée par son identifiant (F-CNV-xxx, NF-CNV-xxx, SEC-CNV-
xxx, INT-CNV-xxx) dans le code ou les tests.
- Tiens à jour docs/conformite.md : tableau des exigences, statut, preuve (test ou capture).
- Tout texte destiné au public est en français et suit la typographie française.

## ## MÉTHODE
Commence en mode planification. Produis :
1) l’architecture retenue et sa justification ;
2) l’arborescence du dépôt ;
3) le modèle de données ;
4) la correspondance exigences → composants → tests ;
5) le plan du lot L2 ;
6) la liste des questions bloquantes.
Attends ma validation avant d’écrire la moindre ligne de code.

2.3 Prompts de relance
Usage Prompt de relance à copier
Lancer un lot
Plan validé. Réalise le lot [L2]. Travaille par petites étapes vérifiables, exécute les tests à chaque
étape, et termine par : exigences couvertes, preuves, écarts, notes de version.
Revue de sécurité
Fais une revue de sécurité complète : authentification de l’administration, contrôle d’accès par
rôle, formulaires, webhooks de paiement, en-têtes, dépendances. Classe chaque constat
(critique, élevé, modéré) et corrige les deux premiers niveaux.
Audit « sans VPN »
Exécute l’audit NF-CNV-001 : liste toutes les requêtes réseau de chaque page, en production
simulée, et prouve qu’aucun domaine interdit n’est appelé. Ajoute tout domaine tiers
découvert à une liste explicite pour validation.
## Performance
Mesure chaque page sur un profil 4G lent et un appareil Android d’entrée de gamme simulé.
Respecte les budgets ; pour chaque dépassement, propose et applique la correction la moins
risquée.
Préparer la Convention
Prépare l’exploitation des 6 au 13 décembre : guide d’astreinte, procédure de bascule manuelle,
procédure en cas de coupure du direct, tableau de supervision, test de restauration, répétition
des bascules d’état avec horloge simulée.

CRN-AXX-2026-P2 Page de la Convention — Prompts maîtres Claude Design et Claude Code
STRICTEMENT CONFIDENTIEL — Document de travail interne Page 11 / 11
Usage Prompt de relance à copier
## Réversibilité
Rédige le plan de réversibilité vers le Portail : export des contenus, des inscriptions et des
consentements, redirections, documentation de l’interface d’échange pour le futur CRM.

2.4 Points de vigilance pour la revue humaine
▪ Validation du plan : vérifier que l’architecture proposée permet à l’équipe du CRN de publier sans le
prestataire, et qu’elle reste hébergeable chez tout fournisseur.
▪ Code généré : aucune mise en production sans relecture humaine ni recette du lot par le Chef de Mission.
L’IA accélère, elle ne décide pas.
▪ Paiement : l’adaptateur réel n’est branché qu’après le choix de l’agrégateur (ARB-PAGE-08) et un test de
sécurité (ARB-PAGE-05).
▪ Contenus : tout texte public reste soumis au circuit de validation du Volet 1 avant publication.
▪ Cadre contractuel : conformément à l’Article 12, le développement et l’exploitation relèvent du prestataire
retenu par le CRN (ARB-PAGE-01), qui reste responsable du code livré.