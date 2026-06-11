import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      // www → non-www: consolide l'autorité SEO (évite duplicate content)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.iapmesuisse.ch' }],
        destination: 'https://iapmesuisse.ch/:path*',
        permanent: true,
      },
      {
        source: '/:locale(fr|de|en|it)/quiz',
        destination: '/:locale/quiz/maturite-ia',
        permanent: true,
      },
      // Cannibalisation: consolide Valais/Sion vers slug canonique
      {
        source: '/:locale(fr|de|en|it)/blog/ia-pme-valais-sion',
        destination: '/:locale/blog/ia-pme-valais-sion-2026',
        permanent: true,
      },
      {
        source: '/:locale(fr|de|en|it)/blog/ia-pme-valais-sion-2026-04-14',
        destination: '/:locale/blog/ia-pme-valais-sion-2026',
        permanent: true,
      },
      // Cannibalisation: consolide formation IA PME
      {
        source: '/:locale(fr|de|en|it)/blog/formation-ia-pme-suisse',
        destination: '/:locale/blog/formation-ia-pme-suisse-2026',
        permanent: true,
      },
      // Cannibalisation: consolide ROI IA PME
      {
        source: '/:locale(fr|de|en|it)/blog/roi-intelligence-artificielle-pme-transformation-digitale',
        destination: '/:locale/blog/roi-intelligence-artificielle-pme-suisse',
        permanent: true,
      },
      {
        source: '/:locale(fr|de|en|it)/blog/aio-llm-citation-pme-suisse',
        destination: '/:locale/blog/citations-moteurs-ia-pme-suisse',
        permanent: true,
      },
      {
        source: '/:locale(fr|de|en|it)/blog/google-2026-seo-aio-pme-suisse',
        destination: '/:locale/blog/google-2026-seo-moteurs-ia-pme-suisse',
        permanent: true,
      },
      {
        source: '/:locale(fr|de|en|it)/blog/schema-article-faq-howto-aio-suisse',
        destination: '/:locale/blog/schema-article-faq-howto-suisse',
        permanent: true,
      },
      {
        source: '/:locale(fr|de|en|it)/blog/seo-suisse-french-aio-2026',
        destination: '/:locale/blog/seo-suisse-francophone-moteurs-ia-2026',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
