/**
 * Requêtes SQL directes, réservées aux opérations qui doivent être atomiques (réservation de
 * stock et de quota, changement d'état d'une commande, consommation d'un droit au scan) : une
 * seule instruction conditionnelle, sans fenêtre de concurrence.
 */
import { sql } from '@payloadcms/db-postgres';
import type { Payload } from 'payload';

export { sql };

type Requete = ReturnType<typeof sql>;

export async function lignes<T = Record<string, unknown>>(payload: Payload, requete: Requete): Promise<T[]> {
  const resultat = await (payload.db as unknown as { drizzle: { execute: (q: Requete) => Promise<{ rows: T[] }> } }).drizzle.execute(requete);
  return resultat.rows;
}

/** Exécute une instruction conditionnelle ; `true` si au moins une ligne a été modifiée. */
export async function modifie(payload: Payload, requete: Requete): Promise<boolean> {
  return (await lignes(payload, requete)).length > 0;
}

export const nombre = (v: unknown): number => (v === null || v === undefined ? 0 : Number(v));
