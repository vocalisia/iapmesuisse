import type { BlogPost } from './markdown';
import { sanitizePublicText } from './public-text';

export type BlogLocale = 'fr' | 'de' | 'en' | 'it';

export type ArticleSource = {
  key: string;
  title: string;
  url: string;
  label: string;
  kind: 'federal' | 'official' | 'consulting';
};

type SourceDefinition = {
  key: string;
  kind: ArticleSource['kind'];
  url: string;
  title: Record<BlogLocale, string>;
  label: Record<BlogLocale, string>;
  tags: RegExp;
  always?: boolean;
};

const SOURCE_LIBRARY: SourceDefinition[] = [
  {
    key: 'google-helpful-content',
    kind: 'official',
    url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content',
    always: true,
    title: {
      fr: 'Google Search Central - contenu utile et fiable',
      de: 'Google Search Central - hilfreiche, verlässliche Inhalte',
      en: 'Google Search Central - helpful, reliable content',
      it: 'Google Search Central - contenuti utili e affidabili',
    },
    label: {
      fr: 'Référence officielle pour structurer un contenu utile, sourcé et conçu pour les lecteurs.',
      de: 'Offizielle Referenz für hilfreiche, belegte und nutzerorientierte Inhalte.',
      en: 'Official reference for useful, sourced, people-first content.',
      it: 'Riferimento ufficiale per contenuti utili, fondati su fonti e pensati per i lettori.',
    },
    tags: /seo|google|article|contenu|content|eeat|e-e-a-t|source|trust|fiable|utile|recherche|search/i,
  },
  {
    key: 'google-ai-search',
    kind: 'official',
    url: 'https://developers.google.com/search/docs/fundamentals/ai-optimization-guide',
    title: {
      fr: 'Google Search Central - recherche générative',
      de: 'Google Search Central - generative Suche',
      en: 'Google Search Central - generative AI search',
      it: 'Google Search Central - ricerca generativa',
    },
    label: {
      fr: 'Guide officiel Google pour rester visible dans Search et les expériences génératives.',
      de: 'Offizieller Google-Leitfaden für Sichtbarkeit in Search und generativen Erlebnissen.',
      en: 'Official Google guidance for visibility in Search and generative experiences.',
      it: 'Guida ufficiale Google per la visibilità in Search e nelle esperienze generative.',
    },
    tags: /llm|generative|générative|generativ|aio|geo|search|google|snippet|citation|schema/i,
  },
  {
    key: 'google-article-structured-data',
    kind: 'official',
    url: 'https://developers.google.com/search/docs/appearance/structured-data/article',
    title: {
      fr: 'Google Search Central - données structurées Article',
      de: 'Google Search Central - strukturierte Daten für Artikel',
      en: 'Google Search Central - Article structured data',
      it: 'Google Search Central - dati strutturati Article',
    },
    label: {
      fr: 'Référence officielle pour aider Google à comprendre les articles, titres, images et dates.',
      de: 'Offizielle Referenz, damit Google Artikel, Titel, Bilder und Daten besser versteht.',
      en: 'Official reference for helping Google understand article titles, images and dates.',
      it: 'Riferimento ufficiale per aiutare Google a comprendere titoli, immagini e date degli articoli.',
    },
    tags: /schema|structured|données structurées|strukturiert|article|blogposting|json-ld|rich/i,
  },
  {
    key: 'schema-blogposting',
    kind: 'official',
    url: 'https://schema.org/BlogPosting',
    title: {
      fr: 'Schema.org - BlogPosting',
      de: 'Schema.org - BlogPosting',
      en: 'Schema.org - BlogPosting',
      it: 'Schema.org - BlogPosting',
    },
    label: {
      fr: 'Vocabulaire standard pour décrire un article de blog et ses citations.',
      de: 'Standardvokabular zur Beschreibung eines Blogartikels und seiner Quellen.',
      en: 'Standard vocabulary for describing a blog article and its citations.',
      it: 'Vocabolario standard per descrivere un articolo blog e le sue citazioni.',
    },
    tags: /schema|blogposting|citation|json-ld|article|creativework/i,
  },
  {
    key: 'kmu-ai',
    kind: 'federal',
    url: 'https://www.kmu.admin.ch/kmu/en/home/facts-and-trends/artificial-intelligence.html',
    always: true,
    title: {
      fr: 'Portail PME de la Confédération - intelligence artificielle',
      de: 'KMU-Portal des Bundes - künstliche Intelligenz',
      en: 'Swiss SME Portal - artificial intelligence',
      it: 'Portale PMI della Confederazione - intelligenza artificiale',
    },
    label: {
      fr: 'Source fédérale suisse sur les opportunités IA pour les PME.',
      de: 'Schweizer Bundesquelle zu KI-Chancen für KMU.',
      en: 'Swiss federal source on AI opportunities for SMEs.',
      it: 'Fonte federale svizzera sulle opportunità IA per le PMI.',
    },
    tags: /pme|kmu|sme|pmi|suisse|swiss|schweiz|svizzera|ia|ai|opportunit|digital/i,
  },
  {
    key: 'kmu-digitalization',
    kind: 'federal',
    url: 'https://www.kmu.admin.ch/kmu/en/home/facts-and-trends/digitization.html',
    title: {
      fr: 'Portail PME de la Confédération - digitalisation des PME',
      de: 'KMU-Portal des Bundes - Digitalisierung der KMU',
      en: 'Swiss SME Portal - SME digitalization',
      it: 'Portale PMI della Confederazione - digitalizzazione delle PMI',
    },
    label: {
      fr: 'Repère fédéral sur la transformation numérique et la compétitivité des PME suisses.',
      de: 'Bundesreferenz zu Digitalisierung und Wettbewerbsfähigkeit von Schweizer KMU.',
      en: 'Federal reference on digital transformation and Swiss SME competitiveness.',
      it: 'Riferimento federale su trasformazione digitale e competitività delle PMI svizzere.',
    },
    tags: /digital|transformation|numérique|numérique|digitale|process|workflow|competit|industrie|services/i,
  },
  {
    key: 'fdpic-ai-data',
    kind: 'federal',
    url: 'https://www.edoeb.admin.ch/en/update-current-legislation-directly-applicable-ai',
    always: true,
    title: {
      fr: 'PFPDT - la loi suisse sur les données s’applique à l’IA',
      de: 'EDÖB - Datenschutzrecht gilt für KI',
      en: 'FDPIC - current data protection law applies to AI',
      it: 'IFPDT - la protezione dei dati si applica all’IA',
    },
    label: {
      fr: 'Autorité fédérale suisse rappelant que la LPD s’applique aux traitements IA.',
      de: 'Schweizer Bundesbehörde zur Anwendbarkeit des Datenschutzrechts auf KI.',
      en: 'Swiss federal authority confirming that data protection law applies to AI processing.',
      it: 'Autorità federale svizzera sulla protezione dei dati nei trattamenti IA.',
    },
    tags: /données|donnees|data|privacy|lpd|nlpd|ndsg|edoeb|pfpdt|ifpdt|conform|ai act|risque|risk/i,
  },
  {
    key: 'innosuisse',
    kind: 'federal',
    url: 'https://www.innosuisse.admin.ch/en',
    title: {
      fr: 'Innosuisse - Agence suisse pour l’encouragement de l’innovation',
      de: 'Innosuisse - Schweizerische Agentur für Innovationsförderung',
      en: 'Innosuisse - Swiss Innovation Agency',
      it: 'Innosuisse - Agenzia svizzera per la promozione dell’innovazione',
    },
    label: {
      fr: 'Source fédérale sur innovation, R&D et transfert de connaissances en Suisse.',
      de: 'Bundesquelle zu Innovation, Forschung und Wissenstransfer in der Schweiz.',
      en: 'Federal source for innovation, R&D and knowledge transfer in Switzerland.',
      it: 'Fonte federale su innovazione, ricerca e trasferimento di conoscenze in Svizzera.',
    },
    tags: /innovation|innosuisse|startup|start-up|recherche|r&d|subvention|financement|collaboration|haute école/i,
  },
  {
    key: 'ncsc',
    kind: 'federal',
    url: 'https://www.ncsc.admin.ch/ncsc/en/home.html',
    title: {
      fr: 'NCSC - Centre national pour la cybersécurité',
      de: 'NCSC - Nationales Zentrum für Cybersicherheit',
      en: 'NCSC - National Cyber Security Centre',
      it: 'NCSC - Centro nazionale per la cibersicurezza',
    },
    label: {
      fr: 'Référence fédérale suisse pour cybersécurité, phishing, fraude et résilience numérique.',
      de: 'Schweizer Bundesreferenz für Cybersicherheit, Phishing, Betrug und digitale Resilienz.',
      en: 'Swiss federal reference for cybersecurity, phishing, fraud and digital resilience.',
      it: 'Riferimento federale svizzero per cibersicurezza, phishing, frodi e resilienza digitale.',
    },
    tags: /cyber|sécurité|securite|security|phishing|fraud|fraude|risque|risk|data|privacy|deepfake/i,
  },
  {
    key: 'eu-ai-act',
    kind: 'official',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
    title: {
      fr: 'Commission européenne - cadre réglementaire IA',
      de: 'Europäische Kommission - KI-Regulierungsrahmen',
      en: 'European Commission - AI regulatory framework',
      it: 'Commissione europea - quadro normativo IA',
    },
    label: {
      fr: 'Référence institutionnelle sur gouvernance, transparence et obligations IA en Europe.',
      de: 'Institutionelle Referenz zu Governance, Transparenz und KI-Pflichten in Europa.',
      en: 'Institutional reference for AI governance, transparency and obligations in Europe.',
      it: 'Riferimento istituzionale su governance, trasparenza e obblighi IA in Europa.',
    },
    tags: /ai act|transparency|transparence|transparenz|governance|conform|réglement|regulation|europe/i,
  },
  {
    key: 'mckinsey-state-ai',
    kind: 'consulting',
    url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai',
    title: {
      fr: 'McKinsey - State of AI',
      de: 'McKinsey - State of AI',
      en: 'McKinsey - State of AI',
      it: 'McKinsey - State of AI',
    },
    label: {
      fr: 'Lecture cabinet de conseil sur adoption IA, passage à l’échelle et pratiques de gouvernance.',
      de: 'Beratungsperspektive auf KI-Adoption, Skalierung und Governance-Praktiken.',
      en: 'Consulting view on AI adoption, scaling and governance practices.',
      it: 'Prospettiva di consulenza su adozione IA, scalabilità e governance.',
    },
    tags: /adoption|scale|scaling|gouvernance|governance|strategy|strategie|stratégie|formation|training|talent|agent/i,
  },
  {
    key: 'bcg-ai-agents',
    kind: 'consulting',
    url: 'https://www.bcg.com/capabilities/artificial-intelligence/ai-agents',
    title: {
      fr: 'BCG - agents IA et impact business',
      de: 'BCG - KI-Agenten und Business Impact',
      en: 'BCG - AI agents and business impact',
      it: 'BCG - agenti IA e impatto business',
    },
    label: {
      fr: 'Analyse cabinet de conseil sur agents IA, workflows et cas d’usage métier.',
      de: 'Beratungsanalyse zu KI-Agenten, Workflows und geschäftlichen Anwendungsfällen.',
      en: 'Consulting analysis on AI agents, workflows and business use cases.',
      it: 'Analisi consulenziale su agenti IA, workflow e casi d’uso aziendali.',
    },
    tags: /agent|agents|workflow|automatisation|automation|process|support|service|sales|vente|marketing|crm/i,
  },
  {
    key: 'deloitte-enterprise-ai',
    kind: 'consulting',
    url: 'https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html',
    title: {
      fr: 'Deloitte - State of AI in the Enterprise',
      de: 'Deloitte - State of AI in the Enterprise',
      en: 'Deloitte - State of AI in the Enterprise',
      it: 'Deloitte - State of AI in the Enterprise',
    },
    label: {
      fr: 'Repère cabinet de conseil sur industrialisation IA, assistants virtuels et organisation.',
      de: 'Beratungsreferenz zu KI-Industrialisierung, virtuellen Assistenten und Organisation.',
      en: 'Consulting reference on AI scaling, virtual assistants and operating models.',
      it: 'Riferimento consulenziale su scalabilità IA, assistenti virtuali e modelli operativi.',
    },
    tags: /enterprise|organisation|organization|assistant|chatbot|contact|support|scale|production|industrialisation/i,
  },
  {
    key: 'pwc-ai-predictions',
    kind: 'consulting',
    url: 'https://www.pwc.com/us/en/tech-effect/ai-analytics/ai-predictions.html',
    title: {
      fr: 'PwC - AI Business Predictions',
      de: 'PwC - AI Business Predictions',
      en: 'PwC - AI Business Predictions',
      it: 'PwC - AI Business Predictions',
    },
    label: {
      fr: 'Point de vue cabinet de conseil sur IA responsable, efficacité opérationnelle et innovation.',
      de: 'Beratungsperspektive auf Responsible AI, operative Wirksamkeit und Innovation.',
      en: 'Consulting perspective on responsible AI, operational effectiveness and innovation.',
      it: 'Prospettiva consulenziale su IA responsabile, efficacia operativa e innovazione.',
    },
    tags: /responsible|responsable|rai|gouvernance|governance|innovation|efficacité|efficiency|risk|risque/i,
  },
  {
    key: 'ey-responsible-ai',
    kind: 'consulting',
    url: 'https://www.ey.com/en_gl/newsroom/2025/10/ey-survey-companies-advancing-responsible-ai-governance-linked-to-better-business-outcomes',
    title: {
      fr: 'EY - gouvernance IA responsable',
      de: 'EY - Responsible AI Governance',
      en: 'EY - responsible AI governance',
      it: 'EY - governance IA responsabile',
    },
    label: {
      fr: 'Analyse cabinet de conseil sur gouvernance responsable et résultats business.',
      de: 'Beratungsanalyse zu verantwortungsvoller Governance und Geschäftsergebnissen.',
      en: 'Consulting analysis on responsible governance and business outcomes.',
      it: 'Analisi consulenziale su governance responsabile e risultati aziendali.',
    },
    tags: /responsible|responsable|governance|gouvernance|risk|risque|compliance|conform|board|direction/i,
  },
  {
    key: 'kpmg-ai-pulse',
    kind: 'consulting',
    url: 'https://kpmg.com/us/en/articles/2025/ai-quarterly-pulse-survey.html',
    title: {
      fr: 'KPMG - AI Quarterly Pulse Survey',
      de: 'KPMG - AI Quarterly Pulse Survey',
      en: 'KPMG - AI Quarterly Pulse Survey',
      it: 'KPMG - AI Quarterly Pulse Survey',
    },
    label: {
      fr: 'Indicateur cabinet de conseil sur adoption des agents IA et confiance organisationnelle.',
      de: 'Beratungsindikator zu KI-Agenten-Adoption und organisatorischem Vertrauen.',
      en: 'Consulting indicator on AI-agent adoption and organizational confidence.',
      it: 'Indicatore consulenziale su adozione degli agenti IA e fiducia organizzativa.',
    },
    tags: /agent|agents|adoption|confidence|confiance|vertrauen|organization|organisation|transformation/i,
  },
];

const COCON_LINKS: Record<BlogLocale, Array<{ href: string; label: string; tags: RegExp }>> = {
  fr: [
    { href: '/agence-ia-suisse', label: 'Agence IA Suisse pour PME', tags: /agence|consultant|conseil|strat|audit|transformation/i },
    { href: '/automatisation-ia-pme-suisse', label: 'Automatisation IA pour PME suisses', tags: /automatisation|process|workflow|outil|n8n|make|zapier/i },
    { href: '/formation-ia-pme', label: 'Formation IA pour équipes PME', tags: /formation|atelier|workshop|chatgpt|copilot|equipe/i },
    { href: '/chatbot-ia-entreprise-suisse', label: 'Chatbot IA entreprise Suisse', tags: /chatbot|service client|support|relation client|contact/i },
    { href: '/ki-beratung-kmu-schweiz', label: 'KI Beratung KMU Schweiz', tags: /deutsch|kmu|ki|zurich|bern|allemand/i },
  ],
  de: [
    { href: '/ki-beratung-kmu-schweiz', label: 'KI Beratung für Schweizer KMU', tags: /ki|beratung|kmu|berater|strategie/i },
    { href: '/automatisation-ia-pme-suisse', label: 'Prozessautomatisierung für KMU', tags: /automatisierung|prozess|workflow|tools|make|n8n/i },
    { href: '/formation-ia-pme', label: 'KI Schulung für Teams', tags: /schulung|workshop|training|team|chatgpt|copilot/i },
    { href: '/agence-ia-suisse', label: 'KI Agentur Schweiz für KMU', tags: /agentur|consulting|partner|strategie|audit/i },
    { href: '/chatbot-ia-entreprise-suisse', label: 'KI Chatbot für Unternehmen', tags: /chatbot|kundenservice|support|service|kontakt/i },
  ],
  en: [
    { href: '/agence-ia-suisse', label: 'AI consulting agency in Switzerland', tags: /agency|consulting|consultant|strategy|audit/i },
    { href: '/automatisation-ia-pme-suisse', label: 'AI process automation for Swiss SMEs', tags: /automation|process|workflow|tools|make|n8n/i },
    { href: '/formation-ia-pme', label: 'AI training for Swiss SME teams', tags: /training|upskilling|workshop|team|chatgpt|copilot/i },
    { href: '/chatbot-ia-entreprise-suisse', label: 'AI chatbot for Swiss companies', tags: /chatbot|customer|service|support|contact/i },
    { href: '/ki-beratung-kmu-schweiz', label: 'AI consulting for German-speaking SMEs', tags: /german|kmu|beratung|zurich|bern/i },
  ],
  it: [
    { href: '/agence-ia-suisse', label: 'Agenzia IA in Svizzera per PMI', tags: /agenzia|consulenza|consulente|strategia|audit/i },
    { href: '/automatisation-ia-pme-suisse', label: 'Automazione IA per PMI svizzere', tags: /automazione|processi|workflow|strumenti|make|n8n/i },
    { href: '/formation-ia-pme', label: 'Formazione IA per team PMI', tags: /formazione|workshop|team|chatgpt|copilot/i },
    { href: '/chatbot-ia-entreprise-suisse', label: 'Chatbot IA per aziende svizzere', tags: /chatbot|servizio|clienti|supporto|contatto/i },
    { href: '/ki-beratung-kmu-schweiz', label: 'Consulenza IA per PMI svizzere', tags: /ticino|lugano|pmi|consulenza|svizzera/i },
  ],
};

export const seoArticleLabels: Record<
  BlogLocale,
  {
    trustTitle: string;
    trustText: string;
    trustBullets: string[];
    sourcesTitle: string;
    coconTitle: string;
    kindLabel: Record<ArticleSource['kind'], string>;
  }
> = {
  fr: {
    trustTitle: 'Méthode et fiabilité',
    trustText:
      'Ce guide est relié aux pages piliers IAPME Suisse et aux sources institutionnelles les plus utiles pour une PME suisse.',
    trustBullets: [
      'Sources fédérales suisses pour les points réglementaires, données, innovation et cybersécurité.',
      'Cabinets de conseil reconnus pour cadrer l’adoption IA, les agents et la gouvernance.',
      'Maillage interne vers les guides métier afin de poursuivre la lecture sans sortir du contexte PME.',
    ],
    sourcesTitle: 'Sources de référence',
    coconTitle: 'Guides liés pour PME',
    kindLabel: { federal: 'Source fédérale', official: 'Source officielle', consulting: 'Cabinet de conseil' },
  },
  de: {
    trustTitle: 'Methode und Verlässlichkeit',
    trustText:
      'Dieser Leitfaden ist mit den IAPME-Suisse-Pillar-Seiten und den wichtigsten Quellen für Schweizer KMU verbunden.',
    trustBullets: [
      'Schweizer Bundesquellen für Regulierung, Daten, Innovation und Cybersicherheit.',
      'Anerkannte Beratungsunternehmen für KI-Adoption, Agenten und Governance.',
      'Interne Verlinkung zu Fachleitfäden, damit die Lektüre im KMU-Kontext bleibt.',
    ],
    sourcesTitle: 'Referenzquellen',
    coconTitle: 'Verwandte KMU-Leitfäden',
    kindLabel: { federal: 'Bundesquelle', official: 'Offizielle Quelle', consulting: 'Beratung' },
  },
  en: {
    trustTitle: 'Method and reliability',
    trustText:
      'This guide is connected to IAPME Suisse pillar pages and the most useful references for Swiss SMEs.',
    trustBullets: [
      'Swiss federal sources for regulation, data, innovation and cybersecurity.',
      'Recognized consulting firms for AI adoption, agents and governance.',
      'Internal links to business guides so the reading path stays focused on SME use cases.',
    ],
    sourcesTitle: 'Reference sources',
    coconTitle: 'Related SME guides',
    kindLabel: { federal: 'Federal source', official: 'Official source', consulting: 'Consulting firm' },
  },
  it: {
    trustTitle: 'Metodo e affidabilità',
    trustText:
      'Questa guida è collegata alle pagine pilastro IAPME Suisse e alle fonti più utili per le PMI svizzere.',
    trustBullets: [
      'Fonti federali svizzere per regolazione, dati, innovazione e cibersicurezza.',
      'Società di consulenza riconosciute per adozione IA, agenti e governance.',
      'Link interni verso guide operative per mantenere la lettura nel contesto PMI.',
    ],
    sourcesTitle: 'Fonti di riferimento',
    coconTitle: 'Guide collegate per PMI',
    kindLabel: { federal: 'Fonte federale', official: 'Fonte ufficiale', consulting: 'Società di consulenza' },
  },
};

export function toBlogLocale(locale: string): BlogLocale {
  if (locale === 'de' || locale === 'en' || locale === 'it') return locale;
  return 'fr';
}

export function getArticleSources(post: BlogPost, content: string, locale: string): ArticleSource[] {
  const blogLocale = toBlogLocale(locale);
  const haystack = `${post.slug} ${post.title} ${post.excerpt} ${content}`
    .toLowerCase()
    .slice(0, 20000);

  const selected = SOURCE_LIBRARY.filter((source) => source.always || source.tags.test(haystack));
  const ordered = [
    ...selected.filter((source) => source.kind === 'federal'),
    ...selected.filter((source) => source.kind === 'official'),
    ...selected.filter((source) => source.kind === 'consulting'),
  ];

  const unique = new Map<string, SourceDefinition>();
  ordered.forEach((source) => unique.set(source.key, source));

  return Array.from(unique.values())
    .slice(0, 8)
    .map((source) => ({
      key: source.key,
      kind: source.kind,
      url: source.url,
      title: sanitizePublicText(source.title[blogLocale], locale),
      label: sanitizePublicText(source.label[blogLocale], locale),
    }));
}

export function getArticleCocoonLinks(post: BlogPost, locale: string) {
  const blogLocale = toBlogLocale(locale);
  const haystack = `${post.slug} ${post.title} ${post.excerpt}`.toLowerCase();
  const links = COCON_LINKS[blogLocale] ?? COCON_LINKS.fr;

  return links
    .map((link, index) => ({
      ...link,
      score: link.tags.test(haystack) ? 2 : index === 0 ? 1 : 0,
      index,
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 4)
    .map(({ href, label }) => ({
      href,
      label: sanitizePublicText(label, locale),
    }));
}

export function getAllSeoReferenceSources(locale: string): ArticleSource[] {
  const blogLocale = toBlogLocale(locale);
  return SOURCE_LIBRARY.map((source) => ({
    key: source.key,
    kind: source.kind,
    url: source.url,
    title: sanitizePublicText(source.title[blogLocale], locale),
    label: sanitizePublicText(source.label[blogLocale], locale),
  }));
}
