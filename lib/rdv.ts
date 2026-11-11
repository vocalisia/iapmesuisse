// lib/rdv.ts — les pages de prise de rendez-vous.
//
// Trois intentions de reservation, pas une par produit : les scenarios d'e-mail de la
// campagne convergent vers trois demandes reelles — un diagnostic, une formation d'equipe,
// un projet d'agent ou d'automatisation. Un slug par intention garde les URL de campagne
// stables et evite trois pages qui se ressemblent.
//
// L'URL du planning Google se lit d'abord dans une variable d'environnement : le lien peut
// changer, et chaque intention peut avoir son propre planning (durees differentes). A defaut,
// le planning de 30 minutes fourni par Laurent (AGENDA_GOOGLE_30MIN) sert de repli.

export type RdvLocale = 'fr' | 'de' | 'en' | 'it';

export interface RdvContenu {
  nav: string;
  metaTitle: string;
  metaDesc: string;
  heroTitle: string;
  heroLead: string;
  duree: string;
  conditions: string;
  pendantTitre: string;
  pendant: string[];
  apresTitre: string;
  apres: string[];
  pourQui: string;
  faq: { question: string; answer: string }[];
}

export interface RdvOffre {
  slug: string;
  contenu: Record<RdvLocale, RdvContenu>;
}

export const RDV_OFFRES: RdvOffre[] = [
  {
    slug: 'audit-ia',
    contenu: {
      fr: {
        nav: 'Diagnostic IA',
        metaTitle: 'Réserver un diagnostic IA gratuit (30 min)',
        metaDesc:
          "Choisissez un créneau de 30 minutes avec un consultant IAPME Suisse. Nous regardons vos tâches répétitives et vous disons ce qui est automatisable, ce qui ne l'est pas, et dans quel ordre. Gratuit, sans engagement.",
        heroTitle: 'Réservez votre diagnostic IA',
        heroLead:
          "Trente minutes, en visio ou par téléphone, pour regarder concrètement où votre entreprise perd du temps. Vous repartez avec un avis clair — y compris quand la réponse est « l'IA n'est pas votre priorité ».",
        duree: '30 minutes',
        conditions: 'Gratuit, sans engagement',
        pendantTitre: 'Ce que nous faisons pendant ces 30 minutes',
        pendant: [
          'Vous décrivez les trois tâches qui vous coûtent le plus de temps chaque semaine.',
          'Nous estimons ensemble le temps réellement récupérable sur chacune.',
          "Nous écartons tout de suite ce qui ne s'automatise pas correctement aujourd'hui.",
          'Nous regardons la question des données : ce qui peut rester en Suisse, ce qui sort.',
        ],
        apresTitre: 'Ce que vous recevez ensuite',
        apres: [
          'Un compte rendu écrit en une page, sous 48 heures.',
          'Les deux ou trois automatisations classées par rapport effort / gain.',
          "Une estimation d'enveloppe et de délai, si un projet a du sens.",
        ],
        pourQui:
          'PME de Suisse romande, de 3 à 250 collaborateurs. Aucune connaissance technique requise.',
        faq: [
          {
            question: 'Est-ce vraiment gratuit ?',
            answer:
              "Oui, et sans contrepartie. Ce rendez-vous nous sert aussi à savoir si nous pouvons vous être utiles : il arrive régulièrement que nous recommandions de ne rien lancer pour l'instant.",
          },
          {
            question: 'Dois-je préparer quelque chose ?',
            answer:
              "Non. Si vous avez sous la main le nombre d'heures passées sur une tâche précise, c'est un bon point de départ, mais nous pouvons l'estimer ensemble.",
          },
          {
            question: 'Qui sera en face de moi ?',
            answer:
              "Un consultant d'IAPME Suisse, basé en Valais. L'entretien se déroule en français, en visio ou par téléphone selon ce que vous préférez.",
          },
          {
            question: 'Que deviennent mes informations ?',
            answer:
              'Elles servent uniquement à préparer et suivre ce rendez-vous. Nous ne les revendons pas et vous pouvez demander leur suppression à tout moment.',
          },
        ],
      },
      de: {
        nav: 'KI-Diagnose',
        metaTitle: 'Kostenlose KI-Diagnose buchen (30 Min.)',
        metaDesc:
          'Wählen Sie einen 30-Minuten-Termin mit einem Berater von IAPME Suisse. Wir prüfen Ihre wiederkehrenden Aufgaben und sagen Ihnen, was sich automatisieren lässt und in welcher Reihenfolge. Kostenlos und unverbindlich.',
        heroTitle: 'Buchen Sie Ihre KI-Diagnose',
        heroLead:
          'Dreissig Minuten per Video oder Telefon, um konkret zu sehen, wo in Ihrem Unternehmen Zeit verloren geht. Sie erhalten eine klare Einschätzung — auch dann, wenn die Antwort lautet: «KI ist derzeit nicht Ihre Priorität».',
        duree: '30 Minuten',
        conditions: 'Kostenlos, unverbindlich',
        pendantTitre: 'Was wir in diesen 30 Minuten tun',
        pendant: [
          'Sie beschreiben die drei Aufgaben, die Sie pro Woche am meisten Zeit kosten.',
          'Wir schätzen gemeinsam, wie viel Zeit sich davon tatsächlich zurückgewinnen lässt.',
          'Wir schliessen sofort aus, was sich heute nicht sauber automatisieren lässt.',
          'Wir klären die Datenfrage: was in der Schweiz bleiben kann und was nicht.',
        ],
        apresTitre: 'Was Sie danach erhalten',
        apres: [
          'Eine schriftliche Zusammenfassung auf einer Seite, innerhalb von 48 Stunden.',
          'Zwei bis drei Automatisierungen, nach Aufwand und Nutzen geordnet.',
          'Eine Schätzung von Budget und Dauer, sofern ein Projekt sinnvoll ist.',
        ],
        pourQui:
          'KMU in der Schweiz mit 3 bis 250 Mitarbeitenden. Technische Vorkenntnisse sind nicht nötig.',
        faq: [
          {
            question: 'Ist das wirklich kostenlos?',
            answer:
              'Ja, ohne Gegenleistung. Der Termin dient auch uns: Regelmässig empfehlen wir Unternehmen, vorerst nichts zu starten.',
          },
          {
            question: 'Muss ich etwas vorbereiten?',
            answer:
              'Nein. Wenn Sie wissen, wie viele Stunden eine bestimmte Aufgabe kostet, ist das ein guter Ausgangspunkt — sonst schätzen wir es gemeinsam.',
          },
          {
            question: 'Wer sitzt mir gegenüber?',
            answer:
              'Ein Berater von IAPME Suisse mit Sitz im Wallis. Das Gespräch findet auf Deutsch oder Französisch statt, per Video oder Telefon.',
          },
          {
            question: 'Was passiert mit meinen Daten?',
            answer:
              'Sie dienen ausschliesslich der Vorbereitung und Nachbereitung dieses Termins. Wir verkaufen sie nicht weiter, und Sie können jederzeit deren Löschung verlangen.',
          },
        ],
      },
      en: {
        nav: 'AI diagnostic',
        metaTitle: 'Book a free AI diagnostic (30 min)',
        metaDesc:
          'Pick a 30-minute slot with an IAPME Suisse consultant. We look at your repetitive tasks and tell you what can be automated, what cannot, and in which order. Free, no strings attached.',
        heroTitle: 'Book your AI diagnostic',
        heroLead:
          'Thirty minutes, by video or phone, to look concretely at where your company loses time. You leave with a clear opinion — including when the answer is "AI is not your priority right now".',
        duree: '30 minutes',
        conditions: 'Free, no commitment',
        pendantTitre: 'What we do in those 30 minutes',
        pendant: [
          'You describe the three tasks that cost you the most time each week.',
          'We estimate together how much of that time is genuinely recoverable.',
          'We rule out straight away whatever cannot be automated properly today.',
          'We settle the data question: what can stay in Switzerland, what leaves.',
        ],
        apresTitre: 'What you get afterwards',
        apres: [
          'A one-page written summary within 48 hours.',
          'Two or three automations ranked by effort against gain.',
          'A budget and timeline estimate, if a project makes sense.',
        ],
        pourQui: 'Swiss SMEs from 3 to 250 employees. No technical knowledge required.',
        faq: [
          {
            question: 'Is it really free?',
            answer:
              'Yes, with nothing expected in return. The meeting also tells us whether we can be useful: we regularly advise companies to start nothing for now.',
          },
          {
            question: 'Do I need to prepare anything?',
            answer:
              'No. If you know how many hours a given task costs you, that is a good starting point — otherwise we estimate it together.',
          },
          {
            question: 'Who will I be talking to?',
            answer:
              'A consultant from IAPME Suisse, based in Valais. The meeting is held in French or English, by video or phone.',
          },
          {
            question: 'What happens to my information?',
            answer:
              'It is used only to prepare and follow up this meeting. We do not resell it, and you can ask for its deletion at any time.',
          },
        ],
      },
      it: {
        nav: 'Diagnosi IA',
        metaTitle: 'Prenota una diagnosi IA gratuita (30 min)',
        metaDesc:
          'Scegli un incontro di 30 minuti con un consulente IAPME Suisse. Esaminiamo le tue attività ripetitive e ti diciamo cosa si può automatizzare, cosa no e in quale ordine. Gratuito e senza impegno.',
        heroTitle: 'Prenota la tua diagnosi IA',
        heroLead:
          'Trenta minuti, in video o al telefono, per vedere concretamente dove la tua azienda perde tempo. Ne esci con un parere chiaro — anche quando la risposta è «l’IA non è la tua priorità ora».',
        duree: '30 minuti',
        conditions: 'Gratuito, senza impegno',
        pendantTitre: 'Cosa facciamo in questi 30 minuti',
        pendant: [
          'Descrivi le tre attività che ti costano più tempo ogni settimana.',
          'Stimiamo insieme quanto tempo è davvero recuperabile.',
          'Escludiamo subito ciò che oggi non si automatizza in modo affidabile.',
          'Chiariamo la questione dei dati: cosa può restare in Svizzera e cosa no.',
        ],
        apresTitre: 'Cosa ricevi dopo',
        apres: [
          'Una sintesi scritta di una pagina, entro 48 ore.',
          'Due o tre automazioni ordinate per rapporto sforzo / beneficio.',
          'Una stima di budget e tempi, se un progetto ha senso.',
        ],
        pourQui: 'PMI svizzere da 3 a 250 dipendenti. Non serve alcuna competenza tecnica.',
        faq: [
          {
            question: 'È davvero gratuito?',
            answer:
              'Sì, senza nulla in cambio. L’incontro serve anche a noi: capita spesso che consigliamo di non avviare nulla per ora.',
          },
          {
            question: 'Devo preparare qualcosa?',
            answer:
              'No. Se sai quante ore costa una certa attività è un buon punto di partenza, altrimenti la stimiamo insieme.',
          },
          {
            question: 'Con chi parlerò?',
            answer:
              'Con un consulente di IAPME Suisse, con sede in Vallese. L’incontro si tiene in italiano o in francese, in video o al telefono.',
          },
          {
            question: 'Che fine fanno i miei dati?',
            answer:
              'Servono solo a preparare e seguire questo incontro. Non li rivendiamo e puoi chiederne la cancellazione in qualsiasi momento.',
          },
        ],
      },
    },
  },
  {
    slug: 'formation-ia',
    contenu: {
      fr: {
        nav: 'Formation équipe',
        metaTitle: 'Réserver un entretien de cadrage formation IA',
        metaDesc:
          "Réservez 30 minutes pour cadrer la formation IA de votre équipe : niveau réel des participants, outils déjà en place, format et durée. Devis après l'entretien.",
        heroTitle: 'Cadrons la formation de votre équipe',
        heroLead:
          "Une formation IA utile se construit sur le métier des participants, pas sur un programme générique. Ce rendez-vous sert à cadrer le contenu avant de parler de prix.",
        duree: '30 minutes',
        conditions: 'Sans frais — le devis vient après',
        pendantTitre: 'Ce que nous cadrons ensemble',
        pendant: [
          "Qui participe, et le niveau réel de départ — pas celui qu'on suppose.",
          'Les outils déjà utilisés dans la maison, et ceux qui sont interdits.',
          'Le format : demi-journée, journée, ou plusieurs séances espacées.',
          'Ce que les participants doivent savoir faire seuls à la fin.',
        ],
        apresTitre: 'Ce que vous recevez ensuite',
        apres: [
          'Un programme écrit, séance par séance, avec les exercices prévus.',
          'Un devis ferme : nombre de participants, durée, lieu ou visio.',
          'Les dates disponibles pour les huit semaines suivantes.',
        ],
        pourQui:
          'Équipes de 4 à 30 personnes. Les formations se donnent en français, sur site en Suisse romande ou en visio.',
        faq: [
          {
            question: 'Vos formations sont-elles reconnues ?',
            answer:
              "Nous délivrons une attestation de participation nominative. Il ne s'agit pas d'un titre fédéral : notre objectif est que vos collaborateurs sachent se servir des outils lundi matin.",
          },
          {
            question: 'Faut-il que tout le monde ait le même niveau ?',
            answer:
              "Non, et c'est rarement le cas. Nous répartissons les exercices par niveau plutôt que d'aligner tout le monde sur le plus lent.",
          },
          {
            question: 'Sur site ou à distance ?',
            answer:
              "Les deux fonctionnent. Sur site, la prise en main est plus rapide parce qu'on travaille sur vos vrais dossiers.",
          },
          {
            question: 'Combien de temps avant la première séance ?',
            answer:
              'Comptez deux à trois semaines entre le cadrage et la première séance, le temps de préparer des exercices tirés de votre activité.',
          },
        ],
      },
      de: {
        nav: 'Team-Schulung',
        metaTitle: 'Vorgespräch für eine KI-Schulung buchen',
        metaDesc:
          'Buchen Sie 30 Minuten, um die KI-Schulung Ihres Teams abzustecken: tatsächliches Niveau der Teilnehmenden, vorhandene Werkzeuge, Format und Dauer. Angebot im Anschluss.',
        heroTitle: 'Stecken wir die Schulung Ihres Teams ab',
        heroLead:
          'Eine nützliche KI-Schulung baut auf dem Beruf der Teilnehmenden auf, nicht auf einem Standardprogramm. Dieses Gespräch dient dazu, den Inhalt festzulegen, bevor über Preise gesprochen wird.',
        duree: '30 Minuten',
        conditions: 'Kostenlos — das Angebot folgt danach',
        pendantTitre: 'Was wir gemeinsam abstecken',
        pendant: [
          'Wer teilnimmt und das tatsächliche Ausgangsniveau — nicht das vermutete.',
          'Die im Haus bereits genutzten Werkzeuge und die untersagten.',
          'Das Format: halber Tag, ganzer Tag oder mehrere Termine.',
          'Was die Teilnehmenden am Ende selbstständig können müssen.',
        ],
        apresTitre: 'Was Sie danach erhalten',
        apres: [
          'Ein schriftliches Programm, Termin für Termin, mit den geplanten Übungen.',
          'Ein verbindliches Angebot: Teilnehmerzahl, Dauer, Ort oder Video.',
          'Die verfügbaren Daten für die nächsten acht Wochen.',
        ],
        pourQui:
          'Teams von 4 bis 30 Personen. Schulungen auf Deutsch oder Französisch, vor Ort oder per Video.',
        faq: [
          {
            question: 'Sind Ihre Schulungen anerkannt?',
            answer:
              'Wir stellen eine persönliche Teilnahmebestätigung aus. Es handelt sich nicht um einen eidgenössischen Abschluss: Unser Ziel ist, dass Ihre Mitarbeitenden die Werkzeuge am Montagmorgen beherrschen.',
          },
          {
            question: 'Müssen alle dasselbe Niveau haben?',
            answer:
              'Nein, und das ist selten der Fall. Wir staffeln die Übungen nach Niveau, statt alle am langsamsten Teilnehmer auszurichten.',
          },
          {
            question: 'Vor Ort oder online?',
            answer:
              'Beides funktioniert. Vor Ort geht es schneller, weil wir an Ihren echten Dossiers arbeiten.',
          },
          {
            question: 'Wie lange bis zum ersten Termin?',
            answer:
              'Rechnen Sie mit zwei bis drei Wochen, um Übungen aus Ihrem Alltag vorzubereiten.',
          },
        ],
      },
      en: {
        nav: 'Team training',
        metaTitle: 'Book a scoping call for AI training',
        metaDesc:
          'Book 30 minutes to scope your team’s AI training: the participants’ real level, tools already in use, format and length. Quote follows the call.',
        heroTitle: 'Let us scope your team training',
        heroLead:
          'Useful AI training is built on what the participants actually do, not on a generic syllabus. This call is for scoping the content before we talk price.',
        duree: '30 minutes',
        conditions: 'No charge — the quote comes after',
        pendantTitre: 'What we scope together',
        pendant: [
          'Who attends, and their real starting level — not the assumed one.',
          'The tools already used in the company, and those that are off limits.',
          'The format: half a day, a full day, or several spaced sessions.',
          'What participants must be able to do on their own by the end.',
        ],
        apresTitre: 'What you get afterwards',
        apres: [
          'A written programme, session by session, with the planned exercises.',
          'A firm quote: number of participants, length, on site or video.',
          'The dates available over the following eight weeks.',
        ],
        pourQui:
          'Teams of 4 to 30 people. Training is delivered in French or English, on site in Switzerland or by video.',
        faq: [
          {
            question: 'Is your training accredited?',
            answer:
              'We issue a named certificate of attendance. It is not a federal qualification: our aim is that your staff can use the tools on Monday morning.',
          },
          {
            question: 'Does everyone need the same level?',
            answer:
              'No, and they rarely do. We tier the exercises by level rather than pacing everyone to the slowest participant.',
          },
          {
            question: 'On site or remote?',
            answer: 'Both work. On site is faster, because we work on your real files.',
          },
          {
            question: 'How long before the first session?',
            answer:
              'Allow two to three weeks between scoping and the first session, to prepare exercises drawn from your own work.',
          },
        ],
      },
      it: {
        nav: 'Formazione team',
        metaTitle: 'Prenota un incontro di inquadramento formazione IA',
        metaDesc:
          'Prenota 30 minuti per inquadrare la formazione IA del tuo team: livello reale dei partecipanti, strumenti già in uso, formato e durata. Il preventivo segue l’incontro.',
        heroTitle: 'Inquadriamo la formazione del tuo team',
        heroLead:
          'Una formazione IA utile si costruisce sul mestiere dei partecipanti, non su un programma generico. Questo incontro serve a definire i contenuti prima di parlare di prezzo.',
        duree: '30 minuti',
        conditions: 'Senza costi — il preventivo arriva dopo',
        pendantTitre: 'Cosa definiamo insieme',
        pendant: [
          'Chi partecipa e il livello reale di partenza, non quello presunto.',
          'Gli strumenti già usati in azienda e quelli vietati.',
          'Il formato: mezza giornata, giornata intera o più sessioni.',
          'Cosa i partecipanti devono saper fare da soli alla fine.',
        ],
        apresTitre: 'Cosa ricevi dopo',
        apres: [
          'Un programma scritto, sessione per sessione, con gli esercizi previsti.',
          'Un preventivo fermo: numero di partecipanti, durata, sede o video.',
          'Le date disponibili per le otto settimane successive.',
        ],
        pourQui:
          'Team da 4 a 30 persone. Le formazioni si tengono in italiano o francese, in sede o in video.',
        faq: [
          {
            question: 'Le vostre formazioni sono riconosciute?',
            answer:
              'Rilasciamo un attestato di partecipazione nominativo. Non è un titolo federale: il nostro obiettivo è che i collaboratori sappiano usare gli strumenti lunedì mattina.',
          },
          {
            question: 'Tutti devono avere lo stesso livello?',
            answer:
              'No, e raramente è così. Graduiamo gli esercizi per livello invece di allineare tutti al più lento.',
          },
          {
            question: 'In sede o a distanza?',
            answer:
              'Funzionano entrambe. In sede si va più veloci perché lavoriamo sui vostri dossier reali.',
          },
          {
            question: 'Quanto tempo prima della prima sessione?',
            answer:
              'Calcola due o tre settimane, il tempo di preparare esercizi tratti dalla vostra attività.',
          },
        ],
      },
    },
  },
  {
    slug: 'agent-ia',
    contenu: {
      fr: {
        nav: 'Projet agent IA',
        metaTitle: 'Réserver un entretien projet agent IA ou automatisation',
        metaDesc:
          "Réservez 45 minutes pour cadrer un agent IA ou une automatisation sur mesure : le processus visé, les outils à connecter, la question des données. Devis chiffré après l'entretien.",
        heroTitle: 'Parlons de votre projet',
        heroLead:
          "Un agent IA ne se vend pas sur catalogue : il se branche sur vos outils et vos règles métier. Quarante-cinq minutes suffisent pour savoir si votre cas est faisable, et à quel ordre de grandeur.",
        duree: '45 minutes',
        conditions: 'Sans frais — devis chiffré ensuite',
        pendantTitre: 'Ce que nous regardons',
        pendant: [
          "Le processus exact à reprendre, de son déclencheur jusqu'à son résultat.",
          'Les logiciels à connecter, et si leur accès est ouvert ou fermé.',
          'Les cas particuliers qui font échouer les automatisations naïves.',
          'Où vivent les données, et ce que la nLPD impose dans votre situation.',
        ],
        apresTitre: 'Ce que vous recevez ensuite',
        apres: [
          'Un cahier des charges court, écrit dans vos termes, pas en jargon.',
          'Un devis chiffré avec les étapes de livraison.',
          'Un avis franc si le projet ne vaut pas la dépense — cela arrive.',
        ],
        pourQui:
          'PME romandes ayant un processus répétitif identifié et un responsable disponible pour le décrire.',
        faq: [
          {
            question: 'Combien coûte un agent IA ?',
            answer:
              "Cela dépend entièrement du nombre de systèmes à connecter et du nombre de cas particuliers. Nous ne donnons pas de prix avant d'avoir vu le processus : un chiffre annoncé à l'aveugle est un chiffre faux.",
          },
          {
            question: 'Combien de temps pour une mise en service ?',
            answer:
              'Les projets simples tiennent en trois à cinq semaines. Ceux qui touchent à une comptabilité ou à un ERP demandent plus, parce que les tests doivent être sérieux.',
          },
          {
            question: 'Nos données partent-elles à l’étranger ?',
            answer:
              "Pas nécessairement. Plusieurs briques s'auto-hébergent chez un hébergeur suisse. Nous vous disons dès l'entretien ce qui peut rester en Suisse et ce qui sort.",
          },
          {
            question: 'Que se passe-t-il si nous voulons reprendre la main ?',
            answer:
              "Le code et les configurations vous appartiennent. Nous documentons de manière à ce qu'un prestataire tiers puisse reprendre le dossier.",
          },
        ],
      },
      de: {
        nav: 'KI-Agent-Projekt',
        metaTitle: 'Projektgespräch zu KI-Agent oder Automatisierung buchen',
        metaDesc:
          'Buchen Sie 45 Minuten, um einen KI-Agenten oder eine Automatisierung abzustecken: Zielprozess, anzubindende Werkzeuge, Datenfrage. Bezifferte Offerte im Anschluss.',
        heroTitle: 'Sprechen wir über Ihr Projekt',
        heroLead:
          'Ein KI-Agent wird nicht ab Katalog verkauft: Er wird an Ihre Werkzeuge und Ihre Regeln angebunden. Fünfundvierzig Minuten genügen, um zu wissen, ob Ihr Fall machbar ist und in welcher Grössenordnung.',
        duree: '45 Minuten',
        conditions: 'Kostenlos — bezifferte Offerte danach',
        pendantTitre: 'Was wir anschauen',
        pendant: [
          'Der genaue Prozess, von seinem Auslöser bis zum Ergebnis.',
          'Die anzubindenden Programme und ob ihr Zugang offen oder geschlossen ist.',
          'Die Sonderfälle, an denen naive Automatisierungen scheitern.',
          'Wo die Daten liegen und was das nDSG in Ihrer Lage verlangt.',
        ],
        apresTitre: 'Was Sie danach erhalten',
        apres: [
          'Ein kurzes Pflichtenheft, in Ihren Worten statt im Fachjargon.',
          'Eine bezifferte Offerte mit den Lieferetappen.',
          'Eine offene Einschätzung, wenn das Projekt die Ausgabe nicht wert ist.',
        ],
        pourQui:
          'KMU mit einem erkannten wiederkehrenden Prozess und einer Person, die ihn beschreiben kann.',
        faq: [
          {
            question: 'Was kostet ein KI-Agent?',
            answer:
              'Das hängt ganz von der Anzahl anzubindender Systeme und Sonderfälle ab. Wir nennen keinen Preis, bevor wir den Prozess gesehen haben: eine blind genannte Zahl ist eine falsche Zahl.',
          },
          {
            question: 'Wie lange bis zur Inbetriebnahme?',
            answer:
              'Einfache Projekte dauern drei bis fünf Wochen. Wo eine Buchhaltung oder ein ERP betroffen ist, dauert es länger, weil die Tests seriös sein müssen.',
          },
          {
            question: 'Gehen unsere Daten ins Ausland?',
            answer:
              'Nicht zwingend. Mehrere Bausteine lassen sich bei einem schweizerischen Anbieter selbst hosten. Wir sagen Ihnen im Gespräch, was in der Schweiz bleiben kann.',
          },
          {
            question: 'Und wenn wir selbst übernehmen wollen?',
            answer:
              'Code und Konfigurationen gehören Ihnen. Wir dokumentieren so, dass ein Dritter das Dossier übernehmen kann.',
          },
        ],
      },
      en: {
        nav: 'AI agent project',
        metaTitle: 'Book a project call for an AI agent or automation',
        metaDesc:
          'Book 45 minutes to scope a custom AI agent or automation: the target process, the tools to connect, the data question. Costed quote after the call.',
        heroTitle: 'Let us talk about your project',
        heroLead:
          'An AI agent is not sold off a catalogue: it plugs into your tools and your business rules. Forty-five minutes is enough to know whether your case is feasible, and at what order of cost.',
        duree: '45 minutes',
        conditions: 'No charge — costed quote follows',
        pendantTitre: 'What we look at',
        pendant: [
          'The exact process to take over, from its trigger to its result.',
          'The software to connect, and whether access to it is open or closed.',
          'The edge cases that make naive automations fail.',
          'Where the data lives, and what Swiss data law requires in your situation.',
        ],
        apresTitre: 'What you get afterwards',
        apres: [
          'A short specification, written in your terms rather than jargon.',
          'A costed quote with delivery stages.',
          'A straight opinion if the project is not worth the spend — it happens.',
        ],
        pourQui:
          'SMEs with an identified repetitive process and someone available to describe it.',
        faq: [
          {
            question: 'What does an AI agent cost?',
            answer:
              'It depends entirely on how many systems must be connected and how many edge cases exist. We do not quote before seeing the process: a figure given blind is a wrong figure.',
          },
          {
            question: 'How long until it goes live?',
            answer:
              'Simple projects take three to five weeks. Anything touching accounting or an ERP takes longer, because the testing has to be serious.',
          },
          {
            question: 'Does our data leave Switzerland?',
            answer:
              'Not necessarily. Several building blocks can be self-hosted with a Swiss provider. We tell you during the call what can stay and what leaves.',
          },
          {
            question: 'What if we want to take over ourselves?',
            answer:
              'The code and configuration are yours. We document so that a third party can pick up the file.',
          },
        ],
      },
      it: {
        nav: 'Progetto agente IA',
        metaTitle: 'Prenota un incontro per un agente IA o un’automazione',
        metaDesc:
          'Prenota 45 minuti per inquadrare un agente IA o un’automazione su misura: il processo mirato, gli strumenti da collegare, la questione dei dati. Preventivo dopo l’incontro.',
        heroTitle: 'Parliamo del tuo progetto',
        heroLead:
          'Un agente IA non si vende a catalogo: si collega ai tuoi strumenti e alle tue regole. Quarantacinque minuti bastano per sapere se il tuo caso è realizzabile e con quale ordine di costo.',
        duree: '45 minuti',
        conditions: 'Senza costi — preventivo dopo',
        pendantTitre: 'Cosa esaminiamo',
        pendant: [
          'Il processo esatto da riprendere, dall’innesco al risultato.',
          'I software da collegare e se il loro accesso è aperto o chiuso.',
          'I casi particolari che fanno fallire le automazioni ingenue.',
          'Dove vivono i dati e cosa impone la legge svizzera nel tuo caso.',
        ],
        apresTitre: 'Cosa ricevi dopo',
        apres: [
          'Un capitolato breve, scritto nei tuoi termini e non in gergo.',
          'Un preventivo con le tappe di consegna.',
          'Un parere sincero se il progetto non vale la spesa — capita.',
        ],
        pourQui:
          'PMI con un processo ripetitivo identificato e un responsabile disponibile a descriverlo.',
        faq: [
          {
            question: 'Quanto costa un agente IA?',
            answer:
              'Dipende interamente dal numero di sistemi da collegare e di casi particolari. Non diamo un prezzo prima di aver visto il processo: una cifra detta alla cieca è una cifra sbagliata.',
          },
          {
            question: 'Quanto tempo per la messa in servizio?',
            answer:
              'I progetti semplici richiedono tre a cinque settimane. Quelli che toccano la contabilità o un ERP richiedono di più, perché i test devono essere seri.',
          },
          {
            question: 'I nostri dati vanno all’estero?',
            answer:
              'Non necessariamente. Diversi componenti si possono ospitare presso un fornitore svizzero. Te lo diciamo già durante l’incontro.',
          },
          {
            question: 'E se volessimo riprendere il controllo?',
            answer:
              'Codice e configurazioni sono vostri. Documentiamo in modo che un terzo possa riprendere il dossier.',
          },
        ],
      },
    },
  },
];

export function getRdvOffre(slug: string): RdvOffre | undefined {
  return RDV_OFFRES.find((o) => o.slug === slug);
}

// Planning Google Agenda fourni par Laurent le 28/09/2026 : des creneaux de 30 minutes.
// Il est ecrit ici, et pas seulement dans Vercel, pour que la reservation marche des le
// prochain deploiement sans reglage a faire. Une variable NEXT_PUBLIC_AGENDA_* le remplace.
export const AGENDA_GOOGLE_30MIN =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ26vXn02YsEzNDIinUNOXn6ycEZ0Y3xKIjGX3-N6A_-5nqeMkIdmQxQ5kKBt4J3xNhj8dMhwo3P';

// Next remplace process.env.NEXT_PUBLIC_* a la compilation, mais UNIQUEMENT quand la
// variable est ecrite litteralement. Un acces dynamique (process.env[nom]) ressort vide
// dans le navigateur. D'ou ce switch explicite, qui a l'air redondant mais ne l'est pas.
//
// L'entretien agent dure 45 minutes : il ne retombe PAS sur le planning de 30 minutes,
// sinon la page annoncerait 45 minutes et Google en reserverait 30. Sans planning dedie,
// il bascule sur telephone / WhatsApp.
// Evenement iClosed « Diagnostic IA gratuit » (03/10/2026). Tant qu'il est vide, le planning
// Google ci-dessus reste en service. Rempli, il passe devant Google sur toutes les pages 30 min.
export const AGENDA_ICLOSED = 'https://app.iclosed.io/e/VOCALIS/agent-ia';

export function agendaUrl(slug: string): string {
  const commun = process.env.NEXT_PUBLIC_AGENDA_URL || '';
  const trenteMinutes = commun || AGENDA_ICLOSED || AGENDA_GOOGLE_30MIN;
  switch (slug) {
    case 'audit-ia':
      return process.env.NEXT_PUBLIC_AGENDA_AUDIT || trenteMinutes;
    case 'formation-ia':
      return process.env.NEXT_PUBLIC_AGENDA_FORMATION || trenteMinutes;
    case 'laura':
      return process.env.NEXT_PUBLIC_AGENDA_LAURA || trenteMinutes;
    case 'michael':
      return process.env.NEXT_PUBLIC_AGENDA_MICHAEL || trenteMinutes;
    case 'agent-ia':
      return process.env.NEXT_PUBLIC_AGENDA_AGENT || commun || AGENDA_ICLOSED;
    default:
      return trenteMinutes;
  }
}
