import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: 'https://iapmesuisse.ch/fr' },
  robots: { index: false, follow: false },
};

// Root path: no-content page with canonical → /fr so Googlebot
// follows the canonical instead of flagging a redirect.
// next-intl with localePrefix:'always' would 308 here otherwise.
export default function RootPage() {
  return null;
}
