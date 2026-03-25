import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content', 'blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  content: string;
}

export function getBlogPosts(locale: string): BlogPost[] {
  const localeDir = path.join(contentDirectory, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const files = fs.readdirSync(localeDir).filter((f) => f.endsWith('.md'));

  const posts = files.map((filename) => {
    const filePath = path.join(localeDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: data.slug || filename.replace(/\.md$/, ''),
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      author: data.author || 'IAPME Suisse',
      content,
    };
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getBlogPost(
  locale: string,
  slug: string
): Promise<BlogPost | null> {
  const localeDir = path.join(contentDirectory, locale);

  if (!fs.existsSync(localeDir)) {
    return null;
  }

  const files = fs.readdirSync(localeDir).filter((f) => f.endsWith('.md'));

  for (const filename of files) {
    const filePath = path.join(localeDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const postSlug = data.slug || filename.replace(/\.md$/, '');

    if (postSlug === slug) {
      const processedContent = await remark().use(html).process(content);

      return {
        slug: postSlug,
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || '',
        author: data.author || 'IAPME Suisse',
        content: processedContent.toString(),
      };
    }
  }

  return null;
}
