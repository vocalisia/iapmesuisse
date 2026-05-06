import { getTranslations } from 'next-intl/server';
import { getAlternates } from '@/lib/metadata';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTA from '@/components/CTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.generationLeads' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: getAlternates(locale, '/services/generation-leads'),
  };
}

const CheckIcon = () => (
  <svg className="h-5 w-5 flex-shrink-0 text-[#0369A1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
    <div className="text-3xl font-bold text-[#0369A1]">{value}</div>
    <div className="mt-1 text-sm text-gray-600">{label}</div>
  </div>
);

export default async function GenerationLeadsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'generationLeads' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const steps = ['analyse', 'ciblage', 'automatisation', 'suivi'] as const;
  const features = ['crm', 'scoring', 'nurturing', 'reporting', 'multichannel', 'rgpd'] as const;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t('schema.name'),
    description: t('schema.description'),
    provider: {
      '@type': 'ProfessionalService',
      name: 'IAPME Suisse',
      url: 'https://iapmesuisse.ch',
    },
    areaServed: { '@type': 'Country', name: 'Switzerland' },
    url: `https://iapmesuisse.ch/${locale}/services/generation-leads`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: tNav('home'), href: '/' },
            { label: tNav('services'), href: '/services' },
            { label: t('breadcrumb') },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="bg-white px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-[#0369A1] ring-1 ring-inset ring-blue-100">
                {t('badge')}
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl">
                {t('title')}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                {t('subtitle')}
              </p>
              <ul className="mt-6 space-y-3">
                {(['point1', 'point2', 'point3'] as const).map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-gray-700">{t(`hero.${p}`)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`/${locale}/contact`}
                  className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-[#0369A1] px-6 py-3 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#0284C7] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0369A1] focus:ring-offset-2"
                >
                  {t('hero.cta')}
                </a>
                <a
                  href={`/${locale}/services`}
                  className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50"
                >
                  {t('hero.ctaSecondary')}
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <StatCard value={t('stats.leads.value')} label={t('stats.leads.label')} />
              <StatCard value={t('stats.conversion.value')} label={t('stats.conversion.label')} />
              <StatCard value={t('stats.roi.value')} label={t('stats.roi.label')} />
              <StatCard value={t('stats.setup.value')} label={t('stats.setup.label')} />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#0F172A] sm:text-4xl">{t('process.title')}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">{t('process.subtitle')}</p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step} className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#0369A1] text-sm font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-[#0F172A]">{t(`process.${step}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{t(`process.${step}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-[#0F172A] sm:text-4xl">{t('features.title')}</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f} className="flex gap-4 rounded-xl border border-gray-100 bg-gray-50 p-5">
                <CheckIcon />
                <div>
                  <div className="font-semibold text-[#0F172A]">{t(`features.${f}.title`)}</div>
                  <div className="mt-1 text-sm text-gray-600">{t(`features.${f}.desc`)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title={t('cta.title')}
        description={t('cta.description')}
        buttonText={t('cta.button')}
        href={`/${locale}/contact`}
      />
    </>
  );
}
