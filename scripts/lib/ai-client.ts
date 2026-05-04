import OpenAI from 'openai';

const apiKey = process.env.MAMMOUTH_API_KEY;
if (!apiKey) {
  throw new Error('MAMMOUTH_API_KEY not configured');
}

export const aiClient = new OpenAI({
  apiKey,
  baseURL: 'https://api.mammouth.ai/v1',
});
