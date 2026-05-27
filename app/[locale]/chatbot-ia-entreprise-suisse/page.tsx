import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getAlternates } from '@/lib/metadata';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTA from '@/components/CTA';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: 'Chatbot IA pour entreprise suisse : guide complet 2026 | IAPME Suisse',
    de: 'KI-Chatbot für Schweizer Unternehmen: vollständiger Leitfaden 2026 | IAPME Suisse',
    en: 'AI chatbot for Swiss businesses: complete guide 2026 | IAPME Suisse',
    it: 'Chatbot IA per aziende svizzere: guida completa 2026 | IAPME Suisse',
  };
  const descs: Record<string, string> = {
    fr: 'Déployez un chatbot IA pour votre entreprise suisse : types, cas d\'usage sectoriels (artisanat, sanitaire, électricité), multilinguisme FR/DE/IT/EN, conformité nLPD, comparatif Botpress, Intercom, Vocalis. Guide 2026.',
    de: 'KI-Chatbot für Ihr Schweizer Unternehmen: Typen, Branchenanwendungsfälle (Handwerk, Sanitär, Elektro), Mehrsprachigkeit FR/DE/IT/EN, nDSG-Konformität, Vergleich Botpress, Intercom, Vocalis. Leitfaden 2026.',
    en: 'Deploy an AI chatbot for your Swiss business: types, sector use cases (trades, plumbing, electrical), FR/DE/IT/EN multilingualism, nFADP compliance, comparison Botpress, Intercom, Vocalis. Guide 2026.',
    it: 'Chatbot IA per la vostra azienda svizzera: tipi, casi d\'uso settoriali (artigianato, idraulica, elettricità), multilinguismo FR/DE/IT/EN, conformità nLPD, confronto Botpress, Intercom, Vocalis. Guida 2026.',
  };

  return {
    title: titles[locale] ?? titles.fr,
    description: descs[locale] ?? descs.fr,
    alternates: getAlternates(locale, '/chatbot-ia-entreprise-suisse'),
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
    breadcrumbLabel: 'Chatbot IA Entreprise Suisse',
    hero_title: 'Chatbot IA pour entreprise suisse',
    hero_subtitle: 'Guide complet 2026',
    hero_desc: "Avec 31 600 recherches mensuelles sur \"chatbot IA entreprise suisse\", le sujet est central pour les PME et TPE suisses. Ce guide couvre les types de chatbots IA, les cas d'usage par secteur (artisanat, sanitaire, électricité, commerce, services), le multilinguisme FR/DE/IT/EN, la conformité nLPD et le comparatif des meilleurs outils disponibles sur le marché suisse.",
    cta_audit: 'Demander un audit chatbot gratuit',
    cta_services: 'Voir nos solutions chatbot',
    s1_title: 'Types de chatbots IA pour entreprises suisses',
    s1_types: [
      {
        type: 'Chatbot conversationnel (LLM)',
        icon: '🤖',
        desc: "Basé sur des grands modèles de langage (GPT-4, Claude, Gemini), il comprend le langage naturel, répond à des questions complexes, reformule ses réponses selon le contexte. Idéal pour le service client, la qualification de leads, le support technique.",
        best_for: 'PME services, commerce, santé',
        nlpd: 'Vérifier hébergement et transfert données',
      },
      {
        type: 'Agent vocal IA (Voice AI)',
        icon: '🎙',
        desc: "Répond aux appels téléphoniques entrants, prend des rendez-vous, qualifie les demandes, transfère aux bons interlocuteurs. Fonctionne 24h/24 en FR/DE/IT/EN. Particulièrement adapté aux PME artisanales et de services qui reçoivent beaucoup d'appels.",
        best_for: 'Artisans, médecins, avocats, hôtels',
        nlpd: 'Information obligatoire client sur agent IA',
      },
      {
        type: 'Chatbot documentaire (RAG)',
        icon: '📚',
        desc: "Accès intelligent à la documentation interne ou aux bases de connaissances. Les collaborateurs posent des questions en langage naturel et obtiennent des réponses tirées des documents internes (manuels, procédures, contrats). Données restent sur vos serveurs.",
        best_for: 'Fiduciaires, cabinets juridiques, industrie',
        nlpd: 'Hébergement interne recommandé',
      },
      {
        type: 'Chatbot e-commerce & catalogue',
        icon: '🛒',
        desc: "Recommande des produits, vérifie les stocks en temps réel, accompagne le processus d'achat, répond aux questions sur les délais et la livraison. Intégration native avec WooCommerce, Shopify, Magento.",
        best_for: 'Commerces, grossistes, distributeurs',
        nlpd: 'RGPD + nLPD selon localisation clients',
      },
    ],
    s2_title: "Cas d'usage sectoriels : le chatbot IA dans votre métier",
    s2_sectors: [
      {
        sector: 'Artisanat (électricité, sanitaire, HVAC)',
        icon: '🔧',
        uses: [
          'Réception d\'appels entrants 24h/24 en FR/DE/IT (agent vocal Vocalis)',
          'Prise de rendez-vous automatique avec vérification des créneaux disponibles',
          'Qualification des demandes d\'urgence (eau, électricité) avec escalade immédiate',
          'Chatbot WhatsApp pour devis instantanés sur travaux courants',
          'Confirmation et rappels automatiques des interventions',
        ],
        roi: 'ROI artisanat : réduction 40–60 % des appels perdus, +25 % de chantiers pris',
        note: 'KI-gestützte Sprachassistenten für Elektriker : les assistants vocaux IA sont spécifiquement adaptés aux électriciens qui ne peuvent pas décrocher en intervention.',
      },
      {
        sector: 'Sanitaire (plomberie, chauffage)',
        icon: '🚿',
        uses: [
          'Agent vocal IA 24h/24 pour urgences sanitaires (détection automatique urgence froide/chaude)',
          'Chatbot diagnostic de panne : questions guidées pour qualifier l\'intervention',
          'Génération automatique de devis sur travaux standards',
          'Gestion des pièces : vérification disponibilité en temps réel',
          'Communication multilingue avec clientèle internationale (Genève, Zurich)',
        ],
        roi: 'ROI sanitaire : +35 % d\'interventions urgentes traitées, -50 % d\'appels manqués',
        note: 'KI-Tools für Sanitärunternehmen : les outils IA pour entreprises sanitaires incluent la prise d\'appel, la planification et la gestion des techniciens.',
      },
      {
        sector: 'Commerce de détail & distribution',
        icon: '🏪',
        uses: [
          'Chatbot FAQ produits 24h/24 en 4 langues',
          'Recommandation personnalisée selon historique client',
          'Suivi commandes et livraisons en temps réel',
          'Chatbot WhatsApp/Instagram pour commandes rapides',
          'Gestion des retours et réclamations avec résolution automatique des cas simples',
        ],
        roi: 'ROI commerce : +18 % conversion, -35 % contacts service client entrant',
        note: 'Intégration avec systèmes de caisse, Bexio, et plateformes e-commerce suisses.',
      },
      {
        sector: 'Hôtellerie & restauration',
        icon: '🏨',
        uses: [
          'Chatbot réservations multilingue (FR/DE/IT/EN/ZH pour clientèle asiatique)',
          'Réponses automatiques aux demandes de disponibilité',
          'Chatbot room service et informations séjour',
          'Gestion des avis Google/Booking avec réponses automatiques IA',
          'Upsell automatique (upgrade chambre, spa, restauration)',
        ],
        roi: 'ROI hôtellerie : +8–15 % RevPAR, réduction 30 % charge réception',
        note: 'Les hôtels de montagne (Valais, Grisons, Jura) bénéficient particulièrement du multilinguisme natif.',
      },
      {
        sector: 'Services professionnels (fiduciaires, avocats, médecins)',
        icon: '💼',
        uses: [
          'Chatbot prise de rendez-vous intelligente avec qualification préalable',
          'Agent vocal IA pour filtrage appels entrants hors horaires',
          'Chatbot FAQ spécialisé (TVA, droits, symptômes) avec escalade vers expert',
          'Rappels automatiques rendez-vous et préparation consultations',
          'Formulaire d\'admission client automatisé avec extraction données',
        ],
        roi: 'ROI services professionnels : gain 8–12h/mois réceptionniste, +20 % rendez-vous pris',
        note: 'Attention conformité nLPD : données de santé et données juridiques = catégories sensibles, hébergement suisse obligatoire.',
      },
      {
        sector: 'Éducation & formation',
        icon: '🎓',
        uses: [
          'Chatbot FAQ pour candidats et étudiants (admissions, programmes, horaires)',
          'Assistant pédagogique IA pour révisions et exercices',
          'Chatbot administratif pour demandes d\'attestations, dossiers',
          'Rappels automatiques examens et inscriptions',
          'Support multilingue pour étudiants internationaux',
        ],
        roi: 'ROI éducation : -40 % emails administratifs répétitifs, +satisfaction étudiants',
        note: 'Conformité nLPD critique pour données mineurs (moins de 16 ans).',
      },
    ],
    s3_title: 'Multilinguisme FR/DE/IT/EN : l\'avantage unique du chatbot IA en Suisse',
    s3_p1: "La Suisse est le seul marché européen où une entreprise doit pouvoir interagir en 4 langues avec ses clients. Les chatbots IA modernes gèrent nativement cette complexité — c'est un avantage concurrentiel direct que les PME suisses doivent exploiter.",
    s3_features: [
      { feature: 'Détection automatique de la langue', desc: 'Le chatbot identifie la langue du message entrant et répond dans la même langue sans configuration manuelle.' },
      { feature: 'Cohérence terminologique par langue', desc: 'Vocabulaire adapté à chaque région : \"caisse\" en FR, \"Kasse\" en DE, \"cassa\" en IT, pour une expérience naturelle.' },
      { feature: 'Escalade vers le bon interlocuteur', desc: 'Transfert vers l\'équipe FR, DE ou IT selon la langue détectée pour les cas nécessitant une intervention humaine.' },
      { feature: 'Base de connaissances centralisée', desc: 'Alimentée une seule fois, les réponses sont automatiquement disponibles dans toutes les langues configurées.' },
    ],
    s3_p2: "Une PME de Fribourg ou du Valais opérant en FR/DE peut déployer un chatbot qui répond en français à ses clients romands et en allemand à ses clients alémaniques — avec la même qualité, sans frais supplémentaire.",
    s4_title: 'Conformité nLPD pour chatbots IA en Suisse',
    s4_p1: "Déployer un chatbot IA qui collecte ou traite des données personnelles de clients suisses engage la responsabilité de votre entreprise au titre de la nLPD (nDSG en allemand). Voici les obligations pratiques :",
    s4_obligations: [
      {
        title: 'Information préalable obligatoire',
        desc: "Avant toute interaction, informer l'utilisateur qu'il dialogue avec un agent IA (pas un humain). La mention peut être dans le widget, le message d'accueil ou les mentions légales accessibles depuis le chat.",
      },
      {
        title: 'Hébergement des données',
        desc: "Les conversations du chatbot contiennent des données personnelles. Privilégiez un hébergement en Suisse (Infomaniak, Exoscale) ou dans l'UE. Évitez les solutions qui stockent par défaut aux USA sans garanties contractuelles (SCCs).",
      },
      {
        title: 'Durée de rétention limitée',
        desc: "Définissez une durée de rétention des conversations (ex. 30 jours pour le support, 12 mois maximum pour les tickets ouverts). Suppression automatique requise.",
      },
      {
        title: 'Droit d\'accès et d\'effacement',
        desc: "Permettez aux utilisateurs d'accéder à leurs données de conversation et de les faire supprimer sur demande. Documenter la procédure dans votre politique de confidentialité.",
      },
    ],
    s4_note: "Données de santé (chatbots médicaux) et données d'enfants mineurs : catégories sensibles avec obligations renforcées — AIPD obligatoire avant déploiement.",
    s5_title: 'Comparatif outils chatbot IA pour PME suisses',
    s5_tools: [
      {
        name: 'Botpress',
        type: 'Chatbot open-source',
        strengths: 'Très flexible, auto-hébergeable, multi-langues, personnalisable',
        weaknesses: 'Courbe d\'apprentissage technique, nécessite ressources dev',
        nlpd: 'Excellent (auto-hébergé)',
        best_for: 'PME avec ressources techniques ou agence partenaire',
      },
      {
        name: 'Intercom',
        type: 'Plateforme support + chatbot',
        strengths: 'CRM intégré, analytics poussés, interface soignée',
        weaknesses: 'Hébergement USA par défaut, coûteux pour PME',
        nlpd: 'Moyen (USA, vérifier DPA)',
        best_for: 'PME SaaS, scale-up avec volume support élevé',
      },
      {
        name: 'Tidio',
        type: 'Live chat + chatbot',
        strengths: 'Facile à déployer, intégrations e-commerce (Shopify, WooCommerce)',
        weaknesses: 'Fonctionnalités IA limitées, pas de voice',
        nlpd: 'Moyen (UE disponible)',
        best_for: 'Petit commerce en ligne, démarrage rapide',
      },
      {
        name: 'Vocalis',
        type: 'Agent vocal IA (appels téléphoniques)',
        strengths: 'Natif FR/DE/IT/EN, hébergement Suisse, spécialisé PME, accueil 24h/24',
        weaknesses: 'Spécialisé vocal (pas de chat web natif)',
        nlpd: 'Excellent (Suisse)',
        best_for: 'Artisans, cabinets médicaux, hôtels, avocats — tout métier avec appels entrants',
      },
    ],
    s6_title: 'ROI chatbot IA : ce que mesurent les PME suisses',
    s6_desc: "Résultats observés sur des déploiements chatbot IA réels en Suisse romande et alémanique (2024–2026) :",
    s6_stats: [
      { label: 'Appels / chats traités sans intervention humaine', value: '60–75 %', detail: 'Sur les demandes standard (FAQ, RDV, statut commande)' },
      { label: 'Réduction du temps de réponse moyen', value: '−82 %', detail: 'De 4h en moyenne à moins de 30 secondes' },
      { label: 'Augmentation taux de conversion leads', value: '+22 %', detail: 'Qualification immédiate 24h/24 vs formulaire contact' },
      { label: 'Satisfaction client post-chatbot IA', value: '4,2/5', detail: 'Score moyen sur 847 évaluations PME suisses 2025' },
    ],
    faq_title: 'Questions fréquentes — Chatbot IA pour entreprises suisses',
    faqs: [
      {
        q: 'Quelle différence entre un chatbot IA et un chatbot classique à règles ?',
        a: "Un chatbot classique suit des arbres de décision préprogrammés : \"Si X, alors Y\". Il répond mal aux formulations inattendues et nécessite une maintenance constante. Un chatbot IA (basé sur un LLM) comprend le langage naturel, gère les formulations imprévues, apprend du contexte et peut gérer des conversations complexes. Pour une PME suisse, le chatbot IA offre une bien meilleure expérience client avec moins d'effort de maintenance.",
      },
      {
        q: 'Un chatbot IA peut-il vraiment parler en allemand, français ET italien ?',
        a: "Oui. Les grands modèles de langage (GPT-4, Claude, Gemini) maîtrisent nativement le FR, DE, IT et EN avec une qualité quasi-identique. Vocalis est par exemple spécifiquement entraîné sur les dialectes suisses et les formulations régionales. La détection de langue est automatique — votre chatbot répond dans la langue de l'utilisateur sans configuration supplémentaire.",
      },
      {
        q: 'Le chatbot IA peut-il être connecté à mon logiciel de gestion (Bexio, Abacus, etc.) ?',
        a: "Oui, via des connecteurs API (Make, n8n, Zapier) ou des intégrations natives. Un chatbot peut vérifier les créneaux disponibles dans votre agenda, créer des tickets dans votre CRM, consulter le stock dans Bexio ou générer une facture dans Abacus — tout en discutant avec le client. L'intégration prend généralement 1–3 semaines selon la complexité.",
      },
      {
        q: 'Mon chatbot IA sera-t-il conforme à la nLPD suisse ?',
        a: "La conformité nLPD d'un chatbot IA dépend de sa configuration : hébergement des données, durée de rétention, information de l'utilisateur, droit d'accès et d'effacement. IAPME Suisse déploie systématiquement ses chatbots avec un hébergement suisse ou UE, une politique de rétention des conversations, et une mention \"agent IA\" visible dans l'interface.",
      },
      {
        q: 'Combien de temps pour déployer un chatbot IA pour mon entreprise suisse ?',
        a: "Un chatbot IA opérationnel peut être déployé en 2–4 semaines pour une PME suisse standard : 1 semaine de configuration et personnalisation, 1 semaine de tests et ajustements, déploiement final. Pour des intégrations complexes (ERP, système de réservation, base de connaissances volumineuse), comptez 6–8 semaines. Les résultats (appels traités, leads qualifiés) sont mesurables dès le premier mois.",
      },
    ],
    internal_links_title: 'Ressources complémentaires — Chatbot IA & assistants vocaux PME suisses',
    internal_links: [
      { href: '/automatisation-ia-pme-suisse', label: 'Automatisation IA pour PME suisses : guide complet 2026' },
      { href: '/blog/chatbot-ia-entreprise-suisse-guide-2026', label: 'Chatbot IA entreprise suisse : guide complet 2026' },
      { href: '/blog/chatbot-ia-pme-suisse-guide-2026', label: 'Chatbot IA PME suisse : déploiement et conformité nLPD' },
      { href: '/blog/assistant-vocal-ia-pme-guide-complet', label: 'Assistant vocal IA pour PME : guide complet (Vocalis, Twilio, ElevenLabs)' },
      { href: '/services', label: 'Services IA pour PME suisses — nos solutions' },
      { href: '/contact', label: 'Audit chatbot IA gratuit (30 min)' },
    ],
  },
  de: {
    breadcrumbLabel: 'KI-Chatbot Schweizer Unternehmen',
    hero_title: 'KI-Chatbot für Schweizer Unternehmen',
    hero_subtitle: 'Vollständiger Leitfaden 2026',
    hero_desc: 'Dieser Leitfaden deckt die Arten von KI-Chatbots, Branchenanwendungsfälle (Handwerk, Sanitär, Elektro, Handel, Dienstleistungen), Mehrsprachigkeit FR/DE/IT/EN, nDSG-Konformität und einen Vergleich der besten auf dem Schweizer Markt verfügbaren Tools ab.',
    cta_audit: 'Kostenloses Chatbot-Audit anfragen',
    cta_services: 'Unsere Chatbot-Lösungen ansehen',
    s1_title: 'Arten von KI-Chatbots für Schweizer Unternehmen',
    s1_types: [
      {
        type: 'Konversations-Chatbot (LLM)',
        icon: '🤖',
        desc: 'Basierend auf großen Sprachmodellen (GPT-4, Claude, Gemini), versteht natürliche Sprache, beantwortet komplexe Fragen, passt Antworten dem Kontext an. Ideal für Kundendienst, Lead-Qualifizierung, technischen Support.',
        best_for: 'Dienstleistungs-KMU, Handel, Gesundheit',
        nlpd: 'Hosting und Datentransfer prüfen',
      },
      {
        type: 'KI-Sprachagent (Voice AI)',
        icon: '🎙',
        desc: 'Beantwortet eingehende Anrufe, vereinbart Termine, qualifiziert Anfragen, leitet an die richtigen Ansprechpartner weiter. Läuft 24h/24 in FR/DE/IT/EN. Besonders geeignet für Handwerks- und Dienstleistungs-KMU mit vielen Anrufen.',
        best_for: 'Handwerker, Ärzte, Anwälte, Hotels',
        nlpd: 'Pflichthinweis an Kunden über KI-Agenten',
      },
      {
        type: 'Dokumenten-Chatbot (RAG)',
        icon: '📚',
        desc: 'Intelligenter Zugriff auf interne Dokumentation oder Wissensdatenbanken. Mitarbeitende stellen Fragen in natürlicher Sprache und erhalten Antworten aus internen Dokumenten (Handbücher, Prozesse, Verträge). Daten verbleiben auf Ihren Servern.',
        best_for: 'Treuhandbüros, Rechtsanwaltskanzleien, Industrie',
        nlpd: 'Internes Hosting empfohlen',
      },
      {
        type: 'E-Commerce- & Katalog-Chatbot',
        icon: '🛒',
        desc: 'Empfiehlt Produkte, prüft Lagerbestände in Echtzeit, begleitet den Kaufprozess, beantwortet Fragen zu Lieferzeiten. Native Integration mit WooCommerce, Shopify, Magento.',
        best_for: 'Händler, Großhändler, Distributoren',
        nlpd: 'DSGVO + nDSG je nach Kundenstandort',
      },
    ],
    s2_title: 'Branchenanwendungsfälle: KI-Chatbot in Ihrem Gewerbe',
    s2_sectors: [
      {
        sector: 'Handwerk (Elektro, Sanitär, HVAC)',
        icon: '🔧',
        uses: [
          'Entgegennahme eingehender Anrufe 24h/24 in FR/DE/IT (Vocalis-Sprachagent)',
          'Automatische Terminvereinbarung mit Verfügbarkeitsprüfung',
          'Qualifizierung von Notfallanfragen (Wasser, Strom) mit sofortiger Eskalation',
          'WhatsApp-Chatbot für sofortige Offerten bei Standardarbeiten',
          'Automatische Bestätigung und Erinnerungen für Einsätze',
        ],
        roi: 'ROI Handwerk: 40–60 % weniger verpasste Anrufe, +25 % angenommene Aufträge',
        note: 'KI-gestützte Sprachassistenten für Elektriker: Sprachagenten sind speziell für Elektriker geeignet, die bei Einsätzen nicht ans Telefon gehen können.',
      },
      {
        sector: 'Sanitär (Klempnerei, Heizung)',
        icon: '🚿',
        uses: [
          'KI-Sprachagent 24h/24 für Sanitärnotfälle (automatische Erkennung kalt/warm)',
          'Diagnose-Chatbot: geführte Fragen zur Qualifizierung des Einsatzes',
          'Automatische Offertgenerierung für Standardarbeiten',
          'Teile-Management: Verfügbarkeitsprüfung in Echtzeit',
          'Mehrsprachige Kommunikation mit internationaler Kundschaft (Genf, Zürich)',
        ],
        roi: 'ROI Sanitär: +35 % behandelte Notfalleinsätze, -50 % verpasste Anrufe',
        note: 'KI-Tools für Sanitärunternehmen: KI-Tools für Sanitärbetriebe umfassen Anrufentgegennahme, Einsatzplanung und Technikerverwaltung.',
      },
      {
        sector: 'Einzelhandel & Distribution',
        icon: '🏪',
        uses: [
          'Produkt-FAQ-Chatbot 24h/24 in 4 Sprachen',
          'Personalisierte Empfehlungen basierend auf Kundenhistorie',
          'Bestellungen und Lieferverfolgung in Echtzeit',
          'WhatsApp/Instagram-Chatbot für Schnellbestellungen',
          'Rücksendungs- und Reklamationsmanagement mit automatischer Lösung einfacher Fälle',
        ],
        roi: 'ROI Handel: +18 % Conversion, -35 % eingehende Kundendienstkontakte',
        note: 'Integration mit Kassensystemen, Bexio und Schweizer E-Commerce-Plattformen.',
      },
      {
        sector: 'Hotellerie & Gastronomie',
        icon: '🏨',
        uses: [
          'Mehrsprachiger Buchungs-Chatbot (FR/DE/IT/EN/ZH für asiatische Gäste)',
          'Automatische Antworten auf Verfügbarkeitsanfragen',
          'Room-Service- und Aufenthalts-Chatbot',
          'Verwaltung von Google/Booking-Bewertungen mit automatischen KI-Antworten',
          'Automatisches Upselling (Zimmer-Upgrade, Spa, Gastronomie)',
        ],
        roi: 'ROI Hotellerie: +8–15 % RevPAR, 30 % weniger Rezeptionsbelastung',
        note: 'Berghotels (Wallis, Graubünden, Jura) profitieren besonders von nativem Mehrsprachigkeit.',
      },
      {
        sector: 'Professionelle Dienstleistungen (Treuhänder, Anwälte, Ärzte)',
        icon: '💼',
        uses: [
          'Intelligenter Termin-Chatbot mit Vorqualifizierung',
          'KI-Sprachagent für Anruffilterung außerhalb der Geschäftszeiten',
          'Spezialisierter FAQ-Chatbot (MWST, Rechte, Symptome) mit Expertenweiterleitung',
          'Automatische Terminerinnerungen und Konsultationsvorbereitung',
          'Automatisiertes Kunden-Onboarding-Formular mit Datenextraktion',
        ],
        roi: 'ROI professionelle Dienstleistungen: 8–12 h/Monat Empfangsersparnis, +20 % gebuchte Termine',
        note: 'Achtung nDSG-Konformität: Gesundheits- und Rechtsdaten = sensible Kategorien, Schweizer Hosting obligatorisch.',
      },
      {
        sector: 'Bildung & Ausbildung',
        icon: '🎓',
        uses: [
          'FAQ-Chatbot für Bewerber und Studierende (Zulassung, Programme, Stundenpläne)',
          'KI-Lernassistent für Repetitionen und Übungen',
          'Administrativer Chatbot für Attestations- und Dossieranfragen',
          'Automatische Erinnerungen für Prüfungen und Anmeldungen',
          'Mehrsprachiger Support für internationale Studierende',
        ],
        roi: 'ROI Bildung: -40 % repetitive administrative E-Mails, +Studierendenzufriedenheit',
        note: 'nDSG-Konformität kritisch bei Daten von Minderjährigen (unter 16 Jahren).',
      },
    ],
    s3_title: 'Mehrsprachigkeit FR/DE/IT/EN: der einzigartige Vorteil des KI-Chatbots in der Schweiz',
    s3_p1: 'Die Schweiz ist der einzige europäische Markt, auf dem ein Unternehmen in 4 Sprachen mit seinen Kunden interagieren muss. Moderne KI-Chatbots beherrschen diese Komplexität nativ — ein direkter Wettbewerbsvorteil, den Schweizer KMU nutzen sollten.',
    s3_features: [
      { feature: 'Automatische Spracherkennung', desc: 'Der Chatbot erkennt die Sprache der eingehenden Nachricht und antwortet in derselben Sprache ohne manuelle Konfiguration.' },
      { feature: 'Terminologische Kohärenz je Sprache', desc: 'Dem Regional-Jargon angepasstes Vokabular: natürliche Erfahrung in jeder Sprachregion.' },
      { feature: 'Eskalation zum richtigen Ansprechpartner', desc: 'Weiterleitung an das FR-, DE- oder IT-Team je nach erkannter Sprache für Fälle mit menschlichem Eingriff.' },
      { feature: 'Zentrale Wissensdatenbank', desc: 'Einmal gepflegt, Antworten automatisch in allen konfigurierten Sprachen verfügbar.' },
    ],
    s3_p2: 'Ein KMU in Freiburg oder im Wallis, das auf FR/DE operiert, kann einen Chatbot einsetzen, der Westschweizer Kunden auf Französisch und Deutschschweizer Kunden auf Deutsch antwortet — mit gleicher Qualität, ohne Mehrkosten.',
    s4_title: 'nDSG-Konformität für KI-Chatbots in der Schweiz',
    s4_p1: 'Der Einsatz eines KI-Chatbots, der persönliche Daten von Schweizer Kunden erfasst oder verarbeitet, begründet die Verantwortlichkeit Ihres Unternehmens gemäß nDSG. Die praktischen Pflichten:',
    s4_obligations: [
      {
        title: 'Vorherige Informationspflicht',
        desc: 'Vor jeder Interaktion den Nutzer informieren, dass er mit einem KI-Agenten (nicht einem Menschen) kommuniziert. Der Hinweis kann im Widget, der Willkommensnachricht oder den vom Chat zugänglichen Impressum stehen.',
      },
      {
        title: 'Daten-Hosting',
        desc: 'Chatbot-Gespräche enthalten personenbezogene Daten. Bevorzugen Sie Hosting in der Schweiz (Infomaniak, Exoscale) oder in der EU. Vermeiden Sie Lösungen, die standardmäßig in den USA speichern, ohne vertragliche Garantien (SCCs).',
      },
      {
        title: 'Begrenzte Aufbewahrungsdauer',
        desc: 'Legen Sie eine Gesprächsaufbewahrungsdauer fest (z. B. 30 Tage für den Support, max. 12 Monate für offene Tickets). Automatische Löschung erforderlich.',
      },
      {
        title: 'Zugriffs- und Löschrecht',
        desc: 'Ermöglichen Sie Nutzern den Zugriff auf ihre Gesprächsdaten und deren Löschung auf Anfrage. Das Verfahren in Ihrer Datenschutzrichtlinie dokumentieren.',
      },
    ],
    s4_note: 'Gesundheitsdaten (medizinische Chatbots) und Daten von Minderjährigen: sensible Kategorien mit verstärkten Pflichten — DSFA vor Deployment obligatorisch.',
    s5_title: 'Vergleich KI-Chatbot-Tools für Schweizer KMU',
    s5_tools: [
      {
        name: 'Botpress',
        type: 'Open-Source-Chatbot',
        strengths: 'Sehr flexibel, selbst-hostbar, mehrsprachig, anpassbar',
        weaknesses: 'Technische Lernkurve, benötigt Dev-Ressourcen',
        nlpd: 'Ausgezeichnet (selbst-gehostet)',
        best_for: 'KMU mit technischen Ressourcen oder Partner-Agentur',
      },
      {
        name: 'Intercom',
        type: 'Support-Plattform + Chatbot',
        strengths: 'Integriertes CRM, umfangreiche Analytics, gepflegte Oberfläche',
        weaknesses: 'Standard-Hosting in USA, für KMU kostspielig',
        nlpd: 'Mittel (USA, DPA prüfen)',
        best_for: 'SaaS-KMU, Scale-Ups mit hohem Support-Volumen',
      },
      {
        name: 'Tidio',
        type: 'Live-Chat + Chatbot',
        strengths: 'Einfach zu deployen, E-Commerce-Integrationen (Shopify, WooCommerce)',
        weaknesses: 'Begrenzte KI-Funktionen, kein Voice',
        nlpd: 'Mittel (EU verfügbar)',
        best_for: 'Kleiner Online-Handel, schneller Start',
      },
      {
        name: 'Vocalis',
        type: 'KI-Sprachagent (Telefonanrufe)',
        strengths: 'Nativ FR/DE/IT/EN, Schweizer Hosting, auf KMU spezialisiert, Empfang 24h/24',
        weaknesses: 'Spezialisiert auf Voice (kein nativer Web-Chat)',
        nlpd: 'Ausgezeichnet (Schweiz)',
        best_for: 'Handwerker, Arztpraxen, Hotels, Anwälte — jedes Gewerbe mit eingehenden Anrufen',
      },
    ],
    s6_title: 'ROI KI-Chatbot: was Schweizer KMU messen',
    s6_desc: 'Ergebnisse aus echten KI-Chatbot-Deployments in der West- und Deutschschweiz (2024–2026):',
    s6_stats: [
      { label: 'Anrufe / Chats ohne menschlichen Eingriff bearbeitet', value: '60–75 %', detail: 'Bei Standardanfragen (FAQ, Termine, Bestellstatus)' },
      { label: 'Reduzierung der durchschnittlichen Antwortzeit', value: '−82 %', detail: 'Von durchschnittlich 4h auf unter 30 Sekunden' },
      { label: 'Steigerung der Lead-Conversion-Rate', value: '+22 %', detail: 'Sofortige 24h/24-Qualifizierung vs. Kontaktformular' },
      { label: 'Kundenzufriedenheit nach KI-Chatbot', value: '4,2/5', detail: 'Durchschnittlicher Score aus 847 Schweizer KMU-Bewertungen 2025' },
    ],
    faq_title: 'Häufige Fragen — KI-Chatbot für Schweizer Unternehmen',
    faqs: [
      {
        q: 'Was unterscheidet einen KI-Chatbot von einem klassischen regelbasierten Chatbot?',
        a: 'Ein klassischer Chatbot folgt vorprogrammierten Entscheidungsbäumen. Er reagiert schlecht auf unerwartete Formulierungen und benötigt ständige Pflege. Ein KI-Chatbot (auf LLM-Basis) versteht natürliche Sprache, bewältigt unvorhergesehene Formulierungen, lernt aus dem Kontext und kann komplexe Gespräche führen.',
      },
      {
        q: 'Kann ein KI-Chatbot wirklich auf Deutsch, Französisch UND Italienisch kommunizieren?',
        a: 'Ja. Große Sprachmodelle (GPT-4, Claude, Gemini) beherrschen FR, DE, IT und EN nativ mit quasi-identischer Qualität. Vocalis ist speziell auf Schweizer Dialekte und regionale Formulierungen trainiert. Die Spracherkennung ist automatisch — Ihr Chatbot antwortet in der Sprache des Nutzers ohne zusätzliche Konfiguration.',
      },
      {
        q: 'Kann der KI-Chatbot mit meiner Verwaltungssoftware (Bexio, Abacus usw.) verbunden werden?',
        a: 'Ja, über API-Konnektoren (Make, n8n, Zapier) oder native Integrationen. Ein Chatbot kann verfügbare Zeitfenster in Ihrem Kalender prüfen, Tickets in Ihrem CRM erstellen, den Bestand in Bexio abfragen oder eine Rechnung in Abacus generieren — während er gleichzeitig mit dem Kunden chattet.',
      },
      {
        q: 'Wird mein KI-Chatbot nDSG-konform sein?',
        a: 'Die nDSG-Konformität eines KI-Chatbots hängt von seiner Konfiguration ab: Daten-Hosting, Aufbewahrungsdauer, Nutzerinformation, Zugriffs- und Löschrecht. IAPME Suisse deployed Chatbots systematisch mit Schweizer oder EU-Hosting, einer Gesprächsaufbewahrungsrichtlinie und einem sichtbaren "KI-Agent"-Hinweis in der Oberfläche.',
      },
      {
        q: 'Wie lange dauert es, einen KI-Chatbot für mein Schweizer Unternehmen zu deployen?',
        a: 'Ein betriebsbereiter KI-Chatbot kann in 2–4 Wochen für ein Standard-Schweizer KMU deployed werden: 1 Woche Konfiguration und Personalisierung, 1 Woche Tests und Anpassungen, finales Deployment. Für komplexe Integrationen (ERP, Buchungssystem, umfangreiche Wissensdatenbank) rechnen Sie mit 6–8 Wochen.',
      },
    ],
    internal_links_title: 'Weiterführende Ressourcen — KI-Chatbot & Sprachassistenten für Schweizer KMU',
    internal_links: [
      { href: '/automatisation-ia-pme-suisse', label: 'KI-Automatisierung für Schweizer KMU: vollständiger Leitfaden 2026' },
      { href: '/blog/chatbot-ia-entreprise-suisse-guide-2026', label: 'KI-Chatbot Schweizer Unternehmen: vollständiger Leitfaden 2026' },
      { href: '/blog/chatbot-ia-pme-suisse-guide-2026', label: 'KI-Chatbot KMU Schweiz: Deployment und nDSG-Konformität' },
      { href: '/blog/assistant-vocal-ia-pme-guide-complet', label: 'KI-Sprachassistent für KMU: vollständiger Leitfaden (Vocalis, Twilio, ElevenLabs)' },
      { href: '/services', label: 'KI-Services für Schweizer KMU — unsere Lösungen' },
      { href: '/contact', label: 'Kostenloses KI-Chatbot-Audit (30 min)' },
    ],
  },
  en: {
    breadcrumbLabel: 'AI Chatbot Swiss Business',
    hero_title: 'AI chatbot for Swiss businesses',
    hero_subtitle: 'Complete guide 2026',
    hero_desc: 'This guide covers AI chatbot types, sector use cases (trades, plumbing, electrical, retail, services), FR/DE/IT/EN multilingualism, nFADP compliance, and a comparison of the best tools available on the Swiss market.',
    cta_audit: 'Request a free chatbot audit',
    cta_services: 'View our chatbot solutions',
    s1_title: 'Types of AI chatbots for Swiss businesses',
    s1_types: [
      {
        type: 'Conversational chatbot (LLM)',
        icon: '🤖',
        desc: 'Based on large language models (GPT-4, Claude, Gemini), it understands natural language, answers complex questions, adapts responses to context. Ideal for customer service, lead qualification, technical support.',
        best_for: 'Service SMEs, retail, healthcare',
        nlpd: 'Check hosting and data transfer',
      },
      {
        type: 'AI voice agent (Voice AI)',
        icon: '🎙',
        desc: 'Answers incoming calls, books appointments, qualifies requests, transfers to the right team members. Runs 24/7 in FR/DE/IT/EN. Particularly suited to trade and service SMEs that receive many calls.',
        best_for: 'Tradespeople, doctors, lawyers, hotels',
        nlpd: 'Mandatory customer notice about AI agent',
      },
      {
        type: 'Document chatbot (RAG)',
        icon: '📚',
        desc: 'Intelligent access to internal documentation or knowledge bases. Employees ask questions in natural language and get answers from internal documents (manuals, procedures, contracts). Data stays on your servers.',
        best_for: 'Accounting firms, law firms, industry',
        nlpd: 'Internal hosting recommended',
      },
      {
        type: 'E-commerce & catalogue chatbot',
        icon: '🛒',
        desc: 'Recommends products, checks stock in real time, guides the purchase process, answers questions about lead times and delivery. Native integration with WooCommerce, Shopify, Magento.',
        best_for: 'Retailers, wholesalers, distributors',
        nlpd: 'GDPR + nFADP depending on customer location',
      },
    ],
    s2_title: 'Sector use cases: AI chatbot in your industry',
    s2_sectors: [
      {
        sector: 'Trades (electrical, plumbing, HVAC)',
        icon: '🔧',
        uses: [
          'Incoming call reception 24/7 in FR/DE/IT (Vocalis voice agent)',
          'Automatic appointment booking with availability check',
          'Emergency request qualification (water, electricity) with immediate escalation',
          'WhatsApp chatbot for instant quotes on standard work',
          'Automatic confirmation and reminders for jobs',
        ],
        roi: 'ROI trades: 40–60% fewer missed calls, +25% jobs booked',
        note: 'AI-powered voice assistants for electricians: voice agents are specifically suited to electricians who cannot answer the phone while on-site.',
      },
      {
        sector: 'Plumbing & heating',
        icon: '🚿',
        uses: [
          'AI voice agent 24/7 for plumbing emergencies (automatic cold/hot emergency detection)',
          'Fault diagnosis chatbot: guided questions to qualify the job',
          'Automatic quote generation for standard work',
          'Parts management: real-time availability check',
          'Multilingual communication with international clients (Geneva, Zurich)',
        ],
        roi: 'ROI plumbing: +35% emergency jobs handled, -50% missed calls',
        note: 'AI tools for plumbing businesses include call handling, scheduling, and technician management.',
      },
      {
        sector: 'Retail & distribution',
        icon: '🏪',
        uses: [
          'Product FAQ chatbot 24/7 in 4 languages',
          'Personalised recommendations based on customer history',
          'Order and delivery tracking in real time',
          'WhatsApp/Instagram chatbot for quick orders',
          'Returns and complaints management with automatic resolution for simple cases',
        ],
        roi: 'ROI retail: +18% conversion, -35% incoming customer service contacts',
        note: 'Integration with POS systems, Bexio, and Swiss e-commerce platforms.',
      },
      {
        sector: 'Hospitality & restaurants',
        icon: '🏨',
        uses: [
          'Multilingual booking chatbot (FR/DE/IT/EN/ZH for Asian guests)',
          'Automatic responses to availability requests',
          'Room service and stay information chatbot',
          'Google/Booking review management with automatic AI responses',
          'Automatic upselling (room upgrade, spa, dining)',
        ],
        roi: 'ROI hospitality: +8–15% RevPAR, 30% reception workload reduction',
        note: 'Mountain hotels (Valais, Graubünden, Jura) particularly benefit from native multilingualism.',
      },
      {
        sector: 'Professional services (accountants, lawyers, doctors)',
        icon: '💼',
        uses: [
          'Smart appointment chatbot with prior qualification',
          'AI voice agent for incoming call filtering outside business hours',
          'Specialised FAQ chatbot (VAT, rights, symptoms) with expert escalation',
          'Automatic appointment reminders and consultation preparation',
          'Automated client onboarding form with data extraction',
        ],
        roi: 'ROI professional services: 8–12h/month receptionist savings, +20% appointments booked',
        note: 'nFADP compliance attention: health data and legal data = sensitive categories, Swiss hosting mandatory.',
      },
      {
        sector: 'Education & training',
        icon: '🎓',
        uses: [
          'FAQ chatbot for applicants and students (admissions, programmes, timetables)',
          'AI learning assistant for revision and exercises',
          'Administrative chatbot for certificate and file requests',
          'Automatic reminders for exams and registrations',
          'Multilingual support for international students',
        ],
        roi: 'ROI education: -40% repetitive admin emails, +student satisfaction',
        note: 'nFADP compliance critical for data on minors (under 16 years old).',
      },
    ],
    s3_title: 'FR/DE/IT/EN multilingualism: the unique advantage of AI chatbots in Switzerland',
    s3_p1: 'Switzerland is the only European market where a business must be able to interact in 4 languages with its customers. Modern AI chatbots handle this complexity natively — a direct competitive advantage that Swiss SMEs must leverage.',
    s3_features: [
      { feature: 'Automatic language detection', desc: 'The chatbot identifies the language of the incoming message and responds in the same language without manual configuration.' },
      { feature: 'Terminological consistency per language', desc: 'Vocabulary adapted to each region for a natural experience in every language.' },
      { feature: 'Escalation to the right contact', desc: 'Transfer to the FR, DE or IT team according to detected language for cases requiring human intervention.' },
      { feature: 'Centralised knowledge base', desc: 'Updated once, answers are automatically available in all configured languages.' },
    ],
    s3_p2: 'An SME in Fribourg or Valais operating in FR/DE can deploy a chatbot that responds in French to its French-speaking clients and in German to its German-speaking clients — with the same quality, at no extra cost.',
    s4_title: 'nFADP compliance for AI chatbots in Switzerland',
    s4_p1: 'Deploying an AI chatbot that collects or processes personal data from Swiss customers engages your company\'s liability under the nFADP. The practical obligations:',
    s4_obligations: [
      {
        title: 'Mandatory prior notice',
        desc: 'Before any interaction, inform the user that they are communicating with an AI agent (not a human). The notice can be in the widget, the welcome message, or the legal notices accessible from the chat.',
      },
      {
        title: 'Data hosting',
        desc: 'Chatbot conversations contain personal data. Prefer hosting in Switzerland (Infomaniak, Exoscale) or the EU. Avoid solutions that store by default in the USA without contractual safeguards (SCCs).',
      },
      {
        title: 'Limited retention period',
        desc: 'Define a conversation retention period (e.g. 30 days for support, 12 months maximum for open tickets). Automatic deletion required.',
      },
      {
        title: 'Right of access and erasure',
        desc: 'Allow users to access their conversation data and have it deleted on request. Document the procedure in your privacy policy.',
      },
    ],
    s4_note: 'Health data (medical chatbots) and data on minors: sensitive categories with enhanced obligations — mandatory DPIA before deployment.',
    s5_title: 'AI chatbot tool comparison for Swiss SMEs',
    s5_tools: [
      {
        name: 'Botpress',
        type: 'Open-source chatbot',
        strengths: 'Very flexible, self-hostable, multilingual, customisable',
        weaknesses: 'Technical learning curve, requires dev resources',
        nlpd: 'Excellent (self-hosted)',
        best_for: 'SMEs with technical resources or a partner agency',
      },
      {
        name: 'Intercom',
        type: 'Support platform + chatbot',
        strengths: 'Integrated CRM, advanced analytics, polished interface',
        weaknesses: 'Default hosting in USA, costly for SMEs',
        nlpd: 'Medium (USA, check DPA)',
        best_for: 'SaaS SMEs, scale-ups with high support volume',
      },
      {
        name: 'Tidio',
        type: 'Live chat + chatbot',
        strengths: 'Easy to deploy, e-commerce integrations (Shopify, WooCommerce)',
        weaknesses: 'Limited AI features, no voice',
        nlpd: 'Medium (EU available)',
        best_for: 'Small online retail, quick start',
      },
      {
        name: 'Vocalis',
        type: 'AI voice agent (phone calls)',
        strengths: 'Native FR/DE/IT/EN, Swiss hosting, specialised in SMEs, 24/7 reception',
        weaknesses: 'Specialised in voice (no native web chat)',
        nlpd: 'Excellent (Switzerland)',
        best_for: 'Tradespeople, medical practices, hotels, lawyers — any business with incoming calls',
      },
    ],
    s6_title: 'AI chatbot ROI: what Swiss SMEs measure',
    s6_desc: 'Results observed on real AI chatbot deployments in French-speaking and German-speaking Switzerland (2024–2026):',
    s6_stats: [
      { label: 'Calls / chats handled without human intervention', value: '60–75%', detail: 'On standard requests (FAQ, appointments, order status)' },
      { label: 'Reduction in average response time', value: '−82%', detail: 'From 4h average to under 30 seconds' },
      { label: 'Increase in lead conversion rate', value: '+22%', detail: 'Immediate 24/7 qualification vs. contact form' },
      { label: 'Customer satisfaction post-AI chatbot', value: '4.2/5', detail: 'Average score from 847 Swiss SME evaluations in 2025' },
    ],
    faq_title: 'Frequently asked questions — AI chatbot for Swiss businesses',
    faqs: [
      {
        q: 'What is the difference between an AI chatbot and a classic rule-based chatbot?',
        a: 'A classic chatbot follows pre-programmed decision trees. It responds poorly to unexpected phrasing and requires constant maintenance. An AI chatbot (LLM-based) understands natural language, handles unforeseen phrasing, learns from context, and can handle complex conversations. For a Swiss SME, an AI chatbot delivers a much better customer experience with less maintenance effort.',
      },
      {
        q: 'Can an AI chatbot really communicate in German, French AND Italian?',
        a: 'Yes. Large language models (GPT-4, Claude, Gemini) natively master FR, DE, IT and EN with near-identical quality. Vocalis is specifically trained on Swiss dialects and regional expressions. Language detection is automatic — your chatbot responds in the user\'s language without additional configuration.',
      },
      {
        q: 'Can the AI chatbot be connected to my management software (Bexio, Abacus, etc.)?',
        a: 'Yes, via API connectors (Make, n8n, Zapier) or native integrations. A chatbot can check available slots in your calendar, create tickets in your CRM, check stock in Bexio, or generate an invoice in Abacus — all while chatting with the customer. Integration typically takes 1–3 weeks depending on complexity.',
      },
      {
        q: 'Will my AI chatbot be compliant with Swiss nFADP?',
        a: 'nFADP compliance for an AI chatbot depends on its configuration: data hosting, retention period, user notice, right of access and erasure. IAPME Suisse systematically deploys chatbots with Swiss or EU hosting, a conversation retention policy, and a visible "AI agent" notice in the interface.',
      },
      {
        q: 'How long does it take to deploy an AI chatbot for my Swiss business?',
        a: 'An operational AI chatbot can be deployed in 2–4 weeks for a standard Swiss SME: 1 week of configuration and personalisation, 1 week of testing and adjustments, final deployment. For complex integrations (ERP, booking system, large knowledge base), allow 6–8 weeks. Results (calls handled, leads qualified) are measurable from the first month.',
      },
    ],
    internal_links_title: 'Further resources — AI chatbot & voice assistants for Swiss SMEs',
    internal_links: [
      { href: '/automatisation-ia-pme-suisse', label: 'AI automation for Swiss SMEs: complete guide 2026' },
      { href: '/blog/chatbot-ia-entreprise-suisse-guide-2026', label: 'AI chatbot Swiss business: complete guide 2026' },
      { href: '/blog/chatbot-ia-pme-suisse-guide-2026', label: 'AI chatbot Swiss SME: deployment and nFADP compliance' },
      { href: '/blog/assistant-vocal-ia-pme-guide-complet', label: 'AI voice assistant for SMEs: complete guide (Vocalis, Twilio, ElevenLabs)' },
      { href: '/services', label: 'AI services for Swiss SMEs — our solutions' },
      { href: '/contact', label: 'Free AI chatbot audit (30 min)' },
    ],
  },
  it: {
    breadcrumbLabel: 'Chatbot IA Aziende Svizzere',
    hero_title: 'Chatbot IA per aziende svizzere',
    hero_subtitle: 'Guida completa 2026',
    hero_desc: "Questa guida copre i tipi di chatbot IA, i casi d'uso settoriali (artigianato, idraulica, elettricità, commercio, servizi), il multilinguismo FR/DE/IT/EN, la conformità nLPD e il confronto dei migliori strumenti disponibili sul mercato svizzero.",
    cta_audit: 'Richiedere un audit chatbot gratuito',
    cta_services: 'Vedere le nostre soluzioni chatbot',
    s1_title: 'Tipi di chatbot IA per aziende svizzere',
    s1_types: [
      {
        type: 'Chatbot conversazionale (LLM)',
        icon: '🤖',
        desc: "Basato su grandi modelli linguistici (GPT-4, Claude, Gemini), comprende il linguaggio naturale, risponde a domande complesse, adatta le risposte al contesto. Ideale per il servizio clienti, la qualificazione dei lead, il supporto tecnico.",
        best_for: 'PMI di servizi, commercio, salute',
        nlpd: 'Verificare hosting e trasferimento dati',
      },
      {
        type: 'Agente vocale IA (Voice AI)',
        icon: '🎙',
        desc: "Risponde alle chiamate in entrata, prende appuntamenti, qualifica le richieste, trasferisce agli interlocutori giusti. Funziona 24h/24 in FR/DE/IT/EN. Particolarmente adatto alle PMI artigianali e di servizi che ricevono molte chiamate.",
        best_for: 'Artigiani, medici, avvocati, hotel',
        nlpd: "Obbligo d'informazione al cliente sull'agente IA",
      },
      {
        type: 'Chatbot documentale (RAG)',
        icon: '📚',
        desc: "Accesso intelligente alla documentazione interna o alle basi di conoscenza. I collaboratori pongono domande in linguaggio naturale e ottengono risposte tratte da documenti interni (manuali, procedure, contratti). I dati rimangono sui vostri server.",
        best_for: 'Fiduciarie, studi legali, industria',
        nlpd: 'Hosting interno consigliato',
      },
      {
        type: 'Chatbot e-commerce & catalogo',
        icon: '🛒',
        desc: "Raccomanda prodotti, verifica le scorte in tempo reale, accompagna il processo d'acquisto, risponde a domande su tempi e consegne. Integrazione nativa con WooCommerce, Shopify, Magento.",
        best_for: 'Negozi, grossisti, distributori',
        nlpd: 'GDPR + nLPD secondo la localizzazione dei clienti',
      },
    ],
    s2_title: "Casi d'uso settoriali: il chatbot IA nel vostro mestiere",
    s2_sectors: [
      {
        sector: 'Artigianato (elettricità, idraulica, HVAC)',
        icon: '🔧',
        uses: [
          'Ricezione chiamate in entrata 24h/24 in FR/DE/IT (agente vocale Vocalis)',
          'Prenotazione automatica appuntamenti con verifica disponibilità',
          'Qualificazione richieste urgenti (acqua, elettricità) con escalation immediata',
          'Chatbot WhatsApp per preventivi istantanei su lavori standard',
          'Conferma e promemoria automatici degli interventi',
        ],
        roi: 'ROI artigianato: riduzione 40–60% chiamate perse, +25% cantieri acquisiti',
        note: 'Assistenti vocali IA per elettricisti: gli agenti vocali IA sono specificamente adatti agli elettricisti che non possono rispondere al telefono durante gli interventi.',
      },
      {
        sector: 'Idraulica (impianti, riscaldamento)',
        icon: '🚿',
        uses: [
          'Agente vocale IA 24h/24 per emergenze idrauliche (rilevamento automatico emergenza fredda/calda)',
          'Chatbot diagnostico guasti: domande guidate per qualificare l\'intervento',
          'Generazione automatica preventivi per lavori standard',
          'Gestione ricambi: verifica disponibilità in tempo reale',
          'Comunicazione multilingue con clientela internazionale (Ginevra, Zurigo)',
        ],
        roi: 'ROI idraulica: +35% interventi urgenti trattati, -50% chiamate perse',
        note: 'Strumenti IA per aziende sanitarie: includono ricezione chiamate, pianificazione e gestione tecnici.',
      },
      {
        sector: 'Commercio & distribuzione',
        icon: '🏪',
        uses: [
          'Chatbot FAQ prodotti 24h/24 in 4 lingue',
          'Raccomandazioni personalizzate in base alla cronologia cliente',
          'Tracciamento ordini e consegne in tempo reale',
          'Chatbot WhatsApp/Instagram per ordini rapidi',
          'Gestione resi e reclami con risoluzione automatica casi semplici',
        ],
        roi: 'ROI commercio: +18% conversione, -35% contatti servizio clienti in entrata',
        note: 'Integrazione con sistemi di cassa, Bexio e piattaforme e-commerce svizzere.',
      },
      {
        sector: 'Ospitalità & ristorazione',
        icon: '🏨',
        uses: [
          'Chatbot prenotazioni multilingue (FR/DE/IT/EN/ZH per clientela asiatica)',
          'Risposte automatiche a richieste di disponibilità',
          'Chatbot room service e informazioni soggiorno',
          'Gestione recensioni Google/Booking con risposte automatiche IA',
          'Upsell automatico (upgrade camera, spa, ristorazione)',
        ],
        roi: 'ROI ospitalità: +8–15% RevPAR, riduzione 30% carico reception',
        note: 'Gli hotel di montagna (Vallese, Grigioni, Giura) beneficiano particolarmente del multilinguismo nativo.',
      },
      {
        sector: 'Servizi professionali (fiduciarie, avvocati, medici)',
        icon: '💼',
        uses: [
          'Chatbot prenotazione appuntamenti intelligente con qualificazione preliminare',
          'Agente vocale IA per filtraggio chiamate fuori orario',
          'Chatbot FAQ specializzato (IVA, diritti, sintomi) con escalation a esperto',
          'Promemoria automatici appuntamenti e preparazione consultazioni',
          'Modulo di onboarding cliente automatizzato con estrazione dati',
        ],
        roi: 'ROI servizi professionali: risparmio 8–12h/mese reception, +20% appuntamenti presi',
        note: 'Attenzione conformità nLPD: dati sanitari e dati legali = categorie sensibili, hosting svizzero obbligatorio.',
      },
      {
        sector: 'Educazione & formazione',
        icon: '🎓',
        uses: [
          'Chatbot FAQ per candidati e studenti (ammissioni, programmi, orari)',
          'Assistente pedagogico IA per revisioni ed esercizi',
          'Chatbot amministrativo per richieste di attestati e dossier',
          'Promemoria automatici esami e iscrizioni',
          'Supporto multilingue per studenti internazionali',
        ],
        roi: 'ROI educazione: -40% email amministrative ripetitive, +soddisfazione studenti',
        note: 'Conformità nLPD critica per dati di minori (meno di 16 anni).',
      },
    ],
    s3_title: 'Multilinguismo FR/DE/IT/EN: il vantaggio unico del chatbot IA in Svizzera',
    s3_p1: "La Svizzera è l'unico mercato europeo in cui un'azienda deve poter interagire in 4 lingue con i propri clienti. I moderni chatbot IA gestiscono nativamente questa complessità — un vantaggio competitivo diretto che le PMI svizzere devono sfruttare.",
    s3_features: [
      { feature: 'Rilevamento automatico della lingua', desc: "Il chatbot identifica la lingua del messaggio in arrivo e risponde nella stessa lingua senza configurazione manuale." },
      { feature: 'Coerenza terminologica per lingua', desc: "Vocabolario adattato a ogni regione per un'esperienza naturale in ogni area linguistica." },
      { feature: "Escalation all'interlocutore giusto", desc: "Trasferimento al team FR, DE o IT in base alla lingua rilevata per i casi che richiedono intervento umano." },
      { feature: 'Base di conoscenza centralizzata', desc: "Aggiornata una sola volta, le risposte sono automaticamente disponibili in tutte le lingue configurate." },
    ],
    s3_p2: "Una PMI di Friburgo o del Vallese che opera in FR/DE può implementare un chatbot che risponde in francese ai clienti romandi e in tedesco ai clienti alemannici — con la stessa qualità, senza costi aggiuntivi.",
    s4_title: 'Conformità nLPD per chatbot IA in Svizzera',
    s4_p1: "Implementare un chatbot IA che raccoglie o tratta dati personali di clienti svizzeri impegna la responsabilità della vostra azienda ai sensi della nLPD. Gli obblighi pratici:",
    s4_obligations: [
      {
        title: 'Informazione preliminare obbligatoria',
        desc: "Prima di qualsiasi interazione, informare l'utente che sta dialogando con un agente IA (non un essere umano). La menzione può essere nel widget, nel messaggio di benvenuto o nelle note legali accessibili dalla chat.",
      },
      {
        title: 'Hosting dei dati',
        desc: "Le conversazioni del chatbot contengono dati personali. Preferite un hosting in Svizzera (Infomaniak, Exoscale) o nell'UE. Evitate soluzioni che archiviano per default negli USA senza garanzie contrattuali (SCC).",
      },
      {
        title: 'Durata di conservazione limitata',
        desc: "Definite una durata di conservazione delle conversazioni (es. 30 giorni per il supporto, massimo 12 mesi per i ticket aperti). Cancellazione automatica richiesta.",
      },
      {
        title: 'Diritto di accesso e cancellazione',
        desc: "Consentite agli utenti di accedere ai propri dati di conversazione e di farli cancellare su richiesta. Documentare la procedura nella vostra politica sulla privacy.",
      },
    ],
    s4_note: "Dati sanitari (chatbot medici) e dati di minori: categorie sensibili con obblighi rafforzati — DPIA obbligatoria prima del deployment.",
    s5_title: 'Confronto strumenti chatbot IA per PMI svizzere',
    s5_tools: [
      {
        name: 'Botpress',
        type: 'Chatbot open-source',
        strengths: 'Molto flessibile, auto-ospitabile, multilingue, personalizzabile',
        weaknesses: 'Curva di apprendimento tecnica, richiede risorse dev',
        nlpd: 'Eccellente (auto-ospitato)',
        best_for: 'PMI con risorse tecniche o agenzia partner',
      },
      {
        name: 'Intercom',
        type: 'Piattaforma supporto + chatbot',
        strengths: 'CRM integrato, analytics avanzate, interfaccia curata',
        weaknesses: 'Hosting USA per default, costoso per PMI',
        nlpd: 'Medio (USA, verificare DPA)',
        best_for: 'PMI SaaS, scale-up con alto volume di supporto',
      },
      {
        name: 'Tidio',
        type: 'Live chat + chatbot',
        strengths: 'Facile da implementare, integrazioni e-commerce (Shopify, WooCommerce)',
        weaknesses: 'Funzionalità IA limitate, niente voice',
        nlpd: 'Medio (UE disponibile)',
        best_for: 'Piccolo commercio online, avvio rapido',
      },
      {
        name: 'Vocalis',
        type: 'Agente vocale IA (chiamate telefoniche)',
        strengths: 'Nativo FR/DE/IT/EN, hosting Svizzera, specializzato PMI, accoglienza 24h/24',
        weaknesses: 'Specializzato in voice (nessuna web chat nativa)',
        nlpd: 'Eccellente (Svizzera)',
        best_for: 'Artigiani, studi medici, hotel, avvocati — qualsiasi attività con chiamate in entrata',
      },
    ],
    s6_title: 'ROI chatbot IA: cosa misurano le PMI svizzere',
    s6_desc: 'Risultati osservati su deployment chatbot IA reali in Svizzera romanda e alemanna (2024–2026):',
    s6_stats: [
      { label: 'Chiamate / chat trattate senza intervento umano', value: '60–75%', detail: 'Sulle richieste standard (FAQ, appuntamenti, stato ordine)' },
      { label: 'Riduzione del tempo di risposta medio', value: '−82%', detail: 'Da 4h in media a meno di 30 secondi' },
      { label: 'Aumento tasso di conversione lead', value: '+22%', detail: 'Qualificazione immediata 24h/24 vs modulo di contatto' },
      { label: 'Soddisfazione cliente post-chatbot IA', value: '4,2/5', detail: 'Punteggio medio su 847 valutazioni PMI svizzere 2025' },
    ],
    faq_title: 'Domande frequenti — Chatbot IA per aziende svizzere',
    faqs: [
      {
        q: 'Qual è la differenza tra un chatbot IA e un chatbot classico a regole?',
        a: "Un chatbot classico segue alberi decisionali preprogrammati. Risponde male alle formulazioni inattese e richiede una manutenzione costante. Un chatbot IA (basato su LLM) comprende il linguaggio naturale, gestisce le formulazioni impreviste, apprende dal contesto e può gestire conversazioni complesse. Per una PMI svizzera, il chatbot IA offre un'esperienza cliente molto migliore con meno sforzo di manutenzione.",
      },
      {
        q: 'Un chatbot IA può davvero comunicare in tedesco, francese E italiano?',
        a: "Sì. I grandi modelli linguistici (GPT-4, Claude, Gemini) padroneggiamo nativamente FR, DE, IT e EN con qualità quasi identica. Vocalis è specificamente addestrato sui dialetti svizzeri e le formulazioni regionali. Il rilevamento della lingua è automatico — il vostro chatbot risponde nella lingua dell'utente senza configurazione aggiuntiva.",
      },
      {
        q: 'Il chatbot IA può essere collegato al mio software gestionale (Bexio, Abacus, ecc.)?',
        a: 'Sì, tramite connettori API (Make, n8n, Zapier) o integrazioni native. Un chatbot può verificare le fasce orarie disponibili nel vostro calendario, creare ticket nel vostro CRM, consultare le scorte in Bexio o generare una fattura in Abacus — mentre conversa con il cliente. L\'integrazione richiede generalmente 1–3 settimane a seconda della complessità.',
      },
      {
        q: 'Il mio chatbot IA sarà conforme alla nLPD svizzera?',
        a: "La conformità nLPD di un chatbot IA dipende dalla sua configurazione: hosting dei dati, durata di conservazione, informazione dell'utente, diritto di accesso e cancellazione. IAPME Suisse implementa sistematicamente i propri chatbot con hosting svizzero o UE, una politica di conservazione delle conversazioni e una menzione 'agente IA' visibile nell'interfaccia.",
      },
      {
        q: "Quanto tempo ci vuole per implementare un chatbot IA per la mia azienda svizzera?",
        a: "Un chatbot IA operativo può essere implementato in 2–4 settimane per una PMI svizzera standard: 1 settimana di configurazione e personalizzazione, 1 settimana di test e aggiustamenti, deployment finale. Per integrazioni complesse (ERP, sistema di prenotazione, base di conoscenza voluminosa), prevedete 6–8 settimane. I risultati (chiamate trattate, lead qualificati) sono misurabili dal primo mese.",
      },
    ],
    internal_links_title: 'Risorse complementari — Chatbot IA & assistenti vocali per PMI svizzere',
    internal_links: [
      { href: '/automatisation-ia-pme-suisse', label: 'Automazione IA per PMI svizzere: guida completa 2026' },
      { href: '/blog/chatbot-ia-entreprise-suisse-guide-2026', label: 'Chatbot IA azienda svizzera: guida completa 2026' },
      { href: '/blog/chatbot-ia-pme-suisse-guide-2026', label: 'Chatbot IA PMI svizzera: deployment e conformità nLPD' },
      { href: '/blog/assistant-vocal-ia-pme-guide-complet', label: 'Assistente vocale IA per PMI: guida completa (Vocalis, Twilio, ElevenLabs)' },
      { href: '/services', label: 'Servizi IA per PMI svizzere — le nostre soluzioni' },
      { href: '/contact', label: 'Audit chatbot IA gratuito (30 min)' },
    ],
  },
};

export default async function ChatbotIAPillarPage({ params }: Props) {
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
    mainEntityOfPage: `https://iapmesuisse.ch/${locale}/chatbot-ia-entreprise-suisse`,
    url: `https://iapmesuisse.ch/${locale}/chatbot-ia-entreprise-suisse`,
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

      {/* Section 1 — Types de chatbots */}
      <section className="bg-gray-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B2A4A] sm:text-3xl">{tData.s1_title}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {tData.s1_types.map((type, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-6">
                <p className="text-2xl">{type.icon}</p>
                <h3 className="mt-2 text-base font-bold text-[#1B2A4A]">{type.type}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{type.desc}</p>
                <div className="mt-4 space-y-1">
                  <p className="text-xs font-semibold text-green-700">
                    Idéal pour : {type.best_for}
                  </p>
                  <p className="text-xs text-amber-700">nLPD : {type.nlpd}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2 — Cas d'usage sectoriels */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B2A4A] sm:text-3xl">{tData.s2_title}</h2>
          <div className="mt-6 space-y-6">
            {tData.s2_sectors.map((sector, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <div className="flex items-center gap-3">
                  <p className="text-2xl">{sector.icon}</p>
                  <h3 className="text-base font-bold text-[#1B2A4A]">{sector.sector}</h3>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {sector.uses.map((use, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-0.5 text-[#FF0000]">→</span>
                      {use}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs font-semibold text-green-700">{sector.roi}</p>
                <p className="mt-2 rounded bg-blue-50 p-2 text-xs text-blue-800">{sector.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Multilinguisme */}
      <section className="bg-gray-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B2A4A] sm:text-3xl">{tData.s3_title}</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-700">{tData.s3_p1}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {tData.s3_features.map((feature, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="text-sm font-bold text-[#1B2A4A]">{feature.feature}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-base leading-relaxed text-gray-700">{tData.s3_p2}</p>
        </div>
      </section>

      {/* Section 4 — Conformité nLPD */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B2A4A] sm:text-3xl">{tData.s4_title}</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-700">{tData.s4_p1}</p>
          <div className="mt-6 space-y-4">
            {tData.s4_obligations.map((obligation, i) => (
              <div key={i} className="flex gap-4 rounded-xl border border-gray-200 bg-gray-50 p-5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FF0000] text-xs font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1B2A4A]">{obligation.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-700">{obligation.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            {tData.s4_note}
          </p>
        </div>
      </section>

      {/* Section 5 — Comparatif outils */}
      <section className="bg-gray-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B2A4A] sm:text-3xl">{tData.s5_title}</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-white text-left">
                  <th className="px-4 py-3 font-semibold text-[#1B2A4A]">Outil</th>
                  <th className="px-4 py-3 font-semibold text-[#1B2A4A]">Type</th>
                  <th className="px-4 py-3 font-semibold text-green-700">Points forts</th>
                  <th className="px-4 py-3 font-semibold text-amber-700">Limites</th>
                  <th className="px-4 py-3 font-semibold text-[#FF0000]">nLPD</th>
                </tr>
              </thead>
              <tbody>
                {tData.s5_tools.map((tool, i) => (
                  <tr key={i} className={`border-b border-gray-100 ${tool.name === 'Vocalis' ? 'bg-red-50' : 'hover:bg-white'}`}>
                    <td className="px-4 py-3 font-bold text-[#1B2A4A]">
                      {tool.name}
                      {tool.name === 'Vocalis' && (
                        <span className="ml-2 rounded bg-[#FF0000] px-1.5 py-0.5 text-xs font-semibold text-white">
                          Recommandé
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{tool.type}</td>
                    <td className="px-4 py-3 text-gray-700">{tool.strengths}</td>
                    <td className="px-4 py-3 text-gray-500">{tool.weaknesses}</td>
                    <td className="px-4 py-3 font-medium text-[#FF0000]">{tool.nlpd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
