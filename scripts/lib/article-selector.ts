import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { OPENAI_MODEL_FAST, SYSTEM_PROMPTS, CONTENT_DIR } from './config';
import type { RSSItem } from './rss-fetcher';

const openai = new OpenAI();

export async function selectBestArticle(items: RSSItem[]): Promise<RSSItem | null> {
  if (items.length === 0) {
    console.log('[Selector] No RSS items to evaluate');
    return null;
  }

  // Get existing titles to avoid duplicates
  const frDir = path.join(CONTENT_DIR, 'fr');
  let existingTitles: string[] = [];
  if (fs.existsSync(frDir)) {
    const files = fs.readdirSync(frDir).filter((f) => f.endsWith('.md'));
    existingTitles = files.map((f) => {
      const content = fs.readFileSync(path.join(frDir, f), 'utf-8');
      const titleMatch = content.match(/^title:\s*"(.+)"/m);
      return titleMatch ? titleMatch[1].toLowerCase() : '';
    });
  }

  // Send top 15 items for evaluation
  const candidates = items.slice(0, 15);
  const itemList = candidates
    .map((item, i) => `[${i}] "${item.title}" (${item.source}) — ${item.description.slice(0, 150)}`)
    .join('\n');

  const existingList = existingTitles.length > 0
    ? `\n\nArticles déjà publiés (éviter les doublons) :\n${existingTitles.join('\n')}`
    : '';

  try {
    const response = await openai.chat.completions.create({
      model: OPENAI_MODEL_FAST,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPTS.selector },
        { role: 'user', content: `Articles RSS à évaluer :\n${itemList}${existingList}` },
      ],
      temperature: 0.3,
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    const selections = result.selections || [];

    if (selections.length === 0) {
      console.log('[Selector] No suitable articles found');
      return null;
    }

    const best = selections[0];
    const selected = candidates[best.index];
    console.log(`[Selector] Selected: "${selected.title}" (score: ${best.score}/10) — ${best.reason}`);
    return selected;
  } catch (err) {
    console.error('[Selector] OpenAI error:', (err as Error).message);
    // Fallback: return the first item
    return candidates[0];
  }
}
