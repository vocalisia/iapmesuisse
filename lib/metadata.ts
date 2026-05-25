const locales = ['fr', 'de', 'en', 'it'] as const;
const baseUrl = 'https://iapmesuisse.ch';

/**
 * Generate alternates metadata (canonical + hreflang) for a given locale and path.
 * @param locale - The current locale (fr, de, en, it)
 * @param path - The page path without locale prefix (e.g. '' for home, '/services', '/blog/my-post')
 * @param availableLocales - Subset of locales where this content actually exists (for blog articles)
 */
export function getAlternates(
  locale: string,
  path: string = '',
  availableLocales: readonly string[] = locales
) {
  return {
    canonical: `${baseUrl}/${locale}${path}`,
    languages: {
      ...Object.fromEntries(
        availableLocales.map((l) => [l, `${baseUrl}/${l}${path}`])
      ),
      'x-default': `${baseUrl}/fr${path}`,
    },
  };
}

/**
 * Generate standard openGraph metadata with correct locale.
 */
export function getOpenGraph(
  locale: string,
  title: string,
  description: string,
  type: 'website' | 'article' = 'website'
) {
  return {
    title,
    description,
    locale,
    type,
    siteName: 'IAPME Suisse',
  };
}
