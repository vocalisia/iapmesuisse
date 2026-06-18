import { sanitizePublicText } from './public-text';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://iapmesuisse.ch';

const localeMap: Record<string, string> = {
  fr: 'fr-CH',
  de: 'de-CH',
  en: 'en-GB',
  it: 'it-CH',
};

export function getSchemaLanguage(locale: string) {
  return localeMap[locale] || 'fr-CH';
}

export function getSiteUrl() {
  return SITE_URL;
}

export function stripHtml(value: string) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

export function sanitizePublicPricingText(value: string, locale?: string) {
  return sanitizePublicText(value, locale);
}

export function buildFaqSchema(items: { question: string; answer: string }[], locale = 'fr') {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: sanitizePublicPricingText(item.question, locale),
      acceptedAnswer: {
        '@type': 'Answer',
        text: sanitizePublicPricingText(stripHtml(item.answer), locale),
      },
    })),
  };
}

export function buildHowToSchema(params: {
  name: string;
  description: string;
  url: string;
  steps: { name: string; text: string }[];
  locale: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: sanitizePublicPricingText(params.name, params.locale),
    description: sanitizePublicPricingText(stripHtml(params.description), params.locale),
    inLanguage: getSchemaLanguage(params.locale),
    url: params.url,
    publisher: { '@id': `${SITE_URL}/#organization` },
    step: params.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: sanitizePublicPricingText(stripHtml(step.name), params.locale),
      text: sanitizePublicPricingText(stripHtml(step.text), params.locale),
    })),
  };
}

export function buildHowToFromHtml(params: {
  title: string;
  description: string;
  html: string;
  url: string;
  locale: string;
}) {
  const shouldUseHowTo =
    /(guide|checklist|comment|how-|how to|leitfaden|guida|pratique|practical|strategie|strategy|process|roadmap|tutorial|tutoriel)/i.test(
      `${params.title} ${params.url}`
    );

  if (!shouldUseHowTo) return null;

  const headingMatches = [...params.html.matchAll(/<h[23][^>]*>(.*?)<\/h[23]>/gi)];
  const steps = headingMatches
    .map((match, index) => {
      const start = match.index !== undefined ? match.index + match[0].length : 0;
      const end = headingMatches[index + 1]?.index ?? params.html.length;
      const sectionHtml = params.html.slice(start, end);
      const firstParagraph =
        sectionHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1] || sectionHtml;
      return {
        name: sanitizePublicPricingText(stripHtml(match[1]), params.locale),
        text: sanitizePublicPricingText(stripHtml(firstParagraph), params.locale).slice(0, 500),
      };
    })
    .filter((step) => step.name.length > 0 && step.text.length > 20)
    .slice(0, 8);

  if (steps.length < 2) return null;

  return buildHowToSchema({
    name: params.title,
    description: params.description,
    url: params.url,
    steps,
    locale: params.locale,
  });
}

export function buildHomeFaqSchema(locale: string) {
  const faqsByLocale: Record<string, { question: string; answer: string }[]> = {
    fr: [
      {
        question: "Que fait IAPME Suisse pour les PME ?",
        answer:
          "IAPME Suisse accompagne les PME dans l'audit IA, la formation des équipes, l'automatisation de processus et l'intégration d'outils comme ChatGPT, Copilot, Claude, Make ou n8n.",
      },
      {
        question: "Comment démarrer un projet IA sans risque ?",
        answer:
          "Le point de départ recommandé est un audit de maturité IA. Il identifie les processus prioritaires, les contraintes nLPD et AI Act, les données sensibles et les premiers cas d'usage mesurables.",
      },
      {
        question: "IAPME Suisse intervient-il dans toute la Suisse ?",
        answer:
          "Oui. L'accompagnement couvre la Suisse romande, la Suisse alémanique et le Tessin, avec des services en français, allemand, italien et anglais.",
      },
    ],
    de: [
      {
        question: "Was macht IAPME Suisse für Schweizer KMU ?",
        answer:
          "IAPME Suisse begleitet KMU bei KI-Audit, Team-Schulung, Prozessautomatisierung und Integration von Tools wie ChatGPT, Copilot, Claude, Make oder n8n.",
      },
      {
        question: "Wie startet ein KI-Projekt ohne unnötiges Risiko ?",
        answer:
          "Empfohlen ist ein KI-Reifegrad-Audit. Es klärt priorisierte Prozesse, nDSG- und AI-Act-Anforderungen, sensible Daten und die ersten messbaren Anwendungsfälle.",
      },
      {
        question: "Arbeitet IAPME Suisse in der ganzen Schweiz ?",
        answer:
          "Ja. Die Begleitung deckt die Romandie, die Deutschschweiz und das Tessin ab, mit Services auf Französisch, Deutsch, Italienisch und Englisch.",
      },
    ],
    en: [
      {
        question: "What does IAPME Suisse do for Swiss SMEs?",
        answer:
          "IAPME Suisse supports SMEs with AI audits, team training, process automation and integration of tools such as ChatGPT, Copilot, Claude, Make and n8n.",
      },
      {
        question: "How should a Swiss SME start an AI project safely?",
        answer:
          "The recommended starting point is an AI maturity audit. It identifies priority processes, nFADP and AI Act constraints, sensitive data and the first measurable use cases.",
      },
      {
        question: "Does IAPME Suisse serve all Swiss regions?",
        answer:
          "Yes. Support covers French-speaking Switzerland, German-speaking Switzerland and Ticino, with services in French, German, Italian and English.",
      },
    ],
    it: [
      {
        question: "Cosa fa IAPME Suisse per le PMI svizzere?",
        answer:
          "IAPME Suisse accompagna le PMI con audit IA, formazione dei team, automazione dei processi e integrazione di strumenti come ChatGPT, Copilot, Claude, Make e n8n.",
      },
      {
        question: "Come iniziare un progetto IA senza rischi inutili?",
        answer:
          "Il punto di partenza consigliato è un audit di maturità IA. Identifica processi prioritari, vincoli nLPD e AI Act, dati sensibili e primi casi d'uso misurabili.",
      },
      {
        question: "IAPME Suisse lavora in tutta la Svizzera?",
        answer:
          "Sì. L'accompagnamento copre Svizzera romanda, Svizzera tedesca e Ticino, con servizi in francese, tedesco, italiano e inglese.",
      },
    ],
  };

  return buildFaqSchema(faqsByLocale[locale] ?? faqsByLocale.fr, locale);
}

export function isPublicPricingSlug(slug: string) {
  return /(^|-)prix-|prix-|tarif|tarifs|pricing|price|preise|kosten|costi|budget-ia|cantons-chf|chf$/i.test(slug);
}
