import type { CollectionConfig, GlobalConfig } from 'payload';

import { ROLES, reserveA, tout } from '../lib/acces';

export const Utilisateurs: CollectionConfig = {
  slug: 'utilisateurs',
  labels: { singular: 'Utilisateur', plural: 'Utilisateurs' },
  admin: { useAsTitle: 'email', defaultColumns: ['nomComplet', 'email', 'role'], group: 'Administration' },
  auth: {
    // Verrouillage après tentatives répétées (sécurité du back-office).
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    tokenExpiration: 8 * 60 * 60,
  },
  access: {
    read: reserveA(),
    create: reserveA(),
    update: ({ req, id }) => (req.user as { role?: string } | null)?.role === 'administrateur' || req.user?.id === id,
    delete: reserveA(),
  },
  fields: [
    { name: 'nomComplet', type: 'text', label: 'Nom complet', required: true },
    {
      name: 'role',
      type: 'select',
      options: [...ROLES],
      required: true,
      defaultValue: 'com_boutique',
      // Seul un administrateur attribue les rôles (un compte ne s'élève pas lui-même).
      access: { update: ({ req }) => (req.user as { role?: string } | null)?.role === 'administrateur' },
    },
  ],
};

export const Medias: CollectionConfig = {
  slug: 'medias',
  labels: { singular: 'Photo', plural: 'Photos' },
  admin: { group: 'Catalogue' },
  access: { read: tout, create: reserveA('catalogue'), update: reserveA('catalogue'), delete: reserveA('catalogue') },
  upload: {
    staticDir: process.env.MEDIA_DIR || 'media',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    imageSizes: [
      { name: 'carte', width: 480, height: 480, position: 'centre', formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'fiche', width: 960, height: 960, position: 'centre', formatOptions: { format: 'webp', options: { quality: 82 } } },
    ],
  },
  fields: [{ name: 'alt', type: 'text', label: 'Texte alternatif', required: true }],
};

export const Reglages: GlobalConfig = {
  slug: 'reglages',
  label: 'Réglages de la boutique',
  admin: { group: 'Administration' },
  access: { read: tout, update: reserveA() },
  fields: [
    { name: 'ventesOuvertes', type: 'checkbox', label: 'Ventes ouvertes', defaultValue: true },
    {
      type: 'row',
      fields: [
        { name: 'lieuRetrait', type: 'text', label: 'Lieu de retrait des articles et kits', admin: { description: 'Vide = « À annoncer ».' } },
        { name: 'horairesRetrait', type: 'text', label: 'Horaires de retrait', admin: { description: 'Vide = « À annoncer ».' } },
      ],
    },
    {
      name: 'consentement',
      type: 'group',
      label: 'Consentement « être recontacté »',
      fields: [
        {
          name: 'texte',
          type: 'textarea',
          defaultValue: 'J’accepte d’être recontacté par le CRN au sujet de ses activités (case facultative, indépendante de l’achat).',
        },
        { name: 'version', type: 'text', defaultValue: '2026-11-04' },
      ],
    },
    {
      name: 'legal',
      type: 'group',
      label: 'Textes légaux (fournis par le CRN)',
      admin: { description: 'Obligatoires avant la première vente réelle. Vides = « À fournir par le CRN ».' },
      fields: [
        { name: 'cgvVersion', type: 'text', label: 'Version des CGV' },
        { name: 'cgv', type: 'textarea', label: 'Conditions générales de vente' },
        { name: 'mentions', type: 'textarea', label: 'Mentions légales' },
        { name: 'confidentialite', type: 'textarea', label: 'Politique de confidentialité' },
      ],
    },
  ],
};
