const fs = require('fs');
const path = require('path');

const root = process.cwd();
const markdownRenderer = fs.readFileSync(path.join(root, 'lib', 'markdown.ts'), 'utf8');
const packageManifest = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const schemaScanTargets = [
  path.join(root, 'app'),
  path.join(root, 'components'),
  path.join(root, 'lib'),
];

const schemaForbidden = [
  { name: 'json-ld price range field', pattern: /\b(?:priceRange|lowPrice|highPrice)\b/ },
  { name: 'json-ld explicit price currency', pattern: /\bpriceCurrency\b\s*:\s*['"`][A-Z]{3}['"`]/ },
];

const requiredOfferText = {
  'messages/fr.json': [
    '97 CHF',
    '297 CHF',
    '997 CHF',
    '2500 CHF',
    '3500 CHF',
    "1'497 CHF",
    'https://buy.stripe.com/aFabJ03YS5AQ2SwfS6co00F',
    'https://buy.stripe.com/dRm3cugLEaVa64I6hwco00M',
  ],
  'messages/de.json': ['97 CHF', '297 CHF', '997 CHF', '2500 CHF', '3500 CHF'],
  'messages/en.json': ['97 CHF', '297 CHF', '997 CHF', '2500 CHF', '3500 CHF'],
  'messages/it.json': ['97 CHF', '297 CHF', '997 CHF', '2500 CHF', '3500 CHF'],
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
      if (!['node_modules', '.next', 'out', 'dist', 'build'].includes(entry)) {
        files.push(...listFiles(full));
      }
    } else if (/\.(tsx?|jsx?|mdx?)$/i.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

const failures = [];

if (packageManifest.dependencies?.['remark-gfm'] === undefined || !/\.use\(gfm\)/.test(markdownRenderer)) {
  failures.push('markdown tables must be rendered through remark-gfm; raw pipe tables are not publishable');
}

for (const file of schemaScanTargets.flatMap(listFiles)) {
  const rel = path.relative(root, file);
  const normalizedRel = rel.split(path.sep).join('/');
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  lines.forEach((line, index) => {
    for (const rule of schemaForbidden) {
      if (rule.pattern.test(line)) {
        failures.push(`${rel}:${index + 1} ${rule.name}: ${line.trim().slice(0, 180)}`);
      }
    }
  });
}

for (const [rel, requiredValues] of Object.entries(requiredOfferText)) {
  const full = path.join(root, rel);
  const text = fs.existsSync(full) ? fs.readFileSync(full, 'utf8') : '';
  for (const value of requiredValues) {
    if (!text.includes(value)) {
      failures.push(`${rel} missing required existing offer value: ${value}`);
    }
  }
}


if (failures.length > 0) {
  console.error('Public content guard failed. Preserve existing IAPME offers and keep schema pricing clean:\n');
  console.error(failures.slice(0, 80).join('\n'));
  if (failures.length > 80) console.error(`...and ${failures.length - 80} more`);
  process.exit(1);
}

console.log('OK public-content-guard: existing IAPME prices/Stripe preserved; schema pricing clean.');
