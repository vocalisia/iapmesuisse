'use client';

import { useLocale } from 'next-intl';
import QuizEngine, { type QuizQuestion } from '@/components/QuizEngine';
import QuizResult from '@/components/QuizResult';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useState } from 'react';

/* ─────────── Questions per locale ─────────── */

const questionsFR: QuizQuestion[] = [
  {
    id: 1,
    question: "Votre entreprise utilise-t-elle déjà des outils d'IA ?",
    options: [
      { label: 'Pas du tout', value: 'q1_0', points: 0 },
      { label: 'Quelques outils basiques', value: 'q1_1', points: 1 },
      { label: 'Régulièrement', value: 'q1_2', points: 2 },
      { label: "C'est au coeur de nos process", value: 'q1_3', points: 3 },
    ],
  },
  {
    id: 2,
    question: "Quel est votre budget annuel dédié à l'innovation technologique ?",
    options: [
      { label: 'Aucun', value: 'q2_0', points: 0 },
      { label: "< 5'000 CHF", value: 'q2_1', points: 1 },
      { label: "5-20'000 CHF", value: 'q2_2', points: 2 },
      { label: "> 20'000 CHF", value: 'q2_3', points: 3 },
    ],
  },
  {
    id: 3,
    question: 'Vos employés ont-ils été formés aux outils IA ?',
    options: [
      { label: 'Non', value: 'q3_0', points: 0 },
      { label: 'Quelques-uns en autodidacte', value: 'q3_1', points: 1 },
      { label: 'Formation ponctuelle', value: 'q3_2', points: 2 },
      { label: 'Programme continu', value: 'q3_3', points: 3 },
    ],
  },
  {
    id: 4,
    question: "Utilisez-vous l'IA pour votre marketing/communication ?",
    options: [
      { label: 'Non', value: 'q4_0', points: 0 },
      { label: 'Parfois ChatGPT', value: 'q4_1', points: 1 },
      { label: 'Régulièrement', value: 'q4_2', points: 2 },
      { label: 'Stratégie IA complète', value: 'q4_3', points: 3 },
    ],
  },
  {
    id: 5,
    question: 'Avez-vous automatisé des processus dans votre entreprise ?',
    options: [
      { label: 'Non', value: 'q5_0', points: 0 },
      { label: 'Quelques emails automatiques', value: 'q5_1', points: 1 },
      { label: 'Plusieurs workflows', value: 'q5_2', points: 2 },
      { label: 'Automatisation avancée', value: 'q5_3', points: 3 },
    ],
  },
  {
    id: 6,
    question: "Utilisez-vous l'IA pour l'analyse de données ?",
    options: [
      { label: 'Non', value: 'q6_0', points: 0 },
      { label: 'Tableurs basiques', value: 'q6_1', points: 1 },
      { label: 'Outils BI', value: 'q6_2', points: 2 },
      { label: 'IA prédictive', value: 'q6_3', points: 3 },
    ],
  },
  {
    id: 7,
    question: "Votre service client utilise-t-il l'IA ?",
    options: [
      { label: 'Non', value: 'q7_0', points: 0 },
      { label: 'FAQ automatisée', value: 'q7_1', points: 1 },
      { label: 'Chatbot basique', value: 'q7_2', points: 2 },
      { label: 'Assistant IA avancé', value: 'q7_3', points: 3 },
    ],
  },
  {
    id: 8,
    question: 'Avez-vous une stratégie IA définie ?',
    options: [
      { label: 'Non', value: 'q8_0', points: 0 },
      { label: 'On y réfléchit', value: 'q8_1', points: 1 },
      { label: "En cours d'élaboration", value: 'q8_2', points: 2 },
      { label: 'Stratégie claire et exécutée', value: 'q8_3', points: 3 },
    ],
  },
  {
    id: 9,
    question: 'Êtes-vous conforme à la nLPD pour vos usages IA ?',
    options: [
      { label: 'Je ne sais pas', value: 'q9_0', points: 0 },
      { label: 'Partiellement', value: 'q9_1', points: 1 },
      { label: 'En cours de mise en conformité', value: 'q9_2', points: 2 },
      { label: 'Totalement conforme', value: 'q9_3', points: 3 },
    ],
  },
  {
    id: 10,
    question: "Comment décririez-vous la culture d'innovation dans votre PME ?",
    options: [
      { label: 'Résistante au changement', value: 'q10_0', points: 0 },
      { label: 'Curieuse mais prudente', value: 'q10_1', points: 1 },
      { label: "Ouverte à l'innovation", value: 'q10_2', points: 2 },
      { label: "Innovation au coeur de l'ADN", value: 'q10_3', points: 3 },
    ],
  },
];

const questionsDE: QuizQuestion[] = [
  {
    id: 1,
    question: 'Nutzt Ihr Unternehmen bereits KI-Tools?',
    options: [
      { label: 'Gar nicht', value: 'q1_0', points: 0 },
      { label: 'Einige einfache Tools', value: 'q1_1', points: 1 },
      { label: 'Regelmässig', value: 'q1_2', points: 2 },
      { label: 'KI ist zentral in unseren Prozessen', value: 'q1_3', points: 3 },
    ],
  },
  {
    id: 2,
    question: 'Wie hoch ist Ihr jährliches Budget für technologische Innovation?',
    options: [
      { label: 'Keins', value: 'q2_0', points: 0 },
      { label: "< 5'000 CHF", value: 'q2_1', points: 1 },
      { label: "5-20'000 CHF", value: 'q2_2', points: 2 },
      { label: "> 20'000 CHF", value: 'q2_3', points: 3 },
    ],
  },
  {
    id: 3,
    question: 'Wurden Ihre Mitarbeitenden in KI-Tools geschult?',
    options: [
      { label: 'Nein', value: 'q3_0', points: 0 },
      { label: 'Einige autodidaktisch', value: 'q3_1', points: 1 },
      { label: 'Punktuelle Schulungen', value: 'q3_2', points: 2 },
      { label: 'Fortlaufendes Programm', value: 'q3_3', points: 3 },
    ],
  },
  {
    id: 4,
    question: 'Nutzen Sie KI für Ihr Marketing und Ihre Kommunikation?',
    options: [
      { label: 'Nein', value: 'q4_0', points: 0 },
      { label: 'Manchmal ChatGPT', value: 'q4_1', points: 1 },
      { label: 'Regelmässig', value: 'q4_2', points: 2 },
      { label: 'Vollständige KI-Strategie', value: 'q4_3', points: 3 },
    ],
  },
  {
    id: 5,
    question: 'Haben Sie Prozesse in Ihrem Unternehmen automatisiert?',
    options: [
      { label: 'Nein', value: 'q5_0', points: 0 },
      { label: 'Einige automatische E-Mails', value: 'q5_1', points: 1 },
      { label: 'Mehrere Workflows', value: 'q5_2', points: 2 },
      { label: 'Fortgeschrittene Automatisierung', value: 'q5_3', points: 3 },
    ],
  },
  {
    id: 6,
    question: 'Nutzen Sie KI für die Datenanalyse?',
    options: [
      { label: 'Nein', value: 'q6_0', points: 0 },
      { label: 'Einfache Tabellen', value: 'q6_1', points: 1 },
      { label: 'BI-Tools', value: 'q6_2', points: 2 },
      { label: 'Prädiktive KI', value: 'q6_3', points: 3 },
    ],
  },
  {
    id: 7,
    question: 'Nutzt Ihr Kundendienst KI?',
    options: [
      { label: 'Nein', value: 'q7_0', points: 0 },
      { label: 'Automatisierte FAQ', value: 'q7_1', points: 1 },
      { label: 'Einfacher Chatbot', value: 'q7_2', points: 2 },
      { label: 'Fortgeschrittener KI-Assistent', value: 'q7_3', points: 3 },
    ],
  },
  {
    id: 8,
    question: 'Haben Sie eine definierte KI-Strategie?',
    options: [
      { label: 'Nein', value: 'q8_0', points: 0 },
      { label: 'Wir denken darüber nach', value: 'q8_1', points: 1 },
      { label: 'In Erarbeitung', value: 'q8_2', points: 2 },
      { label: 'Klare Strategie, umgesetzt', value: 'q8_3', points: 3 },
    ],
  },
  {
    id: 9,
    question: 'Sind Sie nDSG-konform bei Ihrer KI-Nutzung?',
    options: [
      { label: 'Ich weiss es nicht', value: 'q9_0', points: 0 },
      { label: 'Teilweise', value: 'q9_1', points: 1 },
      { label: 'Compliance in Arbeit', value: 'q9_2', points: 2 },
      { label: 'Vollständig konform', value: 'q9_3', points: 3 },
    ],
  },
  {
    id: 10,
    question: 'Wie würden Sie die Innovationskultur in Ihrem KMU beschreiben?',
    options: [
      { label: 'Veränderungsresistent', value: 'q10_0', points: 0 },
      { label: 'Neugierig aber vorsichtig', value: 'q10_1', points: 1 },
      { label: 'Offen für Innovation', value: 'q10_2', points: 2 },
      { label: 'Innovation ist Teil unserer DNA', value: 'q10_3', points: 3 },
    ],
  },
];

const questionsEN: QuizQuestion[] = [
  {
    id: 1,
    question: 'Does your company already use AI tools?',
    options: [
      { label: 'Not at all', value: 'q1_0', points: 0 },
      { label: 'A few basic tools', value: 'q1_1', points: 1 },
      { label: 'Regularly', value: 'q1_2', points: 2 },
      { label: 'AI is core to our processes', value: 'q1_3', points: 3 },
    ],
  },
  {
    id: 2,
    question: 'What is your annual budget for technological innovation?',
    options: [
      { label: 'None', value: 'q2_0', points: 0 },
      { label: '< CHF 5,000', value: 'q2_1', points: 1 },
      { label: 'CHF 5,000-20,000', value: 'q2_2', points: 2 },
      { label: '> CHF 20,000', value: 'q2_3', points: 3 },
    ],
  },
  {
    id: 3,
    question: 'Have your employees been trained on AI tools?',
    options: [
      { label: 'No', value: 'q3_0', points: 0 },
      { label: 'A few self-taught', value: 'q3_1', points: 1 },
      { label: 'Occasional training', value: 'q3_2', points: 2 },
      { label: 'Ongoing programme', value: 'q3_3', points: 3 },
    ],
  },
  {
    id: 4,
    question: 'Do you use AI for your marketing/communications?',
    options: [
      { label: 'No', value: 'q4_0', points: 0 },
      { label: 'Sometimes ChatGPT', value: 'q4_1', points: 1 },
      { label: 'Regularly', value: 'q4_2', points: 2 },
      { label: 'Full AI strategy', value: 'q4_3', points: 3 },
    ],
  },
  {
    id: 5,
    question: 'Have you automated processes in your company?',
    options: [
      { label: 'No', value: 'q5_0', points: 0 },
      { label: 'A few automated emails', value: 'q5_1', points: 1 },
      { label: 'Several workflows', value: 'q5_2', points: 2 },
      { label: 'Advanced automation', value: 'q5_3', points: 3 },
    ],
  },
  {
    id: 6,
    question: 'Do you use AI for data analysis?',
    options: [
      { label: 'No', value: 'q6_0', points: 0 },
      { label: 'Basic spreadsheets', value: 'q6_1', points: 1 },
      { label: 'BI tools', value: 'q6_2', points: 2 },
      { label: 'Predictive AI', value: 'q6_3', points: 3 },
    ],
  },
  {
    id: 7,
    question: 'Does your customer service use AI?',
    options: [
      { label: 'No', value: 'q7_0', points: 0 },
      { label: 'Automated FAQ', value: 'q7_1', points: 1 },
      { label: 'Basic chatbot', value: 'q7_2', points: 2 },
      { label: 'Advanced AI assistant', value: 'q7_3', points: 3 },
    ],
  },
  {
    id: 8,
    question: 'Do you have a defined AI strategy?',
    options: [
      { label: 'No', value: 'q8_0', points: 0 },
      { label: "We're thinking about it", value: 'q8_1', points: 1 },
      { label: 'Being developed', value: 'q8_2', points: 2 },
      { label: 'Clear strategy in execution', value: 'q8_3', points: 3 },
    ],
  },
  {
    id: 9,
    question: 'Are you nFADP compliant for your AI usage?',
    options: [
      { label: "I don't know", value: 'q9_0', points: 0 },
      { label: 'Partially', value: 'q9_1', points: 1 },
      { label: 'Working on compliance', value: 'q9_2', points: 2 },
      { label: 'Fully compliant', value: 'q9_3', points: 3 },
    ],
  },
  {
    id: 10,
    question: 'How would you describe the innovation culture in your SME?',
    options: [
      { label: 'Resistant to change', value: 'q10_0', points: 0 },
      { label: 'Curious but cautious', value: 'q10_1', points: 1 },
      { label: 'Open to innovation', value: 'q10_2', points: 2 },
      { label: 'Innovation is in our DNA', value: 'q10_3', points: 3 },
    ],
  },
];

const questionsIT: QuizQuestion[] = [
  {
    id: 1,
    question: 'La vostra azienda utilizza già strumenti di IA?',
    options: [
      { label: 'Per niente', value: 'q1_0', points: 0 },
      { label: 'Alcuni strumenti di base', value: 'q1_1', points: 1 },
      { label: 'Regolarmente', value: 'q1_2', points: 2 },
      { label: "L'IA è al centro dei nostri processi", value: 'q1_3', points: 3 },
    ],
  },
  {
    id: 2,
    question: "Qual è il vostro budget annuale dedicato all'innovazione tecnologica?",
    options: [
      { label: 'Nessuno', value: 'q2_0', points: 0 },
      { label: "< 5'000 CHF", value: 'q2_1', points: 1 },
      { label: "5-20'000 CHF", value: 'q2_2', points: 2 },
      { label: "> 20'000 CHF", value: 'q2_3', points: 3 },
    ],
  },
  {
    id: 3,
    question: 'I vostri dipendenti sono stati formati sugli strumenti IA?',
    options: [
      { label: 'No', value: 'q3_0', points: 0 },
      { label: 'Alcuni in modo autodidatta', value: 'q3_1', points: 1 },
      { label: 'Formazione occasionale', value: 'q3_2', points: 2 },
      { label: 'Programma continuo', value: 'q3_3', points: 3 },
    ],
  },
  {
    id: 4,
    question: "Utilizzate l'IA per il vostro marketing/comunicazione?",
    options: [
      { label: 'No', value: 'q4_0', points: 0 },
      { label: 'A volte ChatGPT', value: 'q4_1', points: 1 },
      { label: 'Regolarmente', value: 'q4_2', points: 2 },
      { label: 'Strategia IA completa', value: 'q4_3', points: 3 },
    ],
  },
  {
    id: 5,
    question: 'Avete automatizzato dei processi nella vostra azienda?',
    options: [
      { label: 'No', value: 'q5_0', points: 0 },
      { label: 'Alcune email automatiche', value: 'q5_1', points: 1 },
      { label: 'Diversi workflow', value: 'q5_2', points: 2 },
      { label: 'Automazione avanzata', value: 'q5_3', points: 3 },
    ],
  },
  {
    id: 6,
    question: "Utilizzate l'IA per l'analisi dei dati?",
    options: [
      { label: 'No', value: 'q6_0', points: 0 },
      { label: 'Fogli di calcolo di base', value: 'q6_1', points: 1 },
      { label: 'Strumenti BI', value: 'q6_2', points: 2 },
      { label: 'IA predittiva', value: 'q6_3', points: 3 },
    ],
  },
  {
    id: 7,
    question: "Il vostro servizio clienti utilizza l'IA?",
    options: [
      { label: 'No', value: 'q7_0', points: 0 },
      { label: 'FAQ automatizzata', value: 'q7_1', points: 1 },
      { label: 'Chatbot di base', value: 'q7_2', points: 2 },
      { label: 'Assistente IA avanzato', value: 'q7_3', points: 3 },
    ],
  },
  {
    id: 8,
    question: 'Avete una strategia IA definita?',
    options: [
      { label: 'No', value: 'q8_0', points: 0 },
      { label: 'Ci stiamo pensando', value: 'q8_1', points: 1 },
      { label: 'In fase di elaborazione', value: 'q8_2', points: 2 },
      { label: 'Strategia chiara e in esecuzione', value: 'q8_3', points: 3 },
    ],
  },
  {
    id: 9,
    question: 'Siete conformi alla nLPD per i vostri utilizzi IA?',
    options: [
      { label: 'Non lo so', value: 'q9_0', points: 0 },
      { label: 'Parzialmente', value: 'q9_1', points: 1 },
      { label: 'In fase di adeguamento', value: 'q9_2', points: 2 },
      { label: 'Totalmente conformi', value: 'q9_3', points: 3 },
    ],
  },
  {
    id: 10,
    question: "Come descrivereste la cultura dell'innovazione nella vostra PMI?",
    options: [
      { label: 'Resistente al cambiamento', value: 'q10_0', points: 0 },
      { label: 'Curiosa ma prudente', value: 'q10_1', points: 1 },
      { label: "Aperta all'innovazione", value: 'q10_2', points: 2 },
      { label: "L'innovazione è nel nostro DNA", value: 'q10_3', points: 3 },
    ],
  },
];

const questionsMap: Record<string, QuizQuestion[]> = {
  fr: questionsFR,
  de: questionsDE,
  en: questionsEN,
  it: questionsIT,
};

/* ─────────── Result levels per locale ─────────── */

interface LevelDef {
  minScore: number;
  maxScore: number;
  label: string;
  color: string;
  description: string;
  recommendations: string[];
}

const levelsFR: LevelDef[] = [
  {
    minScore: 0,
    maxScore: 7,
    label: 'Débutant IA',
    color: '#ef4444',
    description:
      "Votre PME en est au tout début de son parcours IA. C'est le moment idéal pour commencer !",
    recommendations: [
      "Commencez par explorer ChatGPT et d'autres outils IA gratuits",
      'Identifiez 2-3 tâches répétitives qui pourraient être automatisées',
      "Participez à notre formation d'introduction à l'IA pour PME",
      "Sensibilisez votre équipe aux opportunités de l'IA",
    ],
  },
  {
    minScore: 8,
    maxScore: 15,
    label: 'Explorateur IA',
    color: '#f97316',
    description:
      'Vous avez fait vos premiers pas. Il est temps de structurer votre approche.',
    recommendations: [
      'Définissez une stratégie IA alignée avec vos objectifs business',
      'Investissez dans la formation continue de vos équipes',
      'Automatisez vos workflows marketing et service client',
      'Explorez les outils IA spécifiques à votre secteur',
    ],
  },
  {
    minScore: 16,
    maxScore: 22,
    label: 'Adopteur IA',
    color: '#3b82f6',
    description:
      "Votre PME utilise déjà l'IA de manière significative. Passez à la vitesse supérieure !",
    recommendations: [
      "Intégrez l'IA prédictive dans votre prise de décision",
      'Développez des solutions IA sur mesure pour votre métier',
      'Assurez votre conformité nLPD complète',
      "Devenez un exemple d'innovation dans votre secteur",
    ],
  },
  {
    minScore: 23,
    maxScore: 30,
    label: 'Leader IA',
    color: '#22c55e',
    description:
      'Bravo ! Votre PME est en avance. Continuez à innover !',
    recommendations: [
      "Partagez votre expérience avec d'autres PME suisses",
      "Explorez l'IA générative avancée et les agents IA",
      'Optimisez votre ROI IA avec des métriques précises',
      "Anticipez les tendances IA de demain",
    ],
  },
];

const levelsDE: LevelDef[] = [
  {
    minScore: 0,
    maxScore: 7,
    label: 'KI-Einsteiger',
    color: '#ef4444',
    description:
      'Ihr KMU steht am Anfang seiner KI-Reise. Jetzt ist der ideale Zeitpunkt, um zu starten!',
    recommendations: [
      'Erkunden Sie ChatGPT und andere kostenlose KI-Tools',
      'Identifizieren Sie 2-3 repetitive Aufgaben, die automatisiert werden könnten',
      'Nehmen Sie an unserer KI-Einführungsschulung für KMU teil',
      'Sensibilisieren Sie Ihr Team für KI-Chancen',
    ],
  },
  {
    minScore: 8,
    maxScore: 15,
    label: 'KI-Entdecker',
    color: '#f97316',
    description:
      'Sie haben erste Schritte gemacht. Strukturieren Sie jetzt Ihren Ansatz.',
    recommendations: [
      'Definieren Sie eine KI-Strategie, die auf Ihre Geschäftsziele abgestimmt ist',
      'Investieren Sie in die kontinuierliche Schulung Ihrer Teams',
      'Automatisieren Sie Ihre Marketing- und Kundenservice-Workflows',
      'Erkunden Sie branchenspezifische KI-Tools',
    ],
  },
  {
    minScore: 16,
    maxScore: 22,
    label: 'KI-Anwender',
    color: '#3b82f6',
    description:
      'Ihr KMU nutzt KI bereits aktiv. Zeit, den nächsten Gang einzulegen!',
    recommendations: [
      'Integrieren Sie prädiktive KI in Ihre Entscheidungsfindung',
      'Entwickeln Sie massgeschneiderte KI-Lösungen für Ihr Geschäft',
      'Stellen Sie vollständige nDSG-Konformität sicher',
      'Werden Sie zum Innovationsvorbild in Ihrer Branche',
    ],
  },
  {
    minScore: 23,
    maxScore: 30,
    label: 'KI-Vorreiter',
    color: '#22c55e',
    description:
      'Bravo! Ihr KMU ist voraus. Innovieren Sie weiter!',
    recommendations: [
      'Teilen Sie Ihre Erfahrung mit anderen Schweizer KMU',
      'Erkunden Sie fortgeschrittene generative KI und KI-Agenten',
      'Optimieren Sie Ihren KI-ROI mit präzisen Metriken',
      'Antizipieren Sie die KI-Trends von morgen',
    ],
  },
];

const levelsEN: LevelDef[] = [
  {
    minScore: 0,
    maxScore: 7,
    label: 'AI Beginner',
    color: '#ef4444',
    description:
      'Your SME is at the very beginning of its AI journey. Now is the perfect time to start!',
    recommendations: [
      'Start exploring ChatGPT and other free AI tools',
      'Identify 2-3 repetitive tasks that could be automated',
      'Join our AI introduction training for SMEs',
      "Raise your team's awareness of AI opportunities",
    ],
  },
  {
    minScore: 8,
    maxScore: 15,
    label: 'AI Explorer',
    color: '#f97316',
    description:
      "You've taken your first steps. It's time to structure your approach.",
    recommendations: [
      'Define an AI strategy aligned with your business goals',
      'Invest in continuous training for your teams',
      'Automate your marketing and customer service workflows',
      'Explore AI tools specific to your industry',
    ],
  },
  {
    minScore: 16,
    maxScore: 22,
    label: 'AI Adopter',
    color: '#3b82f6',
    description:
      'Your SME already uses AI significantly. Time to shift into high gear!',
    recommendations: [
      'Integrate predictive AI into your decision-making',
      'Develop custom AI solutions for your business',
      'Ensure full nFADP compliance',
      'Become an innovation leader in your sector',
    ],
  },
  {
    minScore: 23,
    maxScore: 30,
    label: 'AI Leader',
    color: '#22c55e',
    description:
      'Congratulations! Your SME is ahead of the curve. Keep innovating!',
    recommendations: [
      'Share your experience with other Swiss SMEs',
      'Explore advanced generative AI and AI agents',
      'Optimise your AI ROI with precise metrics',
      "Anticipate tomorrow's AI trends",
    ],
  },
];

const levelsIT: LevelDef[] = [
  {
    minScore: 0,
    maxScore: 7,
    label: 'Principiante IA',
    color: '#ef4444',
    description:
      "La vostra PMI è all'inizio del suo percorso IA. È il momento ideale per iniziare!",
    recommendations: [
      'Iniziate esplorando ChatGPT e altri strumenti IA gratuiti',
      'Identificate 2-3 compiti ripetitivi che potrebbero essere automatizzati',
      "Partecipate alla nostra formazione introduttiva sull'IA per PMI",
      "Sensibilizzate il vostro team sulle opportunità dell'IA",
    ],
  },
  {
    minScore: 8,
    maxScore: 15,
    label: 'Esploratore IA',
    color: '#f97316',
    description:
      'Avete fatto i primi passi. È il momento di strutturare il vostro approccio.',
    recommendations: [
      'Definite una strategia IA allineata ai vostri obiettivi di business',
      'Investite nella formazione continua dei vostri team',
      'Automatizzate i vostri workflow di marketing e servizio clienti',
      'Esplorate gli strumenti IA specifici per il vostro settore',
    ],
  },
  {
    minScore: 16,
    maxScore: 22,
    label: 'Adottatore IA',
    color: '#3b82f6',
    description:
      "La vostra PMI utilizza già l'IA in modo significativo. Passate alla marcia superiore!",
    recommendations: [
      "Integrate l'IA predittiva nelle vostre decisioni",
      'Sviluppate soluzioni IA personalizzate per il vostro settore',
      'Assicuratevi la piena conformità nLPD',
      "Diventate un esempio di innovazione nel vostro settore",
    ],
  },
  {
    minScore: 23,
    maxScore: 30,
    label: 'Leader IA',
    color: '#22c55e',
    description:
      'Bravi! La vostra PMI è in vantaggio. Continuate a innovare!',
    recommendations: [
      'Condividete la vostra esperienza con altre PMI svizzere',
      "Esplorate l'IA generativa avanzata e gli agenti IA",
      'Ottimizzate il vostro ROI IA con metriche precise',
      'Anticipate le tendenze IA di domani',
    ],
  },
];

const levelsMap: Record<string, LevelDef[]> = {
  fr: levelsFR,
  de: levelsDE,
  en: levelsEN,
  it: levelsIT,
};

/* ─────────── UI text per locale ─────────── */

interface UIText {
  breadcrumbHome: string;
  breadcrumbQuiz: string;
  breadcrumbTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  quizTitle: string;
  startButton: string;
  infoBadge: string;
  resultTitle: string;
  ctaButton: string;
  sharePrefix: string;
  emailPlaceholder: string;
  emailButton: string;
}

const uiTextMap: Record<string, UIText> = {
  fr: {
    breadcrumbHome: 'Accueil',
    breadcrumbQuiz: 'Quiz',
    breadcrumbTitle: 'Score de Maturité IA',
    heroTitle: 'Évaluez la maturité IA de votre PME',
    heroSubtitle:
      '10 questions pour découvrir votre score et recevoir des recommandations personnalisées',
    quizTitle: 'Score de Maturité IA',
    startButton: 'Commencer',
    infoBadge: 'Gratuit \u2022 3 minutes \u2022 Résultats immédiats',
    resultTitle: 'Votre Score de Maturité IA',
    ctaButton: 'Réservez votre audit gratuit',
    sharePrefix: "J'ai obtenu {score}/30 au Score de Maturité IA ! Et vous ?",
    emailPlaceholder: 'votre@email.ch',
    emailButton: 'Recevoir mon rapport',
  },
  de: {
    breadcrumbHome: 'Startseite',
    breadcrumbQuiz: 'Quiz',
    breadcrumbTitle: 'KI-Reifegrad-Score',
    heroTitle: 'Bewerten Sie den KI-Reifegrad Ihres KMU',
    heroSubtitle:
      '10 Fragen, um Ihren Score zu entdecken und personalisierte Empfehlungen zu erhalten',
    quizTitle: 'KI-Reifegrad-Score',
    startButton: 'Starten',
    infoBadge: 'Kostenlos \u2022 3 Minuten \u2022 Sofortige Ergebnisse',
    resultTitle: 'Ihr KI-Reifegrad-Score',
    ctaButton: 'Kostenloses Audit buchen',
    sharePrefix: 'Ich habe {score}/30 beim KI-Reifegrad-Score erreicht! Und Sie?',
    emailPlaceholder: 'ihre@email.ch',
    emailButton: 'Bericht erhalten',
  },
  en: {
    breadcrumbHome: 'Home',
    breadcrumbQuiz: 'Quiz',
    breadcrumbTitle: 'AI Maturity Score',
    heroTitle: "Assess your SME's AI maturity",
    heroSubtitle:
      '10 questions to discover your score and receive personalised recommendations',
    quizTitle: 'AI Maturity Score',
    startButton: 'Start',
    infoBadge: 'Free \u2022 3 minutes \u2022 Instant results',
    resultTitle: 'Your AI Maturity Score',
    ctaButton: 'Book your free audit',
    sharePrefix: 'I scored {score}/30 on the AI Maturity Score! How about you?',
    emailPlaceholder: 'your@email.ch',
    emailButton: 'Get my report',
  },
  it: {
    breadcrumbHome: 'Home',
    breadcrumbQuiz: 'Quiz',
    breadcrumbTitle: 'Score di Maturità IA',
    heroTitle: 'Valutate la maturità IA della vostra PMI',
    heroSubtitle:
      '10 domande per scoprire il vostro punteggio e ricevere raccomandazioni personalizzate',
    quizTitle: 'Score di Maturità IA',
    startButton: 'Iniziare',
    infoBadge: 'Gratuito \u2022 3 minuti \u2022 Risultati immediati',
    resultTitle: 'Il vostro Score di Maturità IA',
    ctaButton: 'Prenotate il vostro audit gratuito',
    sharePrefix: 'Ho ottenuto {score}/30 allo Score di Maturità IA! E voi?',
    emailPlaceholder: 'vostra@email.ch',
    emailButton: 'Ricevere il rapporto',
  },
};

/* ─────────── Helper: find level from score ─────────── */

function findLevel(score: number, levels: LevelDef[]): LevelDef {
  return levels.find((l) => score >= l.minScore && score <= l.maxScore) || levels[0];
}

/* ─────────── Page Component ─────────── */

export default function MaturiteIAPage() {
  const locale = useLocale();
  const [phase, setPhase] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [score, setScore] = useState(0);

  const questions = questionsMap[locale] || questionsFR;
  const levels = levelsMap[locale] || levelsFR;
  const ui = uiTextMap[locale] || uiTextMap.fr;

  const currentLevel = findLevel(score, levels);

  function handleComplete(_answers: Record<number, string>, totalPoints: number) {
    setScore(totalPoints);
    setPhase('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: ui.breadcrumbHome, href: '/' },
            { label: ui.breadcrumbQuiz },
            { label: ui.breadcrumbTitle },
          ]}
        />
      </div>

      {/* ─── Intro Screen ─── */}
      {phase === 'intro' && (
        <section className="px-4 pb-20 pt-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Icon */}
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#1B2A4A]">
              <svg
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                />
              </svg>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-[#1B2A4A] sm:text-5xl">
              {ui.heroTitle}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
              {ui.heroSubtitle}
            </p>

            <div className="mt-10">
              <button
                onClick={() => setPhase('quiz')}
                className="inline-flex items-center justify-center rounded-lg bg-[#FF0000] px-10 py-4 text-lg font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md"
              >
                {ui.startButton}
                <svg
                  className="ml-2 h-5 w-5"
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
              </button>
            </div>

            <p className="mt-6 text-sm text-gray-500">{ui.infoBadge}</p>

            {/* Feature cards */}
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {[
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  ),
                  title: '10 questions',
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  ),
                  title: '3 min',
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  ),
                  title: 'Score /30',
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm"
                >
                  <svg
                    className="mx-auto h-8 w-8 text-[#FF0000]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    {feature.icon}
                  </svg>
                  <p className="mt-3 text-sm font-semibold text-[#1B2A4A]">
                    {feature.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Quiz Screen ─── */}
      {phase === 'quiz' && (
        <section className="px-4 pb-20 pt-12 sm:px-6 lg:px-8">
          <QuizEngine
            title={ui.quizTitle}
            questions={questions}
            onComplete={handleComplete}
            showProgress={true}
            showExplanation={false}
          />
        </section>
      )}

      {/* ─── Result Screen ─── */}
      {phase === 'result' && (
        <section className="px-4 pb-20 pt-12 sm:px-6 lg:px-8">
          <QuizResult
            title={ui.resultTitle}
            score={score}
            maxScore={30}
            level={currentLevel.label}
            levelDescription={currentLevel.description}
            levelColor={currentLevel.color}
            recommendations={currentLevel.recommendations}
            showEmailCapture={true}
            emailPlaceholder={ui.emailPlaceholder}
            emailButtonText={ui.emailButton}
            shareText={ui.sharePrefix.replace('{score}', String(score))}
            shareUrl={`https://iapmesuisse.ch/${locale}/quiz/maturite-ia`}
            ctaText={ui.ctaButton}
            ctaHref="/contact"
          />
        </section>
      )}
    </>
  );
}
