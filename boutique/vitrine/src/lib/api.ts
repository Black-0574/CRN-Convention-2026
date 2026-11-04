/**
 * Lecture de l'API de la boutique pendant le rendu serveur. Les types reprennent la vue publique
 * renvoyée par l'API (boutique/api/src/lib/catalogue.ts).
 */
export interface VueVariante {
  id: number;
  libelle: string;
  disponible: number | null;
}

export interface VueProduit {
  id: number;
  slug: string;
  nom: string;
  type: 'pass' | 'ticket' | 'physique' | 'numerique';
  categorie: string | null;
  resume: string | null;
  description: string | null;
  badge: string | null;
  photos: { url: string; carte: string; fiche: string; alt: string }[];
  prixXAF: number | null;
  paliers: { prixXAF: number; debut: string; fin: string }[];
  prochaineBascule: string | null;
  nominatif: boolean;
  ageMin: number | null;
  ageMax: number | null;
  variantes: VueVariante[];
  plateformes: { nom: string; debut: string | null; fin: string | null; lieu: string | null }[];
  kit: { nom: string; quantite: number; tailles: string[] }[];
  indisponible: string | null;
  apercu: boolean;
  ordre: number;
}

export interface Reglages {
  ventesOuvertes: boolean;
  lieuRetrait: string | null;
  horairesRetrait: string | null;
  consentement: { texte?: string | null; version?: string | null };
  legal: { cgvVersion: string | null; cgv: string | null; mentions: string | null; confidentialite: string | null };
  demo: boolean;
}

export const API_URL = (import.meta.env.API_URL ?? process.env.API_URL ?? 'http://localhost:3101').replace(/\/$/, '');
export const SITE_CONVENTION_URL = (import.meta.env.SITE_CONVENTION_URL ?? process.env.SITE_CONVENTION_URL ?? 'https://crn-convention2026.events').replace(/\/$/, '');

async function lire<T>(chemin: string): Promise<T> {
  const res = await fetch(`${API_URL}${chemin}`, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`API ${chemin} : HTTP ${res.status}`);
  return (await res.json()) as T;
}

export const catalogue = () => lire<{ demo: boolean; produits: VueProduit[] }>('/api/boutique/catalogue');
export const reglages = () => lire<Reglages>('/api/boutique/reglages');

export async function produit(slug: string): Promise<{ demo: boolean; produit: VueProduit } | null> {
  const res = await fetch(`${API_URL}/api/boutique/produits/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API produit : HTTP ${res.status}`);
  return res.json();
}

/** URL d'une image servie par l'API (chemin relatif « /api/medias/file/... », relayé /api). */
export const image = (url: string) => url;
