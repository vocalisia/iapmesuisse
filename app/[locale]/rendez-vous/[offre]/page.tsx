import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { getAlternates } from '@/lib/metadata';
import { RDV_OFFRES, getRdvOffre, agendaUrl, type RdvLocale } from '@/lib/rdv';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQ from '@/components/FAQ';
import AgendaEmbed from '@/components/AgendaEmbed';

type Props = { params: Promise<{ locale: string; offre: string }> };

const LOCALES: RdvLocale[] = ['fr', 'de', 'en', 'it'];

const T = {
  fr: { fil: 'Prendre rendez-vous', quand: 'Durée', conditions: 'Conditions', pourQui: 'Pour qui', questions: 'Questions fréquentes', autres: 'Ce n’est pas la bonne demande ?', tousRdv: 'Voir les trois types d’entretien' },
  de: { fil: 'Termin buchen', quand: 'Dauer', conditions: 'Konditionen', pourQui: 'Für wen', questions: 'Häufige Fragen', autres: 'Nicht das passende Anliegen?', tousRdv: 'Alle drei Gesprächsarten ansehen' },
  en: { fil: 'Book a meeting', quand: 'Length', conditions: 'Terms', pourQui: 'Who it is for', questions: 'Frequent questions', autres: 'Not the right request?', tousRdv: 'See all three meeting types' },
  it: { fil: 'Prenota un incontro', quand: 'Durata', conditions: 'Condizioni', pourQui: 'Per chi', questions: 'Domande frequenti', autres: 'Non è la richiesta giusta?', tousRdv: 'Vedi i tre tipi di incontro' },
} as const;

export function generateStaticParams() {
  const params: { locale: string; offre: string }[] = [];
  for (const locale of LOCALES) {
    for (const o of RDV_OFFRES) {
      params.push({ locale, offre: o.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props) {
  const { locale, offre: slug } = await params;
  const offre = getRdvOffre(slug);
  if (!offre) return {};
  const l = (LOCALES as string[]).includes(locale) ? (locale as RdvLocale) : 'fr';
  const c = offre.contenu[l];
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: getAlternates(locale, `/rendez-vous/${slug}`),
  };
}

export default async function Page({ params }: Props) {
  const { locale, offre: slug } = await params;
  const offre = getRdvOffre(slug);
  if (!offre) notFound();

  const l = (LOCALES as string[]).includes(locale) ? (locale as RdvLocale) : 'fr';
  const c = offre.contenu[l];
  const t = T[l];
  const url = agendaUrl(slug);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumbs items={[{ label: t.fil, href: '/rendez-vous' }, { label: c.nav }]} />

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h1 className="text-4xl font-bold text-[#1B2A4A]">{c.heroTitle}</h1>
          <p className="mt-4 text-lg text-gray-700">{c.heroLead}</p>

          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 border-y border-gray-200 py-4">
            <div>
              <dt className="text-sm text-gray-500">{t.quand}</dt>
              <dd className="font-semibold text-[#1B2A4A]">{c.duree}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">{t.conditions}</dt>
              <dd className="font-semibold text-[#1B2A4A]">{c.conditions}</dd>
            </div>
          </dl>

          <h2 className="mt-8 text-xl font-semibold text-[#1B2A4A]">{c.pendantTitre}</h2>
          <ul className="mt-3 space-y-2">
            {c.pendant.map((item) => (
              <li key={item} className="flex gap-3 text-gray-700">
                <span aria-hidden className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-[#FF0000]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-[#1B2A4A]">{c.apresTitre}</h2>
          <ul className="mt-3 space-y-2">
            {c.apres.map((item) => (
              <li key={item} className="flex gap-3 text-gray-700">
                <span aria-hidden className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-[#1B2A4A]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 rounded bg-gray-50 p-4 text-sm text-gray-600">
            <span className="font-semibold text-[#1B2A4A]">{t.pourQui} : </span>
            {c.pourQui}
          </p>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <AgendaEmbed url={url} locale={l} sujet={c.heroTitle} />
        </div>
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-bold text-[#1B2A4A]">{t.questions}</h2>
        <div className="mt-5">
          <FAQ items={c.faq} />
        </div>
      </section>

      <p className="mt-12 text-gray-600">
        {t.autres}{' '}
        <Link href="/rendez-vous" className="font-semibold text-[#1B2A4A] underline">
          {t.tousRdv}
        </Link>
      </p>
    </div>
  );
}
