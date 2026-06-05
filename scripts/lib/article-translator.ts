import { OPENAI_MODEL, SYSTEM_PROMPTS, LANG_NOTES } from './config';
import type { GeneratedArticle } from './article-generator';
import { aiClient } from './ai-client';

interface TranslatedArticle {
  title: string;
  excerpt: string;
  content: string;
}

async function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer!);
  }
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

  const response = await withTimeout(
    aiClient.chat.completions.create({
      model: OPENAI_MODEL,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
      max_tokens: 4000,
    }),
    45000,
    `Translation ${targetLocale}`
  );

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

  const result: Record<string, { title: string; excerpt: string; content: string }> = {
    fr: {
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
    },
  };

  for (const locale of targetLocales) {
    try {
      const translated = await translateArticle(article, locale);
      result[locale] = {
        title: translated.title,
        excerpt: translated.excerpt,
        content: translated.content,
      };
    } catch (err) {
      console.warn(`[Translator] Skipping ${locale}: ${(err as Error).message}`);
    }
  }

  return result;
}
