/**
 * Rôles nominatifs du back-office (prompt maître, « Back-office ») : chaque compte est personnel et
 * porte un seul rôle. La double authentification est assurée devant /admin (Cloudflare Access au
 * Palier 1, TOTP natif au Palier 2).
 */
import type { Access, PayloadRequest } from 'payload';

export const ROLES = [
  { label: 'Administrateur', value: 'administrateur' },
  { label: 'Gestionnaire de catalogue', value: 'catalogue' },
  { label: 'COM Boutique (retraits et contrôle d’accès)', value: 'com_boutique' },
  { label: 'Comptabilité', value: 'comptabilite' },
] as const;

export type Role = (typeof ROLES)[number]['value'];

export const roleDe = (req: Pick<PayloadRequest, 'user'>): Role | undefined =>
  (req.user as { role?: Role } | null | undefined)?.role;

/** Accès réservé à certains rôles (l'administrateur a toujours accès). */
export const reserveA =
  (...roles: Role[]): Access =>
  ({ req }) => {
    const role = roleDe(req);
    return role === 'administrateur' || (role !== undefined && roles.includes(role));
  };

export const connecte: Access = ({ req }) => Boolean(req.user);
export const personne: Access = () => false;
export const tout: Access = () => true;
