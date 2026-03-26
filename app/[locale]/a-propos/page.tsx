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
  const t = await getTranslations({ locale, namespace: 'metadata.about' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: getAlternates(locale, '/a-propos'),
  };
}

const VALUE_ICONS = ['\u{1F91D}', '\u{1F3AF}', '\u{1F4A1}', '\u{1F1E8}\u{1F1ED}'];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tHome = await getTranslations({ locale, namespace: 'home' });

  // Read values array from translations
  const valuesRaw = t.raw('values') as { title: string; description: string }[];
  const values = Array.isArray(valuesRaw) ? valuesRaw : [];

  return (
    <>
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: tNav('home'), href: '/' },
            { label: tNav('about') },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="bg-white px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#1B2A4A] sm:text-5xl">
            {t('title')}
          </h1>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-[#1B2A4A] sm:text-4xl">
            {t('mission_title')}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            {t('mission_text')}
          </p>
        </div>
      </section>

      {/* Why Section */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold text-[#1B2A4A] sm:text-4xl">
            {t('why_title')}
          </h2>
          <p className="mt-6 text-center text-lg leading-relaxed text-gray-600">
            {t('why_text')}
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#1B2A4A] sm:text-4xl">
            {t('values_title')}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#1B2A4A]/5 text-3xl">
                  {VALUE_ICONS[index] || '\u{2B50}'}
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#1B2A4A]">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#1B2A4A] sm:text-4xl">
            {t('team_title')}
          </h2>
          <div className="mx-auto max-w-md">
            <div className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
              {/* Avatar placeholder */}
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#1B2A4A]/10">
                <svg
                  className="h-12 w-12 text-[#1B2A4A]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1B2A4A]">
                {t('founder.name')}
              </h3>
              <p className="mt-1 text-sm font-medium text-[#FF0000]">
                {t('founder.role')}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                {t('founder.bio')}
              </p>
            </div>
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
