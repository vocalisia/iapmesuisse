import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getAlternates } from '@/lib/metadata';
import { RDV_OFFRES, type RdvLocale } from '@/lib/rdv';
import { CONSEILLERS } from '@/lib/conseillers';
import Breadcrumbs from '@/components/Breadcrumbs';

type Props = { params: Promise<{ locale: string }> };

const T = {
  fr: {
    fil: 'Prendre rendez-vous',
    title: 'Prendre rendez-vous',
    desc: 'Choisissez le type d’entretien qui correspond à votre demande — diagnostic IA, formation d’équipe ou projet d’agent — puis un créneau dans notre agenda.',
    h1: 'Prendre rendez-vous',
    lead: 'Trois entretiens, trois demandes différentes. Choisissez celui qui correspond à la vôtre : le contenu et la durée ne sont pas les mêmes.',
    choisir: 'Choisir un créneau',
    rassurance:
      'Tous nos entretiens se tiennent en visio ou par téléphone, en français. Aucun engagement n’est demandé à l’issue du rendez-vous.',
  },
  de: {
    fil: 'Termin buchen',
    title: 'Termin buchen',
    desc: 'Wählen Sie die passende Gesprächsart — KI-Diagnose, Team-Schulung oder Agenten-Projekt — und anschliessend einen Termin in unserem Kalender.',
    h1: 'Termin buchen',
    lead: 'Drei Gespräche für drei verschiedene Anliegen. Wählen Sie das passende: Inhalt und Dauer unterscheiden sich.',
    choisir: 'Termin wählen',
    rassurance:
      'Alle Gespräche finden per Video oder Telefon statt. Nach dem Termin entsteht keine Verpflichtung.',
  },
  en: {
    fil: 'Book a meeting',
    title: 'Book a meeting',
    desc: 'Pick the kind of meeting that matches your request — AI diagnostic, team training or agent project — then a slot in our calendar.',
    h1: 'Book a meeting',
    lead: 'Three meetings for three different requests. Pick the one that matches yours: the content and the length differ.',
    choisir: 'Pick a slot',
    rassurance:
      'All meetings are held by video or phone. No commitment follows the meeting.',
  },
  it: {
    fil: 'Prenota un incontro',
    title: 'Prenota un incontro',
    desc: 'Scegli il tipo di incontro adatto alla tua richiesta — diagnosi IA, formazione del team o progetto di agente — e poi un orario nel nostro calendario.',
    h1: 'Prenota un incontro',
    lead: 'Tre incontri per tre richieste diverse. Scegli quello che corrisponde alla tua: contenuti e durata non sono gli stessi.',
    choisir: 'Scegli un orario',
    rassurance:
      'Tutti gli incontri si tengono in video o al telefono. Dopo l’incontro non c’è alcun impegno.',
  },
} as const;

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = T[locale as keyof typeof T] ?? T.fr;
  return {
    title: t.title,
    description: t.desc,
    alternates: getAlternates(locale, '/rendez-vous'),
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const t = T[locale as keyof typeof T] ?? T.fr;
  const l = (['fr', 'de', 'en', 'it'].includes(locale) ? locale : 'fr') as RdvLocale;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Breadcrumbs items={[{ label: t.fil }]} />

      <h1 className="mt-6 text-4xl font-bold text-[#1B2A4A]">{t.h1}</h1>
      <p className="mt-4 max-w-2xl text-lg text-gray-700">{t.lead}</p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {RDV_OFFRES.map((offre) => {
          const c = offre.contenu[l];
          return (
            <div
              key={offre.slug}
              className="flex flex-col rounded-lg border border-gray-200 p-6 transition hover:border-[#1B2A4A]"
            >
              <h2 className="text-xl font-semibold text-[#1B2A4A]">{c.nav}</h2>
              <p className="mt-1 text-sm font-medium text-gray-500">
                {c.duree} · {c.conditions}
              </p>
              <p className="mt-3 flex-1 text-gray-700">{c.heroLead}</p>
              <Link
                href={`/rendez-vous/${offre.slug}`}
                className="mt-5 inline-block rounded bg-[#FF0000] px-5 py-3 text-center font-semibold text-white hover:opacity-90"
              >
                {t.choisir}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Francais seulement, comme les pages des deux signataires : un prospect qui arrive ici
          depuis un e-mail de Laura ou de Michael retrouve la personne qui lui a ecrit. */}
      {l === 'fr' && (
        <section className="mt-12 rounded-2xl bg-[#F3F5F9] p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-[#1B2A4A]">Vous avez reçu un e-mail de Laura ou de Michael ?</h2>
          <p className="mt-2 text-gray-700">Réservez directement avec la personne qui vous a écrit.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {Object.values(CONSEILLERS).map((c) => (
              <Link
                key={c.slug}
                href={c.chemin}
                className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition hover:ring-[#1B2A4A]"
              >
                <Image src={c.photo} alt={c.photoAlt} width={64} height={64} className="h-16 w-16 rounded-full object-cover" />
                <span>
                  <span className="block font-semibold text-[#1B2A4A]">{c.nom}</span>
                  <span className="block text-sm text-gray-600">{c.role}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <p className="mt-10 max-w-2xl text-gray-600">{t.rassurance}</p>
    </div>
  );
}
