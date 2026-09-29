import { redirect } from 'next/navigation';
import FunnelConseiller from '@/components/FunnelConseiller';
import { CONSEILLERS, metadataConseiller } from '@/lib/conseillers';

// Page de reservation de Michael Serger : arrivee des e-mails qu'il signe (agents, automatisation, devis).
// Contenu : lib/conseillers.ts. Mise en page : components/FunnelConseiller.tsx.
// Francais seulement (la campagne ne vise que la Suisse romande) : les autres langues
// renvoient ici au lieu d'afficher une page vide.

type Props = { params: Promise<{ locale: string }> };

const C = CONSEILLERS.michael;

export function generateStaticParams() {
  return [{ locale: 'fr' }];
}

export async function generateMetadata() {
  return metadataConseiller(C);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'fr') redirect(`/fr${C.chemin}`);
  return <FunnelConseiller c={C} />;
}
