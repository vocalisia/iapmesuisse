type Locale = 'fr' | 'de' | 'en' | 'it' | string;

const scopeByLocale: Record<string, string> = {
  fr: 'cadrage personnalisé',
  de: 'individueller Projektumfang',
  en: 'custom project scope',
  it: 'perimetro personalizzato',
};

const mixedAccessByLocale: Record<string, string> = {
  fr: 'mode mixte',
  de: 'gemischter Zugang',
  en: 'mixed access',
  it: 'accesso misto',
};

const mojibakeFixes: Array<[RegExp, string]> = [
  [/â|â€™/g, "'"],
  [/â|â€˜/g, "'"],
  [/â|â€œ/g, '"'],
  [/â|â€|â€ž/g, '"'],
  [/â|â€“/g, '-'],
  [/â|â€”/g, '-'],
  [/â¦|â€¦/g, '...'],
  [/â¢/g, '•'],
  [/â|â†’/g, '→'],
  [/â|â†/g, '←'],
  [/â/g, '✓'],
  [/â/g, '✓'],
  [/â/g, '×'],
  [/â¬|â‚¬/g, '€'],
  [/Â£/g, '£'],
  [/Ã©/g, 'é'],
  [/Ã¨/g, 'è'],
  [/Ãª/g, 'ê'],
  [/Ã«/g, 'ë'],
  [/Ã /g, 'à'],
  [/Ã¡/g, 'á'],
  [/Ã¢/g, 'â'],
  [/Ã¤/g, 'ä'],
  [/Ã£/g, 'ã'],
  [/Ã§/g, 'ç'],
  [/Ã´/g, 'ô'],
  [/Ã¶/g, 'ö'],
  [/Ã²/g, 'ò'],
  [/Ã³/g, 'ó'],
  [/Ã¹/g, 'ù'],
  [/Ãº/g, 'ú'],
  [/Ã»/g, 'û'],
  [/Ã¼/g, 'ü'],
  [/Ã®/g, 'î'],
  [/Ã¯/g, 'ï'],
  [/Ã­/g, 'í'],
  [/Ã‰/g, 'É'],
  [/Ãˆ/g, 'È'],
  [/ÃŠ/g, 'Ê'],
  [/Ã‡/g, 'Ç'],
  [/Ã–/g, 'Ö'],
  [/Ãœ/g, 'Ü'],
  [/Ã„/g, 'Ä'],
  [/ÃŸ/g, 'ß'],
  [/Ã—/g, '×'],
  [/Â·/g, '·'],
  [/Â©/g, '©'],
  [/Â®/g, '®'],
  [/Â/g, ''],
];

function scope(locale?: Locale) {
  return scopeByLocale[String(locale || 'fr')] || scopeByLocale.fr;
}

function mixedAccess(locale?: Locale) {
  return mixedAccessByLocale[String(locale || 'fr')] || mixedAccessByLocale.fr;
}

export function normalizeMojibake(value: string) {
  return mojibakeFixes.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value);
}

export function sanitizePublicText(value: string, locale?: Locale) {
  const scoped = scope(locale);

  return normalizeMojibake(value)
    .replace(/\bROI\s+(?:CHF|EUR|USD|GBP)\b/gi, 'ROI')
    .replace(/\bbudget\s+(?:CHF|EUR|USD|GBP)\b/gi, scoped)
    .replace(/\b(?:CHF|EUR|USD|GBP)\s*[\d'’.,]+(?:\s*(?:k|K|M|mio|Mia|million|millions|milliard|milliards|bn))?(?:\s*\/\s*(?:mois|month|jour|day|an|year|anno|mese))?/gi, scoped)
    .replace(/\b[\d'’.,]+(?:\s*(?:k|K|M|mio|Mia|million|millions|milliard|milliards|bn))?\s*(?:CHF|EUR|USD|GBP|francs?|euros?|dollars?|pounds?)(?:\s*\/\s*(?:mois|month|jour|day|an|year|anno|mese))?/gi, scoped)
    .replace(/[€$£]\s*[\d'’.,]+(?:\s*(?:k|K|M|mio|Mia|million|millions|milliard|milliards|bn))?/g, scoped)
    .replace(/\b[\d'’.,]+(?:\s*(?:k|K|M|mio|Mia|million|millions|milliard|milliards|bn))?\s*[€$£]/g, scoped)
    .replace(/\b(?:CHF|EUR|USD|GBP)\b/gi, scoped)
    .replace(/[€$£]/g, '')
    .replace(/\b(?:à partir de|a partir de|from|starts at|ab|da)\s+[^.,;\n)]+/gi, scoped)
    .replace(/\b(?:tarifs?|prix|pricing|prices?|preise|kosten|costi|tariffe)\b/gi, scoped)
    .replace(/\bfreemium\b/gi, mixedAccess(locale))
    .replace(/\b(?:combien coûte|combien coute|how much does|what does .* cost|was kostet|quanto costa)\b/gi, 'comment cadrer')
    .replace(/\b(?:sur devis|quote within 24h|custom quote|offerte in 24h|preventivo in 24h)\b/gi, scoped)
    .replace(/\bplusieurs\s+milliers\s+de\s+francs?\b/gi, scoped)
    .replace(/\bquelques\s+francs?\b/gi, scoped)
    .replace(/\bseveral\s+thousand\s+francs?\b/gi, scoped)
    .replace(/\bfew\s+francs?\b/gi, scoped)
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export function sanitizePublicHtml(html: string, locale?: Locale) {
  return html
    .split(/(<[^>]+>)/g)
    .map((part) => (part.startsWith('<') ? part : sanitizePublicText(part, locale)))
    .join('');
}
