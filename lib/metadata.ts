const locales = ['fr', 'de', 'en', 'it'] as const;
const baseUrl = 'https://iapmesuisse.ch';

/**
 * Generate alternates metadata (canonical + hreflang) for a given locale and path.
 * @param locale - The current locale (fr, de, en, it)
 * @param path - The page path without locale prefix (e.g. '' for home, '/services', '/blog/my-post')
 */
export function getAlternates(locale: string, path: string = '') {
  return {
    canonical: `${baseUrl}/${locale}${path}`,
    languages: Object.fromEntries(
      locales.map((l) => [l, `${baseUrl}/${l}${path}`])
    ),
  };
}
