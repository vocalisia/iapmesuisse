import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getAlternates } from '@/lib/metadata';
import { CANTONS, getCantonBySlug } from '@/lib/cantons';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTA from '@/components/CTA';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ locale: string; canton: string }> };

export function generateStaticParams() {
  const locales = ['fr', 'de', 'en', 'it'];
  const params: { locale: string; canton: string }[] = [];
  for (const locale of locales) {
    for (const c of CANTONS) {
      params.push({ locale, canton: c.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props) {
  const { locale, canton: slug } = await params;
  const canton = getCantonBySlug(slug);
  if (!canton) return {};
  const name = canton.names[locale as keyof typeof canton.names] ?? canton.names.fr;

  const titles: Record<string, string> = {
    fr: `Audit IA gratuit & formation PME ${name} · IAPME Suisse`,
    de: `Kostenloses KI-Audit & Schulung KMU ${name} · IAPME Suisse`,
    en: `Free AI audit & training for SMEs in ${name} · IAPME Suisse`,
    it: `Audit IA gratuito & formazione PMI ${name} · IAPME Suisse`,
  };
  const descs: Record<string, string> = {
    fr: `Accompagnement IA pour les PME du canton de ${name}: audit gratuit, formation, intégration ChatGPT/Copilot/Claude. Conformité nLPD + AI Act. Devis 24h.`,
    de: `KI-Begleitung für KMU im Kanton ${name}: kostenloses Audit, Schulung, Integration von ChatGPT/Copilot/Claude. nDSG- und AI-Act-konform. Offerte in 24h.`,
    en: `AI support for SMEs in canton ${name}: free audit, training, ChatGPT/Copilot/Claude integration. nFADP + AI Act compliant. 24h quote.`,
    it: `Supporto IA per le PMI del cantone ${name}: audit gratuito, formazione, integrazione ChatGPT/Copilot/Claude. Conforme nLPD + AI Act. Preventivo in 24h.`,
  };

  return {
    title: titles[locale] ?? titles.fr,
    description: descs[locale] ?? descs.fr,
    alternates: getAlternates(locale, `/cantons/${slug}`),
  };
}

const T = {
  fr: {
    breadcrumbCantons: 'Cantons',
    h1: (n: string) => `Audit IA gratuit & formation pour PME du canton de ${n}`,
    intro: (n: string, count: string) =>
      `Vous dirigez une PME parmi les ${count} entreprises du canton de ${n} ? IAPME Suisse vous accompagne dans l'adoption concrète de l'intelligence artificielle : audit gratuit, formation des équipes, intégration d'outils. Conformité nLPD et AI Act garantie, ROI mesuré sous 4 à 12 semaines.`,
    citiesTitle: 'Villes principales desservies',
    sectorsTitle: 'Secteurs prioritaires en',
    fundingTitle: 'Aides cantonales mobilisables',
    servicesTitle: 'Nos services pour les PME du canton',
    services: [
      { title: 'Audit IA gratuit', desc: '30 à 60 min en visio + rapport sous 48h. Cartographie processus, 5 quick-wins, score maturité IA, roadmap 90 jours.', href: '/contact' },
      { title: 'Formation IA équipe', desc: 'Sur mesure, FR/DE/IT. Programme adapté au niveau de votre équipe, conforme art. 4 AI Act.', href: '/formation-ia-pme' },
      { title: 'Intégration outils', desc: 'ChatGPT Team, Microsoft Copilot, Claude Pro, Make/Zapier. Hébergement Suisse ou UE adéquate.', href: '/services' },
      { title: 'Consulting IA', desc: 'Audit Express, accompagnement 90 jours, mise en conformité nLPD + AI Act.', href: '/consulting' },
    ],
    whyTitle: 'Pourquoi choisir IAPME Suisse',
    whyItems: [
      'Spécialisation PME 5-50 employés (pas un cabinet généraliste)',
      'Multilingue FR · DE · IT · EN',
      'Conformité nLPD + AI Act intégrée à chaque mission',
      'Audit gratuit sans engagement, rapport PDF en 48h',
      'Devis personnalisé sous 24h',
      'Présence Suisse romande, alémanique et Tessin',
    ],
    relatedTitle: 'Ressources utiles',
    related: [
      { title: 'Audit IA gratuit · checklist nLPD + AI Act', href: '/blog/audit-ia-gratuit-pme-suisse-checklist-nlpd' },
      { title: 'AI Act EU & PME suisses : conformité 2026', href: '/blog/ai-act-eu-pme-suisse-conformite-2026' },
      { title: 'Comparatif formations IA · panorama cantons', href: '/blog/prix-formation-ia-pme-suisse-comparatif-cantons-chf' },
      { title: 'Études de cas PME romandes', href: '/blog/etudes-cas-pme-romandes-ia' },
    ],
    ctaTitle: (n: string) => `Démarrons votre projet IA dans le canton de ${n}`,
    ctaDesc: 'Réservez 30 minutes gratuites pour cartographier vos processus et identifier vos quick-wins IA.',
    ctaButton: 'Réserver mon audit gratuit',
  },
  de: {
    breadcrumbCantons: 'Kantone',
    h1: (n: string) => `Kostenloses KI-Audit & Schulung für KMU im Kanton ${n}`,
    intro: (n: string, count: string) =>
      `Sie führen ein KMU unter den ${count} Unternehmen im Kanton ${n}? IAPME Suisse begleitet Sie bei der konkreten Einführung von KI: kostenloses Audit, Teamschulung, Tool-Integration. nDSG- und AI-Act-konform, messbarer ROI in 4 bis 12 Wochen.`,
    citiesTitle: 'Bediente Hauptstädte',
    sectorsTitle: 'Priorisierte Branchen in',
    fundingTitle: 'Mobilisierbare kantonale Hilfen',
    servicesTitle: 'Unsere Leistungen für KMU im Kanton',
    services: [
      { title: 'Kostenloses KI-Audit', desc: '30-60 Min Videocall + Bericht in 48h. Prozesskartierung, 5 Quick Wins, Reifegrad-Score, 90-Tage-Roadmap.', href: '/contact' },
      { title: 'KI-Teamschulung', desc: 'Massgeschneidert, FR/DE/IT. An das Niveau Ihres Teams angepasst, konform Art. 4 AI Act.', href: '/formation-ia-pme' },
      { title: 'Tool-Integration', desc: 'ChatGPT Team, Microsoft Copilot, Claude Pro, Make/Zapier. Hosting Schweiz oder EU.', href: '/services' },
      { title: 'KI-Beratung', desc: 'Express-Audit, 90-Tage-Begleitung, Konformität nDSG + AI Act.', href: '/consulting' },
    ],
    whyTitle: 'Warum IAPME Suisse',
    whyItems: [
      'Spezialisierung KMU 5-50 Mitarbeitende',
      'Mehrsprachig FR · DE · IT · EN',
      'nDSG + AI Act in jeder Mission integriert',
      'Kostenloses Audit ohne Verpflichtung, PDF-Bericht in 48h',
      'Persönliche Offerte in 24h',
      'Präsenz Romandie, Deutschschweiz und Tessin',
    ],
    relatedTitle: 'Nützliche Ressourcen',
    related: [
      { title: 'Kostenloses KI-Audit · Checkliste nDSG + AI Act', href: '/blog/audit-ia-gratuit-pme-suisse-checklist-nlpd' },
      { title: 'EU AI Act & Schweizer KMU 2026', href: '/blog/ai-act-eu-pme-suisse-conformite-2026' },
      { title: 'KI-Schulungspreise · Kantonsvergleich', href: '/blog/prix-formation-ia-pme-suisse-comparatif-cantons-chf' },
      { title: 'Fallstudien KMU Romandie', href: '/blog/etudes-cas-pme-romandes-ia' },
    ],
    ctaTitle: (n: string) => `Starten wir Ihr KI-Projekt im Kanton ${n}`,
    ctaDesc: 'Buchen Sie 30 kostenlose Minuten, um Ihre Prozesse zu kartieren und Quick Wins zu identifizieren.',
    ctaButton: 'Kostenloses Audit buchen',
  },
  en: {
    breadcrumbCantons: 'Cantons',
    h1: (n: string) => `Free AI audit & training for SMEs in canton ${n}`,
    intro: (n: string, count: string) =>
      `You run an SME among the ${count} businesses in canton ${n}? IAPME Suisse supports concrete AI adoption: free audit, team training, tool integration. nFADP + AI Act compliant, measurable ROI in 4 to 12 weeks.`,
    citiesTitle: 'Main cities served',
    sectorsTitle: 'Priority sectors in',
    fundingTitle: 'Cantonal funding available',
    servicesTitle: 'Our services for SMEs in the canton',
    services: [
      { title: 'Free AI audit', desc: '30-60 min video call + report within 48h. Process mapping, 5 quick wins, AI maturity score, 90-day roadmap.', href: '/contact' },
      { title: 'Team AI training', desc: 'Custom, FR/DE/IT. Programme tailored to your team level, AI Act Art. 4 compliant.', href: '/formation-ia-pme' },
      { title: 'Tool integration', desc: 'ChatGPT Team, Microsoft Copilot, Claude Pro, Make/Zapier. Hosted in Switzerland or adequate EU.', href: '/services' },
      { title: 'AI consulting', desc: 'Express audit, 90-day support, nFADP + AI Act compliance.', href: '/consulting' },
    ],
    whyTitle: 'Why IAPME Suisse',
    whyItems: [
      'Specialised in SMEs 5-50 employees',
      'Multilingual FR · DE · IT · EN',
      'nFADP + AI Act baked into every mission',
      'Free no-commitment audit, PDF report within 48h',
      'Personalized 24h quote',
      'Presence French, German & Italian Switzerland',
    ],
    relatedTitle: 'Useful resources',
    related: [
      { title: 'Free AI audit · nFADP + AI Act checklist', href: '/blog/audit-ia-gratuit-pme-suisse-checklist-nlpd' },
      { title: 'EU AI Act & Swiss SMEs 2026', href: '/blog/ai-act-eu-pme-suisse-conformite-2026' },
      { title: 'AI training prices · canton comparison', href: '/blog/prix-formation-ia-pme-suisse-comparatif-cantons-chf' },
      { title: 'Swiss SME case studies', href: '/blog/etudes-cas-pme-romandes-ia' },
    ],
    ctaTitle: (n: string) => `Let's start your AI project in canton ${n}`,
    ctaDesc: 'Book 30 free minutes to map your processes and identify your AI quick wins.',
    ctaButton: 'Book my free audit',
  },
  it: {
    breadcrumbCantons: 'Cantoni',
    h1: (n: string) => `Audit IA gratuito & formazione per PMI del cantone ${n}`,
    intro: (n: string, count: string) =>
      `Lei dirige una PMI tra le ${count} aziende del cantone ${n}? IAPME Suisse l'accompagna nell'adozione concreta dell'IA: audit gratuito, formazione del team, integrazione strumenti. Conforme nLPD + AI Act, ROI misurato in 4-12 settimane.`,
    citiesTitle: 'Città principali servite',
    sectorsTitle: 'Settori prioritari in',
    fundingTitle: 'Aiuti cantonali mobilizzabili',
    servicesTitle: 'I nostri servizi per le PMI del cantone',
    services: [
      { title: 'Audit IA gratuito', desc: '30-60 min in videochiamata + rapporto entro 48h. Cartografia processi, 5 quick win, punteggio maturità, roadmap 90 giorni.', href: '/contact' },
      { title: 'Formazione team IA', desc: 'Su misura, FR/DE/IT. Programma adattato al livello del team, conforme art. 4 AI Act.', href: '/formation-ia-pme' },
      { title: 'Integrazione strumenti', desc: 'ChatGPT Team, Microsoft Copilot, Claude Pro, Make/Zapier. Hosting Svizzera o UE.', href: '/services' },
      { title: 'Consulting IA', desc: 'Audit Express, accompagnamento 90 giorni, conformità nLPD + AI Act.', href: '/consulting' },
    ],
    whyTitle: 'Perché IAPME Suisse',
    whyItems: [
      'Specializzazione PMI 5-50 dipendenti',
      'Multilingue FR · DE · IT · EN',
      'nLPD + AI Act integrati in ogni missione',
      'Audit gratuito senza impegno, rapporto PDF in 48h',
      'Preventivo personalizzato in 24h',
      'Presenza Svizzera romanda, tedesca e Ticino',
    ],
    relatedTitle: 'Risorse utili',
    related: [
      { title: 'Audit IA gratuito · checklist nLPD + AI Act', href: '/blog/audit-ia-gratuit-pme-suisse-checklist-nlpd' },
      { title: 'AI Act UE & PMI svizzere 2026', href: '/blog/ai-act-eu-pme-suisse-conformite-2026' },
      { title: 'Prezzi formazione IA · confronto cantonale', href: '/blog/prix-formation-ia-pme-suisse-comparatif-cantons-chf' },
      { title: 'Studi di caso PMI svizzere', href: '/blog/etudes-cas-pme-romandes-ia' },
    ],
    ctaTitle: (n: string) => `Avviamo il suo progetto IA nel cantone ${n}`,
    ctaDesc: 'Prenoti 30 minuti gratuiti per cartografare i suoi processi e identificare i suoi quick win.',
    ctaButton: 'Prenoto l\'audit gratuito',
  },
};

export default async function CantonPage({ params }: Props) {
  const { locale, canton: slug } = await params;
  const canton = getCantonBySlug(slug);
  if (!canton) notFound();

  const t = T[locale as keyof typeof T] ?? T.fr;
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const name = canton.names[locale as keyof typeof canton.names] ?? canton.names.fr;

  // Local schema.org for this canton page
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Audit IA & formation PME — ${name}`,
    serviceType: 'AI audit, training, integration',
    provider: {
      '@type': 'Organization',
      name: 'IAPME Suisse',
      url: 'https://iapmesuisse.ch',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name,
      addressCountry: 'CH',
    },
    offers: {
      '@type': 'Offer',
      description: 'Audit IA gratuit 30-60 minutes',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: tNav('home'), href: '/' },
            { label: t.breadcrumbCantons },
            { label: name },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="bg-[#1B2A4A] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Canton {canton.code} · Suisse
          </p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.h1(name)}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-200">
            {t.intro(name, canton.smeCount)}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-accent-dark"
            >
              {t.ctaButton}
            </Link>
          </div>
        </div>
      </section>

      {/* Cities + Sectors + Funding */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-xl font-bold text-primary">{t.citiesTitle}</h2>
            <ul className="mt-4 space-y-1.5 text-sm text-gray-700">
              {canton.cities.map((city) => (
                <li key={city}>· {city}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-xl font-bold text-primary">{t.sectorsTitle} {name}</h2>
            <ul className="mt-4 space-y-1.5 text-sm text-gray-700">
              {canton.topSectors.map((s) => (
                <li key={s}>· {s}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-xl font-bold text-primary">{t.fundingTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-700">{canton.funding}</p>
            <p className="mt-3 text-xs text-gray-500">
              + Programmes InnoSuisse et chèques innovation cantonaux.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gray-light px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary sm:text-4xl">
            {t.servicesTitle}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.services.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-lg font-bold text-primary">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-primary sm:text-4xl">
            {t.whyTitle}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {t.whyItems.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related resources */}
      <section className="bg-gray-light px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-primary sm:text-4xl">
            {t.relatedTitle}
          </h2>
          <ul className="space-y-3">
            {t.related.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="block rounded-lg border border-gray-200 bg-white p-4 text-sm font-medium text-primary transition-all hover:border-accent hover:text-accent"
                >
                  → {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTA title={t.ctaTitle(name)} description={t.ctaDesc} buttonText={t.ctaButton} href="/contact" />
    </>
  );
}
