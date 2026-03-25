import { getTranslations } from 'next-intl/server';
import Breadcrumbs from '@/components/Breadcrumbs';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.tools' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

interface ToolItem {
  name: string;
  category: string;
  rating: number;
  price: string;
  description: string;
  url: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} sur 5 étoiles`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-4 w-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function getPriceBadgeStyle(price: string) {
  const lower = price.toLowerCase();
  if (lower === 'gratuit' || lower === 'free') {
    return 'bg-green-100 text-green-700';
  }
  if (lower === 'freemium') {
    return 'bg-blue-100 text-blue-700';
  }
  return 'bg-gray-100 text-gray-700';
}

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'tools' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const toolsRaw = t.raw('items') as ToolItem[];
  const tools = Array.isArray(toolsRaw) ? toolsRaw : [];

  return (
    <>
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: tNav('home'), href: '/' },
            { label: tNav('outils') },
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

      {/* Tools Grid */}
      <section className="bg-[#F5F5F5] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool, index) => (
              <article
                key={index}
                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Tool Name */}
                <h3 className="text-lg font-bold text-[#1B2A4A]">{tool.name}</h3>

                {/* Star Rating */}
                <div className="mt-2">
                  <StarRating rating={tool.rating} />
                </div>

                {/* Badges */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-[#1B2A4A]/10 px-2.5 py-0.5 text-xs font-medium text-[#1B2A4A]">
                    {tool.category}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriceBadgeStyle(tool.price)}`}
                  >
                    {tool.price}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
                  {tool.description}
                </p>

                {/* Visit Button */}
                <div className="mt-4">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-[#1B2A4A] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#1B2A4A]/90"
                  >
                    {t('visit')}
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate Disclosure */}
      <section className="bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center text-xs leading-relaxed text-gray-500">
            {t('affiliate_note')}
          </p>
        </div>
      </section>
    </>
  );
}
