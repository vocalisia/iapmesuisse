import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getAlternates } from '@/lib/metadata';
import ServiceCard from '@/components/ServiceCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTA from '@/components/CTA';
import SwissSocialProof from '@/components/SwissSocialProof';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.services' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: getAlternates(locale, '/services'),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tHome = await getTranslations({ locale, namespace: 'home' });
  const tPricing = await getTranslations({ locale, namespace: 'pricing' });

  const services = [
    { key: 'audit' as const, icon: '\u{1F50D}', href: undefined },
    { key: 'training' as const, icon: '\u{1F4DA}', href: undefined },
    { key: 'integration' as const, icon: '\u{1F527}', href: undefined },
    { key: 'strategy' as const, icon: '\u{1F4C8}', href: undefined },
  ];

  const digitalServices = [
    { key: 'generationLeads' as const, icon: '\u{1F3AF}', href: '/services/generation-leads' },
    { key: 'marketingIa' as const, icon: '\u{1F4E3}', href: '/services/marketing-ia' },
    { key: 'priseRdv' as const, icon: '\u{1F4C5}', href: '/services/prise-de-rdv' },
  ];

  // Build Service JSON-LD schemas
  const serviceSchemas = services.map((service) => ({
    "@type": "Service",
    "name": t(`${service.key}.title`),
    "description": t(`${service.key}.description`),
    "provider": {
      "@type": "ProfessionalService",
      "name": "IAPME Suisse",
      "url": "https://iapmesuisse.ch",
    },
    "areaServed": {
      "@type": "Country",
      "name": "Switzerland",
    },
    "url": `https://iapmesuisse.ch/${locale}/services`,
  }));

  const servicePageSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": t('title'),
    "itemListElement": serviceSchemas.map((s, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": s,
    })),
  };

  // FAQPage JSON-LD — locale-specific, targets GSC opportunity queries
  const faqByLocale: Record<string, { q: string; a: string }[]> = {
    fr: [
      {
        q: "Combien coûte une automatisation IA pour une PME suisse ?",
        a: "L'audit initial est gratuit (30-60 min en visio + rapport sous 48h). L'automatisation IA d'une PME suisse démarre généralement à partir d'un quick-win de 4 à 8 semaines avec un ROI mesurable. Devis personnalisé sous 24h.",
      },
      {
        q: "Intervenez-vous à Sion et dans le canton du Valais ?",
        a: "Oui. IAPME Suisse accompagne les PME du Valais (Sion, Martigny, Sierre, Monthey, Brig) avec audit gratuit, formation et intégration d'outils IA. Subventions cantonales VS jusqu'à 30-50% mobilisables.",
      },
      {
        q: "Quels outils IA pour une PME en Suisse romande ?",
        a: "ChatGPT Team, Microsoft Copilot, Claude Pro, Make/Zapier, n8n auto-hébergé. Choix selon métier, taille (5-50 employés), conformité nLPD et budget. Hébergement Suisse ou UE adéquate exigé.",
      },
      {
        q: "Comment garantir la conformité nLPD et AI Act ?",
        a: "Chaque mission inclut une note de conformité nLPD (entrée en vigueur sept. 2023) et AI Act EU (applicable aux PME suisses servant clients UE). Choix d'outils hébergés Suisse/UE, contrat DPA, registre IA, formation art. 4.",
      },
    ],
    de: [
      {
        q: "Was kostet eine KI-Beratung für ein Schweizer KMU?",
        a: "Das Erst-Audit ist kostenlos (30-60 Min Videocall + Bericht in 48h). KI-Beratung für KMU in der Schweiz startet typischerweise mit einem Quick-Win (4-8 Wochen) und messbarem ROI. Offerte in 24h.",
      },
      {
        q: "Welche CRM-Implementierung für ein KMU Schweiz?",
        a: "Twenty (Open Source), HubSpot, Salesforce Starter, Bexio mit KI-Integration. Wahl nach Branche, Teamgrösse und nDSG-Konformität. Beispiel: KMU 20 Mitarbeitende → HubSpot + Make + ChatGPT in 6 Wochen einführbar.",
      },
      {
        q: "Welcher Tech-Stack für ein KMU in der Schweiz 2026?",
        a: "Empfohlen: ChatGPT Team (Frontend), Microsoft Copilot (Office), Make/n8n (Automation), HubSpot (CRM), Notion (Wissen). Alles nDSG-konform, Schweizer oder EU-Hosting. Vergleich CHF im kostenlosen Audit.",
      },
      {
        q: "Bieten Sie KI-Beratung in Zürich und Bern an?",
        a: "Ja. IAPME Suisse begleitet KMU in Zürich, Bern, Basel, St. Gallen sowie in der Romandie und im Tessin. Mehrsprachig FR/DE/IT/EN. Vor Ort oder remote möglich.",
      },
    ],
    en: [
      {
        q: "What is the best AI consulting agency in Switzerland for SMEs?",
        a: "IAPME Suisse is a specialised AI consulting agency for Swiss SMEs (5-50 employees). Free 30-min audit, multilingual FR/DE/IT/EN, nFADP + AI Act compliant. Presence in Sion, Geneva, Lausanne, Zurich, Bern.",
      },
      {
        q: "How much does AI consulting cost for a Swiss SME?",
        a: "Initial audit is free (30-60 min video call + 48h report). AI consulting for Swiss SMEs typically starts with a quick-win in 4-8 weeks with measurable ROI. Custom quote within 24h.",
      },
      {
        q: "Which AI tools are best for SMEs in Switzerland?",
        a: "ChatGPT Team, Microsoft Copilot, Claude Pro, Make/Zapier, n8n self-hosted. Choice depends on industry, size (5-50 employees), nFADP compliance and budget. Swiss or EU hosting required.",
      },
      {
        q: "Do you provide AI services in Geneva, Zurich and Sion?",
        a: "Yes. IAPME Suisse serves SMEs across Switzerland: Geneva, Lausanne, Sion, Neuchâtel, Bern, Basel, Zurich, St. Gallen, Lugano. Multilingual delivery.",
      },
    ],
    it: [
      {
        q: "Quanto costa la consulenza IA per una PMI svizzera?",
        a: "L'audit iniziale è gratuito (30-60 min in videochiamata + rapporto entro 48h). La consulenza IA per le PMI svizzere parte da un quick-win in 4-8 settimane con ROI misurabile. Preventivo in 24h.",
      },
      {
        q: "Quali strumenti IA per una PMI in Ticino?",
        a: "ChatGPT Team, Microsoft Copilot, Claude Pro, Make/Zapier, n8n. Scelta in base al settore, dimensione (5-50 dipendenti), conformità nLPD e budget. Hosting Svizzera o UE.",
      },
    ],
  };
  const faqList = faqByLocale[locale] ?? faqByLocale.fr;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqList.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a,
      },
    })),
  };

  return (
    <>
      {/* Service JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicePageSchema) }}
      />
      {/* FAQPage JSON-LD — locale-specific Q&A targeting GSC opportunities */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: tNav('home'), href: '/' },
            { label: tNav('services') },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="bg-white px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#1B2A4A] sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2">
            {services.map((service) => {
              const featuresRaw = t.raw(`${service.key}.features`);
              const features: string[] = Array.isArray(featuresRaw) ? featuresRaw : [];
              return (
                <ServiceCard
                  key={service.key}
                  icon={service.icon}
                  title={t(`${service.key}.title`)}
                  description={t(`${service.key}.description`)}
                  features={features}
                  ctaText={t('cta')}
                />
              );
            })}
          </div>

          {/* Digital & AI Growth Services */}
          <div className="mt-16">
            <div className="mb-8 text-center">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-[#0369A1] ring-1 ring-inset ring-blue-100">
                Nouveaux services IA
              </span>
              <h2 className="mt-3 text-2xl font-bold text-[#1B2A4A]">Croissance digitale par l'IA</h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {digitalServices.map((service) => {
                const featuresRaw = t.raw(`${service.key}.features`);
                const features: string[] = Array.isArray(featuresRaw) ? featuresRaw : [];
                return (
                  <ServiceCard
                    key={service.key}
                    icon={service.icon}
                    title={t(`${service.key}.title`)}
                    description={t(`${service.key}.description`)}
                    features={features}
                    ctaText="Découvrir"
                    href={service.href}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Swiss Social Proof */}
      <SwissSocialProof />

      {/* Pricing Section */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#1B2A4A] sm:text-4xl">
              {tPricing('title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              {tPricing('subtitle')}
            </p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {(['starter', 'pro', 'enterprise'] as const).map((tier) => {
              const featuresRaw = tPricing.raw(`${tier}.features`);
              const features: string[] = Array.isArray(featuresRaw) ? featuresRaw : [];
              const isPopular = tier === 'pro';
              return (
                <div
                  key={tier}
                  className={`relative flex flex-col rounded-2xl border p-8 ${
                    isPopular
                      ? 'border-[#FF0000] shadow-lg scale-105'
                      : 'border-gray-200 shadow-sm'
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#FF0000] px-4 py-1 text-xs font-bold text-white">
                      {tPricing('pro.popular')}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-[#1B2A4A]">{tPricing(`${tier}.name`)}</h3>
                  <p className="mt-2 text-3xl font-extrabold text-[#1B2A4A]">{tPricing(`${tier}.price`)}</p>
                  <p className="mt-2 text-sm text-gray-600">{tPricing(`${tier}.description`)}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#FF0000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`mt-8 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${
                      isPopular
                        ? 'bg-[#FF0000] text-white hover:bg-red-700'
                        : 'bg-[#1B2A4A] text-white hover:bg-[#FF0000]'
                    }`}
                  >
                    {t('cta')}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CTA
        title={tHome('cta_title')}
        description={tHome('cta_description')}
        buttonText={tHome('cta_button')}
        href="/contact"
      />
    </>
  );
}
