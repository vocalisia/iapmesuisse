import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getAlternates } from '@/lib/metadata';
import { CANTONS, getCantonBySlug } from '@/lib/cantons';
import { VILLES } from '@/lib/villes';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTA from '@/components/CTA';
import { notFound } from 'next/navigation';

const VILLE_SLUG_BY_CITY: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const v of VILLES) {
    const localised = [v.names.fr, v.names.de, v.names.en, v.names.it];
    for (const n of localised) {
      map[n.toLowerCase()] = v.slug;
    }
    map[v.slug] = v.slug;
  }
  return map;
})();

function villeSlugForCity(city: string): string | undefined {
  const key = city.toLowerCase().split(' ')[0];
  return VILLE_SLUG_BY_CITY[key] ?? VILLE_SLUG_BY_CITY[city.toLowerCase()];
}

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
  const path = `/cantons/${slug}`;

  if (locale === 'de' && slug === 'zurich') {
    return {
      title: 'AI Beratung KMU Zürich: KI-Audit & Automation',
      description:
        'AI Beratung für KMU in Zürich: Prozesse, CRM, Kundenservice und Automatisierung mit nDSG/AI-Act-Konformität. Kostenloses Audit und klarer Fahrplan.',
      alternates: getAlternates(locale, path),
    };
  }

  const titles: Record<string, string> = {
    fr: `Audit IA gratuit & formation PME ${name} · IAPME Suisse`,
    de: `Kostenloses KI-Audit & Schulung KMU ${name} · IAPME Suisse`,
    en: `Free AI audit & training for SMEs in ${name} · IAPME Suisse`,
    it: `Audit IA gratuito & formazione PMI ${name} · IAPME Suisse`,
  };
  const descs: Record<string, string> = {
    fr: `Accompagnement IA pour les PME du canton de ${name}: audit gratuit, formation, intégration ChatGPT/Copilot/Claude. Conformité nLPD + AI Act.`,
    de: `KI-Begleitung für KMU im Kanton ${name}: kostenloses Audit, Schulung, Integration von ChatGPT/Copilot/Claude. nDSG- und AI-Act-konform.`,
    en: `AI support for SMEs in canton ${name}: free audit, training, ChatGPT/Copilot/Claude integration. nFADP + AI Act compliant.`,
    it: `Supporto IA per le PMI del cantone ${name}: audit gratuito, formazione, integrazione ChatGPT/Copilot/Claude. Conforme nLPD + AI Act.`,
  };

  return {
    title: titles[locale] ?? titles.fr,
    description: descs[locale] ?? descs.fr,
    alternates: getAlternates(locale, path),
  };
}

const T = {
  fr: {
    breadcrumbCantons: 'Cantons',
    h1: (n: string) => `Audit IA gratuit & formation pour PME du canton de ${n}`,
    intro: (n: string, count: string) =>
      `Vous dirigez une PME parmi les ${count} entreprises du canton de ${n} ? IAPME Suisse vous accompagne dans l'adoption concrète de l'intelligence artificielle : audit gratuit, formation des équipes, intégration d'outils. Conformité nLPD et AI Act garantie, priorités mesurables dès les premières semaines.`,
    citiesTitle: 'Villes principales desservies',
    sectorsTitle: 'Secteurs prioritaires en',
    fundingTitle: 'Aides cantonales mobilisables',
    servicesTitle: 'Nos services pour les PME du canton',
    services: [
      { title: 'Audit IA gratuit', desc: '30 à 60 min en visio + rapport sous 48h. Cartographie processus, 5 quick-wins, score maturité IA, roadmap 90 jours.', href: '/contact' },
      { title: 'Formation IA équipe', desc: 'Sur mesure, FR/DE/IT, adapt? ? vos Équipes. Conforme art. 4 AI Act.', href: '/formation-ia-pme' },
      { title: 'Intégration outils', desc: 'ChatGPT Team, Microsoft Copilot, Claude Pro, Make/Zapier. Hébergement Suisse ou UE adéquate.', href: '/services' },
      { title: 'Consulting IA', desc: 'Audit Express, accompagnement 90 jours, mise en conformité nLPD + AI Act.', href: '/consulting' },
    ],
    whyTitle: 'Pourquoi choisir IAPME Suisse',
    whyItems: [
      'Spécialisation PME 5-50 employés (pas un cabinet généraliste)',
      'Multilingue FR · DE · IT · EN',
      'Conformité nLPD + AI Act intégrée à chaque mission',
      'Audit gratuit sans engagement, rapport PDF en 48h',
      'Cadrage clair en échange privé',
      'Présence Suisse romande, alémanique et Tessin',
    ],
    relatedTitle: 'Ressources utiles',
    related: [
      { title: 'Audit IA gratuit · checklist nLPD + AI Act', href: '/blog/audit-ia-gratuit-pme-suisse-checklist-nlpd' },
      { title: 'AI Act EU & PME suisses : conformité 2026', href: '/blog/ai-act-eu-pme-suisse-conformite-2026' },
      { title: 'Formats de formation IA pour PME', href: '/formation-ia-pme' },
      { title: 'Études de cas PME romandes', href: '/blog/etudes-cas-pme-romandes-ia' },
    ],
    ctaTitle: (n: string) => `Démarrons votre projet IA dans le canton de ${n}`,
    ctaDesc: 'Réservez 30 minutes pour cartographier vos processus et identifier vos quick-wins IA.',
    ctaButton: 'Réserver mon audit gratuit',
  },
  de: {
    breadcrumbCantons: 'Kantone',
    h1: (n: string) => `Kostenloses KI-Audit & Schulung für KMU im Kanton ${n}`,
    intro: (n: string, count: string) =>
      `Sie führen ein KMU unter den ${count} Unternehmen im Kanton ${n}? IAPME Suisse begleitet Sie bei der konkreten Einführung von KI: kostenloses Audit, Teamschulung, Tool-Integration. nDSG- und AI-Act-konform, messbare Prioritäten ab den ersten Wochen.`,
    citiesTitle: 'Bediente Hauptstädte',
    sectorsTitle: 'Priorisierte Branchen in',
    fundingTitle: 'Mobilisierbare kantonale Hilfen',
    servicesTitle: 'Unsere Leistungen für KMU im Kanton',
    services: [
      { title: 'Kostenloses KI-Audit', desc: '30-60 Min Videocall + Bericht in 48h. Prozesskartierung, 5 Quick Wins, Reifegrad-Score, 90-Tage-Roadmap.', href: '/contact' },
      { title: 'KI-Teamschulung', desc: 'Massgeschneidert, FR/DE/IT, passend für Ihre Teams. Konform Art. 4 AI Act.', href: '/formation-ia-pme' },
      { title: 'Tool-Integration', desc: 'ChatGPT Team, Microsoft Copilot, Claude Pro, Make/Zapier. Hosting Schweiz oder EU.', href: '/services' },
      { title: 'KI-Beratung', desc: 'Express-Audit, 90-Tage-Begleitung, Konformität nDSG + AI Act.', href: '/consulting' },
    ],
    whyTitle: 'Warum IAPME Suisse',
    whyItems: [
      'Spezialisierung KMU 5-50 Mitarbeitende',
      'Mehrsprachig FR · DE · IT · EN',
      'nDSG + AI Act in jeder Mission integriert',
      'Kostenloses Audit ohne Verpflichtung, PDF-Bericht in 48h',
      'Klarer Projektumfang im privaten Austausch',
      'Präsenz Romandie, Deutschschweiz und Tessin',
    ],
    relatedTitle: 'Nützliche Ressourcen',
    related: [
      { title: 'Kostenloses KI-Audit · Checkliste nDSG + AI Act', href: '/blog/audit-ia-gratuit-pme-suisse-checklist-nlpd' },
      { title: 'EU AI Act & Schweizer KMU 2026', href: '/blog/ai-act-eu-pme-suisse-conformite-2026' },
      { title: 'KI-Schulungsformate für KMU', href: '/formation-ia-pme' },
      { title: 'Fallstudien KMU Romandie', href: '/blog/etudes-cas-pme-romandes-ia' },
    ],
    ctaTitle: (n: string) => `Starten wir Ihr KI-Projekt im Kanton ${n}`,
    ctaDesc: 'Buchen Sie 30 Minuten, um Ihre Prozesse zu kartieren und Quick Wins zu identifizieren.',
    ctaButton: 'Kostenloses Audit buchen',
  },
  en: {
    breadcrumbCantons: 'Cantons',
    h1: (n: string) => `Free AI audit & training for SMEs in canton ${n}`,
    intro: (n: string, count: string) =>
      `You run an SME among the ${count} businesses in canton ${n}? IAPME Suisse supports concrete AI adoption: free audit, team training, tool integration. nFADP + AI Act compliant, measurable priorities from the first weeks.`,
    citiesTitle: 'Main cities served',
    sectorsTitle: 'Priority sectors in',
    fundingTitle: 'Cantonal funding available',
    servicesTitle: 'Our services for SMEs in the canton',
    services: [
      { title: 'Free AI audit', desc: '30-60 min video call + report within 48h. Process mapping, 5 quick wins, AI maturity score, 90-day roadmap.', href: '/contact' },
      { title: 'Team AI training', desc: 'Custom, FR/DE/IT, adapted to your teams. Compliant with Art. 4 AI Act.', href: '/formation-ia-pme' },
      { title: 'Tool integration', desc: 'ChatGPT Team, Microsoft Copilot, Claude Pro, Make/Zapier. Hosted in Switzerland or adequate EU.', href: '/services' },
      { title: 'AI consulting', desc: 'Express audit, 90-day support, nFADP + AI Act compliance.', href: '/consulting' },
    ],
    whyTitle: 'Why IAPME Suisse',
    whyItems: [
      'Specialised in SMEs 5-50 employees',
      'Multilingual FR · DE · IT · EN',
      'nFADP + AI Act baked into every mission',
      'Free no-commitment audit, PDF report within 48h',
      'Clear scope in a private exchange',
      'Presence French, German & Italian Switzerland',
    ],
    relatedTitle: 'Useful resources',
    related: [
      { title: 'Free AI audit · nFADP + AI Act checklist', href: '/blog/audit-ia-gratuit-pme-suisse-checklist-nlpd' },
      { title: 'EU AI Act & Swiss SMEs 2026', href: '/blog/ai-act-eu-pme-suisse-conformite-2026' },
      { title: 'AI training formats for SMEs', href: '/formation-ia-pme' },
      { title: 'Swiss SME case studies', href: '/blog/etudes-cas-pme-romandes-ia' },
    ],
    ctaTitle: (n: string) => `Let's start your AI project in canton ${n}`,
    ctaDesc: 'Book 30 minutes to map your processes and identify your AI quick wins.',
    ctaButton: 'Book my free audit',
  },
  it: {
    breadcrumbCantons: 'Cantoni',
    h1: (n: string) => `Audit IA gratuito & formazione per PMI del cantone ${n}`,
    intro: (n: string, count: string) =>
      `Lei dirige una PMI tra le ${count} aziende del cantone ${n}? IAPME Suisse l'accompagna nell'adozione concreta dell'IA: audit gratuito, formazione del team, integrazione strumenti. Conforme nLPD + AI Act, priorità misurabili dalle prime settimane.`,
    citiesTitle: 'Città principali servite',
    sectorsTitle: 'Settori prioritari in',
    fundingTitle: 'Aiuti cantonali mobilizzabili',
    servicesTitle: 'I nostri servizi per le PMI del cantone',
    services: [
      { title: 'Audit IA gratuito', desc: '30-60 min in videochiamata + rapporto entro 48h. Cartografia processi, 5 quick win, punteggio maturità, roadmap 90 giorni.', href: '/contact' },
      { title: 'Formazione team IA', desc: 'Su misura, FR/DE/IT, adattata ai vostri team. Conforme art. 4 AI Act.', href: '/formation-ia-pme' },
      { title: 'Integrazione strumenti', desc: 'ChatGPT Team, Microsoft Copilot, Claude Pro, Make/Zapier. Hosting Svizzera o UE.', href: '/services' },
      { title: 'Consulting IA', desc: 'Audit Express, accompagnamento 90 giorni, conformità nLPD + AI Act.', href: '/consulting' },
    ],
    whyTitle: 'Perché IAPME Suisse',
    whyItems: [
      'Specializzazione PMI 5-50 dipendenti',
      'Multilingue FR · DE · IT · EN',
      'nLPD + AI Act integrati in ogni missione',
      'Audit gratuito senza impegno, rapporto PDF in 48h',
      'Perimetro chiaro in uno scambio privato',
      'Presenza Svizzera romanda, tedesca e Ticino',
    ],
    relatedTitle: 'Risorse utili',
    related: [
      { title: 'Audit IA gratuito · checklist nLPD + AI Act', href: '/blog/audit-ia-gratuit-pme-suisse-checklist-nlpd' },
      { title: 'AI Act UE & PMI svizzere 2026', href: '/blog/ai-act-eu-pme-suisse-conformite-2026' },
      { title: 'Formati di formazione IA per PMI', href: '/formation-ia-pme' },
      { title: 'Studi di caso PMI svizzere', href: '/blog/etudes-cas-pme-romandes-ia' },
    ],
    ctaTitle: (n: string) => `Avviamo il suo progetto IA nel cantone ${n}`,
    ctaDesc: 'Prenoti 30 minuti per cartografare i suoi processi e identificare i suoi quick win.',
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
  const isZurichGerman = locale === 'de' && slug === 'zurich';
  const h1 = isZurichGerman
    ? 'AI Beratung KMU Zürich: KI-Audit & Automation'
    : t.h1(name);
  const intro = isZurichGerman
    ? 'AI Beratung für KMU in Zürich: IAPME Suisse hilft Unternehmen bei CRM, Kundenservice, Dokumentenprozessen und Automatisierung. Der Start ist ein kostenloses Audit mit nDSG- und AI-Act-Check, danach folgt ein klarer Fahrplan für Quick Wins und sichere Tool-Integration.'
    : t.intro(name, canton.smeCount);

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

  // Locale-specific FAQ targeting "ia pme [canton] [city]" queries
  const mainCity = canton.cities[0];
  const faqMap: Record<string, { q: string; a: string }[]> = {
    fr: [
      {
        q: `Quels services IA proposez-vous aux PME du canton de ${name} ?`,
        a: `IAPME Suisse propose aux PME du canton de ${name} : audit IA gratuit (30-60 min), formation des équipes, intégration ChatGPT/Copilot/Claude, consulting stratégique. Conformité nLPD + AI Act incluse.`,
      },
      {
        q: `Intervenez-vous à ${mainCity} ?`,
        a: `Oui, IAPME Suisse intervient à ${mainCity} et dans toutes les villes principales du canton de ${name} (${canton.cities.join(', ')}). Sur site ou en visio, FR/DE/IT/EN.`,
      },
      {
        q: `Quelles aides cantonales pour un projet IA dans le canton de ${name} ?`,
        a: `${canton.funding}. Orientation possible vers InnoSuisse, les dispositifs d'innovation et les déductions liées à la formation continue.`,
      },
      {
        q: `Comment cadrer un audit IA pour une PME de ${name} ?`,
        a: `L'audit initial est gratuit (30-60 min en visio + rapport sous 48h). Les prochaines étapes sont cadrées en échange privé selon les processus, les données et les priorités de la PME.`,
      },
    ],
    de: [
      {
        q: `Welche KI-Leistungen bieten Sie KMU im Kanton ${name}?`,
        a: `IAPME Suisse bietet KMU im Kanton ${name}: kostenloses KI-Audit (30-60 Min), Teamschulung, ChatGPT/Copilot/Claude-Integration, strategische Beratung. nDSG + AI Act inklusive.`,
      },
      {
        q: `Sind Sie in ${mainCity} tätig?`,
        a: `Ja, IAPME Suisse ist in ${mainCity} und in allen Hauptstädten des Kantons ${name} aktiv (${canton.cities.join(', ')}). Vor Ort oder remote, FR/DE/IT/EN.`,
      },
      {
        q: `Welche kantonalen Förderungen für ein KI-Projekt im Kanton ${name}?`,
        a: `${canton.funding}. Zusätzlich prüfen wir InnoSuisse, Innovationsinstrumente und steuerliche Abzüge für Weiterbildung.`,
      },
      {
        q: `Wie wird ein KI-Audit für ein KMU in ${name} definiert?`,
        a: `Das Erst-Audit ist kostenlos (30-60 Min Videocall + Bericht in 48h). Die nächsten Schritte werden im privaten Austausch nach Prozessen, Datenlage und Prioritäten definiert.`,
      },
    ],
    en: [
      {
        q: `What AI services do you offer to SMEs in canton ${name}?`,
        a: `IAPME Suisse offers SMEs in canton ${name}: free AI audit (30-60 min), team training, ChatGPT/Copilot/Claude integration, strategic consulting. nFADP + AI Act compliance included.`,
      },
      {
        q: `Are you present in ${mainCity}?`,
        a: `Yes, IAPME Suisse serves ${mainCity} and all main cities in canton ${name} (${canton.cities.join(', ')}). On-site or remote, FR/DE/IT/EN.`,
      },
      {
        q: `What cantonal funding is available for an AI project in canton ${name}?`,
        a: `${canton.funding}. We also review InnoSuisse, innovation instruments and continuing-education tax deductions.`,
      },
      {
        q: `How is an AI audit scoped for an SME in ${name}?`,
        a: `Initial audit is free (30-60 min video call + 48h report). Next steps are scoped privately according to workflows, data and priorities.`,
      },
    ],
    it: [
      {
        q: `Quali servizi IA offrite alle PMI del cantone ${name}?`,
        a: `IAPME Suisse offre alle PMI del cantone ${name}: audit IA gratuito (30-60 min), formazione del team, integrazione ChatGPT/Copilot/Claude, consulenza strategica. Conformità nLPD + AI Act inclusa.`,
      },
      {
        q: `Operate a ${mainCity}?`,
        a: `Sì, IAPME Suisse opera a ${mainCity} e in tutte le città principali del cantone ${name} (${canton.cities.join(', ')}). In loco o in videochiamata, FR/DE/IT/EN.`,
      },
      {
        q: `Quali aiuti cantonali per un progetto IA nel cantone ${name}?`,
        a: `${canton.funding}. Valutiamo anche InnoSuisse, gli strumenti di innovazione e le deduzioni legate alla formazione continua.`,
      },
      {
        q: `Come si definisce un audit IA per una PMI di ${name}?`,
        a: `L'audit iniziale è gratuito (30-60 min in videochiamata + rapporto entro 48h). Le tappe successive sono definite in uno scambio privato secondo processi, dati e priorità.`,
      },
    ],
  };
  const cantonFaq = faqMap[locale] ?? faqMap.fr;
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cantonFaq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: tNav('home'), href: '/' },
            { label: t.breadcrumbCantons, href: '/cantons' },
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
            {h1}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-200">
            {intro}
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
              {canton.cities.map((city) => {
                const villeSlug = villeSlugForCity(city);
                return (
                  <li key={city}>
                    ·{' '}
                    {villeSlug ? (
                      <Link
                        href={`/villes/${villeSlug}`}
                        className="font-medium text-primary underline decoration-accent decoration-2 underline-offset-2 hover:text-accent"
                      >
                        {city}
                      </Link>
                    ) : (
                      city
                    )}
                  </li>
                );
              })}
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
              + Orientation vers les dispositifs InnoSuisse et innovation selon votre dossier.
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
