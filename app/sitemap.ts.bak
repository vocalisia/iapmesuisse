import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/markdown';

const locales = ['fr', 'de', 'en', 'it'];
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://iapmesuisse.ch';

const pages = [
  '',
  '/services',
  '/a-propos',
  '/blog',
  '/contact',
  '/ressources',
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

  const blogSlugs = getBlogPosts('fr').map((post) => post.slug);

  for (const slug of blogSlugs) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/blog/${slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
