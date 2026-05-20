import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getAlternates } from '@/lib/metadata';
import { VILLES, getVilleBySlug } from '@/lib/villes';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTA from '@/components/CTA';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ locale: string; ville: string }> };

const LOCALES = ['fr', 'de', 'en', 'it'] as const;

export function generateStaticParams() {
  const params: { locale: string; ville: string }[] = [];
  for (const locale of LOCALES) {
    for (const v of VILLES) {
      params.push({ locale, ville: v.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props) {
  const { locale, ville: slug } = await params;
  const ville = getVilleBySlug(slug);
  if (!ville) return {};
  const name = ville.names[locale as keyof typeof ville.names] ?? ville.names.fr;
  const cantonName = ville.cantonNames[locale as keyof typeof ville.cantonNames] ?? ville.cantonNames.fr;

  const titles: Record<string, string> = {
    fr: `Agence IA PME ${name} · Audit gratuit + Formation — IAPME Suisse`,
    de: `KI-Agentur KMU ${name} · Kostenloses Audit + Schulung — IAPME Suisse`,
    en: `AI Agency for SMEs in ${name} · Free Audit + Training — IAPME Suisse`,
    it: `Agenzia IA PMI ${name} · Audit gratuito + Formazione — IAPME Suisse`,
  };
  const descs: Record<string, string> = {
    fr: `Agence IA pour PME à ${name} (canton de ${cantonName}) : audit gratuit 30 min, formation ChatGPT/Copilot, intégration outils. nLPD + AI Act. Devis en 24h.`,
    de: `KI-Agentur für KMU in ${name} (Kanton ${cantonName}): kostenloses 30-Min-Audit, ChatGPT/Copilot-Schulung, Tool-Integration. nDSG + AI Act. Offerte in 24h.`,
    en: `AI agency for SMEs in ${name} (canton ${cantonName}): free 30-min audit, ChatGPT/Copilot training, tool integration. nFADP + AI Act. Quote in 24h.`,
    it: `Agenzia IA per PMI a ${name} (cantone ${cantonName}): audit gratuito 30 min, formazione ChatGPT/Copilot, integrazione strumenti. nLPD + AI Act. Preventivo in 24h.`,
  };

  return {
    title: titles[locale] ?? titles.fr,
    description: descs[locale] ?? descs.fr,
    alternates: getAlternates(locale, `/villes/${slug}`),
  };
}

type LocaleCopy = {
  hero: { eyebrow: (cantonName: string) => string; h1: (name: string) => string; intro: (name: string, smeCount: string, ecosystem: string) => string };
  ctaButton: string;
  sectionTitles: {
    districts: string;
    sectors: string;
    ecosystem: string;
    useCases: string;
    services: string;
    why: string;
    faq: string;
    related: string;
  };
  breadcrumbVilles: string;
  useCases: { title: string; desc: string }[];
  services: { title: string; desc: string; href: string }[];
  whyItems: string[];
  related: (cantonSlug: string) => { title: string; href: string }[];
  ctaTitle: (name: string) => string;
  ctaDesc: string;
  faqMaker: (name: string, cantonName: string, ecosystem: string) => { q: string; a: string }[];
};

const COPY: Record<string, LocaleCopy> = {
  fr: {
    hero: {
      eyebrow: (cantonName) => `Canton de ${cantonName} · Suisse`,
      h1: (name) => `Agence IA pour PME à ${name} : audit gratuit + formation`,
      intro: (name, smeCount, ecosystem) =>
        `Vous dirigez une PME parmi les ${smeCount} entreprises de la région de ${name} ? IAPME Suisse accompagne les PME locales dans l'adoption concrète de l'intelligence artificielle : audit gratuit, formation des équipes, intégration ChatGPT/Copilot/Claude. Présence dans l'écosystème ${ecosystem.split('·')[0].trim()}. Conformité nLPD + AI Act, ROI mesuré en 4-12 semaines.`,
    },
    ctaButton: 'Réserver mon audit gratuit',
    sectionTitles: {
      districts: 'Quartiers d\'affaires desservis',
      sectors: 'Secteurs à fort ROI IA',
      ecosystem: 'Écosystème innovation local',
      useCases: 'Cas d\'usage IA concrets',
      services: 'Nos services pour les PME locales',
      why: 'Pourquoi choisir IAPME Suisse',
      faq: 'Questions fréquentes',
      related: 'Ressources liées',
    },
    breadcrumbVilles: 'Villes',
    useCases: [
      { title: 'Chatbot IA service client 24/7', desc: 'Déploiement sur site web + WhatsApp Business avec base de connaissances métier. ROI typique : -40% volume tickets niveau 1 en 8 semaines.' },
      { title: 'Automatisation devis & relances', desc: 'ChatGPT + Make/Zapier pour générer devis, suivre paiements, relances automatisées multi-canaux. Gain : 6-12 h/sem par commercial.' },
      { title: 'Assistant virtuel administratif', desc: 'Copilot Microsoft 365 + agents personnalisés pour rapports, comptes-rendus, recherche documentaire. Conformité nLPD.' },
      { title: 'IA pour génération de leads B2B', desc: 'Prospection automatisée Apollo + ChatGPT + LinkedIn Sales Navigator. Personnalisation à grande échelle, audit nLPD inclus.' },
    ],
    services: [
      { title: 'Audit IA gratuit 30-60 min', desc: 'Cartographie processus, 5 quick-wins, score maturité IA, roadmap 90 jours. Rapport PDF sous 48h.', href: '/contact' },
      { title: 'Formation IA sur mesure', desc: 'FR/DE/IT, sessions équipes ou dirigeants. Conforme art. 4 AI Act. Subventions cantonales mobilisables.', href: '/formation-ia-pme' },
      { title: 'Intégration outils IA', desc: 'ChatGPT Team, Microsoft Copilot, Claude Pro, Make/Zapier, n8n auto-hébergé. Hosting Suisse ou UE.', href: '/services' },
      { title: 'Consulting stratégique', desc: 'Audit Express, accompagnement 90 jours, mise en conformité nLPD + AI Act, gouvernance des données.', href: '/consulting' },
    ],
    whyItems: [
      'Spécialisation PME 5-50 employés (pas un cabinet généraliste)',
      'Multilingue FR · DE · IT · EN',
      'Présence physique Suisse romande, alémanique et Tessin',
      'Conformité nLPD + AI Act intégrée à chaque mission',
      'Audit gratuit sans engagement, rapport PDF en 48h',
      'Tarifs CHF transparents, devis sous 24h',
    ],
    related: (cantonSlug) => [
      { title: `Voir toutes les ressources du canton de ${cantonSlug}`, href: `/cantons/${cantonSlug}` },
      { title: 'Stratégie IA PME Suisse — plan d\'action 2026', href: '/blog/strategie-ia-pme-suisse-2026' },
      { title: 'ROI Intelligence Artificielle PME Suisse', href: '/blog/roi-intelligence-artificielle-pme-transformation-digitale' },
      { title: 'Études de cas PME romandes', href: '/blog/etudes-cas-pme-romandes-ia' },
    ],
    ctaTitle: (name) => `Démarrons votre projet IA à ${name}`,
    ctaDesc: 'Réservez 30 minutes gratuites pour cartographier vos processus et identifier vos quick-wins IA.',
    faqMaker: (name, cantonName, ecosystem) => [
      {
        q: `Quels services IA proposez-vous aux PME de ${name} ?`,
        a: `IAPME Suisse propose à ${name} : audit IA gratuit, formation équipes (ChatGPT, Copilot, Claude), intégration d'outils, consulting stratégique. Conformité nLPD + AI Act incluse. Sur site ou en visio.`,
      },
      {
        q: `Combien coûte un projet IA pour une PME de ${name} ?`,
        a: `L'audit initial est gratuit (30-60 min + rapport sous 48h). Les missions d'accompagnement démarrent par un quick-win 4-8 semaines, devis personnalisé sous 24h. Subventions cantonales et InnoSuisse mobilisables.`,
      },
      {
        q: `Travaillez-vous avec l'écosystème innovation de ${name} ?`,
        a: `Oui. Nous collaborons avec les acteurs locaux : ${ecosystem}. Mise en relation possible avec experts académiques et clusters.`,
      },
      {
        q: `Quelles aides cantonales pour un projet IA à ${name} (canton de ${cantonName}) ?`,
        a: `Subventions cantonales spécifiques au canton de ${cantonName}, complétées par InnoSuisse (jusqu'à 75 000 CHF), chèque innovation (15 000 CHF) et déductions fiscales formation continue.`,
      },
    ],
  },
  de: {
    hero: {
      eyebrow: (cantonName) => `Kanton ${cantonName} · Schweiz`,
      h1: (name) => `KI-Agentur für KMU in ${name}: kostenloses Audit + Schulung`,
      intro: (name, smeCount, ecosystem) =>
        `Sie führen ein KMU unter den ${smeCount} Unternehmen in der Region ${name}? IAPME Suisse begleitet lokale KMU bei der konkreten Einführung von KI: kostenloses Audit, Teamschulung, Integration von ChatGPT/Copilot/Claude. Präsenz im Ökosystem ${ecosystem.split('·')[0].trim()}. nDSG- und AI-Act-konform, ROI in 4-12 Wochen.`,
    },
    ctaButton: 'Kostenloses Audit buchen',
    sectionTitles: {
      districts: 'Bediente Geschäftsquartiere',
      sectors: 'Branchen mit hohem KI-ROI',
      ecosystem: 'Lokales Innovationsökosystem',
      useCases: 'Konkrete KI-Anwendungsfälle',
      services: 'Unsere Leistungen für lokale KMU',
      why: 'Warum IAPME Suisse',
      faq: 'Häufige Fragen',
      related: 'Verwandte Ressourcen',
    },
    breadcrumbVilles: 'Städte',
    useCases: [
      { title: 'KI-Chatbot Kundenservice 24/7', desc: 'Einsatz auf Website + WhatsApp Business mit firmenspezifischer Wissensbasis. Typischer ROI: -40 % Level-1-Tickets in 8 Wochen.' },
      { title: 'Automatisierung Offerten & Mahnungen', desc: 'ChatGPT + Make/Zapier für Offerterstellung, Zahlungsverfolgung, mehrkanalige Mahnungen. Gewinn: 6-12 h/Woche pro Vertriebler.' },
      { title: 'Virtueller Verwaltungsassistent', desc: 'Microsoft 365 Copilot + spezialisierte Agenten für Berichte, Protokolle, Dokumentensuche. nDSG-konform.' },
      { title: 'KI für B2B-Leadgenerierung', desc: 'Automatisierte Prospektion Apollo + ChatGPT + LinkedIn Sales Navigator. Personalisierung im grossen Stil, nDSG-Audit inklusive.' },
    ],
    services: [
      { title: 'Kostenloses KI-Audit 30-60 Min', desc: 'Prozesskartierung, 5 Quick Wins, Reifegrad-Score, 90-Tage-Roadmap. PDF-Bericht in 48 h.', href: '/contact' },
      { title: 'Massgeschneiderte KI-Schulung', desc: 'FR/DE/IT, Team- oder Führungssessions. Konform Art. 4 AI Act. Kantonale Förderungen mobilisierbar.', href: '/formation-ia-pme' },
      { title: 'KI-Tool-Integration', desc: 'ChatGPT Team, Microsoft Copilot, Claude Pro, Make/Zapier, n8n self-hosted. Hosting Schweiz oder EU.', href: '/services' },
      { title: 'Strategieberatung', desc: 'Express-Audit, 90-Tage-Begleitung, Konformität nDSG + AI Act, Daten-Governance.', href: '/consulting' },
    ],
    whyItems: [
      'Spezialisierung KMU 5-50 Mitarbeitende',
      'Mehrsprachig FR · DE · IT · EN',
      'Präsenz Romandie, Deutschschweiz und Tessin',
      'nDSG + AI Act in jeder Mission integriert',
      'Kostenloses Audit ohne Verpflichtung, PDF in 48 h',
      'Transparente CHF-Tarife, Offerte in 24 h',
    ],
    related: (cantonSlug) => [
      { title: `Alle Ressourcen Kanton ${cantonSlug}`, href: `/cantons/${cantonSlug}` },
      { title: 'Tech-Stack KMU Schweiz 2026', href: '/blog/outils-ia-ecosysteme-pme-suisse-2026' },
      { title: 'CRM-Implementierung KMU Schweiz · Praxisbeispiel', href: '/blog/crm-implementierung-kmu-schweiz-beispiel' },
      { title: 'Integration von KI in CRM', href: '/blog/integration-ia-crm-opportunites-pme-suisses' },
    ],
    ctaTitle: (name) => `Starten wir Ihr KI-Projekt in ${name}`,
    ctaDesc: 'Buchen Sie 30 kostenlose Minuten, um Ihre Prozesse zu kartieren und Quick Wins zu identifizieren.',
    faqMaker: (name, cantonName, ecosystem) => [
      {
        q: `Welche KI-Leistungen bieten Sie KMU in ${name}?`,
        a: `IAPME Suisse bietet in ${name}: kostenloses KI-Audit, Teamschulung (ChatGPT, Copilot, Claude), Tool-Integration, Strategieberatung. nDSG + AI Act inklusive. Vor Ort oder remote.`,
      },
      {
        q: `Was kostet ein KI-Projekt für ein KMU in ${name}?`,
        a: `Das Erst-Audit ist kostenlos (30-60 Min + Bericht in 48 h). Begleitmissionen starten mit einem Quick-Win in 4-8 Wochen. Offerte in 24 h. Kantonale Förderungen und InnoSuisse mobilisierbar.`,
      },
      {
        q: `Arbeiten Sie mit dem Innovationsökosystem von ${name} zusammen?`,
        a: `Ja. Wir arbeiten mit lokalen Akteuren: ${ecosystem}. Vernetzung mit akademischen Experten und Clustern möglich.`,
      },
      {
        q: `Welche kantonalen Förderungen für ein KI-Projekt in ${name} (Kanton ${cantonName})?`,
        a: `Kantonsspezifische Förderungen ${cantonName}, ergänzt durch InnoSuisse (bis 75 000 CHF), Innovations-Cheque (15 000 CHF) und steuerliche Abzüge für Weiterbildung.`,
      },
    ],
  },
  en: {
    hero: {
      eyebrow: (cantonName) => `Canton ${cantonName} · Switzerland`,
      h1: (name) => `AI agency for SMEs in ${name}: free audit + training`,
      intro: (name, smeCount, ecosystem) =>
        `You run an SME among the ${smeCount} businesses in the ${name} region? IAPME Suisse helps local SMEs with concrete AI adoption: free audit, team training, ChatGPT/Copilot/Claude integration. Active in the ${ecosystem.split('·')[0].trim()} ecosystem. nFADP + AI Act compliant, measurable ROI in 4-12 weeks.`,
    },
    ctaButton: 'Book my free audit',
    sectionTitles: {
      districts: 'Business districts served',
      sectors: 'Sectors with high AI ROI',
      ecosystem: 'Local innovation ecosystem',
      useCases: 'Concrete AI use cases',
      services: 'Our services for local SMEs',
      why: 'Why IAPME Suisse',
      faq: 'Frequently asked questions',
      related: 'Related resources',
    },
    breadcrumbVilles: 'Cities',
    useCases: [
      { title: '24/7 AI customer service chatbot', desc: 'Deployment on website + WhatsApp Business with company knowledge base. Typical ROI: -40% level-1 tickets in 8 weeks.' },
      { title: 'Quote & follow-up automation', desc: 'ChatGPT + Make/Zapier to generate quotes, track payments, multi-channel follow-ups. Win: 6-12 h/week per salesperson.' },
      { title: 'Virtual admin assistant', desc: 'Microsoft 365 Copilot + custom agents for reports, minutes, document search. nFADP compliant.' },
      { title: 'AI for B2B lead generation', desc: 'Automated prospecting Apollo + ChatGPT + LinkedIn Sales Navigator. At-scale personalisation, nFADP audit included.' },
    ],
    services: [
      { title: 'Free AI audit 30-60 min', desc: 'Process mapping, 5 quick wins, AI maturity score, 90-day roadmap. PDF report in 48h.', href: '/contact' },
      { title: 'Custom AI training', desc: 'FR/DE/IT, team or executive sessions. Compliant with Art. 4 AI Act. Cantonal subsidies available.', href: '/formation-ia-pme' },
      { title: 'AI tool integration', desc: 'ChatGPT Team, Microsoft Copilot, Claude Pro, Make/Zapier, n8n self-hosted. Swiss or EU hosting.', href: '/services' },
      { title: 'Strategic consulting', desc: 'Express audit, 90-day support, nFADP + AI Act compliance, data governance.', href: '/consulting' },
    ],
    whyItems: [
      'Specialised in SMEs 5-50 employees',
      'Multilingual FR · DE · IT · EN',
      'Physical presence French, German & Italian Switzerland',
      'nFADP + AI Act baked into every mission',
      'Free no-commitment audit, PDF report within 48h',
      'Transparent CHF rates, 24h quote',
    ],
    related: (cantonSlug) => [
      { title: `All resources for canton ${cantonSlug}`, href: `/cantons/${cantonSlug}` },
      { title: 'AI Strategy for Swiss SMEs 2026', href: '/blog/strategie-ia-pme-suisse-2026' },
      { title: 'AI ROI for Swiss SMEs', href: '/blog/roi-intelligence-artificielle-pme-transformation-digitale' },
      { title: 'Swiss SME case studies', href: '/blog/etudes-cas-pme-romandes-ia' },
    ],
    ctaTitle: (name) => `Let's start your AI project in ${name}`,
    ctaDesc: 'Book 30 free minutes to map your processes and identify your AI quick wins.',
    faqMaker: (name, cantonName, ecosystem) => [
      {
        q: `What AI services do you offer SMEs in ${name}?`,
        a: `IAPME Suisse offers in ${name}: free AI audit, team training (ChatGPT, Copilot, Claude), tool integration, strategic consulting. nFADP + AI Act included. On-site or remote.`,
      },
      {
        q: `How much does an AI project cost for an SME in ${name}?`,
        a: `Initial audit is free (30-60 min + 48h report). Engagements start with a 4-8 week quick-win, custom quote within 24h. Cantonal subsidies and InnoSuisse available.`,
      },
      {
        q: `Do you work with the ${name} innovation ecosystem?`,
        a: `Yes. We collaborate with local actors: ${ecosystem}. Connections with academic experts and clusters available.`,
      },
      {
        q: `What cantonal funding for an AI project in ${name} (canton ${cantonName})?`,
        a: `Canton-specific subsidies for ${cantonName}, plus InnoSuisse (up to 75,000 CHF), innovation cheque (15,000 CHF) and continuing-education tax deductions.`,
      },
    ],
  },
  it: {
    hero: {
      eyebrow: (cantonName) => `Cantone ${cantonName} · Svizzera`,
      h1: (name) => `Agenzia IA per PMI a ${name}: audit gratuito + formazione`,
      intro: (name, smeCount, ecosystem) =>
        `Lei dirige una PMI tra le ${smeCount} aziende della regione di ${name}? IAPME Suisse accompagna le PMI locali nell'adozione concreta dell'IA: audit gratuito, formazione del team, integrazione ChatGPT/Copilot/Claude. Presenza nell'ecosistema ${ecosystem.split('·')[0].trim()}. Conforme nLPD + AI Act, ROI misurato in 4-12 settimane.`,
    },
    ctaButton: 'Prenoto l\'audit gratuito',
    sectionTitles: {
      districts: 'Quartieri d\'affari serviti',
      sectors: 'Settori con alto ROI IA',
      ecosystem: 'Ecosistema d\'innovazione locale',
      useCases: 'Casi d\'uso IA concreti',
      services: 'I nostri servizi per le PMI locali',
      why: 'Perché IAPME Suisse',
      faq: 'Domande frequenti',
      related: 'Risorse correlate',
    },
    breadcrumbVilles: 'Città',
    useCases: [
      { title: 'Chatbot IA servizio clienti 24/7', desc: 'Deployment su sito web + WhatsApp Business con base di conoscenze aziendali. ROI tipico: -40% ticket livello 1 in 8 settimane.' },
      { title: 'Automazione preventivi & solleciti', desc: 'ChatGPT + Make/Zapier per generare preventivi, tracciare pagamenti, solleciti multi-canale. Guadagno: 6-12 h/settimana per commerciale.' },
      { title: 'Assistente virtuale amministrativo', desc: 'Microsoft 365 Copilot + agenti personalizzati per rapporti, verbali, ricerca documentale. Conforme nLPD.' },
      { title: 'IA per generazione lead B2B', desc: 'Prospezione automatizzata Apollo + ChatGPT + LinkedIn Sales Navigator. Personalizzazione su larga scala, audit nLPD incluso.' },
    ],
    services: [
      { title: 'Audit IA gratuito 30-60 min', desc: 'Cartografia processi, 5 quick win, punteggio maturità, roadmap 90 giorni. Rapporto PDF in 48 h.', href: '/contact' },
      { title: 'Formazione IA su misura', desc: 'FR/DE/IT, sessioni team o dirigenti. Conforme art. 4 AI Act. Sussidi cantonali mobilizzabili.', href: '/formation-ia-pme' },
      { title: 'Integrazione strumenti IA', desc: 'ChatGPT Team, Microsoft Copilot, Claude Pro, Make/Zapier, n8n self-hosted. Hosting Svizzera o UE.', href: '/services' },
      { title: 'Consulenza strategica', desc: 'Audit express, accompagnamento 90 giorni, conformità nLPD + AI Act, governance dei dati.', href: '/consulting' },
    ],
    whyItems: [
      'Specializzazione PMI 5-50 dipendenti',
      'Multilingue FR · DE · IT · EN',
      'Presenza Svizzera romanda, tedesca e Ticino',
      'nLPD + AI Act integrati in ogni missione',
      'Audit gratuito senza impegno, rapporto PDF in 48 h',
      'Tariffe CHF trasparenti, preventivo in 24 h',
    ],
    related: (cantonSlug) => [
      { title: `Tutte le risorse del cantone ${cantonSlug}`, href: `/cantons/${cantonSlug}` },
      { title: 'Strategia IA PMI Svizzera 2026', href: '/blog/strategie-ia-pme-suisse-2026' },
      { title: 'ROI IA PMI Svizzera', href: '/blog/roi-intelligence-artificielle-pme-transformation-digitale' },
      { title: 'Studi di caso PMI svizzere', href: '/blog/etudes-cas-pme-romandes-ia' },
    ],
    ctaTitle: (name) => `Avviamo il suo progetto IA a ${name}`,
    ctaDesc: 'Prenoti 30 minuti gratuiti per cartografare i suoi processi e identificare i suoi quick win.',
    faqMaker: (name, cantonName, ecosystem) => [
      {
        q: `Quali servizi IA offrite alle PMI di ${name}?`,
        a: `IAPME Suisse offre a ${name}: audit IA gratuito, formazione team (ChatGPT, Copilot, Claude), integrazione strumenti, consulenza strategica. Conformità nLPD + AI Act inclusa. In loco o in videochiamata.`,
      },
      {
        q: `Quanto costa un progetto IA per una PMI di ${name}?`,
        a: `L'audit iniziale è gratuito (30-60 min + rapporto in 48 h). Le missioni di accompagnamento partono da un quick-win in 4-8 settimane. Preventivo in 24 h. Sussidi cantonali e InnoSuisse mobilizzabili.`,
      },
      {
        q: `Collaborate con l'ecosistema d'innovazione di ${name}?`,
        a: `Sì. Collaboriamo con attori locali: ${ecosystem}. Possibili connessioni con esperti accademici e cluster.`,
      },
      {
        q: `Quali aiuti cantonali per un progetto IA a ${name} (cantone ${cantonName})?`,
        a: `Sussidi specifici del cantone ${cantonName}, completati da InnoSuisse (fino a 75 000 CHF), assegno innovazione (15 000 CHF) e deduzioni fiscali per la formazione continua.`,
      },
    ],
  },
};

export default async function VillePage({ params }: Props) {
  const { locale, ville: slug } = await params;
  const ville = getVilleBySlug(slug);
  if (!ville) notFound();

  const t = COPY[locale as keyof typeof COPY] ?? COPY.fr;
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const name = ville.names[locale as keyof typeof ville.names] ?? ville.names.fr;
  const cantonName = ville.cantonNames[locale as keyof typeof ville.cantonNames] ?? ville.cantonNames.fr;

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `IAPME Suisse — ${name}`,
    description: `Agence IA pour PME à ${name}, canton de ${cantonName}.`,
    url: `https://iapmesuisse.ch/${locale}/villes/${slug}`,
    provider: { '@type': 'Organization', name: 'IAPME Suisse', url: 'https://iapmesuisse.ch' },
    areaServed: [
      { '@type': 'City', name, addressCountry: 'CH' },
      { '@type': 'AdministrativeArea', name: cantonName, addressCountry: 'CH' },
    ],
    serviceType: ['AI audit', 'AI training', 'AI tool integration', 'AI consulting'],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CHF',
      description: 'Audit IA gratuit 30-60 minutes',
    },
  };

  const faqList = t.faqMaker(name, cantonName, ville.ecosystem);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: tNav('home'), href: '/' },
            { label: t.breadcrumbVilles },
            { label: name },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="bg-[#1B2A4A] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            {t.hero.eyebrow(cantonName)}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.hero.h1(name)}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-200">
            {t.hero.intro(name, ville.smeCount, ville.ecosystem)}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-accent-dark"
            >
              {t.ctaButton}
            </Link>
            <Link
              href={`/cantons/${ville.cantonSlug}`}
              className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur transition-all duration-200 hover:bg-white/10"
            >
              {cantonName}
            </Link>
          </div>
        </div>
      </section>

      {/* Districts + Sectors + Ecosystem */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-xl font-bold text-primary">{t.sectionTitles.districts}</h2>
            <ul className="mt-4 space-y-1.5 text-sm text-gray-700">
              {ville.districts.map((d) => <li key={d}>· {d}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-xl font-bold text-primary">{t.sectionTitles.sectors}</h2>
            <ul className="mt-4 space-y-1.5 text-sm text-gray-700">
              {ville.topSectors.map((s) => <li key={s}>· {s}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-xl font-bold text-primary">{t.sectionTitles.ecosystem}</h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-700">{ville.ecosystem}</p>
            <p className="mt-3 text-xs text-gray-500">Population: {ville.population} · PME: {ville.smeCount}</p>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-gray-light px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary sm:text-4xl">
            {t.sectionTitles.useCases}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {t.useCases.map((u) => (
              <div key={u.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-primary">{u.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary sm:text-4xl">
            {t.sectionTitles.services}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.services.map((s) => (
              <Link key={s.title} href={s.href} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-lg font-bold text-primary">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-gray-light px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-primary sm:text-4xl">
            {t.sectionTitles.why}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {t.whyItems.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4">
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ visible (matches schema) */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-primary sm:text-4xl">
            {t.sectionTitles.faq}
          </h2>
          <div className="space-y-4">
            {faqList.map((f) => (
              <details key={f.q} className="group rounded-lg border border-gray-200 bg-gray-50 p-5">
                <summary className="cursor-pointer text-base font-semibold text-primary marker:text-accent">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-gray-light px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-primary sm:text-4xl">
            {t.sectionTitles.related}
          </h2>
          <ul className="space-y-3">
            {t.related(ville.cantonSlug).map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="block rounded-lg border border-gray-200 bg-white p-4 text-sm font-medium text-primary transition-all hover:border-accent hover:text-accent">
                  → {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTA title={t.ctaTitle(name)} description={t.ctaDesc} buttonText={t.ctaButton} href="/contact" />
    </>
  );
}
