import OpenAI from 'openai';

function cleanApiKey(value: string | undefined): string | undefined {
  return value?.replace(/[\uFEFF\u200B-\u200D\u2060]/g, '').trim();
}

const openaiApiKey = cleanApiKey(process.env.OPENAI_API_KEY);
const mammouthApiKey = cleanApiKey(process.env.MAMMOUTH_API_KEY);
const provider = process.env.AI_PROVIDER?.toLowerCase();

const useMammouth = provider === 'mammouth' || (!openaiApiKey && !!mammouthApiKey);
const apiKey = useMammouth ? mammouthApiKey : openaiApiKey;

if (!apiKey) {
  throw new Error('MAMMOUTH_API_KEY or OPENAI_API_KEY not configured');
}

export const aiClient = new OpenAI(
  useMammouth
    ? { apiKey, baseURL: 'https://api.mammouth.ai/v1' }
    : { apiKey }
);
