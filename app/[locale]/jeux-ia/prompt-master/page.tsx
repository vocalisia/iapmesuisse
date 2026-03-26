'use client';

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';

type GameState = 'intro' | 'challenge' | 'scored' | 'result';

interface ScoreBreakdown {
  length: boolean;
  context: boolean;
  details: boolean;
  format: boolean;
  constraints: boolean;
  total: number;
}

interface Challenge {
  task: string;
  hint: string;
}

interface LocaleContent {
  pageTitle: string;
  pageSubtitle: string;
  startButton: string;
  challengeOf: string;
  challengeLabel: string;
  promptPlaceholder: string;
  submitButton: string;
  scoreTitle: string;
  criteriaLabels: {
    length: string;
    context: string;
    details: string;
    format: string;
    constraints: string;
  };
  criteriaDescriptions: {
    length: string;
    context: string;
    details: string;
    format: string;
    constraints: string;
  };
  tipTitle: string;
  nextChallenge: string;
  seeResults: string;
  resultTitle: string;
  totalScore: string;
  levelLabel: string;
  shareTitle: string;
  shareText: (score: number, level: string) => string;
  retakeButton: string;
  backToGames: string;
  breadcrumbHome: string;
  breadcrumbGames: string;
  breadcrumbTitle: string;
  levels: { min: number; label: string; emoji: string }[];
  challenges: Challenge[];
  contextKeywords: string[];
  formatKeywords: string[];
  constraintKeywords: string[];
}

const allContent: Record<string, LocaleContent> = {
  fr: {
    pageTitle: 'Prompt Master',
    pageSubtitle: 'Ecrivez le meilleur prompt possible pour chaque defi. Votre prompt sera evalue sur 5 criteres. Saurez-vous atteindre le score parfait ?',
    startButton: 'Relever le defi !',
    challengeOf: 'Defi {current} sur {total}',
    challengeLabel: 'Votre mission :',
    promptPlaceholder: 'Ecrivez votre prompt ici... Soyez precis, donnez du contexte, definissez le format attendu !',
    submitButton: 'Evaluer mon prompt',
    scoreTitle: 'Evaluation de votre prompt',
    criteriaLabels: {
      length: 'Longueur suffisante',
      context: 'Contexte / Role defini',
      details: 'Details specifiques',
      format: 'Format de sortie',
      constraints: 'Contraintes definies',
    },
    criteriaDescriptions: {
      length: 'Votre prompt fait plus de 50 caracteres',
      context: 'Vous avez defini un role ou un contexte (ex: "tu es", "agis comme", "expert")',
      details: 'Votre prompt est assez detaille (plus de 100 caracteres)',
      format: 'Vous avez precise le format de sortie (liste, tableau, etapes...)',
      constraints: 'Vous avez defini des contraintes (limites, choses a eviter...)',
    },
    tipTitle: 'Conseil pour ameliorer',
    nextChallenge: 'Defi suivant',
    seeResults: 'Voir mes resultats',
    resultTitle: 'Votre score final',
    totalScore: '{score} / {total} points',
    levelLabel: 'Votre niveau :',
    shareTitle: 'Partagez votre score',
    shareText: (score: number, level: string) => `J'ai obtenu ${score}/25 au Prompt Master sur IAPME Suisse ! Mon niveau : ${level}. Et vous ?`,
    retakeButton: 'Rejouer',
    backToGames: 'Tous les jeux',
    breadcrumbHome: 'Accueil',
    breadcrumbGames: 'Jeux IA',
    breadcrumbTitle: 'Prompt Master',
    levels: [
      { min: 23, label: 'Prompt Master', emoji: '\u{1F451}' },
      { min: 18, label: 'Prompt Expert', emoji: '\u{1F3C6}' },
      { min: 11, label: 'Prompt Writer', emoji: '\u{270D}\uFE0F' },
      { min: 0, label: 'Prompt Debutant', emoji: '\u{1F331}' },
    ],
    challenges: [
      {
        task: 'Redigez un prompt pour que l\'IA ecrive un email professionnel a un client mecontent',
        hint: 'Pensez a definir le ton, le contexte du mecontentement et la solution proposee.',
      },
      {
        task: 'Redigez un prompt pour obtenir un plan marketing pour une PME de 10 employes',
        hint: 'Precisez le secteur, le budget, les objectifs et le format souhaite.',
      },
      {
        task: 'Redigez un prompt pour que l\'IA resume un document de 50 pages',
        hint: 'Definissez la longueur du resume, les points cles a extraire et le format.',
      },
      {
        task: 'Redigez un prompt pour creer un chatbot de service client',
        hint: 'Precisez le domaine, le ton, les types de questions et les limites du chatbot.',
      },
      {
        task: 'Redigez un prompt pour analyser les ventes trimestrielles',
        hint: 'Mentionnez les KPIs, le format d\'analyse souhaite et les comparaisons attendues.',
      },
    ],
    contextKeywords: ['tu es', 'agis comme', 'role', 'expert', 'en tant que', 'imagine que', 'suppose que', 'specialiste', 'professionnel', 'consultant'],
    formatKeywords: ['format', 'liste', 'tableau', 'bullet', 'etape', 'structure', 'paragraphe', 'section', 'point', 'enumere', 'organise', 'plan', 'schema'],
    constraintKeywords: ['ne pas', 'evite', 'limite', 'maximum', 'concis', 'sans', 'uniquement', 'seulement', 'interdit', 'pas plus de', 'au maximum', 'minimum'],
  },
  de: {
    pageTitle: 'Prompt Master',
    pageSubtitle: 'Schreiben Sie den bestmoglichen Prompt fur jede Herausforderung. Ihr Prompt wird anhand von 5 Kriterien bewertet. Schaffen Sie die Hochstpunktzahl?',
    startButton: 'Herausforderung annehmen!',
    challengeOf: 'Herausforderung {current} von {total}',
    challengeLabel: 'Ihre Mission:',
    promptPlaceholder: 'Schreiben Sie hier Ihren Prompt... Seien Sie prazise, geben Sie Kontext und definieren Sie das gewunschte Format!',
    submitButton: 'Prompt bewerten',
    scoreTitle: 'Bewertung Ihres Prompts',
    criteriaLabels: {
      length: 'Ausreichende Lange',
      context: 'Kontext / Rolle definiert',
      details: 'Spezifische Details',
      format: 'Ausgabeformat',
      constraints: 'Einschrankungen definiert',
    },
    criteriaDescriptions: {
      length: 'Ihr Prompt hat mehr als 50 Zeichen',
      context: 'Sie haben eine Rolle oder einen Kontext definiert (z.B. "du bist", "agiere als", "Experte")',
      details: 'Ihr Prompt ist detailliert genug (mehr als 100 Zeichen)',
      format: 'Sie haben das Ausgabeformat angegeben (Liste, Tabelle, Schritte...)',
      constraints: 'Sie haben Einschrankungen definiert (Grenzen, Vermeidungen...)',
    },
    tipTitle: 'Verbesserungstipp',
    nextChallenge: 'Nachste Herausforderung',
    seeResults: 'Ergebnisse anzeigen',
    resultTitle: 'Ihr Endergebnis',
    totalScore: '{score} / {total} Punkte',
    levelLabel: 'Ihr Niveau:',
    shareTitle: 'Teilen Sie Ihr Ergebnis',
    shareText: (score: number, level: string) => `Ich habe ${score}/25 beim Prompt Master auf IAPME Suisse erreicht! Mein Level: ${level}. Und Sie?`,
    retakeButton: 'Nochmal spielen',
    backToGames: 'Alle Spiele',
    breadcrumbHome: 'Startseite',
    breadcrumbGames: 'KI-Spiele',
    breadcrumbTitle: 'Prompt Master',
    levels: [
      { min: 23, label: 'Prompt Master', emoji: '\u{1F451}' },
      { min: 18, label: 'Prompt Expert', emoji: '\u{1F3C6}' },
      { min: 11, label: 'Prompt Writer', emoji: '\u{270D}\uFE0F' },
      { min: 0, label: 'Prompt Anfanger', emoji: '\u{1F331}' },
    ],
    challenges: [
      {
        task: 'Schreiben Sie einen Prompt, damit die KI eine professionelle E-Mail an einen unzufriedenen Kunden verfasst',
        hint: 'Denken Sie an Ton, Kontext der Unzufriedenheit und vorgeschlagene Losung.',
      },
      {
        task: 'Schreiben Sie einen Prompt fur einen Marketingplan fur ein KMU mit 10 Mitarbeitern',
        hint: 'Geben Sie Branche, Budget, Ziele und gewunschtes Format an.',
      },
      {
        task: 'Schreiben Sie einen Prompt, damit die KI ein 50-seitiges Dokument zusammenfasst',
        hint: 'Definieren Sie die Lange der Zusammenfassung, Kernpunkte und das Format.',
      },
      {
        task: 'Schreiben Sie einen Prompt zur Erstellung eines Kundenservice-Chatbots',
        hint: 'Geben Sie den Bereich, Ton, Fragetypen und Grenzen des Chatbots an.',
      },
      {
        task: 'Schreiben Sie einen Prompt zur Analyse der Quartalsumsatze',
        hint: 'Nennen Sie KPIs, gewunschtes Analyseformat und erwartete Vergleiche.',
      },
    ],
    contextKeywords: ['du bist', 'agiere als', 'rolle', 'experte', 'als', 'stell dir vor', 'angenommen', 'spezialist', 'professionell', 'berater'],
    formatKeywords: ['format', 'liste', 'tabelle', 'punkt', 'schritt', 'struktur', 'absatz', 'abschnitt', 'aufzahlung', 'gegliedert', 'plan', 'schema'],
    constraintKeywords: ['nicht', 'vermeide', 'begrenze', 'maximal', 'knapp', 'ohne', 'nur', 'lediglich', 'verboten', 'hochstens', 'mindestens'],
  },
  en: {
    pageTitle: 'Prompt Master',
    pageSubtitle: 'Write the best possible prompt for each challenge. Your prompt will be scored on 5 criteria. Can you reach a perfect score?',
    startButton: 'Take the challenge!',
    challengeOf: 'Challenge {current} of {total}',
    challengeLabel: 'Your mission:',
    promptPlaceholder: 'Write your prompt here... Be precise, give context, and define the expected format!',
    submitButton: 'Evaluate my prompt',
    scoreTitle: 'Your prompt evaluation',
    criteriaLabels: {
      length: 'Sufficient length',
      context: 'Context / Role defined',
      details: 'Specific details',
      format: 'Output format',
      constraints: 'Constraints defined',
    },
    criteriaDescriptions: {
      length: 'Your prompt is over 50 characters long',
      context: 'You defined a role or context (e.g. "you are", "act as", "expert")',
      details: 'Your prompt is detailed enough (over 100 characters)',
      format: 'You specified the output format (list, table, steps...)',
      constraints: 'You defined constraints (limits, things to avoid...)',
    },
    tipTitle: 'Improvement tip',
    nextChallenge: 'Next challenge',
    seeResults: 'See my results',
    resultTitle: 'Your final score',
    totalScore: '{score} / {total} points',
    levelLabel: 'Your level:',
    shareTitle: 'Share your score',
    shareText: (score: number, level: string) => `I scored ${score}/25 on Prompt Master at IAPME Suisse! My level: ${level}. Can you beat me?`,
    retakeButton: 'Play again',
    backToGames: 'All games',
    breadcrumbHome: 'Home',
    breadcrumbGames: 'AI Games',
    breadcrumbTitle: 'Prompt Master',
    levels: [
      { min: 23, label: 'Prompt Master', emoji: '\u{1F451}' },
      { min: 18, label: 'Prompt Expert', emoji: '\u{1F3C6}' },
      { min: 11, label: 'Prompt Writer', emoji: '\u{270D}\uFE0F' },
      { min: 0, label: 'Prompt Beginner', emoji: '\u{1F331}' },
    ],
    challenges: [
      {
        task: 'Write a prompt for the AI to compose a professional email to an unhappy client',
        hint: 'Think about the tone, the context of dissatisfaction, and the proposed solution.',
      },
      {
        task: 'Write a prompt to get a marketing plan for an SME with 10 employees',
        hint: 'Specify the industry, budget, goals, and desired format.',
      },
      {
        task: 'Write a prompt for the AI to summarize a 50-page document',
        hint: 'Define the summary length, key points to extract, and the format.',
      },
      {
        task: 'Write a prompt to create a customer service chatbot',
        hint: 'Specify the domain, tone, question types, and chatbot limitations.',
      },
      {
        task: 'Write a prompt to analyze quarterly sales',
        hint: 'Mention KPIs, desired analysis format, and expected comparisons.',
      },
    ],
    contextKeywords: ['you are', 'act as', 'role', 'expert', 'as a', 'imagine that', 'assume that', 'specialist', 'professional', 'consultant'],
    formatKeywords: ['format', 'list', 'table', 'bullet', 'step', 'structure', 'paragraph', 'section', 'point', 'enumerate', 'organize', 'plan', 'outline'],
    constraintKeywords: ['do not', 'avoid', 'limit', 'maximum', 'concise', 'without', 'only', 'solely', 'forbidden', 'no more than', 'at most', 'minimum'],
  },
  it: {
    pageTitle: 'Prompt Master',
    pageSubtitle: 'Scrivete il miglior prompt possibile per ogni sfida. Il vostro prompt sara valutato su 5 criteri. Riuscirete a ottenere il punteggio perfetto?',
    startButton: 'Accetta la sfida!',
    challengeOf: 'Sfida {current} di {total}',
    challengeLabel: 'La vostra missione:',
    promptPlaceholder: 'Scrivete il vostro prompt qui... Siate precisi, date contesto e definite il formato atteso!',
    submitButton: 'Valuta il mio prompt',
    scoreTitle: 'Valutazione del vostro prompt',
    criteriaLabels: {
      length: 'Lunghezza sufficiente',
      context: 'Contesto / Ruolo definito',
      details: 'Dettagli specifici',
      format: 'Formato di output',
      constraints: 'Vincoli definiti',
    },
    criteriaDescriptions: {
      length: 'Il vostro prompt ha piu di 50 caratteri',
      context: 'Avete definito un ruolo o contesto (es: "sei", "agisci come", "esperto")',
      details: 'Il vostro prompt e sufficientemente dettagliato (piu di 100 caratteri)',
      format: 'Avete specificato il formato di output (lista, tabella, passaggi...)',
      constraints: 'Avete definito dei vincoli (limiti, cose da evitare...)',
    },
    tipTitle: 'Consiglio per migliorare',
    nextChallenge: 'Prossima sfida',
    seeResults: 'Vedi i risultati',
    resultTitle: 'Il vostro punteggio finale',
    totalScore: '{score} / {total} punti',
    levelLabel: 'Il vostro livello:',
    shareTitle: 'Condividete il vostro punteggio',
    shareText: (score: number, level: string) => `Ho ottenuto ${score}/25 al Prompt Master su IAPME Suisse! Il mio livello: ${level}. E voi?`,
    retakeButton: 'Rigiocare',
    backToGames: 'Tutti i giochi',
    breadcrumbHome: 'Home',
    breadcrumbGames: 'Giochi IA',
    breadcrumbTitle: 'Prompt Master',
    levels: [
      { min: 23, label: 'Prompt Master', emoji: '\u{1F451}' },
      { min: 18, label: 'Prompt Expert', emoji: '\u{1F3C6}' },
      { min: 11, label: 'Prompt Writer', emoji: '\u{270D}\uFE0F' },
      { min: 0, label: 'Prompt Principiante', emoji: '\u{1F331}' },
    ],
    challenges: [
      {
        task: 'Scrivete un prompt affinche l\'IA componga un\'email professionale a un cliente scontento',
        hint: 'Pensate al tono, al contesto dell\'insoddisfazione e alla soluzione proposta.',
      },
      {
        task: 'Scrivete un prompt per ottenere un piano marketing per una PMI con 10 dipendenti',
        hint: 'Specificate il settore, il budget, gli obiettivi e il formato desiderato.',
      },
      {
        task: 'Scrivete un prompt affinche l\'IA riassuma un documento di 50 pagine',
        hint: 'Definite la lunghezza del riassunto, i punti chiave e il formato.',
      },
      {
        task: 'Scrivete un prompt per creare un chatbot di servizio clienti',
        hint: 'Precisate il dominio, il tono, i tipi di domande e i limiti del chatbot.',
      },
      {
        task: 'Scrivete un prompt per analizzare le vendite trimestrali',
        hint: 'Menzionate i KPI, il formato di analisi desiderato e i confronti attesi.',
      },
    ],
    contextKeywords: ['sei', 'agisci come', 'ruolo', 'esperto', 'in qualita di', 'immagina che', 'supponi che', 'specialista', 'professionista', 'consulente'],
    formatKeywords: ['formato', 'lista', 'tabella', 'punto', 'passo', 'struttura', 'paragrafo', 'sezione', 'elenco', 'organizza', 'piano', 'schema'],
    constraintKeywords: ['non', 'evita', 'limita', 'massimo', 'conciso', 'senza', 'solo', 'solamente', 'vietato', 'non piu di', 'al massimo', 'minimo'],
  },
};

function scorePrompt(
  prompt: string,
  contextKeywords: string[],
  formatKeywords: string[],
  constraintKeywords: string[],
): ScoreBreakdown {
  const lower = prompt.toLowerCase().trim();
  const length = lower.length > 50;
  const context = contextKeywords.some((kw) => lower.includes(kw.toLowerCase()));
  const details = lower.length > 100;
  const format = formatKeywords.some((kw) => lower.includes(kw.toLowerCase()));
  const constraints = constraintKeywords.some((kw) => lower.includes(kw.toLowerCase()));
  const total = (length ? 1 : 0) + (context ? 1 : 0) + (details ? 1 : 0) + (format ? 1 : 0) + (constraints ? 1 : 0);
  return { length, context, details, format, constraints, total };
}

function getTipForMissing(breakdown: ScoreBreakdown, c: LocaleContent): string | null {
  if (!breakdown.context) return c.criteriaDescriptions.context;
  if (!breakdown.format) return c.criteriaDescriptions.format;
  if (!breakdown.constraints) return c.criteriaDescriptions.constraints;
  if (!breakdown.details) return c.criteriaDescriptions.details;
  if (!breakdown.length) return c.criteriaDescriptions.length;
  return null;
}

export default function PromptMasterPage() {
  const locale = useLocale();
  const c = allContent[locale] || allContent.fr;
  const totalChallenges = c.challenges.length;
  const maxScore = totalChallenges * 5;

  const [state, setState] = useState<GameState>('intro');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [promptText, setPromptText] = useState('');
  const [currentBreakdown, setCurrentBreakdown] = useState<ScoreBreakdown | null>(null);
  const [scores, setScores] = useState<number[]>([]);

  const totalScore = useMemo(() => scores.reduce((a, b) => a + b, 0), [scores]);

  const level = useMemo(() => {
    return c.levels.find((l) => totalScore >= l.min) || c.levels[c.levels.length - 1];
  }, [totalScore, c.levels]);

  function handleStart() {
    setState('challenge');
    setCurrentChallenge(0);
    setPromptText('');
    setCurrentBreakdown(null);
    setScores([]);
  }

  function handleSubmit() {
    if (promptText.trim().length === 0) return;
    const breakdown = scorePrompt(promptText, c.contextKeywords, c.formatKeywords, c.constraintKeywords);
    setCurrentBreakdown(breakdown);
    setScores((prev) => [...prev, breakdown.total]);
    setState('scored');
  }

  function handleNext() {
    if (currentChallenge + 1 < totalChallenges) {
      setCurrentChallenge((n) => n + 1);
      setPromptText('');
      setCurrentBreakdown(null);
      setState('challenge');
    } else {
      setState('result');
    }
  }

  const progress = ((currentChallenge + 1) / totalChallenges) * 100;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://iapmesuisse.ch/jeux-ia/prompt-master';

  const criteriaKeys: (keyof Omit<ScoreBreakdown, 'total'>)[] = ['length', 'context', 'details', 'format', 'constraints'];

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
            <div className="mb-6 text-6xl">{'\u{1F3AF}'}</div>
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
              <span>~5 min</span>
              <span className="mx-1">{'\u2022'}</span>
              <span>5 {locale === 'fr' ? 'defis' : locale === 'de' ? 'Herausforderungen' : locale === 'it' ? 'sfide' : 'challenges'}</span>
            </div>

            {/* Scoring preview */}
            <div className="mx-auto mt-8 max-w-md rounded-xl bg-white p-6 text-left shadow-md">
              <p className="mb-3 text-sm font-bold text-[#1B2A4A]">{c.scoreTitle} (max 5 pts) :</p>
              <ul className="space-y-2">
                {criteriaKeys.map((key) => (
                  <li key={key} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F5F5F5] text-xs font-bold text-[#1B2A4A]">
                      1
                    </span>
                    {c.criteriaLabels[key]}
                  </li>
                ))}
              </ul>
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

      {/* CHALLENGE */}
      {state === 'challenge' && (
        <section className="bg-[#F5F5F5] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-2xl">
            {/* Progress */}
            <div className="mb-2 flex items-center justify-between text-sm font-medium text-gray-500">
              <span>
                {c.challengeOf
                  .replace('{current}', String(currentChallenge + 1))
                  .replace('{total}', String(totalChallenges))}
              </span>
              <span className="font-bold text-[#1B2A4A]">
                {scores.reduce((a, b) => a + b, 0)} pts
              </span>
            </div>
            <div className="mb-8 h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-[#FF0000] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Challenge card */}
            <div className="rounded-2xl bg-white p-8 shadow-lg sm:p-10">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#FF0000]">
                {c.challengeLabel}
              </p>
              <h2 className="text-xl font-bold text-[#1B2A4A] sm:text-2xl">
                {c.challenges[currentChallenge].task}
              </h2>

              {/* Hint */}
              <div className="mt-4 flex items-start gap-2 rounded-lg bg-blue-50 p-3">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-blue-700">{c.challenges[currentChallenge].hint}</p>
              </div>

              {/* Textarea */}
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder={c.promptPlaceholder}
                rows={6}
                className="mt-6 w-full rounded-xl border-2 border-gray-200 p-4 text-[#1B2A4A] placeholder-gray-400 transition-colors focus:border-[#1B2A4A] focus:outline-none focus:ring-0"
              />

              {/* Char counter */}
              <div className="mt-2 flex justify-between text-xs text-gray-400">
                <span>{promptText.length} {locale === 'fr' ? 'caracteres' : locale === 'de' ? 'Zeichen' : locale === 'it' ? 'caratteri' : 'characters'}</span>
                <span
                  className={
                    promptText.length > 100
                      ? 'text-green-500 font-semibold'
                      : promptText.length > 50
                        ? 'text-yellow-500'
                        : ''
                  }
                >
                  {promptText.length > 100
                    ? '\u2713 '
                    : promptText.length > 50
                      ? '~ '
                      : ''}
                  {promptText.length > 100 ? 'Detaille' : promptText.length > 50 ? 'Correct' : 'Court'}
                </span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={promptText.trim().length === 0}
                className="mt-6 w-full rounded-xl bg-[#1B2A4A] px-8 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-[#2a3d66] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
              >
                {c.submitButton}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SCORED */}
      {state === 'scored' && currentBreakdown && (
        <section className="bg-[#F5F5F5] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-2xl">
            {/* Progress */}
            <div className="mb-2 flex items-center justify-between text-sm font-medium text-gray-500">
              <span>
                {c.challengeOf
                  .replace('{current}', String(currentChallenge + 1))
                  .replace('{total}', String(totalChallenges))}
              </span>
              <span className="font-bold text-[#1B2A4A]">
                {scores.reduce((a, b) => a + b, 0)} pts
              </span>
            </div>
            <div className="mb-8 h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-[#FF0000] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Score card */}
            <div className="rounded-2xl bg-white p-8 shadow-lg sm:p-10">
              <div className="mb-6 text-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  {c.scoreTitle}
                </p>
                <p className="mt-2 text-4xl font-extrabold text-[#1B2A4A]">
                  {currentBreakdown.total} / 5
                </p>
              </div>

              {/* Criteria breakdown */}
              <div className="space-y-3">
                {criteriaKeys.map((key) => {
                  const passed = currentBreakdown[key];
                  return (
                    <div
                      key={key}
                      className={`flex items-center gap-3 rounded-lg p-3 ${
                        passed ? 'bg-green-50' : 'bg-red-50'
                      }`}
                    >
                      <span className="text-xl">
                        {passed ? '\u2705' : '\u274C'}
                      </span>
                      <div>
                        <p className={`text-sm font-semibold ${passed ? 'text-green-700' : 'text-red-700'}`}>
                          {c.criteriaLabels[key]}
                        </p>
                        <p className="text-xs text-gray-500">{c.criteriaDescriptions[key]}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tip if not perfect */}
              {currentBreakdown.total < 5 && (
                <div className="mt-6 rounded-lg border border-yellow-300 bg-yellow-50 p-4">
                  <p className="mb-1 text-sm font-bold text-yellow-800">
                    {'\u{1F4A1}'} {c.tipTitle}
                  </p>
                  <p className="text-sm text-yellow-700">
                    {getTipForMissing(currentBreakdown, c)}
                  </p>
                </div>
              )}

              {/* User's prompt */}
              <div className="mt-6 rounded-xl bg-[#F5F5F5] p-4">
                <p className="mb-1 text-xs font-semibold text-gray-500">Votre prompt :</p>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{promptText}</p>
              </div>

              <button
                onClick={handleNext}
                className="mt-8 w-full rounded-xl bg-[#1B2A4A] px-8 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-[#2a3d66] hover:shadow-md"
              >
                {currentChallenge + 1 < totalChallenges ? c.nextChallenge : c.seeResults}
                <svg className="ml-2 inline-block h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
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
                <p className="text-4xl font-extrabold text-[#1B2A4A]">{totalScore}</p>
                <p className="text-sm font-medium text-gray-500">/ {maxScore}</p>
              </div>
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-gray-500">
              {c.levelLabel}
            </p>
            <p
              className={`mt-1 text-2xl font-extrabold ${
                totalScore >= 23
                  ? 'text-yellow-600'
                  : totalScore >= 18
                    ? 'text-green-600'
                    : totalScore >= 11
                      ? 'text-blue-600'
                      : 'text-gray-600'
              }`}
            >
              {level.label}
            </p>

            {/* Score bar */}
            <div className="mx-auto mt-6 max-w-xs">
              <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    totalScore >= 23
                      ? 'bg-yellow-500'
                      : totalScore >= 18
                        ? 'bg-green-500'
                        : totalScore >= 11
                          ? 'bg-blue-500'
                          : 'bg-gray-400'
                  }`}
                  style={{ width: `${(totalScore / maxScore) * 100}%` }}
                />
              </div>
            </div>

            {/* Per-challenge scores */}
            <div className="mx-auto mt-8 max-w-sm">
              <div className="flex justify-center gap-2">
                {scores.map((s, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold ${
                        s >= 4
                          ? 'bg-green-100 text-green-700'
                          : s >= 2
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {s}
                    </div>
                    <span className="mt-1 text-xs text-gray-400">#{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-10 rounded-2xl bg-white p-8 shadow-lg">
              <p className="mb-4 font-semibold text-[#1B2A4A]">{c.shareTitle}</p>
              <div className="flex justify-center">
                <ShareButtons
                  url={shareUrl}
                  text={c.shareText(totalScore, level.label)}
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
