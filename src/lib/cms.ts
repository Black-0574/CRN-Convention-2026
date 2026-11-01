/**
 * Adaptateur de lecture vers l'API Payload (back-office, lot L3) — appelé uniquement au moment du
 * build (process Node), jamais depuis le navigateur du visiteur (conforme NF-CNV-001). Remplace
 * les `getCollection(...)` d'Astro Content Collections tout en gardant une forme de retour proche
 * (`{ id, data }[]`) pour limiter les changements dans les pages qui les consomment.
 *
 * `PAYLOAD_API_URL` (ex. http://localhost:3001/api en dev, interne au réseau Docker en
 * production) doit être défini dans l'environnement du build — voir backend/README.md.
 */

const API_URL = import.meta.env.PAYLOAD_API_URL ?? 'http://localhost:3001/api';

export interface CmsEntry<T> {
  id: string;
  data: T;
}

interface PayloadListResponse<T> {
  docs: (T & { id: string | number })[];
}

async function fetchCollection<T>(slug: string, params: Record<string, string> = {}): Promise<CmsEntry<T>[]> {
  const query = new URLSearchParams({ limit: '0', depth: '2', ...params });
  const res = await fetch(`${API_URL}/${slug}?${query.toString()}`);
  if (!res.ok) {
    throw new Error(`CMS: échec de lecture de la collection "${slug}" (${res.status})`);
  }
  const json = (await res.json()) as PayloadListResponse<T>;
  return json.docs.map(({ id, ...data }) => ({ id: String(id), data: data as T }));
}

async function fetchGlobal<T>(slug: string): Promise<T> {
  const res = await fetch(`${API_URL}/globals/${slug}?depth=1`);
  if (!res.ok) {
    throw new Error(`CMS: échec de lecture du global "${slug}" (${res.status})`);
  }
  return (await res.json()) as T;
}

// Un export par collection/global, nommé comme l'ancien appel `getCollection('xxx')` pour que le
// rebranchement des pages reste mécanique (voir plan, étape 3).
export const getVenues = <T>() => fetchCollection<T>('venues');
export const getArtists = <T>() => fetchCollection<T>('artists');
export const getFaq = <T>() => fetchCollection<T>('faq');
export const getProducts = <T>() => fetchCollection<T>('products');
export const getAnnouncements = <T>() => fetchCollection<T>('announcements');
export const getSpeakers = <T>() => fetchCollection<T>('speakers');
export const getProgramDays = <T>() => fetchCollection<T>('program-days');
export const getSettings = <T>() => fetchGlobal<T>('settings');
