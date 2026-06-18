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
import { sanitizePublicHtml, sanitizePublicText } from '@/lib/public-text';

type BlogSummary = ReturnType<typeof getBlogPosts>[number];
type PillarLink = { href: string; label: string; tokens: string[] };

const STOP_WORDS = new Set([
  'avec',
  'pour',
  'dans',
  'des',
  'les',
  'une',
  'aux',
  'and',
  'the',
  'for',
  'und',
  'der',
  'die',
  'das',
  'con',
  'per',
  'gli',
]);

function keywords(text: string) {
  return new Set(
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length >= 4 && !STOP_WORDS.has(word))
  );
}

function getRelatedPosts(post: BlogSummary, locale: string) {
  const current = keywords(`${post.title} ${post.excerpt} ${post.slug.replace(/-/g, ' ')}`);
  return getBlogPosts(locale)
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const candidateWords = keywords(`${candidate.title} ${candidate.excerpt} ${candidate.slug.replace(/-/g, ' ')}`);
      let score = 0;
      current.forEach((word) => {
        if (candidateWords.has(word)) score += 1;
      });
      return { post: candidate, score };
    })
    .sort((a, b) => b.score - a.score || (a.post.date > b.post.date ? -1 : 1))
    .slice(0, 5)
    .map((item) => item.post);
}

const PILLAR_LINKS: Record<string, PillarLink[]> = {
  fr: [
    { href: '/agence-ia-suisse', label: 'Agence IA Suisse pour PME', tokens: ['agence', 'consultant', 'conseil', 'strategie'] },
    { href: '/automatisation-ia-pme-suisse', label: 'Automatisation IA pour PME suisses', tokens: ['automatisation', 'processus', 'workflow', 'outil'] },
    { href: '/formation-ia-pme', label: 'Formation IA pour equipes PME', tokens: ['formation', 'atelier', 'equipes', 'chatgpt'] },
    { href: '/ki-beratung-kmu-schweiz', label: 'KI Beratung KMU Schweiz', tokens: ['ki', 'beratung', 'kmu', 'deutschschweiz'] },
    { href: '/chatbot-ia-entreprise-suisse', label: 'Chatbot IA entreprise Suisse', tokens: ['chatbot', 'service', 'client', 'support'] },
  ],
  de: [
    { href: '/ki-beratung-kmu-schweiz', label: 'KI Beratung fur Schweizer KMU', tokens: ['ki', 'beratung', 'kmu', 'berater'] },
    { href: '/automatisation-ia-pme-suisse', label: 'Prozessautomatisierung fur KMU', tokens: ['automatisierung', 'prozess', 'workflow', 'tools'] },
    { href: '/formation-ia-pme', label: 'KI Schulung fur Teams', tokens: ['schulung', 'workshop', 'training', 'teams'] },
    { href: '/agence-ia-suisse', label: 'KI Agentur Schweiz fur KMU', tokens: ['agentur', 'consulting', 'partner', 'strategie'] },
    { href: '/chatbot-ia-entreprise-suisse', label: 'KI Chatbot fur Unternehmen', tokens: ['chatbot', 'kundenservice', 'support', 'service'] },
  ],
  en: [
    { href: '/agence-ia-suisse', label: 'AI consulting agency in Switzerland', tokens: ['agency', 'consulting', 'consultant', 'strategy'] },
    { href: '/automatisation-ia-pme-suisse', label: 'AI process automation for Swiss SMEs', tokens: ['automation', 'process', 'workflow', 'tools'] },
    { href: '/formation-ia-pme', label: 'AI training for Swiss SME teams', tokens: ['training', 'upskilling', 'workshop', 'teams'] },
    { href: '/ki-beratung-kmu-schweiz', label: 'AI consulting for German-speaking SMEs', tokens: ['berater', 'beratung', 'kmu', 'german'] },
    { href: '/chatbot-ia-entreprise-suisse', label: 'AI chatbot for Swiss companies', tokens: ['chatbot', 'customer', 'service', 'support'] },
  ],
  it: [
    { href: '/agence-ia-suisse', label: 'Agenzia IA in Svizzera per PMI', tokens: ['agenzia', 'consulenza', 'consulente', 'strategia'] },
    { href: '/automatisation-ia-pme-suisse', label: 'Automazione IA per PMI svizzere', tokens: ['automazione', 'processi', 'workflow', 'strumenti'] },
    { href: '/formation-ia-pme', label: 'Formazione IA per team PMI', tokens: ['formazione', 'workshop', 'team', 'chatgpt'] },
    { href: '/ki-beratung-kmu-schweiz', label: 'Consulenza IA per PMI svizzere', tokens: ['consulenza', 'pmi', 'ticino', 'lugano'] },
    { href: '/chatbot-ia-entreprise-suisse', label: 'Chatbot IA per aziende svizzere', tokens: ['chatbot', 'servizio', 'clienti', 'supporto'] },
  ],
};

const LEGACY_BLOG_REDIRECTS: Record<string, Record<string, string>> = {
  de: {
    'formation-ia-pme-suisse': '/formation-ia-pme',
    'ia-pme-valais-sion': '/villes/sion',
  },
  en: {
    'formation-ia-pme-suisse': '/formation-ia-pme',
    'ia-pme-valais-sion': '/villes/sion',
  },
  it: {
    'formation-ia-pme-suisse': '/formation-ia-pme',
    'ia-pme-valais-sion': '/villes/sion',
  },
};

function getPillarLinks(post: BlogSummary, locale: string) {
  const links = PILLAR_LINKS[locale] ?? PILLAR_LINKS.fr;
  const source = `${post.title} ${post.excerpt} ${post.slug.replace(/-/g, ' ')}`.toLowerCase();

  return links
    .map((link, index) => ({
      link,
      score: link.tokens.reduce((sum, token) => sum + (source.includes(token) ? 1 : 0), 0),
      index,
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 4)
    .map((item) => item.link);
}

function normalizeContentHeadings(html: string) {
  return html
    .replace(/<h1(\s[^>]*)?>/gi, '<h2$1>')
    .replace(/<\/h1>/gi, '</h2>');
}

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
  const legacyRedirect = LEGACY_BLOG_REDIRECTS[locale]?.[slug];
  if (legacyRedirect) {
    permanentRedirect(`/${locale}${legacyRedirect}`);
  }

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
  const villeLabelRaw = villeLabels[locale] ?? villeLabels.fr;
  const villeLabel = {
    sectionTitle: sanitizePublicText(villeLabelRaw.sectionTitle, locale),
    ctaText: sanitizePublicText(villeLabelRaw.ctaText, locale),
  };
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
  const relatedLabels: Record<string, string> = {
    fr: 'Pour aller plus loin',
    de: 'Weiterlesen',
    en: 'Read next',
    it: 'Per approfondire',
  };
  const relatedLabel = relatedLabels[locale] ?? relatedLabels.fr;
  const pillarSectionLabels: Record<string, string> = {
    fr: 'Pages piliers utiles',
    de: 'Wichtige KI-Guides',
    en: 'Useful pillar guides',
    it: 'Guide pilastro utili',
  };
  const pillarSectionLabel = pillarSectionLabels[locale] ?? pillarSectionLabels.fr;

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
  const contentHtml = sanitizePublicHtml(normalizeContentHeadings(post.content), locale);
  const articleText = stripHtml(contentHtml);
  const relatedPosts = getRelatedPosts(post, locale);
  const pillarLinks = getPillarLinks(post, locale);
  const articleKeywords = Array.from(
    keywords(`${post.title} ${post.excerpt} ${post.slug.replace(/-/g, ' ')}`)
  ).slice(0, 14);

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
    isPartOf: { '@id': `${baseUrl}/${locale}/blog#blog` },
    keywords: articleKeywords,
    about: pillarLinks.map((link) => ({
      '@type': 'Thing',
      name: sanitizePublicText(link.label, locale),
      url: `${baseUrl}/${locale}${link.href}`,
    })),
    mentions: relatedPosts.slice(0, 3).map((related) => ({
      '@type': 'Article',
      '@id': `${baseUrl}/${locale}/blog/${related.slug}#article`,
      headline: related.title,
      url: `${baseUrl}/${locale}/blog/${related.slug}`,
    })),
    isAccessibleForFree: true,
    wordCount: articleText ? articleText.split(/\s+/).length : undefined,
  };
  const howToSchema = buildHowToFromHtml({
    title: post.title,
    description: post.excerpt,
    html: contentHtml,
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
            __html: normalizeHtmlBlogAnchors(contentHtml, locale, {
              sameOriginHosts: ['iapmesuisse.ch'],
              blogPathPrefix: `/${locale}/blog`,
            }),
          }}
        />

        {pillarLinks.length > 0 && (
          <nav className="mt-14 border-t border-gray-200 pt-10" aria-labelledby="pillar-links-title">
            <h2 id="pillar-links-title" className="mb-5 text-xl font-bold text-primary">
              {pillarSectionLabel}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {pillarLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href as '/services'}
                    className="block rounded-xl border border-gray-200 bg-white p-4 text-sm font-semibold text-accent underline-offset-4 transition-colors hover:border-accent hover:text-primary hover:underline"
                  >
                    {sanitizePublicText(link.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {relatedPosts.length > 0 && (
          <nav className="mt-14 border-t border-gray-200 pt-10" aria-labelledby="related-posts-title">
            <h2 id="related-posts-title" className="mb-5 text-xl font-bold text-primary">
              {relatedLabel}
            </h2>
            <ul className="space-y-3">
              {relatedPosts.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={`/blog/${related.slug}`}
                    className="font-semibold text-accent underline underline-offset-4 hover:text-primary"
                  >
                    {related.title}
                  </Link>
                  {related.excerpt && (
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{related.excerpt}</p>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}

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
