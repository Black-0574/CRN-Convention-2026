/**
 * Origine du back-office qui sert l'API de la boutique. Lue au build et inscrite dans le code
 * client (panier, commande, suivi) : module sans dépendance serveur, importable des deux côtés.
 */
const BACK_OFFICE_PRODUCTION = 'https://admin.crn-convention2026.events';

export const API_BOUTIQUE = (import.meta.env.PUBLIC_BOUTIQUE_API_URL?.trim() || BACK_OFFICE_PRODUCTION).replace(/\/$/, '');
