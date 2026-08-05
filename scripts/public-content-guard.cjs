const fs = require('fs');
const path = require('path');

const root = process.cwd();
const scanTargets = [
  path.join(root, 'app'),
  path.join(root, 'components'),
  path.join(root, 'messages'),
  path.join(root, 'lib', 'cantons.ts'),
];

const forbidden = [
  { name: 'currency code', pattern: /\b(?:CHF|EUR|USD|GBP)\b/i },
  { name: 'currency symbol', pattern: /[€£]/ },
  { name: 'json-ld price field', pattern: /\b(?:priceRange|lowPrice|highPrice)\b/ },
  { name: 'bad public sanitizer text', pattern: /condition personnalis(?:e|é)e?/i },
  { name: 'cost question', pattern: /(?:Combien coûte|Combien coute|How much does[^?]+cost|Was kostet|Quanto costa)/i },
  { name: 'starts-at pricing', pattern: /(?:à partir de|a partir de|starts at)\s+\d/i },
];

const commonPriceLines = [
  '"price": "97 CHF",',
  '"price": "297 CHF",',
  '"price": "997 CHF",',
  '"price": "2500 CHF",',
  '"price": "3500 CHF",',
];

// These exact lines predate the public-pricing guard and are intentional.
// Keeping an exact allowlist prevents future prices from bypassing the guard.
const allowedExistingCommercialLines = {
  'messages/fr.json': new Set([
    ...commonPriceLines,
    '"price": "1\'497 CHF",',
    '"pricing_text": "Les tarifs sont communiqués sur devis. Les prix s\'entendent en CHF hors TVA. Paiement dû sous 30 jours.",',
    '"vat_note": "Prix en CHF, hors TVA",',
    '"question": "Combien coûte l\'intégration de l\'IA ?",',
    '"question": "Combien coûte un projet IA pour PME ?",',
    '"answer": "Les coûts varient : de gratuit (outils de base) à quelques milliers de francs (intégration sur mesure). Notre audit express à 297 CHF vous donne une estimation précise du ROI.",',
  ]),
  'messages/de.json': new Set([
    ...commonPriceLines,
    '"price": "1\'497 CHF",',
    '"pricing_text": "Die Preise werden auf Anfrage mitgeteilt. Die Preise verstehen sich in CHF exkl. MwSt. Zahlungsfrist: 30 Tage.",',
    '"vat_note": "Preise in CHF, exkl. MwSt.",',
    '"question": "Was kostet die Integration von KI?",',
    '"question": "Was kostet ein KI-Projekt für KMU?",',
    '"answer": "Die Kosten variieren: von kostenlos (Basistools) bis zu einigen tausend Franken (massgeschneiderte Integration). Unser Express-Audit für 297 CHF liefert Ihnen eine präzise ROI-Schätzung.",',
  ]),
  'messages/en.json': new Set([
    ...commonPriceLines,
    '"price": "1,497 CHF",',
    '"pricing_text": "Prices are provided on request. Prices are in CHF excluding VAT. Payment is due within 30 days.",',
    '"vat_note": "Prices in CHF, excl. VAT",',
    '"question": "How much does AI integration cost?",',
    '"question": "How much does an AI project for an SME cost?",',
    '"answer": "Costs range from free (basic tools) to several thousand francs (bespoke integration). Our express audit at 297 CHF provides a precise ROI estimate.",',
  ]),
  'messages/it.json': new Set([
    ...commonPriceLines,
    '"price": "1\'497 CHF",',
    '"pricing_text": "Le tariffe sono comunicate su richiesta. I prezzi si intendono in CHF IVA esclusa. Pagamento entro 30 giorni.",',
    '"vat_note": "Prezzi in CHF, IVA esclusa",',
    '"question": "Quanto costa l\'integrazione dell\'IA?",',
    '"question": "Quanto costa un progetto IA per PMI?",',
    '"answer": "I costi variano: da gratuito (strumenti base) a qualche migliaio di franchi (integrazione su misura). Il nostro audit express a 297 CHF vi fornisce una stima precisa del ROI.",',
  ]),
};

function listFiles(target) {
  if (!fs.existsSync(target)) return [];
  const stat = fs.statSync(target);
  if (stat.isFile()) return [target];

  const files = [];
  for (const entry of fs.readdirSync(target)) {
    const full = path.join(target, entry);
    const entryStat = fs.statSync(full);
    if (entryStat.isDirectory()) {
      files.push(...listFiles(full));
    } else if (/\.(tsx?|json|mdx?)$/i.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

const files = scanTargets.flatMap(listFiles);
const failures = [];

for (const file of files) {
  const rel = path.relative(root, file);
  const normalizedRel = rel.split(path.sep).join('/');
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  lines.forEach((line, index) => {
    for (const rule of forbidden) {
      const isAllowedExistingCommercialLine =
        (rule.name === 'currency code' || rule.name === 'cost question') &&
        allowedExistingCommercialLines[normalizedRel]?.has(line.trim());
      if (isAllowedExistingCommercialLine) continue;

      if (rule.pattern.test(line)) {
        failures.push(`${rel}:${index + 1} ${rule.name}: ${line.trim().slice(0, 180)}`);
      }
    }
  });
}

if (failures.length > 0) {
  console.error('Public content guard failed. Remove public pricing/currency before build:\n');
  console.error(failures.slice(0, 80).join('\n'));
  if (failures.length > 80) console.error(`...and ${failures.length - 80} more`);
  process.exit(1);
}

console.log('OK public-content-guard: no public pricing/currency detected.');
