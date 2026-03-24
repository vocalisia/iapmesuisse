import { getTranslations } from 'next-intl/server';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQ from '@/components/FAQ';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.resources' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'resources' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const guides = t.raw('guides') as {
    title: string;
    description: string;
  }[];

  const links = t.raw('links') as {
    title: string;
    url: string;
    description: string;
  }[];

  const faqItems = t.raw('faq') as {
    question: string;
    answer: string;
  }[];

  return (
    <>
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: tNav('home'), href: '/' },
            { label: tNav('resources') },
          ]}
        />
      </div>

      {/* Header */}
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

      {/* Guides Section */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-[#1B2A4A] sm:text-4xl">
            {t('guides_title')}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide, index) => (
              <div
                key={index}
                className="flex flex-col rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 text-3xl">
                  <svg
                    className="h-7 w-7 text-[#1B2A4A]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#1B2A4A]">
                  {guide.title}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600">
                  {guide.description}
                </p>
                <div className="flex items-center gap-3">
                  <button
                    disabled
                    className="inline-flex items-center rounded-lg bg-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-400 cursor-not-allowed"
                  >
                    {t('download')}
                  </button>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                    {t('coming_soon')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Useful Links Section */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-[#1B2A4A] sm:text-4xl">
            {t('links_title')}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 text-3xl">
                  <svg
                    className="h-7 w-7 text-[#1B2A4A] transition-colors group-hover:text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#1B2A4A] transition-colors group-hover:text-accent">
                  {link.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-gray-600">
                  {link.description}
                </p>
                <span className="mt-4 text-sm font-medium text-accent">
                  {link.url.replace('https://', '')}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-[#1B2A4A] sm:text-4xl">
            {t('faq_title')}
          </h2>
          <FAQ items={faqItems} />
        </div>
      </section>
    </>
  );
}
