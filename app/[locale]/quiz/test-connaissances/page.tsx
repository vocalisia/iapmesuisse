'use client';

import { useLocale } from 'next-intl';
import QuizEngine, { type QuizQuestion } from '@/components/QuizEngine';
import QuizResult from '@/components/QuizResult';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useState } from 'react';

/* ─────────── Questions per locale ─────────── */
/* Each correct answer has points: 1, wrong answers have points: 0 */

const questionsFR: QuizQuestion[] = [
  {
    id: 1,
    question: 'Que signifie GPT dans ChatGPT ?',
    options: [
      { label: 'Generative Pre-trained Transformer', value: 'q1_a', points: 1 },
      { label: 'General Purpose Technology', value: 'q1_b', points: 0 },
      { label: 'Global Processing Tool', value: 'q1_c', points: 0 },
      { label: 'Graphical Pattern Translator', value: 'q1_d', points: 0 },
    ],
    explanation:
      'GPT signifie Generative Pre-trained Transformer, une architecture de réseau de neurones.',
  },
  {
    id: 2,
    question: 'Quelle entreprise a créé ChatGPT ?',
    options: [
      { label: 'OpenAI', value: 'q2_a', points: 1 },
      { label: 'Google', value: 'q2_b', points: 0 },
      { label: 'Meta', value: 'q2_c', points: 0 },
      { label: 'Microsoft', value: 'q2_d', points: 0 },
    ],
    explanation:
      'ChatGPT a été créé par OpenAI, une entreprise de recherche en intelligence artificielle fondée en 2015.',
  },
  {
    id: 3,
    question: "Qu'est-ce qu'un LLM ?",
    options: [
      { label: 'Un grand modèle de langage', value: 'q3_a', points: 1 },
      { label: 'Un logiciel de marketing', value: 'q3_b', points: 0 },
      { label: 'Un réseau local', value: 'q3_c', points: 0 },
      { label: 'Un type de base de données', value: 'q3_d', points: 0 },
    ],
    explanation:
      "LLM signifie Large Language Model (grand modèle de langage). C'est le type d'IA derrière ChatGPT, Claude et Gemini.",
  },
  {
    id: 4,
    question: "L'IA peut-elle être créative ?",
    options: [
      { label: "Elle peut générer du contenu original, mais n'a pas de conscience", value: 'q4_a', points: 1 },
      { label: 'Oui, elle est consciente', value: 'q4_b', points: 0 },
      { label: 'Non, jamais', value: 'q4_c', points: 0 },
      { label: 'Seulement en musique', value: 'q4_d', points: 0 },
    ],
    explanation:
      "L'IA peut produire du texte, des images et de la musique originaux, mais elle n'a ni conscience ni intentionnalité.",
  },
  {
    id: 5,
    question: "Qu'est-ce que le machine learning ?",
    options: [
      { label: "Un sous-domaine de l'IA où les machines apprennent des données", value: 'q5_a', points: 1 },
      { label: 'Un langage de programmation', value: 'q5_b', points: 0 },
      { label: "Un type d'ordinateur", value: 'q5_c', points: 0 },
      { label: 'Une marque de logiciel', value: 'q5_d', points: 0 },
    ],
    explanation:
      "Le machine learning (apprentissage automatique) permet aux machines d'apprendre à partir de données sans être explicitement programmées.",
  },
  {
    id: 6,
    question: 'Quelle est la loi suisse sur la protection des données ?',
    options: [
      { label: 'nLPD', value: 'q6_a', points: 1 },
      { label: 'RGPD', value: 'q6_b', points: 0 },
      { label: 'CCPA', value: 'q6_c', points: 0 },
      { label: 'HIPAA', value: 'q6_d', points: 0 },
    ],
    explanation:
      'La nLPD (nouvelle Loi fédérale sur la Protection des Données) est en vigueur depuis le 1er septembre 2023.',
  },
  {
    id: 7,
    question: "Qu'est-ce qu'un prompt ?",
    options: [
      { label: 'Une instruction donnée à une IA', value: 'q7_a', points: 1 },
      { label: 'Un type de virus', value: 'q7_b', points: 0 },
      { label: 'Un langage de programmation', value: 'q7_c', points: 0 },
      { label: 'Un composant hardware', value: 'q7_d', points: 0 },
    ],
    explanation:
      "Un prompt est l'instruction ou la question que vous donnez à une IA pour obtenir une réponse.",
  },
  {
    id: 8,
    question: "Que signifie 'hallucination' en IA ?",
    options: [
      { label: "Quand l'IA génère des informations fausses présentées comme vraies", value: 'q8_a', points: 1 },
      { label: 'Un bug visuel', value: 'q8_b', points: 0 },
      { label: 'Un virus', value: 'q8_c', points: 0 },
      { label: "Un type d'attaque", value: 'q8_d', points: 0 },
    ],
    explanation:
      "Une hallucination en IA désigne le phénomène où le modèle invente des faits avec assurance, sans base factuelle.",
  },
  {
    id: 9,
    question: 'Quel outil IA est spécialisé dans la traduction ?',
    options: [
      { label: 'DeepL', value: 'q9_a', points: 1 },
      { label: 'Midjourney', value: 'q9_b', points: 0 },
      { label: 'GitHub Copilot', value: 'q9_c', points: 0 },
      { label: 'Stable Diffusion', value: 'q9_d', points: 0 },
    ],
    explanation:
      "DeepL est un traducteur basé sur l'IA, reconnu pour la qualité de ses traductions, notamment en langues européennes.",
  },
  {
    id: 10,
    question: 'Combien de PME compte la Suisse environ ?',
    options: [
      { label: "Plus de 600'000", value: 'q10_a', points: 1 },
      { label: "100'000", value: 'q10_b', points: 0 },
      { label: '1 million', value: 'q10_c', points: 0 },
      { label: "50'000", value: 'q10_d', points: 0 },
    ],
    explanation:
      "La Suisse compte plus de 600'000 PME, qui représentent 99,7% de toutes les entreprises du pays.",
  },
  {
    id: 11,
    question: "Qu'est-ce que l'IA générative ?",
    options: [
      { label: 'Une IA capable de créer du contenu nouveau', value: 'q11_a', points: 1 },
      { label: 'Une IA qui programme', value: 'q11_b', points: 0 },
      { label: 'Un moteur de recherche', value: 'q11_c', points: 0 },
      { label: 'Un robot physique', value: 'q11_d', points: 0 },
    ],
    explanation:
      "L'IA générative crée du contenu nouveau (texte, images, code, musique) à partir de modèles entraînés sur de grandes quantités de données.",
  },
  {
    id: 12,
    question: "Quel est le principal risque de l'IA pour les PME ?",
    options: [
      { label: "Ne pas l'adopter et perdre en compétitivité", value: 'q12_a', points: 1 },
      { label: 'Remplacement de tous les employés', value: 'q12_b', points: 0 },
      { label: 'Coût excessif', value: 'q12_c', points: 0 },
      { label: 'Impossible à utiliser', value: 'q12_d', points: 0 },
    ],
    explanation:
      "Le plus grand risque pour une PME est de ne pas adopter l'IA et de se faire distancer par des concurrents plus agiles.",
  },
  {
    id: 13,
    question: "Qu'est-ce que RAG en IA ?",
    options: [
      { label: 'Retrieval-Augmented Generation', value: 'q13_a', points: 1 },
      { label: 'Random Algorithm Generator', value: 'q13_b', points: 0 },
      { label: 'Real Artificial General', value: 'q13_c', points: 0 },
      { label: 'Remote Access Gateway', value: 'q13_d', points: 0 },
    ],
    explanation:
      "RAG (Retrieval-Augmented Generation) combine la recherche d'information et la génération de texte pour des réponses plus précises.",
  },
  {
    id: 14,
    question: 'Claude AI est développé par quelle entreprise ?',
    options: [
      { label: 'Anthropic', value: 'q14_a', points: 1 },
      { label: 'OpenAI', value: 'q14_b', points: 0 },
      { label: 'Google', value: 'q14_c', points: 0 },
      { label: 'Apple', value: 'q14_d', points: 0 },
    ],
    explanation:
      "Claude est développé par Anthropic, une entreprise spécialisée dans la sécurité de l'IA, fondée par d'anciens chercheurs d'OpenAI.",
  },
  {
    id: 15,
    question: "Quelle est la meilleure façon d'intégrer l'IA dans une PME ?",
    options: [
      { label: 'Commencer petit, mesurer les résultats, puis étendre', value: 'q15_a', points: 1 },
      { label: "Tout remplacer d'un coup", value: 'q15_b', points: 0 },
      { label: 'Attendre que la techno soit parfaite', value: 'q15_c', points: 0 },
      { label: 'Engager une armée de développeurs', value: 'q15_d', points: 0 },
    ],
    explanation:
      "L'approche progressive (commencer petit, tester, mesurer, puis étendre) est la plus efficace pour intégrer l'IA dans une PME.",
  },
];

const questionsDE: QuizQuestion[] = [
  {
    id: 1,
    question: 'Wofür steht GPT in ChatGPT?',
    options: [
      { label: 'Generative Pre-trained Transformer', value: 'q1_a', points: 1 },
      { label: 'General Purpose Technology', value: 'q1_b', points: 0 },
      { label: 'Global Processing Tool', value: 'q1_c', points: 0 },
      { label: 'Graphical Pattern Translator', value: 'q1_d', points: 0 },
    ],
    explanation:
      'GPT steht für Generative Pre-trained Transformer, eine Architektur neuronaler Netzwerke.',
  },
  {
    id: 2,
    question: 'Welches Unternehmen hat ChatGPT entwickelt?',
    options: [
      { label: 'OpenAI', value: 'q2_a', points: 1 },
      { label: 'Google', value: 'q2_b', points: 0 },
      { label: 'Meta', value: 'q2_c', points: 0 },
      { label: 'Microsoft', value: 'q2_d', points: 0 },
    ],
    explanation:
      'ChatGPT wurde von OpenAI entwickelt, einem 2015 gegründeten KI-Forschungsunternehmen.',
  },
  {
    id: 3,
    question: 'Was ist ein LLM?',
    options: [
      { label: 'Ein grosses Sprachmodell', value: 'q3_a', points: 1 },
      { label: 'Eine Marketing-Software', value: 'q3_b', points: 0 },
      { label: 'Ein lokales Netzwerk', value: 'q3_c', points: 0 },
      { label: 'Ein Datenbanktyp', value: 'q3_d', points: 0 },
    ],
    explanation:
      'LLM steht für Large Language Model (grosses Sprachmodell). Diese KI steckt hinter ChatGPT, Claude und Gemini.',
  },
  {
    id: 4,
    question: 'Kann KI kreativ sein?',
    options: [
      { label: 'Sie kann originelle Inhalte generieren, hat aber kein Bewusstsein', value: 'q4_a', points: 1 },
      { label: 'Ja, sie ist bewusst', value: 'q4_b', points: 0 },
      { label: 'Nein, niemals', value: 'q4_c', points: 0 },
      { label: 'Nur in der Musik', value: 'q4_d', points: 0 },
    ],
    explanation:
      'KI kann originelle Texte, Bilder und Musik erzeugen, hat aber weder Bewusstsein noch Intentionalität.',
  },
  {
    id: 5,
    question: 'Was ist Machine Learning?',
    options: [
      { label: 'Ein Teilgebiet der KI, bei dem Maschinen aus Daten lernen', value: 'q5_a', points: 1 },
      { label: 'Eine Programmiersprache', value: 'q5_b', points: 0 },
      { label: 'Ein Computertyp', value: 'q5_c', points: 0 },
      { label: 'Eine Softwaremarke', value: 'q5_d', points: 0 },
    ],
    explanation:
      'Machine Learning (maschinelles Lernen) ermöglicht es Maschinen, aus Daten zu lernen, ohne explizit programmiert zu werden.',
  },
  {
    id: 6,
    question: 'Wie heisst das Schweizer Datenschutzgesetz?',
    options: [
      { label: 'nDSG', value: 'q6_a', points: 1 },
      { label: 'DSGVO', value: 'q6_b', points: 0 },
      { label: 'CCPA', value: 'q6_c', points: 0 },
      { label: 'HIPAA', value: 'q6_d', points: 0 },
    ],
    explanation:
      'Das nDSG (neues Datenschutzgesetz) ist seit dem 1. September 2023 in Kraft.',
  },
  {
    id: 7,
    question: 'Was ist ein Prompt?',
    options: [
      { label: 'Eine Anweisung an eine KI', value: 'q7_a', points: 1 },
      { label: 'Ein Virustyp', value: 'q7_b', points: 0 },
      { label: 'Eine Programmiersprache', value: 'q7_c', points: 0 },
      { label: 'Eine Hardware-Komponente', value: 'q7_d', points: 0 },
    ],
    explanation:
      'Ein Prompt ist die Anweisung oder Frage, die Sie einer KI geben, um eine Antwort zu erhalten.',
  },
  {
    id: 8,
    question: "Was bedeutet 'Halluzination' bei KI?",
    options: [
      { label: 'Wenn die KI falsche Informationen als wahr präsentiert', value: 'q8_a', points: 1 },
      { label: 'Ein visueller Fehler', value: 'q8_b', points: 0 },
      { label: 'Ein Virus', value: 'q8_c', points: 0 },
      { label: 'Ein Angriffstyp', value: 'q8_d', points: 0 },
    ],
    explanation:
      'Eine KI-Halluzination bezeichnet das Phänomen, bei dem das Modell Fakten mit Überzeugung erfindet, ohne faktische Grundlage.',
  },
  {
    id: 9,
    question: 'Welches KI-Tool ist auf Übersetzung spezialisiert?',
    options: [
      { label: 'DeepL', value: 'q9_a', points: 1 },
      { label: 'Midjourney', value: 'q9_b', points: 0 },
      { label: 'GitHub Copilot', value: 'q9_c', points: 0 },
      { label: 'Stable Diffusion', value: 'q9_d', points: 0 },
    ],
    explanation:
      'DeepL ist ein KI-basierter Übersetzer, bekannt für die Qualität seiner Übersetzungen, besonders bei europäischen Sprachen.',
  },
  {
    id: 10,
    question: 'Wie viele KMU hat die Schweiz ungefähr?',
    options: [
      { label: "Über 600'000", value: 'q10_a', points: 1 },
      { label: "100'000", value: 'q10_b', points: 0 },
      { label: '1 Million', value: 'q10_c', points: 0 },
      { label: "50'000", value: 'q10_d', points: 0 },
    ],
    explanation:
      "Die Schweiz zählt über 600'000 KMU, die 99,7% aller Unternehmen des Landes ausmachen.",
  },
  {
    id: 11,
    question: 'Was ist generative KI?',
    options: [
      { label: 'Eine KI, die neue Inhalte erstellen kann', value: 'q11_a', points: 1 },
      { label: 'Eine KI, die programmiert', value: 'q11_b', points: 0 },
      { label: 'Eine Suchmaschine', value: 'q11_c', points: 0 },
      { label: 'Ein physischer Roboter', value: 'q11_d', points: 0 },
    ],
    explanation:
      'Generative KI erstellt neue Inhalte (Text, Bilder, Code, Musik) auf Basis von Modellen, die mit grossen Datenmengen trainiert wurden.',
  },
  {
    id: 12,
    question: 'Was ist das grösste KI-Risiko für KMU?',
    options: [
      { label: 'Sie nicht einzusetzen und an Wettbewerbsfähigkeit zu verlieren', value: 'q12_a', points: 1 },
      { label: 'Ersetzung aller Mitarbeitenden', value: 'q12_b', points: 0 },
      { label: 'Übermässige Kosten', value: 'q12_c', points: 0 },
      { label: 'Unmöglich zu nutzen', value: 'q12_d', points: 0 },
    ],
    explanation:
      'Das grösste Risiko für ein KMU ist, KI nicht einzusetzen und von agileren Wettbewerbern überholt zu werden.',
  },
  {
    id: 13,
    question: 'Wofür steht RAG in der KI?',
    options: [
      { label: 'Retrieval-Augmented Generation', value: 'q13_a', points: 1 },
      { label: 'Random Algorithm Generator', value: 'q13_b', points: 0 },
      { label: 'Real Artificial General', value: 'q13_c', points: 0 },
      { label: 'Remote Access Gateway', value: 'q13_d', points: 0 },
    ],
    explanation:
      'RAG (Retrieval-Augmented Generation) kombiniert Informationssuche und Textgenerierung für präzisere Antworten.',
  },
  {
    id: 14,
    question: 'Von welchem Unternehmen wird Claude AI entwickelt?',
    options: [
      { label: 'Anthropic', value: 'q14_a', points: 1 },
      { label: 'OpenAI', value: 'q14_b', points: 0 },
      { label: 'Google', value: 'q14_c', points: 0 },
      { label: 'Apple', value: 'q14_d', points: 0 },
    ],
    explanation:
      'Claude wird von Anthropic entwickelt, einem auf KI-Sicherheit spezialisierten Unternehmen, gegründet von ehemaligen OpenAI-Forschern.',
  },
  {
    id: 15,
    question: 'Was ist der beste Weg, KI in ein KMU zu integrieren?',
    options: [
      { label: 'Klein anfangen, Ergebnisse messen, dann erweitern', value: 'q15_a', points: 1 },
      { label: 'Alles auf einmal ersetzen', value: 'q15_b', points: 0 },
      { label: 'Warten, bis die Technik perfekt ist', value: 'q15_c', points: 0 },
      { label: 'Eine Armee von Entwicklern einstellen', value: 'q15_d', points: 0 },
    ],
    explanation:
      'Der schrittweise Ansatz (klein anfangen, testen, messen, dann erweitern) ist der effektivste Weg, KI in ein KMU zu integrieren.',
  },
];

const questionsEN: QuizQuestion[] = [
  {
    id: 1,
    question: 'What does GPT stand for in ChatGPT?',
    options: [
      { label: 'Generative Pre-trained Transformer', value: 'q1_a', points: 1 },
      { label: 'General Purpose Technology', value: 'q1_b', points: 0 },
      { label: 'Global Processing Tool', value: 'q1_c', points: 0 },
      { label: 'Graphical Pattern Translator', value: 'q1_d', points: 0 },
    ],
    explanation:
      'GPT stands for Generative Pre-trained Transformer, a neural network architecture.',
  },
  {
    id: 2,
    question: 'Which company created ChatGPT?',
    options: [
      { label: 'OpenAI', value: 'q2_a', points: 1 },
      { label: 'Google', value: 'q2_b', points: 0 },
      { label: 'Meta', value: 'q2_c', points: 0 },
      { label: 'Microsoft', value: 'q2_d', points: 0 },
    ],
    explanation:
      'ChatGPT was created by OpenAI, an AI research company founded in 2015.',
  },
  {
    id: 3,
    question: 'What is an LLM?',
    options: [
      { label: 'A Large Language Model', value: 'q3_a', points: 1 },
      { label: 'A marketing software', value: 'q3_b', points: 0 },
      { label: 'A local network', value: 'q3_c', points: 0 },
      { label: 'A type of database', value: 'q3_d', points: 0 },
    ],
    explanation:
      'LLM stands for Large Language Model. This is the type of AI behind ChatGPT, Claude and Gemini.',
  },
  {
    id: 4,
    question: 'Can AI be creative?',
    options: [
      { label: 'It can generate original content, but has no consciousness', value: 'q4_a', points: 1 },
      { label: 'Yes, it is conscious', value: 'q4_b', points: 0 },
      { label: 'No, never', value: 'q4_c', points: 0 },
      { label: 'Only in music', value: 'q4_d', points: 0 },
    ],
    explanation:
      'AI can produce original text, images and music, but it has neither consciousness nor intentionality.',
  },
  {
    id: 5,
    question: 'What is machine learning?',
    options: [
      { label: 'A subfield of AI where machines learn from data', value: 'q5_a', points: 1 },
      { label: 'A programming language', value: 'q5_b', points: 0 },
      { label: 'A type of computer', value: 'q5_c', points: 0 },
      { label: 'A software brand', value: 'q5_d', points: 0 },
    ],
    explanation:
      'Machine learning allows machines to learn from data without being explicitly programmed.',
  },
  {
    id: 6,
    question: 'What is the Swiss data protection law called?',
    options: [
      { label: 'nFADP', value: 'q6_a', points: 1 },
      { label: 'GDPR', value: 'q6_b', points: 0 },
      { label: 'CCPA', value: 'q6_c', points: 0 },
      { label: 'HIPAA', value: 'q6_d', points: 0 },
    ],
    explanation:
      'The nFADP (new Federal Act on Data Protection) has been in force since 1 September 2023.',
  },
  {
    id: 7,
    question: 'What is a prompt?',
    options: [
      { label: 'An instruction given to an AI', value: 'q7_a', points: 1 },
      { label: 'A type of virus', value: 'q7_b', points: 0 },
      { label: 'A programming language', value: 'q7_c', points: 0 },
      { label: 'A hardware component', value: 'q7_d', points: 0 },
    ],
    explanation:
      'A prompt is the instruction or question you give to an AI to get a response.',
  },
  {
    id: 8,
    question: "What does 'hallucination' mean in AI?",
    options: [
      { label: 'When AI generates false information presented as true', value: 'q8_a', points: 1 },
      { label: 'A visual bug', value: 'q8_b', points: 0 },
      { label: 'A virus', value: 'q8_c', points: 0 },
      { label: 'A type of attack', value: 'q8_d', points: 0 },
    ],
    explanation:
      'An AI hallucination is when the model confidently invents facts without any factual basis.',
  },
  {
    id: 9,
    question: 'Which AI tool specialises in translation?',
    options: [
      { label: 'DeepL', value: 'q9_a', points: 1 },
      { label: 'Midjourney', value: 'q9_b', points: 0 },
      { label: 'GitHub Copilot', value: 'q9_c', points: 0 },
      { label: 'Stable Diffusion', value: 'q9_d', points: 0 },
    ],
    explanation:
      'DeepL is an AI-powered translator known for the quality of its translations, especially in European languages.',
  },
  {
    id: 10,
    question: 'Approximately how many SMEs does Switzerland have?',
    options: [
      { label: 'More than 600,000', value: 'q10_a', points: 1 },
      { label: '100,000', value: 'q10_b', points: 0 },
      { label: '1 million', value: 'q10_c', points: 0 },
      { label: '50,000', value: 'q10_d', points: 0 },
    ],
    explanation:
      'Switzerland has over 600,000 SMEs, representing 99.7% of all businesses in the country.',
  },
  {
    id: 11,
    question: 'What is generative AI?',
    options: [
      { label: 'AI capable of creating new content', value: 'q11_a', points: 1 },
      { label: 'AI that programmes', value: 'q11_b', points: 0 },
      { label: 'A search engine', value: 'q11_c', points: 0 },
      { label: 'A physical robot', value: 'q11_d', points: 0 },
    ],
    explanation:
      'Generative AI creates new content (text, images, code, music) from models trained on large amounts of data.',
  },
  {
    id: 12,
    question: 'What is the main AI risk for SMEs?',
    options: [
      { label: 'Not adopting it and losing competitiveness', value: 'q12_a', points: 1 },
      { label: 'Replacing all employees', value: 'q12_b', points: 0 },
      { label: 'Excessive cost', value: 'q12_c', points: 0 },
      { label: 'Impossible to use', value: 'q12_d', points: 0 },
    ],
    explanation:
      'The biggest risk for an SME is not adopting AI and being overtaken by more agile competitors.',
  },
  {
    id: 13,
    question: 'What does RAG stand for in AI?',
    options: [
      { label: 'Retrieval-Augmented Generation', value: 'q13_a', points: 1 },
      { label: 'Random Algorithm Generator', value: 'q13_b', points: 0 },
      { label: 'Real Artificial General', value: 'q13_c', points: 0 },
      { label: 'Remote Access Gateway', value: 'q13_d', points: 0 },
    ],
    explanation:
      'RAG (Retrieval-Augmented Generation) combines information retrieval and text generation for more accurate answers.',
  },
  {
    id: 14,
    question: 'Which company develops Claude AI?',
    options: [
      { label: 'Anthropic', value: 'q14_a', points: 1 },
      { label: 'OpenAI', value: 'q14_b', points: 0 },
      { label: 'Google', value: 'q14_c', points: 0 },
      { label: 'Apple', value: 'q14_d', points: 0 },
    ],
    explanation:
      'Claude is developed by Anthropic, a company specialising in AI safety, founded by former OpenAI researchers.',
  },
  {
    id: 15,
    question: 'What is the best way to integrate AI into an SME?',
    options: [
      { label: 'Start small, measure results, then expand', value: 'q15_a', points: 1 },
      { label: 'Replace everything at once', value: 'q15_b', points: 0 },
      { label: 'Wait until the technology is perfect', value: 'q15_c', points: 0 },
      { label: 'Hire an army of developers', value: 'q15_d', points: 0 },
    ],
    explanation:
      'The progressive approach (start small, test, measure, then expand) is the most effective way to integrate AI into an SME.',
  },
];

const questionsIT: QuizQuestion[] = [
  {
    id: 1,
    question: 'Cosa significa GPT in ChatGPT?',
    options: [
      { label: 'Generative Pre-trained Transformer', value: 'q1_a', points: 1 },
      { label: 'General Purpose Technology', value: 'q1_b', points: 0 },
      { label: 'Global Processing Tool', value: 'q1_c', points: 0 },
      { label: 'Graphical Pattern Translator', value: 'q1_d', points: 0 },
    ],
    explanation:
      "GPT sta per Generative Pre-trained Transformer, un'architettura di rete neurale.",
  },
  {
    id: 2,
    question: 'Quale azienda ha creato ChatGPT?',
    options: [
      { label: 'OpenAI', value: 'q2_a', points: 1 },
      { label: 'Google', value: 'q2_b', points: 0 },
      { label: 'Meta', value: 'q2_c', points: 0 },
      { label: 'Microsoft', value: 'q2_d', points: 0 },
    ],
    explanation:
      "ChatGPT è stato creato da OpenAI, un'azienda di ricerca sull'intelligenza artificiale fondata nel 2015.",
  },
  {
    id: 3,
    question: "Cos'è un LLM?",
    options: [
      { label: 'Un grande modello linguistico', value: 'q3_a', points: 1 },
      { label: 'Un software di marketing', value: 'q3_b', points: 0 },
      { label: 'Una rete locale', value: 'q3_c', points: 0 },
      { label: 'Un tipo di database', value: 'q3_d', points: 0 },
    ],
    explanation:
      "LLM sta per Large Language Model (grande modello linguistico). È il tipo di IA dietro ChatGPT, Claude e Gemini.",
  },
  {
    id: 4,
    question: "L'IA può essere creativa?",
    options: [
      { label: 'Può generare contenuti originali, ma non ha coscienza', value: 'q4_a', points: 1 },
      { label: 'Sì, è cosciente', value: 'q4_b', points: 0 },
      { label: 'No, mai', value: 'q4_c', points: 0 },
      { label: 'Solo nella musica', value: 'q4_d', points: 0 },
    ],
    explanation:
      "L'IA può produrre testi, immagini e musica originali, ma non ha né coscienza né intenzionalità.",
  },
  {
    id: 5,
    question: "Cos'è il machine learning?",
    options: [
      { label: "Un sottocampo dell'IA in cui le macchine imparano dai dati", value: 'q5_a', points: 1 },
      { label: 'Un linguaggio di programmazione', value: 'q5_b', points: 0 },
      { label: 'Un tipo di computer', value: 'q5_c', points: 0 },
      { label: 'Un marchio di software', value: 'q5_d', points: 0 },
    ],
    explanation:
      'Il machine learning (apprendimento automatico) permette alle macchine di imparare dai dati senza essere esplicitamente programmate.',
  },
  {
    id: 6,
    question: 'Come si chiama la legge svizzera sulla protezione dei dati?',
    options: [
      { label: 'nLPD', value: 'q6_a', points: 1 },
      { label: 'GDPR', value: 'q6_b', points: 0 },
      { label: 'CCPA', value: 'q6_c', points: 0 },
      { label: 'HIPAA', value: 'q6_d', points: 0 },
    ],
    explanation:
      "La nLPD (nuova Legge federale sulla Protezione dei Dati) è in vigore dal 1° settembre 2023.",
  },
  {
    id: 7,
    question: "Cos'è un prompt?",
    options: [
      { label: "Un'istruzione data a un'IA", value: 'q7_a', points: 1 },
      { label: 'Un tipo di virus', value: 'q7_b', points: 0 },
      { label: 'Un linguaggio di programmazione', value: 'q7_c', points: 0 },
      { label: 'Un componente hardware', value: 'q7_d', points: 0 },
    ],
    explanation:
      "Un prompt è l'istruzione o la domanda che date a un'IA per ottenere una risposta.",
  },
  {
    id: 8,
    question: "Cosa significa 'allucinazione' nell'IA?",
    options: [
      { label: "Quando l'IA genera informazioni false presentate come vere", value: 'q8_a', points: 1 },
      { label: 'Un bug visivo', value: 'q8_b', points: 0 },
      { label: 'Un virus', value: 'q8_c', points: 0 },
      { label: 'Un tipo di attacco', value: 'q8_d', points: 0 },
    ],
    explanation:
      "Un'allucinazione IA è quando il modello inventa fatti con sicurezza, senza base fattuale.",
  },
  {
    id: 9,
    question: 'Quale strumento IA è specializzato nella traduzione?',
    options: [
      { label: 'DeepL', value: 'q9_a', points: 1 },
      { label: 'Midjourney', value: 'q9_b', points: 0 },
      { label: 'GitHub Copilot', value: 'q9_c', points: 0 },
      { label: 'Stable Diffusion', value: 'q9_d', points: 0 },
    ],
    explanation:
      "DeepL è un traduttore basato sull'IA, riconosciuto per la qualità delle sue traduzioni, soprattutto nelle lingue europee.",
  },
  {
    id: 10,
    question: 'Quante PMI ha approssimativamente la Svizzera?',
    options: [
      { label: "Più di 600'000", value: 'q10_a', points: 1 },
      { label: "100'000", value: 'q10_b', points: 0 },
      { label: '1 milione', value: 'q10_c', points: 0 },
      { label: "50'000", value: 'q10_d', points: 0 },
    ],
    explanation:
      "La Svizzera conta più di 600'000 PMI, che rappresentano il 99,7% di tutte le aziende del paese.",
  },
  {
    id: 11,
    question: "Cos'è l'IA generativa?",
    options: [
      { label: "Un'IA capace di creare contenuti nuovi", value: 'q11_a', points: 1 },
      { label: "Un'IA che programma", value: 'q11_b', points: 0 },
      { label: 'Un motore di ricerca', value: 'q11_c', points: 0 },
      { label: 'Un robot fisico', value: 'q11_d', points: 0 },
    ],
    explanation:
      "L'IA generativa crea contenuti nuovi (testo, immagini, codice, musica) a partire da modelli addestrati su grandi quantità di dati.",
  },
  {
    id: 12,
    question: "Qual è il principale rischio dell'IA per le PMI?",
    options: [
      { label: 'Non adottarla e perdere competitività', value: 'q12_a', points: 1 },
      { label: 'Sostituzione di tutti i dipendenti', value: 'q12_b', points: 0 },
      { label: 'Costo eccessivo', value: 'q12_c', points: 0 },
      { label: 'Impossibile da usare', value: 'q12_d', points: 0 },
    ],
    explanation:
      "Il rischio maggiore per una PMI è non adottare l'IA e farsi superare da concorrenti più agili.",
  },
  {
    id: 13,
    question: "Cosa significa RAG nell'IA?",
    options: [
      { label: 'Retrieval-Augmented Generation', value: 'q13_a', points: 1 },
      { label: 'Random Algorithm Generator', value: 'q13_b', points: 0 },
      { label: 'Real Artificial General', value: 'q13_c', points: 0 },
      { label: 'Remote Access Gateway', value: 'q13_d', points: 0 },
    ],
    explanation:
      "RAG (Retrieval-Augmented Generation) combina ricerca di informazioni e generazione di testo per risposte più precise.",
  },
  {
    id: 14,
    question: 'Claude AI è sviluppato da quale azienda?',
    options: [
      { label: 'Anthropic', value: 'q14_a', points: 1 },
      { label: 'OpenAI', value: 'q14_b', points: 0 },
      { label: 'Google', value: 'q14_c', points: 0 },
      { label: 'Apple', value: 'q14_d', points: 0 },
    ],
    explanation:
      "Claude è sviluppato da Anthropic, un'azienda specializzata nella sicurezza dell'IA, fondata da ex ricercatori di OpenAI.",
  },
  {
    id: 15,
    question: "Qual è il modo migliore per integrare l'IA in una PMI?",
    options: [
      { label: 'Iniziare in piccolo, misurare i risultati, poi espandere', value: 'q15_a', points: 1 },
      { label: "Sostituire tutto d'un colpo", value: 'q15_b', points: 0 },
      { label: 'Aspettare che la tecnologia sia perfetta', value: 'q15_c', points: 0 },
      { label: 'Assumere un esercito di sviluppatori', value: 'q15_d', points: 0 },
    ],
    explanation:
      "L'approccio progressivo (iniziare in piccolo, testare, misurare, poi espandere) è il più efficace per integrare l'IA in una PMI.",
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
    maxScore: 5,
    label: 'Novice IA',
    color: '#ef4444',
    description: "Vous débutez en IA, c'est le moment d'apprendre !",
    recommendations: [
      'Suivez notre blog pour des articles accessibles sur l\'IA',
      'Testez ChatGPT et Claude pour vos tâches quotidiennes',
      'Inscrivez-vous à notre formation "IA pour débutants"',
    ],
  },
  {
    minScore: 6,
    maxScore: 10,
    label: 'Connaisseur IA',
    color: '#f97316',
    description: 'Bonnes bases ! Approfondissez avec nos formations.',
    recommendations: [
      'Explorez des outils IA avancés comme Midjourney ou Copilot',
      'Apprenez les techniques de prompt engineering',
      'Découvrez comment l\'IA peut transformer votre secteur',
    ],
  },
  {
    minScore: 11,
    maxScore: 13,
    label: 'Expert IA',
    color: '#3b82f6',
    description: 'Impressionnant ! Vous maîtrisez le sujet.',
    recommendations: [
      'Partagez vos connaissances avec vos collègues',
      'Explorez les concepts avancés : RAG, fine-tuning, agents IA',
      'Devenez ambassadeur IA dans votre entreprise',
    ],
  },
  {
    minScore: 14,
    maxScore: 15,
    label: 'Génie IA',
    color: '#22c55e',
    description: 'Parfait ou presque ! Vous êtes un vrai expert.',
    recommendations: [
      'Vous pourriez former vos pairs à l\'IA',
      'Explorez les dernières avancées : modèles multimodaux, IA agentique',
      'Contactez-nous pour devenir partenaire formateur',
    ],
  },
];

const levelsDE: LevelDef[] = [
  {
    minScore: 0,
    maxScore: 5,
    label: 'KI-Neuling',
    color: '#ef4444',
    description: 'Sie beginnen gerade mit KI – der perfekte Zeitpunkt zum Lernen!',
    recommendations: [
      'Folgen Sie unserem Blog für zugängliche KI-Artikel',
      'Testen Sie ChatGPT und Claude für Ihre täglichen Aufgaben',
      'Melden Sie sich für unsere Schulung "KI für Einsteiger" an',
    ],
  },
  {
    minScore: 6,
    maxScore: 10,
    label: 'KI-Kenner',
    color: '#f97316',
    description: 'Gute Grundlagen! Vertiefen Sie Ihr Wissen mit unseren Schulungen.',
    recommendations: [
      'Erkunden Sie fortgeschrittene KI-Tools wie Midjourney oder Copilot',
      'Lernen Sie Prompt-Engineering-Techniken',
      'Entdecken Sie, wie KI Ihre Branche transformieren kann',
    ],
  },
  {
    minScore: 11,
    maxScore: 13,
    label: 'KI-Experte',
    color: '#3b82f6',
    description: 'Beeindruckend! Sie beherrschen das Thema.',
    recommendations: [
      'Teilen Sie Ihr Wissen mit Ihren Kollegen',
      'Erkunden Sie fortgeschrittene Konzepte: RAG, Fine-Tuning, KI-Agenten',
      'Werden Sie KI-Botschafter in Ihrem Unternehmen',
    ],
  },
  {
    minScore: 14,
    maxScore: 15,
    label: 'KI-Genie',
    color: '#22c55e',
    description: 'Perfekt oder fast! Sie sind ein wahrer Experte.',
    recommendations: [
      'Sie könnten Ihre Kollegen in KI schulen',
      'Erkunden Sie die neuesten Entwicklungen: multimodale Modelle, agentische KI',
      'Kontaktieren Sie uns, um Schulungspartner zu werden',
    ],
  },
];

const levelsEN: LevelDef[] = [
  {
    minScore: 0,
    maxScore: 5,
    label: 'AI Novice',
    color: '#ef4444',
    description: "You're just starting with AI – it's the perfect time to learn!",
    recommendations: [
      'Follow our blog for accessible AI articles',
      'Try ChatGPT and Claude for your daily tasks',
      'Sign up for our "AI for beginners" training',
    ],
  },
  {
    minScore: 6,
    maxScore: 10,
    label: 'AI Connoisseur',
    color: '#f97316',
    description: 'Good foundations! Deepen your knowledge with our courses.',
    recommendations: [
      'Explore advanced AI tools like Midjourney or Copilot',
      'Learn prompt engineering techniques',
      'Discover how AI can transform your industry',
    ],
  },
  {
    minScore: 11,
    maxScore: 13,
    label: 'AI Expert',
    color: '#3b82f6',
    description: 'Impressive! You have a strong grasp of the subject.',
    recommendations: [
      'Share your knowledge with your colleagues',
      'Explore advanced concepts: RAG, fine-tuning, AI agents',
      'Become an AI ambassador in your company',
    ],
  },
  {
    minScore: 14,
    maxScore: 15,
    label: 'AI Genius',
    color: '#22c55e',
    description: 'Perfect or nearly! You are a true expert.',
    recommendations: [
      'You could train your peers on AI',
      'Explore the latest advances: multimodal models, agentic AI',
      'Contact us to become a training partner',
    ],
  },
];

const levelsIT: LevelDef[] = [
  {
    minScore: 0,
    maxScore: 5,
    label: 'Novizio IA',
    color: '#ef4444',
    description: "State iniziando con l'IA – è il momento perfetto per imparare!",
    recommendations: [
      'Seguite il nostro blog per articoli accessibili sull\'IA',
      'Provate ChatGPT e Claude per le vostre attività quotidiane',
      'Iscrivetevi alla nostra formazione "IA per principianti"',
    ],
  },
  {
    minScore: 6,
    maxScore: 10,
    label: 'Conoscitore IA',
    color: '#f97316',
    description: 'Buone basi! Approfondite con le nostre formazioni.',
    recommendations: [
      'Esplorate strumenti IA avanzati come Midjourney o Copilot',
      'Imparate le tecniche di prompt engineering',
      'Scoprite come l\'IA può trasformare il vostro settore',
    ],
  },
  {
    minScore: 11,
    maxScore: 13,
    label: 'Esperto IA',
    color: '#3b82f6',
    description: "Impressionante! Padroneggiate l'argomento.",
    recommendations: [
      'Condividete le vostre conoscenze con i colleghi',
      'Esplorate concetti avanzati: RAG, fine-tuning, agenti IA',
      'Diventate ambasciatori IA nella vostra azienda',
    ],
  },
  {
    minScore: 14,
    maxScore: 15,
    label: 'Genio IA',
    color: '#22c55e',
    description: 'Perfetto o quasi! Siete dei veri esperti.',
    recommendations: [
      'Potreste formare i vostri colleghi sull\'IA',
      'Esplorate le ultime novità: modelli multimodali, IA agentica',
      'Contattateci per diventare partner formatori',
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
    breadcrumbTitle: 'Test Connaissances IA',
    heroTitle: 'Testez vos connaissances en IA',
    heroSubtitle: '15 questions pour évaluer votre niveau et partager votre score',
    quizTitle: 'Testez vos connaissances en IA',
    startButton: 'Commencer le test',
    infoBadge: '15 questions \u2022 Tous niveaux \u2022 Résultats partageables',
    resultTitle: 'Vos résultats',
    ctaButton: 'Découvrir nos formations IA',
    sharePrefix: "J'ai obtenu {score}/15 au Quiz Connaissances IA ! Testez-vous :",
    emailPlaceholder: 'votre@email.ch',
    emailButton: 'Recevoir mes résultats',
  },
  de: {
    breadcrumbHome: 'Startseite',
    breadcrumbQuiz: 'Quiz',
    breadcrumbTitle: 'KI-Wissenstest',
    heroTitle: 'Testen Sie Ihr KI-Wissen',
    heroSubtitle: '15 Fragen, um Ihr Niveau zu bewerten und Ihren Score zu teilen',
    quizTitle: 'Testen Sie Ihr KI-Wissen',
    startButton: 'Test starten',
    infoBadge: '15 Fragen \u2022 Alle Niveaus \u2022 Teilbare Ergebnisse',
    resultTitle: 'Ihre Ergebnisse',
    ctaButton: 'Unsere KI-Schulungen entdecken',
    sharePrefix: 'Ich habe {score}/15 beim KI-Wissensquiz erreicht! Testen Sie sich:',
    emailPlaceholder: 'ihre@email.ch',
    emailButton: 'Ergebnisse erhalten',
  },
  en: {
    breadcrumbHome: 'Home',
    breadcrumbQuiz: 'Quiz',
    breadcrumbTitle: 'AI Knowledge Test',
    heroTitle: 'Test your AI knowledge',
    heroSubtitle: '15 questions to evaluate your level and share your score',
    quizTitle: 'Test your AI knowledge',
    startButton: 'Start the test',
    infoBadge: '15 questions \u2022 All levels \u2022 Shareable results',
    resultTitle: 'Your results',
    ctaButton: 'Discover our AI training',
    sharePrefix: 'I scored {score}/15 on the AI Knowledge Quiz! Test yourself:',
    emailPlaceholder: 'your@email.ch',
    emailButton: 'Get my results',
  },
  it: {
    breadcrumbHome: 'Home',
    breadcrumbQuiz: 'Quiz',
    breadcrumbTitle: 'Test Conoscenze IA',
    heroTitle: 'Testate le vostre conoscenze in IA',
    heroSubtitle: '15 domande per valutare il vostro livello e condividere il vostro punteggio',
    quizTitle: 'Testate le vostre conoscenze in IA',
    startButton: 'Iniziare il test',
    infoBadge: '15 domande \u2022 Tutti i livelli \u2022 Risultati condivisibili',
    resultTitle: 'I vostri risultati',
    ctaButton: 'Scoprite le nostre formazioni IA',
    sharePrefix: 'Ho ottenuto {score}/15 al Quiz Conoscenze IA! Testatevi:',
    emailPlaceholder: 'vostra@email.ch',
    emailButton: 'Ricevere i risultati',
  },
};

/* ─────────── Helper: find level from score ─────────── */

function findLevel(score: number, levels: LevelDef[]): LevelDef {
  return levels.find((l) => score >= l.minScore && score <= l.maxScore) || levels[0];
}

/* ─────────── Page Component ─────────── */

export default function TestConnaissancesPage() {
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
                  d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
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
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                    />
                  ),
                  title: '15 questions',
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342"
                    />
                  ),
                  title: locale === 'fr' ? 'Tous niveaux' : locale === 'de' ? 'Alle Niveaus' : locale === 'it' ? 'Tutti i livelli' : 'All levels',
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                    />
                  ),
                  title: locale === 'fr' ? 'Partageable' : locale === 'de' ? 'Teilbar' : locale === 'it' ? 'Condivisibile' : 'Shareable',
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
            showExplanation={true}
          />
        </section>
      )}

      {/* ─── Result Screen ─── */}
      {phase === 'result' && (
        <section className="px-4 pb-20 pt-12 sm:px-6 lg:px-8">
          <QuizResult
            title={ui.resultTitle}
            score={score}
            maxScore={15}
            level={currentLevel.label}
            levelDescription={currentLevel.description}
            levelColor={currentLevel.color}
            recommendations={currentLevel.recommendations}
            showEmailCapture={false}
            shareText={ui.sharePrefix.replace('{score}', String(score))}
            shareUrl={`https://iapmesuisse.ch/${locale}/quiz/test-connaissances`}
            ctaText={ui.ctaButton}
            ctaHref="/formation-ia-pme"
          />
        </section>
      )}
    </>
  );
}
