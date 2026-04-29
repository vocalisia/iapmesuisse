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
    "potentialAction": {
      "@type": "SearchAction",
      "target": { "@type": "EntryPoint", "urlTemplate": `${baseUrl}/fr?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#founder`,
    "name": "Laurent Duplat",
    "url": `${baseUrl}/fr/a-propos`,
    "jobTitle": "Directeur de la publication & Formateur IA",
    "description": "Directeur de publication VAULT 369 LTD, formateur IA pour PME suisses",
    "worksFor": { "@type": "Organization", "@id": `${baseUrl}/#organization` },
    "knowsLanguage": ["fr", "de", "en"],
    "sameAs": ["https://vocalis.pro"],
  };

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
    "instructor": {
      "@type": "Person",
      "name": "Laurent Duplat",
      "jobTitle": "Directeur de la publication & Formateur IA",
      "url": `${baseUrl}/${locale}/a-propos`,
      "worksFor": {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
      },
    },
    "hasCourseInstance": [
      {
        "@type": "CourseInstance",
        "name": "Découverte (Gratuit)",
        "description": "Webinaire de découverte des outils IA pour PME, 1h en ligne.",
        "courseMode": "online",
        "courseWorkload": "PT1H",
        "instructor": { "@type": "Person", "name": "Laurent Duplat" },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "CHF",
          "availability": "https://schema.org/InStock",
          "url": `${baseUrl}/${locale}/contact`,
          "category": "Free webinar",
        },
      },
      {
        "@type": "CourseInstance",
        "name": "Starter",
        "description": "Initiation IA pour PME — 4h en visioconférence.",
        "courseMode": "online",
        "courseWorkload": "PT4H",
        "instructor": { "@type": "Person", "name": "Laurent Duplat" },
        "offers": {
          "@type": "Offer",
          "price": "97",
          "priceCurrency": "CHF",
          "availability": "https://schema.org/InStock",
          "url": "https://buy.stripe.com/aFabJ03YS5AQ2SwfS6co00F",
          "category": "Group training",
        },
      },
      {
        "@type": "CourseInstance",
        "name": "Pro",
        "description": "Formation IA approfondie — outils, prompts, workflows. 12h en blended learning.",
        "courseMode": "blended",
        "courseWorkload": "PT12H",
        "instructor": { "@type": "Person", "name": "Laurent Duplat" },
        "offers": {
          "@type": "Offer",
          "price": "297",
          "priceCurrency": "CHF",
          "availability": "https://schema.org/InStock",
          "url": "https://buy.stripe.com/5kQeVc7b44wMgJmgWaco00G",
          "category": "Group training",
        },
      },
      {
        "@type": "CourseInstance",
        "name": "Premium",
        "description": "Formation IA intensive avec accompagnement individuel — 30h.",
        "courseMode": "blended",
        "courseWorkload": "PT30H",
        "instructor": { "@type": "Person", "name": "Laurent Duplat" },
        "offers": {
          "@type": "Offer",
          "price": "997",
          "priceCurrency": "CHF",
          "availability": "https://schema.org/InStock",
          "url": "https://buy.stripe.com/3cI6oGbrk4wM9gUgWaco00H",
          "category": "Premium training",
        },
      },
      {
        "@type": "CourseInstance",
        "name": "Formation Équipe",
        "description": "Formation IA sur mesure pour équipes — 4h en visioconférence ou présentiel.",
        "courseMode": "blended",
        "courseWorkload": "PT4H",
        "location": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "CH",
          },
        },
        "instructor": { "@type": "Person", "name": "Laurent Duplat" },
        "offers": {
          "@type": "Offer",
          "price": "2500",
          "priceCurrency": "CHF",
          "availability": "https://schema.org/InStock",
          "url": "https://buy.stripe.com/bJe00iang3sI0Ko8pEco00I",
          "category": "Team training",
        },
      },
      {
        "@type": "CourseInstance",
        "name": "Formation Claude Code",
        "description": "Formation Claude Code pour équipes techniques — 4h, dev assisté par IA.",
        "courseMode": "blended",
        "courseWorkload": "PT4H",
        "instructor": { "@type": "Person", "name": "Laurent Duplat" },
        "offers": {
          "@type": "Offer",
          "price": "3500",
          "priceCurrency": "CHF",
          "availability": "https://schema.org/InStock",
          "url": "https://buy.stripe.com/aFabJ07b49R6dxa5dsco00J",
          "category": "Technical training",
        },
      },
      {
        "@type": "CourseInstance",
        "name": "Formation IA Marketing",
        "description": "Formation IA appliquée au marketing — outils, automatisation, 4h sur mesure.",
        "courseMode": "blended",
        "courseWorkload": "PT4H",
        "instructor": { "@type": "Person", "name": "Laurent Duplat" },
        "offers": {
          "@type": "Offer",
          "price": "2500",
          "priceCurrency": "CHF",
          "availability": "https://schema.org/InStock",
          "url": "https://buy.stripe.com/eVq5kC6700gwgJmfS6co00K",
          "category": "Marketing training",
        },
      },
    ],
    "url": `${baseUrl}/${locale}/formation-ia-pme`,
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "CHF",
      "lowPrice": "0",
      "highPrice": "3500",
      "offerCount": "7",
      "availability": "https://schema.org/InStock",
      "category": "AI Training",
    },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
    </>
  );
}
