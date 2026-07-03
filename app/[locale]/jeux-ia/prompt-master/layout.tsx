import { getAlternates } from '@/lib/metadata';
import type { ReactNode } from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const title = 'Prompt Master | IAPME Suisse';
  const description =
    'Jeu interactif pour apprendre à rédiger de meilleurs prompts IA avec contexte, contraintes et format attendu.';

  return {
    title,
    description,
    alternates: getAlternates(locale, '/jeux-ia/prompt-master'),
    openGraph: {
      title,
      description,
      locale,
      type: 'website',
    },
    robots: { index: true, follow: true },
  };
}

export default function PromptMasterLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
