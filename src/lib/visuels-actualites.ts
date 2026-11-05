/*
  Vignettes des actualités par rubrique (A-12 accueil, N-02 /actualites du document d'habillage
  visuel), fournies par le Commanditaire le 5 novembre 2026 : objets et lieux, aucun visage
  identifiable. La rubrique vient du back-office (texte libre) ou de src/lib/announcements.ts ;
  rubrique sans vignette → carte sans image. Image décorative : le titre de la carte suffit.
*/
import type { ImageMetadata } from 'astro';
import actionSociale from '../assets/images/actualites/action-sociale.webp';
import billetterie from '../assets/images/actualites/billetterie.webp';
import orateurs from '../assets/images/actualites/orateurs.webp';
import programme from '../assets/images/actualites/programme.webp';

const PAR_RUBRIQUE: Record<string, ImageMetadata> = {
  billetterie,
  boutique: billetterie,
  orateurs,
  'action sociale': actionSociale,
  programme,
};

const cle = (rubrique: string) => rubrique.normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase();

export const visuelActualite = (rubrique: string): ImageMetadata | undefined => PAR_RUBRIQUE[cle(rubrique)];
