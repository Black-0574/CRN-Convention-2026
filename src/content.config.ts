import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

import * as cms from './lib/cms-content';

/*
  Schémas de contenu — forme alignée 1:1 avec le schéma Payload CMS du back-office (lot L3).
  Réf. docs/CONV-PAGE.md §12 (exigences fonctionnelles) et §Modèle de contenu du prompt maître.
  Source : le back-office quand PAYLOAD_API_URL est définie dans l'environnement (build de
  production, voir src/lib/cms-content.ts), sinon les fichiers de src/content (développement,
  CI, tests). Les pages ne voient aucune différence.
*/

const source = (dossier: string, chargerDepuisCms: () => Promise<{ id: string }[]>) =>
  cms.useCms ? chargerDepuisCms : glob({ pattern: '**/*.json', base: `./src/content/${dossier}` });

const settings = defineCollection({
  loader: source('settings', cms.loadSettings),
  schema: z.object({
    etatActuel: z.enum(['campagne', 'evenement', 'prolongement']),
    forcageManuel: z.boolean().default(false),
    bascules: z.object({
      campagneDebut: z.string(), // ISO, Africa/Libreville
      evenementDebut: z.string(),
      prolongementDebut: z.string(),
      ecosystemeVisibleDes: z.string(),
    }),
    bandeau: z.object({
      actif: z.boolean(),
      texte: z.string(),
      lien: z.string().optional(),
    }),
  }),
});

const venues = defineCollection({
  loader: source('venues', cms.loadVenues),
  schema: z.object({
    nom: z.string(),
    adresse: z.string(),
    lienCarte: z.string().url().optional(),
  }),
});

// Un document "program" par jour ; les séances sont la source unique affichée partout (règle R5).
const program = defineCollection({
  loader: source('program', cms.loadProgram),
  schema: z.object({
    date: z.string(), // AAAA-MM-JJ, Africa/Libreville
    label: z.string(), // ex. "Lundi 7 décembre"
    ordre: z.number(),
    sessions: z.array(
      z.object({
        heureDebut: z.string(), // HH:mm
        heureFin: z.string(),
        titre: z.string(),
        lieu: z.string(),
        intervenants: z.array(z.string()).default([]), // slugs vers speakers
        noteIntervenant: z.string().optional(), // ex. "Orateur à annoncer" quand non arrêté
        diffusion: z.enum(['direct', 'extraits', 'differe', 'non_diffuse', 'a_arbitrer']),
        visible: z.boolean().default(true),
      }),
    ),
  }),
});

// Liens de sortie vers les comptes d'un orateur ou d'un artiste (aucun widget chargé, NF-CNV-001).
const reseauxSociaux = z
  .array(
    z.object({
      reseau: z.enum(['facebook', 'instagram', 'youtube', 'tiktok', 'linkedin', 'x', 'site']),
      url: z.string().url(),
    }),
  )
  .optional();

const speakers = defineCollection({
  loader: source('speakers', cms.loadSpeakers),
  schema: z.object({
    nom: z.string(),
    fonction: z.string().optional(), // titre affiché sous le nom sur la fiche
    categorie: z.enum(['hote', 'international', 'national', 'prophetique', 'plateforme']),
    ordre: z.number().optional(), // ordre d'affichage dans la catégorie (src/lib/orateurs.ts)
    bio: z.string().optional(),
    reseauxSociaux,
    photo: z.string().optional(), // chemin public ; absent => cadre neutre
    videoInvitation: z.string().optional(),
    datePublication: z.string().optional(), // ISO ; absent/future => fiche masquée (révélation progressive)
  }),
});

const artists = defineCollection({
  loader: source('artists', cms.loadArtists),
  // Même fiche que les orateurs (F-CNV-012), page /artistes/<identifiant>.
  schema: z.object({
    nom: z.string(),
    fonction: z.string().optional(),
    bio: z.string().optional(),
    reseauxSociaux,
    photo: z.string().optional(),
  }),
});

const products = defineCollection({
  loader: source('products', cms.loadProducts),
  schema: z.object({
    nom: z.string(),
    categorie: z.enum(['academie', 'plateforme', 'concert', 'boutique', 'pass']),
    prixFCFA: z.number().nullable(), // null => "À annoncer"
    description: z.string(),
    lienAchat: z.string().optional(),
    statut: z.enum(['disponible', 'complet', 'a_annoncer']),
    ordre: z.number(),
  }),
});

const faq = defineCollection({
  loader: source('faq', cms.loadFaq),
  schema: z.object({
    question: z.string(),
    reponse: z.string(),
    etats: z.array(z.enum(['campagne', 'evenement', 'prolongement'])).default(['campagne', 'evenement', 'prolongement']),
    ordre: z.number(),
  }),
});

// Annonces factuelles (État 1) ; distinctes du futur Journal de la Convention (État 2, L4).
const announcements = defineCollection({
  loader: source('announcements', cms.loadAnnouncements),
  schema: z.object({
    titre: z.string(),
    texte: z.string(),
    date: z.string(), // AAAA-MM-JJ
    ordre: z.number(),
    // Gérés dans le back-office ; absents des fichiers locaux (repli : src/lib/announcements.ts).
    categorie: z.string().optional(),
    icone: z.string().optional(),
    lienHref: z.string().optional(),
    lienLabel: z.string().optional(),
    // Article complet (page /actualites/<id>) et visuel servi depuis le site (11 novembre 2026) :
    // image entière en tête de l'article, vignette 16:9 sur les cartes.
    article: z.string().optional(),
    image: z.string().optional(),
    imageLargeur: z.number().optional(),
    imageHauteur: z.number().optional(),
    vignette: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

export const collections = { settings, venues, program, speakers, artists, products, faq, announcements };
