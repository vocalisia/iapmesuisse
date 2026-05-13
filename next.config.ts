import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:locale(fr|de|en|it)/quiz',
        destination: '/:locale/quiz/maturite-ia',
        permanent: true,
      },
      // Pricing-focused articles → /contact (per NO PRICING rule)
      {
        source: '/:locale(fr|de|en|it)/blog/prix-formation-ia-pme-suisse-comparatif-cantons-chf',
        destination: '/:locale/contact',
        permanent: true,
      },
      {
        source: '/:locale(fr|de|en|it)/blog/budget-ia-pme-suisse',
        destination: '/:locale/contact',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
