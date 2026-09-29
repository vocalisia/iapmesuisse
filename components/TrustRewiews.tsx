import Script from 'next/script';

// Avis clients hébergés par trustrewiews.ch : note publiée, avis modérés et formulaire de dépôt.
// La clé du site vient de lib/embed-sites.ts côté trustrewiews.ch.
export default function TrustRewiews({
  siteKey = 'iapmesuisse-ch',
  variant,
}: {
  siteKey?: string;
  variant?: 'badge' | 'compact' | 'reviews';
}) {
  return (
    <>
      <div data-trustrewiews={siteKey} {...(variant ? { 'data-variant': variant } : {})} />
      <Script src="https://trustrewiews.ch/widget.js" strategy="afterInteractive" />
    </>
  );
}
