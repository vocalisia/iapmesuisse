import { getTranslations } from 'next-intl/server';
import Breadcrumbs from '@/components/Breadcrumbs';
import NewsletterForm from '@/components/NewsletterForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.newsletter' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function NewsletterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'newsletter' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const featuresRaw = t.raw('features') as string[];
  const features = Array.isArray(featuresRaw) ? featuresRaw : [];

  return (
    <>
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: tNav('home'), href: '/' },
            { label: tNav('newsletter') },
          ]}
        />
      </div>

      {/* Hero */}
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

      {/* Two-column: features + form */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          {/* Left: Features list */}
          <div className="flex flex-col justify-center">
            <h2 className="mb-6 text-2xl font-bold text-[#1B2A4A] sm:text-3xl">
              {t('features_title')}
            </h2>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-6 w-6 shrink-0 text-[#FF0000]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-base leading-relaxed text-gray-700">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Newsletter form */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Big benefit statement */}
      <section className="bg-[#1B2A4A] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('benefit_title')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-gray-300">
            {t('benefit_description')}
          </p>
        </div>
      </section>
    </>
  );
}
