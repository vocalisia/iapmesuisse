import OpenAI from 'openai';
import { OPENAI_MODEL, SYSTEM_PROMPTS, LANG_NOTES } from './config';
import type { GeneratedArticle } from './article-generator';

const openai = new OpenAI();

interface TranslatedArticle {
  title: string;
  excerpt: string;
  content: string;
}

export async function translateArticle(
  article: GeneratedArticle,
  targetLocale: 'de' | 'en' | 'it'
): Promise<TranslatedArticle> {
  const langConfig = LANG_NOTES[targetLocale];

  const systemPrompt = SYSTEM_PROMPTS.translator
    .replace('{targetLang}', langConfig.targetLang)
    .replace('{langNote}', langConfig.langNote);

  const userPrompt = `Titre : ${article.title}
Extrait : ${article.excerpt}

Contenu :
${article.content}`;

  const response = await openai.chat.completions.create({
    model: OPENAI_MODEL,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.3,
    max_tokens: 4000,
  });

  const result = JSON.parse(response.choices[0].message.content || '{}');

  if (!result.title || !result.content) {
    throw new Error(`Translation to ${targetLocale} failed: missing title or content`);
  }

  console.log(`[Translator] Translated to ${targetLocale}: "${result.title}"`);

  return {
    title: result.title,
    excerpt: result.excerpt || result.title,
    content: result.content,
  };
}

export async function translateToAllLocales(
  article: GeneratedArticle
): Promise<Record<string, { title: string; excerpt: string; content: string }>> {
  const targetLocales: ('de' | 'en' | 'it')[] = ['de', 'en', 'it'];

  // Translate in parallel
  const translations = await Promise.all(
    targetLocales.map(async (locale) => {
      const translated = await translateArticle(article, locale);
      return { locale, ...translated };
    })
  );

  const result: Record<string, { title: string; excerpt: string; content: string }> = {
    fr: {
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
    },
  };

  for (const t of translations) {
    result[t.locale] = {
      title: t.title,
      excerpt: t.excerpt,
      content: t.content,
    };
  }

  return result;
}
