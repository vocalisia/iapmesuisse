import { getTranslations } from 'next-intl/server';
import { getAlternates } from '@/lib/metadata';
import { getBlogPost, getBlogPosts } from '@/lib/markdown';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Link } from '@/i18n/routing';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getBlogPost(locale, slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: getAlternates(locale, `/blog/${slug}`),
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
  const post = await getBlogPost(locale, slug);

  if (!post) notFound();

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

  return (
    <section className="min-h-screen bg-gray-light">
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
            <span>{post.author}</span>
          </div>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              {post.excerpt}
            </p>
          )}
          <div className="mt-6 h-px w-full bg-gray-200" />
        </header>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-primary prose-h2:mt-10 prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-p:text-gray-700 prose-a:text-accent prose-a:underline hover:prose-a:text-primary prose-strong:text-primary prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:marker:text-accent"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back to blog */}
        <div className="mt-14 border-t border-gray-200 pt-8">
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
