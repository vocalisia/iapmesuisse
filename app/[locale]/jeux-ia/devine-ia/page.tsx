'use client';

import { useState, useMemo, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';

type GameState = 'intro' | 'playing' | 'feedback' | 'result';
type Author = 'ai' | 'human';

interface TextSample {
  text: string;
  author: Author;
}

interface LocaleContent {
  pageTitle: string;
  pageSubtitle: string;
  startButton: string;
  roundOf: string;
  btnAI: string;
  btnHuman: string;
  correctLabel: string;
  wrongLabel: string;
  wasAI: string;
  wasHuman: string;
  nextRound: string;
  resultTitle: string;
  scoreLabel: string;
  shareTitle: string;
  shareText: (score: number) => string;
  retakeButton: string;
  backToGames: string;
  breadcrumbHome: string;
  breadcrumbGames: string;
  breadcrumbTitle: string;
  levels: { min: number; label: string; emoji: string }[];
  samples: TextSample[];
}

const allContent: Record<string, LocaleContent> = {
  fr: {
    pageTitle: 'Devine l\'IA',
    pageSubtitle: 'Saurez-vous distinguer un texte ecrit par une IA d\'un texte humain ? 10 textes vous attendent. Faites confiance a votre instinct !',
    startButton: 'C\'est parti !',
    roundOf: 'Texte {current} sur {total}',
    btnAI: '\u{1F916} IA',
    btnHuman: '\u{1F464} Humain',
    correctLabel: 'Bravo ! Bonne reponse !',
    wrongLabel: 'Rate ! Mauvaise reponse.',
    wasAI: 'Ce texte a ete ecrit par une IA',
    wasHuman: 'Ce texte a ete ecrit par un humain',
    nextRound: 'Texte suivant',
    resultTitle: 'Votre score final',
    scoreLabel: '{score} / {total}',
    shareTitle: 'Partagez votre score',
    shareText: (score: number) => `J'ai obtenu ${score}/10 au jeu "Devine l'IA" sur IAPME Suisse ! Saurez-vous faire mieux ?`,
    retakeButton: 'Rejouer',
    backToGames: 'Tous les jeux',
    breadcrumbHome: 'Accueil',
    breadcrumbGames: 'Jeux IA',
    breadcrumbTitle: 'Devine l\'IA',
    levels: [
      { min: 9, label: 'Expert en detection IA !', emoji: '\u{1F3C6}' },
      { min: 7, label: 'Tres bon oeil !', emoji: '\u{1F44F}' },
      { min: 5, label: 'Pas mal du tout !', emoji: '\u{1F44D}' },
      { min: 0, label: 'L\'IA vous a bien eu !', emoji: '\u{1F605}' },
    ],
    samples: [
      { text: 'Les PME suisses representent plus de 99% du tissu economique national. Leur capacite a innover et a s\'adapter aux nouvelles technologies determinera leur competitivite future dans un marche globalise.', author: 'ai' },
      { text: 'J\'ai passe 20 ans a gerer ma petite boite a Bienne. L\'IA, au debut ca me faisait peur. Maintenant mon fils m\'a montre ChatGPT et franchement, ca m\'aide pour les offres.', author: 'human' },
      { text: 'L\'intelligence artificielle offre des opportunites significatives pour l\'optimisation des processus operationnels des entreprises de taille moyenne.', author: 'ai' },
      { text: 'Notre comptable utilise un truc d\'IA pour les factures, moi j\'y comprends rien mais apparemment ca lui fait gagner 2h par semaine.', author: 'human' },
      { text: 'Selon les dernieres etudes, l\'adoption de solutions d\'intelligence artificielle permet en moyenne une augmentation de 35% de la productivite dans les taches administratives.', author: 'ai' },
      { text: 'La formatrice nous a montre comment faire des prompts, c\'etait top. Par contre le wifi de la salle etait nul.', author: 'human' },
      { text: 'La transformation digitale des PME constitue un enjeu strategique majeur pour l\'economie helvetique, necessitant une approche structuree et progressive.', author: 'ai' },
      { text: 'Mon associe est anti-tech, il ecrit encore ses devis a la main. Faut que je lui montre ce nouveau machin la...', author: 'human' },
      { text: 'Les avancees recentes en matiere de traitement automatique du langage naturel ouvrent de nouvelles perspectives pour les entreprises souhaitant ameliorer leur communication multilingue.', author: 'ai' },
      { text: 'On a teste DeepL pour traduire nos courriers en allemand. Resultat: nos clients zurichois nous repondent plus vite ! Peut-etre qu\'ils comprennent enfin ce qu\'on raconte.', author: 'human' },
    ],
  },
  de: {
    pageTitle: 'Erkenne die KI',
    pageSubtitle: 'Konnen Sie einen KI-Text von einem menschlichen Text unterscheiden? 10 Texte warten auf Sie. Vertrauen Sie Ihrem Instinkt!',
    startButton: 'Los geht\'s!',
    roundOf: 'Text {current} von {total}',
    btnAI: '\u{1F916} KI',
    btnHuman: '\u{1F464} Mensch',
    correctLabel: 'Richtig! Gut erkannt!',
    wrongLabel: 'Falsch! Daneben getippt.',
    wasAI: 'Dieser Text wurde von einer KI geschrieben',
    wasHuman: 'Dieser Text wurde von einem Menschen geschrieben',
    nextRound: 'Nachster Text',
    resultTitle: 'Ihr Endergebnis',
    scoreLabel: '{score} / {total}',
    shareTitle: 'Teilen Sie Ihr Ergebnis',
    shareText: (score: number) => `Ich habe ${score}/10 beim Spiel "Erkenne die KI" auf IAPME Suisse erreicht! Schaffen Sie mehr?`,
    retakeButton: 'Nochmal spielen',
    backToGames: 'Alle Spiele',
    breadcrumbHome: 'Startseite',
    breadcrumbGames: 'KI-Spiele',
    breadcrumbTitle: 'Erkenne die KI',
    levels: [
      { min: 9, label: 'KI-Erkennungs-Experte!', emoji: '\u{1F3C6}' },
      { min: 7, label: 'Sehr gutes Auge!', emoji: '\u{1F44F}' },
      { min: 5, label: 'Nicht schlecht!', emoji: '\u{1F44D}' },
      { min: 0, label: 'Die KI hat Sie erwischt!', emoji: '\u{1F605}' },
    ],
    samples: [
      { text: 'Schweizer KMU machen uber 99% des wirtschaftlichen Gewebes des Landes aus. Ihre Fahigkeit zur Innovation und Anpassung an neue Technologien wird ihre zukunftige Wettbewerbsfahigkeit auf einem globalisierten Markt bestimmen.', author: 'ai' },
      { text: 'Ich fuhre seit 20 Jahren meinen kleinen Laden in Biel. KI hat mir am Anfang Angst gemacht. Jetzt hat mir mein Sohn ChatGPT gezeigt und ehrlich gesagt, es hilft mir bei den Offerten.', author: 'human' },
      { text: 'Kunstliche Intelligenz bietet bedeutende Moglichkeiten zur Optimierung der operativen Prozesse mittelstandischer Unternehmen.', author: 'ai' },
      { text: 'Unsere Buchhalterin nutzt so ein KI-Ding fur die Rechnungen. Ich verstehe nichts davon, aber anscheinend spart sie 2 Stunden pro Woche.', author: 'human' },
      { text: 'Laut aktuellen Studien ermoglicht die Einfuhrung kunstlicher Intelligenz im Durchschnitt eine Produktivitatssteigerung von 35% bei administrativen Aufgaben.', author: 'ai' },
      { text: 'Die Trainerin hat uns gezeigt, wie man Prompts schreibt, das war super. Aber das WLAN im Raum war mies.', author: 'human' },
      { text: 'Die digitale Transformation von KMU stellt eine zentrale strategische Herausforderung fur die Schweizer Wirtschaft dar und erfordert einen strukturierten und schrittweisen Ansatz.', author: 'ai' },
      { text: 'Mein Geschaftspartner ist technikfeindlich, er schreibt seine Angebote noch von Hand. Ich muss ihm dieses neue Ding zeigen...', author: 'human' },
      { text: 'Die jungsten Fortschritte in der automatischen Verarbeitung naturlicher Sprache eroffnen neue Perspektiven fur Unternehmen, die ihre mehrsprachige Kommunikation verbessern mochten.', author: 'ai' },
      { text: 'Wir haben DeepL getestet, um unsere Briefe auf Franzosisch zu ubersetzen. Ergebnis: unsere Westschweizer Kunden antworten schneller! Vielleicht verstehen sie endlich, was wir meinen.', author: 'human' },
    ],
  },
  en: {
    pageTitle: 'Guess the AI',
    pageSubtitle: 'Can you tell AI-written text from human-written text? 10 texts await you. Trust your instinct!',
    startButton: 'Let\'s go!',
    roundOf: 'Text {current} of {total}',
    btnAI: '\u{1F916} AI',
    btnHuman: '\u{1F464} Human',
    correctLabel: 'Correct! Well spotted!',
    wrongLabel: 'Wrong! Better luck next time.',
    wasAI: 'This text was written by AI',
    wasHuman: 'This text was written by a human',
    nextRound: 'Next text',
    resultTitle: 'Your final score',
    scoreLabel: '{score} / {total}',
    shareTitle: 'Share your score',
    shareText: (score: number) => `I scored ${score}/10 on "Guess the AI" on IAPME Suisse! Can you do better?`,
    retakeButton: 'Play again',
    backToGames: 'All games',
    breadcrumbHome: 'Home',
    breadcrumbGames: 'AI Games',
    breadcrumbTitle: 'Guess the AI',
    levels: [
      { min: 9, label: 'AI detection expert!', emoji: '\u{1F3C6}' },
      { min: 7, label: 'Great eye!', emoji: '\u{1F44F}' },
      { min: 5, label: 'Not bad at all!', emoji: '\u{1F44D}' },
      { min: 0, label: 'The AI fooled you!', emoji: '\u{1F605}' },
    ],
    samples: [
      { text: 'Swiss SMEs represent over 99% of the national economic fabric. Their ability to innovate and adapt to new technologies will determine their future competitiveness in a globalized market.', author: 'ai' },
      { text: 'I\'ve been running my little shop in Biel for 20 years. AI scared me at first. Now my son showed me ChatGPT and honestly, it helps me write proposals.', author: 'human' },
      { text: 'Artificial intelligence offers significant opportunities for optimizing the operational processes of medium-sized enterprises.', author: 'ai' },
      { text: 'Our accountant uses some AI thing for invoices. I don\'t understand any of it but apparently it saves her 2 hours a week.', author: 'human' },
      { text: 'According to recent studies, the adoption of artificial intelligence solutions enables an average productivity increase of 35% in administrative tasks.', author: 'ai' },
      { text: 'The trainer showed us how to write prompts, it was great. But the WiFi in the room was terrible.', author: 'human' },
      { text: 'The digital transformation of SMEs represents a major strategic challenge for the Swiss economy, requiring a structured and progressive approach.', author: 'ai' },
      { text: 'My business partner is anti-tech. He still writes his quotes by hand. I need to show him this new thing...', author: 'human' },
      { text: 'Recent advances in natural language processing open new perspectives for companies wishing to improve their multilingual communication capabilities.', author: 'ai' },
      { text: 'We tested DeepL to translate our letters into German. Result: our Zurich clients respond faster! Maybe they finally understand what we\'re saying.', author: 'human' },
    ],
  },
  it: {
    pageTitle: 'Indovina l\'IA',
    pageSubtitle: 'Saprete distinguere un testo scritto dall\'IA da uno scritto da un umano? 10 testi vi aspettano. Fidatevi del vostro istinto!',
    startButton: 'Via!',
    roundOf: 'Testo {current} di {total}',
    btnAI: '\u{1F916} IA',
    btnHuman: '\u{1F464} Umano',
    correctLabel: 'Bravo! Risposta corretta!',
    wrongLabel: 'Sbagliato! Risposta errata.',
    wasAI: 'Questo testo e stato scritto da un\'IA',
    wasHuman: 'Questo testo e stato scritto da un umano',
    nextRound: 'Prossimo testo',
    resultTitle: 'Il vostro punteggio finale',
    scoreLabel: '{score} / {total}',
    shareTitle: 'Condividete il vostro punteggio',
    shareText: (score: number) => `Ho ottenuto ${score}/10 al gioco "Indovina l'IA" su IAPME Suisse! Riuscite a fare meglio?`,
    retakeButton: 'Rigiocare',
    backToGames: 'Tutti i giochi',
    breadcrumbHome: 'Home',
    breadcrumbGames: 'Giochi IA',
    breadcrumbTitle: 'Indovina l\'IA',
    levels: [
      { min: 9, label: 'Esperto di rilevamento IA!', emoji: '\u{1F3C6}' },
      { min: 7, label: 'Ottimo occhio!', emoji: '\u{1F44F}' },
      { min: 5, label: 'Niente male!', emoji: '\u{1F44D}' },
      { min: 0, label: 'L\'IA vi ha fregato!', emoji: '\u{1F605}' },
    ],
    samples: [
      { text: 'Le PMI svizzere rappresentano oltre il 99% del tessuto economico nazionale. La loro capacita di innovare e adattarsi alle nuove tecnologie determinera la loro competitivita futura in un mercato globalizzato.', author: 'ai' },
      { text: 'Gestisco il mio negozietto a Bienne da 20 anni. L\'IA all\'inizio mi faceva paura. Adesso mio figlio mi ha mostrato ChatGPT e onestamente mi aiuta con le offerte.', author: 'human' },
      { text: 'L\'intelligenza artificiale offre opportunita significative per l\'ottimizzazione dei processi operativi delle imprese di medie dimensioni.', author: 'ai' },
      { text: 'La nostra contabile usa un coso di IA per le fatture. Io non ci capisco niente ma a quanto pare le fa risparmiare 2 ore a settimana.', author: 'human' },
      { text: 'Secondo gli studi piu recenti, l\'adozione di soluzioni di intelligenza artificiale consente in media un aumento della produttivita del 35% nelle attivita amministrative.', author: 'ai' },
      { text: 'La formatrice ci ha mostrato come scrivere i prompt, e stato fantastico. Pero il WiFi della sala faceva schifo.', author: 'human' },
      { text: 'La trasformazione digitale delle PMI costituisce una sfida strategica importante per l\'economia elvetica, che richiede un approccio strutturato e progressivo.', author: 'ai' },
      { text: 'Il mio socio e anti-tecnologia, scrive ancora i preventivi a mano. Devo fargli vedere questo nuovo aggeggio...', author: 'human' },
      { text: 'I recenti progressi nell\'elaborazione automatica del linguaggio naturale aprono nuove prospettive per le aziende che desiderano migliorare la propria comunicazione multilingue.', author: 'ai' },
      { text: 'Abbiamo testato DeepL per tradurre le nostre lettere in tedesco. Risultato: i nostri clienti di Zurigo rispondono piu velocemente! Forse finalmente capiscono cosa diciamo.', author: 'human' },
    ],
  },
};

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function DevineIAPage() {
  const locale = useLocale();
  const c = allContent[locale] || allContent.fr;

  const [state, setState] = useState<GameState>('intro');
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [lastAnswer, setLastAnswer] = useState<{ correct: boolean; actual: Author } | null>(null);
  const [shuffledSamples, setShuffledSamples] = useState<TextSample[]>([]);

  const totalRounds = 10;

  function handleStart() {
    setShuffledSamples(shuffleArray(c.samples));
    setCurrentRound(0);
    setScore(0);
    setLastAnswer(null);
    setState('playing');
  }

  function handleGuess(guess: Author) {
    const sample = shuffledSamples[currentRound];
    const correct = guess === sample.author;
    if (correct) setScore((s) => s + 1);
    setLastAnswer({ correct, actual: sample.author });
    setState('feedback');
  }

  function handleNext() {
    if (currentRound + 1 < totalRounds) {
      setCurrentRound((r) => r + 1);
      setLastAnswer(null);
      setState('playing');
    } else {
      setState('result');
    }
  }

  const level = useMemo(() => {
    return c.levels.find((l) => score >= l.min) || c.levels[c.levels.length - 1];
  }, [score, c.levels]);

  const progress = ((currentRound + 1) / totalRounds) * 100;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://iapmesuisse.ch/jeux-ia/devine-ia';

  return (
    <>
      <section className="bg-[#F5F5F5] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { label: c.breadcrumbHome, href: '/' },
              { label: c.breadcrumbGames, href: '/jeux-ia' },
              { label: c.breadcrumbTitle },
            ]}
          />
        </div>
      </section>

      {/* INTRO */}
      {state === 'intro' && (
        <section className="bg-[#F5F5F5] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 text-6xl">{'\u{1F916}'}</div>
            <h1 className="text-3xl font-bold tracking-tight text-[#1B2A4A] sm:text-4xl lg:text-5xl">
              {c.pageTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
              {c.pageSubtitle}
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>~3 min</span>
              <span className="mx-1">{'\u2022'}</span>
              <span>10 textes</span>
            </div>
            <button
              onClick={handleStart}
              className="mt-10 inline-flex items-center justify-center rounded-xl bg-[#FF0000] px-10 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:bg-red-700 hover:shadow-xl hover:-translate-y-0.5"
            >
              {c.startButton}
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </section>
      )}

      {/* PLAYING */}
      {state === 'playing' && shuffledSamples.length > 0 && (
        <section className="bg-[#F5F5F5] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-2xl">
            {/* Progress */}
            <div className="mb-2 flex items-center justify-between text-sm font-medium text-gray-500">
              <span>
                {c.roundOf
                  .replace('{current}', String(currentRound + 1))
                  .replace('{total}', String(totalRounds))}
              </span>
              <span className="font-bold text-[#1B2A4A]">
                {score} / {currentRound}
              </span>
            </div>
            <div className="mb-8 h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-[#1B2A4A] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Text card */}
            <div className="rounded-2xl bg-white p-8 shadow-lg sm:p-10">
              <div className="mb-6 flex items-start gap-3">
                <svg className="mt-1 h-8 w-8 shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-lg leading-relaxed text-[#1B2A4A] italic">
                  {shuffledSamples[currentRound].text}
                </p>
              </div>

              {/* Buttons */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => handleGuess('ai')}
                  className="flex items-center justify-center gap-3 rounded-xl border-2 border-gray-200 bg-white px-6 py-4 text-lg font-bold text-[#1B2A4A] transition-all duration-200 hover:border-purple-500 hover:bg-purple-50 hover:shadow-md"
                >
                  <span className="text-2xl">{'\u{1F916}'}</span>
                  {c.btnAI}
                </button>
                <button
                  onClick={() => handleGuess('human')}
                  className="flex items-center justify-center gap-3 rounded-xl border-2 border-gray-200 bg-white px-6 py-4 text-lg font-bold text-[#1B2A4A] transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md"
                >
                  <span className="text-2xl">{'\u{1F464}'}</span>
                  {c.btnHuman}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FEEDBACK */}
      {state === 'feedback' && lastAnswer && (
        <section className="bg-[#F5F5F5] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-2xl">
            {/* Progress */}
            <div className="mb-2 flex items-center justify-between text-sm font-medium text-gray-500">
              <span>
                {c.roundOf
                  .replace('{current}', String(currentRound + 1))
                  .replace('{total}', String(totalRounds))}
              </span>
              <span className="font-bold text-[#1B2A4A]">
                {score} / {currentRound + 1}
              </span>
            </div>
            <div className="mb-8 h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-[#1B2A4A] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Feedback card */}
            <div
              className={`rounded-2xl border-2 p-8 shadow-lg sm:p-10 ${
                lastAnswer.correct
                  ? 'border-green-400 bg-green-50'
                  : 'border-red-400 bg-red-50'
              }`}
            >
              <div className="mb-4 text-center">
                <span className="text-5xl">
                  {lastAnswer.correct ? '\u2705' : '\u274C'}
                </span>
              </div>
              <p
                className={`text-center text-xl font-bold ${
                  lastAnswer.correct ? 'text-green-700' : 'text-red-700'
                }`}
              >
                {lastAnswer.correct ? c.correctLabel : c.wrongLabel}
              </p>
              <p className="mt-3 text-center text-gray-700">
                {lastAnswer.actual === 'ai' ? c.wasAI : c.wasHuman}
              </p>

              {/* The text again */}
              <div className="mt-6 rounded-xl bg-white/70 p-4">
                <p className="text-sm italic text-gray-600">
                  {shuffledSamples[currentRound].text}
                </p>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={handleNext}
                  className="inline-flex items-center justify-center rounded-xl bg-[#1B2A4A] px-8 py-3 font-semibold text-white transition-all hover:bg-[#2a3d66] hover:shadow-md"
                >
                  {currentRound + 1 < totalRounds ? c.nextRound : c.resultTitle}
                  <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* RESULT */}
      {state === 'result' && (
        <section className="bg-[#F5F5F5] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 text-6xl">{level.emoji}</div>
            <h2 className="text-2xl font-bold text-[#1B2A4A] sm:text-3xl">
              {c.resultTitle}
            </h2>

            {/* Score circle */}
            <div className="mx-auto mt-8 flex h-40 w-40 items-center justify-center rounded-full border-4 border-[#1B2A4A] bg-white shadow-lg">
              <div>
                <p className="text-4xl font-extrabold text-[#1B2A4A]">{score}</p>
                <p className="text-sm font-medium text-gray-500">/ {totalRounds}</p>
              </div>
            </div>

            <p className="mt-6 text-xl font-bold text-[#1B2A4A]">
              {level.label}
            </p>

            {/* Score bar */}
            <div className="mx-auto mt-6 max-w-xs">
              <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    score >= 9
                      ? 'bg-green-500'
                      : score >= 7
                        ? 'bg-blue-500'
                        : score >= 5
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                  }`}
                  style={{ width: `${(score / totalRounds) * 100}%` }}
                />
              </div>
            </div>

            {/* Share */}
            <div className="mt-10 rounded-2xl bg-white p-8 shadow-lg">
              <p className="mb-4 font-semibold text-[#1B2A4A]">{c.shareTitle}</p>
              <div className="flex justify-center">
                <ShareButtons
                  url={shareUrl}
                  text={c.shareText(score)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <button
                onClick={handleStart}
                className="inline-flex items-center justify-center rounded-xl border-2 border-[#1B2A4A] px-8 py-3 font-semibold text-[#1B2A4A] transition-all hover:bg-[#1B2A4A] hover:text-white"
              >
                {c.retakeButton}
              </button>
              <Link
                href="/jeux-ia"
                className="inline-flex items-center justify-center rounded-xl bg-[#FF0000] px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-red-700"
              >
                {c.backToGames}
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
