import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/markdown';
import { CANTONS } from '@/lib/cantons';
import { VILLES } from '@/lib/villes';
import { isPublicPricingSlug } from '@/lib/structured-data';

const locales = ['fr', 'de', 'en', 'it'];
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://iapmesuisse.ch';
type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

const excludedBlogSlugsByLocale: Record<string, Set<string>> = {
  de: new Set(['formation-ia-pme-suisse', 'ia-pme-valais-sion']),
  en: new Set(['formation-ia-pme-suisse', 'ia-pme-valais-sion']),
  it: new Set(['formation-ia-pme-suisse', 'ia-pme-valais-sion']),
};

const highIntentPages = new Set([
  '',
  '/services',
  '/services/generation-leads',
  '/services/marketing-ia',
  '/services/prise-de-rdv',
  '/formation-ia-pme',
  '/automatisation-ia-pme-suisse',
  '/agence-ia-suisse',
  '/ki-beratung-kmu-schweiz',
  '/chatbot-ia-entreprise-suisse',
  '/consulting',
  '/outils-ia',
  '/quiz/maturite-ia',
]);

const lowIntentPages = new Set([
  '/mentions-legales',
  '/politique-confidentialite',
  '/cgv',
  '/jeux-ia',
  '/jeux-ia/devine-ia',
  '/jeux-ia/prompt-master',
]);

const gscOpportunityBlogSlugs = new Set([
  'strategie-ia-pme-suisse-2026',
  'agence-ia-pme-suisse-comparatif',
  'formation-ia-pme-suisse',
  'ai-training-workshop-swiss-companies-2026',
  'outils-ia-ecosysteme-pme-suisse-2026',
  'outils-ia-pme-suisses',
  'ai-tools-fuer-kmu-schweiz-vergleich-2026',
  'ai-competitive-advantage-swiss-sme-2026',
  'transformation-digitale-ia-pme-romandes-etudes-cas-strategies-2026',
  'ai-consultant-lugano-ticino-guide-2026',
  'ia-assurance-courtage-suisse-guide-2026',
  'ai-consulting-sme-switzerland-guide-2026',
  'process-automation-sme-switzerland-2026',
  'automatisation-service-client-ia-suisse',
  'automatisation-processus-ia-guide-pratique-pme-suisses',
  'etudes-cas-pme-romandes-ia',
  'ki-beratung-kmu-schweiz-leitfaden-2026',
  'prozessautomatisierung-kmu-schweiz-guide-2026',
  'ki-marketing-beratung-kmu-schweiz-2026',
  'ki-workshop-schulung-unternehmen-schweiz-2026',
  'consulente-ia-lugano-ticino-guida-2026',
  'consulenza-ia-pmi-svizzera-guida-2026',
]);

function getPageChangeFrequency(page: string): ChangeFrequency {
  if (page === '' || page === '/blog') return 'weekly';
  if (highIntentPages.has(page)) return 'weekly';
  if (lowIntentPages.has(page)) return 'yearly';
  return 'monthly';
}

function getPagePriority(page: string) {
  if (page === '') return 1;
  if (highIntentPages.has(page)) return 0.95;
  if (page === '/blog') return 0.9;
  if (lowIntentPages.has(page)) return 0.35;
  if (page.startsWith('/ressources')) return 0.75;
  return 0.8;
}

function getBlogChangeFrequency(slug: string): ChangeFrequency {
  return gscOpportunityBlogSlugs.has(slug) ? 'weekly' : 'monthly';
}

function getBlogPriority(slug: string) {
  return gscOpportunityBlogSlugs.has(slug) ? 0.78 : 0.6;
}

const pages = [
  '',
  '/services',
  '/services/generation-leads',
  '/services/marketing-ia',
  '/services/prise-de-rdv',
  '/a-propos',
  '/blog',
  '/contact',
  '/cantons',
  '/villes',
  '/ressources',
  '/ressources/checklist-nlpd-ai-act',
  '/mentions-legales',
  '/politique-confidentialite',
  '/cgv',
  '/formation-ia-pme',
  '/automatisation-ia-pme-suisse',
  '/agence-ia-suisse',
  '/ki-beratung-kmu-schweiz',
  '/chatbot-ia-entreprise-suisse',
  '/consulting',
  '/newsletter',
  '/evenements-ia',
  '/outils-ia',
  '/temoignages',
  '/faq',
  '/partenaires',
  '/jeux-ia',
  '/jeux-ia/devine-ia',
  '/jeux-ia/prompt-master',
  '/quiz/maturite-ia',
  '/quiz/quel-outil-ia',
  '/quiz/test-connaissances',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const lastModified = new Date();

  for (const page of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified,
        changeFrequency: getPageChangeFrequency(page),
        priority: getPagePriority(page),
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page}`])
          ),
        },
      });
    }
  }

  // Build per-locale slug sets to avoid declaring phantom URLs in sitemap.
  const localeSlugs: Record<string, Set<string>> = {};
  for (const locale of locales) {
    localeSlugs[locale] = new Set(
      getBlogPosts(locale)
        .map((p) => p.slug)
        .filter((slug) => !excludedBlogSlugsByLocale[locale]?.has(slug))
        .filter((slug) => !isPublicPricingSlug(slug))
    );
  }

  // Canton pages (9 cantons × 4 locales)
  for (const canton of CANTONS) {
    for (const locale of locales) {
      const isGscCantonOpportunity = canton.slug === 'zurich' && locale === 'de';
      entries.push({
        url: `${baseUrl}/${locale}/cantons/${canton.slug}`,
        lastModified,
        changeFrequency: isGscCantonOpportunity ? 'weekly' : 'monthly',
        priority: isGscCantonOpportunity ? 0.82 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/cantons/${canton.slug}`])
          ),
        },
      });
    }
  }

  // City pages (5 cities × 4 locales)
  for (const ville of VILLES) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/villes/${ville.slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.75,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/villes/${ville.slug}`])
          ),
        },
      });
    }
  }

  for (const locale of locales) {
    for (const slug of localeSlugs[locale]) {
      // Only declare hreflang alternates for locales where the article actually exists.
      const availableLanguages = locales.filter((l) => localeSlugs[l].has(slug));
      entries.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified,
        changeFrequency: getBlogChangeFrequency(slug),
        priority: getBlogPriority(slug),
        alternates: {
          languages: Object.fromEntries(
            availableLanguages.map((l) => [l, `${baseUrl}/${l}/blog/${slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
