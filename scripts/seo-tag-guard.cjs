#!/usr/bin/env node
/**
 * SEO Tag Guard — bloque le build Vercel si une balise critique
 * a été retirée ou modifiée dans les templates.
 *
 * Usage dans chaque repo Next.js :
 *   1. Copier ce fichier dans `scripts/seo-tag-guard.cjs`
 *   2. Ajouter dans `package.json` :
 *        "scripts": { "prebuild": "node scripts/seo-tag-guard.cjs" }
 *   3. Vercel exécute prebuild AVANT next build → exit 1 si violation → no deploy
 *
 * Variables d'environnement (optionnelles) :
 *   SEO_GUARD_DISABLE=1  → skip le guard (pour debug local)
 *   SEO_GUARD_GA4=1      → exiger gtag.js + consent mode dans layout
 *
 * © vocalisia · sans dépendances · CommonJS (compatible Vercel Node 22)
 */

"use strict";

const fs = require("fs");
const path = require("path");

if (process.env.SEO_GUARD_DISABLE === "1") {
  console.log("⚠ seo-tag-guard: désactivé via SEO_GUARD_DISABLE=1");
  process.exit(0);
}

// Fichiers candidats pour le layout principal. Le premier trouvé est scanné.
const LAYOUT_CANDIDATES = [
  "app/layout.tsx",
  "src/app/layout.tsx",
  "src/app/[locale]/layout.tsx",
  "app/[locale]/layout.tsx",
];

// Règles : { code, severity, mode: "require"|"forbid", pattern, msg, fix }
const RULES = [
  // ─────────── SEO baseline ───────────
  {
    code: "metadataBase_present",
    severity: "high",
    mode: "require",
    pattern: /metadataBase\s*:/,
    msg: "metadataBase manquant dans Metadata — og:image/canonical relatifs cassés.",
    fix: "Ajouter `metadataBase: new URL('https://yoursite.com')` dans la Metadata du layout.",
  },
  {
    code: "no_inverted_ga4_consent",
    severity: "critical",
    mode: "forbid",
    pattern: /rejected\s*\?\s*['"`]granted['"`]\s*:\s*['"`]denied['"`]/,
    msg: "Logique GA4 consent INVERSÉE détectée (`rejected ? granted : denied`) — tracking activé sur refus EU.",
    fix: "Inverser le ternaire : utiliser `accepted ? 'granted' : 'denied'`.",
  },
  {
    code: "no_optout_ga4_consent",
    severity: "critical",
    mode: "forbid",
    pattern: /rejected\s*\?\s*['"`]denied['"`]\s*:\s*['"`]granted['"`]/,
    msg: "Logique GA4 consent OPT-OUT détectée (`rejected ? denied : granted`) — tracking activé par défaut, viole RGPD opt-in EU.",
    fix: "Utiliser `accepted ? 'granted' : 'denied'` — denied par défaut, granted uniquement si user accepte explicitement.",
  },
  {
    code: "no_raw_gtag_script_src",
    severity: "critical",
    mode: "forbid",
    pattern: /<script\s[^>]*async[^>]*src=["'][^"']*googletagmanager\.com[^"']*["']/,
    msg: "DANGER : <script async src='gtag.js'> en JSX — Next.js hoist cet élément AVANT les scripts inline, cassant l'ordre consent-first RGPD.",
    fix: "Remplacer par un createElement dynamique DANS le script consent inline : `(function(){var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=G-XXX';document.head.appendChild(s);})()`",
  },
  {
    code: "no_hardcoded_noindex",
    severity: "critical",
    mode: "forbid",
    pattern: /name=["']robots["'][^>]*content=["'][^"']*noindex/i,
    msg: "noindex hardcodé dans le layout — bloque tout le site des SERPs.",
    fix: "Retirer le meta robots noindex du layout. Utiliser robots.ts par route si besoin.",
  },
  {
    code: "html_lang_present",
    severity: "high",
    mode: "require",
    pattern: /<html[^>]*\slang\s*=/,
    msg: "Attribut <html lang> manquant — accessibilité + hreflang cassés.",
    fix: "Ajouter `<html lang=\"fr\">` (ou la langue de défaut du site).",
  },
];

// Règles spécifiques GA4 (opt-in via SEO_GUARD_GA4=1, car GA4 souvent dans une page séparée)
const GA4_RULES = [
  {
    code: "gtag_js_present",
    severity: "high",
    mode: "require",
    pattern: /googletagmanager\.com\/gtag\/js/,
    msg: "gtag.js absent du layout — pas de tracking GA4.",
    fix: "Ajouter `<Script src='https://www.googletagmanager.com/gtag/js?id=G-XXX' />` dans le layout.",
  },
  {
    code: "consent_default_present",
    severity: "critical",
    mode: "require",
    pattern: /gtag\s*\(\s*['"`]consent['"`]\s*,\s*['"`]default['"`]/,
    msg: "GA4 consent mode default absent — viole RGPD EU.",
    fix: "Ajouter `gtag('consent', 'default', { analytics_storage: 'denied', ... })` AVANT gtag('config').",
  },
];

function findLayoutFile(root) {
  // Return the most specific layout found (prefer [locale] over root for i18n projects)
  const found = LAYOUT_CANDIDATES
    .map((rel) => ({ rel, abs: path.join(root, rel) }))
    .filter(({ abs }) => fs.existsSync(abs));
  if (found.length === 0) return null;
  // Merge all layout contents so rules pass if ANY layout satisfies them
  const merged = found.map(({ abs }) => fs.readFileSync(abs, "utf8")).join("\n");
  const primary = found[found.length - 1]; // most specific candidate wins for display
  return { rel: found.map((f) => f.rel).join(" + "), abs: primary.abs, merged };
}

function checkRules(content, rules, sourceFile) {
  // For "forbid" rules, strip template literal contents to avoid false positives
  // on dynamic script content inside dangerouslySetInnerHTML strings.
  const strippedContent = content.replace(/`[^`]*`/gs, "``");
  const violations = [];
  for (const rule of rules) {
    const scanTarget = rule.mode === "forbid" ? strippedContent : content;
    const matches = rule.pattern.test(scanTarget);
    if (rule.mode === "require" && !matches) {
      violations.push({ ...rule, file: sourceFile });
    } else if (rule.mode === "forbid" && matches) {
      violations.push({ ...rule, file: sourceFile });
    }
  }
  return violations;
}

function main() {
  const root = process.cwd();
  console.log(`🩺 seo-tag-guard scanning ${root}`);

  const layout = findLayoutFile(root);
  if (!layout) {
    console.error(
      `✗ seo-tag-guard: aucun fichier layout trouvé parmi ${LAYOUT_CANDIDATES.join(", ")}`
    );
    // Pas de layout = pas une app Next.js standard → skip (don't break unrelated repos)
    process.exit(0);
  }

  const layoutContent = layout.merged || fs.readFileSync(layout.abs, "utf8");

  let allRules = RULES;
  if (process.env.SEO_GUARD_GA4 === "1") {
    allRules = [...RULES, ...GA4_RULES];
  }

  const violations = checkRules(layoutContent, allRules, layout.rel);

  const critical = violations.filter((v) => v.severity === "critical");
  const high = violations.filter((v) => v.severity === "high");

  if (violations.length === 0) {
    console.log(`✓ seo-tag-guard: layout ${layout.rel} pass (${allRules.length} rules)`);
    process.exit(0);
  }

  console.error("");
  console.error("=".repeat(70));
  console.error(`✗ seo-tag-guard BLOCK : ${critical.length} critical + ${high.length} high`);
  console.error("=".repeat(70));
  for (const v of violations) {
    console.error(`  [${v.severity.toUpperCase()}] ${v.code} (${v.file})`);
    console.error(`     ${v.msg}`);
    console.error(`     fix: ${v.fix}`);
    console.error("");
  }
  console.error("=".repeat(70));
  console.error("Pour bypass (à tes risques): SEO_GUARD_DISABLE=1 npm run build");
  console.error("=".repeat(70));

  // Bloque le build uniquement si critical détecté.
  // high = warn mais n'arrête pas (sinon trop strict).
  process.exit(critical.length > 0 ? 1 : 0);
}

main();
