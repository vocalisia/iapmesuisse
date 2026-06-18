import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getAlternates } from '@/lib/metadata';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTA from '@/components/CTA';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: 'Agence IA pour PME suisses : choisir le bon partenaire 2026 | IAPME Suisse',
    de: 'KI-Agentur für Schweizer KMU: den richtigen Partner wählen 2026 | IAPME Suisse',
    en: 'AI agency for Swiss SMEs: choosing the right partner in 2026 | IAPME Suisse',
    it: 'Agenzia IA per PMI svizzere: scegliere il partner giusto nel 2026 | IAPME Suisse',
  };
  const descs: Record<string, string> = {
    fr: 'Agence IA pour PME suisses : critères de sélection, focus Lausanne/Genève, secteurs couverts, différence agence vs consultant. Guide expert pour choisir votre partenaire IA en Suisse en 2026.',
    de: 'KI-Agentur für Schweizer KMU: Auswahlkriterien, Fokus Lausanne/Genf, abgedeckte Branchen, Unterschied Agentur vs. Berater. Expertenratgeber zur Wahl Ihres KI-Partners in der Schweiz 2026.',
    en: 'AI agency for Swiss SMEs: selection criteria, Lausanne/Geneva focus, sectors covered, agency vs. consultant difference. Expert guide to choosing your AI partner in Switzerland in 2026.',
    it: 'Agenzia IA per PMI svizzere: criteri di selezione, focus Losanna/Ginevra, settori coperti, differenza agenzia vs consulente. Guida esperta per scegliere il vostro partner IA in Svizzera nel 2026.',
  };

  return {
    title: titles[locale] ?? titles.fr,
    description: descs[locale] ?? descs.fr,
    alternates: getAlternates(locale, '/agence-ia-suisse'),
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
    breadcrumbLabel: 'Agence IA Suisse',
    hero_title: 'Agence IA pour PME suisses',
    hero_subtitle: 'Choisir le bon partenaire en 2026',
    hero_desc: "Le marché des agences IA en Suisse a explosé en 2024–2026. Résultat : il est difficile de distinguer les vraies expertises des offres marketing. Ce guide vous donne les 5 critères décisifs, le comparatif agence vs consultant, et un focus sur les marchés de Lausanne et Genève.",
    cta_audit: 'Demander un audit gratuit 30 min',
    cta_services: 'Voir nos services IA',
    s1_title: "Qu'est-ce qu'une agence IA pour PME ?",
    s1_p1: "Une agence IA pour PME est une structure qui combine conseil stratégique, intégration technique et production de contenu ou d'automatisations basées sur l'intelligence artificielle. Contrairement à un consultant indépendant, une agence dispose d'équipes pluridisciplinaires : consultants, développeurs, data analysts, experts conformité.",
    s1_p2: "En Suisse, on distingue trois catégories d'agences IA pour PME : les agences full-service (stratégie + déploiement + formation), les agences spécialisées par secteur (fintech, healthtech, tourisme, fiduciaire) et les agences marketing IA (contenu, publicité, SEO assistés par IA). Chacune répond à des besoins différents.",
    s1_p3: "Un chiffre clé : 67 % des PME romandes ayant travaillé avec une agence IA déclarent avoir atteint leurs objectifs d'automatisation en moins de 6 mois (enquête Digitalswitzerland 2025), contre 31 % pour les PME en auto-déploiement.",
    s2_title: '5 critères pour choisir votre agence IA en Suisse',
    s2_criteria: [
      {
        num: '01',
        title: 'Références vérifiables dans votre secteur',
        desc: "Demandez des études de cas avec résultats chiffrés (économies réalisées, heures gagnées, leads générés). Une agence IA sérieuse n'hésite pas à vous mettre en contact avec ses clients actuels. Méfiez-vous des portfolios avec uniquement des logos sans résultats.",
        icon: '📋',
      },
      {
        num: '02',
        title: 'Maîtrise native du marché suisse',
        desc: "Le marché suisse impose des contraintes spécifiques : multilinguisme FR/DE/IT/EN, conformité nLPD (loi fédérale sur la protection des données), culture d'entreprise suisse alémanique vs romande. Une agence qui n'opère pas nativement en Suisse ne peut pas délivrer les mêmes résultats.",
        icon: '🇨🇭',
      },
      {
        num: '03',
        title: 'Transparence sur les outils et fournisseurs',
        desc: "L'agence utilise-t-elle des outils SaaS tiers (OpenAI, Make, HubSpot) ou développe-t-elle des solutions propriétaires ? Héberge-t-elle les données en Suisse ? Les deux approches sont valides selon les besoins, mais la transparence est non-négociable.",
        icon: '🔍',
      },
      {
        num: '04',
        title: 'Plan de formation et de transfert de compétences',
        desc: "Une bonne agence IA ne crée pas de dépendance — elle transfère les compétences à vos équipes. Vérifiez que le mandat inclut des sessions de formation et de la documentation pour que vos collaborateurs puissent gérer et faire évoluer les outils IA de façon autonome.",
        icon: '🎓',
      },
      {
        num: '05',
        title: "Mode d'engagement aligné avec vos résultats",
        desc: "Audit, accompagnement ou déploiement progressif : le bon format dépend de vos objectifs, de vos données et de vos équipes. Exigez toujours des livrables définis, des jalons mesurables et une clause de sortie claire.",
        icon: '📊',
      },
    ],
    s3_title: 'Agence IA vs consultant IA indépendant : lequel choisir pour votre PME ?',
    s3_p1: "La question n'est pas \"qui est meilleur ?\" mais \"quel modèle correspond à votre projet ?\"",
    s3_comparison: [
      { aspect: 'Taille projet', agence: 'Projets complexes multi-processus', consultant: 'Projets ciblés 2–5 processus' },
      { aspect: 'Interlocuteurs', agence: 'Équipe dédiée (chef de projet + experts)', consultant: 'Interlocuteur unique, très disponible' },
      { aspect: 'Délai de mise en route', agence: '4–8 semaines (onboarding, brief)', consultant: '1–2 semaines (démarrage rapide)' },
      { aspect: 'Profondeur technique', agence: 'Développement sur mesure possible', consultant: 'Intégration d\'outils existants' },
      { aspect: 'Formation équipes', agence: 'Structurée, documentée', consultant: 'Informelle, au fil des sessions' },
      { aspect: 'Idéal pour', agence: 'PME 25–200 emp., transformation digitale globale', consultant: 'PME 5–40 emp., gains rapides' },
    ],
    s3_p2: "Pour une PME romande ou zurichoise de 10–30 employés cherchant à automatiser 3–5 processus et à former ses équipes, IAPME Suisse propose un modèle hybride : l'expertise d'une agence IA avec la réactivité et la proximité d'un consultant dédié.",
    s4_title: 'Focus Lausanne et Genève : le marché des agences IA en Suisse romande',
    s4_lausanne: "Lausanne est devenue un hub IA de référence en Europe francophone, grâce à l'EPFL, à son écosystème de startups deeptech et à la présence de multinationales. Les PME lausannoises opèrent dans un marché où la concurrence est forte — hôtellerie de luxe, medtech, finance privée, logistique. Les agences IA actives à Lausanne se spécialisent souvent dans ces verticales avec des solutions orientées données et conformité.",
    s4_geneve: "Genève concentre les sièges de grandes organisations internationales (ONU, OMS, CICR) qui créent un effet d'entraînement sur l'écosystème PME local. Les PME genevoises opèrent dans un contexte très international (anglais requis), avec des exigences de confidentialité élevées (finance privée, juridique, diplomatique). Les agences IA à Genève doivent maîtriser la conformité RGPD + nLPD simultanément.",
    s4_romande: "Au-delà de Lausanne et Genève, les PME du Valais, de Fribourg, de Neuchâtel et du Jura constituent un marché souvent sous-estimé avec un fort potentiel. Les secteurs les plus actifs : tourisme (Valais, Jura), agroalimentaire (Fribourg), industrie de précision (Neuchâtel, Arc jurassien).",
    s5_title: 'Secteurs couverts par les agences IA pour PME suisses',
    s5_sectors: [
      {
        sector: 'Commerce & retail',
        icon: '🛍',
        services: [
          'Personnalisation IA des offres et recommandations produits',
          'Chatbot e-commerce multilingue (FR/DE/IT/EN)',
          'Prévision des ventes et optimisation des stocks',
          'Marketing automation et email IA',
        ],
      },
      {
        sector: 'Hôtellerie & tourisme',
        icon: '🏔',
        services: [
          'Chatbot réservations multilingue 24h/24',
          'Revenue management automatisé',
          'Gestion des avis clients par IA',
          'Personnalisation des séjours',
        ],
      },
      {
        sector: 'Fiduciaires & services professionnels',
        icon: '📊',
        services: [
          'OCR et saisie comptable automatisée',
          'Génération automatique de rapports',
          'Veille réglementaire IA',
          'Classification et archivage de documents',
        ],
      },
      {
        sector: 'Artisanat & construction',
        icon: '🏗',
        services: [
          'Génération automatique de devis',
          'Chatbot IA pour qualification prospects',
          'Planification chantier assistée par IA',
          'Réponse automatique aux appels d\'offres publics',
        ],
      },
      {
        sector: 'Santé & médecine',
        icon: '🏥',
        services: [
          'Agent vocal IA pour prise de rendez-vous',
          'Rappels patients automatisés',
          'Transcription médicale automatique',
          'Gestion des dossiers par IA',
        ],
      },
      {
        sector: 'Marketing & communication',
        icon: '📢',
        services: [
          'Génération de contenu IA multilingue',
          'SEO automatisé et optimisation continue',
          'Publicité IA (Google, Meta, LinkedIn)',
          'Analyse concurrentielle automatisée',
        ],
      },
    ],
    faq_title: 'Questions fréquentes — Agence IA pour PME suisses',
    faqs: [
      {
        q: 'Quelle est la différence entre une agence IA et une agence de marketing digital classique ?',
        a: "Une agence de marketing digital classique utilise des outils standardisés (Google Ads, SEO, social media). Une agence IA intègre l'intelligence artificielle dans ses processus : automatisation des campagnes, génération de contenu par LLM, analyse prédictive des audiences, personnalisation en temps réel. La frontière tend à s'estomper — mais vérifiez toujours que l'IA est native dans la prestation, pas juste un argument marketing.",
      },
      {
        q: 'Une agence IA suisse est-elle toujours plus pertinente qu\'une agence étrangère ?',
        a: "Pas nécessairement. Les agences locales livrent souvent plus vite sur le marché suisse grâce au multilinguisme natif, au réseau local et à la conformité nLPD intégrée. Pour cadrer votre situation, demandez notre audit gratuit.",
      },
      {
        q: 'Combien de temps dure un mandat d\'agence IA pour une PME suisse ?',
        a: "Un mandat type pour une PME suisse s'étend sur 6 à 18 mois : 1–2 mois de diagnostic et configuration, 2–4 mois de déploiement et formation, puis une phase de maintenance et d'optimisation continue. Les premiers résultats mesurables apparaissent généralement dans les 30 à 60 premiers jours.",
      },
      {
        q: 'L\'agence IA assure-t-elle la conformité nLPD de ses déploiements ?',
        a: "C'est un critère de sélection critique. Exigez que la conformité nLPD soit intégrée dès la conception (privacy by design), pas ajoutée en fin de projet. IAPME Suisse intègre systématiquement : hébergement suisse/UE, registre des traitements, clause de sous-traitance nLPD-compatible, information des utilisateurs finals.",
      },
      {
        q: 'Peut-on travailler avec une agence IA suisse si ma PME est à Zürich ou en Suisse alémanique ?',
        a: "Oui. IAPME Suisse opère dans les 4 régions linguistiques. Nos mandats sont conduits en français, allemand ou italien selon la préférence du client. Toutes nos solutions sont testées et validées sur les trois marchés linguistiques suisses. Pour les PME zurichoises, nous proposons également des séances en présentiel.",
      },
    ],
    internal_links_title: 'Ressources complémentaires — Agence IA & marketing IA en Suisse',
    internal_links: [
      { href: '/automatisation-ia-pme-suisse', label: 'Automatisation IA pour PME suisses : guide complet 2026' },
      { href: '/consulting', label: 'Conseil IA pour PME — nos offres d\'accompagnement' },
      { href: '/services', label: 'Services IA pour PME suisses' },
      { href: '/blog/agence-ia-pme-suisse-comparatif', label: 'Comparatif agences IA pour PME suisses 2026' },
      { href: '/blog/agence-ia-pour-pme-suisse', label: 'Agence IA pour PME suisse : guide de sélection complet' },
      { href: '/contact', label: 'Audit gratuit 30 min — demander un rendez-vous' },
    ],
  },
  de: {
    breadcrumbLabel: 'KI-Agentur Schweiz',
    hero_title: 'KI-Agentur für Schweizer KMU',
    hero_subtitle: 'Den richtigen Partner wählen 2026',
    hero_desc: 'Der Markt der KI-Agenturen in der Schweiz ist 2024–2026 explodiert. Dieser Leitfaden gibt Ihnen die 5 entscheidenden Kriterien, einen Agentur-vs.-Berater-Vergleich und einen Fokus auf die Märkte Lausanne und Genf.',
    cta_audit: 'Kostenloses 30-min-Audit anfragen',
    cta_services: 'Unsere KI-Services ansehen',
    s1_title: 'Was ist eine KI-Agentur für KMU?',
    s1_p1: 'Eine KI-Agentur für KMU ist eine Struktur, die strategische Beratung, technische Integration und Produktion von IA-basierten Inhalten oder Automatisierungen kombiniert. Im Gegensatz zu einem unabhängigen Berater verfügt eine Agentur über multidisziplinäre Teams: Berater, Entwickler, Datenanalysten, Compliance-Experten.',
    s1_p2: 'In der Schweiz unterscheidet man drei Kategorien von KI-Agenturen für KMU: Full-Service-Agenturen (Strategie + Deployment + Schulung), branchenspezialisierte Agenturen (Fintech, Healthtech, Tourismus, Treuhand) und KI-Marketingagenturen (KI-gestützte Inhalte, Werbung, SEO). Jede deckt unterschiedliche Bedürfnisse ab.',
    s1_p3: 'Eine Schlüsselzahl: 67 % der Westschweizer KMU, die mit einer KI-Agentur zusammengearbeitet haben, geben an, ihre Automatisierungsziele in weniger als 6 Monaten erreicht zu haben (Digitalswitzerland-Umfrage 2025), gegenüber 31 % bei selbst deployenden KMU.',
    s2_title: '5 Kriterien für die Wahl Ihrer KI-Agentur in der Schweiz',
    s2_criteria: [
      {
        num: '01',
        title: 'Verifizierbare Referenzen in Ihrer Branche',
        desc: 'Verlangen Sie Fallstudien mit konkreten Ergebnissen (realisierte Einsparungen, gewonnene Stunden, generierte Leads). Eine seriöse KI-Agentur zögert nicht, Sie mit aktuellen Kunden in Kontakt zu bringen. Misstrauen Sie Portfolios mit nur Logos ohne Ergebnisse.',
        icon: '📋',
      },
      {
        num: '02',
        title: 'Native Beherrschung des Schweizer Marktes',
        desc: 'Der Schweizer Markt stellt spezifische Anforderungen: Mehrsprachigkeit FR/DE/IT/EN, nDSG-Konformität, Schweizer Unternehmenskultur (Deutschschweiz vs. Westschweiz). Eine Agentur, die nicht nativ in der Schweiz operiert, kann nicht dieselben Ergebnisse liefern.',
        icon: '🇨🇭',
      },
      {
        num: '03',
        title: 'Transparenz bei Tools und Anbietern',
        desc: 'Nutzt die Agentur SaaS-Tools von Drittanbietern (OpenAI, Make, HubSpot) oder entwickelt sie proprietäre Lösungen? Hostet sie Daten in der Schweiz? Beide Ansätze sind je nach Bedarf valide, aber Transparenz ist nicht verhandelbar.',
        icon: '🔍',
      },
      {
        num: '04',
        title: 'Schulungs- und Wissenstransferplan',
        desc: 'Eine gute KI-Agentur schafft keine Abhängigkeit — sie überträgt Kompetenzen an Ihre Teams. Stellen Sie sicher, dass das Mandat Schulungssessions und Dokumentation enthält, damit Ihre Mitarbeitenden die KI-Tools eigenständig verwalten und weiterentwickeln können.',
        icon: '🎓',
      },
      {
        num: '05',
        title: 'Ergebnisgebundenes Preismodell',
        desc: 'Monatliche Pauschale, Stundensatz oder Success Fee auf Ergebnisse? Alle drei Modelle koexistieren. Für ein KMU ist eine feste monatliche Pauschale über 6–12 Monate mit definierten Liefergegenständen generell am sichersten. Vermeiden Sie Jahresverträge ohne Ausstiegsklausel.',
        icon: '📊',
      },
    ],
    s3_title: 'KI-Agentur vs. unabhängiger KI-Berater: Was für Ihr KMU wählen?',
    s3_p1: 'Die Frage lautet nicht "wer ist besser?", sondern "welches Modell passt zu Ihrem Projekt?"',
    s3_comparison: [
      { aspect: 'Projektgröße', agence: 'Komplexe Multi-Prozess-Projekte', consultant: 'Gezielte Projekte, 2–5 Prozesse' },
      { aspect: 'Ansprechpartner', agence: 'Dediziertes Team (PM + Experten)', consultant: 'Einziger Ansprechpartner, sehr verfügbar' },
      { aspect: 'Anlaufzeit', agence: '4–8 Wochen (Onboarding, Briefing)', consultant: '1–2 Wochen (Schnellstart)' },
      { aspect: 'Technische Tiefe', agence: 'Individualentwicklung möglich', consultant: 'Integration bestehender Tools' },
      { aspect: 'Team-Schulung', agence: 'Strukturiert, dokumentiert', consultant: 'Informell, laufend' },
      { aspect: 'Ideal für', agence: 'KMU 25–200 MA, gesamte digitale Transformation', consultant: 'KMU 5–40 MA, schnelle Gewinne' },
    ],
    s3_p2: 'Für ein Westschweizer oder Zürcher KMU mit 10–30 Mitarbeitenden, das 3–5 Prozesse automatisieren und Teams schulen möchte, bietet IAPME Suisse ein hybrides Modell: die Expertise einer KI-Agentur mit der Reaktionsfähigkeit und Nähe eines dedizierten Beraters.',
    s4_title: 'Fokus Lausanne und Genf: KI-Agenturen in der Westschweiz',
    s4_lausanne: 'Lausanne hat sich zu einem KI-Hub in der frankophonen Welt entwickelt, dank EPFL, seinem Deeptech-Startup-Ökosystem und der Präsenz multinationaler Unternehmen. Lausanner KMU operieren in einem wettbewerbsintensiven Markt — Luxushotellerie, Medtech, Privatfinanz, Logistik.',
    s4_geneve: 'Genf beherbergt die Sitze großer internationaler Organisationen (UNO, WHO, IKRK), die einen Sogeffekt auf das lokale KMU-Ökosystem erzeugen. Genfer KMU arbeiten in einem sehr internationalen Kontext mit hohen Vertraulichkeitsanforderungen (Privatfinanz, Recht, Diplomatie).',
    s4_romande: 'Über Lausanne und Genf hinaus bilden KMU aus dem Wallis, Freiburg, Neuenburg und dem Jura einen oft unterschätzten Markt mit hohem Potenzial. Aktivste Branchen: Tourismus (Wallis, Jura), Lebensmittel (Freiburg), Präzisionsindustrie (Neuenburg, Jurabogen).',
    s5_title: 'Von KI-Agenturen betreute Branchen in Schweizer KMU',
    s5_sectors: [
      {
        sector: 'Handel & Retail',
        icon: '🛍',
        services: [
          'KI-Personalisierung von Angeboten und Produktempfehlungen',
          'Mehrsprachiger E-Commerce-Chatbot (FR/DE/IT/EN)',
          'Umsatzprognose und Bestandsoptimierung',
          'Marketing-Automation und KI-E-Mail',
        ],
      },
      {
        sector: 'Hotellerie & Tourismus',
        icon: '🏔',
        services: [
          'Mehrsprachiger Buchungs-Chatbot 24h/24',
          'Automatisiertes Revenue Management',
          'KI-gestützte Kundenbewertungsverwaltung',
          'Aufenthalts-Personalisierung',
        ],
      },
      {
        sector: 'Treuhand & professionelle Dienstleistungen',
        icon: '📊',
        services: [
          'OCR und automatisierte Buchungseingabe',
          'Automatische Berichtsgenerierung',
          'KI-gestützte Regulierungsbeobachtung',
          'Dokumentenklassifizierung und -archivierung',
        ],
      },
      {
        sector: 'Handwerk & Bau',
        icon: '🏗',
        services: [
          'Automatische Offertgenerierung',
          'KI-Chatbot zur Interessentenqualifizierung',
          'KI-gestützte Baustellenplanung',
          'Automatische Antwort auf öffentliche Ausschreibungen',
        ],
      },
      {
        sector: 'Gesundheit & Medizin',
        icon: '🏥',
        services: [
          'KI-Sprachagent für Terminvereinbarungen',
          'Automatisierte Patientenerinnerungen',
          'Automatische medizinische Transkription',
          'KI-gestützte Aktenverwaltung',
        ],
      },
      {
        sector: 'Marketing & Kommunikation',
        icon: '📢',
        services: [
          'Mehrsprachige KI-Inhaltsgenerierung',
          'Automatisiertes SEO und kontinuierliche Optimierung',
          'KI-Werbung (Google, Meta, LinkedIn)',
          'Automatisierte Wettbewerbsanalyse',
        ],
      },
    ],
    faq_title: 'Häufige Fragen — KI-Agentur für Schweizer KMU',
    faqs: [
      {
        q: 'Was unterscheidet eine KI-Agentur von einer klassischen Digitalmarketing-Agentur?',
        a: 'Eine klassische Digitalmarketing-Agentur nutzt standardisierte Tools (Google Ads, SEO, Social Media). Eine KI-Agentur integriert künstliche Intelligenz nativ in ihre Prozesse: Kampagnenautomatisierung, LLM-Inhaltsgenerierung, prädiktive Zielgruppenanalyse, Echtzeit-Personalisierung.',
      },
      {
        q: 'Ist eine Schweizer KI-Agentur zwangsläufig teurer als eine ausländische?',
        a: 'Nicht zwangsläufig. Die Stundensätze sind in der Schweiz höher, aber lokale Agenturen liefern auf dem Schweizer Markt schneller Ergebnisse (natives Mehrsprachigkeit, lokales Netzwerk, integrierte nDSG-Konformität). Für ein präzises Angebot fordern Sie unser kostenloses Audit an.',
      },
      {
        q: 'Wie lange dauert ein KI-Agentur-Mandat für ein Schweizer KMU?',
        a: 'Ein typisches KMU-Mandat erstreckt sich über 6 bis 18 Monate: 1–2 Monate Diagnose und Konfiguration, 2–4 Monate Deployment und Schulung, dann eine Phase kontinuierlicher Wartung und Optimierung. Erste messbare Ergebnisse erscheinen in der Regel innerhalb der ersten 30 bis 60 Tage.',
      },
      {
        q: 'Gewährleistet die KI-Agentur die nDSG-Konformität ihrer Deployments?',
        a: 'Das ist ein kritisches Auswahlkriterium. Bestehen Sie darauf, dass die nDSG-Konformität von Anfang an integriert ist (Privacy by Design), nicht am Ende des Projekts hinzugefügt wird. IAPME Suisse integriert systematisch: Schweizer/EU-Hosting, Verarbeitungsverzeichnis, nDSG-konforme Unterauftragsklausel.',
      },
      {
        q: 'Kann man mit einer Westschweizer KI-Agentur arbeiten, wenn mein KMU in Zürich ist?',
        a: 'Ja. IAPME Suisse operiert in allen 4 Sprachregionen. Unsere Mandate werden je nach Kundenpräferenz auf Französisch, Deutsch oder Italienisch geführt. Alle unsere Lösungen werden auf den drei Schweizer Sprachmärkten getestet und validiert.',
      },
    ],
    internal_links_title: 'Weiterführende Ressourcen — KI-Agentur & KI-Marketing Schweiz',
    internal_links: [
      { href: '/automatisation-ia-pme-suisse', label: 'KI-Automatisierung für Schweizer KMU: vollständiger Leitfaden 2026' },
      { href: '/consulting', label: 'KI-Beratung für KMU — unsere Begleitungsangebote' },
      { href: '/services', label: 'KI-Services für Schweizer KMU' },
      { href: '/blog/agence-ia-pme-suisse-comparatif', label: 'Vergleich KI-Agenturen für Schweizer KMU 2026' },
      { href: '/blog/agence-ia-pour-pme-suisse', label: 'KI-Agentur für Schweizer KMU: vollständiger Auswahlratgeber' },
      { href: '/contact', label: 'Kostenloses Audit 30 min — Termin anfragen' },
    ],
  },
  en: {
    breadcrumbLabel: 'AI Agency Switzerland',
    hero_title: 'AI agency for Swiss SMEs',
    hero_subtitle: 'Choosing the right partner in 2026',
    hero_desc: 'The Swiss AI agency market exploded in 2024–2026. This guide gives you the 5 decisive criteria, an agency vs. consultant comparison, and a focus on the Lausanne and Geneva markets.',
    cta_audit: 'Request a free 30-min audit',
    cta_services: 'View our AI services',
    s1_title: 'What is an AI agency for SMEs?',
    s1_p1: 'An AI agency for SMEs is a firm that combines strategic consulting, technical integration, and production of AI-based content or automations. Unlike an independent consultant, an agency has multidisciplinary teams: consultants, developers, data analysts, compliance experts.',
    s1_p2: 'In Switzerland, three categories of AI agencies for SMEs coexist: full-service agencies (strategy + deployment + training), sector-specialised agencies (fintech, healthtech, tourism, accounting), and AI marketing agencies (AI-assisted content, advertising, SEO). Each meets different needs.',
    s1_p3: 'A key figure: 67% of French-speaking Swiss SMEs that worked with an AI agency report having met their automation targets in less than 6 months (Digitalswitzerland survey, 2025), compared to 31% for self-deploying SMEs.',
    s2_title: '5 criteria for choosing your AI agency in Switzerland',
    s2_criteria: [
      {
        num: '01',
        title: 'Verifiable references in your sector',
        desc: 'Ask for case studies with quantified results (savings achieved, hours gained, leads generated). A serious AI agency has no hesitation in putting you in touch with its current clients. Beware of portfolios with only logos and no results.',
        icon: '📋',
      },
      {
        num: '02',
        title: 'Native mastery of the Swiss market',
        desc: 'The Swiss market imposes specific constraints: FR/DE/IT/EN multilingualism, nFADP compliance, Swiss corporate culture (German-speaking vs. French-speaking). An agency that does not operate natively in Switzerland cannot deliver the same results.',
        icon: '🇨🇭',
      },
      {
        num: '03',
        title: 'Transparency on tools and vendors',
        desc: 'Does the agency use third-party SaaS tools (OpenAI, Make, HubSpot) or develop proprietary solutions? Does it host data in Switzerland? Both approaches are valid depending on needs, but transparency is non-negotiable.',
        icon: '🔍',
      },
      {
        num: '04',
        title: 'Training and skills transfer plan',
        desc: 'A good AI agency does not create dependency — it transfers skills to your teams. Verify that the mandate includes training sessions and documentation so that your employees can manage and evolve AI tools independently.',
        icon: '🎓',
      },
      {
        num: '05',
        title: 'Engagement model aligned with your results',
        desc: 'Monthly retainer, hourly rate, or success fee on results? All three models coexist. For an SME, a fixed monthly retainer over 6–12 months with defined deliverables is generally the safest. Avoid annual commitments without an exit clause.',
        icon: '📊',
      },
    ],
    s3_title: 'AI agency vs independent AI consultant: which to choose for your SME?',
    s3_p1: "The question is not \"who is better?\" but \"which model fits your project?\"",
    s3_comparison: [
      { aspect: 'Project scope', agence: 'Complex multi-process projects', consultant: 'Targeted 2–5 process projects' },
      { aspect: 'Point of contact', agence: 'Dedicated team (PM + experts)', consultant: 'Single contact, highly available' },
      { aspect: 'Ramp-up time', agence: '4–8 weeks (onboarding, briefing)', consultant: '1–2 weeks (fast start)' },
      { aspect: 'Technical depth', agence: 'Custom development possible', consultant: 'Integration of existing tools' },
      { aspect: 'Team training', agence: 'Structured, documented', consultant: 'Informal, ongoing' },
      { aspect: 'Ideal for', agence: 'SME 25–200 employees, full digital transformation', consultant: 'SME 5–40 employees, quick wins' },
    ],
    s3_p2: 'For a French-speaking or Zurich-based SME of 10–30 employees looking to automate 3–5 processes and train its teams, IAPME Suisse offers a hybrid model: the expertise of an AI agency with the responsiveness and proximity of a dedicated consultant.',
    s4_title: 'Focus Lausanne and Geneva: the AI agency market in French-speaking Switzerland',
    s4_lausanne: 'Lausanne has become a leading AI hub in the French-speaking world, thanks to EPFL, its deeptech startup ecosystem, and the presence of multinationals. Lausanne SMEs operate in a highly competitive market — luxury hospitality, medtech, private finance, logistics.',
    s4_geneve: 'Geneva concentrates the headquarters of major international organisations (UN, WHO, ICRC), which creates a knock-on effect on the local SME ecosystem. Geneva SMEs operate in a very international context with high confidentiality requirements (private finance, legal, diplomatic).',
    s4_romande: 'Beyond Lausanne and Geneva, SMEs in Valais, Fribourg, Neuchâtel, and Jura represent an often underestimated market with strong potential. Most active sectors: tourism (Valais, Jura), agri-food (Fribourg), precision industry (Neuchâtel, Jura Arc).',
    s5_title: 'Sectors covered by AI agencies for Swiss SMEs',
    s5_sectors: [
      {
        sector: 'Retail & commerce',
        icon: '🛍',
        services: [
          'AI personalisation of offers and product recommendations',
          'Multilingual e-commerce chatbot (FR/DE/IT/EN)',
          'Sales forecasting and stock optimisation',
          'Marketing automation and AI email',
        ],
      },
      {
        sector: 'Hospitality & tourism',
        icon: '🏔',
        services: [
          'Multilingual booking chatbot 24/7',
          'Automated revenue management',
          'AI customer review management',
          'Stay personalisation',
        ],
      },
      {
        sector: 'Accounting & professional services',
        icon: '📊',
        services: [
          'OCR and automated accounting entry',
          'Automatic report generation',
          'AI regulatory monitoring',
          'Document classification and archiving',
        ],
      },
      {
        sector: 'Trades & construction',
        icon: '🏗',
        services: [
          'Automatic quote generation',
          'AI chatbot for prospect qualification',
          'AI-assisted construction planning',
          'Automatic response to public tenders',
        ],
      },
      {
        sector: 'Healthcare & medicine',
        icon: '🏥',
        services: [
          'AI voice agent for appointment booking',
          'Automated patient reminders',
          'Automatic medical transcription',
          'AI-powered records management',
        ],
      },
      {
        sector: 'Marketing & communications',
        icon: '📢',
        services: [
          'Multilingual AI content generation',
          'Automated SEO and continuous optimisation',
          'AI advertising (Google, Meta, LinkedIn)',
          'Automated competitor analysis',
        ],
      },
    ],
    faq_title: 'Frequently asked questions — AI agency for Swiss SMEs',
    faqs: [
      {
        q: 'What is the difference between an AI agency and a traditional digital marketing agency?',
        a: 'A traditional digital marketing agency uses standardised tools (Google Ads, SEO, social media). An AI agency natively integrates artificial intelligence into its processes: campaign automation, LLM content generation, predictive audience analysis, real-time personalisation.',
      },
      {
        q: 'Is a Swiss AI agency necessarily more expensive than a foreign one?',
        a: 'Not necessarily. local agencies deliver results faster on the Swiss market (native multilingualism, local network, integrated nFADP compliance). The total cost of ownership over 12 months is often lower with a Swiss agency. To scope your situation, request our free audit.',
      },
      {
        q: 'How long does an AI agency mandate last for a Swiss SME?',
        a: 'A typical SME mandate spans 6 to 18 months: 1–2 months of diagnosis and configuration, 2–4 months of deployment and training, then a phase of ongoing maintenance and optimisation. First measurable results generally appear within the first 30 to 60 days.',
      },
      {
        q: 'Does the AI agency ensure nFADP compliance of its deployments?',
        a: 'This is a critical selection criterion. Insist that nFADP compliance is integrated from the design stage (privacy by design), not added at the end of the project. IAPME Suisse systematically integrates: Swiss/EU hosting, processing register, nFADP-compatible subcontracting clause.',
      },
      {
        q: 'Can I work with a French-speaking Swiss AI agency if my SME is in Zurich?',
        a: 'Yes. IAPME Suisse operates across all 4 language regions. Our mandates are conducted in French, German, or Italian according to client preference. All our solutions are tested and validated across the three Swiss language markets.',
      },
    ],
    internal_links_title: 'Further resources — AI agency & AI marketing in Switzerland',
    internal_links: [
      { href: '/automatisation-ia-pme-suisse', label: 'AI automation for Swiss SMEs: complete guide 2026' },
      { href: '/consulting', label: 'AI consulting for SMEs — our support packages' },
      { href: '/services', label: 'AI services for Swiss SMEs' },
      { href: '/blog/agence-ia-pme-suisse-comparatif', label: 'AI agencies for Swiss SMEs comparison 2026' },
      { href: '/blog/agence-ia-pour-pme-suisse', label: 'AI agency for Swiss SMEs: complete selection guide' },
      { href: '/contact', label: 'Free audit 30 min — book an appointment' },
    ],
  },
  it: {
    breadcrumbLabel: 'Agenzia IA Svizzera',
    hero_title: 'Agenzia IA per PMI svizzere',
    hero_subtitle: 'Scegliere il partner giusto nel 2026',
    hero_desc: "Il mercato delle agenzie IA in Svizzera è esploso nel 2024–2026. Questa guida vi fornisce i 5 criteri decisivi, un confronto agenzia vs consulente e un focus sui mercati di Losanna e Ginevra.",
    cta_audit: 'Richiedere un audit gratuito 30 min',
    cta_services: 'Vedere i nostri servizi IA',
    s1_title: "Cos'è un'agenzia IA per PMI?",
    s1_p1: "Un'agenzia IA per PMI è una struttura che combina consulenza strategica, integrazione tecnica e produzione di contenuti o automazioni basate sull'intelligenza artificiale. A differenza di un consulente indipendente, un'agenzia dispone di team pluridisciplinari: consulenti, sviluppatori, analisti di dati, esperti di conformità.",
    s1_p2: "In Svizzera si distinguono tre categorie di agenzie IA per PMI: agenzie full-service (strategia + deployment + formazione), agenzie specializzate per settore (fintech, healthtech, turismo, fiduciaria) e agenzie marketing IA (contenuti, pubblicità, SEO assistiti da IA). Ciascuna risponde a esigenze diverse.",
    s1_p3: "Un dato chiave: il 67% delle PMI della Svizzera romanda che hanno collaborato con un'agenzia IA dichiarano di aver raggiunto i loro obiettivi di automazione in meno di 6 mesi (indagine Digitalswitzerland 2025), contro il 31% per le PMI in auto-deployment.",
    s2_title: '5 criteri per scegliere la vostra agenzia IA in Svizzera',
    s2_criteria: [
      {
        num: '01',
        title: 'Referenze verificabili nel vostro settore',
        desc: "Richiedete studi di caso con risultati quantificati (risparmi realizzati, ore guadagnate, lead generati). Un'agenzia IA seria non esita a mettervi in contatto con i suoi clienti attuali. Diffidate dei portfolio con soli loghi senza risultati.",
        icon: '📋',
      },
      {
        num: '02',
        title: 'Padronanza nativa del mercato svizzero',
        desc: "Il mercato svizzero impone vincoli specifici: multilinguismo FR/DE/IT/EN, conformità nLPD, cultura aziendale svizzera tedesca vs romanda. Un'agenzia che non opera nativamente in Svizzera non può fornire gli stessi risultati.",
        icon: '🇨🇭',
      },
      {
        num: '03',
        title: 'Trasparenza sugli strumenti e i fornitori',
        desc: "L'agenzia utilizza strumenti SaaS di terze parti (OpenAI, Make, HubSpot) o sviluppa soluzioni proprietarie? Ospita i dati in Svizzera? Entrambi gli approcci sono validi in base alle esigenze, ma la trasparenza è non negoziabile.",
        icon: '🔍',
      },
      {
        num: '04',
        title: 'Piano di formazione e trasferimento di competenze',
        desc: "Una buona agenzia IA non crea dipendenza — trasferisce le competenze ai vostri team. Verificate che il mandato includa sessioni di formazione e documentazione affinché i vostri collaboratori possano gestire e far evolvere gli strumenti IA in modo autonomo.",
        icon: '🎓',
      },
      {
        num: '05',
        title: 'Modello tariffario allineato ai vostri risultati',
        desc: "Forfait mensile, tariffa oraria o success fee sui risultati? I tre modelli coesistono. Per una PMI, un forfait mensile fisso su 6–12 mesi con deliverable definiti è generalmente il più sicuro. Evitate impegni annuali senza clausola di uscita.",
        icon: '📊',
      },
    ],
    s3_title: "Agenzia IA vs consulente IA indipendente: quale scegliere per la vostra PMI?",
    s3_p1: 'La domanda non è "chi è migliore?" ma "quale modello corrisponde al vostro progetto?"',
    s3_comparison: [
      { aspect: 'Portata del progetto', agence: 'Progetti complessi multi-processo', consultant: 'Progetti mirati, 2–5 processi' },
      { aspect: 'Interlocutori', agence: 'Team dedicato (PM + esperti)', consultant: 'Interlocutore unico, molto disponibile' },
      { aspect: 'Tempo di avvio', agence: '4–8 settimane (onboarding, brief)', consultant: '1–2 settimane (avvio rapido)' },
      { aspect: 'Profondità tecnica', agence: 'Sviluppo personalizzato possibile', consultant: 'Integrazione di strumenti esistenti' },
      { aspect: 'Formazione team', agence: 'Strutturata, documentata', consultant: 'Informale, progressiva' },
      { aspect: 'Ideale per', agence: 'PMI 25–200 dip., trasformazione digitale globale', consultant: 'PMI 5–40 dip., guadagni rapidi' },
    ],
    s3_p2: "Per una PMI della Svizzera romanda o zurighese di 10–30 dipendenti che desidera automatizzare 3–5 processi e formare i propri team, IAPME Suisse propone un modello ibrido: l'expertise di un'agenzia IA con la reattività e la prossimità di un consulente dedicato.",
    s4_title: "Focus Losanna e Ginevra: il mercato delle agenzie IA in Svizzera romanda",
    s4_lausanne: "Losanna è diventata un hub IA di riferimento nel mondo francofono, grazie all'EPFL, al suo ecosistema di startup deeptech e alla presenza di multinazionali. Le PMI losannesi operano in un mercato altamente competitivo — ospitalità di lusso, medtech, finanza privata, logistica.",
    s4_geneve: "Ginevra concentra le sedi delle grandi organizzazioni internazionali (ONU, OMS, CICR) che creano un effetto traino sull'ecosistema PMI locale. Le PMI ginevrini operano in un contesto molto internazionale con elevate esigenze di riservatezza (finanza privata, diritto, diplomazia).",
    s4_romande: "Al di là di Losanna e Ginevra, le PMI del Vallese, Friburgo, Neuchâtel e Giura rappresentano un mercato spesso sottovalutato con forte potenziale. Settori più attivi: turismo (Vallese, Giura), agroalimentare (Friburgo), industria di precisione (Neuchâtel, Arco giurassiano).",
    s5_title: 'Settori coperti dalle agenzie IA per PMI svizzere',
    s5_sectors: [
      {
        sector: 'Commercio & retail',
        icon: '🛍',
        services: [
          'Personalizzazione IA di offerte e raccomandazioni prodotto',
          'Chatbot e-commerce multilingue (FR/DE/IT/EN)',
          'Previsione delle vendite e ottimizzazione delle scorte',
          'Marketing automation ed email IA',
        ],
      },
      {
        sector: 'Ospitalità & turismo',
        icon: '🏔',
        services: [
          'Chatbot prenotazioni multilingue 24h/24',
          'Revenue management automatizzato',
          'Gestione recensioni clienti tramite IA',
          'Personalizzazione dei soggiorni',
        ],
      },
      {
        sector: 'Fiduciaria & servizi professionali',
        icon: '📊',
        services: [
          'OCR e inserimento contabile automatizzato',
          'Generazione automatica di report',
          'Monitoraggio normativo tramite IA',
          'Classificazione e archiviazione documenti',
        ],
      },
      {
        sector: 'Artigianato & costruzione',
        icon: '🏗',
        services: [
          'Generazione automatica di preventivi',
          'Chatbot IA per qualificazione prospect',
          'Pianificazione cantieri assistita da IA',
          'Risposta automatica a bandi pubblici',
        ],
      },
      {
        sector: 'Salute & medicina',
        icon: '🏥',
        services: [
          'Agente vocale IA per prenotazione appuntamenti',
          'Promemoria pazienti automatizzati',
          'Trascrizione medica automatica',
          'Gestione cartelle cliniche tramite IA',
        ],
      },
      {
        sector: 'Marketing & comunicazione',
        icon: '📢',
        services: [
          'Generazione di contenuti IA multilingue',
          'SEO automatizzato e ottimizzazione continua',
          'Pubblicità IA (Google, Meta, LinkedIn)',
          'Analisi competitiva automatizzata',
        ],
      },
    ],
    faq_title: 'Domande frequenti — Agenzia IA per PMI svizzere',
    faqs: [
      {
        q: "Qual è la differenza tra un'agenzia IA e un'agenzia di marketing digitale classica?",
        a: "Un'agenzia di marketing digitale classica usa strumenti standardizzati (Google Ads, SEO, social media). Un'agenzia IA integra nativamente l'intelligenza artificiale nei suoi processi: automazione delle campagne, generazione di contenuti LLM, analisi predittiva dei pubblici, personalizzazione in tempo reale.",
      },
      {
        q: "Un'agenzia IA svizzera è necessariamente più cara di una straniera?",
        a: "Non necessariamente. Le tariffe orarie svizzere sono più elevate, ma le agenzie locali forniscono risultati più rapidi sul mercato svizzero (multilinguismo nativo, rete locale, conformità nLPD integrata). Per definire il vostro caso, richiedete il nostro audit gratuito.",
      },
      {
        q: "Quanto dura un mandato di agenzia IA per una PMI svizzera?",
        a: "Un mandato tipico per una PMI svizzera si estende su 6-18 mesi: 1–2 mesi di diagnosi e configurazione, 2–4 mesi di deployment e formazione, poi una fase di manutenzione e ottimizzazione continua. I primi risultati misurabili compaiono generalmente entro i primi 30–60 giorni.",
      },
      {
        q: "L'agenzia IA garantisce la conformità nLPD dei suoi deployment?",
        a: "È un criterio di selezione critico. Esigete che la conformità nLPD sia integrata sin dalla progettazione (privacy by design), non aggiunta alla fine del progetto. IAPME Suisse integra sistematicamente: hosting svizzero/UE, registro dei trattamenti, clausola di subappalto compatibile con la nLPD.",
      },
      {
        q: "È possibile collaborare con un'agenzia IA della Svizzera romanda se la mia PMI è a Zurigo?",
        a: "Sì. IAPME Suisse opera in tutte e 4 le regioni linguistiche. I nostri mandati vengono condotti in francese, tedesco o italiano in base alla preferenza del cliente. Tutte le nostre soluzioni sono testate e validate sui tre mercati linguistici svizzeri.",
      },
    ],
    internal_links_title: 'Risorse complementari — Agenzia IA & marketing IA in Svizzera',
    internal_links: [
      { href: '/automatisation-ia-pme-suisse', label: 'Automazione IA per PMI svizzere: guida completa 2026' },
      { href: '/consulting', label: 'Consulenza IA per PMI — le nostre offerte di accompagnamento' },
      { href: '/services', label: 'Servizi IA per PMI svizzere' },
      { href: '/blog/agence-ia-pme-suisse-comparatif', label: 'Confronto agenzie IA per PMI svizzere 2026' },
      { href: '/blog/agence-ia-pour-pme-suisse', label: 'Agenzia IA per PMI svizzera: guida di selezione completa' },
      { href: '/contact', label: 'Audit gratuito 30 min — prendere appuntamento' },
    ],
  },
};

export default async function AgenceIASuissePillarPage({ params }: Props) {
  const { locale } = await params;
  const tData = T[locale as keyof typeof T] ?? T.fr;
  const t = await getTranslations({ locale, namespace: 'nav' });
  const tHome = await getTranslations({ locale, namespace: 'home' });

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: tData.hero_title,
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
    datePublished: '2026-05-27',
    dateModified: '2026-05-29',
    mainEntityOfPage: `https://iapmesuisse.ch/${locale}/agence-ia-suisse`,
    url: `https://iapmesuisse.ch/${locale}/agence-ia-suisse`,
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
          <p className="mt-4 text-lg leading-relaxed text-gray-600">{tData.hero_desc}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#FF0000] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
            >
              {tData.cta_audit}
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-lg border border-[#1B2A4A] px-6 py-3 text-sm font-semibold text-[#1B2A4A] transition-colors hover:bg-[#1B2A4A] hover:text-white"
            >
              {tData.cta_services}
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
          <p className="mt-3 rounded-xl border-l-4 border-[#FF0000] bg-red-50 p-4 text-sm font-medium leading-relaxed text-gray-700">
            {tData.s1_p3}
          </p>
        </div>
      </section>

      {/* Section 2 — 5 critères */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B2A4A] sm:text-3xl">{tData.s2_title}</h2>
          <div className="mt-6 space-y-4">
            {tData.s2_criteria.map((criterion, i) => (
              <div key={i} className="flex gap-4 rounded-xl border border-gray-200 bg-gray-50 p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1B2A4A] text-sm font-bold text-white">
                  {criterion.num}
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-[#1B2A4A]">
                    {criterion.icon} {criterion.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">{criterion.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Agence vs Consultant */}
      <section className="bg-gray-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B2A4A] sm:text-3xl">{tData.s3_title}</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-700">{tData.s3_p1}</p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-white text-left">
                  <th className="px-4 py-3 font-semibold text-[#1B2A4A]">Critère</th>
                  <th className="px-4 py-3 font-semibold text-[#FF0000]">Agence IA</th>
                  <th className="px-4 py-3 font-semibold text-[#1B2A4A]">Consultant IA</th>
                </tr>
              </thead>
              <tbody>
                {tData.s3_comparison.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-white">
                    <td className="px-4 py-3 font-medium text-gray-700">{row.aspect}</td>
                    <td className="px-4 py-3 text-gray-600">{row.agence}</td>
                    <td className="px-4 py-3 text-gray-600">{row.consultant}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-700">{tData.s3_p2}</p>
        </div>
      </section>

      {/* Section 4 — Focus géographique */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B2A4A] sm:text-3xl">{tData.s4_title}</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-base font-bold text-[#1B2A4A]">Lausanne / Losanna</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">{tData.s4_lausanne}</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-base font-bold text-[#1B2A4A]">Genève / Ginevra / Geneva</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">{tData.s4_geneve}</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-base font-bold text-[#1B2A4A]">Valais, Fribourg, Neuchâtel, Jura</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">{tData.s4_romande}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Secteurs */}
      <section className="bg-gray-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B2A4A] sm:text-3xl">{tData.s5_title}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {tData.s5_sectors.map((sector, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-6">
                <p className="text-2xl">{sector.icon}</p>
                <h3 className="mt-2 text-base font-bold text-[#1B2A4A]">{sector.sector}</h3>
                <ul className="mt-3 space-y-1.5">
                  {sector.services.map((service, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-0.5 text-[#FF0000]">→</span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B2A4A] sm:text-3xl">{tData.faq_title}</h2>
          <div className="mt-6 space-y-4">
            {tData.faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <p className="font-semibold text-[#1B2A4A]">{faq.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maillage interne */}
      <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
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
