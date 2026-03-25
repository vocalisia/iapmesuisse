import fs from 'fs';
import path from 'path';
import { CONTENT_DIR, LOCALES } from './config';

interface ArticleData {
  title: string;
  excerpt: string;
  content: string;
}

export function writeArticles(
  slug: string,
  articles: Record<string, ArticleData>,
  sourceUrl?: string
): void {
  const date = new Date().toISOString().slice(0, 10);

  for (const locale of LOCALES) {
    const article = articles[locale];
    if (!article) {
      console.warn(`[Writer] Missing article for locale: ${locale}`);
      continue;
    }

    const dir = path.join(CONTENT_DIR, locale);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const frontmatter = [
      '---',
      `title: "${article.title.replace(/"/g, '\\"')}"`,
      `date: "${date}"`,
      `excerpt: "${article.excerpt.replace(/"/g, '\\"')}"`,
      `slug: "${slug}"`,
      `author: "IAPME Suisse"`,
      sourceUrl ? `source: "${sourceUrl}"` : null,
      `auto_generated: true`,
      '---',
    ]
      .filter(Boolean)
      .join('\n');

    const fileContent = `${frontmatter}\n\n${article.content}\n`;
    const filePath = path.join(dir, `${slug}.md`);

    fs.writeFileSync(filePath, fileContent, 'utf-8');
    console.log(`[Writer] Wrote ${filePath}`);
  }
}
