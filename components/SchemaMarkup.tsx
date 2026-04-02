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
      "https://vocalis.pro",
      "https://vocalis.blog",
      "https://tesla-mag.ch",
      "https://master-seller.fr",
      "https://seo-true.com",
      "https://trustly-ai.com",
    ],
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": locale === 'de'
      ? 'KI-Schulung fur Schweizer KMU'
      : locale === 'it'
        ? 'Formazione IA per PMI svizzere'
        : locale === 'en'
          ? 'AI Training for Swiss SMEs'
          : 'Formation IA pour PME suisses',
    "description": locale === 'de'
      ? 'Praxisnahe KI-Schulung fur Schweizer KMU. Von Grundlagen bis Fortgeschrittene. EduQua-zertifiziert.'
      : locale === 'it'
        ? 'Formazione pratica IA per PMI svizzere. Dal livello base all\'avanzato. Certificazione EduQua.'
        : locale === 'en'
          ? 'Practical AI training for Swiss SMEs. From beginner to advanced. EduQua certified.'
          : 'Formation pratique en intelligence artificielle pour les PME suisses. Du niveau debutant a expert. Certification EduQua.',
    "provider": {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      "name": "IAPME Suisse",
    },
    "educationalLevel": "Beginner to Advanced",
    "inLanguage": [locale, "fr", "de", "en", "it"],
    "hasCourseInstance": [
      {
        "@type": "CourseInstance",
        "courseMode": "online",
        "courseWorkload": "PT20H",
        "name": "Starter",
      },
      {
        "@type": "CourseInstance",
        "courseMode": "blended",
        "courseWorkload": "PT40H",
        "name": "Professional",
      },
      {
        "@type": "CourseInstance",
        "courseMode": "blended",
        "courseWorkload": "PT80H",
        "name": "Expert",
      },
    ],
    "url": `${baseUrl}/${locale}/formation-ia-pme`,
    "offers": {
      "@type": "Offer",
      "category": "AI Training",
      "priceCurrency": "CHF",
      "availability": "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
    </>
  );
}
