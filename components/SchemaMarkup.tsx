export default function SchemaMarkup({ locale }: { locale: string }) {
  const baseUrl = 'https://iapmesuisse.ch';

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "name": "IAPME Suisse",
    "url": baseUrl,
    "description": "Formation IA et accompagnement stratégique pour PME suisses",
    "publisher": { "@id": `${baseUrl}/#organization` },
    "inLanguage": ["fr", "de", "en", "it"],
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#founder`,
    "name": "Laurent Duplat",
    "url": `${baseUrl}/${locale}/a-propos`,
    "jobTitle": "Directeur de la publication & Formateur IA",
    "description": "Directeur de la publication IAPME Suisse, formateur et consultant IA pour PME suisses, plus de 10 ans d'expérience en stratégie digitale et automatisation.",
    "worksFor": { "@type": "Organization", "@id": `${baseUrl}/#organization` },
    "knowsLanguage": ["fr", "de", "en"],
    "sameAs": ["https://www.linkedin.com/company/iapme-suisse"],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${baseUrl}/#organization`,
    "name": "IAPME Suisse",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/images/logo.svg`,
      "width": 320,
      "height": 80,
    },
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
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "contact@iapmesuisse.ch",
      "availableLanguage": ["French", "German", "English", "Italian"]
    },
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
    "sameAs": [
      "https://www.linkedin.com/company/iapme-suisse",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
