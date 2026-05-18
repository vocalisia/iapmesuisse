import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
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
    ];
  },
};

export default withNextIntl(nextConfig);
