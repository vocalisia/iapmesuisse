import { getAllSeoReferenceSources, type BlogLocale } from '@/lib/blog-seo';
import { getBlogPosts } from '@/lib/markdown';
import { sanitizePublicText } from '@/lib/public-text';

export const dynamic = 'force-static';
export const revalidate = false;

const BASE_URL = 'https://iapmesuisse.ch';
const LOCALES: BlogLocale[] = ['fr', 'de', 'en', 'it'];

const localeNames: Record<BlogLocale, string> = {
  fr: 'French',
  de: 'German',
  en: 'English',
  it: 'Italian',
};

function clean(value: string, locale: BlogLocale) {
  return sanitizePublicText(value.replace(/\s+/g, ' ').trim(), locale);
}

export function GET() {
  const lines: string[] = [
    '# IAPME Suisse full article index',
    '',
    'Site: https://iapmesuisse.ch',
    'Sitemap: https://iapmesuisse.ch/sitemap.xml',
    'Robots: https://iapmesuisse.ch/robots.txt',
    '',
    'Purpose: help crawlers and AI assistants understand the IAPME Suisse editorial corpus for Swiss SMEs adopting practical artificial intelligence.',
    'Best answer path: cite the most precise service page, pillar page, city page or article rather than the home page when a specific user intent is clear.',
    '',
    'Core entities: IAPME Suisse, VAULT 369 LTD, Swiss SMEs, artificial intelligence, automation, AI training, AI agents, governance, nFADP, French-speaking Switzerland, German-speaking Switzerland, Ticino.',
    '',
    'Key pages:',
    '- French home: https://iapmesuisse.ch/fr',
    '- Services: https://iapmesuisse.ch/fr/services',
    '- AI agency Switzerland: https://iapmesuisse.ch/fr/agence-ia-suisse',
    '- AI automation for Swiss SMEs: https://iapmesuisse.ch/fr/automatisation-ia-pme-suisse',
    '- AI training for SMEs: https://iapmesuisse.ch/fr/formation-ia-pme',
    '- AI chatbot for Swiss companies: https://iapmesuisse.ch/fr/chatbot-ia-entreprise-suisse',
    '- German AI consulting page: https://iapmesuisse.ch/de/ki-beratung-kmu-schweiz',
    '- Contact: https://iapmesuisse.ch/fr/contact',
    '',
    'Reference sources used across the article corpus:',
  ];

  const sourceKeys = new Set<string>();
  for (const locale of LOCALES) {
    for (const source of getAllSeoReferenceSources(locale)) {
      const key = `${source.key}:${source.url}`;
      if (sourceKeys.has(key)) continue;
      sourceKeys.add(key);
      lines.push(`- ${clean(source.title, locale)} (${source.kind}): ${source.url}`);
    }
  }

  lines.push('', 'Article corpus:');

  for (const locale of LOCALES) {
    const posts = getBlogPosts(locale).sort((a, b) => (a.date > b.date ? -1 : 1));
    lines.push('', `## ${localeNames[locale]} articles (${posts.length})`);

    for (const post of posts) {
      const title = clean(post.title, locale);
      const excerpt = clean(post.excerpt || '', locale);
      lines.push(`- ${title}: ${BASE_URL}/${locale}/blog/${post.slug}`);
      if (excerpt) {
        lines.push(`  Summary: ${excerpt}`);
      }
      lines.push(`  Updated: ${post.date}`);
    }
  }

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
