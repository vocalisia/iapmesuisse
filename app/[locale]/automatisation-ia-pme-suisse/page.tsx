import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getAlternates } from '@/lib/metadata';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTA from '@/components/CTA';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: 'Automatisation IA pour PME suisses : guide complet 2026 | IAPME Suisse',
    de: 'KI-Automatisierung für Schweizer KMU: vollständiger Leitfaden 2026 | IAPME Suisse',
    en: 'AI automation for Swiss SMEs: complete guide 2026 | IAPME Suisse',
    it: 'Automazione IA per PMI svizzere: guida completa 2026 | IAPME Suisse',
  };
  const descs: Record<string, string> = {
    fr: 'Automatisez votre PME suisse avec l\'IA : outils, ROI, conformité nLPD, cas d\'usage concrets. Guide 2026 pour PME romandes, alémaniques et tessinoises. Résultats en 30 jours.',
    de: 'KI-Automatisierung für Schweizer KMU: Tools, ROI, nDSG-Konformität, konkrete Anwendungsfälle. Leitfaden 2026. Ergebnisse in 30 Tagen.',
    en: 'AI automation for Swiss SMEs: tools, ROI, nFADP compliance, real use cases. 2026 guide. Results in 30 days.',
    it: 'Automazione IA per PMI svizzere: strumenti, ROI, conformità nLPD, casi d\'uso concreti. Guida 2026. Risultati in 30 giorni.',
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
    hero_subtitle: 'Guide complet 2026',
    hero_desc: 'Réduisez vos coûts opérationnels de 20 à 35 %, libérez vos équipes des tâches répétitives et restez conformes à la nLPD. Conçu pour les PME de Suisse romande, alémanique et italophone.',
    cta_audit: 'Demander un audit gratuit',
    cta_consulting: 'Voir nos offres de conseil',
    s1_title: "Qu'est-ce que l'automatisation IA pour une PME suisse ?",
    s1_p1: "L'automatisation IA désigne l'utilisation de l'intelligence artificielle pour exécuter des tâches répétitives ou basées sur des règles à la place de vos collaborateurs : saisie de documents, réponse aux emails, qualification de leads, gestion des stocks, relances clients. Ce n'est pas de la robotique industrielle — c'est du software intelligent, déployable en quelques semaines, sans équipe IT interne.",
    s1_p2: "En Suisse, 42 % des PME ont déjà intégré au moins un outil d'automatisation (OFS, 2025). Celles qui n'ont pas encore franchi le pas risquent de perdre en compétitivité face à des concurrents qui traitent deux fois plus de demandes clients avec le même effectif.",
    s2_title: 'Les outils d\'automatisation IA adaptés aux PME suisses',
    s2_tools: [
      { name: 'Make (ex-Integromat)', use: 'Orchestration de workflows multi-étapes', price: 'Dès CHF 9/mois', star: false },
      { name: 'n8n (auto-hébergé)', use: 'Souveraineté des données, hébergement Infomaniak/Exoscale', price: 'Gratuit (self-hosted)', star: true },
      { name: 'ChatGPT / Claude', use: 'Rédaction, analyse, réponse client, synthèse', price: 'Dès CHF 20/mois', star: false },
      { name: 'Bexio + IA', use: 'Comptabilité automatisée, facturation, rappels', price: 'Dès CHF 49/mois', star: false },
      { name: 'HubSpot CRM', use: 'Qualification de leads, nurturing automatisé', price: 'Gratuit → payant', star: false },
      { name: 'Vocalis', use: 'Accueil téléphonique IA 24h/24 en FR/DE/IT', price: 'Dès CHF 150/mois', star: true },
    ],
    s2_star: 'Recommandé pour conformité nLPD',
    s3_title: 'ROI de l\'automatisation IA : chiffres concrets pour PME suisses',
    s3_desc: 'La réduction des coûts opérationnels est mesurable dès le premier trimestre. Voici les benchmarks issus de projets réels en Suisse romande (2024-2026) :',
    s3_stats: [
      { label: 'Réduction des coûts opérationnels', value: '20–35 %', detail: 'Sur les processus automatisés' },
      { label: 'Délai moyen de retour sur investissement', value: '8–14 mois', detail: 'Pour PME services (10-50 emp.)' },
      { label: 'Gain de temps administratif', value: '12–18h/mois', detail: 'Par collaborateur concerné' },
      { label: 'Taux d\'appels traités sans intervention', value: '60–70 %', detail: 'Avec agent vocal IA' },
    ],
    s3_calc_title: 'Calculateur ROI simplifié',
    s3_calc_desc: 'Estimez votre retour sur investissement IA en quelques secondes :',
    s4_title: 'Spécificités suisses : nLPD, multilinguisme et hébergement local',
    s4_nlpd_title: 'Conformité nLPD (loi fédérale sur la protection des données)',
    s4_nlpd: "La nLPD, en vigueur depuis septembre 2023, impose aux PME suisses qui automatisent le traitement de données personnelles de respecter quatre principes : transparence envers les personnes concernées, minimisation des données, sécurité technique et documentation des traitements. Non-conformité : amendes jusqu'à CHF 250 000 pour les responsables.",
    s4_nlpd_tips: [
      "Privilégier l'hébergement Suisse (Infomaniak, Exoscale) ou UE pour tous outils d'automatisation",
      'Tenir un registre des activités de traitement automatisé',
      'Informer les clients lorsqu\'un agent IA répond en leur nom',
      'Réaliser une AIPD pour tout traitement à risque élevé (profilage, décisions automatisées)',
    ],
    s4_multi_title: 'Multilinguisme : l\'avantage suisse',
    s4_multi: "La Suisse est le seul marché où une PME doit pouvoir interagir en français, allemand, italien et parfois anglais avec ses clients. Les agents IA modernes gèrent nativement ces quatre langues — un avantage concurrentiel direct que vos concurrents étrangers n'ont pas.",
    s5_title: "Cas d'usage sectoriels : l'automatisation IA concrète",
    s5_cases: [
      {
        sector: 'Tourisme & hôtellerie',
        icon: '🏔',
        uses: ['Chatbot réservations multilingue (FR/DE/EN/ZH)', 'Revenue management automatisé (+8-15% RevPAR)', 'Personnalisation séjour par IA'],
        roi: 'ROI moyen : 50-90 % an 1',
      },
      {
        sector: 'Fiduciaires & services professionnels',
        icon: '📊',
        uses: ['OCR + intégration comptable automatisée (-80% temps saisie)', 'Revue automatique de documents', 'Veille réglementaire IA'],
        roi: 'ROI moyen : 55-85 % an 1',
      },
      {
        sector: 'Commerce de détail',
        icon: '🛍',
        uses: ['Prévision des ventes et optimisation des stocks', 'Chatbot WhatsApp pour commandes', 'Personnalisation des promotions'],
        roi: 'ROI moyen : 40-70 % an 1',
      },
      {
        sector: 'Viticulture & agroalimentaire',
        icon: '🍇',
        uses: ['Prévision des récoltes par données météo', 'Marketing digital automatisé', 'Traçabilité et certification automatisées'],
        roi: 'ROI moyen : 45-75 % an 1',
      },
      {
        sector: 'Construction & BTP',
        icon: '🏗',
        uses: ['Génération automatique de documents réglementaires', 'Suivi chantier et reporting IA', 'Qualification automatique des appels d\'offres'],
        roi: 'ROI moyen : 30-55 % an 1',
      },
      {
        sector: 'Santé & cabinets médicaux',
        icon: '🏥',
        uses: ['Prise de rendez-vous vocale IA 24h/24', 'Gestion automatique des rappels patients', 'Synthèse automatisée des dossiers'],
        roi: 'ROI moyen : 60-95 % an 1',
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
        q: 'Combien coûte l\'automatisation IA pour une PME suisse ?',
        a: 'Un projet pilote démarre entre CHF 500 et CHF 2 000/mois (outils SaaS + intégration). Le retour sur investissement moyen se situe entre 8 et 14 mois pour les PME de services. Les économies générées (CHF 5 000 à CHF 12 000/mois pour une PME de 25 employés) dépassent largement le coût.',
      },
      {
        q: 'Faut-il des compétences techniques pour automatiser les processus ?',
        a: 'Non. Les outils modernes comme Make, Zapier ou n8n fonctionnent en mode no-code avec des interfaces visuelles. Pour les intégrations complexes, un partenaire spécialisé comme IAPME Suisse prend en charge l\'ensemble du déploiement.',
      },
      {
        q: 'L\'automatisation IA est-elle conforme à la nLPD suisse ?',
        a: 'Oui, à condition de respecter la transparence, la minimisation des données et de privilégier un hébergement en Suisse ou dans l\'UE. IAPME Suisse intègre la conformité nLPD dans chaque projet dès la conception.',
      },
      {
        q: 'En combien de temps voit-on les premiers résultats ?',
        a: 'Les premières économies de temps apparaissent dès la fin du premier mois de déploiement. Le ROI financier positif est généralement atteint entre 8 et 14 mois selon le secteur et l\'ambition du projet.',
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
    headline: 'Automatisation IA pour PME suisses : guide complet 2026',
    description: tData.hero_desc,
    author: {
      '@type': 'Person',
      name: 'Laurent Duplat',
      jobTitle: 'Consultant IA & Transformation digitale PME',
    },
    publisher: {
      '@type': 'Organization',
      name: 'IAPME Suisse',
      url: 'https://iapmesuisse.ch',
    },
    datePublished: '2026-05-08',
    dateModified: '2026-05-08',
    mainEntityOfPage: `https://iapmesuisse.ch/fr/automatisation-ia-pme-suisse`,
    url: `https://iapmesuisse.ch/fr/automatisation-ia-pme-suisse`,
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
                  <th className="px-4 py-3 font-semibold text-[#1B2A4A]">Tarif indicatif</th>
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
                    <td className="px-4 py-3 text-gray-600">{tool.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-xs text-gray-500">
              Outils marqués nLPD = {tData.s2_star}
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — ROI + Calculateur */}
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

          {/* Calculateur ROI simplifié */}
          <div className="mt-10 rounded-2xl bg-[#1B2A4A] p-8 text-white">
            <h3 className="text-xl font-bold">{tData.s3_calc_title}</h3>
            <p className="mt-2 text-sm text-gray-300">{tData.s3_calc_desc}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-white/10 p-4">
                <p className="text-sm font-semibold text-gray-200">Salaire moyen CHF/mois</p>
                <p className="mt-1 text-2xl font-bold">7 500</p>
                <p className="text-xs text-gray-400">Médiane PME romande</p>
              </div>
              <div className="rounded-lg bg-white/10 p-4">
                <p className="text-sm font-semibold text-gray-200">Temps automatisable</p>
                <p className="mt-1 text-2xl font-bold">25–30 %</p>
                <p className="text-xs text-gray-400">Des tâches répétitives</p>
              </div>
              <div className="rounded-lg bg-[#FF0000]/80 p-4">
                <p className="text-sm font-semibold text-white">Gain annuel estimé</p>
                <p className="mt-1 text-2xl font-bold">CHF 22 500</p>
                <p className="text-xs text-red-200">Par collaborateur concerné</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-400">
              Estimation basée sur 1 collaborateur à CHF 7 500/mois, 25 % de tâches automatisées, 11 mois travaillés.{' '}
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
          <p className="mt-4 text-xs text-gray-500">
            Sources : OFS, Economiesuisse, Digitalswitzerland, études de cas PME romandes 2024-2026.{' '}
            <Link href="/blog/ia-pme-valais-sion" className="text-[#FF0000] hover:underline">
              Voir les cas concrets en Valais
            </Link>
          </p>
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
