import { Link } from '@/i18n/routing';
import type { ArticleSource } from '@/lib/blog-seo';

type SeoLabels = {
  trustTitle: string;
  trustText: string;
  trustBullets: string[];
  sourcesTitle: string;
  coconTitle: string;
  kindLabel: Record<ArticleSource['kind'], string>;
};

type Props = {
  labels: SeoLabels;
  coconLinks: Array<{ href: string; label: string }>;
  sources: ArticleSource[];
};

export default function BlogSeoSections({ labels, coconLinks, sources }: Props) {
  return (
    <>
      <section className="mt-14 border-t border-gray-200 pt-10" aria-labelledby="article-method-title">
        <h2 id="article-method-title" className="mb-4 text-xl font-bold text-primary">
          {labels.trustTitle}
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-gray-700 sm:text-base">
          {labels.trustText}
        </p>
        <ul className="mt-5 space-y-2 text-sm leading-relaxed text-gray-700">
          {labels.trustBullets.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {coconLinks.length > 0 && (
        <nav className="mt-10 border-t border-gray-200 pt-10" aria-labelledby="article-cocon-title">
          <h2 id="article-cocon-title" className="mb-5 text-xl font-bold text-primary">
            {labels.coconTitle}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {coconLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href as '/services'}
                  className="block rounded-xl border border-gray-200 bg-white p-4 text-sm font-semibold text-accent underline-offset-4 transition-colors hover:border-accent hover:text-primary hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {sources.length > 0 && (
        <section className="mt-10 border-t border-gray-200 pt-10" aria-labelledby="article-sources-title">
          <h2 id="article-sources-title" className="mb-5 text-xl font-bold text-primary">
            {labels.sourcesTitle}
          </h2>
          <ul className="space-y-4">
            {sources.map((source) => (
              <li key={source.key} className="rounded-xl border border-gray-200 bg-white p-4">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent underline underline-offset-4 hover:text-primary"
                >
                  {source.title}
                </a>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{source.label}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  {labels.kindLabel[source.kind]}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
