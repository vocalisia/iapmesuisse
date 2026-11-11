import { redirect } from 'next/navigation';
import FunnelCourtier from '@/components/FunnelCourtier';
import { COURTIERS, metadataCourtier } from '@/lib/courtiers';

// Page de reservation de la campagne courtiers en assurance, volet 3e pilier : arrivee des
// e-mails de la sequence pilier3 (cockpit courtiers-assurance).
// Contenu : lib/courtiers.ts. Mise en page : components/FunnelCourtier.tsx.
// Francais seulement (la campagne ne vise que la Suisse romande).

type Props = { params: Promise<{ locale: string }> };

const C = COURTIERS['courtiers-3e-pilier'];

export function generateStaticParams() {
  return [{ locale: 'fr' }];
}

export async function generateMetadata() {
  return metadataCourtier(C);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'fr') redirect(`/fr${C.chemin}`);
  return <FunnelCourtier c={C} />;
}
