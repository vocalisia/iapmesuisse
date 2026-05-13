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
    ];
  },
};

export default withNextIntl(nextConfig);
