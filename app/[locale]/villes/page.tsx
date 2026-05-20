import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getAlternates } from '@/lib/metadata';
import { VILLES } from '@/lib/villes';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTA from '@/components/CTA';

type Props = { params: Promise<{ locale: string }> };

const TITLES: Record<string, { title: string; description: string; h1: string; intro: string; cta: string; ctaButton: string; ctaDesc: string; breadcrumb: string; populationLabel: string; smeLabel: string }> = {
  fr: {
    title: 'Agence IA par ville · Sion, Genève, Lausanne, Zurich, Berne — IAPME',
    description: 'Agence IA pour PME présente dans les principales villes suisses : Sion, Genève, Lausanne, Zurich, Berne. Audit gratuit + formation + intégration ChatGPT/Copilot.',
    h1: 'Agence IA pour PME — par ville suisse',
    intro: 'IAPME Suisse accompagne les PME dans les principales villes suisses. Sélectionnez votre ville pour découvrir nos services locaux, cas d\'usage et ressources spécifiques.',
    cta: 'Voir les services →',
    ctaButton: 'Réserver mon audit gratuit',
    ctaDesc: 'Pas votre ville ? Nous accompagnons les PME dans toute la Suisse en visio.',
    breadcrumb: 'Villes',
    populationLabel: 'Population',
    smeLabel: 'PME',
  },
  de: {
    title: 'KI-Agentur nach Stadt · Sitten, Genf, Lausanne, Zürich, Bern — IAPME',
    description: 'KI-Agentur für KMU in den wichtigsten Schweizer Städten: Sion, Genf, Lausanne, Zürich, Bern. Kostenloses Audit + Schulung + ChatGPT/Copilot-Integration.',
    h1: 'KI-Agentur für KMU — nach Schweizer Stadt',
    intro: 'IAPME Suisse begleitet KMU in den wichtigsten Schweizer Städten. Wählen Sie Ihre Stadt für lokale Leistungen, Anwendungsfälle und spezifische Ressourcen.',
    cta: 'Leistungen ansehen →',
    ctaButton: 'Kostenloses Audit buchen',
    ctaDesc: 'Ihre Stadt ist nicht dabei? Wir begleiten KMU schweizweit per Videocall.',
    breadcrumb: 'Städte',
    populationLabel: 'Einwohner',
    smeLabel: 'KMU',
  },
  en: {
    title: 'AI agency by city · Sion, Geneva, Lausanne, Zurich, Bern — IAPME',
    description: 'AI agency for SMEs in major Swiss cities: Sion, Geneva, Lausanne, Zurich, Bern. Free audit + training + ChatGPT/Copilot integration.',
    h1: 'AI agency for SMEs — by Swiss city',
    intro: 'IAPME Suisse serves SMEs in major Swiss cities. Select your city for local services, use cases and specific resources.',
    cta: 'See services →',
    ctaButton: 'Book my free audit',
    ctaDesc: 'Your city isn\'t listed? We serve SMEs across Switzerland via video call.',
    breadcrumb: 'Cities',
    populationLabel: 'Population',
    smeLabel: 'SMEs',
  },
  it: {
    title: 'Agenzia IA per città · Sion, Ginevra, Losanna, Zurigo, Berna — IAPME',
    description: 'Agenzia IA per PMI nelle principali città svizzere: Sion, Ginevra, Losanna, Zurigo, Berna. Audit gratuito + formazione + integrazione ChatGPT/Copilot.',
    h1: 'Agenzia IA per PMI — per città svizzera',
    intro: 'IAPME Suisse accompagna le PMI nelle principali città svizzere. Seleziona la tua città per servizi locali, casi d\'uso e risorse specifiche.',
    cta: 'Vedi i servizi →',
    ctaButton: 'Prenoto l\'audit gratuito',
    ctaDesc: 'La sua città non è in elenco? Accompagniamo le PMI in tutta la Svizzera in videochiamata.',
    breadcrumb: 'Città',
    populationLabel: 'Popolazione',
    smeLabel: 'PMI',
  },
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = TITLES[locale] ?? TITLES.fr;
  return {
    title: t.title,
    description: t.description,
    alternates: getAlternates(locale, '/villes'),
  };
}

export default async function VillesIndexPage({ params }: Props) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const t = TITLES[locale] ?? TITLES.fr;

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t.title,
    itemListElement: VILLES.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://iapmesuisse.ch/${locale}/villes/${v.slug}`,
      name: v.names[locale as keyof typeof v.names] ?? v.names.fr,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: tNav('home'), href: '/' }, { label: t.breadcrumb }]} />
      </div>

      <section className="bg-[#1B2A4A] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.h1}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-200">{t.intro}</p>
        </div>
      </section>

      <section className="bg-gray-light px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VILLES.map((v) => {
              const name = v.names[locale as keyof typeof v.names] ?? v.names.fr;
              const cantonName = v.cantonNames[locale as keyof typeof v.cantonNames] ?? v.cantonNames.fr;
              return (
                <Link
                  key={v.slug}
                  href={`/villes/${v.slug}`}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">{cantonName}</p>
                  <h2 className="mt-2 text-2xl font-bold text-primary group-hover:text-accent">{name}</h2>
                  <p className="mt-3 text-xs text-gray-500">
                    {t.populationLabel}: {v.population} · {t.smeLabel}: {v.smeCount}
                  </p>
                  <ul className="mt-4 space-y-1 text-sm text-gray-600">
                    {v.topSectors.slice(0, 3).map((s) => (
                      <li key={s}>· {s}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm font-semibold text-accent">{t.cta}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTA title={t.h1} description={t.ctaDesc} buttonText={t.ctaButton} href="/contact" />
    </>
  );
}
