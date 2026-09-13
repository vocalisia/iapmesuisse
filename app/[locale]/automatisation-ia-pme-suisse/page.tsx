import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getAlternates } from '@/lib/metadata';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTA from '@/components/CTA';
import Image from 'next/image';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: 'Automatisation IA pour PME suisses | IAPME Suisse',
    de: 'KI-Automatisierung für Schweizer KMU: vollständiger Leitfaden 2026 | IAPME Suisse',
    en: 'AI automation for Swiss SMEs: complete guide 2026 | IAPME Suisse',
    it: 'Automazione IA per PMI svizzere: guida completa 2026 | IAPME Suisse',
  };
  const descs: Record<string, string> = {
    fr: 'Automatisation IA pour PME suisses : qualification de demandes, relances, rendez-vous, documents et veille commerciale. Méthode, garde-fous et conformité nLPD.',
    de: 'KI-Automatisierung für Schweizer KMU: konkrete Abläufe, menschliche Kontrolle und nDSG-Rahmen.',
    en: 'AI automation for Swiss SMEs: practical workflows, human oversight and nFADP considerations.',
    it: 'Automazione IA per PMI svizzere: flussi pratici, controllo umano e aspetti nLPD.',
  };

  return {
    title: titles[locale] ?? titles.fr,
    description: descs[locale] ?? descs.fr,
    alternates: getAlternates(locale, '/automatisation-ia-pme-suisse'),
    openGraph: {
      title: titles[locale] ?? titles.fr,
      description: descs[locale] ?? descs.fr,
      type: 'article',
      locale,
    },
  };
}

const T = {
  fr: {
    breadcrumbLabel: 'Automatisation IA PME',
    hero_title: 'Automatisation IA pour PME suisses',
    hero_subtitle: 'Des agents utiles, contrôlés et mesurables',
    hero_desc: 'Transformez les demandes, messages et documents qui s\'accumulent en processus suivis. Cette page présente les agents IA que nous pouvons déployer pour une PME suisse, avec une validation humaine et un cadre nLPD dès le départ.',
    cta_audit: 'Demander un audit gratuit',
    cta_consulting: 'Voir nos offres de conseil',
    s1_title: "Qu'est-ce que l'automatisation IA pour une PME suisse ?",
    s1_p1: "L'automatisation IA combine un processus clair, des outils connectés et un contrôle humain. Elle sert à préparer une réponse, classer une demande, relancer un prospect, extraire une information d'un document ou signaler une action à traiter. Elle ne remplace pas le jugement de la direction ni la relation client lorsqu'une décision engage l'entreprise.",
    s1_p2: "Pour une PME, le bon point de départ n'est pas un agent qui fait tout : c'est un flux concret, un responsable identifié, une règle d'escalade et un indicateur de résultat. Les études suisses soulignent que l'automatisation et l'efficacité sont les bénéfices les plus recherchés, alors que la sécurité des données et la traçabilité restent des priorités.",
    s2_title: 'Les outils d\'automatisation IA adaptés aux PME suisses',
    s2_tools: [
      { name: 'Make (ex-Integromat)', use: 'Orchestration de workflows multi-étapes', deployment: 'SaaS européen possible', star: false },
      { name: 'n8n (auto-hébergé)', use: 'Workflows connectés et contrôle de l\'hébergement', deployment: 'Auto-hébergeable', star: false },
      { name: 'ChatGPT / Claude', use: 'Rédaction, analyse, réponse client, synthèse', deployment: 'Politique données requise', star: false },
      { name: 'Bexio + IA', use: 'Comptabilité automatisée, facturation, rappels', deployment: 'Écosystème suisse', star: false },
      { name: 'HubSpot CRM', use: 'Qualification de leads, nurturing automatisé', deployment: 'Connecteurs CRM', star: false },
      { name: 'Vocalis', use: 'Accueil téléphonique et qualification des demandes', deployment: 'Routage multilingue', star: false },
    ],
    s2_star: 'À évaluer selon les données, les accès et le processus concerné',
    s3_title: 'Mesurer un agent IA avant de l\'étendre',
    s3_desc: 'Nous définissons une ligne de départ puis mesurons le flux réel. Aucun gain n\'est promis avant d\'avoir observé vos volumes, vos outils et vos règles métier.',
    s3_stats: [
      { label: 'Délai de première réponse', value: 'Réactivité', detail: 'Temps entre la demande et la prise en charge' },
      { label: 'Demandes qualifiées', value: 'Qualité', detail: 'Informations complètes avant transmission à l\'équipe' },
      { label: 'Relances utiles', value: 'Suivi', detail: 'Prospects relancés selon une règle et un consentement définis' },
      { label: 'Escalades humaines', value: 'Contrôle', detail: 'Cas sensibles remis à la bonne personne au bon moment' },
    ],
    s3_calc_title: 'Le cadrage qui rend le résultat vérifiable',
    s3_calc_desc: 'Chaque pilote commence avec un périmètre, une ligne de départ et des critères d\'arrêt explicites.',
    s4_title: 'Spécificités suisses : nLPD, multilinguisme et hébergement local',
    s4_nlpd_title: 'Conformité nLPD (loi fédérale sur la protection des données)',
    s4_nlpd: "La nLPD encadre le traitement de données personnelles en Suisse. Un projet d'automatisation doit notamment définir sa finalité, limiter les données et les accès, documenter les traitements, protéger les informations et informer les personnes de manière appropriée. Les exigences précises dépendent du processus et du niveau de risque.",
    s4_nlpd_tips: [
      "Cartographier les données, les sous-traitants, les accès et les destinations avant le déploiement",
      'Définir une base de connaissance approuvée et une règle d\'escalade humaine pour chaque agent',
      'Appliquer la minimisation des données et la conservation limitée au besoin métier',
      'Faire évaluer les traitements à risque élevé avec la personne compétente en protection des données',
    ],
    s4_multi_title: 'Multilinguisme : l\'avantage suisse',
    s4_multi: "Une PME suisse peut devoir interagir en français, allemand, italien et anglais selon sa clientèle. Les langues, les contenus de référence et les règles de transfert doivent être testés sur vos cas réels avant mise en production.",
    s5_title: 'Les 5 agents IA que votre PME peut déployer en priorité',
    s5_cases: [
      {
        sector: 'Agent de qualification et de relance',
        icon: '①',
        uses: ['Lit les demandes entrantes, extrait les besoins et les transmet dans votre CRM', 'Demande les informations manquantes avec un scénario validé', 'Relance seulement les contacts autorisés et signale les priorités à un commercial'],
        roi: 'À suivre : délai de réponse, complétude des demandes et rendez-vous obtenus',
      },
      {
        sector: 'Assistant WhatsApp commercial',
        icon: '②',
        uses: ['Répond aux questions récurrentes à partir de contenus approuvés', 'Recueille le contexte avant de proposer un créneau ou un rappel', 'Bascule vers une personne quand une demande est sensible, complexe ou hors périmètre'],
        roi: 'À suivre : délai de réponse, conversations prises en charge et qualité des transferts',
      },
      {
        sector: 'Agent de prise de rendez-vous',
        icon: '③',
        uses: ['Propose des créneaux selon les disponibilités réellement partagées', 'Confirme, rappelle et prépare le motif du rendez-vous', 'Ne prend aucune décision commerciale, médicale, financière ou assurantielle à votre place'],
        roi: 'À suivre : rendez-vous confirmés, annulations et temps administratif évité',
      },
      {
        sector: 'Agent de dossiers et documents',
        icon: '④',
        uses: ['Vérifie la présence des pièces attendues sans statuer sur leur validité métier', 'Classe les documents dans le bon dossier et demande les éléments manquants', 'Conserve une trace de la source, de l\'action et du responsable de validation'],
        roi: 'À suivre : dossiers complets, délais de traitement et erreurs détectées avant transmission',
      },
      {
        sector: 'Agent de veille commerciale',
        icon: '⑤',
        uses: ['Surveille les sources publiques définies avec vous : appels d\'offres, changements sectoriels ou signaux de marché', 'Résume les éléments pertinents et les relie à vos secteurs ou comptes cibles', 'Laisse la vérification, la décision et toute prise de contact à votre équipe'],
        roi: 'À suivre : alertes pertinentes, opportunités examinées et décisions documentées',
      },
    ],
    s6_title: 'Roadmap 90 jours : automatiser votre PME étape par étape',
    s6_phases: [
      {
        phase: 'Phase 1 — Jours 1-30',
        title: 'Audit et diagnostic',
        steps: [
          'Cartographie des processus répétitifs (≥ 5h/semaine = candidat à l\'automatisation)',
          'Sélection de 2-3 processus prioritaires (ratio impact/effort)',
          'Choix des outils adaptés à votre secteur et contraintes nLPD',
          'Configuration de base et tests en environnement isolé',
        ],
        deliverable: 'Stratégie d\'automatisation documentée + plan d\'action chiffré',
      },
      {
        phase: 'Phase 2 — Jours 31-60',
        title: 'Déploiement pilote',
        steps: [
          'Mise en production des premières automatisations sur périmètre restreint',
          'Formation des collaborateurs concernés (demi-journée max)',
          'Intégration avec systèmes existants (ERP, CRM, messagerie)',
          'Mesure des premiers KPI : temps gagné, erreurs réduites, satisfaction',
        ],
        deliverable: '2-3 automatisations opérationnelles, équipes formées',
      },
      {
        phase: 'Phase 3 — Jours 61-90',
        title: 'Optimisation et extension',
        steps: [
          'Analyse du ROI réel vs. estimé',
          'Ajustements et optimisations des workflows',
          'Identification des prochains processus à automatiser',
          'Rapport ROI à la direction + plan d\'extension 6 mois',
        ],
        deliverable: 'ROI mesuré, plan d\'extension validé, processus d\'amélioration continue',
      },
    ],
    faq_title: 'Questions fréquentes sur l\'automatisation IA pour PME suisses',
    faqs: [
      {
        q: 'Comment cadrer l\'automatisation IA pour une PME suisse ?',
        a: 'Un projet pilote se cadre selon vos outils, vos données et le niveau d\'intégration attendu. L\'audit initial sert à définir un quick-win mesurable, les risques nLPD et les étapes de déploiement adaptées à votre PME.',
      },
      {
        q: 'Faut-il des compétences techniques pour automatiser les processus ?',
        a: 'Non. Les outils modernes comme Make, Zapier ou n8n fonctionnent en mode no-code avec des interfaces visuelles. Pour les intégrations complexes, un partenaire spécialisé comme IAPME Suisse prend en charge l\'ensemble du déploiement.',
      },
      {
        q: 'L\'automatisation IA est-elle conforme à la nLPD suisse ?',
        a: 'La conformité dépend du traitement concret : données utilisées, finalité, personnes concernées, sous-traitants, accès et mesures de sécurité. Le projet doit être cadré dès la conception et, si nécessaire, revu avec la personne compétente en protection des données.',
      },
      {
        q: 'Quand sait-on si un agent IA fonctionne ?',
        a: 'Après une phase pilote définie avec vous : le processus, les cas d\'escalade et les indicateurs sont comparés à une ligne de départ. Un agent n\'est étendu que si les résultats et les garde-fous sont validés.',
      },
      {
        q: 'Peut-on automatiser en plusieurs langues pour le marché suisse ?',
        a: 'Oui. Les solutions d\'automatisation modernes supportent nativement le français, l\'allemand, l\'italien et l\'anglais. C\'est un avantage décisif pour les PME suisses qui opèrent sur plusieurs régions linguistiques.',
      },
    ],
    internal_links_title: 'Cluster complet — guides et outils',
    internal_links: [
      { href: '/blog/make-vs-n8n-vs-zapier-pme-suisse-comparatif-2026', label: 'Make vs n8n vs Zapier : comparatif outils d\'automatisation pour PME suisse' },
      { href: '/blog/n8n-auto-heberge-pme-suisse-nlpd', label: 'n8n auto-hébergé : automatisation souveraine et conformité nLPD' },
      { href: '/blog/agents-ia-autonomes-pme-suisse-2026', label: 'Agents IA autonomes pour PME suisses (2026)' },
      { href: '/blog/automatisation-whatsapp-business-ia-pme-suisse', label: 'Automatisation WhatsApp Business avec IA en FR/DE/IT' },
      { href: '/blog/automatisation-emails-ia-pme-suisse-guide-2026', label: 'Automatisation des e-mails par IA : guide complet 2026' },
      { href: '/blog/outils-ia-gratuits-pme-suisse-top-15-2026', label: 'Top 15 des outils IA gratuits pour PME suisses' },
      { href: '/blog/integration-bexio-ia-pme-suisse-guide-2026', label: 'Intégration de Bexio avec l\'IA : guide complet 2026' },
      { href: '/blog/copilot-microsoft-365-pme-suisse-guide-2026', label: 'Microsoft Copilot pour PME suisses : guide et conformité' },
      { href: '/blog/dpo-nlpd-ia-obligations-pratiques-pme-suisse', label: 'DPO et nLPD face à l\'IA : obligations pratiques' },
      { href: '/blog/automatisation-processus-ia-guide-pratique-pme-suisses', label: 'Automatisation des processus par IA : guide pratique' },
      { href: '/blog/automatisation-service-client-ia-suisse', label: 'Automatisation du service client par IA' },
      { href: '/blog/automatisation-ventes-prospection-suisse', label: 'Automatisation des ventes et prospection B2B' },
      { href: '/blog/automatiser-comptabilite-ia', label: 'Automatiser la comptabilité avec l\'IA' },
      { href: '/blog/chatbot-ia-service-client-pme-suisse', label: 'Chatbot IA pour service client multilingue' },
      { href: '/blog/assistant-vocal-ia-pme-guide-complet', label: 'Assistant vocal IA pour PME : guide complet' },
      { href: '/blog/roi-intelligence-artificielle-pme-suisse', label: 'Méthode complète de calcul ROI IA pour PME' },
      { href: '/blog/nlpd-ia-obligations-pme', label: 'nLPD et IA : obligations concrètes pour les PME' },
      { href: '/blog/ai-act-eu-pme-suisse-conformite-2026', label: 'AI Act EU : conformité PME suisse 2026' },
      { href: '/chatbot-ia-entreprise-suisse', label: 'Chatbot IA pour entreprise suisse : guide complet 2026' },
      { href: '/agence-ia-suisse', label: 'Agence IA pour PME suisses : choisir le bon partenaire' },
      { href: '/ki-beratung-kmu-schweiz', label: 'KI-Beratung für KMU Schweiz : guide complet 2026' },
      { href: '/blog/ki-beratung-kmu-schweiz-guide-2026', label: 'Comment choisir un consultant IA pour PME suisse' },
      { href: '/blog/ia-generative-pme-suisses-guide-2026', label: 'IA générative pour PME suisses : guide pratique 2026' },
      { href: '/blog/cloud-migration-pme-suisse-guide-2026', label: 'Migration cloud et marketing automation pour PME suisse' },
      { href: '/formation-ia-pme', label: 'Formation IA pour dirigeants et collaborateurs de PME' },
      { href: '/consulting', label: 'Conseil IA pour PME — nos offres d\'accompagnement' },
      { href: '/services', label: 'Services IA pour PME suisses' },
      { href: '/cantons', label: 'IA par canton : pages dédiées Genève, Vaud, Valais, Zurich…' },
      { href: '/contact', label: 'Audit IA gratuit (30 min)' },
    ],
  },
};

export default async function AutomatisationPillarPage({ params }: Props) {
  const { locale } = await params;
  const tData = T[locale as keyof typeof T] ?? T.fr;
  const t = await getTranslations({ locale, namespace: 'nav' });
  const tHome = await getTranslations({ locale, namespace: 'home' });

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Automatisation IA pour PME suisses',
    description: tData.hero_desc,
    author: {
      '@type': 'Person',
      name: 'Laurent Duplat',
      jobTitle: 'Consultant IA & Transformation digitale PME',
      sameAs: [
        'https://www.linkedin.com/in/vocalisia/',
        'https://x.com/VocalisAi',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'IAPME Suisse',
      url: 'https://iapmesuisse.ch',
    },
    datePublished: '2026-05-08',
    dateModified: '2026-09-12',
    mainEntityOfPage: `https://iapmesuisse.ch/fr/automatisation-ia-pme-suisse`,
    url: `https://iapmesuisse.ch/fr/automatisation-ia-pme-suisse`,
    image: 'https://iapmesuisse.ch/images/iapmesuisse-automatisation-ia-pme-pilier-20260912.png',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tData.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: t('home'), href: '/' },
            { label: tData.breadcrumbLabel },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="bg-white px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-3 inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#FF0000]">
            Guide pilier 2026
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#1B2A4A] sm:text-5xl">
            {tData.hero_title}
            <span className="mt-2 block text-2xl font-semibold text-[#FF0000] sm:text-3xl">
              {tData.hero_subtitle}
            </span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            {tData.hero_desc}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#FF0000] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
            >
              {tData.cta_audit}
            </Link>
            <Link
              href="/consulting"
              className="inline-flex items-center justify-center rounded-lg border border-[#1B2A4A] px-6 py-3 text-sm font-semibold text-[#1B2A4A] transition-colors hover:bg-[#1B2A4A] hover:text-white"
            >
              {tData.cta_consulting}
            </Link>
          </div>
          <figure className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
            <Image
              src="/images/iapmesuisse-automatisation-ia-pme-pilier-20260912.png"
              alt="Équipe de PME suisse qui valide un processus d'automatisation IA"
              width={1672}
              height={940}
              className="h-auto w-full object-cover"
              priority
            />
            <figcaption className="px-4 py-3 text-xs leading-relaxed text-gray-600">
              Illustration créée pour IAPME Suisse : l&apos;automatisation prépare et trace les actions, l&apos;équipe garde la décision.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Section 1 — Définition */}
      <section className="bg-gray-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B2A4A] sm:text-3xl">{tData.s1_title}</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-700">{tData.s1_p1}</p>
          <p className="mt-3 text-base leading-relaxed text-gray-700">{tData.s1_p2}</p>
        </div>
      </section>

      {/* Section 2 — Outils */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B2A4A] sm:text-3xl">{tData.s2_title}</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left">
                  <th className="px-4 py-3 font-semibold text-[#1B2A4A]">Outil</th>
                  <th className="px-4 py-3 font-semibold text-[#1B2A4A]">Usage principal</th>
                  <th className="px-4 py-3 font-semibold text-[#1B2A4A]">Déploiement</th>
                </tr>
              </thead>
              <tbody>
                {tData.s2_tools.map((tool, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-[#1B2A4A]">
                      {tool.name}
                      {tool.star && (
                        <span className="ml-2 rounded bg-green-100 px-1.5 py-0.5 text-xs font-semibold text-green-700">
                          nLPD
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{tool.use}</td>
                    <td className="px-4 py-3 text-gray-600">{tool.deployment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-xs text-gray-500">
              {tData.s2_star}
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — Mesure */}
      <section className="bg-gray-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B2A4A] sm:text-3xl">{tData.s3_title}</h2>
          <p className="mt-3 text-base leading-relaxed text-gray-700">{tData.s3_desc}</p>

          {/* Stats grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {tData.s3_stats.map((stat, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-6">
                <p className="text-3xl font-extrabold text-[#FF0000]">{stat.value}</p>
                <p className="mt-1 font-semibold text-[#1B2A4A]">{stat.label}</p>
                <p className="mt-1 text-sm text-gray-500">{stat.detail}</p>
              </div>
            ))}
          </div>

          {/* Cadre de mesure */}
          <div className="mt-10 rounded-2xl bg-[#1B2A4A] p-8 text-white">
            <h3 className="text-xl font-bold">{tData.s3_calc_title}</h3>
            <p className="mt-2 text-sm text-gray-300">{tData.s3_calc_desc}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-white/10 p-4">
                <p className="text-sm font-semibold text-gray-200">Périmètre</p>
                <p className="mt-1 text-lg font-bold">Un flux précis</p>
                <p className="text-xs text-gray-400">Une source, un responsable et une sortie définis</p>
              </div>
              <div className="rounded-lg bg-white/10 p-4">
                <p className="text-sm font-semibold text-gray-200">Contrôle</p>
                <p className="mt-1 text-lg font-bold">Validation humaine</p>
                <p className="text-xs text-gray-400">Escalade obligatoire pour les exceptions et les cas sensibles</p>
              </div>
              <div className="rounded-lg bg-[#FF0000]/80 p-4">
                <p className="text-sm font-semibold text-white">Décision</p>
                <p className="mt-1 text-lg font-bold">Mesure avant extension</p>
                <p className="text-xs text-red-200">Les indicateurs réels guident la suite du déploiement</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-400">
              La méthode de mesure est adaptée à votre processus, vos données et vos obligations.{' '}
              <Link href="/blog/roi-intelligence-artificielle-pme-suisse" className="underline hover:text-white">
                Voir la méthode complète de calcul ROI
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 — Spécificités suisses */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B2A4A] sm:text-3xl">{tData.s4_title}</h2>

          <div className="mt-6 rounded-xl border-l-4 border-[#FF0000] bg-red-50 p-6">
            <h3 className="text-lg font-bold text-[#1B2A4A]">{tData.s4_nlpd_title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">{tData.s4_nlpd}</p>
            <ul className="mt-4 space-y-2">
              {tData.s4_nlpd_tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-0.5 h-4 w-4 shrink-0 text-[#FF0000]">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-6">
            <h3 className="text-lg font-bold text-[#1B2A4A]">{tData.s4_multi_title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">{tData.s4_multi}</p>
          </div>
        </div>
      </section>

      {/* Section 5 — Cas d'usage sectoriels */}
      <section className="bg-gray-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B2A4A] sm:text-3xl">{tData.s5_title}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {tData.s5_cases.map((c, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-6">
                <p className="text-2xl">{c.icon}</p>
                <h3 className="mt-2 text-base font-bold text-[#1B2A4A]">{c.sector}</h3>
                <ul className="mt-3 space-y-1.5">
                  {c.uses.map((u, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-0.5 text-[#FF0000]">→</span>
                      {u}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs font-semibold text-green-700">{c.roi}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 text-sm leading-relaxed text-gray-700">
            <h3 className="font-bold text-[#1B2A4A]">Le cadre de confiance d&apos;un agent IA</h3>
            <p className="mt-2">
              L&apos;agent travaille dans un périmètre documenté : données minimisées, accès limités, journal des actions,
              contenu approuvé et relais humain. Il n&apos;effectue pas de décision automatisée à fort impact et ne remplace
              pas l&apos;expertise métier. Ces points sont particulièrement importants lorsque des données personnelles sont traitées.
            </p>
            <p className="mt-3 text-xs text-gray-500">
              Contexte : l&apos;<a href="https://www.raiffeisen.ch/content/dam/www/rch/firmenkunden/unternehmerthemen/mittelstandstudie/2024/kmu-mittelstandstudie-2024-fr.pdf" className="text-[#FF0000] hover:underline" rel="noreferrer">Étude PME Suisse 2024 de Raiffeisen</a>
              identifie l&apos;automatisation et les gains d&apos;efficacité parmi les principaux bénéfices perçus, tout en soulignant
              les enjeux de sécurité des données et de traçabilité. Le <a href="https://www.edoeb.admin.ch/fr/ia-et-protection-des-donnees" className="text-[#FF0000] hover:underline" rel="noreferrer">PFPDT rappelle que la LPD s&apos;applique directement aux traitements de données recourant à l&apos;IA</a>.
              Pour les obligations applicables, consultez aussi notre{' '}
              <Link href="/blog/nlpd-ia-obligations-pme" className="text-[#FF0000] hover:underline">guide nLPD pour PME</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6 — Roadmap 90 jours */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B2A4A] sm:text-3xl">{tData.s6_title}</h2>
          <div className="mt-6 space-y-6">
            {tData.s6_phases.map((phase, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF0000] text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#FF0000]">{phase.phase}</p>
                    <h3 className="mt-0.5 text-lg font-bold text-[#1B2A4A]">{phase.title}</h3>
                    <ul className="mt-3 space-y-1.5">
                      {phase.steps.map((step, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF0000]" />
                          {step}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-xs font-medium text-gray-500">
                      Livrable : {phase.deliverable}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B2A4A] sm:text-3xl">{tData.faq_title}</h2>
          <div className="mt-6 space-y-4">
            {tData.faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-6">
                <p className="font-semibold text-[#1B2A4A]">{faq.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maillage interne */}
      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-lg font-bold text-[#1B2A4A]">{tData.internal_links_title}</h2>
          <ul className="mt-4 space-y-2">
            {tData.internal_links.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href as '/consulting'}
                  className="flex items-center gap-2 text-sm text-[#FF0000] hover:underline"
                >
                  <span>→</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA final */}
      <CTA
        title={tHome('cta_title')}
        description={tHome('cta_description')}
        buttonText={tHome('cta_button')}
        href="/contact"
      />
    </>
  );
}
