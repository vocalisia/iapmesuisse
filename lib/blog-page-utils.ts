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
  },
  en: {
    'formation-ia-pme-suisse': '/formation-ia-pme',
    'ia-pme-valais-sion': '/villes/sion',
  },
  it: {
    'formation-ia-pme-suisse': '/formation-ia-pme',
    'ia-pme-valais-sion': '/villes/sion',
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
