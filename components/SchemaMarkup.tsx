export default function SchemaMarkup({ locale }: { locale: string }) {
  const baseUrl = 'https://iapmesuisse.ch';

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "name": "IAPME Suisse",
    "alternateName": ["IA PME Suisse", "IAPME", "IAPME.ch"],
    "url": baseUrl,
    "description": "Formation IA et accompagnement stratégique pour PME suisses",
    "publisher": { "@id": `${baseUrl}/#organization` },
    "inLanguage": ["fr", "de", "en", "it"],
    "about": [
      { "@type": "Thing", "name": "Intelligence artificielle pour PME suisses" },
      { "@type": "Thing", "name": "Automatisation IA" },
      { "@type": "Thing", "name": "Formation IA" },
      { "@type": "Thing", "name": "Conformite nLPD" },
      { "@type": "Thing", "name": "Conseil IA Suisse" },
    ],
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#founder`,
    "name": "Laurent Duplat",
    "url": `${baseUrl}/${locale}/a-propos`,
    "jobTitle": "Directeur de la publication & Formateur IA",
    "description": "Directeur de la publication IAPME Suisse, formateur et consultant IA pour PME suisses, plus de 10 ans d'experience en strategie digitale et automatisation.",
    "image": {
      "@type": "ImageObject",
      "url": `${baseUrl}/images/authors/laurent-duplat.jpg`,
      "width": 400,
      "height": 400,
    },
    "nationality": { "@type": "Country", "name": "Switzerland" },
    "worksFor": { "@type": "Organization", "@id": `${baseUrl}/#organization` },
    "knowsAbout": [
      "Intelligence artificielle pour PME",
      "Formation IA generative",
      "ChatGPT et automatisation entreprise",
      "Strategie digitale Suisse romande",
      "Conformite IA et RGPD",
      "Integration outils IA",
      "Transformation numerique PME",
      "Productivite IA",
    ],
    "knowsLanguage": ["fr", "de", "en", "it"],
    "sameAs": [
      "https://www.linkedin.com/company/iapme-suisse",
      "https://www.linkedin.com/in/vocalisia/",
      "https://x.com/VocalisAi",
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness", "EducationalOrganization"],
    "@id": `${baseUrl}/#organization`,
    "name": "IAPME Suisse",
    "legalName": "VAULT 369 LTD",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/images/logo.svg`,
      "width": 320,
      "height": 80,
    },
    "image": {
      "@type": "ImageObject",
      "url": `${baseUrl}/images/hero-bg.jpg`,
      "width": 1200,
      "height": 630,
    },
    "description":
      locale === 'de'
        ? 'Strategische Begleitung, Schulung und Integration von KI-Tools fur Schweizer KMU'
        : locale === 'it'
          ? 'Accompagnamento strategico, formazione e integrazione di strumenti IA per le PMI svizzere'
          : locale === 'en'
            ? 'Strategic support, training and AI tool integration for Swiss SMEs'
            : 'Accompagnement strategique, formation et integration d\'outils d\'intelligence artificielle pour les PME suisses',
    "foundingDate": "2024",
    "slogan": "IA pratique pour PME suisses",
    "founder": { "@id": `${baseUrl}/#founder` },
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
    "knowsAbout": [
      "Intelligence artificielle pour PME suisses",
      "Formation ChatGPT et IA generative",
      "Automatisation business processes",
      "Strategie IA pour entreprises Suisse romande",
      "Integration outils IA (Copilot, Claude, Gemini)",
      "Conformite IA RGPD nLPD",
      "Transformation digitale PME",
      "ROI et productivite IA",
      "Coaching IA dirigeants",
    ],
    "knowsLanguage": ["fr", "de", "en", "it"],
    "serviceType": [
      "AI consulting",
      "AI training",
      "Business process automation",
      "AI governance",
      "Customer service automation",
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00",
    },
    "publishingPrinciples": `${baseUrl}/${locale}/charte-editoriale`,
    "ethicsPolicy": `${baseUrl}/${locale}/ethique`,
    "correctionsPolicy": `${baseUrl}/${locale}/corrections`,
    "diversityPolicy": `${baseUrl}/${locale}/diversite`,
    "sameAs": [
      "https://www.linkedin.com/company/iapme-suisse",
      "https://www.linkedin.com/in/vocalisia",
      "https://x.com/VocalisAi",
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
