import { getAlternates } from '@/lib/metadata';
import type { ReactNode } from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const title = 'Test de connaissances IA | IAPME Suisse';
  const description =
    'Quiz interactif pour tester les connaissances de base sur l’intelligence artificielle et ses usages en entreprise.';

  return {
    title,
    description,
    alternates: getAlternates(locale, '/quiz/test-connaissances'),
    openGraph: {
      title,
      description,
      locale,
      type: 'website',
    },
    robots: { index: true, follow: true },
  };
}

export default function TestConnaissancesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
