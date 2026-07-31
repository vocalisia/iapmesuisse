import { getBlogPosts } from './markdown';

type BlogSummary = ReturnType<typeof getBlogPosts>[number];
type PillarLink = { href: string; label: string; tokens: string[] };

const STOP_WORDS = new Set([
  'avec',
  'pour',
  'dans',
  'des',
  'les',
  'une',
  'aux',
  'and',
  'the',
  'for',
  'und',
  'der',
  'die',
  'das',
  'con',
  'per',
  'gli',
]);

const PILLAR_LINKS: Record<string, PillarLink[]> = {
  fr: [
    { href: '/agence-ia-suisse', label: 'Agence IA Suisse pour PME', tokens: ['agence', 'consultant', 'conseil', 'strategie'] },
    { href: '/automatisation-ia-pme-suisse', label: 'Automatisation IA pour PME suisses', tokens: ['automatisation', 'processus', 'workflow', 'outil'] },
    { href: '/formation-ia-pme', label: 'Formation IA pour equipes PME', tokens: ['formation', 'atelier', 'equipes', 'chatgpt'] },
    { href: '/ki-beratung-kmu-schweiz', label: 'KI Beratung KMU Schweiz', tokens: ['ki', 'beratung', 'kmu', 'deutschschweiz'] },
    { href: '/chatbot-ia-entreprise-suisse', label: 'Chatbot IA entreprise Suisse', tokens: ['chatbot', 'service', 'client', 'support'] },
  ],
  de: [
    { href: '/ki-beratung-kmu-schweiz', label: 'KI Beratung fur Schweizer KMU', tokens: ['ki', 'beratung', 'kmu', 'berater'] },
    { href: '/automatisation-ia-pme-suisse', label: 'Prozessautomatisierung fur KMU', tokens: ['automatisierung', 'prozess', 'workflow', 'tools'] },
    { href: '/formation-ia-pme', label: 'KI Schulung fur Teams', tokens: ['schulung', 'workshop', 'training', 'teams'] },
    { href: '/agence-ia-suisse', label: 'KI Agentur Schweiz fur KMU', tokens: ['agentur', 'consulting', 'partner', 'strategie'] },
    { href: '/chatbot-ia-entreprise-suisse', label: 'KI Chatbot fur Unternehmen', tokens: ['chatbot', 'kundenservice', 'support', 'service'] },
  ],
  en: [
    { href: '/agence-ia-suisse', label: 'AI consulting agency in Switzerland', tokens: ['agency', 'consulting', 'consultant', 'strategy'] },
    { href: '/automatisation-ia-pme-suisse', label: 'AI process automation for Swiss SMEs', tokens: ['automation', 'process', 'workflow', 'tools'] },
    { href: '/formation-ia-pme', label: 'AI training for Swiss SME teams', tokens: ['training', 'upskilling', 'workshop', 'teams'] },
    { href: '/ki-beratung-kmu-schweiz', label: 'AI consulting for German-speaking SMEs', tokens: ['berater', 'beratung', 'kmu', 'german'] },
    { href: '/chatbot-ia-entreprise-suisse', label: 'AI chatbot for Swiss companies', tokens: ['chatbot', 'customer', 'service', 'support'] },
  ],
  it: [
    { href: '/agence-ia-suisse', label: 'Agenzia IA in Svizzera per PMI', tokens: ['agenzia', 'consulenza', 'consulente', 'strategia'] },
    { href: '/automatisation-ia-pme-suisse', label: 'Automazione IA per PMI svizzere', tokens: ['automazione', 'processi', 'workflow', 'strumenti'] },
    { href: '/formation-ia-pme', label: 'Formazione IA per team PMI', tokens: ['formazione', 'workshop', 'team', 'chatgpt'] },
    { href: '/ki-beratung-kmu-schweiz', label: 'Consulenza IA per PMI svizzere', tokens: ['consulenza', 'pmi', 'ticino', 'lugano'] },
    { href: '/chatbot-ia-entreprise-suisse', label: 'Chatbot IA per aziende svizzere', tokens: ['chatbot', 'servizio', 'clienti', 'supporto'] },
  ],
};

export const LEGACY_BLOG_REDIRECTS: Record<string, Record<string, string>> = {
  de: {
    'formation-ia-pme-suisse': '/formation-ia-pme',
    'ia-pme-valais-sion': '/villes/sion',
    'ki-beratung-kmu-schweiz-guide-2026': '/blog/ki-beratung-kmu-schweiz-leitfaden-2026',
    'agence-ia-pour-pme-2026-04-14': '/blog/agence-ia-pme-suisse-comparatif',
    'subventions-pme-suisse-2026-04-14': '/blog/subventions-digitalisation-suisse',
  },
  en: {
    'formation-ia-pme-suisse': '/formation-ia-pme',
    'ia-pme-valais-sion': '/villes/sion',
    'agence-ia-pour-pme-2026-04-14': '/blog/agence-ia-pme-suisse-comparatif',
    'subventions-pme-suisse-2026-04-14': '/blog/subventions-digitalisation-suisse',
  },
  it: {
    'formation-ia-pme-suisse': '/formation-ia-pme',
    'ia-pme-valais-sion': '/villes/sion',
    // This article exists only in French; retain the content rather than return a dead localized URL.
    'ia-pme-geneve-cas-usage-2026': '/fr/blog/ia-pme-geneve-cas-usage-2026',
    'agence-ia-pour-pme-2026-04-14': '/blog/agence-ia-pme-suisse-comparatif',
    'internet-haute-vitesse-2026-04-13': '/blog/optimiser-internet-haute-vitesse-pme-suisses',
    'subventions-pme-suisse-2026-04-14': '/blog/subventions-digitalisation-suisse',
  },
  fr: {
    'registre-usages-ia-pme-suisse-nlpd': '/blog/audit-ia-gratuit-pme-suisse-checklist-nlpd',
    'agent-ia-documentation-interne-pme': '/blog/ia-gestion-documentaire-suisse-guide-2026',
    'ia-fiduciaire-pme-suisse-controles': '/blog/ia-fiduciaire-comptable-suisse-guide-2026',
    'subventions-pme-suisse-ou-chercher': '/blog/ia-subventions-aides-digitalisation-pme-suisse-2026',
    'ia-tourisme-pme-suisse-demandes-clients': '/blog/ia-tourisme-hotellerie-suisse-guide-2026',
    'automatisation-ia-support-client-pme-suisse': '/blog/automatisation-service-client-ia-suisse',
    'workflow-ia-suisse-cartographie-processus-pme': '/blog/workflow-ia-pme-suisse',
    'prompt-securise-pme-suisse': '/blog/claude-security-securite-pme-suisses',
    'maillage-interne-aio-pme-suisse': '/blog/maillage-interne-seo-ia-pme-suisse',
    'ia-traduction-interpretation-pme-suisse-workflow': '/blog/ia-traduction-interpretation-suisse-2026',
    'copilot-chatgpt-claude-pme-suisse-choisir': '/blog/copilot-microsoft-365-pme-suisse-guide-2026',
    'roadmap-ia-90-jours-pme-suisse': '/blog/audit-workflow-ia-pme-suisse',
    'productivite-ia-equipes-administratives-pme': '/blog/automatiser-taches-atout-pme-suisses',
    'ia-logistique-pme-suisse-approvisionnement': '/blog/ia-logistique-supply-chain-suisse-2026',
    'contenu-aio-suisse-fr-de-it-pme': '/blog/ia-seo-contenu-multilingue-suisse-pme-2026',
    'audit-donnees-ia-pme-suisse-2026': '/blog/ia-analyse-donnees-pme-suisse-guide-2026',
    'n8n-support-client-suisse-romande': '/blog/n8n-self-hosted-pme-suisse',
    'agent-ia-achats-pme-suisse': '/blog/ia-logistique-supply-chain-suisse-2026',
    'internet-haute-vitesse-2026-04-13': '/blog/optimiser-internet-haute-vitesse-pme-suisses',
  },
};

function keywords(text: string) {
  return new Set(
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length >= 4 && !STOP_WORDS.has(word))
  );
}

export function getRelatedPosts(post: BlogSummary, locale: string) {
  const current = keywords(`${post.title} ${post.excerpt} ${post.slug.replace(/-/g, ' ')}`);
  return getBlogPosts(locale)
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const candidateWords = keywords(`${candidate.title} ${candidate.excerpt} ${candidate.slug.replace(/-/g, ' ')}`);
      let score = 0;
      current.forEach((word) => {
        if (candidateWords.has(word)) score += 1;
      });
      return { post: candidate, score };
    })
    .sort((a, b) => b.score - a.score || (a.post.date > b.post.date ? -1 : 1))
    .slice(0, 5)
    .map((item) => item.post);
}

export function getPillarLinks(post: BlogSummary, locale: string) {
  const links = PILLAR_LINKS[locale] ?? PILLAR_LINKS.fr;
  const source = `${post.title} ${post.excerpt} ${post.slug.replace(/-/g, ' ')}`.toLowerCase();

  return links
    .map((link, index) => ({
      link,
      score: link.tokens.reduce((sum, token) => sum + (source.includes(token) ? 1 : 0), 0),
      index,
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 4)
    .map((item) => item.link);
}

export function getArticleKeywords(post: BlogSummary, limit = 14) {
  return Array.from(
    keywords(`${post.title} ${post.excerpt} ${post.slug.replace(/-/g, ' ')}`)
  ).slice(0, limit);
}

export function normalizeContentHeadings(html: string) {
  return html
    .replace(/<h1(\s[^>]*)?>/gi, '<h2$1>')
    .replace(/<\/h1>/gi, '</h2>');
}
