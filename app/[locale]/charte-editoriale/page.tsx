import Breadcrumbs from '@/components/Breadcrumbs';
import { getAlternates } from '@/lib/metadata';
import { getTranslations } from 'next-intl/server';

type PolicyCopy = {
  title: string;
  description: string;
  intro: string;
  sections: { title: string; text: string }[];
};

const copyByLocale: Record<string, PolicyCopy> = {
  fr: {
    title: 'Charte éditoriale',
    description: 'Principes de publication, de mise à jour et de correction des contenus d’IAPME Suisse.',
    intro: 'Cette charte explique comment IAPME Suisse conçoit, publie et met à jour ses contenus destinés aux PME suisses.',
    sections: [
      {
        title: 'Utilité et clarté',
        text: 'Nos contenus ont pour objectif d’aider les dirigeants et leurs équipes à comprendre un sujet et à prendre une décision informée. Nous privilégions des explications concrètes, des limites explicites et des appels à l’action proportionnés.',
      },
      {
        title: 'Sources et mise à jour',
        text: 'Lorsqu’un contenu s’appuie sur des sources externes, celles qui sont utiles à sa vérification sont indiquées. Les contenus sont révisés lorsqu’une information importante devient obsolète ou lorsqu’un lecteur signale une erreur factuelle.',
      },
      {
        title: 'Corrections et intégrité',
        text: 'Nous corrigeons les erreurs substantielles dès qu’elles sont vérifiées et nous ne présentons pas une opinion, une estimation ou un résultat comme un fait établi. Les exemples servent à expliquer une démarche et ne garantissent pas un résultat identique pour chaque entreprise.',
      },
    ],
  },
  de: {
    title: 'Redaktionelle Leitlinien',
    description: 'Grundsätze für Veröffentlichung, Aktualisierung und Korrektur der Inhalte von IAPME Suisse.',
    intro: 'Diese Leitlinien erläutern, wie IAPME Suisse Inhalte für Schweizer KMU erstellt, veröffentlicht und aktualisiert.',
    sections: [
      {
        title: 'Nutzen und Klarheit',
        text: 'Unsere Inhalte sollen Führungskräften und ihren Teams helfen, ein Thema zu verstehen und fundierte Entscheidungen zu treffen. Wir bevorzugen konkrete Erklärungen, benannte Grenzen und angemessene Handlungsaufforderungen.',
      },
      {
        title: 'Quellen und Aktualisierung',
        text: 'Wenn ein Inhalt auf externen Quellen beruht, werden die für seine Überprüfung relevanten Quellen genannt. Inhalte werden überarbeitet, wenn wesentliche Informationen veraltet sind oder ein Leser einen sachlichen Fehler meldet.',
      },
      {
        title: 'Korrekturen und Integrität',
        text: 'Wir korrigieren wesentliche, bestätigte Fehler zeitnah und stellen Meinungen, Schätzungen oder Ergebnisse nicht als gesicherte Tatsachen dar. Beispiele erklären einen Ansatz und garantieren nicht für jedes Unternehmen dasselbe Ergebnis.',
      },
    ],
  },
  en: {
    title: 'Editorial policy',
    description: 'Publication, update and correction principles for IAPME Suisse content.',
    intro: 'This policy explains how IAPME Suisse prepares, publishes and updates content for Swiss SMEs.',
    sections: [
      {
        title: 'Usefulness and clarity',
        text: 'Our content is intended to help business leaders and their teams understand a topic and make informed decisions. We favour practical explanations, explicit limitations and proportionate calls to action.',
      },
      {
        title: 'Sources and updates',
        text: 'When content relies on external sources, sources useful for verification are identified. Content is reviewed when material information becomes outdated or when a reader reports a factual error.',
      },
      {
        title: 'Corrections and integrity',
        text: 'We correct verified material errors promptly and do not present an opinion, estimate or outcome as an established fact. Examples explain an approach and do not guarantee the same outcome for every business.',
      },
    ],
  },
  it: {
    title: 'Carta editoriale',
    description: 'Principi di pubblicazione, aggiornamento e correzione dei contenuti di IAPME Suisse.',
    intro: 'Questa carta spiega come IAPME Suisse prepara, pubblica e aggiorna i contenuti destinati alle PMI svizzere.',
    sections: [
      {
        title: 'Utilità e chiarezza',
        text: 'I nostri contenuti aiutano dirigenti e team a comprendere un argomento e a prendere decisioni informate. Privilegiamo spiegazioni pratiche, limiti espliciti e inviti all’azione proporzionati.',
      },
      {
        title: 'Fonti e aggiornamenti',
        text: 'Quando un contenuto si basa su fonti esterne, indichiamo quelle utili alla verifica. I contenuti vengono rivisti quando un’informazione rilevante diventa obsoleta o un lettore segnala un errore fattuale.',
      },
      {
        title: 'Correzioni e integrità',
        text: 'Correggiamo tempestivamente gli errori sostanziali verificati e non presentiamo opinioni, stime o risultati come fatti accertati. Gli esempi illustrano un approccio e non garantiscono lo stesso risultato per ogni impresa.',
      },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const policy = copyByLocale[locale] ?? copyByLocale.fr;

  return {
    title: policy.title,
    description: policy.description,
    alternates: getAlternates(locale, '/charte-editoriale'),
  };
}

export default async function EditorialPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const policy = copyByLocale[locale] ?? copyByLocale.fr;
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: tNav('home'), href: '/' }, { label: policy.title }]} />
      </div>
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-3xl font-bold text-[#1B2A4A] sm:text-4xl">{policy.title}</h1>
          <p className="mb-10 text-lg leading-relaxed text-gray-600">{policy.intro}</p>
          {policy.sections.map((section) => (
            <div key={section.title} className="mb-8">
              <h2 className="mb-3 text-xl font-bold text-[#1B2A4A]">{section.title}</h2>
              <p className="leading-relaxed text-gray-600">{section.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
