/**
 * IAPME Suisse — Daily Blog Generation Pipeline
 *
 * Fetches RSS feeds from Swiss tech/AI sources,
 * selects the most relevant topic for PME,
 * generates an original article in FR,
 * translates to DE/EN/IT,
 * and writes markdown files to content/blog/.
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-blog.ts
 */

import { fetchAllFeeds } from './lib/rss-fetcher';
import { selectBestArticle } from './lib/article-selector';
import { generateArticle } from './lib/article-generator';
import { translateToAllLocales } from './lib/article-translator';
import { generateSlug, ensureUniqueSlug } from './lib/slug-utils';
import { writeArticles } from './lib/markdown-writer';

async function main() {
  console.log('=== IAPME Blog Pipeline ===');
  console.log(`Date: ${new Date().toISOString()}`);
  console.log('');

  // Step 1: Fetch RSS feeds
  console.log('[1/5] Fetching RSS feeds...');
  const items = await fetchAllFeeds();
  if (items.length === 0) {
    console.log('No RSS items found. Exiting.');
    process.exit(0);
  }

  // Step 2: Select best topic
  console.log('[2/5] Selecting best topic...');
  const selected = await selectBestArticle(items);
  if (!selected) {
    console.log('No suitable topic found. Exiting.');
    process.exit(0);
  }

  // Step 3: Generate French article
  console.log('[3/5] Generating article (FR)...');
  const article = await generateArticle(selected);

  // Step 4: Translate to DE, EN, IT
  console.log('[4/5] Translating to DE, EN, IT...');
  const allVersions = await translateToAllLocales(article);

  // Step 5: Write markdown files
  console.log('[5/5] Writing markdown files...');
  const slug = ensureUniqueSlug(generateSlug(article.slug || article.title));
  writeArticles(slug, allVersions, selected.link);

  console.log('');
  console.log(`=== Done! Published "${article.title}" as ${slug} ===`);
}

main().catch((err) => {
  console.error('Pipeline failed:', err);
  process.exit(1);
});
