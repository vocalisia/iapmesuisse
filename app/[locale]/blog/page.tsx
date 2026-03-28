import { getTranslations } from 'next-intl/server';
import { getAlternates } from '@/lib/metadata';
import { getBlogPosts } from '@/lib/markdown';
import BlogCard from '@/components/BlogCard';
import Breadcrumbs from '@/components/Breadcrumbs';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.blog' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: getAlternates(locale, '/blog'),
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const posts = getBlogPosts(locale);

  return (
    <section className="bg-gray-light min-h-screen">
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: tNav('home'), href: '/' },
            { label: tNav('blog') },
          ]}
        />
      </div>

      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl lg:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-gray-600">
          {t('subtitle')}
        </p>
      </div>

      {/* Blog Grid */}
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
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
                readMoreText={t('read_more')}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            —
          </p>
        )}
      </div>
    </section>
  );
}
