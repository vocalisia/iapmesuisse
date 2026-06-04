import { getTranslations } from 'next-intl/server';
import { getAlternates } from '@/lib/metadata';
import { getBlogPost, getBlogPosts } from '@/lib/markdown';
import { normalizeHtmlBlogAnchors } from '@/lib/normalize-blog-href';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { notFound, permanentRedirect } from 'next/navigation';
import { VILLES } from '@/lib/villes';
import {
  buildHowToFromHtml,
  getSchemaLanguage,
  getSiteUrl,
  isPublicPricingSlug,
  stripHtml,
} from '@/lib/structured-data';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (isPublicPricingSlug(slug)) return {};

  const post = await getBlogPost(locale, slug);

  if (!post) return {};

  const allLocales = ['fr', 'de', 'en', 'it'] as const;
  const availableLocales = allLocales.filter((l) =>
    getBlogPosts(l).some((p) => p.slug === slug)
  );

  return {
    title: { absolute: post.title },
    description: post.excerpt,
    alternates: getAlternates(locale, `/blog/${slug}`, availableLocales.length > 0 ? availableLocales : [locale]),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      locale,
      siteName: 'IAPME Suisse',
    },
  };
}

export async function generateStaticParams() {
  const locales = ['fr', 'de', 'en', 'it'];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const posts = getBlogPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  if (isPublicPricingSlug(slug)) {
    permanentRedirect(`/${locale}/contact`);
  }

  const post = await getBlogPost(locale, slug);

  if (!post) notFound();

  // Pick 4 cities to show: prefer locale-matching ones first, then fallback
  const frRomandeSlugs = ['sion', 'geneve', 'lausanne', 'neuchatel', 'fribourg', 'yverdon', 'martigny', 'sierre'];
  const deSlugs = ['zurich', 'berne'];
  const cityOrder = locale === 'de' ? [...deSlugs, ...frRomandeSlugs] : [...frRomandeSlugs, ...deSlugs];
  const citiesForBlog = cityOrder
    .map((s) => VILLES.find((v) => v.slug === s))
    .filter(Boolean)
    .slice(0, 4) as typeof VILLES;

  const villeLabels: Record<string, { sectionTitle: string; ctaText: string }> = {
    fr: { sectionTitle: 'Trouvez notre agence IA dans votre ville', ctaText: 'Voir les services →' },
    de: { sectionTitle: 'Unsere KI-Agentur in Ihrer Stadt', ctaText: 'Leistungen ansehen →' },
    en: { sectionTitle: 'Find our AI agency in your city', ctaText: 'See services →' },
    it: { sectionTitle: 'Trova la nostra agenzia IA nella tua città', ctaText: 'Vedi i servizi →' },
  };
  const villeLabel = villeLabels[locale] ?? villeLabels.fr;
  const contactLabels: Record<string, { eyebrow: string; title: string; description: string }> = {
    fr: {
      eyebrow: 'Contact',
      title: 'Parlez-nous de votre projet IA',
      description:
        'Expliquez votre objectif, votre contexte PME et les workflows a automatiser. Nous vous repondons avec une prochaine etape concrete.',
    },
    de: {
      eyebrow: 'Kontakt',
      title: 'Erzahlen Sie uns von Ihrem KI-Projekt',
      description:
        'Beschreiben Sie Ihr Ziel, Ihren KMU-Kontext und die Workflows, die automatisiert werden sollen.',
    },
    en: {
      eyebrow: 'Contact',
      title: 'Tell us about your AI project',
      description:
        'Share your goal, company context and the workflows you want to automate. We will answer with a clear next step.',
    },
    it: {
      eyebrow: 'Contatto',
      title: 'Parlaci del tuo progetto IA',
      description:
        'Descrivi il tuo obiettivo, il contesto PMI e i workflow da automatizzare. Ti risponderemo con un prossimo passo concreto.',
    },
  };
  const contactLabel = contactLabels[locale] ?? contactLabels.fr;

  const localeMap: Record<string, string> = {
    fr: 'fr-CH',
    de: 'de-CH',
    en: 'en-GB',
    it: 'it-CH',
  };

  const formattedDate = new Date(post.date).toLocaleDateString(
    localeMap[locale] || 'fr-CH',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  const baseUrl = getSiteUrl();
  const articleUrl = `${baseUrl}/${locale}/blog/${slug}`;
  const imageUrl = post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`;
  const articleText = stripHtml(post.content);

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': ['BlogPosting', 'Article'],
    '@id': `${articleUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      '@id': `${baseUrl}/#founder`,
      name: post.author,
      url: `${baseUrl}/${locale}/a-propos`,
      sameAs: [
        'https://www.linkedin.com/in/vocalisia/',
        'https://x.com/VocalisAi',
      ],
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'IAPME Suisse',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    inLanguage: getSchemaLanguage(locale),
    url: articleUrl,
    isAccessibleForFree: true,
    wordCount: articleText ? articleText.split(/\s+/).length : undefined,
  };
  const howToSchema = buildHowToFromHtml({
    title: post.title,
    description: post.excerpt,
    html: post.content,
    url: articleUrl,
    locale,
  });

  return (
    <section className="min-h-screen bg-gray-light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: tNav('home'), href: '/' },
            { label: tNav('blog'), href: '/blog' },
            { label: post.title },
          ]}
        />
      </div>

      {/* Article */}
      <article className="mx-auto max-w-4xl px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 text-sm font-medium text-gray-400">
            <time dateTime={post.date} className="uppercase tracking-wider">
              {formattedDate}
            </time>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <span className="text-gray-600">{t('by')} {post.author}, {t('role')}</span>
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              {post.excerpt}
            </p>
          )}
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            {post.image.startsWith('http') ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                unoptimized
                className="object-cover"
              />
            ) : (
              <Image
                src={post.image || '/images/blog-default.jpg'}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            )}
          </div>
          <div className="mt-6 h-px w-full bg-gray-200" />
        </header>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-primary prose-h2:mt-10 prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-p:text-gray-700 prose-a:text-accent prose-a:underline hover:prose-a:text-primary prose-strong:text-primary prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:marker:text-accent"
          dangerouslySetInnerHTML={{
            __html: normalizeHtmlBlogAnchors(post.content, locale, {
              sameOriginHosts: ['iapmesuisse.ch'],
              blogPathPrefix: `/${locale}/blog`,
            }),
          }}
        />

        {/* City internal links — maillage SEO */}
        <div className="mt-14 border-t border-gray-200 pt-10">
          <h2 className="mb-6 text-xl font-bold text-primary">{villeLabel.sectionTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {citiesForBlog.map((v) => {
              const name = v.names[locale as keyof typeof v.names] ?? v.names.fr;
              const cantonName = v.cantonNames[locale as keyof typeof v.cantonNames] ?? v.cantonNames.fr;
              return (
                <Link
                  key={v.slug}
                  href={`/villes/${v.slug}`}
                  className="group rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm transition-all duration-200 hover:border-accent hover:bg-white hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">{cantonName}</p>
                  <p className="mt-1 font-bold text-primary group-hover:text-accent">{name}</p>
                  <p className="mt-2 text-xs text-gray-500">{villeLabel.ctaText}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Contact form */}
        <div className="mt-14 border-t border-gray-200 pt-10">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                {contactLabel.eyebrow}
              </p>
              <h2 className="mt-2 text-2xl font-bold leading-tight text-primary">
                {contactLabel.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                {contactLabel.description}
              </p>
            </div>
            <ContactForm />
          </div>
        </div>

        {/* Back to blog */}
        <div className="mt-10 border-t border-gray-200 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            {t('back')}
          </Link>
        </div>
      </article>
    </section>
  );
}
