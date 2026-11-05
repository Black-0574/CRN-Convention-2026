/*
  Visuels des plateformes (jeu PL du document d'habillage visuel), fournis par le Commanditaire le
  5 novembre 2026 et nommés par plateforme : lieux, objets, personnes de dos ou en silhouette. Les
  textes alternatifs décrivent l'image ; dans une carte dont le titre nomme déjà la plateforme,
  l'image est décorative (alt vide).

  DÉROGATION à la règle permanente n° 4 (« aucun visage généré par IA »), signalée par écrit puis
  choisie par le Commanditaire le 5 novembre 2026 (docs/conformite.md) : « Femme de Foi — Live »
  (PL-02) et « J'ai soif » (PL-03) montrent des visages générés. Elle ne vaut que pour ces deux
  visuels ; orateurs et artistes restent en photos réelles.

  Visuels des pass (jeu PS), fournis le 5 novembre 2026 : badge ou carte du pass mis en scène,
  sans personne. Ils ne valident aucun tarif : un pass « Prix à valider » reste hors vente.
*/
import type { ImageMetadata } from 'astro';
import academie from '../assets/images/plateformes/academie.webp';
import atmosphere from '../assets/images/plateformes/atmosphere-prophetique.webp';
import concertStandard from '../assets/images/plateformes/concert-standard.webp';
import concertVip from '../assets/images/plateformes/concert-vip.webp';
import culte from '../assets/images/plateformes/culte-ordination.webp';
import diner from '../assets/images/plateformes/diner-des-elites.webp';
import femmeDeFoi from '../assets/images/plateformes/femme-de-foi-live.webp';
import jaiSoif from '../assets/images/plateformes/jai-soif.webp';
import matin from '../assets/images/plateformes/matin-de-gloire.webp';
import plenieres from '../assets/images/plateformes/plenieres.webp';
import passDiamant from '../assets/images/pass/pass-diamant.webp';
import passGeneration from '../assets/images/pass/pass-generation.webp';
import passGenerationPlus from '../assets/images/pass/pass-generation-plus.webp';
import passIntegral from '../assets/images/pass/pass-convention-integral.webp';
import passOr from '../assets/images/pass/pass-or.webp';

export interface VisuelPlateforme {
  image: ImageMetadata;
  alt: string;
}

export const VISUELS = {
  academie: { image: academie, alt: 'Bible ouverte et carnets de notes sur un pupitre, lumière chaude' },
  femmeDeFoi: { image: femmeDeFoi, alt: 'Femmes en tenues et foulards de tête, mains levées, chantant derrière un pupitre fleuri' },
  jaiSoif: { image: jaiSoif, alt: 'Assemblée en louange, mains levées, sous une pluie de lumière dorée' },
  diner: { image: diner, alt: 'Table de gala dressée en bleu nuit et or, à la lumière des bougies' },
  concertStandard: { image: concertStandard, alt: 'Foule de dos, mains levées, devant une scène de concert illuminée' },
  concertVip: { image: concertVip, alt: 'Fauteuils en velours bleu nuit en bord de scène, espace VIP' },
  culte: { image: culte, alt: 'Autel drapé de blanc avec une fiole d’huile d’onction' },
  plenieres: { image: plenieres, alt: 'Salle aux premiers rangs réservés par un ruban doré, face à la scène' },
  matin: { image: matin, alt: 'Fidèles de dos en prière face au lever du soleil sur la mer' },
  atmosphere: { image: atmosphere, alt: 'Pupitre sur une scène baignée de brume et de lumière' },
} satisfies Record<string, VisuelPlateforme>;

export const VISUELS_PASS = {
  integral: { image: passIntegral, alt: 'Badge « Pass Convention Intégral » bleu nuit et or, avec QR code, au bout d’un cordon, sur du velours' },
  generation: { image: passGeneration, alt: 'Badge « Pass Génération (18 – 28 ans) » bleu nuit et or, posé sur un bureau près d’un carnet et d’un stylo' },
  generationPlus: { image: passGenerationPlus, alt: 'Badge « Pass Génération Plus » bleu nuit et or, à côté d’un tee-shirt plié et d’un sac en tissu' },
  or: { image: passOr, alt: 'Carte dorée « Pass Partenaire Or » dans un écrin de velours bleu nuit' },
  diamant: { image: passDiamant, alt: 'Carte « Pass Grand Partenaire Diamant » ornée de cristaux, dans un écrin de velours bleu nuit' },
} satisfies Record<string, VisuelPlateforme>;

/** Pass et tickets de la boutique (slug du produit) → visuel du pass ou de la plateforme. */
const PAR_PRODUIT: Record<string, VisuelPlateforme> = {
  'academie-une-classe': VISUELS.academie,
  'pass-academie-integral': VISUELS.academie,
  'femme-de-foi-live': VISUELS.femmeDeFoi,
  'jai-soif': VISUELS.jaiSoif,
  'diner-des-elites': VISUELS.diner,
  'concert-standard': VISUELS.concertStandard,
  'concert-vip': VISUELS.concertVip,
  'pass-convention-integral': VISUELS_PASS.integral,
  'pass-generation': VISUELS_PASS.generation,
  'pass-generation-plus': VISUELS_PASS.generationPlus,
  'pass-or': VISUELS_PASS.or,
  'pass-diamant': VISUELS_PASS.diamant,
};

/** Visuel d'un pass ou d'un ticket de la boutique sans photo propre (articles : aucun). */
export function visuelProduit(slug: string): VisuelPlateforme | undefined {
  return PAR_PRODUIT[slug];
}

/** Séances du programme (début du titre) → visuel de la plateforme. */
const PAR_SEANCE: [RegExp, VisuelPlateforme][] = [
  [/^Matin de gloire/, VISUELS.matin],
  [/^Académie/, VISUELS.academie],
  [/^(Atmosphère prophétique|Pastorale)/, VISUELS.atmosphere],
  [/^Plénière/, VISUELS.plenieres],
  [/^(Culte unique|Cérémonie d’ordination)/, VISUELS.culte],
  [/^Concert pour la vie/, VISUELS.concertStandard],
  [/^Femme de Foi/, VISUELS.femmeDeFoi],
  [/^J’ai soif/, VISUELS.jaiSoif],
  [/^Dîner des Élites/, VISUELS.diner],
];

export function visuelSeance(titre: string): VisuelPlateforme | undefined {
  return PAR_SEANCE.find(([motif]) => motif.test(titre))?.[1];
}
