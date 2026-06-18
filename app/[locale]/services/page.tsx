import { getTranslations } from 'next-intl/server';
import { getAlternates } from '@/lib/metadata';
import ServiceCard from '@/components/ServiceCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTA from '@/components/CTA';
import SwissSocialProof from '@/components/SwissSocialProof';
import { sanitizePublicText } from '@/lib/public-text';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.services' });
  return {
    title: sanitizePublicText(t('title'), locale),
    description: sanitizePublicText(t('description'), locale),
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

  const services = [
    { key: 'audit' as const, icon: '\u{1F50D}' },
    { key: 'training' as const, icon: '\u{1F4DA}' },
    { key: 'integration' as const, icon: '\u{1F527}' },
    { key: 'strategy' as const, icon: '\u{1F4C8}' },
  ];

  const digitalServices = [
    { key: 'generationLeads' as const, icon: '\u{1F3AF}', href: '/services/generation-leads' },
    { key: 'marketingIa' as const, icon: '\u{1F4E3}', href: '/services/marketing-ia' },
    { key: 'priseRdv' as const, icon: '\u{1F4C5}', href: '/services/prise-de-rdv' },
  ];

  const discoverText: Record<string, string> = {
    fr: 'Découvrir',
    de: 'Entdecken',
    en: 'Discover',
    it: 'Scopri',
  };

  const serviceSchemas = services.map((service) => ({
    '@type': 'Service',
    name: sanitizePublicText(t(`${service.key}.title`), locale),
    description: sanitizePublicText(t(`${service.key}.description`), locale),
    provider: {
      '@type': 'ProfessionalService',
      name: 'IAPME Suisse',
      url: 'https://iapmesuisse.ch',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Switzerland',
    },
    url: `https://iapmesuisse.ch/${locale}/services`,
  }));

  const servicePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: sanitizePublicText(t('title'), locale),
    itemListElement: serviceSchemas.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: s,
    })),
  };

  const faqByLocale: Record<string, { q: string; a: string }[]> = {
    fr: [
      {
        q: 'Comment cadrer une automatisation IA pour une PME suisse ?',
        a: "On commence par un audit gratuit de 30 min pour identifier les processus prioritaires, les données disponibles, les risques nLPD et les premiers quick-wins mesurables.",
      },
      {
        q: 'Intervenez-vous à Sion et dans le canton du Valais ?',
        a: "Oui. IAPME Suisse accompagne les PME du Valais, notamment à Sion, Martigny, Sierre, Monthey et Brig, avec audit IA, formation et intégration d'outils adaptés au contexte local.",
      },
      {
        q: 'Quels outils IA pour une PME en Suisse romande ?',
        a: "ChatGPT Team, Microsoft Copilot, Claude, Make, Zapier ou n8n sont sélectionnés selon le métier, la taille de l'équipe, la sensibilité des données et les exigences nLPD.",
      },
      {
        q: 'Comment garantir la conformité nLPD et AI Act ?',
        a: "Chaque mission intègre le choix d'outils adaptés, les règles de traitement des données, la documentation IA, la formation des équipes et les contrôles nécessaires pour limiter les risques.",
      },
    ],
    de: [
      {
        q: 'Wie startet eine KI-Beratung für ein Schweizer KMU?',
        a: 'Der Startpunkt ist ein kurzer KI-Audit mit priorisierten Prozessen, Datenlage, nDSG-Anforderungen und einem klaren ersten Automatisierungsfall.',
      },
      {
        q: 'Welche CRM-Implementierung für ein KMU Schweiz?',
        a: 'Twenty, HubSpot, Salesforce Starter oder Bexio mit KI-Integration werden nach Branche, Teamgrösse, Datenflüssen und nDSG-Konformität ausgewählt.',
      },
      {
        q: 'Welcher Tech-Stack für ein KMU in der Schweiz 2026?',
        a: 'Empfohlen werden je nach Kontext ChatGPT Team, Microsoft Copilot, Make oder n8n, HubSpot, Notion und sichere Datenablagen mit Schweizer oder EU-Hosting.',
      },
      {
        q: 'Bieten Sie KI-Beratung in Zürich und Bern an?',
        a: 'Ja. IAPME Suisse begleitet KMU in Zürich, Bern, Basel, St. Gallen sowie in der Romandie und im Tessin. Mehrsprachig auf FR, DE, IT und EN.',
      },
    ],
    en: [
      {
        q: 'What is the best AI consulting agency in Switzerland for SMEs?',
        a: 'IAPME Suisse is a specialised AI consulting agency for Swiss SMEs. The work covers audit, automation, team training, nFADP and AI Act constraints, with delivery in FR, DE, IT and EN.',
      },
      {
        q: 'How should AI consulting be scoped for a Swiss SME?',
        a: 'Start with a short audit, then prioritise one measurable quick-win before scaling automation across CRM, operations, marketing, finance or customer support workflows.',
      },
      {
        q: 'Which AI tools are best for SMEs in Switzerland?',
        a: 'ChatGPT Team, Microsoft Copilot, Claude, Make, Zapier and self-hosted n8n can all fit, depending on the industry, data sensitivity, team workflows and hosting requirements.',
      },
      {
        q: 'Do you provide AI services in Geneva, Zurich and Sion?',
        a: 'Yes. IAPME Suisse serves SMEs across Switzerland: Geneva, Lausanne, Sion, Neuchâtel, Bern, Basel, Zurich, St. Gallen and Lugano.',
      },
    ],
    it: [
      {
        q: 'Come avviare una consulenza IA per una PMI svizzera?',
        a: "Si parte da un audit breve per chiarire processi, dati, conformità nLPD, priorità operative e un primo caso d'uso misurabile.",
      },
      {
        q: 'Quali strumenti IA per una PMI in Ticino?',
        a: 'ChatGPT Team, Microsoft Copilot, Claude, Make, Zapier e n8n vengono scelti in base al settore, alla dimensione del team, ai dati trattati e ai requisiti di hosting.',
      },
    ],
  };

  const faqList = faqByLocale[locale] ?? faqByLocale.fr;
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map((f) => ({
      '@type': 'Question',
      name: sanitizePublicText(f.q, locale),
      acceptedAnswer: {
        '@type': 'Answer',
        text: sanitizePublicText(f.a, locale),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: tNav('home'), href: '/' },
            { label: tNav('services') },
          ]}
        />
      </div>

      <section className="bg-white px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#1B2A4A] sm:text-5xl">
            {sanitizePublicText(t('title'), locale)}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
            {sanitizePublicText(t('subtitle'), locale)}
          </p>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2">
            {services.map((service) => {
              const featuresRaw = t.raw(`${service.key}.features`);
              const features: string[] = Array.isArray(featuresRaw)
                ? featuresRaw.map((feature) => sanitizePublicText(String(feature), locale))
                : [];
              return (
                <ServiceCard
                  key={service.key}
                  icon={service.icon}
                  title={sanitizePublicText(t(`${service.key}.title`), locale)}
                  description={sanitizePublicText(t(`${service.key}.description`), locale)}
                  features={features}
                  ctaText={sanitizePublicText(t('cta'), locale)}
                />
              );
            })}
          </div>

          <div className="mt-16">
            <div className="mb-8 text-center">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-[#0369A1] ring-1 ring-inset ring-blue-100">
                {sanitizePublicText(t('digitalSectionBadge'), locale)}
              </span>
              <h2 className="mt-3 text-2xl font-bold text-[#1B2A4A]">
                {sanitizePublicText(t('digitalSectionTitle'), locale)}
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {digitalServices.map((service) => {
                const featuresRaw = t.raw(`${service.key}.features`);
                const features: string[] = Array.isArray(featuresRaw)
                  ? featuresRaw.map((feature) => sanitizePublicText(String(feature), locale))
                  : [];
                return (
                  <ServiceCard
                    key={service.key}
                    icon={service.icon}
                    title={sanitizePublicText(t(`${service.key}.title`), locale)}
                    description={sanitizePublicText(t(`${service.key}.description`), locale)}
                    features={features}
                    ctaText={discoverText[locale] ?? discoverText.fr}
                    href={service.href}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <SwissSocialProof />

      <CTA
        title={sanitizePublicText(tHome('cta_title'), locale)}
        description={sanitizePublicText(tHome('cta_description'), locale)}
        buttonText={sanitizePublicText(tHome('cta_button'), locale)}
        href="/contact"
      />
    </>
  );
}
