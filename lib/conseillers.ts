import { getAlternates, getOpenGraph } from '@/lib/metadata';

// Pages de reservation personnelles des deux signataires de la prospection : Laurence Lazard
// (audit, formation, rendez-vous) et Michael Dupuis (agents, automatisation, devis). Chaque
// e-mail renvoie vers la page de celui qui le signe : le prospect retrouve le visage et la
// voix de la signature avant de choisir un creneau, comme sur MeilleurArtisan.
//
// Le contenu vit ici, la mise en page dans components/FunnelConseiller.tsx : une page de plus
// pour un troisieme signataire = une entree de plus, pas un fichier de 300 lignes copie.

export type ConseillerSlug = 'laura' | 'michael';

type Bloc = { titre: string; texte: string };

export type Conseiller = {
  slug: ConseillerSlug;
  chemin: string;
  prenom: string;
  nom: string;
  role: string;
  photo: string;
  photoAlt: string;
  citation: string;
  metaTitre: string;
  metaDescription: string;
  pastille: string;
  h1: string;
  lead: string;
  chips: string[];
  resultats: Bloc[];
  questions: { question: string; answer: string }[];
  whatsappTexte: string;
  rappelTitre: string;
  rappelTexte: string;
  rappelPoints: string[];
  rappelMessageAide: string;
  // Renvoi vers l'autre signataire, quand la demande releve plutot de lui.
  renvoi: { texte: string; vers: ConseillerSlug };
};

export const TEL_AFFICHE = '021 900 04 83';
export const TEL_LIEN = '+41219000483';
export const WHATSAPP_NUMERO = '41799394222';

const QUESTION_CRENEAU = {
  question: 'Aucun créneau ne me convient. Comment faire ?',
  answer: `Laissez votre numéro dans le formulaire de rappel, appelez le ${TEL_AFFICHE} ou écrivez-nous sur WhatsApp : nous trouvons un moment ensemble en deux minutes.`,
};

const QUESTION_DONNEES = {
  question: 'Que deviennent mes informations ?',
  answer:
    'Elles servent uniquement à préparer et suivre ce rendez-vous. Nous ne les revendons pas, et vous pouvez demander leur suppression à tout moment.',
};

export const CONSEILLERS: Record<ConseillerSlug, Conseiller> = {
  laura: {
    slug: 'laura',
    chemin: '/rendez-vous/laurence',
    prenom: 'Laurence',
    nom: 'Laurence Lazard',
    role: 'Conseillère IA pour les PME romandes',
    photo: '/images/equipe/laurence-lazard.webp',
    photoAlt: 'Laurence Lazard, conseillère IA chez IAPME Suisse',
    citation: 'Je préfère vous dire qu’un projet ne vaut pas la peine plutôt que de vous le vendre.',
    metaTitre: 'Réserver un appel avec Laurence Lazard (30 min, gratuit)',
    metaDescription:
      'Trente minutes avec Laurence Lazard, conseillère IA pour les PME romandes : vos tâches les plus chronophages, ce que l’IA peut en faire, et par quoi commencer. Gratuit, sans engagement.',
    pastille: 'Appel découverte avec Laurence Lazard',
    h1: 'Trente minutes pour savoir où l’IA vous ferait gagner des heures',
    lead:
      'Vous me décrivez les tâches qui vous prennent le plus de temps chaque semaine. Je vous dis franchement ce que l’IA peut en faire aujourd’hui, ce qu’elle ne fera pas, et par quoi commencer. Sans jargon, sans engagement.',
    chips: ['30 minutes', 'Visio ou téléphone', 'En français', 'Gratuit, sans engagement'],
    resultats: [
      {
        titre: 'Une liste courte',
        texte:
          'Les deux ou trois tâches où l’IA vous rend réellement du temps, classées de la plus rentable à la moins urgente. Le reste, on l’écarte.',
      },
      {
        titre: 'Un avis franc',
        texte:
          'Si l’IA n’est pas votre priorité aujourd’hui, je vous le dis. Cela arrive, et cela vous évite de payer un projet qui ne rapporte rien.',
      },
      {
        titre: 'Un compte rendu écrit',
        texte:
          'Une page, sous 48 heures : ce que nous avons vu, ce qui s’automatise, et un ordre de grandeur de budget et de délai si un projet a du sens.',
      },
    ],
    questions: [
      {
        question: 'Est-ce vraiment gratuit ?',
        answer:
          'Oui, et sans contrepartie. Ces trente minutes me servent aussi à savoir si nous pouvons vous être utiles : il m’arrive régulièrement de conseiller de ne rien lancer pour l’instant.',
      },
      {
        question: 'Je n’y connais rien en IA. Est-ce un problème ?',
        answer:
          'Non, c’est même le cas le plus fréquent. Nous parlons de votre métier et de votre semaine de travail, pas de technologie.',
      },
      QUESTION_CRENEAU,
      {
        question: 'Que se passe-t-il si un projet a du sens ?',
        answer:
          'Vous recevez une estimation de budget et de délai, puis vous décidez. Rien ne démarre sans votre accord, et si vous ne donnez pas suite, nous en restons là.',
      },
      QUESTION_DONNEES,
    ],
    whatsappTexte: 'Bonjour Laurence, je souhaite fixer un appel découverte.',
    rappelTitre: 'Vous préférez que je vous rappelle ?',
    rappelTexte:
      'Laissez votre numéro et le moment qui vous arrange. Je vous appelle moi-même, sans centrale d’appels ni script de vente.',
    rappelPoints: [
      'Un appel court : on voit d’abord si le sujet vaut trente minutes.',
      'Vos coordonnées servent à ce rappel, à rien d’autre.',
      'Aucun engagement, même si nous fixons un rendez-vous.',
    ],
    rappelMessageAide: 'La tâche qui vous prend le plus de temps, par exemple (facultatif)',
    renvoi: { texte: 'Un projet d’agent IA ou d’automatisation déjà bien précis ?', vers: 'michael' },
  },

  michael: {
    slug: 'michael',
    chemin: '/rendez-vous/michael',
    prenom: 'Michael',
    nom: 'Michael Dupuis',
    role: 'Agents IA et automatisation pour les PME romandes',
    photo: '/images/equipe/michael-dupuis.webp',
    photoAlt: 'Michael Dupuis, agents IA et automatisation chez IAPME Suisse',
    citation: 'Si trois clics dans vos outils actuels suffisent, je ne vous vendrai pas un agent.',
    metaTitre: 'Réserver un appel avec Michael Dupuis (30 min, gratuit)',
    metaDescription:
      'Trente minutes avec Michael Dupuis pour passer un processus de votre PME au crible (devis, dossiers, commandes, relances) et savoir ce qu’un agent IA ou une automatisation en ferait. Gratuit, sans engagement.',
    pastille: 'Appel technique avec Michael Dupuis',
    h1: 'Votre processus le plus lourd, passé au crible en trente minutes',
    lead:
      'Devis à chiffrer, dossiers à trier, commandes à ressaisir, clients à relancer : vous choisissez un processus et nous le déroulons ensemble. Je vous dis ce qu’un agent IA ou une automatisation peut reprendre, avec quels outils, et ce qui doit rester chez vous. Concret, vérifiable, sans jargon.',
    chips: ['30 minutes', 'Visio ou téléphone', 'Sur un cas réel', 'Gratuit, sans engagement'],
    resultats: [
      {
        titre: 'Un verdict par étape',
        texte:
          'Pour chaque étape du processus : à automatiser, à faire assister par l’IA, ou à garder à la main. Avec la raison, pas seulement la réponse.',
      },
      {
        titre: 'Les bons outils',
        texte:
          'Ceux que vous avez déjà quand ils suffisent (messagerie, Excel, votre logiciel métier), un agent sur mesure seulement quand il se justifie.',
      },
      {
        titre: 'Une estimation écrite',
        texte:
          'Une page, sous 48 heures : le temps récupéré chaque mois, le délai de mise en place et un ordre de grandeur de budget. Vous décidez ensuite.',
      },
    ],
    questions: [
      {
        question: 'Faut-il préparer quelque chose ?',
        answer:
          'Pensez à un processus qui vous agace et gardez un exemple sous la main : un devis, un dossier, une commande. Rien d’autre, l’appel sert justement à faire le tri.',
      },
      {
        question: 'Nos logiciels sont anciens. Est-ce que ça marche quand même ?',
        answer:
          'Souvent, oui. Beaucoup d’automatisations partent d’e-mails, de fichiers Excel ou de PDF. Si votre outil ne le permet pas, je vous le dis pendant l’appel plutôt qu’après.',
      },
      {
        question: 'Où partent nos données ?',
        answer:
          'Nous regardons ensemble, processus par processus, ce qui peut rester en Suisse ou en Europe et ce qui ne le peut pas, avant de choisir le moindre outil. Les données sensibles peuvent rester sur vos propres serveurs.',
      },
      {
        question: 'Est-ce vraiment gratuit ?',
        answer:
          'Oui. Ces trente minutes me servent aussi à vérifier que votre projet est faisable. S’il ne l’est pas, ou si un outil que vous avez déjà suffit, je vous le dis.',
      },
      QUESTION_CRENEAU,
      QUESTION_DONNEES,
    ],
    whatsappTexte: 'Bonjour Michael, je souhaite fixer un appel au sujet d’une automatisation.',
    rappelTitre: 'Vous préférez que je vous rappelle ?',
    rappelTexte:
      'Laissez votre numéro et le moment qui vous arrange. Je vous appelle moi-même pour cadrer le processus avant d’y consacrer trente minutes.',
    rappelPoints: [
      'Un appel court : on vérifie que le processus vaut la peine d’être regardé.',
      'Vos coordonnées servent à ce rappel, à rien d’autre.',
      'Aucun engagement, même si nous fixons un rendez-vous.',
    ],
    rappelMessageAide: 'Le processus dont vous voulez parler, par exemple (facultatif)',
    renvoi: { texte: 'Vous cherchez d’abord un avis d’ensemble, ou une formation pour votre équipe ?', vers: 'laura' },
  },
};

// Page de campagne : pas d'indexation (les pages /rendez-vous/audit-ia etc. portent deja
// l'intention dans Google), francais seulement, meme portrait en partage que dans l'e-mail.
export function metadataConseiller(c: Conseiller) {
  return {
    title: c.metaTitre,
    description: c.metaDescription,
    robots: { index: false, follow: true },
    alternates: getAlternates('fr', c.chemin, ['fr']),
    openGraph: {
      ...getOpenGraph('fr', c.metaTitre, c.metaDescription),
      images: [{ url: `https://iapmesuisse.ch${c.photo}`, width: 560, height: 560, alt: c.photoAlt }],
    },
  };
}
