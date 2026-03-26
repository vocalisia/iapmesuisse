export default function SchemaMarkup({ locale }: { locale: string }) {
  const baseUrl = 'https://iapmesuisse.ch';

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${baseUrl}/#organization`,
    "name": "IAPME Suisse",
    "url": baseUrl,
    "logo": `${baseUrl}/favicon.svg`,
    "image": `${baseUrl}/images/hero-bg.jpg`,
    "description":
      locale === 'de'
        ? 'Strategische Begleitung, Schulung und Integration von KI-Tools fur Schweizer KMU'
        : locale === 'it'
          ? 'Accompagnamento strategico, formazione e integrazione di strumenti IA per le PMI svizzere'
          : locale === 'en'
            ? 'Strategic support, training and AI tool integration for Swiss SMEs'
            : 'Accompagnement strategique, formation et integration d\'outils d\'intelligence artificielle pour les PME suisses',
    "email": "contact@iapmesuisse.ch",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Chem. Saint-Hubert 2",
      "addressLocality": "Sion",
      "postalCode": "1950",
      "addressRegion": "VS",
      "addressCountry": "CH",
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Switzerland",
        "sameAs": "https://en.wikipedia.org/wiki/Switzerland",
      },
      { "@type": "AdministrativeArea", "name": "Valais" },
      { "@type": "AdministrativeArea", "name": "Vaud" },
      { "@type": "AdministrativeArea", "name": "Geneve" },
      { "@type": "AdministrativeArea", "name": "Zurich" },
      { "@type": "AdministrativeArea", "name": "Bern" },
      { "@type": "AdministrativeArea", "name": "Ticino" },
    ],
    "knowsLanguage": ["fr", "de", "en", "it"],
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00",
    },
    "sameAs": [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
