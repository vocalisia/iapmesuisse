import { getTranslations } from 'next-intl/server';
import { getAlternates } from '@/lib/metadata';
import { getBlogPosts } from '@/lib/markdown';
import BlogCard from '@/components/BlogCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Link } from '@/i18n/routing';
import { sanitizePublicText } from '@/lib/public-text';
import { getSchemaLanguage, getSiteUrl } from '@/lib/structured-data';

const POSTS_PER_PAGE = 12;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page || '1', 10) || 1);
  const t = await getTranslations({ locale, namespace: 'metadata.blog' });

  const baseTitle = sanitizePublicText(t('title'), locale);
  const baseDesc = sanitizePublicText(t('description'), locale);
  const title = page > 1 ? `${baseTitle} - Page ${page}` : baseTitle;

  return {
    title,
    description: baseDesc,
    alternates: getAlternates(locale, page > 1 ? `/blog?page=${page}` : '/blog'),
    ...(page > 1 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page || '1', 10) || 1);

  const t = await getTranslations({ locale, namespace: 'blog' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const allPosts = getBlogPosts(locale);

  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(startIdx, startIdx + POSTS_PER_PAGE);
  const title = sanitizePublicText(t('title'), locale);
  const subtitle = sanitizePublicText(t('subtitle'), locale);
  const baseUrl = getSiteUrl();
  const blogUrl = `${baseUrl}/${locale}/blog${safePage > 1 ? `?page=${safePage}` : ''}`;
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${blogUrl}#collection`,
    url: blogUrl,
    name: title,
    description: subtitle,
    inLanguage: getSchemaLanguage(locale),
    isPartOf: { '@id': `${baseUrl}/#website` },
    publisher: { '@id': `${baseUrl}/#organization` },
    mainEntity: {
      '@type': 'ItemList',
      '@id': `${blogUrl}#posts`,
      name: title,
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: startIdx + index + 1,
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        item: {
          '@type': 'BlogPosting',
          '@id': `${baseUrl}/${locale}/blog/${post.slug}#article`,
          headline: sanitizePublicText(post.title, locale),
          description: sanitizePublicText(post.excerpt, locale),
          datePublished: post.date,
          author: { '@id': `${baseUrl}/#founder` },
          publisher: { '@id': `${baseUrl}/#organization` },
        },
      })),
    },
  };

  return (
    <section className="bg-gray-light min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: sanitizePublicText(tNav('home'), locale), href: '/' },
            { label: sanitizePublicText(tNav('blog'), locale) },
          ]}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-gray-600">
          {subtitle}
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        {posts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                slug={post.slug}
                locale={locale}
                image={post.image}
                author={post.author}
                readMoreText={sanitizePublicText(t('read_more'), locale)}
                byText={sanitizePublicText(t('by'), locale)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">-</p>
        )}
      </div>

      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 pb-20 sm:px-6 lg:px-8"
        >
          {safePage > 1 ? (
            <Link
              href={safePage === 2 ? '/blog' : `/blog?page=${safePage - 1}`}
              rel="prev"
              aria-label={`Page précédente, page ${safePage - 1}`}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-gray-50"
            >
              <span aria-hidden="true">←</span> {safePage - 1}
            </Link>
          ) : (
            <span />
          )}

          <span className="text-sm text-gray-500">
            Page {safePage} / {totalPages}
          </span>

          {safePage < totalPages ? (
            <Link
              href={`/blog?page=${safePage + 1}`}
              rel="next"
              aria-label={`Page suivante, page ${safePage + 1}`}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-gray-50"
            >
              {safePage + 1} <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </section>
  );
}
