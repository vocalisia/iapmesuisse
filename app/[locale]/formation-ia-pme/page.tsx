import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTA from '@/components/CTA';

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

  const tiers = ['free', 'starter', 'pro', 'premium'] as const;

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
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => {
            const featuresRaw = t.raw(`${tier}.features`);
            const features: string[] = Array.isArray(featuresRaw) ? featuresRaw : [];
            const isPro = tier === 'pro';
            const isPremium = tier === 'premium';
            const isFree = tier === 'free';

            return (
              <div
                key={tier}
                className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                  isPro
                    ? 'scale-105 border-[#FF0000] bg-white shadow-lg'
                    : isPremium
                      ? 'border-[#1B2A4A] bg-[#1B2A4A] shadow-lg'
                      : isFree
                        ? 'border-gray-200 bg-gray-50 shadow-sm'
                        : 'border-gray-200 bg-white shadow-sm'
                }`}
              >
                {/* Badge */}
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

                {/* Plan Name */}
                <h3
                  className={`text-xl font-bold ${
                    isPremium ? 'text-white' : 'text-[#1B2A4A]'
                  }`}
                >
                  {t(`${tier}.name`)}
                </h3>

                {/* Price */}
                <p
                  className={`mt-2 text-3xl font-extrabold ${
                    isPremium ? 'text-white' : 'text-[#1B2A4A]'
                  }`}
                >
                  {t(`${tier}.price`)}
                </p>

                {/* Description */}
                <p
                  className={`mt-2 text-sm ${
                    isPremium ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {t(`${tier}.description`)}
                </p>

                {/* Features */}
                <ul className="mt-6 flex-1 space-y-3">
                  {features.map((feature, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-2 text-sm ${
                        isPremium ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      <svg
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          isPremium ? 'text-[#FF0000]' : 'text-[#FF0000]'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href="/contact"
                  className={`mt-8 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${
                    isPro
                      ? 'bg-[#FF0000] text-white hover:bg-red-700'
                      : isPremium
                        ? 'bg-white text-[#1B2A4A] hover:bg-gray-100'
                        : 'bg-[#1B2A4A] text-white hover:bg-[#FF0000]'
                  }`}
                >
                  {t(`${tier}.cta`)}
                </Link>
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
