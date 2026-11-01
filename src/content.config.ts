import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/*
  Schémas de contenu — forme alignée 1:1 avec le futur schéma Payload CMS (lot L3),
  pour que la migration vers l'outil d'administration ne demande pas de re-modélisation.
  Réf. docs/CONV-PAGE.md §12 (exigences fonctionnelles) et §Modèle de contenu du prompt maître.
  API Content Layer (Astro v6+) : chaque collection a un loader explicite.
*/

const settings = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/settings' }),
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
  loader: glob({ pattern: '**/*.json', base: './src/content/venues' }),
  schema: z.object({
    nom: z.string(),
    adresse: z.string(),
    lienCarte: z.string().url().optional(),
  }),
});

// Un document "program" par jour ; les séances sont la source unique affichée partout (règle R5).
const program = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/program' }),
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

const speakers = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/speakers' }),
  schema: z.object({
    nom: z.string(),
    categorie: z.enum(['hote', 'international', 'national', 'prophetique', 'plateforme']),
    bio: z.string().optional(),
    photo: z.string().optional(), // chemin public ; absent => cadre neutre
    videoInvitation: z.string().optional(),
    datePublication: z.string().optional(), // ISO ; absent/future => fiche masquée (révélation progressive)
  }),
});

const artists = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/artists' }),
  schema: z.object({
    nom: z.string(),
    photo: z.string().optional(),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
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
  loader: glob({ pattern: '**/*.json', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    reponse: z.string(),
    etats: z.array(z.enum(['campagne', 'evenement', 'prolongement'])).default(['campagne', 'evenement', 'prolongement']),
    ordre: z.number(),
  }),
});

// Annonces factuelles (État 1) ; distinctes du futur Journal de la Convention (État 2, L4).
const announcements = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/announcements' }),
  schema: z.object({
    titre: z.string(),
    texte: z.string(),
    date: z.string(), // AAAA-MM-JJ
    ordre: z.number(),
  }),
});

export const collections = { settings, venues, program, speakers, artists, products, faq, announcements };
