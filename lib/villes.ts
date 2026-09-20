/**
 * Swiss cities data for /villes/<slug> SEO pages.
 * Targets GSC striking-distance queries with strong local intent:
 *   - "ia pme valais sion" (pos 13.7)
 *   - "chatbot ia entreprise suisse valais sion" (pos 15)
 *   - "ki beratung bern" (pos 23.7)
 *   - "ki beratung kmu zürich"
 *   - "agence ia valais" / "agence ia genève"
 */

export type VilleCantonRef = {
  slug: string;
  /** Canton display name per locale, used for breadcrumbs and copy. */
  names: { fr: string; de: string; en: string; it: string };
};

export type Ville = {
  slug: string;
  cantonSlug: string;
  cantonNames: { fr: string; de: string; en: string; it: string };
  /** ~Population (rounded for social proof). */
  population: string;
  /** ~Number of SMEs in the city area. */
  smeCount: string;
  language: 'fr' | 'de' | 'it';
  /** Main economic districts / quartiers. */
  districts: string[];
  /** Sectors with strong AI ROI in this city. */
  topSectors: string[];
  /** Local hooks (universities, clusters, events). */
  ecosystem: string;
  names: { fr: string; de: string; en: string; it: string };
};

export const VILLES: Ville[] = [
  {
    slug: 'sion',
    cantonSlug: 'valais',
    cantonNames: { fr: 'Valais', de: 'Wallis', en: 'Valais', it: 'Vallese' },
    population: '35 000+',
    smeCount: '8 000+',
    language: 'fr',
    districts: ['Vieille Ville', 'Champsec', 'Platta', 'Châteauneuf', 'Pôle technique HES-SO'],
    topSectors: ['Tourisme & hôtellerie alpine', 'Viticulture & œnologie', 'Administration cantonale VS', 'Services médicaux & cliniques', 'Construction & BTP de montagne'],
    ecosystem: 'HES-SO Valais-Wallis · The Ark · CimArk · Idiap Research Institute Martigny · BlueArk',
    names: { fr: 'Sion', de: 'Sitten', en: 'Sion', it: 'Sion' },
  },
  {
    slug: 'geneve',
    cantonSlug: 'geneve',
    cantonNames: { fr: 'Genève', de: 'Genf', en: 'Geneva', it: 'Ginevra' },
    population: '205 000+',
    smeCount: '35 000+',
    language: 'fr',
    districts: ['Plainpalais', 'Eaux-Vives', 'Pâquis', 'Champel', 'Plan-les-Ouates', 'Meyrin (campus CERN)'],
    topSectors: ['Banque privée & gestion de fortune', 'Organisations internationales (ONU, OMC, OMS)', 'Horlogerie & joaillerie', 'Trading & négoce', 'Cabinets d\'avocats'],
    ecosystem: 'Université de Genève · CERN · HEAD · Campus Biotech · Geneva Health Forum · Fongit',
    names: { fr: 'Genève', de: 'Genf', en: 'Geneva', it: 'Ginevra' },
  },
  {
    slug: 'lausanne',
    cantonSlug: 'vaud',
    cantonNames: { fr: 'Vaud', de: 'Waadt', en: 'Vaud', it: 'Vaud' },
    population: '140 000+',
    smeCount: '22 000+',
    language: 'fr',
    districts: ['Flon', 'Ouchy', 'Sévelin', 'EPFL Innovation Park', 'Beaulieu', 'Sébeillon'],
    topSectors: ['Tech & deep tech (écosystème EPFL)', 'Industrie de précision Vaud', 'Hôtellerie Riviera Lavaux', 'Sport business (CIO, fédérations)', 'Services aux entreprises'],
    ecosystem: 'EPFL · UNIL · EPFL Innovation Park · Startup-Lab · Innovaud · Garage du Tunnel',
    names: { fr: 'Lausanne', de: 'Lausanne', en: 'Lausanne', it: 'Losanna' },
  },
  {
    slug: 'neuchatel',
    cantonSlug: 'neuchatel',
    cantonNames: { fr: 'Neuchâtel', de: 'Neuenburg', en: 'Neuchâtel', it: 'Neuchâtel' },
    population: '44 000+',
    smeCount: '7 000+',
    language: 'fr',
    districts: ['Serrières (industrie)', 'Crêts', 'Vieux-Bois', 'Maladière', 'Corcelles-Cormondrèche'],
    topSectors: ['Microtechnique & horlogerie', 'Microélectronique & capteurs', 'Recherche appliquée UniNE', 'Industrie de précision', 'Services aux entreprises'],
    ecosystem: 'Université de Neuchâtel · CSEM · Swatch Group R&D · HES-SO ARC · Neode Business Park',
    names: { fr: 'Neuchâtel', de: 'Neuenburg', en: 'Neuchâtel', it: 'Neuchâtel' },
  },
  {
    slug: 'fribourg',
    cantonSlug: 'fribourg',
    cantonNames: { fr: 'Fribourg', de: 'Freiburg', en: 'Fribourg', it: 'Friburgo' },
    population: '40 000+',
    smeCount: '9 000+',
    language: 'fr',
    districts: ['Basse-Ville', 'Haute-Ville', 'Pérolles (universités)', 'Marly (industrie)', 'Granges-Paccot'],
    topSectors: ['Industrie agroalimentaire (Nestlé Chocolat)', 'Énergie & cleantech', 'Construction & BTP', 'Enseignement supérieur bilingue', 'Services aux entreprises'],
    ecosystem: 'Université de Fribourg · HES-SO FR · FriUp (incubateur) · Energy Innovation Cluster · Nestlé R&D',
    names: { fr: 'Fribourg', de: 'Freiburg', en: 'Fribourg', it: 'Friburgo' },
  },
  {
    slug: 'yverdon',
    cantonSlug: 'vaud',
    cantonNames: { fr: 'Vaud', de: 'Waadt', en: 'Vaud', it: 'Vaud' },
    population: '31 000+',
    smeCount: '5 500+',
    language: 'fr',
    districts: ['Zone industrielle nord', 'Fleur-de-Lys', 'Clendy', 'Villars-Epeney', 'EPFL Yverdon'],
    topSectors: ['Tech & startups (Y-Parc)', 'Impression 3D & fabrication additive', 'Énergie & cleantech', 'Informatique industrielle', 'E-santé & medtech'],
    ecosystem: 'Y-Parc Tech Center · HEIG-VD · Innovaud · Yvertech · Swiss Made Software cluster',
    names: { fr: 'Yverdon-les-Bains', de: 'Yverdon-les-Bains', en: 'Yverdon-les-Bains', it: 'Yverdon-les-Bains' },
  },
  {
    slug: 'martigny',
    cantonSlug: 'valais',
    cantonNames: { fr: 'Valais', de: 'Wallis', en: 'Valais', it: 'Vallese' },
    population: '19 000+',
    smeCount: '4 000+',
    language: 'fr',
    districts: ['Bourg', 'La Bâtiaz', 'Croix Blanche', 'Zone artisanale Charrat', 'Octodure'],
    topSectors: ['Viticulture & œnologie', 'Tourisme & hôtellerie (carrefour des Alpes)', 'Énergie hydraulique', 'Industrie chimique (Lonza)', 'Logistique & transit'],
    ecosystem: 'Idiap Research Institute · HES-SO Valais-Wallis · BlueArk Entremont · Fondation Pierre Arnaud',
    names: { fr: 'Martigny', de: 'Martigny', en: 'Martigny', it: 'Martigny' },
  },
  {
    slug: 'sierre',
    cantonSlug: 'valais',
    cantonNames: { fr: 'Valais', de: 'Wallis', en: 'Valais', it: 'Vallese' },
    population: '17 000+',
    smeCount: '3 500+',
    language: 'fr',
    districts: ['Centre-ville', 'Villa-Panciau', 'Gravelone', 'Zone industrielle Châteauneuf', 'Techno-Pôle'],
    topSectors: ['Tourisme (Crans-Montana proximité)', 'Viticulture (Pinot Noir, Fendant)', 'Industrie de l\'aluminium (ALCAN legacy)', 'Numérique & gaming (Techno-Pôle)', 'Énergies renouvelables'],
    ecosystem: 'Techno-Pôle Sierre · HES-SO Valais Digital · Gaming Hub Sierre · Energissima · iMpulse',
    names: { fr: 'Sierre', de: 'Siders', en: 'Sierre', it: 'Siders' },
  },
  {
    slug: 'zurich',
    cantonSlug: 'zurich',
    cantonNames: { fr: 'Zurich', de: 'Zürich', en: 'Zurich', it: 'Zurigo' },
    population: '440 000+',
    smeCount: '60 000+',
    language: 'de',
    districts: ['Kreis 1 (Altstadt)', 'Zürich West', 'Oerlikon', 'Wiedikon', 'Hardturm', 'Technopark'],
    topSectors: ['Bank & Versicherung (UBS, Swiss Re, Zurich)', 'Tech & Startups (ETH-Cluster)', 'Pharma & Life Sciences', 'Logistik & Supply Chain', 'B2B-Dienstleistungen'],
    ecosystem: 'ETH Zürich · Universität Zürich · Technopark · Impact Hub · digitalswitzerland · Trust Valley',
    names: { fr: 'Zurich', de: 'Zürich', en: 'Zurich', it: 'Zurigo' },
  },
  {
    slug: 'berne',
    cantonSlug: 'berne',
    cantonNames: { fr: 'Berne', de: 'Bern', en: 'Bern', it: 'Berna' },
    population: '135 000+',
    smeCount: '28 000+',
    language: 'de',
    districts: ['Altstadt', 'Länggasse', 'Bümpliz', 'Wankdorf', 'Liebefeld'],
    topSectors: ['Bundesverwaltung & öffentliche Hand', 'Präzisionsindustrie Biel/Bienne', 'Energie & Versorgung (BKW, Swissgrid)', 'Kommunikation (Swisscom HQ)', 'Tourismus Berner Oberland'],
    ecosystem: 'Universität Bern · BFH · sitem-insel · Switzerland Innovation Park Biel/Bienne · Bern Welcome',
    names: { fr: 'Berne', de: 'Bern', en: 'Bern', it: 'Berna' },
  },
  // 2026-09-20 : ajout Tessin. GSC 90 j — « ai consultancy lugano » pos 2.9,
  // « ai consultant lugano » pos 4.4, « ai consulting companies lugano » pos 17.2,
  // demande réelle sans page de ville dédiée jusqu'ici.
  {
    slug: 'lugano',
    cantonSlug: 'tessin',
    cantonNames: { fr: 'Tessin', de: 'Tessin', en: 'Ticino', it: 'Ticino' },
    population: '65 000+',
    smeCount: '9 000+',
    language: 'it',
    districts: ['Centro', 'Paradiso', 'Cassarate', 'Besso', 'Viganello', 'Cornaredo'],
    topSectors: ['Banche e gestione patrimoniale', 'Fiduciarie e servizi contabili', 'Commercio di materie prime', 'Turismo e ospitalità', 'Moda e design'],
    ecosystem: 'Università della Svizzera italiana (USI) · SUPSI · Istituto Dalle Molle IDSIA · Centro Svizzero di Calcolo Scientifico (CSCS) · AITI · Lugano Living Lab',
    names: { fr: 'Lugano', de: 'Lugano', en: 'Lugano', it: 'Lugano' },
  },
  {
    slug: 'bellinzona',
    cantonSlug: 'tessin',
    cantonNames: { fr: 'Tessin', de: 'Tessin', en: 'Ticino', it: 'Ticino' },
    population: '44 000+',
    smeCount: '4 000+',
    language: 'it',
    districts: ['Centro storico', 'Giubiasco', 'Monte Carasso', 'Camorino', 'Sementina'],
    topSectors: ['Amministrazione cantonale', 'Sanità e ricerca biomedica', 'Logistica e trasporti alpini', 'Edilizia e genio civile', 'Commercio al dettaglio'],
    ecosystem: 'Istituto di Ricerca in Biomedicina (IRB) · Istituto Oncologico della Svizzera Italiana (IOSI) · Officine FFS Bellinzona · Fondazione Agire',
    names: { fr: 'Bellinzone', de: 'Bellenz', en: 'Bellinzona', it: 'Bellinzona' },
  },
  {
    slug: 'locarno',
    cantonSlug: 'tessin',
    cantonNames: { fr: 'Tessin', de: 'Tessin', en: 'Ticino', it: 'Ticino' },
    population: '16 000+',
    smeCount: '3 000+',
    language: 'it',
    districts: ['Centro', 'Muralto', 'Minusio', 'Ascona', 'Losone'],
    topSectors: ['Turismo e ospitalità', 'Eventi e industria culturale', 'Commercio al dettaglio', 'Edilizia e immobiliare', 'Servizi alla persona'],
    ecosystem: 'Locarno Film Festival · Clinica Santa Chiara · Fondazione Agire · SUPSI Dipartimento ambiente costruzioni e design',
    names: { fr: 'Locarno', de: 'Locarno', en: 'Locarno', it: 'Locarno' },
  },
  {
    slug: 'mendrisio',
    cantonSlug: 'tessin',
    cantonNames: { fr: 'Tessin', de: 'Tessin', en: 'Ticino', it: 'Ticino' },
    population: '15 000+',
    smeCount: '3 500+',
    language: 'it',
    districts: ['Centro', 'Rancate', 'Stabio', 'Balerna', 'Genestrerio'],
    topSectors: ['Industria farmaceutica e life sciences', 'Moda e retail outlet', 'Logistica transfrontaliera', 'Meccanica di precisione', 'Servizi fiduciari e doganali'],
    ecosystem: 'Accademia di architettura USI Mendrisio · AITI · Camera di commercio del Cantone Ticino · Fondazione Agire',
    names: { fr: 'Mendrisio', de: 'Mendrisio', en: 'Mendrisio', it: 'Mendrisio' },
  },
];

export function getVilleBySlug(slug: string): Ville | undefined {
  return VILLES.find((v) => v.slug === slug);
}
