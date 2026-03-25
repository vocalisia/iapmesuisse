import Parser from 'rss-parser';
import { RSS_SOURCES } from './config';

export interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  language: string;
}

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'IAPME-Suisse-BlogBot/1.0',
  },
});

export async function fetchAllFeeds(): Promise<RSSItem[]> {
  const cutoff = new Date();
  cutoff.setHours(cutoff.getHours() - 72); // Last 72 hours

  const results = await Promise.allSettled(
    RSS_SOURCES.map(async (source) => {
      try {
        const feed = await parser.parseURL(source.url);
        return (feed.items || []).map((item) => ({
          title: (item.title || '').trim(),
          description: (item.contentSnippet || item.content || item.summary || '').trim().slice(0, 500),
          link: item.link || '',
          pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
          source: source.name,
          language: source.language,
        }));
      } catch (err) {
        console.warn(`[RSS] Failed to fetch ${source.name}: ${(err as Error).message}`);
        return [];
      }
    })
  );

  const allItems: RSSItem[] = [];
  for (const result of results) {
    if (result.status === 'fulfilled') {
      allItems.push(...result.value);
    }
  }

  // Filter by recency
  const recent = allItems.filter((item) => {
    try {
      return new Date(item.pubDate) >= cutoff;
    } catch {
      return true;
    }
  });

  // Deduplicate by normalized title
  const seen = new Set<string>();
  const unique = recent.filter((item) => {
    const key = item.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (seen.has(key) || !item.title) return false;
    seen.add(key);
    return true;
  });

  // Sort by recency
  unique.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  console.log(`[RSS] Fetched ${unique.length} unique items from ${RSS_SOURCES.length} sources`);
  return unique;
}
