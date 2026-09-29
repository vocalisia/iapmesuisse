import { getAlternates, getOpenGraph } from '@/lib/metadata';
import { TEL_AFFICHE } from '@/lib/conseillers';

// Campagne courtiers en assurance (Suisse romande) : deux pages de reservation, une par
// produit vendu — acquisition 3e pilier et acquisition LAMal. Elles sont l'arrivee des
// e-mails du cockpit courtiers-assurance.
//
// Fichier separe des signataires IA (lib/conseillers.ts) : meme moule, mais l'argumentaire
// s'adresse a un professionnel qui achete un canal d'acquisition, pas a une PME qui
// decouvre l'IA. Le contenu vit ici, la mise en page dans components/FunnelCourtier.tsx.

export type CourtierSlug = 'courtiers-3e-pilier' | 'courtiers-lamal';

type Bloc = { titre: string; texte: string };

export type Courtier = {
  slug: CourtierSlug;
  chemin: string;
  duree: string;
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
  deroule: (Bloc & { temps: string })[];
  sujetsIntro: string;
  sujets: Bloc[];
  questions: { question: string; answer: string }[];
  whatsappTexte: string;
  rappelTitre: string;
  rappelTexte: string;
  rappelPoints: string[];
  rappelMessageAide: string;
  bandeFinale: string;
  // Renvoi vers l'autre produit, quand la priorite du courtier est ailleurs.
  renvoi: { texte: string; vers: CourtierSlug };
};

const QUESTION_CRENEAU = {
  question: 'Aucun créneau ne me convient. Comment faire ?',
  answer: `Laissez votre numéro dans le formulaire de rappel ou appelez le ${TEL_AFFICHE} : nous trouvons un moment ensemble en deux minutes.`,
};

const QUESTION_DONNEES = {
  question: 'Que deviennent mes informations ?',
  answer:
    'Elles servent uniquement à préparer et suivre ce rendez-vous. Nous ne les revendons pas, et vous pouvez demander leur suppression à tout moment.',
};

export const COURTIERS: Record<CourtierSlug, Courtier> = {
  'courtiers-3e-pilier': {
    slug: 'courtiers-3e-pilier',
    duree: '15 minutes',
    chemin: '/rendez-vous/courtiers-3e-pilier',
    prenom: 'Michael',
    nom: 'Michael Serger',
    role: 'Acquisition pour les courtiers en assurance',
    photo: '/images/equipe/michael-serger.webp',
    photoAlt: 'Michael Serger, responsable acquisition courtiers chez IAPME Suisse',
    citation: 'Je n’ouvre un canton qu’à un seul cabinet. C’est la seule façon de ne pas vendre le même contact cinq fois.',
    metaTitre: 'Réserver 15 minutes — acquisition 3e pilier pour courtiers',
    metaDescription:
      'Quinze minutes pour savoir si votre canton est encore libre : pages cantonales à votre nom, prise de rendez-vous branchée sur votre agenda, relances automatiques. Un seul cabinet par canton.',
    pastille: 'Acquisition 3e pilier · courtiers romands',
    h1: 'Et si c’étaient eux qui vous appelaient ?',
    lead:
      'Un courtier passe sa vie à courir après les gens. Nous installons l’inverse : des pages cantonales à votre nom sur notre réseau de sites suisses, la prise de rendez-vous branchée sur votre agenda, les relances qui tournent sans vous. Un seul cabinet par canton.',
    chips: ['15 minutes', 'En visio (Google Meet)', 'Suisse romande', 'Sans engagement'],
    resultats: [
      {
        titre: 'Votre canton, ou rien',
        texte:
          'Vous saurez en quinze minutes si votre canton est encore libre. Six cantons romands sont ouverts : Genève, Vaud, Valais, Fribourg, Neuchâtel, Jura. Un cabinet par canton, pas deux.',
      },
      {
        titre: 'Les chiffres réels',
        texte:
          'Ce que notre réseau reçoit vraiment, mesuré dans Google Search Console, sans arrondi flatteur. Vous jugez sur pièces plutôt que sur une plaquette.',
      },
      {
        titre: 'Un avis franc',
        texte:
          'Si vous êtes déjà au maximum de ce que vous pouvez suivre, je vous le dis et on s’arrête là. Un dispositif qui remplit un agenda saturé ne sert personne.',
      },
    ],
    deroule: [
      {
        temps: '0 – 3 min',
        titre: 'Votre cabinet',
        texte:
          'Combien de dossiers 3e pilier vous pouvez absorber par semaine sans dégrader le suivi. Si la réponse est zéro en ce moment, personne n’a perdu sa journée.',
      },
      {
        temps: '3 – 9 min',
        titre: 'Votre canton',
        texte:
          'Ce qui se cherche chez vous, ce qui existe déjà en face, et les pages qu’on ouvrirait à votre nom.',
      },
      {
        temps: '9 – 15 min',
        titre: 'Le cadre',
        texte:
          'Le rythme de démarrage, ce qu’on mesure, ce qu’on ne promet pas. Vous repartez avec les chiffres du réseau.',
      },
    ],
    sujetsIntro:
      'Trois métiers que personne n’a le temps d’exercer entre deux rendez-vous clients. Ce sont les trois que nous prenons.',
    sujets: [
      {
        titre: 'Écrire pour votre canton',
        texte:
          'Nous produisons les pages qui répondent aux questions 3e pilier posées dans votre canton, avec votre cabinet comme interlocuteur. Vous ne rédigez rien.',
      },
      {
        titre: 'Brancher la prise de rendez-vous',
        texte:
          'Un formulaire mort dans une boîte mail ne sert à rien. La demande arrive dans votre agenda, avec le contexte de la personne et ce qu’elle cherchait.',
      },
      {
        titre: 'Rattraper ceux qui hésitent',
        texte:
          'Une personne qui ne répond pas du premier coup est relancée à votre nom, au bon moment, sans que vous ayez à y penser.',
      },
    ],
    questions: [
      {
        question: 'Vous revendez le même contact à plusieurs courtiers ?',
        answer:
          'Non. Nous n’ouvrons chaque canton qu’à un seul cabinet. Ce n’est pas un argument de vente : c’est la seule façon d’envoyer quelqu’un à un conseiller plutôt que de vendre le même contact à cinq concurrents.',
      },
      {
        question: 'Quelle audience avez-vous vraiment ?',
        answer:
          'Notre réseau de sites suisses totalise 36 800 affichages par mois dans Google ; le plus fort, job-emploi.ch, reçoit 378 visites mensuelles en position moyenne 12,2. Source : Google Search Console, 90 jours au 12 septembre 2026. Ce sont des visites de recherche, pas des demandes de rendez-vous.',
      },
      {
        question: 'Combien de demandes par mois garantissez-vous ?',
        answer:
          'Aucune. Nous ne vendons pas un nombre de dossiers : nous construisons un canal à votre nom sur votre canton, et nous vous montrons ce qu’il produit, chiffres à l’appui. Qui vous garantit un volume au téléphone vous vend une liste rachetée.',
      },
      {
        question: 'Pourquoi maintenant ?',
        answer:
          'Les versements 3a se décident d’ici au 31 décembre. C’est le moment de l’année où ces gens cherchent un conseiller : en janvier, ils auront choisi.',
      },
      QUESTION_CRENEAU,
      QUESTION_DONNEES,
    ],
    whatsappTexte: 'Bonjour, je suis courtier et je voudrais savoir si mon canton est encore libre sur le 3e pilier.',
    rappelTitre: 'Vous préférez que je vous appelle ?',
    rappelTexte:
      'Laissez votre numéro et le canton de votre cabinet. Je regarde ce qui est encore libre avant de vous rappeler, pour ne pas vous faire perdre quinze minutes si la place est prise.',
    rappelPoints: [
      'Je vérifie la disponibilité de votre canton avant d’appeler.',
      'Appel court : votre capacité, votre canton, le cadre.',
      'Aucun rappel automatique ensuite si vous dites non.',
    ],
    rappelMessageAide: 'Votre canton et le nombre de dossiers 3e pilier que vous pouvez suivre par semaine.',
    bandeFinale: 'Six cantons romands ouverts. Un seul cabinet par canton.',
    renvoi: {
      texte: 'Votre priorité du moment, c’est plutôt l’assurance maladie ?',
      vers: 'courtiers-lamal',
    },
  },
  'courtiers-lamal': {
    slug: 'courtiers-lamal',
    duree: '15 minutes',
    chemin: '/rendez-vous/courtiers-lamal',
    prenom: 'Laura',
    nom: 'Laura Fournier',
    role: 'Acquisition pour les courtiers en assurance',
    photo: '/images/equipe/laura-fournier.webp',
    photoAlt: 'Laura Fournier, responsable acquisition courtiers chez IAPME Suisse',
    citation: 'La fenêtre de résiliation dure huit semaines. Tout se joue là, ou pas du tout.',
    metaTitre: 'Réserver 15 minutes — acquisition LAMal pour courtiers',
    metaDescription:
      'Quinze minutes pour savoir si votre canton est encore libre avant la fin de la période de résiliation : pages cantonales à votre nom, prise de rendez-vous sur votre agenda, relances automatiques.',
    pastille: 'Acquisition LAMal · courtiers romands',
    h1: 'La prime a encore augmenté. Ils cherchent quelqu’un.',
    lead:
      'Chaque automne, des milliers de ménages romands ouvrent le courrier de leur caisse et décident de bouger. La plupart ne savent pas à qui parler. Nous installons les pages cantonales qui leur répondent, à votre nom, avec la prise de rendez-vous branchée sur votre agenda.',
    chips: ['15 minutes', 'En visio (Google Meet)', 'Suisse romande', 'Sans engagement'],
    resultats: [
      {
        titre: 'Votre canton, ou rien',
        texte:
          'Vous saurez en quinze minutes si votre canton est encore libre. Six cantons romands sont ouverts : Genève, Vaud, Valais, Fribourg, Neuchâtel, Jura. Un cabinet par canton, pas deux.',
      },
      {
        titre: 'Le calendrier, sans détour',
        texte:
          'La fenêtre de résiliation se ferme le 30 novembre. Nous vous dirons franchement ce qu’il est encore réaliste d’installer cette saison, et ce qui attendra l’année prochaine.',
      },
      {
        titre: 'Un avis franc',
        texte:
          'Si vous êtes déjà saturée ou saturé en pleine saison, je vous le dis et on s’arrête là. Remplir un agenda déjà plein ne rend service à personne.',
      },
    ],
    deroule: [
      {
        temps: '0 – 3 min',
        titre: 'Votre cabinet',
        texte:
          'Combien de dossiers LAMal vous pouvez absorber par semaine sans dégrader le suivi. Si la réponse est zéro en pleine saison, personne n’a perdu sa journée.',
      },
      {
        temps: '3 – 9 min',
        titre: 'Votre canton',
        texte:
          'Ce qui se cherche chez vous, ce qui existe déjà en face, et les pages qu’on ouvrirait à votre nom.',
      },
      {
        temps: '9 – 15 min',
        titre: 'Le cadre',
        texte:
          'Le rythme de démarrage, ce qu’on mesure, ce qu’on ne promet pas. Vous repartez avec les chiffres du réseau.',
      },
    ],
    sujetsIntro:
      'Trois métiers que personne n’a le temps d’exercer en pleine période de résiliation. Ce sont les trois que nous prenons.',
    sujets: [
      {
        titre: 'Écrire pour votre canton',
        texte:
          'Franchise, modèle, changement de caisse, complémentaires : nous produisons les pages qui répondent à ces questions dans votre canton, avec votre cabinet comme interlocuteur.',
      },
      {
        titre: 'Brancher la prise de rendez-vous',
        texte:
          'Un formulaire mort dans une boîte mail ne sert à rien. La demande arrive dans votre agenda, avec le contexte de la personne et ce qu’elle cherchait.',
      },
      {
        titre: 'Rattraper ceux qui hésitent',
        texte:
          'Une personne qui ne répond pas du premier coup est relancée à votre nom, au bon moment, sans que vous ayez à y penser.',
      },
    ],
    questions: [
      {
        question: 'Vous revendez le même contact à plusieurs courtiers ?',
        answer:
          'Non. Nous n’ouvrons chaque canton qu’à un seul cabinet. Ce n’est pas un argument de vente : c’est la seule façon d’envoyer quelqu’un à un conseiller plutôt que de vendre le même contact à cinq concurrents.',
      },
      {
        question: 'Quelle audience avez-vous vraiment ?',
        answer:
          'Notre réseau de sites suisses totalise 36 800 affichages par mois dans Google ; le plus fort, job-emploi.ch, reçoit 378 visites mensuelles en position moyenne 12,2. Source : Google Search Console, 90 jours au 12 septembre 2026. Ce sont des visites de recherche, pas des demandes de rendez-vous.',
      },
      {
        question: 'Il reste combien de temps avant la fin de la période de résiliation ?',
        answer:
          'La résiliation LAMal se joue jusqu’au 30 novembre. C’est le seul moment de l’année où les gens changent vraiment de caisse : après, il faut attendre un an.',
      },
      QUESTION_CRENEAU,
      QUESTION_DONNEES,
    ],
    whatsappTexte: 'Bonjour, je suis courtier et je voudrais savoir si mon canton est encore libre sur la LAMal.',
    rappelTitre: 'Vous préférez que je vous appelle ?',
    rappelTexte:
      'Laissez votre numéro et le canton de votre cabinet. Je regarde ce qui est encore libre avant de vous rappeler, pour ne pas vous faire perdre quinze minutes si la place est prise.',
    rappelPoints: [
      'Je vérifie la disponibilité de votre canton avant d’appeler.',
      'Appel court : votre capacité, votre canton, le cadre.',
      'Aucun rappel automatique ensuite si vous dites non.',
    ],
    rappelMessageAide: 'Votre canton et le nombre de dossiers LAMal que vous pouvez suivre par semaine.',
    bandeFinale: 'La fenêtre de résiliation se ferme le 30 novembre.',
    renvoi: {
      texte: 'Votre priorité du moment, c’est plutôt la prévoyance ?',
      vers: 'courtiers-3e-pilier',
    },
  },
};

// Pages de campagne : jamais indexees (elles n'ont d'interet que pour qui recoit l'e-mail),
// francais seulement, meme portrait en partage que dans la signature.
export function metadataCourtier(c: Courtier) {
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
