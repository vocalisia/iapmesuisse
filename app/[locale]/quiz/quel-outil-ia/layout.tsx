import { getAlternates } from '@/lib/metadata';
import type { ReactNode } from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const title = 'Quel outil IA est fait pour vous ? | IAPME Suisse';
  const description =
    'Quiz interactif pour identifier l’outil IA le plus adapté à votre profil professionnel et à vos besoins.';

  return {
    title,
    description,
    alternates: getAlternates(locale, '/quiz/quel-outil-ia'),
    openGraph: {
      title,
      description,
      locale,
      type: 'website',
    },
    robots: { index: true, follow: true },
  };
}

export default function QuelOutilIaLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
