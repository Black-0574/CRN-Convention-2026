/**
 * Panier côté navigateur (localStorage, avec repli en mémoire si le stockage est indisponible) :
 * simple commodité de saisie. Le serveur revérifie tout à la commande (prix du palier en vigueur,
 * stock, quotas) : rien de ce qui est stocké ici ne fait foi.
 */
export interface LignePanier {
  varianteId: number;
  slug: string;
  nom: string;
  variante: string;
  prixXAF: number;
  quantite: number;
  nominatif: boolean;
  ageMin: number | null;
  ageMax: number | null;
  /** Articles du kit dont la taille est à choisir par chaque titulaire. */
  kitTailles: { nom: string; tailles: string[] }[];
  photo: string | null;
}

const CLE = 'crn-boutique-panier-v1';
const EVENEMENT = 'crn:panier';
let memoire: LignePanier[] = [];

export function lirePanier(): LignePanier[] {
  try {
    const brut = localStorage.getItem(CLE);
    return brut ? (JSON.parse(brut) as LignePanier[]) : [];
  } catch {
    return memoire;
  }
}

function ecrire(lignes: LignePanier[]) {
  memoire = lignes;
  try {
    localStorage.setItem(CLE, JSON.stringify(lignes));
  } catch {
    /* stockage indisponible (navigation privée) : panier en mémoire pour cette page */
  }
  window.dispatchEvent(new CustomEvent(EVENEMENT, { detail: lignes }));
}

export function ajouter(ligne: LignePanier) {
  const lignes = lirePanier();
  const existante = lignes.find((l) => l.varianteId === ligne.varianteId);
  if (existante) existante.quantite = Math.min(20, existante.quantite + ligne.quantite);
  else lignes.push(ligne);
  ecrire(lignes);
}

export function changerQuantite(varianteId: number, quantite: number) {
  const lignes = lirePanier()
    .map((l) => (l.varianteId === varianteId ? { ...l, quantite: Math.max(0, Math.min(20, quantite)) } : l))
    .filter((l) => l.quantite > 0);
  ecrire(lignes);
}

export const vider = () => ecrire([]);

export const totalPanier = (lignes = lirePanier()) => lignes.reduce((s, l) => s + l.prixXAF * l.quantite, 0);
export const nombreArticles = (lignes = lirePanier()) => lignes.reduce((s, l) => s + l.quantite, 0);

export function surChangement(rappel: (lignes: LignePanier[]) => void) {
  window.addEventListener(EVENEMENT, (e) => rappel((e as CustomEvent<LignePanier[]>).detail));
  window.addEventListener('storage', (e) => e.key === CLE && rappel(lirePanier()));
}

export const ouvrirPanier = () => window.dispatchEvent(new CustomEvent('crn:ouvrir-panier'));
