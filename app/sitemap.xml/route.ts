import { getBlogPosts } from '@/lib/markdown';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://iapmesuisse.ch';
const locales = ['fr', 'de', 'en', 'it'];

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

function escapeXml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function GET() {
  const today = new Date().toISOString().split('T')[0];
  const entries: string[] = [];

  // Static pages with alternates
  for (const page of pages) {
    for (const locale of locales) {
      const url = `${baseUrl}/${locale}${page}`;
      const priority = page === '' ? '1.0' : '0.8';
      const changefreq = page === '' ? 'weekly' : 'monthly';
      const alternates = locales
        .map(
          (l) =>
            `    <xhtml:link rel="alternate" hreflang="${l}" href="${escapeXml(`${baseUrl}/${l}${page}`)}" />`
        )
        .join('\n');
      entries.push(
        [
          '  <url>',
          `    <loc>${escapeXml(url)}</loc>`,
          `    <lastmod>${today}</lastmod>`,
          `    <changefreq>${changefreq}</changefreq>`,
          `    <priority>${priority}</priority>`,
          alternates,
          '  </url>',
        ].join('\n')
      );
    }
  }

  // Blog posts
  const blogSlugs = getBlogPosts('fr').map((post) => post.slug);
  for (const slug of blogSlugs) {
    for (const locale of locales) {
      const url = `${baseUrl}/${locale}/blog/${slug}`;
      const alternates = locales
        .map(
          (l) =>
            `    <xhtml:link rel="alternate" hreflang="${l}" href="${escapeXml(`${baseUrl}/${l}/blog/${slug}`)}" />`
        )
        .join('\n');
      entries.push(
        [
          '  <url>',
          `    <loc>${escapeXml(url)}</loc>`,
          `    <lastmod>${today}</lastmod>`,
          `    <changefreq>monthly</changefreq>`,
          `    <priority>0.6</priority>`,
          alternates,
          '  </url>',
        ].join('\n')
      );
    }
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    entries.join('\n'),
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
