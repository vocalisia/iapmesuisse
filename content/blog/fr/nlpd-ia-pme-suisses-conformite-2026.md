---
title: "nLPD et IA : ce que les PME suisses doivent absolument savoir en 2026"
date: "2026-05-26"
excerpt: "La nLPD est en vigueur depuis septembre 2023. Votre PME suisse utilise l'IA ? Voici exactement ce qu'elle doit faire pour être conforme, éviter les amendes et protéger ses clients."
slug: "nlpd-ia-pme-suisses-conformite-2026"
category: "Réglementation IA"
author: "Laurent Duplat"
lang: "fr"
tags: ["nLPD", "conformité IA", "protection données", "PME suisse", "RGPD Suisse"]
image: "/images/blog/iapme-autocontrol-20260620/fr-nlpd-ia-pme-suisses-conformite-2026.webp"
---

# nLPD et IA : ce que les PME suisses doivent absolument savoir en 2026

La nouvelle loi fédérale sur la protection des données (nLPD) est en vigueur depuis le 1er septembre 2023. Elle ne concerne pas uniquement les grandes entreprises ou les GAFAM. Dès lors que votre PME suisse utilise un chatbot, analyse des données clients avec l'IA ou automatise ses processus RH, vous êtes directement concerné.

Les enjeux sont concrets : la nLPD prévoit des amendes pouvant atteindre **CHF 250 000** pour les responsables personnes physiques en cas d'infraction intentionnelle (art. 60 à 63 nLPD). Contrairement au RGPD européen, c'est le dirigeant ou le responsable — pas l'entreprise en tant qu'entité morale — qui peut être poursuivi personnellement.

Ce guide vous donne une vision claire des obligations qui s'appliquent à votre PME, des cas d'usage IA les plus risqués, et des étapes concrètes pour être en règle aujourd'hui.

---

## Qu'est-ce que la nLPD et en quoi est-elle différente du RGPD ?

La nLPD (RS 235.1) remplace la loi fédérale sur la protection des données de 1992. Elle s'aligne partiellement sur le RGPD européen — ce qui facilite la reconnaissance d'équivalence par l'UE — tout en conservant des spécificités helvétiques importantes.

### Entrée en vigueur

- **1er septembre 2023** : application effective pour toutes les entités traitant des données de personnes physiques en Suisse
- Délai de transition écoulé — aucune tolérance supplémentaire n'est prévue par le Préposé fédéral à la protection des données et à la transparence (PFPDT)

### 3 différences majeures avec le RGPD

| Critère | nLPD (Suisse) | RGPD (UE) |
|---|---|---|
| **Responsabilité pénale** | Personnes physiques (dirigeants, responsables) | Amendes sur l'entité juridique |
| **DPO obligatoire** | Non — conseiller à la protection des données recommandé mais non imposé aux PME | Oui, dans certains cas (traitement à grande échelle) |
| **Champ d'application** | Données de personnes physiques **domiciliées en Suisse** | Données de personnes physiques dans l'**espace UE/EEE** |
| **Droit à la portabilité** | Oui (art. 28 nLPD) | Oui (art. 20 RGPD) |
| **Registre des traitements** | Obligatoire pour entreprises >250 employés — recommandé pour toutes | Obligatoire dès que le traitement est régulier |
| **Décisions automatisées** | Droit d'obtenir une révision humaine (art. 21 nLPD) | Droit similaire (art. 22 RGPD) |

> **Point clé pour les PME suisses** : si vous traitez uniquement des données de clients suisses et hébergez vos outils en Suisse, le RGPD ne s'applique pas directement — sauf si vous ciblez activement des résidents UE. La nLPD reste votre cadre de référence.

---

## Les 4 obligations nLPD qui s'appliquent directement à l'IA dans votre PME

### 1. Transparence : informer quand une IA prend des décisions

L'art. 21 nLPD impose d'informer les personnes concernées lorsqu'une décision **individuelle automatisée** produit des effets juridiques ou les affecte de manière significative.

**Ce que cela signifie concrètement :**
- Un scoring IA qui détermine si un prospect reçoit une offre → notification obligatoire
- Un algorithme RH qui filtre des CV sans intervention humaine → mention dans l'offre d'emploi
- Un chatbot qui collecte des données lors d'une conversation → bandeau d'information clair

**Action à prendre :** intégrer une mention du type *« Cette décision est assistée par un système automatisé. Vous pouvez demander une révision par un collaborateur humain. »*

### 2. Minimisation des données : ne collecter que le nécessaire

Le principe de proportionnalité (art. 6 al. 2 nLPD) interdit de traiter des données au-delà de ce qui est nécessaire à la finalité déclarée.

**Erreurs fréquentes des PME avec l'IA :**
- Connecter un CRM IA à des données non utiles à la décision (état civil, situation familiale)
- Conserver des transcriptions d'appels indéfiniment alors que 30 jours suffisent
- Entraîner un modèle interne sur des données clients sans les anonymiser

**Règle pratique :** avant tout nouveau projet IA, posez la question *« De quelles données avons-nous réellement besoin ? »* — pas *« Quelles données pourrions-nous utiliser ? »*

### 3. Registre des traitements : documenter tous les processus IA automatisés

L'art. 12 nLPD impose aux organisations de plus de 250 employés de tenir un registre. En dessous, c'est recommandé — et dans les faits, indispensable en cas de contrôle du PFPDT.

**Ce que le registre doit contenir pour chaque traitement IA :**
- Nom et description du traitement (ex. : *scoring prospect via HubSpot IA*)
- Finalité du traitement
- Catégories de données traitées
- Destinataires (prestataires IA, sous-traitants)
- Durée de conservation
- Mesures de sécurité en place
- Transferts internationaux éventuels

**Outil simple :** un tableur Google Sheets ou Notion suffit pour les PME. Des templates gratuits sont disponibles sur le site du PFPDT (edoeb.admin.ch).

### 4. Sécurité : mesures techniques pour protéger les données traitées par l'IA

L'art. 8 nLPD impose des mesures de sécurité adaptées au risque. Pour les systèmes IA, cela inclut :

- **Contrôle d'accès** : seuls les collaborateurs autorisés accèdent aux données d'entraînement ou aux outputs IA
- **Chiffrement** : données en transit (TLS 1.2+) et au repos
- **Journalisation** : logs des accès et des décisions IA
- **Notification de violation** : délai de 72h pour notifier le PFPDT en cas de fuite affectant des données sensibles (art. 24 nLPD)
- **Évaluation d'impact (AIPD)** : recommandée pour tout traitement IA à haut risque (profiling, données sensibles)

---

## Cas d'usage IA les plus risqués pour la conformité nLPD

### Chatbot qui collecte des données clients

**Risque :** le chatbot enregistre des conversations contenant des données personnelles (nom, adresse, problème de santé, situation financière) sans consentement explicite ni politique de confidentialité mise à jour.

**Obligation déclenchée :**
- Déclaration du traitement dans le registre
- Mention d'information avant le démarrage de la conversation
- Durée de conservation définie et appliquée

### IA RH qui analyse les CV

**Risque :** filtrage automatique de candidats sur des critères potentiellement discriminatoires, sans possibilité de recours humain.

**Obligations déclenchées :**
- Art. 21 nLPD : notification aux candidats que leur dossier est traité par un système automatisé
- Droit de demander une révision humaine
- AIPD recommandée si le système traite des données sensibles (handicap, origine)

### CRM avec scoring IA

**Risque :** le scoring client constitue du **profilage** au sens de l'art. 5 let. f nLPD. Si le score influence des décisions commerciales significatives, des règles spécifiques s'appliquent.

**Obligations déclenchées :**
- Mention du profilage dans la politique de confidentialité
- Évaluation d'impact (AIPD) recommandée
- Droit d'opposition des personnes concernées

### Agent vocal qui enregistre les appels

**Risque :** l'enregistrement audio constitue un traitement de données personnelles. En Suisse, le consentement de **toutes les parties** à la conversation est requis (cf. art. 179 CP sur l'enregistrement de conversations).

**Obligations déclenchées :**
- Annonce vocale en début d'appel (*« Cet appel peut être enregistré à des fins de formation et de qualité »*)
- Consentement explicite ou droit d'opposition clair
- Durée de conservation limitée et documentée

---

## Les 5 étapes pour mettre votre PME en conformité nLPD IA

### Étape 1 — Inventaire complet de vos outils IA

Listez **tout** ce que votre PME utilise :

- Chatbots (Intercom, Tidio, ChatGPT intégré)
- CRM avec fonctions IA (HubSpot AI, Salesforce Einstein)
- Outils de recrutement (LinkedIn Recruiter, Workable)
- Agents vocaux et call centers automatisés
- Outils d'analyse comportementale (Hotjar, Microsoft Clarity)
- Modèles IA internes ou personnalisés

Pour chaque outil : qui traite les données ? Où sont-elles hébergées ? Qui y a accès ?

### Étape 2 — Cartographie des données personnelles traitées

Pour chaque outil identifié :

- Quelles catégories de données sont traitées ? (coordonnées, données financières, données de santé, données comportementales)
- Où sont stockées ces données ? (Suisse, UE, USA)
- Combien de temps sont-elles conservées ?
- Qui y a accès en dehors de votre entreprise ?

Les **données sensibles** (santé, opinions politiques, origine ethnique, données biométriques) sont soumises à des règles renforcées sous la nLPD (art. 5 let. c).

### Étape 3 — Rédaction des mentions d'information

Chaque point de collecte doit comporter une mention claire :

- Identité du responsable du traitement
- Finalité du traitement
- Destinataires des données
- Durée de conservation
- Droits des personnes (accès, rectification, opposition)
- Existence de décisions automatisées le cas échéant

Format : court texte visible avant la collecte + lien vers politique de confidentialité complète.

### Étape 4 — Mise à jour de la politique de confidentialité

Votre politique doit désormais mentionner explicitement :

- L'utilisation de systèmes IA pour le traitement de données
- Les finalités de chaque traitement automatisé
- Le droit à la révision humaine pour les décisions automatisées significatives
- Les transferts de données vers des prestataires IA hors Suisse
- Les clauses contractuelles types (CCT) ou garanties équivalentes pour les transferts UE/USA

### Étape 5 — Registre des activités de traitement

Créez un document structuré (tableur ou outil dédié) avec une ligne par traitement IA. Mettez-le à jour à chaque nouveau déploiement d'outil. Ce registre est votre première ligne de défense en cas de contrôle.

**Modèle de colonnes :**

| Nom traitement | Finalité | Données | Destinataires | Hébergement | Conservation | Mesures sécu | AIPD requise |
|---|---|---|---|---|---|---|---|

---

## Hébergement : pourquoi choisir Infomaniak ou Exoscale

Le choix du prestataire cloud influence directement votre conformité nLPD. Les transferts de données hors Suisse nécessitent des garanties supplémentaires.

### Hébergement en Suisse — le plus simple

- **Infomaniak** (Genève) : hébergement web, cloud, outils collaboratifs — données 100% en Suisse
- **Exoscale** (Genève / Vienne) : cloud IaaS certifié ISO 27001, conformité nLPD native
- **Avantage** : pas de clause de transfert international à rédiger, conformité nLPD simplifiée

### Hébergement UE — compatible avec garanties

- **OVHcloud** (France) : clauses contractuelles types EU disponibles
- **Hetzner** (Allemagne) : conforme RGPD, acceptable sous nLPD avec CCT
- **Scaleway** (France) : souverain UE, RGPD natif

### À éviter sans précautions contractuelles renforcées

- **AWS us-east-1, Azure US, Google Cloud US** : soumis au Cloud Act américain
- Utilisation possible, mais nécessite des clauses contractuelles types valides + AIPD documentée
- Risque accru si les données traitées sont sensibles

> **Conseil pratique :** si votre prestataire IA est américain (OpenAI, Microsoft Copilot, Google Gemini), vérifiez si une région EU est disponible et activez-la. Documentez ce choix dans votre registre.

---

## FAQ nLPD et IA pour les PME suisses

### Une PME suisse de moins de 10 collaborateurs est-elle concernée par la nLPD ?

Oui. La nLPD s'applique à toute entité — quelle que soit sa taille — qui traite des données personnelles de personnes physiques domiciliées en Suisse. Seules certaines obligations (comme le registre des traitements formel) sont allégées en dessous de 250 employés. Les principes fondamentaux — transparence, minimisation, sécurité — s'imposent à tous.

### Quelle est la différence entre nLPD et RGPD pour une PME suisse ?

La différence principale : sous la nLPD, la responsabilité pénale vise les **personnes physiques** (dirigeant, responsable IT) et non l'entreprise. Une amende peut atteindre CHF 250 000 pour une infraction intentionnelle. Sous le RGPD, les amendes s'appliquent à l'entité juridique et peuvent atteindre 4% du CA mondial. Si votre PME cible activement des clients de l'UE/EEE, le RGPD s'applique en parallèle.

### Mon chatbot IA doit-il respecter la nLPD ?

Oui, dès lors qu'il collecte ou traite des données personnelles (nom, email, problème décrit, historique de conversation). Obligations minimales : mention d'information avant la première interaction, politique de confidentialité à jour mentionnant l'IA, durée de conservation définie, et registre du traitement mis à jour.

### Quels outils IA sont conformes nLPD par défaut ?

Aucun outil n'est « conforme nLPD par défaut » — la conformité dépend de la façon dont vous configurez et utilisez l'outil. Cela dit, les outils hébergés en Suisse ou dans l'UE avec des CCT valides offrent une base plus solide. Privilégiez les outils proposant : hébergement EU/CH, accord de traitement des données (DPA) signable, pas d'utilisation des données pour entraîner leurs modèles, et journaux d'accès disponibles.

---

## Passez à l'action : faites auditer votre conformité nLPD IA

La conformité nLPD n'est pas une option — c'est une obligation légale en vigueur depuis septembre 2023. Les PME qui agissent maintenant évitent les risques d'amende, renforcent la confiance de leurs clients et se préparent à des contrôles PFPDT de plus en plus fréquents.

Nos experts accompagnent les PME suisses pour :

- **Auditer** vos outils IA existants au regard de la nLPD
- **Identifier** les traitements à risque et prioriser les actions
- **Rédiger** les mentions d'information et mettre à jour votre politique de confidentialité
- **Structurer** votre registre des activités de traitement
- **Former** vos équipes aux bonnes pratiques de protection des données

**Réservez un audit gratuit de 30 minutes** — sans engagement — pour faire le point sur la situation de votre PME.

[Demander votre audit gratuit](/contact)

---

*Sources : Loi fédérale sur la protection des données (nLPD, RS 235.1) — Préposé fédéral à la protection des données et à la transparence (PFPDT, edoeb.admin.ch) — Office fédéral de la statistique (OFS) — Code pénal suisse art. 179.*
