export default function SchemaMarkup({ locale }: { locale: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "IAPME Suisse",
    "url": "https://iapmesuisse.ch",
    "description": "Intelligence artificielle pour PME suisses",
    "address": { "@type": "PostalAddress", "addressCountry": "CH" },
    "areaServed": "CH",
    "knowsLanguage": ["fr", "de", "en", "it"],
    "sameAs": [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
