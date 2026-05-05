import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/markdown';
import { CANTONS } from '@/lib/cantons';

const locales = ['fr', 'de', 'en', 'it'];
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://iapmesuisse.ch';

const pages = [
  '',
  '/services',
  '/a-propos',
  '/blog',
  '/contact',
  '/cantons',
  '/ressources',
  '/ressources/checklist-nlpd-ai-act',
  '/mentions-legales',
  '/politique-confidentialite',
  '/cgv',
  '/formation-ia-pme',
  '/consulting',
  '/newsletter',
  '/evenements-ia',
  '/outils-ia',
  '/temoignages',
  '/faq',
  '/partenaires',
  '/jeux-ia',
  '/jeux-ia/devine-ia',
  '/jeux-ia/prompt-master',
  '/quiz',
  '/quiz/maturite-ia',
  '/quiz/quel-outil-ia',
  '/quiz/test-connaissances',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page}`])
          ),
        },
      });
    }
  }

  // Build per-locale slug sets to avoid declaring phantom URLs in sitemap.
  const localeSlugs: Record<string, Set<string>> = {};
  for (const locale of locales) {
    localeSlugs[locale] = new Set(getBlogPosts(locale).map((p) => p.slug));
  }

  // Canton pages (9 cantons × 4 locales)
  for (const canton of CANTONS) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/cantons/${canton.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/cantons/${canton.slug}`])
          ),
        },
      });
    }
  }

  for (const locale of locales) {
    for (const slug of localeSlugs[locale]) {
      // Only declare hreflang alternates for locales where the article actually exists.
      const availableLanguages = locales.filter((l) => localeSlugs[l].has(slug));
      entries.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            availableLanguages.map((l) => [l, `${baseUrl}/${l}/blog/${slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
