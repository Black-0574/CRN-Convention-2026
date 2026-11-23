/*
  Photos par défaut des articles officiels (AT-01 à AT-03 du document d'habillage visuel ; polo,
  huile d'onction, pins, casquette), fournies par le Commanditaire le 5 novembre 2026, puis
  tee-shirts des gammes 1 à 4 (23 novembre 2026) : utilisées seulement si le back-office n'a
  aucune photo du produit. Ce sont des maquettes du marquage, pas des prises de vue du produit fini : la fiche
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
import teeShirtGamme1Marron from '../assets/images/articles/tee-shirt-gamme-1-marron.webp';
import teeShirtGamme1Noir from '../assets/images/articles/tee-shirt-gamme-1-noir.webp';
import teeShirtGamme1Blanc from '../assets/images/articles/tee-shirt-gamme-1-blanc.webp';
import teeShirtGamme1BlancFace from '../assets/images/articles/tee-shirt-gamme-1-blanc-face.webp';
import teeShirtGamme1MarronFace from '../assets/images/articles/tee-shirt-gamme-1-marron-face.webp';
import teeShirtGamme1NoirFace from '../assets/images/articles/tee-shirt-gamme-1-noir-face.webp';
import teeShirtGamme2Noir from '../assets/images/articles/tee-shirt-gamme-2-noir.webp';
import teeShirtGamme2Vert from '../assets/images/articles/tee-shirt-gamme-2-vert.webp';
import teeShirtGamme2BleuNuit from '../assets/images/articles/tee-shirt-gamme-2-bleu-nuit.webp';
import teeShirtGamme3BleuNuit from '../assets/images/articles/tee-shirt-gamme-3-bleu-nuit.webp';
import teeShirtGamme3Noir from '../assets/images/articles/tee-shirt-gamme-3-noir.webp';
import teeShirtGamme3Bordeaux from '../assets/images/articles/tee-shirt-gamme-3-bordeaux.webp';
import teeShirtGamme3Blanc from '../assets/images/articles/tee-shirt-gamme-3-blanc.webp';
import teeShirtGamme4Blanc from '../assets/images/articles/tee-shirt-gamme-4-blanc.webp';
import teeShirtGamme4BleuNuit from '../assets/images/articles/tee-shirt-gamme-4-bleu-nuit.webp';
import teeShirtGamme4Bordeaux from '../assets/images/articles/tee-shirt-gamme-4-bordeaux.webp';
import teeShirtGamme4Rose from '../assets/images/articles/tee-shirt-gamme-4-rose.webp';
import teeShirtGamme4Noir from '../assets/images/articles/tee-shirt-gamme-4-noir.webp';
import teeShirtGamme4Vert from '../assets/images/articles/tee-shirt-gamme-4-vert.webp';

export const MENTION_MAQUETTE = 'Visuel non contractuel';

/** `carte` : recadrage pour les cartes et miniatures quand la photo (face et dos) est en paysage. */
const PAR_PRODUIT: Record<string, { image: ImageMetadata; carte?: ImageMetadata; alt: string }[]> = {
  'tee-shirt-officiel': [
    { image: teeShirtFaceDos, alt: 'Tee-shirt officiel bleu nuit, face et dos : logo CRN et emblème « CRN Convention 2026 — Du Trône à l’Autel, de l’Autel à la Cité »' },
    { image: teeShirtPorte, alt: 'Tee-shirt officiel porté, cadré du cou à la taille, marquage CRN Convention 2026 sur la poitrine' },
  ],
  // Tee-shirts officiels, gammes 1 à 4 (fournis par le Commanditaire le 23 novembre 2026) : une
  // maquette par couleur proposée.
  'tee-shirt-officiel-gamme-1': [
    { image: teeShirtGamme1Marron, carte: teeShirtGamme1MarronFace, alt: 'Tee-shirt officiel gamme 1, marron, face et dos : « Trône, Autel, Cité — Une vie au Trône, un sacrifice à l’Autel, une lumière dans la Cité. La trajectoire du Royaume », petit logo au dos' },
    { image: teeShirtGamme1Noir, carte: teeShirtGamme1NoirFace, alt: 'Tee-shirt officiel gamme 1, noir, face et dos : « Trône, Autel, Cité — Une vie au Trône, un sacrifice à l’Autel, une lumière dans la Cité. La trajectoire du Royaume », petit logo au dos' },
    { image: teeShirtGamme1Blanc, carte: teeShirtGamme1BlancFace, alt: 'Tee-shirt officiel gamme 1, blanc, face et dos : « Trône, Autel, Cité — Une vie au Trône, un sacrifice à l’Autel, une lumière dans la Cité. La trajectoire du Royaume », petit logo au dos' },
  ],
  'tee-shirt-officiel-gamme-2': [
    { image: teeShirtGamme2Noir, alt: 'Tee-shirt officiel gamme 2, noir, « Rencontre, Offrande, Influence » et trône couronné, « Rencontre au Trône. Mourir à l’Autel. Régner dans la Cité. », logo « Trône, Autel, Cité » sur la manche' },
    { image: teeShirtGamme2Vert, alt: 'Tee-shirt officiel gamme 2, vert bouteille, « Rencontre, Offrande, Influence » et trône couronné, « Rencontre au Trône. Mourir à l’Autel. Régner dans la Cité. », logo « Trône, Autel, Cité » sur la manche' },
    { image: teeShirtGamme2BleuNuit, alt: 'Tee-shirt officiel gamme 2, bleu nuit, « Rencontre, Offrande, Influence » et trône couronné, « Rencontre au Trône. Mourir à l’Autel. Régner dans la Cité. », logo « Trône, Autel, Cité » sur la manche' },
  ],
  'tee-shirt-officiel-gamme-3': [
    { image: teeShirtGamme3BleuNuit, alt: 'Tee-shirt officiel gamme 3, bleu nuit, « Engendré au Trône, façonné à l’Autel, révélé à la Cité. » avec trône, autel et cité, logo « Trône, Autel, Cité » sur la manche' },
    { image: teeShirtGamme3Noir, alt: 'Tee-shirt officiel gamme 3, noir, « Engendré au Trône, façonné à l’Autel, révélé à la Cité. » avec trône, autel et cité, logo « Trône, Autel, Cité » sur la manche' },
    { image: teeShirtGamme3Bordeaux, alt: 'Tee-shirt officiel gamme 3, bordeaux, « Engendré au Trône, façonné à l’Autel, révélé à la Cité. » avec trône, autel et cité, logo « Trône, Autel, Cité » sur la manche' },
    { image: teeShirtGamme3Blanc, alt: 'Tee-shirt officiel gamme 3, blanc, « Engendré au Trône, façonné à l’Autel, révélé à la Cité. » avec trône, autel et cité, logo « Trône, Autel, Cité » sur la manche' },
  ],
  'tee-shirt-officiel-gamme-4': [
    { image: teeShirtGamme4Blanc, alt: 'Tee-shirt officiel gamme 4, blanc, « Trône, Autel, Cité » avec couronne et trône, « Le chemin du Royaume », logo sur la manche' },
    { image: teeShirtGamme4BleuNuit, alt: 'Tee-shirt officiel gamme 4, bleu nuit, « Trône, Autel, Cité » avec couronne et trône, « Le chemin du Royaume », logo sur la manche' },
    { image: teeShirtGamme4Bordeaux, alt: 'Tee-shirt officiel gamme 4, bordeaux, « Trône, Autel, Cité » avec couronne et trône, « Le chemin du Royaume », logo sur la manche' },
    { image: teeShirtGamme4Rose, alt: 'Tee-shirt officiel gamme 4, rose fuchsia, « Trône, Autel, Cité » avec couronne et trône, « Le chemin du Royaume », logo sur la manche' },
    { image: teeShirtGamme4Noir, alt: 'Tee-shirt officiel gamme 4, noir, « Trône, Autel, Cité » avec couronne et trône, « Le chemin du Royaume », logo sur la manche' },
    { image: teeShirtGamme4Vert, alt: 'Tee-shirt officiel gamme 4, vert bouteille, « Trône, Autel, Cité » avec couronne et trône, « Le chemin du Royaume », logo sur la manche' },
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
    (PAR_PRODUIT[slug] ?? []).map(async ({ image, carte: recadrage, alt }) => {
      const [carte, fiche] = await Promise.all([
        getImage({ src: recadrage ?? image, width: 480, format: 'webp' }),
        getImage({ src: image, width: 960, format: 'webp' }),
      ]);
      return { url: fiche!.src, carte: carte!.src, fiche: fiche!.src, alt, mention: MENTION_MAQUETTE };
    }),
  );
}
