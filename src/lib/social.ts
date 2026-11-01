import type { IconName } from '../components/shared/Icon.astro';

export interface ReseauSocial {
  name: Extract<IconName, 'facebook' | 'youtube' | 'tiktok' | 'instagram' | 'linkedin' | 'x'>;
  label: string;
  href: string;
}

// Simples liens de sortie (jamais d'intégration/widget/SDK tiers — conforme NF-CNV-001, voir
// docs/conformite.md) vers les comptes officiels CRN International, fournis par le Commanditaire.
export const reseauxSociaux: ReseauSocial[] = [
  { name: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61594544199253' },
  { name: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@ChristR%C3%A9v%C3%A9l%C3%A9AuxNationsInternat' },
  { name: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@crn_international?lang=fr' },
  { name: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/crn_international/' },
  { name: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/crn-international-%E2%80%93-christ-r%C3%A9v%C3%A9l%C3%A9-aux-nations-248b84439/' },
  { name: 'x', label: 'X', href: 'https://x.com/CRNInternation' },
];
