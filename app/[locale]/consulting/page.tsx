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
  const t = await getTranslations({ locale, namespace: 'metadata.consulting' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: getAlternates(locale, '/consulting'),
  };
}

export default async function ConsultingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'consulting' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tHome = await getTranslations({ locale, namespace: 'home' });

  const offers = ['audit', 'accompagnement', 'custom'] as const;

  return (
    <>
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: tNav('home'), href: '/' },
            { label: tNav('consulting') },
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

      {/* Consulting Offers */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {offers.map((offer) => {
            const featuresRaw = t.raw(`${offer}.features`);
            const features: string[] = Array.isArray(featuresRaw) ? featuresRaw : [];
            const isAccompagnement = offer === 'accompagnement';
            const isCustom = offer === 'custom';
            const hasBadge = isAccompagnement || isCustom;

            return (
              <div
                key={offer}
                className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                  isAccompagnement
                    ? 'scale-105 border-[#FF0000] bg-white shadow-lg'
                    : isCustom
                      ? 'border-[#1B2A4A] bg-[#1B2A4A] shadow-lg'
                      : 'border-gray-200 bg-white shadow-sm'
                }`}
              >
                {/* Badge */}
                {hasBadge && (
                  <span
                    className={`absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white ${
                      isAccompagnement
                        ? 'bg-[#FF0000]'
                        : 'bg-[#1B2A4A] ring-2 ring-white'
                    }`}
                  >
                    {t(`${offer}.badge`)}
                  </span>
                )}

                {/* Offer Name */}
                <h3
                  className={`text-xl font-bold ${
                    isCustom ? 'text-white' : 'text-[#1B2A4A]'
                  }`}
                >
                  {t(`${offer}.name`)}
                </h3>

                {/* Price */}
                <p
                  className={`mt-2 text-3xl font-extrabold ${
                    isCustom ? 'text-white' : 'text-[#1B2A4A]'
                  }`}
                >
                  {t(`${offer}.price`)}
                </p>

                {/* Description */}
                <p
                  className={`mt-2 text-sm ${
                    isCustom ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {t(`${offer}.description`)}
                </p>

                {/* Features */}
                <ul className="mt-6 flex-1 space-y-3">
                  {features.map((feature, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-2 text-sm ${
                        isCustom ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#FF0000]"
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
                    isAccompagnement
                      ? 'bg-[#FF0000] text-white hover:bg-red-700'
                      : isCustom
                        ? 'bg-white text-[#1B2A4A] hover:bg-gray-100'
                        : 'bg-[#1B2A4A] text-white hover:bg-[#FF0000]'
                  }`}
                >
                  {t(`${offer}.cta`)}
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Calendly Booking Section */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1B2A4A] sm:text-4xl">
            {t('booking_title')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-gray-600">
            {t('booking_description')}
          </p>
          <div className="mt-8">
            {/* Calendly placeholder - user will add real link later */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#FF0000] px-8 py-4 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md"
            >
              {t('book_cta')}
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </Link>
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
