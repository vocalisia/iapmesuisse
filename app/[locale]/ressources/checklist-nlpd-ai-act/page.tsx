import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getAlternates } from '@/lib/metadata';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTA from '@/components/CTA';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    fr: 'Checklist nLPD + AI Act pour PME suisses · IAPME Suisse',
    de: 'Checkliste nDSG + AI Act für Schweizer KMU · IAPME Suisse',
    en: 'nFADP + AI Act Checklist for Swiss SMEs · IAPME Suisse',
    it: 'Checklist nLPD + AI Act per PMI svizzere · IAPME Suisse',
  };
  const descs: Record<string, string> = {
    fr: 'Checklist 12 points conformité nLPD + AI Act pour PME suisses. Lecture en ligne immédiate, version PDF sur simple email.',
    de: '12-Punkte-Checkliste nDSG + AI Act für Schweizer KMU. Sofort online lesen, PDF-Version per E-Mail.',
    en: '12-point nFADP + AI Act compliance checklist for Swiss SMEs. Read online instantly, PDF version on request.',
    it: 'Checklist 12 punti conformità nLPD + AI Act per PMI svizzere. Lettura online immediata, versione PDF su richiesta.',
  };
  return {
    title: titles[locale] ?? titles.fr,
    description: descs[locale] ?? descs.fr,
    alternates: getAlternates(locale, '/ressources/checklist-nlpd-ai-act'),
  };
}

const T: Record<
  string,
  {
    breadcrumb: string;
    breadcrumbResources: string;
    h1: string;
    intro: string;
    pointsTitle: string;
    points: { num: number; title: string; desc: string; nlpd: boolean; aiact: boolean }[];
    legendNlpd: string;
    legendAiact: string;
    actionTitle: string;
    actionDesc: string;
    cta: string;
    relatedTitle: string;
    related: { title: string; href: string }[];
  }
> = {
  fr: {
    breadcrumb: 'Checklist nLPD + AI Act',
    breadcrumbResources: 'Ressources',
    h1: 'Checklist nLPD + AI Act pour PME suisses · 12 points',
    intro:
      "Évaluez en 5 minutes la conformité de votre PME aux deux principaux cadres réglementaires applicables à l'IA en Suisse en 2026 : la nLPD (loi fédérale sur la protection des données, septembre 2023) et l'AI Act européen (rollout 2025-2027). Si vous cochez moins de 7 points sur 12, un audit IA gratuit est urgent.",
    pointsTitle: 'Les 12 points de la checklist',
    points: [
      { num: 1, title: 'Registre des activités de traitement à jour', desc: 'Art. 12 nLPD. Liste écrite de tous les traitements de données personnelles avec finalité, durée, destinataires.', nlpd: true, aiact: false },
      { num: 2, title: 'Inventaire des outils IA utilisés (incl. shadow IT)', desc: 'Outils IA déclarés ET utilisés sans validation IT. ChatGPT gratuit avec données client = violation art. 8 nLPD.', nlpd: true, aiact: true },
      { num: 3, title: 'Classification AI Act des systèmes IA', desc: '4 niveaux : inacceptable (interdit), haut risque, limité (transparence), minimal. Voir notre guide.', nlpd: false, aiact: true },
      { num: 4, title: 'Information transparente aux utilisateurs', desc: 'Art. 19 nLPD + AI Act. Mention "vous interagissez avec une IA" pour chatbots, IA générative.', nlpd: true, aiact: true },
      { num: 5, title: 'DPO ou conseiller à la protection des données', desc: 'Pas obligatoire pour toutes PME mais recommandé dès 50 employés ou traitements à risque.', nlpd: true, aiact: false },
      { num: 6, title: 'Analyse d\'impact (AIPD) pour traitements à risque', desc: 'Art. 22 nLPD. Obligatoire pour profilage à grande échelle, données sensibles, biométrie.', nlpd: true, aiact: true },
      { num: 7, title: 'Contrats sous-traitants IA conformes', desc: 'Microsoft, OpenAI, Anthropic, Google. Data Processing Agreement (DPA) signé, art. 9 nLPD.', nlpd: true, aiact: true },
      { num: 8, title: 'Hébergement données : Suisse ou UE adéquate', desc: 'Microsoft 365 Suisse Nord, Infomaniak, OVH FR. Pas de transfert hors UE/Suisse sans clauses contractuelles.', nlpd: true, aiact: false },
      { num: 9, title: 'Politique d\'utilisation IA interne (charte salariés)', desc: 'Document signé par chaque collaborateur listant outils autorisés, données admises, cas interdits.', nlpd: true, aiact: true },
      { num: 10, title: 'Formation des équipes utilisatrices (art. 4 AI Act)', desc: 'Obligatoire depuis 2 février 2025. Formation initiale 2-4h + mise à jour annuelle.', nlpd: false, aiact: true },
      { num: 11, title: 'Mécanisme de notification de violation 72h', desc: 'Art. 24 nLPD. Procédure écrite, contacts identifiés, modèle de notification au PFPDT.', nlpd: true, aiact: false },
      { num: 12, title: 'Logs d\'utilisation IA conservés 6 mois minimum', desc: 'Article 12 AI Act. Journal d\'utilisation pour systèmes haut risque et audit traçable.', nlpd: false, aiact: true },
    ],
    legendNlpd: 'nLPD',
    legendAiact: 'AI Act',
    actionTitle: 'Vous cochez moins de 7 points sur 12 ?',
    actionDesc: "Un audit IA gratuit cartographie vos écarts et propose un plan d'action 90 jours pour atteindre la conformité, sans engagement.",
    cta: "Réserver mon audit gratuit",
    relatedTitle: 'Pour aller plus loin',
    related: [
      { title: 'Guide audit IA gratuit · checklist nLPD + AI Act', href: '/blog/audit-ia-gratuit-pme-suisse-checklist-nlpd' },
      { title: 'AI Act EU & PME suisses · conformité 2026', href: '/blog/ai-act-eu-pme-suisse-conformite-2026' },
      { title: 'nLPD et IA · obligations PME suisses', href: '/blog/nlpd-ia-obligations-pme' },
      { title: 'Études de cas PME romandes', href: '/blog/etudes-cas-pme-romandes-ia' },
    ],
  },
  de: {
    breadcrumb: 'Checkliste nDSG + AI Act',
    breadcrumbResources: 'Ressourcen',
    h1: 'Checkliste nDSG + AI Act für Schweizer KMU · 12 Punkte',
    intro:
      "Bewerten Sie in 5 Minuten die Konformität Ihres KMU mit den zwei wichtigsten Regelwerken für KI in der Schweiz 2026: dem nDSG (revidiertes Datenschutzgesetz, September 2023) und dem EU AI Act (Rollout 2025-2027). Bei weniger als 7 von 12 Punkten ist ein kostenloses KI-Audit dringend empfohlen.",
    pointsTitle: 'Die 12 Punkte der Checkliste',
    points: [
      { num: 1, title: 'Aktuelles Verzeichnis der Verarbeitungstätigkeiten', desc: 'Art. 12 nDSG. Schriftliche Liste aller Datenverarbeitungen mit Zweck, Dauer, Empfängern.', nlpd: true, aiact: false },
      { num: 2, title: 'Inventar der genutzten KI-Tools (inkl. Shadow IT)', desc: 'Erklärte UND ungenehmigt genutzte KI-Tools. Kostenloses ChatGPT mit Kundendaten = Art. 8 nDSG-Verstoss.', nlpd: true, aiact: true },
      { num: 3, title: 'AI-Act-Klassifizierung der KI-Systeme', desc: '4 Stufen: inakzeptabel (verboten), hoch (HR/Scoring), begrenzt (Transparenz), minimal.', nlpd: false, aiact: true },
      { num: 4, title: 'Transparente Nutzerinformation', desc: 'Art. 19 nDSG + AI Act. Hinweis "Sie interagieren mit einer KI" für Chatbots, generative KI.', nlpd: true, aiact: true },
      { num: 5, title: 'DSB oder Datenschutzberater benannt', desc: 'Nicht für alle KMU obligatorisch, empfohlen ab 50 Mitarbeitenden oder Risikoverarbeitungen.', nlpd: true, aiact: false },
      { num: 6, title: 'DSFA für Risikoverarbeitungen', desc: 'Art. 22 nDSG. Obligatorisch für umfangreiche Profiling, sensible Daten, Biometrie.', nlpd: true, aiact: true },
      { num: 7, title: 'Konforme KI-Auftragsverarbeitungsverträge', desc: 'Microsoft, OpenAI, Anthropic, Google. AVV (DPA) unterzeichnet, Art. 9 nDSG.', nlpd: true, aiact: true },
      { num: 8, title: 'Datenhosting: Schweiz oder angemessene EU', desc: 'Microsoft 365 Schweiz Nord, Infomaniak, OVH FR. Keine Drittland-Übermittlung ohne Standardvertragsklauseln.', nlpd: true, aiact: false },
      { num: 9, title: 'Interne KI-Nutzungsrichtlinie (Mitarbeiter-Charta)', desc: 'Von jedem Mitarbeitenden unterzeichnetes Dokument: erlaubte Tools, zulässige Daten, verbotene Fälle.', nlpd: true, aiact: true },
      { num: 10, title: 'Schulung der Anwenderteams (Art. 4 AI Act)', desc: 'Verpflichtend seit 2. Februar 2025. Initiale 2-4h-Schulung + jährliches Update.', nlpd: false, aiact: true },
      { num: 11, title: 'Datenpannen-Meldemechanismus binnen 72h', desc: 'Art. 24 nDSG. Schriftliches Verfahren, identifizierte Kontakte, Meldevorlage an EDÖB.', nlpd: true, aiact: false },
      { num: 12, title: 'KI-Nutzungslogs mindestens 6 Monate', desc: 'Art. 12 AI Act. Nutzungsjournal für Hochrisikosysteme und nachvollziehbare Audits.', nlpd: false, aiact: true },
    ],
    legendNlpd: 'nDSG',
    legendAiact: 'AI Act',
    actionTitle: 'Weniger als 7 von 12 Punkten erfüllt?',
    actionDesc: 'Ein kostenloses KI-Audit kartiert Ihre Lücken und schlägt einen 90-Tage-Aktionsplan vor — unverbindlich.',
    cta: 'Kostenloses Audit buchen',
    relatedTitle: 'Vertiefung',
    related: [
      { title: 'Kostenloses KI-Audit · Checkliste nDSG + AI Act', href: '/blog/audit-ia-gratuit-pme-suisse-checklist-nlpd' },
      { title: 'EU AI Act & Schweizer KMU 2026', href: '/blog/ai-act-eu-pme-suisse-conformite-2026' },
      { title: 'nDSG und KI · Pflichten Schweizer KMU', href: '/blog/nlpd-ia-obligations-pme' },
      { title: 'Fallstudien KMU Romandie', href: '/blog/etudes-cas-pme-romandes-ia' },
    ],
  },
  en: {
    breadcrumb: 'nFADP + AI Act Checklist',
    breadcrumbResources: 'Resources',
    h1: 'nFADP + AI Act Checklist for Swiss SMEs · 12 Points',
    intro:
      "Assess in 5 minutes your SME's compliance with the two main regulations applicable to AI in Switzerland in 2026: the nFADP (revised Federal Act on Data Protection, September 2023) and the EU AI Act (rollout 2025-2027). If you tick fewer than 7 out of 12 points, a free AI audit is urgent.",
    pointsTitle: 'The 12 checklist points',
    points: [
      { num: 1, title: 'Up-to-date register of processing activities', desc: 'Art. 12 nFADP. Written list of all personal data processing with purpose, duration, recipients.', nlpd: true, aiact: false },
      { num: 2, title: 'Inventory of AI tools used (incl. shadow IT)', desc: 'Declared AND unsanctioned AI tools. Free ChatGPT with client data = Art. 8 nFADP breach.', nlpd: true, aiact: true },
      { num: 3, title: 'AI Act classification of AI systems', desc: '4 levels: unacceptable (banned), high risk, limited (transparency), minimal.', nlpd: false, aiact: true },
      { num: 4, title: 'Transparent user information', desc: 'Art. 19 nFADP + AI Act. "You are interacting with an AI" notice for chatbots, generative AI.', nlpd: true, aiact: true },
      { num: 5, title: 'DPO or data protection advisor appointed', desc: 'Not mandatory for all SMEs but recommended from 50 employees or risk processing.', nlpd: true, aiact: false },
      { num: 6, title: 'Data Protection Impact Assessment for high-risk', desc: 'Art. 22 nFADP. Mandatory for large-scale profiling, sensitive data, biometrics.', nlpd: true, aiact: true },
      { num: 7, title: 'Compliant AI processor contracts', desc: 'Microsoft, OpenAI, Anthropic, Google. Signed DPA, Art. 9 nFADP.', nlpd: true, aiact: true },
      { num: 8, title: 'Data hosting: Switzerland or adequate EU', desc: 'Microsoft 365 Switzerland North, Infomaniak, OVH FR. No third-country transfer without SCCs.', nlpd: true, aiact: false },
      { num: 9, title: 'Internal AI usage policy (employee charter)', desc: 'Document signed by each employee: allowed tools, permitted data, forbidden cases.', nlpd: true, aiact: true },
      { num: 10, title: 'Team training (Art. 4 AI Act)', desc: 'Mandatory since 2 February 2025. 2-4h initial training + annual refresh.', nlpd: false, aiact: true },
      { num: 11, title: '72h breach notification mechanism', desc: 'Art. 24 nFADP. Written procedure, identified contacts, FDPIC notification template.', nlpd: true, aiact: false },
      { num: 12, title: 'AI usage logs retained 6+ months', desc: 'Art. 12 AI Act. Usage journal for high-risk systems and traceable audits.', nlpd: false, aiact: true },
    ],
    legendNlpd: 'nFADP',
    legendAiact: 'AI Act',
    actionTitle: 'Tick fewer than 7 out of 12?',
    actionDesc: 'A free AI audit maps your gaps and proposes a 90-day action plan to compliance, no commitment.',
    cta: 'Book my free audit',
    relatedTitle: 'Go further',
    related: [
      { title: 'Free AI audit guide · nFADP + AI Act checklist', href: '/blog/audit-ia-gratuit-pme-suisse-checklist-nlpd' },
      { title: 'EU AI Act & Swiss SMEs · 2026 compliance', href: '/blog/ai-act-eu-pme-suisse-conformite-2026' },
      { title: 'nFADP & AI · Swiss SME obligations', href: '/blog/nlpd-ia-obligations-pme' },
      { title: 'Swiss SME case studies', href: '/blog/etudes-cas-pme-romandes-ia' },
    ],
  },
  it: {
    breadcrumb: 'Checklist nLPD + AI Act',
    breadcrumbResources: 'Risorse',
    h1: 'Checklist nLPD + AI Act per PMI svizzere · 12 punti',
    intro:
      "Valuti in 5 minuti la conformità della sua PMI alle due principali regolamentazioni applicabili all'IA in Svizzera nel 2026: la nLPD (legge federale rivista sulla protezione dei dati, settembre 2023) e l'AI Act UE (rollout 2025-2027). Se spunta meno di 7 punti su 12, un audit IA gratuito è urgente.",
    pointsTitle: 'I 12 punti della checklist',
    points: [
      { num: 1, title: 'Registro delle attività di trattamento aggiornato', desc: 'Art. 12 nLPD. Lista scritta di tutti i trattamenti con finalità, durata, destinatari.', nlpd: true, aiact: false },
      { num: 2, title: 'Inventario degli strumenti IA utilizzati (incl. shadow IT)', desc: 'Strumenti dichiarati E non autorizzati. ChatGPT gratuito con dati clienti = violazione art. 8 nLPD.', nlpd: true, aiact: true },
      { num: 3, title: 'Classificazione AI Act dei sistemi IA', desc: '4 livelli: inaccettabile (vietato), alto rischio, limitato (trasparenza), minimo.', nlpd: false, aiact: true },
      { num: 4, title: 'Informazione trasparente agli utenti', desc: 'Art. 19 nLPD + AI Act. Avviso "interagisci con un\'IA" per chatbot, IA generativa.', nlpd: true, aiact: true },
      { num: 5, title: 'DPO o consulente alla protezione dei dati', desc: 'Non obbligatorio per tutte le PMI ma raccomandato dai 50 dipendenti o trattamenti a rischio.', nlpd: true, aiact: false },
      { num: 6, title: 'DPIA per trattamenti ad alto rischio', desc: 'Art. 22 nLPD. Obbligatoria per profilazione su larga scala, dati sensibili, biometria.', nlpd: true, aiact: true },
      { num: 7, title: 'Contratti conformi con responsabili IA', desc: 'Microsoft, OpenAI, Anthropic, Google. DPA firmato, art. 9 nLPD.', nlpd: true, aiact: true },
      { num: 8, title: 'Hosting dati: Svizzera o paese UE adeguato', desc: 'Microsoft 365 Svizzera Nord, Infomaniak, OVH FR. Nessun trasferimento extra-UE senza SCC.', nlpd: true, aiact: false },
      { num: 9, title: 'Politica interna utilizzo IA (carta dipendenti)', desc: 'Documento firmato da ogni collaboratore: strumenti autorizzati, dati ammessi, casi vietati.', nlpd: true, aiact: true },
      { num: 10, title: 'Formazione dei team (art. 4 AI Act)', desc: 'Obbligatoria dal 2 febbraio 2025. Formazione iniziale 2-4h + aggiornamento annuale.', nlpd: false, aiact: true },
      { num: 11, title: 'Meccanismo di notifica violazione 72h', desc: 'Art. 24 nLPD. Procedura scritta, contatti identificati, modello di notifica all\'IFPDT.', nlpd: true, aiact: false },
      { num: 12, title: 'Log di utilizzo IA conservati 6+ mesi', desc: 'Art. 12 AI Act. Diario di utilizzo per sistemi ad alto rischio e audit tracciabili.', nlpd: false, aiact: true },
    ],
    legendNlpd: 'nLPD',
    legendAiact: 'AI Act',
    actionTitle: 'Spunta meno di 7 punti su 12?',
    actionDesc: 'Un audit IA gratuito cartografa le sue lacune e propone un piano d\'azione 90 giorni alla conformità, senza impegno.',
    cta: 'Prenoto il mio audit gratuito',
    relatedTitle: 'Per approfondire',
    related: [
      { title: 'Guida audit IA gratuito · checklist nLPD + AI Act', href: '/blog/audit-ia-gratuit-pme-suisse-checklist-nlpd' },
      { title: 'AI Act UE & PMI svizzere · conformità 2026', href: '/blog/ai-act-eu-pme-suisse-conformite-2026' },
      { title: 'nLPD e IA · obblighi PMI svizzere', href: '/blog/nlpd-ia-obligations-pme' },
      { title: 'Studi di caso PMI svizzere', href: '/blog/etudes-cas-pme-romandes-ia' },
    ],
  },
};

export default async function ChecklistPage({ params }: Props) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const t = T[locale] ?? T.fr;

  // FAQPage schema for generated answers
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: t.h1,
    description: t.intro,
    step: t.points.map((p) => ({
      '@type': 'HowToStep',
      position: p.num,
      name: p.title,
      text: p.desc,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: tNav('home'), href: '/' },
            { label: t.breadcrumbResources, href: '/ressources' },
            { label: t.breadcrumb },
          ]}
        />
      </div>

      <section className="bg-[#1B2A4A] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.h1}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-200">{t.intro}</p>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">{t.pointsTitle}</h2>
          <ul className="mt-8 space-y-4">
            {t.points.map((p) => (
              <li
                key={p.num}
                className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-5 sm:flex-row sm:items-start"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-base font-bold text-white">
                  {p.num}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-primary">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-700">{p.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.nlpd && (
                      <span className="inline-block rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                        {t.legendNlpd}
                      </span>
                    )}
                    {p.aiact && (
                      <span className="inline-block rounded-md border border-purple-200 bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-700">
                        {t.legendAiact}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-gray-light px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">{t.actionTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-700">
            {t.actionDesc}
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-accent-dark"
          >
            {t.cta}
          </Link>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-primary sm:text-3xl">
            {t.relatedTitle}
          </h2>
          <ul className="space-y-3">
            {t.related.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href as `/${string}`}
                  className="block rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm font-medium text-primary transition-all hover:border-accent hover:text-accent"
                >
                  → {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTA
        title={t.actionTitle}
        description={t.actionDesc}
        buttonText={t.cta}
        href="/contact"
      />
    </>
  );
}
