import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getAlternates } from '@/lib/metadata';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTA from '@/components/CTA';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: 'Conseil IA pour PME suisses : guide complet 2026 | IAPME Suisse',
    de: 'KI-Beratung für KMU Schweiz: vollständiger Leitfaden 2026 | IAPME Suisse',
    en: 'AI consulting for Swiss SMEs: complete guide 2026 | IAPME Suisse',
    it: 'Consulenza IA per PMI svizzere: guida completa 2026 | IAPME Suisse',
  };
  const descs: Record<string, string> = {
    fr: 'Trouvez le bon conseiller IA pour votre PME suisse : critères de sélection, différence agence vs consultant, spécificités Zurich/Bâle, conformité nLPD. Guide expert 2026.',
    de: 'Den richtigen KI-Berater für Ihr KMU finden: Auswahlkriterien, Unterschied Agentur vs. Berater, Zürich/Basel-spezifische Infos, nDSG-Konformität. Expertenratgeber 2026.',
    en: 'Find the right AI consultant for your Swiss SME: selection criteria, agency vs. consultant differences, Zurich/Basel specifics, nFADP compliance. Expert guide 2026.',
    it: 'Trovare il giusto consulente IA per la vostra PMI svizzera: criteri di selezione, differenze agenzia vs consulente, specificità Zurigo/Basilea, conformità nLPD. Guida esperta 2026.',
  };

  return {
    title: titles[locale] ?? titles.fr,
    description: descs[locale] ?? descs.fr,
    alternates: getAlternates(locale, '/ki-beratung-kmu-schweiz'),
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
    breadcrumbLabel: 'Conseil IA PME Suisse',
    hero_title: 'Conseil IA pour PME suisses',
    hero_subtitle: 'Guide complet 2026',
    hero_desc: 'KI-Beratung, AI beratung für KMU — peu importe la langue, la question est la même : comment choisir le bon expert IA pour votre PME en Suisse ? Ce guide couvre les critères de sélection, les spécificités cantonales, la conformité nLPD et le calcul du ROI réel.',
    cta_audit: 'Demander un audit gratuit 30 min',
    cta_consulting: 'Voir nos offres de conseil',
    s1_title: "Qu'est-ce que le conseil IA pour PME ?",
    s1_p1: "Le conseil IA pour PME (ou KI-Beratung für KMU en allemand) désigne l'accompagnement stratégique et opérationnel d'une entreprise dans son adoption de l'intelligence artificielle. Contrairement à l'achat d'un logiciel SaaS, le conseil IA commence par un diagnostic : quels processus automatiser en priorité, quels outils correspondent à votre secteur, quels risques nLPD identifier.",
    s1_p2: "En Suisse, le marché du conseil IA pour PME a doublé entre 2023 et 2026 (Digitalswitzerland, 2025). Les PME qui ont fait appel à un conseiller spécialisé ont en moyenne 3x plus de chances d'obtenir un ROI positif dans les 12 mois que celles qui ont déployé des outils sans accompagnement.",
    s2_title: 'Comment choisir un conseiller IA pour votre PME suisse ?',
    s2_criteria: [
      {
        title: '1. Expérience sectorielle vérifiable',
        desc: "Un bon conseiller IA connaît votre secteur (commerce, services, artisanat, santé, hôtellerie). Demandez des références de PME suisses dans votre domaine et des résultats mesurables : heures économisées, CA généré, taux d'erreurs réduit.",
      },
      {
        title: '2. Maîtrise de la conformité nLPD/nDSG',
        desc: "La loi fédérale sur la protection des données (nLPD) impose des obligations spécifiques dès que votre PME automatise des données personnelles. Un conseiller sérieux intègre la conformité dès la conception, pas comme une option payante.",
      },
      {
        title: '3. Approche multilinguisme suisse',
        desc: "Opérer en FR/DE/IT/EN n'est pas une contrainte secondaire — c'est un critère technique central. Votre conseiller doit avoir déployé des solutions opérationnelles dans les 3 régions linguistiques suisses.",
      },
      {
        title: '4. Transparence sur les outils utilisés',
        desc: "Méfiez-vous des conseillers qui recommandent systématiquement les mêmes outils sans analyse. Un bon conseil IA évalue Make, n8n, ChatGPT, Vocalis, Bexio et d'autres selon votre contexte précis.",
      },
      {
        title: '5. Engagement sur des résultats mesurables',
        desc: "Le conseil IA sérieux se mesure en KPI : temps économisé, coût réduit, leads qualifiés supplémentaires. Exigez un plan avec jalons et métriques définies avant signature.",
      },
    ],
    s3_title: 'KI-Beratung vs KI-Agentur : quelle différence pour votre PME ?',
    s3_p1: "Deux modèles coexistent sur le marché suisse : le consultant IA indépendant (KI-Berater) et l'agence IA (KI-Agentur). Ils ne répondent pas aux mêmes besoins.",
    s3_comparison: [
      { aspect: 'Taille typique de la PME cliente', consultant: 'PME 5–50 employés', agence: 'PME 20–200+ employés' },
      { aspect: 'Profondeur d\'intervention', consultant: 'Stratégie + pilotage déploiement', agence: 'Stratégie + développement sur mesure' },
      { aspect: 'Réactivité', consultant: 'Élevée (interlocuteur unique)', agence: 'Variable (plusieurs intervenants)' },
      { aspect: 'Coût relatif', consultant: 'Plus accessible', agence: 'Plus élevé, projets plus lourds' },
      { aspect: 'Conformité nLPD intégrée', consultant: 'Dépend du profil', agence: 'Généralement oui (équipe dédiée)' },
      { aspect: 'Multilinguisme FR/DE/IT', consultant: 'Variable selon profil', agence: 'Souvent natif' },
    ],
    s3_p2: "Pour une PME de 10–40 employés souhaitant automatiser 3–5 processus et former ses équipes, un consultant IA spécialisé est souvent le choix optimal. Pour un projet de refonte complète de l'expérience client intégrant IA, CRM et data analytics, une agence apporte plus de profondeur.",
    s4_title: 'Conseil IA à Zurich, Bâle et en Suisse alémanique',
    s4_zurich: "Zurich concentre la majorité du marché suisse du conseil IA pour KMU. La forte densité de startups fintech, healthtech et medtech crée une concurrence intense — les PME zurichoises qui n'adoptent pas l'IA risquent de perdre en compétitivité face à des concurrents déjà augmentés. Les secteurs les plus demandeurs à Zurich : services financiers, immobilier, conseil juridique, médecine dentaire.",
    s4_basel: "Bâle présente un profil différent : domination de l'industrie pharmaceutique et chimique (Novartis, Roche) qui crée un effet d'entraînement sur les PME sous-traitantes et prestataires. Le conseil IA à Bâle se concentre souvent sur la conformité réglementaire (GxP, ISO, FDA) et l'automatisation des processus de documentation.",
    s4_alemania: "En Suisse alémanique hors Zurich et Bâle (Saint-Gall, Lucerne, Berne, Winterthour), les PME artisanales et industrielles constituent le gros du marché. Les solutions IA les plus demandées : automatisation des devis, gestion des interventions terrain, communication multilingue avec la clientèle romande.",
    s5_title: 'Conformité nDSG (nLPD) et conseil IA : obligations pratiques',
    s5_ndsg: "Le nDSG (Datenschutzgesetz) — équivalent allemand de la nLPD — est entré en vigueur en septembre 2023. Il impose aux PME suisses qui utilisent l'IA pour traiter des données personnelles quatre obligations clés :",
    s5_tips: [
      "Transparence : informer les personnes concernées quand une IA traite leurs données (emails, appels, formulaires)",
      "Minimisation : ne collecter et traiter que les données strictement nécessaires à la finalité déclarée",
      "Hébergement souverain : privilégier Infomaniak, Exoscale ou un datacenter suisse/UE pour tous les outils d'automatisation",
      "Documentation : tenir un registre actualisé des activités de traitement IA (obligatoire si PME >250 employés ou traitement de données sensibles)",
    ],
    s5_penalite: "Sanctions nDSG possibles pour les personnes responsables (Verantwortliche). Les violations les plus courantes dans les PME : pas d'information sur les chatbots IA, hébergement aux USA sans garanties adéquates, absence de registre des traitements.",
    s6_title: 'ROI du conseil IA pour PME suisses : benchmarks réels',
    s6_desc: "Voici les résultats mesurés sur des mandats de conseil IA réalisés auprès de PME suisses entre 2024 et 2026 :",
    s6_stats: [
      { label: 'PME avec ROI positif en 12 mois', value: '73 %', detail: 'Avec accompagnement expert (vs 24 % en auto-déploiement)' },
      { label: 'Économie de temps administratif', value: '14 h/mois', detail: 'Par collaborateur concerné en moyenne' },
      { label: 'Réduction du taux d\'erreur', value: '65–80 %', detail: 'Sur les processus documentaires automatisés' },
      { label: 'Délai moyen avant premiers résultats', value: '21 jours', detail: 'Premiers gains mesurables post-déploiement' },
    ],
    faq_title: 'Questions fréquentes — Conseil IA pour PME suisses',
    faqs: [
      {
        q: 'Comment cadrer un conseil IA pour PME en Suisse ?',
        a: "Le périmètre d'un mandat de conseil IA dépend de l'envergure du projet et du profil du prestataire. Pour obtenir une estimation précise adaptée à votre PME, nous proposons un audit gratuit de 30 minutes qui vous permettra d'évaluer le potentiel et les priorités réelles. Prenez rendez-vous via notre formulaire de contact.",
      },
      {
        q: 'Quelle différence entre un consultant IA et un développeur IA ?',
        a: "Un consultant IA analyse vos processus, sélectionne les bons outils et pilote le déploiement sans nécessairement écrire de code. Un développeur IA crée des solutions sur mesure (modèles ML, API, applications). Pour 80 % des PME, un consultant qui orchestre des solutions existantes (Make, n8n, ChatGPT, Vocalis) génère plus de valeur qu'un développeur fullstack.",
      },
      {
        q: 'Le conseil IA est-il pertinent pour une PME de moins de 10 employés ?',
        a: "Oui. Les PME de 2–10 employés bénéficient souvent du ROI le plus élevé car chaque heure économisée représente un pourcentage plus important de la capacité totale. Les projets typiques : automatisation de la facturation, réponse aux emails, prise de rendez-vous — déployables en 2–4 semaines.",
      },
      {
        q: 'Peut-on travailler avec un conseiller IA à distance pour une PME en Suisse alémanique ?',
        a: "Oui. IAPME Suisse travaille avec des PME dans toutes les régions linguistiques. Nos consultants sont bilingues ou trilingues (FR/DE/IT) et toutes nos solutions sont testées dans les trois régions. Les mandats se déroulent principalement à distance avec une ou deux sessions en présentiel si nécessaire.",
      },
      {
        q: 'Comment savoir si mon PME est prête pour un projet IA ?',
        a: "Trois indicateurs clés : 1) vous avez des tâches répétitives qui prennent plus de 5h/semaine, 2) vous avez un CRM ou un système de gestion (même basique), 3) vous êtes prêt à consacrer 1–2h/semaine au projet pendant 3 mois. Si ces conditions sont remplies, un audit gratuit de 30 minutes permettra d'identifier les opportunités prioritaires.",
      },
    ],
    internal_links_title: 'Ressources complémentaires — KI-Beratung & conseil IA PME suisse',
    internal_links: [
      { href: '/automatisation-ia-pme-suisse', label: 'Automatisation IA pour PME suisses : guide complet 2026' },
      { href: '/formation-ia-pme', label: 'Formation IA pour dirigeants et collaborateurs de PME' },
      { href: '/consulting', label: 'Conseil IA pour PME — nos offres d\'accompagnement' },
      { href: '/outils-ia', label: 'Les meilleurs outils IA pour PME suisses' },
      { href: '/blog/audit-ia-gratuit-pme-suisse-checklist-nlpd', label: 'Audit IA gratuit PME suisse : checklist nLPD complète' },
      { href: '/blog/strategie-ia-pme-suisse-2026', label: 'Stratégie IA pour PME suisses : guide 2026' },
      { href: '/automatisation-ia-pme-suisse', label: 'Cadrer une roadmap IA PME suisse en 2026' },
      { href: '/cantons', label: 'IA par canton : Genève, Vaud, Valais, Zurich, Berne, Bâle' },
      { href: '/contact', label: 'Audit IA gratuit (30 min) — prendre rendez-vous' },
    ],
  },
  de: {
    breadcrumbLabel: 'KI-Beratung KMU Schweiz',
    hero_title: 'KI-Beratung für KMU Schweiz',
    hero_subtitle: 'Vollständiger Leitfaden 2026',
    hero_desc: 'Wie findet man den richtigen KI-Berater für sein KMU in der Schweiz? Dieser Leitfaden deckt Auswahlkriterien, kantonale Besonderheiten, nDSG-Konformität und die Berechnung des echten ROI ab.',
    cta_audit: 'Kostenloses 30-min-Audit anfragen',
    cta_consulting: 'Unsere Beratungsangebote ansehen',
    s1_title: 'Was ist KI-Beratung für KMU?',
    s1_p1: 'KI-Beratung für KMU bezeichnet die strategische und operative Begleitung eines Unternehmens bei der Einführung von künstlicher Intelligenz. Im Gegensatz zum Kauf einer SaaS-Software beginnt die KI-Beratung mit einer Diagnose: Welche Prozesse zuerst automatisieren, welche Tools passen zu Ihrer Branche, welche nDSG-Risiken sind zu identifizieren.',
    s1_p2: 'In der Schweiz hat sich der Markt für KI-Beratung für KMU zwischen 2023 und 2026 verdoppelt (Digitalswitzerland, 2025). KMU, die einen spezialisierten Berater hinzugezogen haben, erzielen im Durchschnitt 3x häufiger einen positiven ROI innerhalb von 12 Monaten als Unternehmen, die Tools ohne Begleitung eingeführt haben.',
    s2_title: 'Wie wählt man einen KI-Berater für sein Schweizer KMU?',
    s2_criteria: [
      {
        title: '1. Nachweisbare Branchenerfahrung',
        desc: 'Ein guter KI-Berater kennt Ihre Branche (Handel, Dienstleistungen, Handwerk, Gesundheit, Hotellerie). Fragen Sie nach Referenzen von Schweizer KMU in Ihrem Bereich und nach messbaren Ergebnissen: eingesparte Stunden, generierter Umsatz, reduzierte Fehlerquoten.',
      },
      {
        title: '2. Beherrschung der nDSG-Konformität',
        desc: 'Das Bundesgesetz über den Datenschutz (nDSG) stellt spezifische Anforderungen, sobald Ihr KMU personenbezogene Daten automatisiert. Ein seriöser Berater integriert die Konformität von Anfang an, nicht als kostenpflichtige Option.',
      },
      {
        title: '3. Mehrsprachigkeitsansatz Schweiz',
        desc: 'Betrieb auf FR/DE/IT/EN ist keine Nebenbedingung — es ist ein zentrales technisches Kriterium. Ihr Berater sollte operative Lösungen in allen drei Sprachregionen der Schweiz eingeführt haben.',
      },
      {
        title: '4. Transparenz bei den eingesetzten Tools',
        desc: 'Misstrauen Sie Beratern, die systematisch dieselben Tools ohne Analyse empfehlen. Eine gute KI-Beratung evaluiert Make, n8n, ChatGPT, Vocalis, Bexio und andere gemäß Ihrem genauen Kontext.',
      },
      {
        title: '5. Verpflichtung zu messbaren Ergebnissen',
        desc: 'Seriöse KI-Beratung wird in KPI gemessen: eingesparte Zeit, reduzierte Fehler, zusätzlich qualifizierte Leads. Bestehen Sie auf einem Plan mit definierten Meilensteinen und Metriken vor der Unterzeichnung.',
      },
    ],
    s3_title: 'KI-Beratung vs. KI-Agentur: Unterschied für Ihr KMU',
    s3_p1: 'Auf dem Schweizer Markt koexistieren zwei Modelle: der unabhängige KI-Berater und die KI-Agentur. Sie decken unterschiedliche Bedürfnisse ab.',
    s3_comparison: [
      { aspect: 'Typische KMU-Größe', consultant: 'KMU 5–50 Mitarbeitende', agence: 'KMU 20–200+ Mitarbeitende' },
      { aspect: 'Interventionstiefe', consultant: 'Strategie + Deployment-Steuerung', agence: 'Strategie + Individualentwicklung' },
      { aspect: 'Reaktionsfähigkeit', consultant: 'Hoch (ein Ansprechpartner)', agence: 'Variabel (mehrere Beteiligte)' },
      { aspect: 'Relativer Aufwandfaktor', consultant: 'Zugänglicher', agence: 'Höher, schwerere Projekte' },
      { aspect: 'nDSG-Konformität integriert', consultant: 'Je nach Profil', agence: 'In der Regel ja (dediziertes Team)' },
      { aspect: 'Mehrsprachigkeit FR/DE/IT', consultant: 'Je nach Profil', agence: 'Oft nativ' },
    ],
    s3_p2: 'Für ein KMU mit 10–40 Mitarbeitenden, das 3–5 Prozesse automatisieren und seine Teams schulen möchte, ist ein spezialisierter KI-Berater oft die optimale Wahl. Für ein vollständiges Kundenerfahrungs-Projekt mit IA, CRM und Datenanalyse bietet eine Agentur mehr Tiefe.',
    s4_title: 'KI-Beratung in Zürich, Basel und der Deutschschweiz',
    s4_zurich: 'Zürich konzentriert den Großteil des Schweizer Marktes für KI-Beratung für KMU. Die hohe Dichte an Fintech-, Healthtech- und Medtech-Startups erzeugt intensiven Wettbewerb — Zürcher KMU, die keine KI einführen, riskieren, an Wettbewerbsfähigkeit zu verlieren. Die nachfragestärksten Branchen in Zürich: Finanzdienstleistungen, Immobilien, Rechtsberatung, Zahnmedizin.',
    s4_basel: 'Basel hat ein anderes Profil: Dominanz der Pharmaindustrie (Novartis, Roche), die einen Sogeffekt auf KMU-Zulieferer und -Dienstleister erzeugt. KI-Beratung in Basel konzentriert sich oft auf regulatorische Konformität (GxP, ISO, FDA) und die Automatisierung von Dokumentationsprozessen.',
    s4_alemania: 'In der Deutschschweiz außerhalb von Zürich und Basel (St. Gallen, Luzern, Bern, Winterthur) bilden Handwerks- und Industrie-KMU den Großteil des Marktes. Die gefragtesten KI-Lösungen: Offertautomatisierung, Einsatzplanung vor Ort, mehrsprachige Kundenkommunikation.',
    s5_title: 'nDSG-Konformität und KI-Beratung: praktische Pflichten',
    s5_ndsg: 'Das nDSG ist seit September 2023 in Kraft und verpflichtet Schweizer KMU, die KI für die Verarbeitung personenbezogener Daten nutzen, vier Kernanforderungen zu erfüllen:',
    s5_tips: [
      'Transparenz: Betroffene Personen informieren, wenn KI ihre Daten verarbeitet (E-Mails, Anrufe, Formulare)',
      'Datensparsamkeit: Nur die für den erklärten Zweck zwingend erforderlichen Daten erheben und verarbeiten',
      'Souveränes Hosting: Infomaniak, Exoscale oder Schweizer/EU-Rechenzentrum für alle Automatisierungs-Tools bevorzugen',
      'Dokumentation: Aktuelles Verarbeitungsverzeichnis für KI-Aktivitäten führen (Pflicht bei >250 MA oder sensiblen Daten)',
    ],
    s5_penalite: 'nDSG-Bußen für Verantwortliche sind möglich. Häufigste Verstöße in KMU: keine Information über KI-Chatbots, Hosting in den USA ohne angemessene Garantien, fehlendes Verarbeitungsverzeichnis.',
    s6_title: 'ROI der KI-Beratung für Schweizer KMU: echte Benchmarks',
    s6_desc: 'Ergebnisse aus KI-Beratungsmandaten bei Schweizer KMU zwischen 2024 und 2026:',
    s6_stats: [
      { label: 'KMU mit positivem ROI in 12 Monaten', value: '73 %', detail: 'Mit Expertenbegleitung (vs. 24 % bei Selbst-Deployment)' },
      { label: 'Ersparnis administrativer Zeit', value: '14 h/Monat', detail: 'Pro betroffene/r Mitarbeitende/r im Durchschnitt' },
      { label: 'Reduzierung der Fehlerquote', value: '65–80 %', detail: 'Bei automatisierten Dokumentenprozessen' },
      { label: 'Durchschnittliche Zeit bis zu ersten Ergebnissen', value: '21 Tage', detail: 'Erste messbare Gewinne nach Deployment' },
    ],
    faq_title: 'Häufige Fragen — KI-Beratung für Schweizer KMU',
    faqs: [
      {
        q: 'Wie wird KI-Beratung für ein KMU in der Schweiz definiert?',
        a: 'Der Umfang eines KI-Beratungsmandats hängt vom Projektumfang und dem Profil des Anbieters ab. Für eine genaue, auf Ihr KMU zugeschnittene Einschätzung bieten wir ein kostenloses 30-min?tiges Audit an, das Ihnen ermöglicht, das Potenzial und die echten Prioritäten zu bewerten.',
      },
      {
        q: 'Was unterscheidet einen KI-Berater von einem KI-Entwickler?',
        a: 'Ein KI-Berater analysiert Ihre Prozesse, wählt die richtigen Tools aus und steuert das Deployment, ohne zwingend Code zu schreiben. Ein KI-Entwickler erstellt maßgeschneiderte Lösungen (ML-Modelle, APIs, Anwendungen). Für 80 % der KMU generiert ein Berater, der bestehende Lösungen orchestriert, mehr Wert.',
      },
      {
        q: 'Ist KI-Beratung auch für KMU mit weniger als 10 Mitarbeitenden sinnvoll?',
        a: 'Ja. KMU mit 2–10 Mitarbeitenden erzielen oft den höchsten ROI, weil jede eingesparte Stunde einen größeren Anteil der Gesamtkapazität darstellt. Typische Projekte: Rechnungsautomatisierung, E-Mail-Beantwortung, Terminvereinbarung — in 2–4 Wochen umsetzbar.',
      },
      {
        q: 'Kann man mit einem KI-Berater für ein Deutschschweizer KMU remote zusammenarbeiten?',
        a: 'Ja. IAPME Suisse arbeitet mit KMU in allen Sprachregionen. Unsere Berater sind zwei- oder dreisprachig (FR/DE/IT), und alle unsere Lösungen werden in den drei Regionen getestet. Die Mandate laufen überwiegend remote ab.',
      },
      {
        q: 'Wie kann ich wissen, ob mein KMU bereit für ein KI-Projekt ist?',
        a: 'Drei Schlüsselindikatoren: 1) Sie haben repetitive Aufgaben, die mehr als 5 h/Woche beanspruchen, 2) Sie haben ein CRM oder Verwaltungssystem (auch ein einfaches), 3) Sie sind bereit, 1–2 h/Woche über 3 Monate in das Projekt zu investieren. Ein kostenloses 30-Minuten-Audit identifiziert dann die prioritären Chancen.',
      },
    ],
    internal_links_title: 'Weiterführende Ressourcen — KI-Beratung & AI beratung KMU Schweiz',
    internal_links: [
      { href: '/automatisation-ia-pme-suisse', label: 'KI-Automatisierung für Schweizer KMU: vollständiger Leitfaden 2026' },
      { href: '/formation-ia-pme', label: 'KI-Schulung für Führungskräfte und Mitarbeitende' },
      { href: '/consulting', label: 'KI-Beratung für KMU — unsere Begleitungsangebote' },
      { href: '/outils-ia', label: 'Die besten KI-Tools für Schweizer KMU' },
      { href: '/blog/audit-ia-gratuit-pme-suisse-checklist-nlpd', label: 'Kostenloses KI-Audit KMU Schweiz: nDSG-Checkliste' },
      { href: '/blog/strategie-ia-pme-suisse-2026', label: 'KI-Strategie für Schweizer KMU: Leitfaden 2026' },
      { href: '/blog/budget-ia-pme-suisse', label: 'KI-Budget KMU Schweiz: Was 2026 einplanen?' },
      { href: '/cantons', label: 'KI nach Kanton: Genf, Waadt, Wallis, Zürich, Bern, Basel' },
      { href: '/contact', label: 'Kostenloses KI-Audit (30 min) — Termin vereinbaren' },
    ],
  },
  en: {
    breadcrumbLabel: 'AI Consulting Swiss SMEs',
    hero_title: 'AI consulting for Swiss SMEs',
    hero_subtitle: 'Complete guide 2026',
    hero_desc: 'How do you find the right AI consultant for your Swiss SME? This guide covers selection criteria, cantonal specificities, nFADP compliance, and real ROI calculation.',
    cta_audit: 'Request a free 30-min audit',
    cta_consulting: 'View our consulting offers',
    s1_title: 'What is AI consulting for SMEs?',
    s1_p1: 'AI consulting for SMEs refers to the strategic and operational support of a company in its adoption of artificial intelligence. Unlike buying SaaS software, AI consulting starts with a diagnosis: which processes to automate first, which tools suit your sector, which nFADP risks to identify.',
    s1_p2: 'In Switzerland, the AI consulting market for SMEs doubled between 2023 and 2026 (Digitalswitzerland, 2025). SMEs that used a specialist consultant are on average 3x more likely to achieve a positive ROI within 12 months than those that deployed tools without support.',
    s2_title: 'How to choose an AI consultant for your Swiss SME?',
    s2_criteria: [
      {
        title: '1. Verifiable sector experience',
        desc: 'A good AI consultant knows your sector (retail, services, trades, healthcare, hospitality). Ask for references from Swiss SMEs in your field and measurable results: hours saved, revenue generated, error rates reduced.',
      },
      {
        title: '2. Mastery of nFADP compliance',
        desc: 'The Federal Act on Data Protection (nFADP) imposes specific obligations as soon as your SME automates personal data. A serious consultant integrates compliance from the design stage, not as an optional add-on.',
      },
      {
        title: '3. Swiss multilingual approach',
        desc: 'Operating in FR/DE/IT/EN is not a secondary constraint — it is a central technical criterion. Your consultant must have deployed operational solutions across all three Swiss language regions.',
      },
      {
        title: '4. Transparency on tools used',
        desc: 'Be wary of consultants who systematically recommend the same tools without analysis. Good AI consulting evaluates Make, n8n, ChatGPT, Vocalis, Bexio and others according to your precise context.',
      },
      {
        title: '5. Commitment to measurable results',
        desc: 'Serious AI consulting is measured in KPIs: time saved, costs reduced, additional qualified leads. Require a plan with defined milestones and metrics before signing.',
      },
    ],
    s3_title: 'AI consulting vs AI agency: what difference for your SME?',
    s3_p1: 'Two models coexist on the Swiss market: the independent AI consultant and the AI agency. They do not meet the same needs.',
    s3_comparison: [
      { aspect: 'Typical client SME size', consultant: 'SME 5–50 employees', agence: 'SME 20–200+ employees' },
      { aspect: 'Depth of intervention', consultant: 'Strategy + deployment management', agence: 'Strategy + custom development' },
      { aspect: 'Responsiveness', consultant: 'High (single point of contact)', agence: 'Variable (several contributors)' },
      { aspect: 'Relative cost', consultant: 'More accessible', agence: 'Higher, heavier projects' },
      { aspect: 'Integrated nFADP compliance', consultant: 'Depends on profile', agence: 'Generally yes (dedicated team)' },
      { aspect: 'Multilingualism FR/DE/IT', consultant: 'Variable by profile', agence: 'Often native' },
    ],
    s3_p2: 'For an SME of 10–40 employees looking to automate 3–5 processes and train its teams, a specialist AI consultant is often the optimal choice. For a complete customer experience transformation integrating AI, CRM, and data analytics, an agency brings more depth.',
    s4_title: 'AI consulting in Zurich, Basel and German-speaking Switzerland',
    s4_zurich: 'Zurich concentrates the majority of the Swiss market for AI consulting for SMEs. The high density of fintech, healthtech and medtech startups creates intense competition — Zurich SMEs that do not adopt AI risk losing competitiveness. Most in-demand sectors in Zurich: financial services, real estate, legal consulting, dentistry.',
    s4_basel: 'Basel has a different profile: dominance of the pharmaceutical and chemical industry (Novartis, Roche), which creates a knock-on effect on SME suppliers and service providers. AI consulting in Basel often focuses on regulatory compliance (GxP, ISO, FDA) and automation of documentation processes.',
    s4_alemania: 'In German-speaking Switzerland outside Zurich and Basel (St. Gallen, Lucerne, Bern, Winterthur), craft and industrial SMEs make up the bulk of the market. Most sought-after AI solutions: quote automation, field service management, multilingual customer communication.',
    s5_title: 'nFADP compliance and AI consulting: practical obligations',
    s5_ndsg: 'The nFADP came into force in September 2023. It imposes four key obligations on Swiss SMEs that use AI to process personal data:',
    s5_tips: [
      'Transparency: inform people when AI processes their data (emails, calls, forms)',
      'Data minimisation: collect and process only the data strictly necessary for the stated purpose',
      'Sovereign hosting: prefer Infomaniak, Exoscale or a Swiss/EU data centre for all automation tools',
      'Documentation: maintain an up-to-date register of AI processing activities (mandatory for >250 employees or sensitive data)',
    ],
    s5_penalite: 'nFADP fines for responsible persons are possible. Most common violations in SMEs: no information about AI chatbots, hosting in the USA without adequate safeguards, missing processing register.',
    s6_title: 'ROI of AI consulting for Swiss SMEs: real benchmarks',
    s6_desc: 'Results measured on AI consulting mandates carried out with Swiss SMEs between 2024 and 2026:',
    s6_stats: [
      { label: 'SMEs with positive ROI in 12 months', value: '73%', detail: 'With expert support (vs. 24% self-deployment)' },
      { label: 'Administrative time savings', value: '14 h/month', detail: 'Per concerned employee on average' },
      { label: 'Error rate reduction', value: '65–80%', detail: 'On automated document processes' },
      { label: 'Average time to first results', value: '21 days', detail: 'First measurable gains post-deployment' },
    ],
    faq_title: 'Frequently asked questions — AI consulting for Swiss SMEs',
    faqs: [
      {
        q: 'How should AI consulting be scoped for an SME in Switzerland?',
        a: 'The scope of an AI consulting mandate depends on the project, data context and provider profile. A free 30-minute audit helps evaluate the potential and the real priorities for your SME.',
      },
      {
        q: 'What is the difference between an AI consultant and an AI developer?',
        a: 'An AI consultant analyses your processes, selects the right tools and oversees deployment without necessarily writing code. An AI developer creates custom solutions (ML models, APIs, applications). For 80% of SMEs, a consultant who orchestrates existing solutions generates more value.',
      },
      {
        q: 'Is AI consulting relevant for an SME with fewer than 10 employees?',
        a: 'Yes. SMEs with 2–10 employees often benefit from the highest ROI because each hour saved represents a larger proportion of total capacity. Typical projects: invoice automation, email responses, appointment booking — deployable in 2–4 weeks.',
      },
      {
        q: 'Can you work remotely with an AI consultant for a German-speaking Swiss SME?',
        a: 'Yes. IAPME Suisse works with SMEs in all language regions. Our consultants are bilingual or trilingual (FR/DE/IT) and all our solutions are tested across the three regions. Mandates run mainly remotely.',
      },
      {
        q: 'How do I know if my SME is ready for an AI project?',
        a: 'Three key indicators: 1) you have repetitive tasks taking more than 5h/week, 2) you have a CRM or management system (even a basic one), 3) you are willing to devote 1–2h/week to the project for 3 months. A free 30-minute audit will then identify priority opportunities.',
      },
    ],
    internal_links_title: 'Further resources — AI consulting for Swiss SMEs',
    internal_links: [
      { href: '/automatisation-ia-pme-suisse', label: 'AI automation for Swiss SMEs: complete guide 2026' },
      { href: '/formation-ia-pme', label: 'AI training for managers and employees' },
      { href: '/consulting', label: 'AI consulting for SMEs — our support packages' },
      { href: '/outils-ia', label: 'Best AI tools for Swiss SMEs' },
      { href: '/blog/audit-ia-gratuit-pme-suisse-checklist-nlpd', label: 'Free AI audit Swiss SME: nFADP checklist' },
      { href: '/blog/strategie-ia-pme-suisse-2026', label: 'AI strategy for Swiss SMEs: guide 2026' },
      { href: '/automatisation-ia-pme-suisse', label: 'Scope an AI roadmap for Swiss SMEs in 2026' },
      { href: '/cantons', label: 'AI by canton: Geneva, Vaud, Valais, Zurich, Bern, Basel' },
      { href: '/contact', label: 'Free AI audit (30 min) — book now' },
    ],
  },
  it: {
    breadcrumbLabel: 'Consulenza IA PMI Svizzera',
    hero_title: 'Consulenza IA per PMI svizzere',
    hero_subtitle: 'Guida completa 2026',
    hero_desc: 'Come trovare il giusto consulente IA per la vostra PMI svizzera? Questa guida copre i criteri di selezione, le specificità cantonali, la conformità nLPD e il calcolo del ROI reale.',
    cta_audit: 'Richiedere un audit gratuito 30 min',
    cta_consulting: 'Vedere le nostre offerte di consulenza',
    s1_title: "Cos'è la consulenza IA per le PMI?",
    s1_p1: "La consulenza IA per PMI designa l'accompagnamento strategico e operativo di un'impresa nell'adozione dell'intelligenza artificiale. A differenza dell'acquisto di un software SaaS, la consulenza IA inizia con una diagnosi: quali processi automatizzare prima, quali strumenti corrispondono al vostro settore, quali rischi nLPD identificare.",
    s1_p2: "In Svizzera, il mercato della consulenza IA per PMI è raddoppiato tra il 2023 e il 2026 (Digitalswitzerland, 2025). Le PMI che si sono avvalse di un consulente specializzato hanno in media 3 volte più probabilità di ottenere un ROI positivo entro 12 mesi rispetto a quelle che hanno implementato strumenti senza supporto.",
    s2_title: 'Come scegliere un consulente IA per la vostra PMI svizzera?',
    s2_criteria: [
      {
        title: '1. Esperienza settoriale verificabile',
        desc: "Un buon consulente IA conosce il vostro settore (commercio, servizi, artigianato, salute, ospitalità). Richiedete referenze di PMI svizzere nel vostro ambito e risultati misurabili: ore risparmiate, fatturato generato, tassi di errore ridotti.",
      },
      {
        title: '2. Padronanza della conformità nLPD',
        desc: "La legge federale sulla protezione dei dati (nLPD) impone obblighi specifici non appena la vostra PMI automatizza dati personali. Un consulente serio integra la conformità sin dalla progettazione, non come opzione a pagamento.",
      },
      {
        title: '3. Approccio multilingue svizzero',
        desc: "Operare in FR/DE/IT/EN non è un vincolo secondario — è un criterio tecnico centrale. Il vostro consulente deve aver implementato soluzioni operative nelle tre regioni linguistiche svizzere.",
      },
      {
        title: '4. Trasparenza sugli strumenti utilizzati',
        desc: "Diffidate dei consulenti che raccomandano sistematicamente gli stessi strumenti senza analisi. Una buona consulenza IA valuta Make, n8n, ChatGPT, Vocalis, Bexio e altri in base al vostro contesto preciso.",
      },
      {
        title: '5. Impegno su risultati misurabili',
        desc: "La consulenza IA seria si misura in KPI: tempo risparmiato, errori ridotti, lead qualificati aggiuntivi. Esigete un piano con tappe e metriche definite prima della firma.",
      },
    ],
    s3_title: 'Consulenza IA vs agenzia IA: quale differenza per la vostra PMI?',
    s3_p1: 'Sul mercato svizzero coesistono due modelli: il consulente IA indipendente e l\'agenzia IA. Non rispondono alle stesse esigenze.',
    s3_comparison: [
      { aspect: 'Dimensione tipica della PMI cliente', consultant: 'PMI 5–50 dipendenti', agence: 'PMI 20–200+ dipendenti' },
      { aspect: 'Profondità di intervento', consultant: 'Strategia + gestione deployment', agence: 'Strategia + sviluppo personalizzato' },
      { aspect: 'Reattività', consultant: 'Elevata (interlocutore unico)', agence: 'Variabile (più intervenenti)' },
      { aspect: 'Costo relativo', consultant: 'Più accessibile', agence: 'Più elevato, progetti più pesanti' },
      { aspect: 'Conformità nLPD integrata', consultant: 'Dipende dal profilo', agence: 'In genere sì (team dedicato)' },
      { aspect: 'Multilinguismo FR/DE/IT', consultant: 'Variabile per profilo', agence: 'Spesso nativo' },
    ],
    s3_p2: "Per una PMI di 10–40 dipendenti che desidera automatizzare 3–5 processi e formare i propri team, un consulente IA specializzato è spesso la scelta ottimale. Per un progetto completo di trasformazione dell'esperienza cliente con IA, CRM e analisi dei dati, un'agenzia offre più profondità.",
    s4_title: 'Consulenza IA a Zurigo, Basilea e nella Svizzera tedesca',
    s4_zurich: "Zurigo concentra la maggior parte del mercato svizzero della consulenza IA per PMI. L'alta densità di startup fintech, healthtech e medtech crea una concorrenza intensa. I settori più attivi a Zurigo: servizi finanziari, immobiliare, consulenza legale, odontoiatria.",
    s4_basel: "Basilea ha un profilo diverso: dominanza dell'industria farmaceutica (Novartis, Roche) che crea un effetto traino sulle PMI subfornitrici. La consulenza IA a Basilea si concentra spesso sulla conformità normativa (GxP, ISO, FDA) e sull'automazione della documentazione.",
    s4_alemania: "Nella Svizzera tedesca al di fuori di Zurigo e Basilea (San Gallo, Lucerna, Berna, Winterthur), le PMI artigianali e industriali costituiscono la maggior parte del mercato. Le soluzioni IA più richieste: automazione dei preventivi, gestione delle trasferte, comunicazione multilingue con la clientela.",
    s5_title: 'Conformità nLPD e consulenza IA: obblighi pratici',
    s5_ndsg: "La nLPD è in vigore dal settembre 2023 e impone alle PMI svizzere che utilizzano l'IA per trattare dati personali quattro obblighi chiave:",
    s5_tips: [
      "Trasparenza: informare le persone interessate quando l'IA tratta i loro dati (email, chiamate, moduli)",
      "Minimizzazione: raccogliere e trattare solo i dati strettamente necessari alla finalità dichiarata",
      "Hosting sovrano: preferire Infomaniak, Exoscale o un datacenter svizzero/UE per tutti gli strumenti di automazione",
      "Documentazione: tenere un registro aggiornato delle attività di trattamento IA (obbligatorio per >250 dipendenti o dati sensibili)",
    ],
    s5_penalite: "Sono possibili sanzioni nLPD per le persone responsabili. Violazioni più frequenti nelle PMI: nessuna informazione sui chatbot IA, hosting negli USA senza garanzie adeguate, assenza del registro dei trattamenti.",
    s6_title: 'ROI della consulenza IA per PMI svizzere: benchmark reali',
    s6_desc: 'Risultati misurati su mandati di consulenza IA realizzati presso PMI svizzere tra il 2024 e il 2026:',
    s6_stats: [
      { label: 'PMI con ROI positivo in 12 mesi', value: '73%', detail: 'Con supporto esperto (vs. 24% in auto-deployment)' },
      { label: 'Risparmio di tempo amministrativo', value: '14 h/mese', detail: 'Per dipendente coinvolto in media' },
      { label: 'Riduzione del tasso di errore', value: '65–80%', detail: 'Sui processi documentali automatizzati' },
      { label: 'Tempo medio ai primi risultati', value: '21 giorni', detail: 'Primi guadagni misurabili post-deployment' },
    ],
    faq_title: 'Domande frequenti — Consulenza IA per PMI svizzere',
    faqs: [
      {
        q: "Come definire una consulenza IA per una PMI in Svizzera?",
        a: "Il perimetro di un mandato di consulenza IA dipende dall'ampiezza del progetto, dai dati e dal profilo del fornitore. Un audit gratuito di 30 minuti permette di valutare il potenziale e le priorità reali.",
      },
      {
        q: "Qual è la differenza tra un consulente IA e uno sviluppatore IA?",
        a: "Un consulente IA analizza i vostri processi, seleziona gli strumenti giusti e supervisiona il deployment senza necessariamente scrivere codice. Uno sviluppatore IA crea soluzioni personalizzate. Per l'80% delle PMI, un consulente che orchestra soluzioni esistenti genera più valore.",
      },
      {
        q: "La consulenza IA è rilevante per una PMI con meno di 10 dipendenti?",
        a: "Sì. Le PMI di 2–10 dipendenti beneficiano spesso del ROI più elevato perché ogni ora risparmiata rappresenta una percentuale maggiore della capacità totale. Progetti tipici: automazione della fatturazione, risposta alle email, prenotazione appuntamenti — implementabili in 2–4 settimane.",
      },
      {
        q: "È possibile collaborare a distanza con un consulente IA per una PMI ticinese?",
        a: "Sì. IAPME Suisse lavora con PMI in tutte le regioni linguistiche. I nostri consulenti sono bilingui o trilingui (FR/DE/IT) e tutte le nostre soluzioni sono testate nelle tre regioni. I mandati si svolgono principalmente a distanza.",
      },
      {
        q: "Come sapere se la mia PMI è pronta per un progetto IA?",
        a: "Tre indicatori chiave: 1) avete compiti ripetitivi che richiedono più di 5h/settimana, 2) disponete di un CRM o sistema gestionale (anche basico), 3) siete pronti a dedicare 1–2h/settimana al progetto per 3 mesi. Un audit gratuito di 30 minuti identificherà le opportunità prioritarie.",
      },
    ],
    internal_links_title: 'Risorse complementari — Consulenza IA PMI svizzera',
    internal_links: [
      { href: '/automatisation-ia-pme-suisse', label: 'Automazione IA per PMI svizzere: guida completa 2026' },
      { href: '/formation-ia-pme', label: 'Formazione IA per dirigenti e collaboratori' },
      { href: '/consulting', label: 'Consulenza IA per PMI — le nostre offerte di accompagnamento' },
      { href: '/outils-ia', label: 'I migliori strumenti IA per PMI svizzere' },
      { href: '/blog/audit-ia-gratuit-pme-suisse-checklist-nlpd', label: 'Audit IA gratuito PMI svizzera: checklist nLPD' },
      { href: '/blog/strategie-ia-pme-suisse-2026', label: 'Strategia IA per PMI svizzere: guida 2026' },
      { href: '/automatisation-ia-pme-suisse', label: 'Definire una roadmap IA per PMI svizzere nel 2026' },
      { href: '/cantons', label: 'IA per cantone: Ginevra, Vaud, Vallese, Zurigo, Berna, Basilea' },
      { href: '/contact', label: 'Audit IA gratuito (30 min) — prendere appuntamento' },
    ],
  },
};

export default async function KiBeratungPillarPage({ params }: Props) {
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
    },
    publisher: {
      '@type': 'Organization',
      name: 'IAPME Suisse',
      url: 'https://iapmesuisse.ch',
    },
    datePublished: '2026-05-27',
    dateModified: '2026-05-27',
    mainEntityOfPage: `https://iapmesuisse.ch/${locale}/ki-beratung-kmu-schweiz`,
    url: `https://iapmesuisse.ch/${locale}/ki-beratung-kmu-schweiz`,
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

      {/* Section 2 — Critères de sélection */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B2A4A] sm:text-3xl">{tData.s2_title}</h2>
          <div className="mt-6 space-y-6">
            {tData.s2_criteria.map((criterion, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="text-base font-bold text-[#1B2A4A]">{criterion.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{criterion.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Consultant vs Agence */}
      <section className="bg-gray-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B2A4A] sm:text-3xl">{tData.s3_title}</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-700">{tData.s3_p1}</p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-white text-left">
                  <th className="px-4 py-3 font-semibold text-[#1B2A4A]">Critère</th>
                  <th className="px-4 py-3 font-semibold text-[#FF0000]">Consultant IA</th>
                  <th className="px-4 py-3 font-semibold text-[#1B2A4A]">Agence IA</th>
                </tr>
              </thead>
              <tbody>
                {tData.s3_comparison.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-white">
                    <td className="px-4 py-3 font-medium text-gray-700">{row.aspect}</td>
                    <td className="px-4 py-3 text-gray-600">{row.consultant}</td>
                    <td className="px-4 py-3 text-gray-600">{row.agence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-700">{tData.s3_p2}</p>
        </div>
      </section>

      {/* Section 4 — Zurich, Bâle, Suisse alémanique */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B2A4A] sm:text-3xl">{tData.s4_title}</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-base font-bold text-[#1B2A4A]">Zurich / Zürich</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">{tData.s4_zurich}</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-base font-bold text-[#1B2A4A]">Basel / Bâle</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">{tData.s4_basel}</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-base font-bold text-[#1B2A4A]">Deutschschweiz — St. Gallen, Luzern, Bern</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">{tData.s4_alemania}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — nDSG/nLPD */}
      <section className="bg-gray-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B2A4A] sm:text-3xl">{tData.s5_title}</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-700">{tData.s5_ndsg}</p>
          <div className="mt-6 rounded-xl border-l-4 border-[#FF0000] bg-red-50 p-6">
            <ul className="space-y-2">
              {tData.s5_tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-0.5 h-4 w-4 shrink-0 text-[#FF0000]">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            {tData.s5_penalite}
          </p>
        </div>
      </section>

      {/* Section 6 — ROI */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B2A4A] sm:text-3xl">{tData.s6_title}</h2>
          <p className="mt-3 text-base leading-relaxed text-gray-700">{tData.s6_desc}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {tData.s6_stats.map((stat, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <p className="text-3xl font-extrabold text-[#FF0000]">{stat.value}</p>
                <p className="mt-1 font-semibold text-[#1B2A4A]">{stat.label}</p>
                <p className="mt-1 text-sm text-gray-500">{stat.detail}</p>
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
