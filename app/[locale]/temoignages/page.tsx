import { getTranslations } from 'next-intl/server';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTA from '@/components/CTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.testimonials' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

interface TestimonialItem {
  name: string;
  company: string;
  location: string;
  text: string;
  rating: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} sur 5 étoiles`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-5 w-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'testimonials' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const testimonialsRaw = t.raw('items') as TestimonialItem[];
  const testimonials = Array.isArray(testimonialsRaw) ? testimonialsRaw : [];

  return (
    <>
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: tNav('home'), href: '/' },
            { label: tNav('temoignages') },
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

      {/* Testimonials Grid */}
      <section className="bg-[#F5F5F5] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <article
                key={index}
                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Big Quotation Mark */}
                <div className="mb-4">
                  <svg
                    className="h-10 w-10 text-[#FF0000]/20"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
                  </svg>
                </div>

                {/* Testimonial Text */}
                <blockquote className="flex-1">
                  <p className="text-base italic leading-relaxed text-gray-700">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                </blockquote>

                {/* Rating */}
                <div className="mt-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Author Info */}
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <p className="font-bold text-[#1B2A4A]">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                  <p className="flex items-center gap-1 text-xs text-gray-400">
                    <svg
                      className="h-3 w-3"
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
                    {testimonial.location}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CTA
        title={t('cta_title')}
        description={t('cta_text')}
        buttonText={t('cta_button')}
        href="/contact"
      />
    </>
  );
}
