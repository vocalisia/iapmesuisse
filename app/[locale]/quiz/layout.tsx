import { getAlternates } from '@/lib/metadata';

const quizMeta: Record<string, { title: string; description: string }> = {
  fr: {
    title: 'Quiz IA pour PME suisses — Testez votre maturité digitale | IAPME Suisse',
    description: 'Évaluez la maturité IA de votre PME suisse en 5 minutes. Quiz gratuit et personnalisé. Résultats immédiats et recommandations sur mesure.',
  },
  de: {
    title: 'KI-Quiz für Schweizer KMU — Testen Sie Ihre digitale Reife | IAPME Suisse',
    description: 'Bewerten Sie die KI-Reife Ihres Schweizer KMU in 5 Minuten. Kostenloser Quiz mit sofortigen Ergebnissen.',
  },
  en: {
    title: 'AI Quiz for Swiss SMEs — Test your digital maturity | IAPME Suisse',
    description: 'Assess your Swiss SME AI maturity in 5 minutes. Free quiz with instant results and personalized recommendations.',
  },
  it: {
    title: 'Quiz IA per PMI svizzere — Valuta la tua maturità digitale | IAPME Suisse',
    description: 'Valuta la maturità IA della tua PMI svizzera in 5 minuti. Quiz gratuito con risultati immediati.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const meta = quizMeta[locale] ?? quizMeta.fr;
  return {
    title: meta.title,
    description: meta.description,
    alternates: getAlternates(locale, '/quiz/maturite-ia'),
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale,
      type: 'website',
    },
    robots: { index: true, follow: true },
  };
}

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
