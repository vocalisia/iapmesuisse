import OpenAI from 'openai';

function cleanApiKey(value: string | undefined): string | undefined {
  return value?.replace(/[\uFEFF\u200B-\u200D\u2060]/g, '').trim();
}

const apiKey = cleanApiKey(process.env.MAMMOUTH_API_KEY) || cleanApiKey(process.env.OPENAI_API_KEY);
if (!apiKey) {
  throw new Error('MAMMOUTH_API_KEY or OPENAI_API_KEY not configured');
}

export const aiClient = new OpenAI({
  apiKey,
  baseURL: 'https://api.mammouth.ai/v1',
});
