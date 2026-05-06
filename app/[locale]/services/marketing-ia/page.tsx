import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getAlternates } from '@/lib/metadata';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTA from '@/components/CTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.marketingIa' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: getAlternates(locale, '/services/marketing-ia'),
  };
}

const CheckIcon = () => (
  <svg className="h-5 w-5 flex-shrink-0 text-[#0369A1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

export default async function MarketingIaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'marketingIa' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const pillars = ['content', 'email', 'social', 'seo', 'ads', 'analytics'] as const;
  const usecases = ['ecommerce', 'services', 'b2b', 'local'] as const;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t('schema.name'),
    description: t('schema.description'),
    provider: { '@type': 'ProfessionalService', name: 'IAPME Suisse', url: 'https://iapmesuisse.ch' },
    areaServed: { '@type': 'Country', name: 'Switzerland' },
    url: `https://iapmesuisse.ch/${locale}/services/marketing-ia`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { label: tNav('home'), href: '/' },
          { label: tNav('services'), href: '/services' },
          { label: t('breadcrumb') },
        ]} />
      </div>

      <section className="bg-white px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-[#0369A1] ring-1 ring-inset ring-blue-100">
            {t('badge')}
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl">{t('title')}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">{t('subtitle')}</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/contact" className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-[#0369A1] px-6 py-3 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#0284C7] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0369A1] focus:ring-offset-2">
              {t('hero.cta')}
            </Link>
            <Link href="/services" className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50">
              {t('hero.ctaSecondary')}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#0F172A] sm:text-4xl">{t('pillars.title')}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">{t('pillars.subtitle')}</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <div key={p} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                  <svg className="h-5 w-5 text-[#0369A1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#0F172A]">{t(`pillars.${p}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{t(`pillars.${p}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0F172A] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 text-center sm:grid-cols-3">
            {(['time', 'engagement', 'cost'] as const).map((s) => (
              <div key={s}>
                <div className="text-4xl font-bold text-white">{t(`results.${s}.value`)}</div>
                <div className="mt-2 text-gray-400">{t(`results.${s}.label`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-[#0F172A] sm:text-4xl">{t('usecases.title')}</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {usecases.map((u) => (
              <div key={u} className="rounded-xl border border-gray-100 bg-gray-50 p-6">
                <h3 className="font-semibold text-[#0F172A]">{t(`usecases.${u}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{t(`usecases.${u}.desc`)}</p>
                <ul className="mt-4 space-y-2">
                  {(['a', 'b', 'c'] as const).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckIcon />{t(`usecases.${u}.${item}`)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA title={t('cta.title')} description={t('cta.description')} buttonText={t('cta.button')} href="/contact" />
    </>
  );
}
