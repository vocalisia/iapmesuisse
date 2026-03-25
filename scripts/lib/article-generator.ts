import OpenAI from 'openai';
import { OPENAI_MODEL, SYSTEM_PROMPTS } from './config';
import type { RSSItem } from './rss-fetcher';

const openai = new OpenAI();

export interface GeneratedArticle {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
}

export async function generateArticle(item: RSSItem): Promise<GeneratedArticle> {
  const userPrompt = `Sujet source :
Titre : "${item.title}"
Source : ${item.source}
Description : ${item.description}
Lien : ${item.link}
Date : ${item.pubDate}

Rédige un article ORIGINAL pour les PME suisses basé sur ce sujet.`;

  const response = await openai.chat.completions.create({
    model: OPENAI_MODEL,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: SYSTEM_PROMPTS.generator },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 4000,
  });

  const result = JSON.parse(response.choices[0].message.content || '{}');

  // Validate
  if (!result.title || !result.content) {
    throw new Error('Generated article missing title or content');
  }

  const wordCount = result.content.split(/\s+/).length;
  if (wordCount < 300) {
    throw new Error(`Article too short: ${wordCount} words (minimum 300)`);
  }

  console.log(`[Generator] Created article: "${result.title}" (${wordCount} words)`);

  return {
    title: result.title,
    excerpt: result.excerpt || result.title,
    content: result.content,
    slug: result.slug || 'article',
  };
}
