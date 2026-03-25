import fs from 'fs';
import path from 'path';
import { CONTENT_DIR } from './config';

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '')   // Remove special chars
    .replace(/\s+/g, '-')           // Spaces to hyphens
    .replace(/-+/g, '-')            // Collapse multiple hyphens
    .replace(/^-|-$/g, '')          // Trim hyphens
    .slice(0, 60);                  // Max length
}

export function ensureUniqueSlug(slug: string): string {
  const frDir = path.join(CONTENT_DIR, 'fr');
  if (!fs.existsSync(frDir)) return slug;

  const existing = fs.readdirSync(frDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));

  if (!existing.includes(slug)) return slug;

  // Append date suffix
  const dateSuffix = new Date().toISOString().slice(0, 10);
  const dated = `${slug}-${dateSuffix}`;
  if (!existing.includes(dated)) return dated;

  // Last resort: append random
  return `${dated}-${Math.random().toString(36).slice(2, 6)}`;
}
