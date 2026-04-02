/** Source unique : prix, VSL, FAQ, formulations validables avec le client. */
export const offerConfig = {
  regularPrice: 67,
  launchPrice: 47,
  discountPercent: 30,
  guaranteeDays: 14,
  /** Affichage hero / trust : éviter d’attribuer une note produit non sourcée */
  ratingDisplay: '4.9/5',
  trustSocialProofLine: 'Méthode suivie par +100k abonnés sur YouTube',
  vslUrl: 'https://www.youtube.com/watch?v=Wa4Xu9uZMS0',
  vslYoutubeId: 'Wa4Xu9uZMS0',
  /** CTA secondaire : ancre ou URL de paiement */
  checkoutUrl: '#pricing' as string,
  workHours: 300,
  /** Deadline du compte à rebours (ISO 8601). Laissez vide pour +48h dynamique. */
  countdownTarget: '2026-04-09T23:59:59',
  /** Promesse qualifiée (objectif pédagogique, pas garantie de note) */
  promiseQualified:
    'Objectif : viser 15/20 en maths en révisant plus intelligemment (sans tourner en rond pendant des heures).',
  promiseShort: 'Comprends avant d’apprendre — méthode visuelle pour le lycée.',
  midCtaLine:
    'Plus de 300 h de conception pour condenser le programme lycée dans un parcours clair.',
} as const;

export const faqItems = [
  {
    q: "J'ai pas le temps, j'ai trop de devoirs.",
    a: "Justement : l'objectif est de te faire gagner du temps. Une vidéo courte peut remplacer des heures de révision 'dans le vide' quand tu comprends enfin la logique.",
  },
  {
    q: 'Je suis vraiment le pire de ma classe en maths.',
    a: "Le guide est pensé pour repartir du blocage : peu de jargon, des schémas, de la logique. Tu reconstruis le fil étape par étape.",
  },
  {
    q: 'Est-ce aligné sur le programme officiel ?',
    a: "Oui : le socle couvre le programme lycée et la préparation aux évaluations (DS, bac). La forme est réorganisée pour être plus efficace que l'enchaînement 'classique'.",
  },
  {
    q: "C'est un abonnement ?",
    a: "Non : paiement unique. Tu gardes l'accès au contenu du guide après achat (selon les conditions affichées au moment de l'achat — à ajuster côté CGV).",
  },
  {
    q: 'Et si ça ne me convient pas ?',
    a: `Tu as ${offerConfig.guaranteeDays} jours pour tester. Si le contenu ne te convient pas, remboursement selon les modalités indiquées sur la page de vente.`,
  },
] as const;

/** hqdefault est plus fiable que maxres (toujours servi par YouTube). */
export function getYouTubeThumbnailUrl(videoId: string, quality: 'maxres' | 'hq' = 'hq') {
  if (quality === 'maxres') {
    return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  }
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}
