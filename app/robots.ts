import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://iapmesuisse.ch';

const aiBots = [
  'GPTBot',
  'OAI-SearchBot',
  'ClaudeBot',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
  'Bytespider',
  'CCBot',
  'Amazonbot',
  'FacebookBot',
  'YouBot',
];

export default function robots(): MetadataRoute.Robots {
  const aiRules: MetadataRoute.Robots['rules'] = aiBots.map((bot) => ({
    userAgent: bot,
    allow: '/',
    disallow: ['/api/', '/admin/'],
  }));

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
      ...aiRules,
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
