import path from 'path';

export const LOCALES = ['fr', 'de', 'en', 'it'] as const;
export type Locale = (typeof LOCALES)[number];

export const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export const OPENAI_MODEL = 'gpt-4o';
export const OPENAI_MODEL_FAST = 'gpt-4o-mini';

export const RSS_SOURCES = [
  {
    name: 'ICTjournal',
    url: 'https://www.ictjournal.ch/rss.xml',
    language: 'fr',
    category: 'Swiss IT/digital',
  },
  {
    name: 'Startupticker',
    url: 'https://www.startupticker.ch/rss',
    language: 'en',
    category: 'Swiss startups',
  },
  {
    name: 'digitalswitzerland',
    url: 'https://digitalswitzerland.com/feed/',
    language: 'en',
    category: 'Digital transformation CH',
  },
  {
    name: 'SWI swissinfo sci-tech',
    url: 'https://www.swissinfo.ch/eng/sci-tech/rss',
    language: 'en',
    category: 'Swiss science/tech',
  },
  {
    name: 'Inside IT',
    url: 'https://www.inside-it.ch/rss',
    language: 'de',
    category: 'Swiss IT (German)',
  },
];

export const SYSTEM_PROMPTS = {
  selector: `Tu es un éditeur spécialisé en technologie et IA pour les PME suisses.
Analyse ces articles RSS et attribue un score de pertinence de 0 à 10 pour chacun.
Critères de scoring :
- Pertinence pour les PME suisses (pas que les grandes entreprises)
- Lien avec l'IA, la transformation digitale, ou la technologie business
- Actualité et caractère informatif
- Potentiel pour des conseils pratiques

Réponds en JSON : { "selections": [{ "index": number, "score": number, "reason": string }] }
Trie par score décroissant.`,

  generator: `Tu es un rédacteur expert en IA et transformation digitale pour les PME suisses.
Rédige un article ORIGINAL en français basé sur le sujet fourni.

RÈGLES STRICTES :
- NE COPIE PAS et NE PARAPHRASE PAS l'article source
- Écris une analyse originale qui utilise la news comme point de départ
- Oriente TOUJOURS le contenu vers les préoccupations pratiques des PME suisses
- Inclus du contexte suisse : nLPD, marché suisse, exemples locaux
- 800-1200 mots
- Structure : titre H1, 4-6 sections H2, conseils pratiques
- Termine par un paragraphe mentionnant subtilement la mission d'IAPME Suisse
- Ton : professionnel mais accessible, pas de jargon technique excessif

Réponds en JSON :
{
  "title": "Titre SEO optimisé (max 70 car)",
  "excerpt": "Description meta (max 155 car)",
  "content": "Contenu markdown complet (sans le titre H1)",
  "slug": "slug-url-compatible"
}`,

  translator: `Tu es un traducteur professionnel spécialisé en contenu technologique B2B.
Traduis le contenu suivant du français vers {targetLang}.

RÈGLES :
- Maintiens la même structure markdown
- Adapte les termes : PME→KMU (DE), PME→SME (EN), PME→PMI (IT)
- Termes juridiques : nLPD→nDSG (DE), nLPD→nFADP (EN), nLPD→nLPD (IT)
- Garde les références suisses pertinentes
- Adapte naturellement les idiomes, ne traduis pas littéralement
- {langNote}

Réponds en JSON :
{
  "title": "...",
  "excerpt": "...",
  "content": "..."
}`,
};

export const LANG_NOTES: Record<string, { targetLang: string; langNote: string }> = {
  de: {
    targetLang: 'allemand (Hochdeutsch)',
    langNote: 'Utilise le Hochdeutsch formel, pas le Schweizerdeutsch. Vouvoiement avec "Sie".',
  },
  en: {
    targetLang: 'anglais business',
    langNote: 'Use professional British English. Business-oriented tone.',
  },
  it: {
    targetLang: 'italien professionnel',
    langNote: 'Italiano professionale formale. Utilizzare il "voi" formale.',
  },
};
