'use client';

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';

type QuizState = 'intro' | 'quiz' | 'result';
type AnswerLetter = 'A' | 'B' | 'C' | 'D';

interface Question {
  question: string;
  answers: { letter: AnswerLetter; text: string }[];
}

interface ResultProfile {
  tool: string;
  emoji: string;
  color: string;
  colorBg: string;
  colorBorder: string;
  description: string;
  tips: string[];
}

const translations: Record<string, {
  pageTitle: string;
  pageSubtitle: string;
  startButton: string;
  questionOf: string;
  nextQuestion: string;
  resultTitle: string;
  yourTool: string;
  tipsTitle: string;
  shareText: (tool: string) => string;
  shareTitle: string;
  retakeButton: string;
  ctaText: string;
  ctaButton: string;
  breadcrumbHome: string;
  breadcrumbQuiz: string;
  breadcrumbTitle: string;
  questions: Question[];
  results: Record<AnswerLetter, ResultProfile>;
}> = {
  fr: {
    pageTitle: 'Quel outil IA est fait pour vous ?',
    pageSubtitle: 'Repondez a 8 questions pour decouvrir l\'outil d\'intelligence artificielle qui correspond le mieux a votre profil professionnel.',
    startButton: 'Commencer le quiz',
    questionOf: 'Question {current} sur {total}',
    nextQuestion: 'Question suivante',
    resultTitle: 'Votre outil IA ideal :',
    yourTool: 'Vous etes fait pour',
    tipsTitle: '3 conseils pour bien utiliser cet outil',
    shareText: (tool: string) => `Je suis fait pour ${tool} ! Et vous, quel outil IA vous correspond ?`,
    shareTitle: 'Partager votre resultat',
    retakeButton: 'Refaire le quiz',
    ctaText: 'Decouvrez tous les outils IA recommandes pour les PME suisses',
    ctaButton: 'Voir tous les outils IA',
    breadcrumbHome: 'Accueil',
    breadcrumbQuiz: 'Quiz',
    breadcrumbTitle: 'Quel outil IA',
    questions: [
      {
        question: 'Quelle est votre priorite au travail ?',
        answers: [
          { letter: 'A', text: 'Creativite' },
          { letter: 'B', text: 'Efficacite' },
          { letter: 'C', text: 'Communication' },
          { letter: 'D', text: 'Analyse' },
        ],
      },
      {
        question: 'Comment preferez-vous travailler ?',
        answers: [
          { letter: 'A', text: 'Seul, en profondeur' },
          { letter: 'B', text: 'En equipe, rapidement' },
          { letter: 'C', text: 'Avec des clients' },
          { letter: 'D', text: 'Avec des donnees' },
        ],
      },
      {
        question: 'Quel type de contenu creez-vous le plus ?',
        answers: [
          { letter: 'A', text: 'Textes / articles' },
          { letter: 'B', text: 'Presentations / rapports' },
          { letter: 'C', text: 'Emails / messages' },
          { letter: 'D', text: 'Tableaux / analyses' },
        ],
      },
      {
        question: 'Votre plus grand defi quotidien ?',
        answers: [
          { letter: 'A', text: 'Trouver l\'inspiration' },
          { letter: 'B', text: 'Gagner du temps' },
          { letter: 'C', text: 'Gerer les langues' },
          { letter: 'D', text: 'Prendre des decisions' },
        ],
      },
      {
        question: 'Quel super-pouvoir voudriez-vous ?',
        answers: [
          { letter: 'A', text: 'Ecrire 10x plus vite' },
          { letter: 'B', text: 'Automatiser tout' },
          { letter: 'C', text: 'Parler toutes les langues' },
          { letter: 'D', text: 'Predire le futur' },
        ],
      },
      {
        question: 'Votre secteur d\'activite ?',
        answers: [
          { letter: 'A', text: 'Marketing / Communication' },
          { letter: 'B', text: 'Administration / Gestion' },
          { letter: 'C', text: 'Commerce / Vente' },
          { letter: 'D', text: 'Finance / Consulting' },
        ],
      },
      {
        question: 'Votre rapport a la technologie ?',
        answers: [
          { letter: 'A', text: 'J\'adore tester les nouveautes' },
          { letter: 'B', text: 'Je veux que ca marche, c\'est tout' },
          { letter: 'C', text: 'Je suis pragmatique' },
          { letter: 'D', text: 'Je suis data-driven' },
        ],
      },
      {
        question: 'Votre budget IA mensuel ideal ?',
        answers: [
          { letter: 'A', text: '0-20 CHF' },
          { letter: 'B', text: '20-50 CHF' },
          { letter: 'C', text: '50-100 CHF' },
          { letter: 'D', text: '100+ CHF' },
        ],
      },
    ],
    results: {
      A: {
        tool: 'ChatGPT',
        emoji: '\u{1F3A8}',
        color: 'text-green-600',
        colorBg: 'bg-green-50',
        colorBorder: 'border-green-500',
        description: 'Vous etes un creatif ! ChatGPT est votre allie ideal pour rediger, brainstormer et creer du contenu.',
        tips: [
          'Utilisez ChatGPT pour generer des brouillons d\'articles et de posts LinkedIn',
          'Creez des templates de prompts pour vos taches repetitives',
          'Combinez ChatGPT avec DALL-E pour vos visuels marketing',
        ],
      },
      B: {
        tool: 'Zapier / Make',
        emoji: '\u26A1',
        color: 'text-orange-600',
        colorBg: 'bg-orange-50',
        colorBorder: 'border-orange-500',
        description: 'Vous etes un optimiseur ! Les outils d\'automatisation comme Zapier ou Make vont revolutionner votre quotidien.',
        tips: [
          'Commencez par automatiser vos taches email les plus repetitives',
          'Connectez votre CRM a vos outils de communication',
          'Creez des workflows qui se declenchent automatiquement',
        ],
      },
      C: {
        tool: 'DeepL',
        emoji: '\u{1F30D}',
        color: 'text-blue-600',
        colorBg: 'bg-blue-50',
        colorBorder: 'border-blue-500',
        description: 'Vous etes un communicateur ! DeepL et les outils de traduction IA sont faits pour vous, surtout en Suisse multilingue.',
        tips: [
          'Utilisez DeepL Pro pour traduire vos documents professionnels',
          'Integrez DeepL a votre navigateur pour traduire en temps reel',
          'Combinez DeepL avec un relecteur pour un resultat parfait',
        ],
      },
      D: {
        tool: 'Claude',
        emoji: '\u{1F9E0}',
        color: 'text-purple-600',
        colorBg: 'bg-purple-50',
        colorBorder: 'border-purple-500',
        description: 'Vous etes un analyste ! Claude d\'Anthropic excelle dans l\'analyse approfondie et le raisonnement.',
        tips: [
          'Utilisez Claude pour analyser des documents longs et complexes',
          'Demandez-lui de structurer vos donnees en tableaux clairs',
          'Exploitez sa capacite de raisonnement pour vos decisions strategiques',
        ],
      },
    },
  },
  de: {
    pageTitle: 'Welches KI-Tool passt zu Ihnen?',
    pageSubtitle: 'Beantworten Sie 8 Fragen und entdecken Sie das KI-Tool, das am besten zu Ihrem beruflichen Profil passt.',
    startButton: 'Quiz starten',
    questionOf: 'Frage {current} von {total}',
    nextQuestion: 'Nachste Frage',
    resultTitle: 'Ihr ideales KI-Tool:',
    yourTool: 'Ihr perfektes Tool ist',
    tipsTitle: '3 Tipps zur optimalen Nutzung',
    shareText: (tool: string) => `Mein ideales KI-Tool ist ${tool}! Welches passt zu dir?`,
    shareTitle: 'Ergebnis teilen',
    retakeButton: 'Quiz wiederholen',
    ctaText: 'Entdecken Sie alle empfohlenen KI-Tools fur Schweizer KMU',
    ctaButton: 'Alle KI-Tools ansehen',
    breadcrumbHome: 'Startseite',
    breadcrumbQuiz: 'Quiz',
    breadcrumbTitle: 'Welches KI-Tool',
    questions: [
      {
        question: 'Was ist Ihre Prioritat bei der Arbeit?',
        answers: [
          { letter: 'A', text: 'Kreativitat' },
          { letter: 'B', text: 'Effizienz' },
          { letter: 'C', text: 'Kommunikation' },
          { letter: 'D', text: 'Analyse' },
        ],
      },
      {
        question: 'Wie arbeiten Sie am liebsten?',
        answers: [
          { letter: 'A', text: 'Allein, in die Tiefe' },
          { letter: 'B', text: 'Im Team, schnell' },
          { letter: 'C', text: 'Mit Kunden' },
          { letter: 'D', text: 'Mit Daten' },
        ],
      },
      {
        question: 'Welche Art von Inhalten erstellen Sie am meisten?',
        answers: [
          { letter: 'A', text: 'Texte / Artikel' },
          { letter: 'B', text: 'Prasentationen / Berichte' },
          { letter: 'C', text: 'E-Mails / Nachrichten' },
          { letter: 'D', text: 'Tabellen / Analysen' },
        ],
      },
      {
        question: 'Ihre grosste tagliche Herausforderung?',
        answers: [
          { letter: 'A', text: 'Inspiration finden' },
          { letter: 'B', text: 'Zeit sparen' },
          { letter: 'C', text: 'Sprachen managen' },
          { letter: 'D', text: 'Entscheidungen treffen' },
        ],
      },
      {
        question: 'Welche Superkraft hatten Sie gerne?',
        answers: [
          { letter: 'A', text: '10x schneller schreiben' },
          { letter: 'B', text: 'Alles automatisieren' },
          { letter: 'C', text: 'Alle Sprachen sprechen' },
          { letter: 'D', text: 'Die Zukunft vorhersagen' },
        ],
      },
      {
        question: 'Ihre Branche?',
        answers: [
          { letter: 'A', text: 'Marketing / Kommunikation' },
          { letter: 'B', text: 'Verwaltung / Management' },
          { letter: 'C', text: 'Handel / Verkauf' },
          { letter: 'D', text: 'Finanzen / Beratung' },
        ],
      },
      {
        question: 'Ihr Verhaltnis zur Technologie?',
        answers: [
          { letter: 'A', text: 'Ich teste gerne Neues' },
          { letter: 'B', text: 'Es soll einfach funktionieren' },
          { letter: 'C', text: 'Ich bin pragmatisch' },
          { letter: 'D', text: 'Ich bin datengetrieben' },
        ],
      },
      {
        question: 'Ihr ideales monatliches KI-Budget?',
        answers: [
          { letter: 'A', text: '0-20 CHF' },
          { letter: 'B', text: '20-50 CHF' },
          { letter: 'C', text: '50-100 CHF' },
          { letter: 'D', text: '100+ CHF' },
        ],
      },
    ],
    results: {
      A: {
        tool: 'ChatGPT',
        emoji: '\u{1F3A8}',
        color: 'text-green-600',
        colorBg: 'bg-green-50',
        colorBorder: 'border-green-500',
        description: 'Sie sind ein Kreativer! ChatGPT ist Ihr idealer Partner zum Schreiben, Brainstormen und Erstellen von Inhalten.',
        tips: [
          'Nutzen Sie ChatGPT fur Artikelentwurfe und LinkedIn-Posts',
          'Erstellen Sie Prompt-Vorlagen fur wiederkehrende Aufgaben',
          'Kombinieren Sie ChatGPT mit DALL-E fur Marketing-Visuals',
        ],
      },
      B: {
        tool: 'Zapier / Make',
        emoji: '\u26A1',
        color: 'text-orange-600',
        colorBg: 'bg-orange-50',
        colorBorder: 'border-orange-500',
        description: 'Sie sind ein Optimierer! Automatisierungstools wie Zapier oder Make werden Ihren Alltag revolutionieren.',
        tips: [
          'Beginnen Sie mit der Automatisierung Ihrer haufigsten E-Mail-Aufgaben',
          'Verbinden Sie Ihr CRM mit Ihren Kommunikationstools',
          'Erstellen Sie Workflows, die sich automatisch auslosen',
        ],
      },
      C: {
        tool: 'DeepL',
        emoji: '\u{1F30D}',
        color: 'text-blue-600',
        colorBg: 'bg-blue-50',
        colorBorder: 'border-blue-500',
        description: 'Sie sind ein Kommunikator! DeepL und KI-Ubersetzungstools sind perfekt fur Sie, besonders in der mehrsprachigen Schweiz.',
        tips: [
          'Nutzen Sie DeepL Pro fur professionelle Dokumentubersetzungen',
          'Integrieren Sie DeepL in Ihren Browser fur Echtzeit-Ubersetzungen',
          'Kombinieren Sie DeepL mit einem Lektor fur perfekte Ergebnisse',
        ],
      },
      D: {
        tool: 'Claude',
        emoji: '\u{1F9E0}',
        color: 'text-purple-600',
        colorBg: 'bg-purple-50',
        colorBorder: 'border-purple-500',
        description: 'Sie sind ein Analyst! Claude von Anthropic glänzt bei tiefgehender Analyse und Schlussfolgerungen.',
        tips: [
          'Nutzen Sie Claude zur Analyse langer und komplexer Dokumente',
          'Lassen Sie Daten in klare Tabellen strukturieren',
          'Nutzen Sie die Schlussfolgerungsfahigkeit fur strategische Entscheidungen',
        ],
      },
    },
  },
  en: {
    pageTitle: 'Which AI tool is right for you?',
    pageSubtitle: 'Answer 8 questions to discover the AI tool that best matches your professional profile.',
    startButton: 'Start the quiz',
    questionOf: 'Question {current} of {total}',
    nextQuestion: 'Next question',
    resultTitle: 'Your ideal AI tool:',
    yourTool: 'You are made for',
    tipsTitle: '3 tips to get the most out of this tool',
    shareText: (tool: string) => `My ideal AI tool is ${tool}! Which one matches you?`,
    shareTitle: 'Share your result',
    retakeButton: 'Retake the quiz',
    ctaText: 'Discover all recommended AI tools for Swiss SMEs',
    ctaButton: 'See all AI tools',
    breadcrumbHome: 'Home',
    breadcrumbQuiz: 'Quiz',
    breadcrumbTitle: 'Which AI tool',
    questions: [
      {
        question: 'What is your work priority?',
        answers: [
          { letter: 'A', text: 'Creativity' },
          { letter: 'B', text: 'Efficiency' },
          { letter: 'C', text: 'Communication' },
          { letter: 'D', text: 'Analysis' },
        ],
      },
      {
        question: 'How do you prefer to work?',
        answers: [
          { letter: 'A', text: 'Alone, in depth' },
          { letter: 'B', text: 'In a team, quickly' },
          { letter: 'C', text: 'With clients' },
          { letter: 'D', text: 'With data' },
        ],
      },
      {
        question: 'What type of content do you create the most?',
        answers: [
          { letter: 'A', text: 'Texts / articles' },
          { letter: 'B', text: 'Presentations / reports' },
          { letter: 'C', text: 'Emails / messages' },
          { letter: 'D', text: 'Spreadsheets / analyses' },
        ],
      },
      {
        question: 'Your biggest daily challenge?',
        answers: [
          { letter: 'A', text: 'Finding inspiration' },
          { letter: 'B', text: 'Saving time' },
          { letter: 'C', text: 'Managing languages' },
          { letter: 'D', text: 'Making decisions' },
        ],
      },
      {
        question: 'What superpower would you want?',
        answers: [
          { letter: 'A', text: 'Write 10x faster' },
          { letter: 'B', text: 'Automate everything' },
          { letter: 'C', text: 'Speak every language' },
          { letter: 'D', text: 'Predict the future' },
        ],
      },
      {
        question: 'Your industry?',
        answers: [
          { letter: 'A', text: 'Marketing / Communications' },
          { letter: 'B', text: 'Administration / Management' },
          { letter: 'C', text: 'Sales / Commerce' },
          { letter: 'D', text: 'Finance / Consulting' },
        ],
      },
      {
        question: 'Your relationship with technology?',
        answers: [
          { letter: 'A', text: 'I love trying new things' },
          { letter: 'B', text: 'I just want it to work' },
          { letter: 'C', text: 'I am pragmatic' },
          { letter: 'D', text: 'I am data-driven' },
        ],
      },
      {
        question: 'Your ideal monthly AI budget?',
        answers: [
          { letter: 'A', text: '0-20 CHF' },
          { letter: 'B', text: '20-50 CHF' },
          { letter: 'C', text: '50-100 CHF' },
          { letter: 'D', text: '100+ CHF' },
        ],
      },
    ],
    results: {
      A: {
        tool: 'ChatGPT',
        emoji: '\u{1F3A8}',
        color: 'text-green-600',
        colorBg: 'bg-green-50',
        colorBorder: 'border-green-500',
        description: 'You are a creative! ChatGPT is your ideal ally for writing, brainstorming, and creating content.',
        tips: [
          'Use ChatGPT to generate drafts for articles and LinkedIn posts',
          'Create prompt templates for your repetitive tasks',
          'Combine ChatGPT with DALL-E for your marketing visuals',
        ],
      },
      B: {
        tool: 'Zapier / Make',
        emoji: '\u26A1',
        color: 'text-orange-600',
        colorBg: 'bg-orange-50',
        colorBorder: 'border-orange-500',
        description: 'You are an optimizer! Automation tools like Zapier or Make will revolutionize your daily workflow.',
        tips: [
          'Start by automating your most repetitive email tasks',
          'Connect your CRM to your communication tools',
          'Create workflows that trigger automatically',
        ],
      },
      C: {
        tool: 'DeepL',
        emoji: '\u{1F30D}',
        color: 'text-blue-600',
        colorBg: 'bg-blue-50',
        colorBorder: 'border-blue-500',
        description: 'You are a communicator! DeepL and AI translation tools are made for you, especially in multilingual Switzerland.',
        tips: [
          'Use DeepL Pro to translate your professional documents',
          'Integrate DeepL into your browser for real-time translation',
          'Combine DeepL with a proofreader for perfect results',
        ],
      },
      D: {
        tool: 'Claude',
        emoji: '\u{1F9E0}',
        color: 'text-purple-600',
        colorBg: 'bg-purple-50',
        colorBorder: 'border-purple-500',
        description: 'You are an analyst! Claude by Anthropic excels at deep analysis and reasoning.',
        tips: [
          'Use Claude to analyze long and complex documents',
          'Ask it to structure your data into clear tables',
          'Leverage its reasoning ability for strategic decisions',
        ],
      },
    },
  },
  it: {
    pageTitle: 'Quale strumento IA fa per voi?',
    pageSubtitle: 'Rispondete a 8 domande per scoprire lo strumento di intelligenza artificiale piu adatto al vostro profilo professionale.',
    startButton: 'Inizia il quiz',
    questionOf: 'Domanda {current} di {total}',
    nextQuestion: 'Prossima domanda',
    resultTitle: 'Il vostro strumento IA ideale:',
    yourTool: 'Siete fatti per',
    tipsTitle: '3 consigli per utilizzare al meglio questo strumento',
    shareText: (tool: string) => `Il mio strumento IA ideale e ${tool}! E il vostro?`,
    shareTitle: 'Condividi il risultato',
    retakeButton: 'Rifai il quiz',
    ctaText: 'Scoprite tutti gli strumenti IA consigliati per le PMI svizzere',
    ctaButton: 'Vedi tutti gli strumenti IA',
    breadcrumbHome: 'Home',
    breadcrumbQuiz: 'Quiz',
    breadcrumbTitle: 'Quale strumento IA',
    questions: [
      {
        question: 'Qual e la vostra priorita sul lavoro?',
        answers: [
          { letter: 'A', text: 'Creativita' },
          { letter: 'B', text: 'Efficienza' },
          { letter: 'C', text: 'Comunicazione' },
          { letter: 'D', text: 'Analisi' },
        ],
      },
      {
        question: 'Come preferite lavorare?',
        answers: [
          { letter: 'A', text: 'Da soli, in profondita' },
          { letter: 'B', text: 'In team, rapidamente' },
          { letter: 'C', text: 'Con i clienti' },
          { letter: 'D', text: 'Con i dati' },
        ],
      },
      {
        question: 'Che tipo di contenuti create di piu?',
        answers: [
          { letter: 'A', text: 'Testi / articoli' },
          { letter: 'B', text: 'Presentazioni / rapporti' },
          { letter: 'C', text: 'Email / messaggi' },
          { letter: 'D', text: 'Tabelle / analisi' },
        ],
      },
      {
        question: 'La vostra piu grande sfida quotidiana?',
        answers: [
          { letter: 'A', text: 'Trovare l\'ispirazione' },
          { letter: 'B', text: 'Risparmiare tempo' },
          { letter: 'C', text: 'Gestire le lingue' },
          { letter: 'D', text: 'Prendere decisioni' },
        ],
      },
      {
        question: 'Quale superpotere vorreste?',
        answers: [
          { letter: 'A', text: 'Scrivere 10 volte piu veloce' },
          { letter: 'B', text: 'Automatizzare tutto' },
          { letter: 'C', text: 'Parlare tutte le lingue' },
          { letter: 'D', text: 'Prevedere il futuro' },
        ],
      },
      {
        question: 'Il vostro settore di attivita?',
        answers: [
          { letter: 'A', text: 'Marketing / Comunicazione' },
          { letter: 'B', text: 'Amministrazione / Gestione' },
          { letter: 'C', text: 'Commercio / Vendita' },
          { letter: 'D', text: 'Finanza / Consulenza' },
        ],
      },
      {
        question: 'Il vostro rapporto con la tecnologia?',
        answers: [
          { letter: 'A', text: 'Adoro testare le novita' },
          { letter: 'B', text: 'Voglio che funzioni, punto' },
          { letter: 'C', text: 'Sono pragmatico' },
          { letter: 'D', text: 'Sono data-driven' },
        ],
      },
      {
        question: 'Il vostro budget IA mensile ideale?',
        answers: [
          { letter: 'A', text: '0-20 CHF' },
          { letter: 'B', text: '20-50 CHF' },
          { letter: 'C', text: '50-100 CHF' },
          { letter: 'D', text: '100+ CHF' },
        ],
      },
    ],
    results: {
      A: {
        tool: 'ChatGPT',
        emoji: '\u{1F3A8}',
        color: 'text-green-600',
        colorBg: 'bg-green-50',
        colorBorder: 'border-green-500',
        description: 'Siete dei creativi! ChatGPT e il vostro alleato ideale per scrivere, fare brainstorming e creare contenuti.',
        tips: [
          'Usate ChatGPT per generare bozze di articoli e post LinkedIn',
          'Create modelli di prompt per le vostre attivita ripetitive',
          'Combinate ChatGPT con DALL-E per i vostri visual marketing',
        ],
      },
      B: {
        tool: 'Zapier / Make',
        emoji: '\u26A1',
        color: 'text-orange-600',
        colorBg: 'bg-orange-50',
        colorBorder: 'border-orange-500',
        description: 'Siete degli ottimizzatori! Strumenti di automazione come Zapier o Make rivoluzioneranno il vostro quotidiano.',
        tips: [
          'Iniziate automatizzando le attivita email piu ripetitive',
          'Collegate il vostro CRM ai vostri strumenti di comunicazione',
          'Create workflow che si attivano automaticamente',
        ],
      },
      C: {
        tool: 'DeepL',
        emoji: '\u{1F30D}',
        color: 'text-blue-600',
        colorBg: 'bg-blue-50',
        colorBorder: 'border-blue-500',
        description: 'Siete dei comunicatori! DeepL e gli strumenti di traduzione IA sono fatti per voi, soprattutto nella Svizzera multilingue.',
        tips: [
          'Usate DeepL Pro per tradurre i vostri documenti professionali',
          'Integrate DeepL nel browser per traduzioni in tempo reale',
          'Combinate DeepL con un correttore per risultati perfetti',
        ],
      },
      D: {
        tool: 'Claude',
        emoji: '\u{1F9E0}',
        color: 'text-purple-600',
        colorBg: 'bg-purple-50',
        colorBorder: 'border-purple-500',
        description: 'Siete degli analisti! Claude di Anthropic eccelle nell\'analisi approfondita e nel ragionamento.',
        tips: [
          'Usate Claude per analizzare documenti lunghi e complessi',
          'Chiedete di strutturare i dati in tabelle chiare',
          'Sfruttate la capacita di ragionamento per decisioni strategiche',
        ],
      },
    },
  },
};

function getWinningLetter(answers: AnswerLetter[]): AnswerLetter {
  const counts: Record<AnswerLetter, number> = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((a) => counts[a]++);
  let maxLetter: AnswerLetter = 'A';
  let maxCount = 0;
  (Object.keys(counts) as AnswerLetter[]).forEach((letter) => {
    if (counts[letter] > maxCount) {
      maxCount = counts[letter];
      maxLetter = letter;
    }
  });
  return maxLetter;
}

export default function QuelOutilIAPage() {
  const locale = useLocale();
  const t = translations[locale] || translations.fr;

  const [state, setState] = useState<QuizState>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<AnswerLetter[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerLetter | null>(null);

  const result = useMemo(() => {
    if (state !== 'result') return null;
    const winner = getWinningLetter(answers);
    return t.results[winner];
  }, [state, answers, t]);

  function handleStart() {
    setState('quiz');
    setCurrentQ(0);
    setAnswers([]);
    setSelectedAnswer(null);
  }

  function handleAnswer(letter: AnswerLetter) {
    setSelectedAnswer(letter);
    const newAnswers = [...answers, letter];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQ + 1 < t.questions.length) {
        setCurrentQ(currentQ + 1);
        setSelectedAnswer(null);
      } else {
        setState('result');
      }
    }, 400);
  }

  const progress = t.questions.length > 0 ? ((currentQ + 1) / t.questions.length) * 100 : 0;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://iapmesuisse.ch/quiz/quel-outil-ia';

  return (
    <>
      <section className="bg-[#F5F5F5] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { label: t.breadcrumbHome, href: '/' },
              { label: t.breadcrumbQuiz },
              { label: t.breadcrumbTitle },
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
              {t.pageTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
              {t.pageSubtitle}
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>~2 min</span>
              <span className="mx-1">{'\u2022'}</span>
              <span>8 questions</span>
            </div>
            <button
              onClick={handleStart}
              className="mt-10 inline-flex items-center justify-center rounded-xl bg-[#FF0000] px-10 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:bg-red-700 hover:shadow-xl hover:-translate-y-0.5"
            >
              {t.startButton}
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </section>
      )}

      {/* QUIZ */}
      {state === 'quiz' && (
        <section className="bg-[#F5F5F5] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-2xl">
            {/* Progress bar */}
            <div className="mb-2 text-center text-sm font-medium text-gray-500">
              {t.questionOf
                .replace('{current}', String(currentQ + 1))
                .replace('{total}', String(t.questions.length))}
            </div>
            <div className="mb-8 h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-[#FF0000] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Question card */}
            <div className="rounded-2xl bg-white p-8 shadow-lg sm:p-10">
              <h2 className="mb-8 text-center text-xl font-bold text-[#1B2A4A] sm:text-2xl">
                {t.questions[currentQ].question}
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                {t.questions[currentQ].answers.map((answer) => {
                  const isSelected = selectedAnswer === answer.letter;
                  return (
                    <button
                      key={answer.letter}
                      onClick={() => !selectedAnswer && handleAnswer(answer.letter)}
                      disabled={selectedAnswer !== null}
                      className={`group relative flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-[#FF0000] bg-red-50 shadow-md'
                          : selectedAnswer
                            ? 'cursor-not-allowed border-gray-200 opacity-50'
                            : 'border-gray-200 bg-white hover:border-[#1B2A4A] hover:shadow-md'
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                          isSelected
                            ? 'bg-[#FF0000] text-white'
                            : 'bg-[#F5F5F5] text-[#1B2A4A] group-hover:bg-[#1B2A4A] group-hover:text-white'
                        }`}
                      >
                        {answer.letter}
                      </span>
                      <span className="font-medium text-[#1B2A4A]">{answer.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* RESULT */}
      {state === 'result' && result && (
        <section className="bg-[#F5F5F5] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
                {t.resultTitle}
              </p>
            </div>

            {/* Big result card */}
            <div className={`mt-4 rounded-2xl border-2 ${result.colorBorder} ${result.colorBg} p-8 text-center shadow-lg sm:p-10`}>
              <div className="mb-4 text-7xl">{result.emoji}</div>
              <h2 className={`text-3xl font-extrabold sm:text-4xl ${result.color}`}>
                {result.tool}
              </h2>
              <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-gray-700">
                {result.description}
              </p>
            </div>

            {/* Tips */}
            <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">
              <h3 className="mb-6 text-lg font-bold text-[#1B2A4A]">{t.tipsTitle}</h3>
              <ul className="space-y-4">
                {result.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1B2A4A] text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Share */}
            <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-lg">
              <p className="mb-4 font-semibold text-[#1B2A4A]">{t.shareTitle}</p>
              <div className="flex justify-center">
                <ShareButtons
                  url={shareUrl}
                  text={t.shareText(result.tool)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <button
                onClick={handleStart}
                className="inline-flex items-center justify-center rounded-xl border-2 border-[#1B2A4A] px-8 py-3 font-semibold text-[#1B2A4A] transition-all hover:bg-[#1B2A4A] hover:text-white"
              >
                {t.retakeButton}
              </button>
              <Link
                href="/outils-ia"
                className="inline-flex items-center justify-center rounded-xl bg-[#FF0000] px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-red-700"
              >
                {t.ctaButton}
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
