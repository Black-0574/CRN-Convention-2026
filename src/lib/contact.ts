/**
 * Coordonnées de la hotline du CRN — source unique pour tout le site (barre du haut, page
 * Contact). Le même numéro figure côté back-office dans les réponses de NASTY
 * (backend/src/lib/nasty.ts, backend/src/app/(payload)/api/chat/route.ts).
 *
 * WhatsApp : simple lien de sortie (wa.me ouvre l'application), aucun script ni ressource
 * WhatsApp chargé par le site (NF-CNV-001).
 */
export const hotline = {
  affichage: '+241 62 70 51 83',
  tel: 'tel:+24162705183',
  whatsapp: 'https://wa.me/24162705183',
};

/** Contact de la Boutique de la Convention (barre de la boutique), 26 novembre 2026. */
export const contactBoutique = {
  email: 'boutique@crn-convention2026.events',
  telAffichage: '074 08 61 73',
  tel: 'tel:+24174086173',
};
