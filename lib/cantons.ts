/**
 * Swiss cantons data for /cantons/<slug> SEO pages.
 * Covers French-speaking, German-speaking and Italian-speaking Switzerland.
 */

export type Canton = {
  slug: string;
  code: string;
  cities: string[];
  /** Approximate number of SMEs in canton, rounded for SEO/social proof. */
  smeCount: string;
  language: 'fr' | 'de' | 'it';
  /** Sectors with strong AI use cases in this canton. */
  topSectors: string[];
  /** Cantonal funding shorthand without public amounts. */
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
    topSectors: ['EPFL et startups deep tech', 'Industrie de précision', 'Hôtellerie Riviera', 'Viticulture', 'Services aux entreprises'],
    funding: "FORJAD, OFP et Fondation pour l'innovation Vaud, conditions selon dossier",
    names: { fr: 'Vaud', de: 'Waadt', en: 'Vaud', it: 'Vaud' },
  },
  {
    slug: 'geneve',
    code: 'GE',
    cities: ['Genève', 'Carouge', 'Meyrin', 'Vernier', 'Lancy'],
    smeCount: '35 000+',
    language: 'fr',
    topSectors: ['Banque privée et finance', 'Organisations internationales', 'Horlogerie', 'Trading et négoce', "Cabinets d'avocats"],
    funding: 'Chèque annuel formation, conditions selon dossier',
    names: { fr: 'Genève', de: 'Genf', en: 'Geneva', it: 'Ginevra' },
  },
  {
    slug: 'fribourg',
    code: 'FR',
    cities: ['Fribourg', 'Bulle', 'Villars-sur-Glâne', 'Marly'],
    smeCount: '18 000+',
    language: 'fr',
    topSectors: ['Industrie agroalimentaire', 'Énergie et cleantech', 'Construction', 'Services aux entreprises'],
    funding: 'Bons de formation cantonaux, conditions selon dossier',
    names: { fr: 'Fribourg', de: 'Freiburg', en: 'Fribourg', it: 'Friburgo' },
  },
  {
    slug: 'valais',
    code: 'VS',
    cities: ['Sion', 'Martigny', 'Sierre', 'Monthey', 'Brig'],
    smeCount: '20 000+',
    language: 'fr',
    topSectors: ['Tourisme et hôtellerie alpine', 'Viticulture', 'Énergie hydraulique', 'Industrie chimique', 'Construction de montagne'],
    funding: 'Service Formation Pro VS, accompagnement selon dossier',
    names: { fr: 'Valais', de: 'Wallis', en: 'Valais', it: 'Vallese' },
  },
  {
    slug: 'neuchatel',
    code: 'NE',
    cities: ['Neuchâtel', 'La Chaux-de-Fonds', 'Le Locle'],
    smeCount: '12 000+',
    language: 'fr',
    topSectors: ['Microtechnique et horlogerie', 'Microélectronique', 'Recherche appliquée', 'Industrie de précision'],
    funding: 'RHNE, aides à la mobilité formation selon dossier',
    names: { fr: 'Neuchâtel', de: 'Neuenburg', en: 'Neuchâtel', it: 'Neuchâtel' },
  },
  {
    slug: 'jura',
    code: 'JU',
    cities: ['Delémont', 'Porrentruy', 'Saignelégier'],
    smeCount: '6 000+',
    language: 'fr',
    topSectors: ['Microtechnique', 'Horlogerie', 'Industrie automobile sous-traitance', 'Agriculture'],
    funding: 'Bourses formation continue Jura, conditions selon dossier',
    names: { fr: 'Jura', de: 'Jura', en: 'Jura', it: 'Giura' },
  },
  {
    slug: 'berne',
    code: 'BE',
    cities: ['Berne', 'Bienne', 'Thoune', 'Köniz'],
    smeCount: '50 000+',
    language: 'de',
    topSectors: ['Administration fédérale', 'Industrie de précision Bienne', 'Énergie', 'Tourisme alpin', 'Communication'],
    funding: 'Bildungsgutschein Bern, Bedingungen nach Dossier',
    names: { fr: 'Berne', de: 'Bern', en: 'Bern', it: 'Berna' },
  },
  {
    slug: 'zurich',
    code: 'ZH',
    cities: ['Zurich', 'Winterthur', 'Uster', 'Zug (proche)'],
    smeCount: '90 000+',
    language: 'de',
    topSectors: ['Banken und Versicherungen', 'ETH-Startups und Software', 'Life Sciences und Pharma', 'Logistik und Handel', 'B2B-Services'],
    funding: 'Zürcher Innovations- und Digitalisierungsprogramme, Bedingungen nach Dossier',
    names: { fr: 'Zurich', de: 'Zürich', en: 'Zurich', it: 'Zurigo' },
  },
  {
    slug: 'tessin',
    code: 'TI',
    cities: ['Lugano', 'Bellinzona', 'Locarno', 'Mendrisio'],
    smeCount: '14 000+',
    language: 'it',
    topSectors: ['Finance Lugano', 'Tourisme et hôtellerie', 'Mode et design', 'Industrie pharmaceutique Mendrisio', 'Logistique alpine'],
    funding: 'Aiuti cantonali formazione TI, condizioni secondo dossier',
    names: { fr: 'Tessin', de: 'Tessin', en: 'Ticino', it: 'Ticino' },
  },
];

export function getCantonBySlug(slug: string): Canton | undefined {
  return CANTONS.find((c) => c.slug === slug);
}
