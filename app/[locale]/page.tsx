import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import ServiceCard from '@/components/ServiceCard';
import CTA from '@/components/CTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.home' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const tHero = await getTranslations({ locale, namespace: 'hero' });
  const tHome = await getTranslations({ locale, namespace: 'home' });
  const tServices = await getTranslations({ locale, namespace: 'services' });

  const whyItems = [
    { icon: '\u26A1', titleKey: 0 },
    { icon: '\uD83C\uDFAF', titleKey: 1 },
    { icon: '\uD83D\uDCA1', titleKey: 2 },
  ];

  const serviceCards = [
    {
      key: 'audit',
      icon: '\uD83D\uDD0D',
    },
    {
      key: 'training',
      icon: '\uD83D\uDCDA',
    },
    {
      key: 'integration',
      icon: '\uD83D\uDD27',
    },
    {
      key: 'strategy',
      icon: '\uD83D\uDCC8',
    },
  ] as const;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-light px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {tHero('title')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-200 sm:text-xl">
            {tHero('subtitle')}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-accent-dark hover:shadow-xl"
            >
              {tHero('cta')}
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-white hover:text-primary"
            >
              {tHero('secondary_cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* Why AI Section */}
      <section className="bg-gray-light px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              {tHome('why_title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              {tHome('why_description')}
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {whyItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 text-3xl">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-primary">
                  {tHome(`why_items.${item.titleKey}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {tHome(`why_items.${item.titleKey}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              {tHome('services_title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              {tServices('subtitle')}
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCards.map((card) => {
              const featuresRaw = tServices.raw(`${card.key}.features`);
              const features: string[] = Array.isArray(featuresRaw) ? featuresRaw : [];
              return (
                <ServiceCard
                  key={card.key}
                  title={tServices(`${card.key}.title`)}
                  description={tServices(`${card.key}.description`)}
                  icon={card.icon}
                  features={features}
                  ctaText={tServices('cta')}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {tHome('stats.title')}
          </h2>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[0, 1, 2, 3].map((idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-extrabold text-accent sm:text-5xl">
                  {tHome(`stats.items.${idx}.value`)}
                </div>
                <div className="mt-2 text-sm font-medium text-gray-300 sm:text-base">
                  {tHome(`stats.items.${idx}.label`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTA
        title={tHome('cta_title')}
        description={tHome('cta_description')}
        buttonText={tHome('cta_button')}
        href="/contact"
      />
    </>
  );
}
