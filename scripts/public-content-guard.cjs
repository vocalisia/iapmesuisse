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
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  lines.forEach((line, index) => {
    for (const rule of forbidden) {
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
