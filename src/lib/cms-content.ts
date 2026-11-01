/**
 * Source de contenu « back-office » pour les collections Astro (src/content.config.ts).
 *
 * Activée quand PAYLOAD_API_URL est présente dans l'environnement du processus (réglée dans hPanel
 * pour le build Hostinger) ; sinon le site lit src/content/** comme avant (développement, CI,
 * tests). Lecture uniquement au build : aucune requête du visiteur vers l'API (NF-CNV-001).
 *
 * Chaque chargeur renvoie exactement la forme des fichiers JSON d'origine, pour que les pages et
 * les schémas Zod restent inchangés :
 * - identifiants stables (slug des orateurs → /orateurs/<slug>, date du jour du programme) ;
 * - contenus désactivés dans l'admin (« actif » décoché) exclus ;
 * - dates rendues dans le format d'origine, en heure de Libreville (UTC+1, sans heure d'été).
 *
 * Échec de lecture ou back-office pas encore initialisé : le build échoue volontairement, plutôt
 * que de publier un site vide (Hostinger garde alors la version en ligne).
 */

const API_URL = process.env.PAYLOAD_API_URL?.replace(/\/$/, '');

export const useCms = Boolean(API_URL);

type Obj = Record<string, unknown>;
type Doc = Obj & { id: number | string };
type Entry = Obj & { id: string };

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`Back-office : lecture de ${path} impossible (HTTP ${res.status})`);
  return (await res.json()) as T;
}

async function list(slug: string): Promise<Doc[]> {
  const { docs } = await get<{ docs: Doc[] }>(`/${slug}?pagination=false&depth=1`);
  return docs.filter((d) => d.actif !== false);
}

const LIBREVILLE_OFFSET_MS = 60 * 60 * 1000;

function shifted(iso: unknown): string | undefined {
  if (typeof iso !== 'string' || !iso) return undefined;
  return new Date(new Date(iso).getTime() + LIBREVILLE_OFFSET_MS).toISOString();
}

// "2026-12-07T23:00:00.000Z" -> "2026-12-08" (jour à Libreville)
const librevilleDay = (iso: unknown) => shifted(iso)?.slice(0, 10);

// "2026-12-05T23:00:00.000Z" -> "2026-12-06T00:00:00+01:00" (même instant, forme d'origine)
const librevilleDateTime = (iso: unknown) => {
  const s = shifted(iso);
  return s ? `${s.slice(0, 19)}+01:00` : undefined;
};

// Les champs vides arrivent à null depuis l'API ; les schémas (comme les JSON d'origine)
// attendent l'absence du champ.
function compact<T extends Obj>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== null && v !== undefined)) as T;
}

const obj = (v: unknown): Obj => (v && typeof v === 'object' ? (v as Obj) : {});

// Photos copiées dans le site au build (public/images/cms/, non versionné) et servies depuis le
// même domaine que les pages : le visiteur ne dépend jamais du domaine du back-office (une
// résolution DNS de moins en 3G, photos visibles même si l'admin est injoignable ou mal résolu).
const PHOTOS_DIR = 'public/images/cms';
const photoCache = new Map<string, Promise<string>>();

async function downloadPhoto(url: string): Promise<string> {
  const name = decodeURIComponent(new URL(url).pathname.split('/').pop() ?? '').replace(/[^\w.-]+/g, '-');
  const res = await fetch(url);
  if (!res.ok || !name) throw new Error(`Back-office : photo ${url} introuvable (HTTP ${res.status})`);
  const { mkdir, writeFile } = await import('node:fs/promises');
  await mkdir(PHOTOS_DIR, { recursive: true });
  await writeFile(`${PHOTOS_DIR}/${name}`, Buffer.from(await res.arrayBuffer()));
  return `/images/cms/${name}`;
}

async function photoUrl(photo: unknown): Promise<string | undefined> {
  const media = obj(photo);
  const card = obj(obj(media.sizes).card);
  const path = (typeof card.url === 'string' && card.url) || (typeof media.url === 'string' && media.url);
  if (!path) return undefined;
  const url = new URL(path, `${API_URL}/`).toString();
  if (!photoCache.has(url)) photoCache.set(url, downloadPhoto(url));
  return photoCache.get(url);
}

export async function loadSettings(): Promise<Entry[]> {
  const s = await get<Obj>('/globals/settings?depth=0');
  if (!s.contenuInitialImporte) {
    throw new Error('Back-office : contenu initial pas encore importé — publication annulée pour ne pas mettre en ligne un site vide.');
  }
  const bascules = obj(s.bascules);
  const bandeau = obj(s.bandeau);
  return [
    {
      id: 'etat-convention',
      etatActuel: s.etatActuel,
      forcageManuel: Boolean(s.forcageManuel),
      bascules: {
        campagneDebut: librevilleDateTime(bascules.campagneDebut),
        evenementDebut: librevilleDateTime(bascules.evenementDebut),
        prolongementDebut: librevilleDateTime(bascules.prolongementDebut),
        ecosystemeVisibleDes: librevilleDateTime(bascules.ecosystemeVisibleDes),
      },
      bandeau: compact({ actif: Boolean(bandeau.actif), texte: bandeau.texte ?? '', lien: bandeau.lien }),
    },
  ];
}

export async function loadVenues(): Promise<Entry[]> {
  return (await list('venues')).map((d) => compact({ id: String(d.id), nom: d.nom, adresse: d.adresse, lienCarte: d.lienCarte }));
}

export async function loadSpeakers(): Promise<Entry[]> {
  return Promise.all(
    (await list('speakers')).map(async (d) =>
      compact({
        id: String(d.slug ?? d.id),
        nom: d.nom,
        categorie: d.categorie,
        bio: d.bio,
        photo: await photoUrl(d.photo),
        videoInvitation: d.videoInvitation,
        datePublication: librevilleDay(d.datePublication),
      }),
    ),
  );
}

export async function loadArtists(): Promise<Entry[]> {
  return Promise.all(
    (await list('artists')).map(async (d) => compact({ id: String(d.id), nom: d.nom, photo: await photoUrl(d.photo) })),
  );
}

export async function loadProgram(): Promise<Entry[]> {
  return (await list('program-days')).map((d) => {
    const day = librevilleDay(d.date) ?? String(d.id);
    const sessions = Array.isArray(d.sessions) ? (d.sessions as Obj[]) : [];
    return {
      id: day,
      date: day,
      label: d.label,
      ordre: d.ordre,
      sessions: sessions.map((s) =>
        compact({
          heureDebut: s.heureDebut,
          heureFin: s.heureFin,
          titre: s.titre,
          lieu: s.lieu,
          // Orateur désactivé ou supprimé : retiré de la séance, comme s'il n'était pas annoncé.
          intervenants: (Array.isArray(s.intervenants) ? (s.intervenants as unknown[]) : [])
            .map(obj)
            .filter((sp) => sp.id !== undefined && sp.actif !== false)
            .map((sp) => String(sp.slug ?? sp.id)),
          noteIntervenant: s.noteIntervenant,
          diffusion: s.diffusion,
          visible: s.visible !== false,
        }),
      ),
    };
  });
}

export async function loadProducts(): Promise<Entry[]> {
  return (await list('products')).map((d) => ({
    ...compact({
      id: String(d.id),
      nom: d.nom,
      categorie: d.categorie,
      description: d.description,
      lienAchat: d.lienAchat,
      statut: d.statut,
      ordre: d.ordre,
    }),
    // Prix vide = « À annoncer » : null est la valeur attendue par le schéma, pas une absence.
    prixFCFA: d.prixFCFA ?? null,
  }));
}

export async function loadFaq(): Promise<Entry[]> {
  return (await list('faq')).map((d) =>
    compact({ id: String(d.id), question: d.question, reponse: d.reponse, etats: d.etats, ordre: d.ordre }),
  );
}

export async function loadAnnouncements(): Promise<Entry[]> {
  return (await list('announcements')).map((d) =>
    compact({
      id: String(d.id),
      titre: d.titre,
      texte: d.texte,
      date: librevilleDay(d.date),
      ordre: d.ordre,
      categorie: d.categorie,
      icone: d.icone,
      lienHref: d.lienHref,
      lienLabel: d.lienLabel,
    }),
  );
}
