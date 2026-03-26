import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getAlternates } from '@/lib/metadata';
import ServiceCard from '@/components/ServiceCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTA from '@/components/CTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.services' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: getAlternates(locale, '/services'),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tHome = await getTranslations({ locale, namespace: 'home' });
  const tPricing = await getTranslations({ locale, namespace: 'pricing' });

  const services = [
    {
      key: 'audit' as const,
      icon: '\u{1F50D}',
    },
    {
      key: 'training' as const,
      icon: '\u{1F4DA}',
    },
    {
      key: 'integration' as const,
      icon: '\u{1F527}',
    },
    {
      key: 'strategy' as const,
      icon: '\u{1F4C8}',
    },
  ];

  // Build Service JSON-LD schemas
  const serviceSchemas = services.map((service) => ({
    "@type": "Service",
    "name": t(`${service.key}.title`),
    "description": t(`${service.key}.description`),
    "provider": {
      "@type": "ProfessionalService",
      "name": "IAPME Suisse",
      "url": "https://iapmesuisse.ch",
    },
    "areaServed": {
      "@type": "Country",
      "name": "Switzerland",
    },
    "url": `https://iapmesuisse.ch/${locale}/services`,
  }));

  const servicePageSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": t('title'),
    "itemListElement": serviceSchemas.map((s, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": s,
    })),
  };

  return (
    <>
      {/* Service JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicePageSchema) }}
      />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: tNav('home'), href: '/' },
            { label: tNav('services') },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="bg-white px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#1B2A4A] sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2">
          {services.map((service) => {
            const featuresRaw = t.raw(`${service.key}.features`);
            const features: string[] = Array.isArray(featuresRaw) ? featuresRaw : [];

            return (
              <ServiceCard
                key={service.key}
                icon={service.icon}
                title={t(`${service.key}.title`)}
                description={t(`${service.key}.description`)}
                features={features}
                ctaText={t('cta')}
              />
            );
          })}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#1B2A4A] sm:text-4xl">
              {tPricing('title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              {tPricing('subtitle')}
            </p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {(['starter', 'pro', 'enterprise'] as const).map((tier) => {
              const featuresRaw = tPricing.raw(`${tier}.features`);
              const features: string[] = Array.isArray(featuresRaw) ? featuresRaw : [];
              const isPopular = tier === 'pro';
              return (
                <div
                  key={tier}
                  className={`relative flex flex-col rounded-2xl border p-8 ${
                    isPopular
                      ? 'border-[#FF0000] shadow-lg scale-105'
                      : 'border-gray-200 shadow-sm'
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#FF0000] px-4 py-1 text-xs font-bold text-white">
                      {tPricing('pro.popular')}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-[#1B2A4A]">{tPricing(`${tier}.name`)}</h3>
                  <p className="mt-2 text-3xl font-extrabold text-[#1B2A4A]">{tPricing(`${tier}.price`)}</p>
                  <p className="mt-2 text-sm text-gray-600">{tPricing(`${tier}.description`)}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#FF0000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`mt-8 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${
                      isPopular
                        ? 'bg-[#FF0000] text-white hover:bg-red-700'
                        : 'bg-[#1B2A4A] text-white hover:bg-[#FF0000]'
                    }`}
                  >
                    {t('cta')}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CTA
        title={tHome('cta_title')}
        description={tHome('cta_description')}
        buttonText={tHome('cta_button')}
        href="/contact"
      />
    </>
  );
}
