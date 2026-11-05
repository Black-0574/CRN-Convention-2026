/*
  Photos par défaut des articles officiels (AT-01 à AT-03 du document d'habillage visuel ; polo,
  huile d'onction, pins, casquette), fournies par le Commanditaire le 5 novembre 2026 : utilisées
  seulement si le back-office n'a aucune photo du produit. Ce sont des maquettes du marquage, pas des prises de vue du produit fini : la fiche
  porte la mention « Visuel non contractuel » (exigence AT-01). Tee-shirt porté cadré du cou à la
  taille, aucun visage.
*/
import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import casquette from '../assets/images/articles/casquette.webp';
import huileDOnction from '../assets/images/articles/huile-d-onction.webp';
import pagne from '../assets/images/articles/pagne.webp';
import pins from '../assets/images/articles/pins.webp';
import polo from '../assets/images/articles/polo.webp';
import teeShirtFaceDos from '../assets/images/articles/tee-shirt-face-dos.webp';
import teeShirtPorte from '../assets/images/articles/tee-shirt-porte.webp';

export const MENTION_MAQUETTE = 'Visuel non contractuel';

const PAR_PRODUIT: Record<string, { image: ImageMetadata; alt: string }[]> = {
  'tee-shirt-officiel': [
    { image: teeShirtFaceDos, alt: 'Tee-shirt officiel bleu nuit, face et dos : logo CRN et emblème « CRN Convention 2026 — Du Trône à l’Autel, de l’Autel à la Cité »' },
    { image: teeShirtPorte, alt: 'Tee-shirt officiel porté, cadré du cou à la taille, marquage CRN Convention 2026 sur la poitrine' },
  ],
  'polo-officiel': [
    { image: polo, alt: 'Polo officiel bleu nuit à bandes or, face et dos : logo CRN et emblème « CRN Convention 2026 — Du Trône à l’Autel, de l’Autel à la Cité »' },
  ],
  // Pagne et huile : recadrés pour retirer les mentions produit non validées (composition,
  // contenance…), à la demande du Commanditaire.
  'pagne-officiel': [{ image: pagne, alt: 'Pagne officiel plié, bandes bleu nuit et blanches à motifs géométriques' }],
  'huile-d-onction': [{ image: huileDOnction, alt: 'Flacon d’huile d’onction à l’étiquette CRN, coupelle d’huile et rameau d’olivier' }],
  'pins-officiel': [{ image: pins, alt: 'Deux pins dorés à l’emblème CRN, fond rouge et fond noir, dans un écrin bleu nuit' }],
  'casquette-officielle': [
    { image: casquette, alt: 'Casquette officielle bleu nuit brodée « CRN Convention 2026 — Du Trône à l’Autel, de l’Autel à la Cité », écusson CRN sur le côté' },
  ],
};

/** Photos au format de l'API (carte 480 px, fiche 960 px), ou liste vide. */
export async function photosArticle(slug: string) {
  return Promise.all(
    (PAR_PRODUIT[slug] ?? []).map(async ({ image, alt }) => {
      const [carte, fiche] = await Promise.all([480, 960].map((width) => getImage({ src: image, width, format: 'webp' })));
      return { url: fiche!.src, carte: carte!.src, fiche: fiche!.src, alt, mention: MENTION_MAQUETTE };
    }),
  );
}
