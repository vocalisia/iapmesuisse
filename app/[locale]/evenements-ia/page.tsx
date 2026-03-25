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
  const t = await getTranslations({ locale, namespace: 'metadata.events' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

interface EventItem {
  name: string;
  date: string;
  location: string;
  type: string;
  price: string;
  url: string;
  description: string;
}

function formatEventDate(dateStr: string) {
  const date = new Date(dateStr + 'T00:00:00');
  const day = date.getDate();
  const month = date.toLocaleDateString('fr-CH', { month: 'short' }).toUpperCase();
  return { day, month };
}

function isFree(price: string) {
  return price.toLowerCase() === 'gratuit' || price.toLowerCase() === 'free' || price === '0 CHF';
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'events' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const eventsRaw = t.raw('items') as EventItem[];
  const events = Array.isArray(eventsRaw) ? eventsRaw : [];

  // Sort events by date ascending
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <>
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: tNav('home'), href: '/' },
            { label: tNav('evenements') },
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

      {/* Events List */}
      <section className="bg-[#F5F5F5] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {sortedEvents.map((event, index) => {
            const { day, month } = formatEventDate(event.date);
            const free = isFree(event.price);

            return (
              <article
                key={index}
                className="flex gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                {/* Date Box */}
                <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl bg-[#1B2A4A] text-white">
                  <span className="text-2xl font-extrabold leading-none">{day}</span>
                  <span className="mt-1 text-xs font-semibold uppercase tracking-wider">
                    {month}
                  </span>
                </div>

                {/* Event Details */}
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-bold text-[#1B2A4A]">{event.name}</h3>
                    <span className="inline-flex items-center rounded-full bg-[#1B2A4A]/10 px-2.5 py-0.5 text-xs font-medium text-[#1B2A4A]">
                      {event.type}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        free
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {event.price}
                    </span>
                  </div>

                  <div className="mb-2 flex items-center gap-1 text-sm text-gray-500">
                    <svg
                      className="h-4 w-4 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    <span>{event.location}</span>
                  </div>

                  <p className="mb-3 text-sm leading-relaxed text-gray-600">
                    {event.description}
                  </p>

                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-[#FF0000] transition-colors hover:text-red-700"
                  >
                    En savoir plus
                    <svg
                      className="ml-1 h-4 w-4"
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
            );
          })}
        </div>
      </section>

      {/* Submit Event CTA */}
      <CTA
        title={t('submit_title')}
        description={t('submit_text')}
        buttonText={t('submit_button')}
        href="/contact"
      />
    </>
  );
}
