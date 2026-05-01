import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getAlternates } from '@/lib/metadata';
import { CANTONS } from '@/lib/cantons';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTA from '@/components/CTA';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    fr: 'Audit IA gratuit & formation par canton suisse · IAPME Suisse',
    de: 'Kostenloses KI-Audit & Schulung pro Schweizer Kanton · IAPME Suisse',
    en: 'Free AI audit & training by Swiss canton · IAPME Suisse',
    it: 'Audit IA gratuito & formazione per cantone svizzero · IAPME Suisse',
  };
  const descs: Record<string, string> = {
    fr: 'Pages dédiées par canton suisse : Vaud, Genève, Fribourg, Valais, Neuchâtel, Jura, Berne, Zurich, Tessin. Audit IA gratuit + formation localisée.',
    de: 'Dedizierte Seiten pro Schweizer Kanton: Waadt, Genf, Freiburg, Wallis, Neuenburg, Jura, Bern, Zürich, Tessin. Kostenloses KI-Audit + lokale Schulung.',
    en: 'Dedicated pages by Swiss canton: Vaud, Geneva, Fribourg, Valais, Neuchâtel, Jura, Bern, Zurich, Ticino. Free AI audit + local training.',
    it: 'Pagine dedicate per cantone svizzero: Vaud, Ginevra, Friburgo, Vallese, Neuchâtel, Giura, Berna, Zurigo, Ticino. Audit IA gratuito + formazione locale.',
  };

  return {
    title: titles[locale] ?? titles.fr,
    description: descs[locale] ?? descs.fr,
    alternates: getAlternates(locale, '/cantons'),
  };
}

const T: Record<string, { breadcrumb: string; h1: string; intro: string; cta: string }> = {
  fr: {
    breadcrumb: 'Cantons',
    h1: 'IAPME Suisse · Présence dans les 9 cantons clés',
    intro: 'Choisissez votre canton pour accéder aux services IA adaptés au contexte local : secteurs prioritaires, aides cantonales mobilisables, villes desservies. Audit gratuit dans toute la Suisse.',
    cta: 'Réserver un audit gratuit',
  },
  de: {
    breadcrumb: 'Kantone',
    h1: 'IAPME Suisse · Präsenz in den 9 Schlüsselkantonen',
    intro: 'Wählen Sie Ihren Kanton für KI-Dienste, die auf den lokalen Kontext zugeschnitten sind: priorisierte Branchen, mobilisierbare kantonale Hilfen, bediente Städte. Kostenloses Audit in der ganzen Schweiz.',
    cta: 'Kostenloses Audit buchen',
  },
  en: {
    breadcrumb: 'Cantons',
    h1: 'IAPME Suisse · Presence across 9 key Swiss cantons',
    intro: 'Pick your canton for AI services adapted to local context: priority sectors, cantonal funding, cities served. Free audit anywhere in Switzerland.',
    cta: 'Book a free audit',
  },
  it: {
    breadcrumb: 'Cantoni',
    h1: 'IAPME Suisse · Presenza in 9 cantoni chiave',
    intro: 'Scelga il suo cantone per servizi IA adattati al contesto locale: settori prioritari, aiuti cantonali mobilizzabili, città servite. Audit gratuito in tutta la Svizzera.',
    cta: 'Prenoto un audit gratuito',
  },
};

export default async function CantonsIndexPage({ params }: Props) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const t = T[locale] ?? T.fr;

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: tNav('home'), href: '/' }, { label: t.breadcrumb }]} />
      </div>

      <section className="bg-[#1B2A4A] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.h1}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-200">
            {t.intro}
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CANTONS.map((c) => {
              const name = c.names[locale as keyof typeof c.names] ?? c.names.fr;
              return (
                <Link
                  key={c.slug}
                  href={`/cantons/${c.slug}` as any}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-primary">{name}</h2>
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      {c.code}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    {c.cities.slice(0, 3).join(' · ')}
                  </p>
                  <p className="mt-3 text-sm font-medium text-gray-700">
                    {c.smeCount} PME / KMU / PMI
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-gray-600">
                    {c.topSectors.slice(0, 3).join(', ')}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTA
        title={t.h1}
        description={t.intro}
        buttonText={t.cta}
        href="/contact"
      />
    </>
  );
}
