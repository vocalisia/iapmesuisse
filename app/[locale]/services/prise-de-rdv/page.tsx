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
  const t = await getTranslations({ locale, namespace: 'metadata.priseDeRdv' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: getAlternates(locale, '/services/prise-de-rdv'),
  };
}

const CheckIcon = () => (
  <svg className="h-5 w-5 flex-shrink-0 text-[#0369A1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

export default async function PriseDeRdvPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'priseDeRdv' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const steps = ['qualify', 'schedule', 'remind', 'followup'] as const;
  const benefits = ['available', 'noshow', 'qualify', 'crm', 'multilang', 'reporting'] as const;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t('schema.name'),
    description: t('schema.description'),
    provider: { '@type': 'ProfessionalService', name: 'IAPME Suisse', url: 'https://iapmesuisse.ch' },
    areaServed: { '@type': 'Country', name: 'Switzerland' },
    url: `https://iapmesuisse.ch/${locale}/services/prise-de-rdv`,
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
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-[#0369A1] ring-1 ring-inset ring-blue-100">
                {t('badge')}
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl">{t('title')}</h1>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">{t('subtitle')}</p>
              <ul className="mt-6 space-y-3">
                {(['point1', 'point2', 'point3'] as const).map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <CheckIcon /><span className="text-gray-700">{t(`hero.${p}`)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-[#0369A1] px-6 py-3 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#0284C7] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0369A1] focus:ring-offset-2">
                  {t('hero.cta')}
                </Link>
                <Link href="/services" className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50">
                  {t('hero.ctaSecondary')}
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 shadow-sm">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0369A1]">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                  </svg>
                </div>
                <div className="mt-4 text-5xl font-bold text-[#0F172A]">24/7</div>
                <div className="mt-2 text-lg font-medium text-gray-700">{t('hero.availability')}</div>
                <div className="mt-6 space-y-3 text-left">
                  {(['noWaiting', 'autoConfirm', 'syncCalendar'] as const).map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckIcon /><span className="text-sm text-gray-700">{t(`hero.${item}`)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#0F172A] sm:text-4xl">{t('how.title')}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">{t('how.subtitle')}</p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#0369A1] text-sm font-bold text-white">{i + 1}</div>
                <h3 className="font-semibold text-[#0F172A]">{t(`how.${step}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{t(`how.${step}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-[#0F172A] sm:text-4xl">{t('benefits.title')}</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b} className="flex gap-4 rounded-xl border border-gray-100 bg-gray-50 p-5">
                <CheckIcon />
                <div>
                  <div className="font-semibold text-[#0F172A]">{t(`benefits.${b}.title`)}</div>
                  <div className="mt-1 text-sm text-gray-600">{t(`benefits.${b}.desc`)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0F172A] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 text-center sm:grid-cols-3">
            {(['noshow', 'hours', 'satisfaction'] as const).map((s) => (
              <div key={s}>
                <div className="text-4xl font-bold text-white">{t(`stats.${s}.value`)}</div>
                <div className="mt-2 text-gray-400">{t(`stats.${s}.label`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA title={t('cta.title')} description={t('cta.description')} buttonText={t('cta.button')} href="/contact" />
    </>
  );
}
