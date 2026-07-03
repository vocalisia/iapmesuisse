import { getAlternates } from '@/lib/metadata';
import type { ReactNode } from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const title = 'Devine l’IA | IAPME Suisse';
  const description =
    'Jeu interactif pour apprendre à distinguer un texte humain d’un texte généré par intelligence artificielle.';

  return {
    title,
    description,
    alternates: getAlternates(locale, '/jeux-ia/devine-ia'),
    openGraph: {
      title,
      description,
      locale,
      type: 'website',
    },
    robots: { index: true, follow: true },
  };
}

export default function DevineIaLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
