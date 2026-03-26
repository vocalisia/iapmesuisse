import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getAlternates } from '@/lib/metadata';
import Breadcrumbs from '@/components/Breadcrumbs';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const meta: Record<string, { title: string; description: string }> = {
    fr: {
      title: 'Jeux IA - Testez vos connaissances',
      description:
        'Jouez a nos mini-jeux interactifs sur l\'intelligence artificielle. Devinez si un texte est ecrit par une IA et devenez un Prompt Master !',
    },
    de: {
      title: 'KI-Spiele - Testen Sie Ihr Wissen',
      description:
        'Spielen Sie unsere interaktiven KI-Minispiele. Erkennen Sie KI-Texte und werden Sie zum Prompt Master!',
    },
    en: {
      title: 'AI Games - Test your knowledge',
      description:
        'Play our interactive AI mini-games. Guess if text was written by AI and become a Prompt Master!',
    },
    it: {
      title: 'Giochi IA - Testate le vostre conoscenze',
      description:
        'Giocate ai nostri mini-giochi interattivi sull\'intelligenza artificiale. Indovinate se un testo e scritto dall\'IA e diventate Prompt Master!',
    },
  };
  const m = meta[locale] || meta.fr;
  return {
    title: m.title,
    description: m.description,
    alternates: getAlternates(locale, '/jeux-ia'),
  };
}

const content: Record<
  string,
  {
    title: string;
    subtitle: string;
    breadcrumbHome: string;
    breadcrumbTitle: string;
    games: {
      title: string;
      emoji: string;
      description: string;
      href: string;
      tag: string;
    }[];
  }
> = {
  fr: {
    title: 'Jeux IA',
    subtitle:
      'Testez vos connaissances en intelligence artificielle avec nos mini-jeux interactifs. Amusant, educatif et 100% gratuit !',
    breadcrumbHome: 'Accueil',
    breadcrumbTitle: 'Jeux IA',
    games: [
      {
        title: 'Devine l\'IA',
        emoji: '\u{1F916}',
        description:
          'Saurez-vous distinguer un texte ecrit par une IA d\'un texte humain ? 10 textes, 10 devinettes. Faites confiance a votre instinct !',
        href: '/jeux-ia/devine-ia',
        tag: '~3 min',
      },
      {
        title: 'Prompt Master',
        emoji: '\u{1F3AF}',
        description:
          'Ecrivez le meilleur prompt possible et testez vos competences ! 5 defis pour prouver que vous maitrisez l\'art du prompting.',
        href: '/jeux-ia/prompt-master',
        tag: '~5 min',
      },
    ],
  },
  de: {
    title: 'KI-Spiele',
    subtitle:
      'Testen Sie Ihr KI-Wissen mit unseren interaktiven Minispielen. Unterhaltsam, lehrreich und 100% kostenlos!',
    breadcrumbHome: 'Startseite',
    breadcrumbTitle: 'KI-Spiele',
    games: [
      {
        title: 'Erkenne die KI',
        emoji: '\u{1F916}',
        description:
          'Konnen Sie einen KI-Text von einem menschlichen Text unterscheiden? 10 Texte, 10 Ratsel. Vertrauen Sie Ihrem Instinkt!',
        href: '/jeux-ia/devine-ia',
        tag: '~3 Min',
      },
      {
        title: 'Prompt Master',
        emoji: '\u{1F3AF}',
        description:
          'Schreiben Sie den bestmoglichen Prompt und testen Sie Ihre Fahigkeiten! 5 Herausforderungen zum Prompt-Profi.',
        href: '/jeux-ia/prompt-master',
        tag: '~5 Min',
      },
    ],
  },
  en: {
    title: 'AI Games',
    subtitle:
      'Test your AI knowledge with our interactive mini-games. Fun, educational, and 100% free!',
    breadcrumbHome: 'Home',
    breadcrumbTitle: 'AI Games',
    games: [
      {
        title: 'Guess the AI',
        emoji: '\u{1F916}',
        description:
          'Can you tell AI-written text from human-written text? 10 texts, 10 guesses. Trust your instinct!',
        href: '/jeux-ia/devine-ia',
        tag: '~3 min',
      },
      {
        title: 'Prompt Master',
        emoji: '\u{1F3AF}',
        description:
          'Write the best possible prompt and test your skills! 5 challenges to prove your prompting mastery.',
        href: '/jeux-ia/prompt-master',
        tag: '~5 min',
      },
    ],
  },
  it: {
    title: 'Giochi IA',
    subtitle:
      'Testate le vostre conoscenze in intelligenza artificiale con i nostri mini-giochi interattivi. Divertente, educativo e 100% gratuito!',
    breadcrumbHome: 'Home',
    breadcrumbTitle: 'Giochi IA',
    games: [
      {
        title: 'Indovina l\'IA',
        emoji: '\u{1F916}',
        description:
          'Saprete distinguere un testo scritto dall\'IA da uno scritto da un umano? 10 testi, 10 indovinelli. Fidatevi del vostro istinto!',
        href: '/jeux-ia/devine-ia',
        tag: '~3 min',
      },
      {
        title: 'Prompt Master',
        emoji: '\u{1F3AF}',
        description:
          'Scrivete il miglior prompt possibile e testate le vostre competenze! 5 sfide per dimostrare la vostra maestria.',
        href: '/jeux-ia/prompt-master',
        tag: '~5 min',
      },
    ],
  },
};

export default async function JeuxIAPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = content[locale] || content.fr;

  return (
    <>
      <section className="bg-[#F5F5F5] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { label: c.breadcrumbHome, href: '/' },
              { label: c.breadcrumbTitle },
            ]}
          />
        </div>
      </section>

      <section className="bg-[#F5F5F5] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <div className="mb-6 text-6xl">{'\u{1F3AE}'}</div>
            <h1 className="text-3xl font-bold tracking-tight text-[#1B2A4A] sm:text-4xl lg:text-5xl">
              {c.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              {c.subtitle}
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {c.games.map((game) => (
              <Link
                key={game.href}
                href={game.href}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Tag */}
                <div className="absolute right-4 top-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#1B2A4A] px-3 py-1 text-xs font-semibold text-white">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {game.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-8">
                  <div className="mb-4 text-5xl">{game.emoji}</div>
                  <h2 className="text-2xl font-bold text-[#1B2A4A] group-hover:text-[#FF0000] transition-colors">
                    {game.title}
                  </h2>
                  <p className="mt-3 flex-1 text-gray-600 leading-relaxed">
                    {game.description}
                  </p>
                  <div className="mt-6">
                    <span className="inline-flex items-center font-semibold text-[#FF0000] group-hover:gap-3 transition-all">
                      Jouer
                      <svg
                        className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
