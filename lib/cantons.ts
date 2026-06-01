/**
 * Swiss cantons data for /cantons/<slug> SEO pages.
 * Covers French-speaking, German-speaking & Italian-speaking Switzerland.
 */

export type Canton = {
  slug: string;
  code: string;
  cities: string[];
  /** ~Number of SMEs in canton (rounded for SEO/social proof). */
  smeCount: string;
  language: 'fr' | 'de' | 'it';
  /** Sectors with strong AI ROI in this canton. */
  topSectors: string[];
  /** Cantonal funding shorthand. */
  funding: string;
  names: { fr: string; de: string; en: string; it: string };
};

export const CANTONS: Canton[] = [
  {
    slug: 'vaud',
    code: 'VD',
    cities: ['Lausanne', 'Yverdon-les-Bains', 'Montreux', 'Vevey', 'Nyon'],
    smeCount: '40 000+',
    language: 'fr',
    topSectors: ['EPFL & startups deep tech', 'Industrie de prÃ©cision', 'HÃ´tellerie Riviera', 'Viticulture', 'Services aux entreprises'],
    funding: 'FORJAD, OFP, Fondation pour l\'innovation Vaud',
    names: { fr: 'Vaud', de: 'Waadt', en: 'Vaud', it: 'Vaud' },
  },
  {
    slug: 'geneve',
    code: 'GE',
    cities: ['GenÃ¨ve', 'Carouge', 'Meyrin', 'Vernier', 'Lancy'],
    smeCount: '35 000+',
    language: 'fr',
    topSectors: ['Banque privÃ©e & finance', 'Organisations internationales', 'Horlogerie', 'Trading & nÃ©goce', 'Cabinets d\'avocats'],
    funding: 'Cheque annuel formation (CAF)',
    names: { fr: 'GenÃ¨ve', de: 'Genf', en: 'Geneva', it: 'Ginevra' },
  },
  {
    slug: 'fribourg',
    code: 'FR',
    cities: ['Fribourg', 'Bulle', 'Villars-sur-GlÃ¢ne', 'Marly'],
    smeCount: '18 000+',
    language: 'fr',
    topSectors: ['Industrie agroalimentaire', 'Ã‰nergie & cleantech', 'Construction', 'Services aux entreprises'],
    funding: 'Bons de formation cantonal Fribourg',
    names: { fr: 'Fribourg', de: 'Freiburg', en: 'Fribourg', it: 'Friburgo' },
  },
  {
    slug: 'valais',
    code: 'VS',
    cities: ['Sion', 'Martigny', 'Sierre', 'Monthey', 'Brig'],
    smeCount: '20 000+',
    language: 'fr',
    topSectors: ['Tourisme & hÃ´tellerie alpine', 'Viticulture', 'Ã‰nergie hydraulique', 'Industrie chimique', 'Construction de montagne'],
    funding: 'Service Formation Pro VS',
    names: { fr: 'Valais', de: 'Wallis', en: 'Valais', it: 'Vallese' },
  },
  {
    slug: 'neuchatel',
    code: 'NE',
    cities: ['NeuchÃ¢tel', 'La Chaux-de-Fonds', 'Le Locle'],
    smeCount: '12 000+',
    language: 'fr',
    topSectors: ['Microtechnique & horlogerie', 'MicroÃ©lectronique', 'Recherche appliquÃ©e', 'Industrie de prÃ©cision'],
    funding: 'RHNE â€” Aides Ã  la mobilitÃ© formation',
    names: { fr: 'NeuchÃ¢tel', de: 'Neuenburg', en: 'NeuchÃ¢tel', it: 'NeuchÃ¢tel' },
  },
  {
    slug: 'jura',
    code: 'JU',
    cities: ['DelÃ©mont', 'Porrentruy', 'SaignelÃ©gier'],
    smeCount: '6 000+',
    language: 'fr',
    topSectors: ['Microtechnique', 'Horlogerie', 'Industrie automobile sous-traitance', 'Agriculture'],
    funding: 'Bourses formation continue Jura',
    names: { fr: 'Jura', de: 'Jura', en: 'Jura', it: 'Giura' },
  },
  {
    slug: 'berne',
    code: 'BE',
    cities: ['Berne', 'Bienne', 'Thoune', 'KÃ¶niz'],
    smeCount: '50 000+',
    language: 'de',
    topSectors: ['Administration fÃ©dÃ©rale', 'Industrie de prÃ©cision Bienne', 'Ã‰nergie', 'Tourisme alpin', 'Communication'],
    funding: 'Bildungsgutschein Bern',
    names: { fr: 'Berne', de: 'Bern', en: 'Bern', it: 'Berna' },
  },
  {
    slug: 'zurich',
    code: 'ZH',
    cities: ['Zurich', 'Winterthur', 'Uster', 'Zug (proche)'],
    smeCount: '90 000+',
    language: 'de',
    topSectors: ['Banque & assurance', 'Tech & startups (ETH)', 'Industrie pharmaceutique', 'Logistique', 'Services B2B'],
    funding: 'Diverses FÃ¶rderprogramme Kanton ZH',
    names: { fr: 'Zurich', de: 'ZÃ¼rich', en: 'Zurich', it: 'Zurigo' },
  },
  {
    slug: 'tessin',
    code: 'TI',
    cities: ['Lugano', 'Bellinzona', 'Locarno', 'Mendrisio'],
    smeCount: '14 000+',
    language: 'it',
    topSectors: ['Finance Lugano', 'Tourisme & hÃ´tellerie', 'Mode & design', 'Industrie pharmaceutique Mendrisio', 'Logistique alpine'],
    funding: 'Aiuti cantonali formazione TI',
    names: { fr: 'Tessin', de: 'Tessin', en: 'Ticino', it: 'Ticino' },
  },
];

export function getCantonBySlug(slug: string): Canton | undefined {
  return CANTONS.find((c) => c.slug === slug);
}
