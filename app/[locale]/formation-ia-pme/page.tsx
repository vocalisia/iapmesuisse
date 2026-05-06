import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getAlternates } from '@/lib/metadata';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTA from '@/components/CTA';
import SwissSocialProof from '@/components/SwissSocialProof';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.formation' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: getAlternates(locale, '/formation-ia-pme'),
  };
}

export default async function FormationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'formation' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tHome = await getTranslations({ locale, namespace: 'home' });

  const tiers = ['free', 'starter', 'pro', 'premium', 'equipe', 'claude_code', 'ia_marketing'] as const;
  const stripeLinks = t.raw('links') as Record<string, string>;
  const testimonials = t.raw('testimonials') as Array<{quote: string; name: string; role: string; company: string}>;
  const caseMetrics = t.raw('case_study_metrics') as Array<{label: string; before_val: string; after_val: string; gain: string}>;

  return (
    <>
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: tNav('home'), href: '/' },
            { label: tNav('formation') },
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

      {/* Pricing Cards */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tiers.map((tier) => {
            const featuresRaw = t.raw(`${tier}.features`);
            const features: string[] = Array.isArray(featuresRaw) ? featuresRaw : [];
            const isPro = tier === 'pro';
            const isPremium = tier === 'premium';
            const isFree = tier === 'free';
            const isEquipe = tier === 'equipe';
            const isClaudeCode = tier === 'claude_code';
            const isMarketing = tier === 'ia_marketing';

            const stripeUrl = stripeLinks?.[tier] ?? null;
            const href = stripeUrl ?? '/contact';
            const isExternal = !!stripeUrl;

            return (
              <div
                key={tier}
                className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                  isPro
                    ? 'scale-105 border-[#FF0000] bg-white shadow-lg'
                    : isPremium
                      ? 'border-[#1B2A4A] bg-[#1B2A4A] shadow-lg'
                      : isEquipe
                        ? 'border-[#FF0000]/40 bg-gradient-to-b from-red-50 to-white shadow-md'
                        : isClaudeCode
                          ? 'border-orange-400 bg-gradient-to-b from-orange-50 to-white shadow-md'
                          : isMarketing
                            ? 'border-blue-400 bg-gradient-to-b from-blue-50 to-white shadow-md'
                            : isFree
                              ? 'border-gray-200 bg-gray-50 shadow-sm'
                              : 'border-gray-200 bg-white shadow-sm'
                }`}
              >
                {isPro && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#FF0000] px-4 py-1 text-xs font-bold text-white">
                    {t('pro.badge')}
                  </span>
                )}
                {isPremium && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#1B2A4A] px-4 py-1 text-xs font-bold text-white ring-2 ring-white">
                    {t('premium.badge')}
                  </span>
                )}
                {isEquipe && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#FF0000]/80 px-4 py-1 text-xs font-bold text-white">
                    {t('equipe.badge')}
                  </span>
                )}
                {isClaudeCode && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-bold text-white">
                    {t('claude_code.badge')}
                  </span>
                )}
                {isMarketing && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-4 py-1 text-xs font-bold text-white">
                    {t('ia_marketing.badge')}
                  </span>
                )}

                <h3 className={`text-xl font-bold ${isPremium ? 'text-white' : 'text-[#1B2A4A]'}`}>
                  {t(`${tier}.name`)}
                </h3>

                <p className={`mt-2 text-3xl font-extrabold ${isPremium ? 'text-white' : 'text-[#1B2A4A]'}`}>
                  {t(`${tier}.price`)}
                </p>

                <p className={`mt-2 text-sm ${isPremium ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t(`${tier}.description`)}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {features.map((feature, i) => (
                    <li key={i} className={`flex items-start gap-2 text-sm ${isPremium ? 'text-gray-200' : 'text-gray-700'}`}>
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#FF0000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {isExternal ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-8 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${
                      isPro
                        ? 'bg-[#FF0000] text-white hover:bg-red-700'
                        : isPremium
                          ? 'bg-white text-[#1B2A4A] hover:bg-gray-100'
                          : isEquipe
                            ? 'bg-[#FF0000] text-white hover:bg-red-700'
                            : 'bg-[#1B2A4A] text-white hover:bg-[#FF0000]'
                    }`}
                  >
                    {t(`${tier}.cta`)}
                  </a>
                ) : (
                  <Link
                    href="/contact"
                    className={`mt-8 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${
                      isFree ? 'bg-[#1B2A4A] text-white hover:bg-[#FF0000]' : 'bg-[#1B2A4A] text-white hover:bg-[#FF0000]'
                    }`}
                  >
                    {t(`${tier}.cta`)}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Guarantee & VAT */}
      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2">
            <svg
              className="h-6 w-6 text-[#FF0000]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <p className="text-lg font-semibold text-[#1B2A4A]">
              {t('guarantee')}
            </p>
          </div>
          <p className="mt-3 text-sm text-gray-500">{t('vat_note')}</p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#1B2A4A] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-gray-400">
            {t('social_stats_title')}
          </p>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { value: t('social_stat1_value'), label: t('social_stat1_label') },
              { value: t('social_stat2_value'), label: t('social_stat2_label') },
              { value: t('social_stat3_value'), label: t('social_stat3_label') },
              { value: t('social_stat4_value'), label: t('social_stat4_label') },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl font-extrabold text-[#FF0000]">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#1B2A4A]">
            {t('testimonials_title')}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {Array.isArray(testimonials) && testimonials.map((item, i) => (
              <div
                key={i}
                className="flex flex-col rounded-2xl border border-gray-100 bg-gray-50 p-8 shadow-sm"
              >
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} className="h-4 w-4 text-[#FF0000]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                {/* Quote */}
                <p className="flex-1 text-sm italic leading-relaxed text-gray-700">
                  &ldquo;{item.quote}&rdquo;
                </p>
                {/* Author */}
                <div className="mt-6 flex items-center gap-3 border-t border-gray-200 pt-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1B2A4A] text-sm font-bold text-white">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1B2A4A]">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.role}</p>
                    <p className="text-xs font-medium text-[#FF0000]">{item.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
            {/* Header */}
            <div className="bg-[#1B2A4A] px-8 py-6">
              <div className="flex items-center gap-3">
                <svg className="h-6 w-6 text-[#FF0000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <div>
                  <h2 className="text-xl font-bold text-white">{t('case_study_title')}</h2>
                  <p className="text-sm text-gray-300">{t('case_study_subtitle')}</p>
                </div>
              </div>
            </div>
            {/* Metrics */}
            <div className="px-8 py-8">
              <div className="space-y-6">
                {Array.isArray(caseMetrics) && caseMetrics.map((metric, i) => (
                  <div key={i}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#1B2A4A]">{metric.label}</span>
                      <span className="rounded-full bg-green-100 px-3 py-0.5 text-xs font-bold text-green-700">
                        {metric.gain}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="w-20 shrink-0 text-right font-medium text-gray-400">
                        {t('case_study_before')}: <span className="text-red-400">{metric.before_val}</span>
                      </span>
                      <div className="relative flex-1">
                        {/* Before bar */}
                        <div className="mb-1 h-3 w-full overflow-hidden rounded-full bg-red-100">
                          <div className="h-3 rounded-full bg-red-300" style={{width: '100%'}} />
                        </div>
                        {/* After bar */}
                        <div className="h-3 w-full overflow-hidden rounded-full bg-green-100">
                          <div
                            className="h-3 rounded-full bg-[#1B2A4A]"
                            style={{width: i === 2 ? '100%' : '37.5%'}}
                          />
                        </div>
                      </div>
                      <span className="w-20 shrink-0 font-medium text-[#1B2A4A]">
                        {t('case_study_after')}: <span className="text-green-600">{metric.after_val}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Case study quote */}
              <div className="mt-8 flex items-start gap-3 rounded-xl border-l-4 border-[#FF0000] bg-red-50 p-4">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#FF0000]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-sm italic text-gray-700">{t('case_study_quote')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Swiss Social Proof */}
      <SwissSocialProof />

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
