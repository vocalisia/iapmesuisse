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
    topSectors: ['EPFL & startups deep tech', 'Industrie de précision', 'Hôtellerie Riviera', 'Viticulture', 'Services aux entreprises'],
    funding: 'FORJAD, OFP, Fondation pour l\'innovation Vaud',
    names: { fr: 'Vaud', de: 'Waadt', en: 'Vaud', it: 'Vaud' },
  },
  {
    slug: 'geneve',
    code: 'GE',
    cities: ['Genève', 'Carouge', 'Meyrin', 'Vernier', 'Lancy'],
    smeCount: '35 000+',
    language: 'fr',
    topSectors: ['Banque privée & finance', 'Organisations internationales', 'Horlogerie', 'Trading & négoce', 'Cabinets d\'avocats'],
    funding: 'Chèque annuel formation (CAF) Genève',
    names: { fr: 'Genève', de: 'Genf', en: 'Geneva', it: 'Ginevra' },
  },
  {
    slug: 'fribourg',
    code: 'FR',
    cities: ['Fribourg', 'Bulle', 'Villars-sur-Glâne', 'Marly'],
    smeCount: '18 000+',
    language: 'fr',
    topSectors: ['Industrie agroalimentaire', 'Énergie & cleantech', 'Construction', 'Services aux entreprises'],
    funding: 'Bons de formation cantonal Fribourg',
    names: { fr: 'Fribourg', de: 'Freiburg', en: 'Fribourg', it: 'Friburgo' },
  },
  {
    slug: 'valais',
    code: 'VS',
    cities: ['Sion', 'Martigny', 'Sierre', 'Monthey', 'Brig'],
    smeCount: '20 000+',
    language: 'fr',
    topSectors: ['Tourisme & hôtellerie alpine', 'Viticulture', 'Énergie hydraulique', 'Industrie chimique', 'Construction de montagne'],
    funding: 'Service Formation Pro VS — subvention disponible',
    names: { fr: 'Valais', de: 'Wallis', en: 'Valais', it: 'Vallese' },
  },
  {
    slug: 'neuchatel',
    code: 'NE',
    cities: ['Neuchâtel', 'La Chaux-de-Fonds', 'Le Locle'],
    smeCount: '12 000+',
    language: 'fr',
    topSectors: ['Microtechnique & horlogerie', 'Microélectronique', 'Recherche appliquée', 'Industrie de précision'],
    funding: 'RHNE — Aides à la mobilité formation',
    names: { fr: 'Neuchâtel', de: 'Neuenburg', en: 'Neuchâtel', it: 'Neuchâtel' },
  },
  {
    slug: 'jura',
    code: 'JU',
    cities: ['Delémont', 'Porrentruy', 'Saignelégier'],
    smeCount: '6 000+',
    language: 'fr',
    topSectors: ['Microtechnique', 'Horlogerie', 'Industrie automobile sous-traitance', 'Agriculture'],
    funding: 'Bourses formation continue Jura',
    names: { fr: 'Jura', de: 'Jura', en: 'Jura', it: 'Giura' },
  },
  {
    slug: 'berne',
    code: 'BE',
    cities: ['Berne', 'Bienne', 'Thoune', 'Köniz'],
    smeCount: '50 000+',
    language: 'de',
    topSectors: ['Administration fédérale', 'Industrie de précision Bienne', 'Énergie', 'Tourisme alpin', 'Communication'],
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
    funding: 'Diverses Förderprogramme Kanton ZH',
    names: { fr: 'Zurich', de: 'Zürich', en: 'Zurich', it: 'Zurigo' },
  },
  {
    slug: 'tessin',
    code: 'TI',
    cities: ['Lugano', 'Bellinzona', 'Locarno', 'Mendrisio'],
    smeCount: '14 000+',
    language: 'it',
    topSectors: ['Finance Lugano', 'Tourisme & hôtellerie', 'Mode & design', 'Industrie pharmaceutique Mendrisio', 'Logistique alpine'],
    funding: 'Aiuti cantonali formazione TI',
    names: { fr: 'Tessin', de: 'Tessin', en: 'Ticino', it: 'Ticino' },
  },
];

export function getCantonBySlug(slug: string): Canton | undefined {
  return CANTONS.find((c) => c.slug === slug);
}
