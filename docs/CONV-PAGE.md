


## CONVENTION CRN 2026
Page de la Convention
Termes de référence et cahier des charges
Point de convergence numérique de la Convention, accessible sans VPN :
programme, billetterie, direct, offrandes, replays et présentation de l’écosystème
digital
Du Trône à l’autel, de l’autel à la cité

Mission CRN-AXX-2026-P2 — Transformation digitale 360° du CRN
Référence du document CRN-AXX-2026-P2/CONV-PAGE — version 1.0
Date 24 octobre 2026
Maître d’ouvrage Ministères Christ Révélé aux Nations (CRN) — Évêque Général Dr. Mike
## Jocktane
Spécification et réception Chef de Mission — Axxion Consulting Ltd
Documents liés Programme et organisation — Convention CRN 2026 ; Volets 1 et 2
(CONV-V1, CONV-V2) ; TDR Écosystème digital ; GBIS v2.1 ; Protocole
d’accord CRN – LWS
Statut PROJET — soumis à validation du Commanditaire avant toute diffusion à
un prestataire.

## STRICTEMENT CONFIDENTIEL

CRN-AXX-2026-P2 Convention CRN 2026 — Page de la Convention — TDR et cahier des charges
STRICTEMENT CONFIDENTIEL — Projet soumis à validation du Commanditaire Page 2 / 16
## Préambule
Objet du document
Le présent document définit la Page de la Convention CRN 2026 : un site web léger, hébergé
sur le domaine propre du CRN, qui sert de point de convergence numérique à toute la campagne de
la Convention (6 – 13 décembre 2026), avant, pendant et après l’événement.
Il se compose de deux parties. Les termes de référence (Partie 1) exposent le pourquoi, le quoi,
le  quand  et  le  qui.  Le cahier  des  charges (Partie  2)  détaille  les  exigences  fonctionnelles,  non
fonctionnelles, de sécurité et d’interopérabilité, ainsi que les modalités de recette.
Convention de rédaction des exigences
Les exigences suivent le gabarit du TDR Écosystème digital (Volume 1, section 2.5), avec le code
d’interface CNV :
Préfixe Nature de l’exigence
F-CNV-NNN Exigence fonctionnelle
NF-CNV-NNN Exigence non fonctionnelle (performance, disponibilité, capacité)
SEC-CNV-NNN Sécurité et protection des données
INT-CNV-NNN Interopérabilité et intégrations

## Priorité Signification
MUST Obligatoire : condition de la recette
SHOULD Fortement souhaitable : reporté seulement pour raison documentée
COULD Optionnel : réalisé si la capacité le permet
WON’T Explicitement hors périmètre de la présente phase

INFO — Cadre contractuel
Conformément à l’Article 12, le Chef de Mission spécifie, supervise et garantit la réception. Le
développement, l’hébergement et l’exploitation de la Page relèvent du prestataire retenu par le CRN.
La Page n’est pas l’une des neuf interfaces du protocole d’accord CRN – LWS : elle est provisoire et sera
remplacée par le Portail à sa livraison (Jalon 3). Son véhicule contractuel reste à arrêter (ARB-PAGE-01).

CRN-AXX-2026-P2 Convention CRN 2026 — Page de la Convention — TDR et cahier des charges
STRICTEMENT CONFIDENTIEL — Projet soumis à validation du Commanditaire Page 3 / 16
Partie 1 — Termes de référence
- Contexte et justification
Le CRN tient sa Convention 2026 à Libreville du 6 au 13 décembre, sur le thème « Du Trône à l’autel,
de l’autel à la cité ». La billetterie ouvre le 25 octobre et la communication s’intensifie à partir de
cette date. Le plan de communication (Volet 1) et le plan de présentation de l’écosystème digital
(Volet 2) font tous deux reposer leur dispositif sur une page web hébergée sur le domaine du CRN.
Ce choix répond à une contrainte forte : depuis le 17 février 2026, Facebook, TikTok, YouTube et
Instagram  sont suspendus  au  Gabon,  et  WhatsApp  est  bloqué  ou  fortement  perturbé.  L’accès
général à Internet reste fonctionnel. Une page sur un domaine propre, sans dépendance à
un service bloqué, est le seul canal numérique commun aux fidèles du Gabon et de la
diaspora.
La Page est aussi la première démonstration publique d’un principe posé par le TDR Écosystème
digital  :  rester  accessible  et  ne  dépendre  d’aucun  canal  tiers  pour  la  communication  et  la
conservation des contenus.
## 2. Objectifs
Objectif général
DÉCISION — Formulation proposée
Doter la Convention CRN 2026 d’un point d’entrée numérique unique, accessible sans VPN au Gabon
comme à l’international, qui informe, vend, diffuse, collecte et capitalise, du 31 octobre 2026 au 31 mars
## 2027.

Objectifs spécifiques
N° Objectif spécifique Rattachement
OS-1 Informer : publier un programme maître unique, aligné sur le
document de référence, et les informations pratiques
Volet 1, règle R5
OS-2 Vendre : orienter vers la billetterie et la boutique, et expliquer les
règles d’accès par QR code
Volet 1, OS2 et OS4
OS-3 Diffuser : porter le direct des plateformes retenues et le Journal de
la Convention, visibles au Gabon sans VPN
Volet 1, OS3 ; matrice de
diffusion
OS-4 Collecter : recevoir offrandes et dons en ligne, et soutenir la
campagne de l’action sociale
Volet 1, OS3
OS-5 Présenter l’écosystème digital en construction et recueillir les
inscriptions « premiers membres »
## Volet 2
OS-6 Capitaliser : recueillir les consentements, publier replays et bilan,
préparer la migration vers le Portail
Volets 1 et 2, OS5 et
## OE3


CRN-AXX-2026-P2 Convention CRN 2026 — Page de la Convention — TDR et cahier des charges
STRICTEMENT CONFIDENTIEL — Projet soumis à validation du Commanditaire Page 4 / 16
## 3. Périmètre
## Inclus
▪ Conception, développement, hébergement et exploitation d’un site web responsive, conçu
pour le mobile, sous un sous-domaine du domaine du CRN (par exemple « convention. » suivi
du domaine, ARB-PAGE-02).
▪ Un outil d’administration permettant à l’équipe digitale du CRN de publier et mettre à jour les
contenus sans intervention du prestataire.
▪ L’intégration de la billetterie transitoire, d’un service de paiement des offrandes, d’un lecteur
vidéo non bloqué au Gabon et d’un formulaire d’inscription relié à une base exportable.
▪ Trois états successifs de la Page, programmés et réversibles (section 4).
▪ La recette, la documentation, la formation des administrateurs et l’astreinte pendant la
## Convention.
## Exclus
▪ Le développement de la billetterie elle-même : la Page s’appuie sur la solution transitoire
arrêtée par le CRN (ARB-CONV-01), sans la remplacer.
▪ Le Portail et les interfaces de l’écosystème, réalisés au titre du protocole d’accord CRN – LWS.
▪ La production des contenus éditoriaux, visuels et vidéo, fournis par l’équipe digitale du CRN.
▪ Les campagnes publicitaires, les envois SMS et la gestion des réseaux sociaux.
- Les trois états de la Page
La Page évolue avec la campagne. Chaque état est préparé à l’avance et activé à une date précise,
sans refonte.
## État Période Fonction
dominante
Sections actives
État 1 — Campagne 31 oct. – 5 déc. Convoquer et
vendre
Accueil avec compte à rebours,
programme, orateurs et artistes (révélation
progressive), billetterie, Académie, action
sociale, infos pratiques, diaspora, FAQ
État 2 — Événement 6 – 13 déc. Faire vivre et relier Direct, programme du jour, Journal de la
Convention, offrandes, bandeau
d’information, infos pratiques ; billetterie
pour les plateformes restantes
## État 3 —
## Prolongement
13 déc. – 31
mars
Envoyer et
capitaliser
Écosystème digital (dès le 13 déc. à 12h),
remerciements, bilan, rapport de l’action
sociale, replays, inscriptions

- Publics et parcours prioritaires
Public Parcours prioritaire Contrainte d’usage
Fidèle au Gabon QR code d’une affiche ou d’un panneau →
programme → billetterie
Smartphone d’entrée de gamme ;
connexion 3G/4G variable ; sans
## VPN

CRN-AXX-2026-P2 Convention CRN 2026 — Page de la Convention — TDR et cahier des charges
STRICTEMENT CONFIDENTIEL — Projet soumis à validation du Commanditaire Page 5 / 16
Public Parcours prioritaire Contrainte d’usage
Délégation du réseau Programme → infos pratiques → billetterie Organisation collective ; besoin
des horaires et lieux précis
Diaspora Réseaux CRN International → page
diaspora → direct, offrandes
Fuseau identique à Libreville en
décembre ; paiement par carte
Participant pendant
l’événement
SMS du soir → programme du jour → direct
ou Journal
Réseau saturé sur site ;
consultation rapide
Absent Page écosystème → film → inscription Après le 13 décembre ; lien
partagé par les églises
## 6. Livrables
## N° Livrable Échéance
L1 Maquettes mobile et ordinateur de l’état 1, conformes au GBIS (Volume 4) 28 oct.
L2 Page en ligne, version minimale de l’état 1 (accueil, programme, billetterie,
infos pratiques, FAQ)
31 oct.
L3 État 1 complet (orateurs, Académie, action sociale, diaspora) et outil
d’administration
9 nov.
L4 État 2 développé, intégrations du lecteur et des offrandes testées sans VPN 20 nov.
L5 Recette générale, test de charge, procès-verbal de recette 2 déc.
L6 État 3 préparé et non publié (section écosystème) 4 déc.
L7 Astreinte et rapport d’exploitation de la Convention 6 – 14 déc.
L8 Replays et bilan publiés ; documentation et export intégral des données 28 déc.
L9 Plan de réversibilité vers le Portail 31 janv. 2027
- Calendrier et jalons
## Date Jalon Nature
24 – 27 oct. Validation des présents TDR ; arbitrages ARB-PAGE-01 à 03 ;
désignation du prestataire
## Décision
28 oct. Validation des maquettes (L1) Validation
31 oct. Mise en ligne de la version minimale (L2) Mise en
production
9 nov. État 1 complet ; début de la révélation des orateurs (L3) Mise en
production
20 nov. État 2 testé ; test du direct depuis Libreville sans VPN (L4) Recette partielle
2 déc. Recette générale et test de charge (L5) Recette
4 déc. État 3 prêt (L6) Recette

CRN-AXX-2026-P2 Convention CRN 2026 — Page de la Convention — TDR et cahier des charges
STRICTEMENT CONFIDENTIEL — Projet soumis à validation du Commanditaire Page 6 / 16
## Date Jalon Nature
6 déc., 0h Bascule vers l’état 2 Bascule
programmée
13 déc., 12h Publication de la section écosystème Bascule
programmée
14 déc. Bascule vers l’état 3 Bascule
programmée
28 déc. Replays, bilan, documentation (L8) Livraison
31 mars 2027 Fin de la période d’exploitation ; réversibilité vers le Portail Clôture

ÉLEVÉ — Délai de la version minimale
La mise en ligne au 31 octobre laisse une semaine de réalisation. Elle n’est tenable qu’avec une version
minimale, une technologie éprouvée et des contenus fournis dès le 27 octobre. Le reste de l’état 1 est
livré le 9 novembre, en même temps que le début de la vague 2 de la campagne.
- Organisation et gouvernance
Rôle Titulaire proposé Responsabilités
Maître d’ouvrage CRN — Évêque Général Validation des TDR, des maquettes et des
contenus ; arbitrages
Spécification et réception Chef de Mission Cahier des charges, suivi, recette, procès-
verbaux
## Prestataire (maîtrise
d’œuvre)
À désigner (ARB-PAGE-01) Développement, hébergement, intégrations,
exploitation, astreinte
Contenus et publication H. Creppy, S. Assengone Saisie et mise à jour des contenus ; programme
maître
Données et
consentements
H. Creppy Formulaire, base, exports, droits d’accès
Identité visuelle J. Massala Visuels et gabarits conformes au GBIS
Vidéo Darwin, Pôle Technique Direct, Journal, film, replays
Relais institutionnel Mme Lesnie Angué
## Assoumou
Circulation des validations avec le Cabinet

Rituels : point de suivi hebdomadaire avec le prestataire, intégré au comité du lundi du Volet 1 ;
point quotidien pendant la Convention, intégré au point de régie de 21h15.
- Profil attendu du prestataire
▪ Expérience démontrée de sites événementiels à forte affluence, avec diffusion vidéo et
paiement mobile en Afrique centrale.
▪ Maîtrise des contraintes d’accès propres au Gabon et capacité à tester depuis Libreville sur les
réseaux Airtel et Moov.

CRN-AXX-2026-P2 Convention CRN 2026 — Page de la Convention — TDR et cahier des charges
STRICTEMENT CONFIDENTIEL — Projet soumis à validation du Commanditaire Page 7 / 16
▪ Capacité d’astreinte pendant toute la Convention, avec un interlocuteur joignable à Libreville
ou à distance.
▪ Engagement de réversibilité : code, contenus et données remis au CRN à la fin de la mission.
- Contenu attendu de la proposition
▪ Note de compréhension et architecture technique proposée.
▪ Solutions retenues pour le lecteur vidéo, le paiement des offrandes et l’hébergement, avec
preuve d’accessibilité au Gabon.
▪ Planning conforme aux jalons de la section 7.
▪ Offre financière détaillée : réalisation, hébergement, services tiers, astreinte, exploitation
jusqu’au 31 mars 2027.
▪ Références et composition de l’équipe.

CRN-AXX-2026-P2 Convention CRN 2026 — Page de la Convention — TDR et cahier des charges
STRICTEMENT CONFIDENTIEL — Projet soumis à validation du Commanditaire Page 8 / 16
Partie 2 — Cahier des charges
- Architecture de l’information
## Section Contenu É1 É2 É3
Accueil Thème, dates, lieux, compte à rebours, appel à
l’action principal selon l’état
## ● ● ●
Programme Programme maître par jour et par plateforme,
horaires, lieux, orateurs
## ● ● ○
Orateurs et artistes Fiches avec photo, biographie validée, vidéo
d’invitation ; révélation programmée
## ● ● ○
Billetterie Grille tarifaire arrêtée, contenu de chaque pass,
règles d’accès par QR code, lien d’achat
## ● ● —
Académie des Sciences
## Divines
Trois classes, orateurs, horaires, Pass Intégral ;
offre à distance si arbitrée
## ● ● ○
Action sociale Appel aux dons, points de collecte, calendrier,
puis rapport d’impact
## ● ○ ●
Infos pratiques Lieux, accès, plans, horaires, parking, règles
d’accès
## ● ● —
Diaspora Suivre à distance, donner, Académie à distance,
session du 19 décembre
## ● ● ●
Direct Lecteur vidéo, grille des directs, rappel des
offrandes
## — ● —
Journal de la
## Convention
Vidéo quotidienne et galerie de photos validées — ● ●
Offrandes et dons Paiement mobile money et carte, affectation,
reçu
## ○ ● ●
Écosystème digital Film, lecture retenue, statut des interfaces,
calendrier, inscription
## — — ●
Replays et bilan Replays sélectionnés, bilan chiffré,
remerciements
## — — ●
FAQ Questions fréquentes, mises à jour selon l’état ● ● ●
Contact, mentions
légales, confidentialité
Contact, éditeur, politique de protection des
données
## ● ● ●
Légende : ● section active et mise en avant ; ○ section active, secondaire ; — section masquée. É1, É2, É3 : états 1, 2 et
## 3.


CRN-AXX-2026-P2 Convention CRN 2026 — Page de la Convention — TDR et cahier des charges
STRICTEMENT CONFIDENTIEL — Projet soumis à validation du Commanditaire Page 9 / 16
- Exigences fonctionnelles
12.1 Socle et navigation
Réf. Exigence Priorité Critère d’acceptation
F-CNV-001 Navigation adaptée au mobile, menu réduit,
accès à la billetterie en un geste depuis toute
page
MUST Billetterie accessible en un clic
depuis chaque section sur mobile
F-CNV-002 Basculement programmé entre les trois états,
activable aussi manuellement
MUST Bascule effective à la date
programmée, sans intervention
du prestataire
F-CNV-003 Compte à rebours jusqu’au 6 décembre SHOULD Affichage correct sur les
principaux navigateurs mobiles
F-CNV-004 Bandeau d’information prioritaire, publiable
en moins de 2 minutes par l’équipe
MUST Bandeau en ligne en moins de 2
minutes, testé en recette
F-CNV-005 Liens directs vers chaque section,
partageables par SMS et QR code
MUST Chaque section ouvre
directement depuis son lien
12.2 Programme, orateurs, Académie
Réf. Exigence Priorité Critère d’acceptation
F-CNV-010 Programme maître unique, saisi une seule
fois, affiché par jour et filtrable par
plateforme
MUST Une modification apparaît partout
sans double saisie (règle R5)
F-CNV-011 Vue « programme du jour » mise en avant
pendant l’état 2
MUST Le jour courant s’affiche
automatiquement
F-CNV-012 Fiches orateurs et artistes avec publication
programmée (révélation progressive)
MUST Fiche invisible avant sa date,
visible après
F-CNV-013 Présentation des trois classes de l’Académie
et lien vers le Pass correspondant
MUST Lien correct pour chaque classe
F-CNV-014 Export du programme en PDF imprimable COULD PDF lisible sur une page par jour
12.3 Billetterie et boutique
Réf. Exigence Priorité Critère d’acceptation
F-CNV-020 Grille tarifaire reprenant exactement la
section VI du document de référence, y
compris les Pass OR et DIAMANT une fois
arrêtés
MUST Conformité vérifiée ligne à ligne
F-CNV-021 Explication des règles d’accès : ticket
nominatif, QR code unique, aucun accès
verbal
MUST Texte validé par le
## Commanditaire
F-CNV-022 Redirection ou intégration vers la billetterie
transitoire, sans dépendance bloquante
MUST Achat test réussi depuis la Page
F-CNV-023 Indication « complet » par produit, mise à
jour par l’équipe
SHOULD Mention affichée en moins de 5
minutes

CRN-AXX-2026-P2 Convention CRN 2026 — Page de la Convention — TDR et cahier des charges
STRICTEMENT CONFIDENTIEL — Projet soumis à validation du Commanditaire Page 10 / 16
Réf. Exigence Priorité Critère d’acceptation
F-CNV-024 Présentation du pagne officiel et du tee-shirt
avec mode d’achat
SHOULD Lien ou point de vente indiqué
12.4 Direct, Journal, replays
Réf. Exigence Priorité Critère d’acceptation
F-CNV-030 Lecteur vidéo de direct hébergé sur un
domaine non bloqué au Gabon
MUST Lecture sans VPN depuis
Libreville, réseaux Airtel et Moov
F-CNV-031 Grille des directs selon la matrice de diffusion
arrêtée (ARB-CONV-08)
MUST Seules les plateformes autorisées
sont diffusées
F-CNV-032 Message d’attente et bascule automatique
vers le replay en cas de coupure
MUST Message affiché en moins de 30
secondes après coupure
F-CNV-033 Publication quotidienne du Journal de la
Convention et d’une galerie de photos
MUST Mise en ligne en moins de 10
minutes après réception du
fichier
F-CNV-034 Bibliothèque de replays sélectionnés, classés
par jour et par plateforme
MUST Replays en ligne au 28 décembre
F-CNV-035 Accès à distance payant aux classes de
l’Académie
COULD Selon arbitrage ARB-CONV-08 ;
sinon WON’T
F-CNV-036 Lecteur YouTube ou Facebook intégré comme
source principale
WON’T Exclu : ces services sont bloqués
au Gabon
12.5 Offrandes, dons et action sociale
Réf. Exigence Priorité Critère d’acceptation
F-CNV-040 Paiement des offrandes et dons par Airtel
Money, Moov Money et carte bancaire
MUST Transaction test réussie sur
chaque moyen
F-CNV-041 Choix de l’affectation : offrande de la
Convention, action sociale, autre affectation
arrêtée
MUST Affectation enregistrée et visible
dans l’export
F-CNV-042 Reçu électronique automatique SHOULD Reçu reçu par SMS ou e-mail
après paiement
F-CNV-043 Section action sociale : appel, points de
collecte, calendrier, puis rapport d’impact
MUST Contenus publiés selon le
calendrier du Volet 1
F-CNV-044 Collecte pour le Siège Mondial WON’T Exclu sauf décision contraire
## (ARB-ECO-06)
12.6 Écosystème digital et inscriptions
Réf. Exigence Priorité Critère d’acceptation
F-CNV-050 Section écosystème : film, lecture retenue,
statut de chaque interface par pastille (en
service, en aperçu, en chantier)
MUST Statuts conformes au point de
vérité du 2 décembre

CRN-AXX-2026-P2 Convention CRN 2026 — Page de la Convention — TDR et cahier des charges
STRICTEMENT CONFIDENTIEL — Projet soumis à validation du Commanditaire Page 11 / 16
Réf. Exigence Priorité Critère d’acceptation
F-CNV-051 Calendrier public exprimé par trimestre MUST Aucune date précise affichée
(règle P1 du Volet 2)
F-CNV-052 Formulaire d’inscription « premiers membres
» et « tenez-moi informé », sur le modèle de
l’Annexe A du Volet 2
MUST Champs, consentement et export
conformes
F-CNV-053 Accès aux interfaces en service depuis la
section
SHOULD Liens actifs vers les seules
interfaces réceptionnées
F-CNV-054 Publication de la section programmée le 13
décembre à 12h
MUST Section invisible avant, visible
après
## 12.7 Administration
Réf. Exigence Priorité Critère d’acceptation
F-CNV-060 Outil d’administration en français, utilisable
sans compétence technique
MUST Un administrateur formé publie
une fiche en moins de 10
minutes
F-CNV-061 Comptes nominatifs avec rôles : rédacteur,
validateur, administrateur
MUST Un rédacteur ne peut pas publier
sans validation
F-CNV-062 Circuit de validation avant publication, avec
historique des versions
MUST Historique consultable ; retour à
une version antérieure possible
F-CNV-063 Publication programmée de tout contenu MUST Contenu publié à l’heure prévue
- Exigences non fonctionnelles
Réf. Exigence Priorité Critère d’acceptation
## NF-CNV-
## 001
Aucune ressource chargée depuis un service
bloqué au Gabon (scripts, polices, lecteurs,
pixels publicitaires, intégrations de réseaux
sociaux)
MUST Audit des requêtes réseau :
aucune dépendance bloquée ; la
page s’affiche intégralement sans
## VPN
## NF-CNV-
## 002
Conception mobile en priorité ; compatibilité
avec les navigateurs des smartphones
Android d’entrée de gamme
MUST Tests sur au moins trois appareils
d’entrée de gamme
## NF-CNV-
## 003
Poids de la page d’accueil inférieur à 1,5 Mo ;
affichage du contenu principal en moins de 3
secondes en 4G
MUST Mesure en conditions réelles
depuis Libreville
## NF-CNV-
## 004
Images compressées et adaptées à la taille
de l’écran ; vidéo en qualité adaptative
MUST Vérification en recette
## NF-CNV-
## 005
Disponibilité de 99,5 % du 31 octobre au 31
mars, et de 99,9 % du 6 au 13 décembre
MUST Rapport de supervision
## NF-CNV-
## 006
Tenue de charge lors du pic attendu au
Nomad le 13 décembre et pendant les directs
MUST Test de charge validé au 2
décembre, sur un volume à
arrêter avec ARB-CONV-05

CRN-AXX-2026-P2 Convention CRN 2026 — Page de la Convention — TDR et cahier des charges
STRICTEMENT CONFIDENTIEL — Projet soumis à validation du Commanditaire Page 12 / 16
Réf. Exigence Priorité Critère d’acceptation
## NF-CNV-
## 007
Réseau de diffusion de contenu (CDN) pour
les fichiers statiques et la vidéo
SHOULD Configuration démontrée en
recette
## NF-CNV-
## 008
Accessibilité : contrastes suffisants, textes
alternatifs, navigation au clavier, sous-titres
des vidéos principales
SHOULD Contrôle sur les pages principales
## NF-CNV-
## 009
Référencement : titres, descriptions, aperçu
de partage, plan du site
SHOULD Aperçu correct au partage d’un
lien
## NF-CNV-
## 010
Version anglaise des sections diaspora et
infos pratiques
COULD Selon arbitrage ARB-PAGE-06
- Exigences de sécurité et de protection des données
Réf. Exigence Priorité Critère d’acceptation
## SEC-CNV-
## 001
HTTPS sur tout le site, certificat valide et
renouvelé automatiquement
MUST Aucune page accessible en HTTP
## SEC-CNV-
## 002
Double authentification pour tous les comptes
d’administration
MUST Connexion impossible sans
second facteur
## SEC-CNV-
## 003
Aucune donnée de paiement stockée par la
Page ; paiements délégués à un prestataire
de paiement agréé
MUST Revue de l’architecture
## SEC-CNV-
## 004
Protection des formulaires contre le spam et
les envois automatisés
MUST Test d’envois massifs bloqué
## SEC-CNV-
## 005
Sauvegarde quotidienne du site et de la base,
conservée 30 jours, restauration testée
MUST Restauration réussie en recette
## SEC-CNV-
## 006
Journalisation des connexions et des actions
d’administration
MUST Journal consultable
## SEC-CNV-
## 007
Accès à la base des inscrits limité aux
personnes désignées, par comptes nominatifs
MUST Liste des accès validée par le
Chef de Mission
## SEC-CNV-
## 008
Test de sécurité avant la mise en ligne du
formulaire et des offrandes
SHOULD Rapport de test ; périmètre à
arrêter (ARB-PAGE-05)
Données personnelles et consentement
▪ Consentement : case non pré-cochée, distincte de toute autre action, sur le modèle de
l’Annexe A du Volet 1 ; date, heure et texte du consentement enregistrés.
▪ Minimisation : seuls les champs de l’Annexe A du Volet 2 sont collectés ; aucune donnée de
santé ou de paiement.
▪ Information : politique de protection des données publiée, précisant le responsable, les
finalités, la durée de conservation et la procédure de retrait.
▪ Conformité : réglementation gabonaise applicable, notamment la loi n° 001/2011 relative à
la protection des données à caractère personnel, à vérifier par le conseil du CRN.
▪ Durée de conservation : à arrêter (ARB-PAGE-07) ; transfert vers le CRM de l’écosystème à
sa livraison.

CRN-AXX-2026-P2 Convention CRN 2026 — Page de la Convention — TDR et cahier des charges
STRICTEMENT CONFIDENTIEL — Projet soumis à validation du Commanditaire Page 13 / 16
- Exigences d’interopérabilité et intégrations
Réf. Exigence Priorité Critère d’acceptation
## INT-CNV-
## 001
Intégration de la billetterie transitoire par lien
ou module, sans que sa panne ne bloque la
## Page
MUST Page fonctionnelle billetterie
coupée
## INT-CNV-
## 002
Intégration d’un agrégateur de paiement
couvrant Airtel Money, Moov Money et carte
MUST Transactions tests réussies
## INT-CNV-
## 003
Lecteur vidéo : brique B5 du Socle si livrée et
réceptionnée, sinon service tiers accessible au
## Gabon
MUST Lecture sans VPN validée au 20
novembre
## INT-CNV-
## 004
Export intégral des inscriptions et
consentements en CSV, à la demande
MUST Export complet et lisible
## INT-CNV-
## 005
Mesure d’audience hébergée ou respectueuse
de la vie privée, non bloquée au Gabon
MUST Statistiques disponibles par
section et par pays
## INT-CNV-
## 006
Interface d’échange (API) avec la future base
## CRM
COULD Spécification fournie pour le
## Jalon 3
## INT-CNV-
## 007
Pixel publicitaire Meta ou TikTok WON’T Exclu : bloqué au Gabon et non
nécessaire
- Identité visuelle et contenus
▪ Conformité au GBIS v2.1, notamment aux gabarits web du Volume 4 : palette, typographies,
iconographie.
▪ La Convention relève de la Colonne 2 (CRN International) ; la parole propre de l’Évêque
Général est signalée comme telle (règle R1).
▪ Aucun visage généré par IA d’une personne réelle ; aucune image de personnalité publique
sans accord explicite (règles R3 et R4).
▪ Pastilles de statut de l’écosystème : verte « Disponible », dorée « Aperçu — bientôt disponible
», grise « En construction ».
▪ Tout contenu est validé avant publication selon le circuit du Volet 1 ; le prestataire ne publie
jamais de contenu de sa propre initiative.
- Hébergement, exploitation et support
## Volet Exigence
Hébergement Infrastructure dimensionnée pour les pics de trafic ; localisation et
fournisseur à préciser dans la proposition
Supervision Surveillance permanente avec alerte automatique au prestataire et au Chef
de Mission
Support hors
## Convention
Incident bloquant traité sous 4 heures ; incident mineur sous 2 jours ouvrés
Astreinte du 6 au 14
décembre
Interlocuteur joignable de 6h à 23h ; incident bloquant traité sous 30
minutes

CRN-AXX-2026-P2 Convention CRN 2026 — Page de la Convention — TDR et cahier des charges
STRICTEMENT CONFIDENTIEL — Projet soumis à validation du Commanditaire Page 14 / 16
## Volet Exigence
Mises à jour Correctifs de sécurité appliqués sous 72 heures
Fin de période Maintien en ligne jusqu’au 31 mars 2027, puis redirection vers le Portail
## 18. Recette
## Étape Contenu Date
Recette de la version
minimale
Navigation, programme, lien de billetterie, affichage
sans VPN
31 oct.
Recette de l’état 1
complet
Ensemble des sections, administration, publication
programmée
9 nov.
Recette de l’état 2 Direct sans VPN (Airtel et Moov), offrandes, bandeau,
bascule de secours
20 nov.
Recette générale Toutes exigences MUST ; test de charge ; sécurité ;
sauvegarde et restauration
2 déc.
Recette de l’état 3 Section écosystème, formulaire, publication
programmée
4 déc.

Chaque étape donne lieu à un procès-verbal signé par le Chef de Mission, avec réserves éventuelles.
La recette générale n’est prononcée que si toutes les exigences MUST sont satisfaites.
Les tests d’accessibilité sans VPN sont réalisés depuis Libreville, par l’équipe du CRN, sur au moins
deux opérateurs.
- Propriété, réversibilité et documentation
▪ Le nom de domaine et le sous-domaine sont enregistrés au nom du CRN.
▪ Le CRN est propriétaire des contenus, des données et du code spécifique développé pour la
## Page.
▪ Les accès d’administration de l’hébergement sont remis au CRN, sous la responsabilité de la
personne chargée de la sécurité des outils digitaux.
▪ Documentation remise : guide d’administration, architecture, procédures d’exploitation et de
restauration.
▪ Plan de réversibilité : export des contenus et des données vers le Portail et le CRM de
l’écosystème, sans dépendance au prestataire.

CRN-AXX-2026-P2 Convention CRN 2026 — Page de la Convention — TDR et cahier des charges
STRICTEMENT CONFIDENTIEL — Projet soumis à validation du Commanditaire Page 15 / 16
## Annexes
Annexe A — Points d’arbitrage
## N° Objet Échéance Statut
ARB-PAGE-01 Véhicule contractuel et choix du prestataire (avenant
au protocole LWS, bon de commande ou autre
prestataire)
27 oct. CRITIQUE
ARB-PAGE-02 Nom de domaine et sous-domaine de la Page 27 oct. CRITIQUE
ARB-PAGE-03 Contenus de la version minimale fournis au 27 octobre
(programme public maître, grille tarifaire, FAQ)
27 oct. CRITIQUE
ARB-PAGE-04 Service de diffusion vidéo, si la brique B5 n’est pas
livrée à temps
20 nov. Ouvert
ARB-PAGE-05 Périmètre du test de sécurité avant mise en ligne du
formulaire et des offrandes
9 nov. Ouvert
ARB-PAGE-06 Version anglaise des sections diaspora et infos
pratiques
9 nov. Ouvert
ARB-PAGE-07 Durée de conservation des données des inscrits 20 nov. Ouvert
ARB-PAGE-08 Agrégateur de paiement des offrandes et affectations
proposées
9 nov. Ouvert
Points  liés  aux  autres  volets  :  ARB-CONV-01  (billetterie  transitoire),  ARB-CONV-02  (Pass  OR  et
DIAMANT),  ARB-CONV-03  (consentement),  ARB-CONV-08  (matrice  de  diffusion),  ARB-ECO-04
(lecture de l’écosystème), ARB-ECO-06 (Siège Mondial).
Annexe B — Contenus à fournir par le CRN
## Contenu Fournisseur Échéance
Programme public maître et grille tarifaire Chef de Mission 27 oct.
Visuel clé et déclinaisons web J. Massala 28 oct.
Textes de l’accueil, de la billetterie, des infos
pratiques et de la FAQ
H. Creppy 27 oct.
Fiches des orateurs et artistes (photo,
biographie, vidéo)
Mme Lesnie, H. Creppy À partir du 2 nov.
Contenus de l’Académie et de l’action sociale Communication
événementielle
5 nov.
Plans d’accès des lieux Communication
événementielle
9 nov.
Film et contenus de la section écosystème Darwin, Chef de Mission 4 déc.
Politique de protection des données Conseil du CRN, H. Creppy 9 nov.

CRN-AXX-2026-P2 Convention CRN 2026 — Page de la Convention — TDR et cahier des charges
STRICTEMENT CONFIDENTIEL — Projet soumis à validation du Commanditaire Page 16 / 16
Annexe C — Liste de contrôle « accessible sans VPN »
## Contrôle Résultat
La page d’accueil s’affiche intégralement sur Airtel, sans VPN
## ☐
La page d’accueil s’affiche intégralement sur Moov, sans VPN
## ☐
Aucune requête vers facebook.com, fbcdn.net, youtube.com, ytimg.com,
instagram.com, tiktok.com
## ☐
Le direct se lit sans VPN sur les deux opérateurs
## ☐
Le paiement mobile money aboutit sans VPN
## ☐
Le lien de billetterie s’ouvre et l’achat aboutit sans VPN
## ☐
Le formulaire d’inscription s’envoie sans VPN
## ☐
