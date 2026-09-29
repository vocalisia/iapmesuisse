'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';

// Le planning Google ne se charge qu'apres un clic. Deux raisons, dans cet ordre :
// une iframe Google pose des cookies tiers des son affichage, ce que la banniere du site
// promet de ne pas faire avant accord ; et elle coute ~700 ko a chaque visite, y compris
// aux visiteurs qui ne reservent pas.
//
// Si l'URL du planning n'est pas encore configuree (variable NEXT_PUBLIC_AGENDA_*), la page
// ne montre pas un cadre vide : elle bascule sur telephone, WhatsApp et formulaire. La page
// reste donc publiable avant que le lien Google existe.
//
// `ancre` : un clic sur un lien de la page vers #ancre compte comme le clic d'accord et
// affiche le calendrier directement (une etape de moins pour qui clique « Voir les
// creneaux »). Seul un clic declenche l'affichage, jamais une URL qui arrive avec #ancre.
//
// `direct` : exception des pages de reservation personnelles (/rendez-vous/laura, /michael),
// ou le prospect arrive d'un e-mail pour reserver. Le calendrier s'y affiche d'emblee, comme
// sur MeilleurArtisan : un cadre vide avec un bouton faisait une page qui semblait cassee.

const TEL_AFFICHE = '+41 27 525 00 00';
const TEL_LIEN = '+41275250000';
const WHATSAPP = '41799394222';
const EMAIL = 'contact@iapmesuisse.ch';

type Labels = {
  charger: string;
  avis: string;
  chargement: string;
  sansAgendaTitre: string;
  sansAgendaTexte: string;
  appeler: string;
  whatsapp: string;
  formulaire: string;
  ouvrirNouvelOnglet: string;
};

const L: Record<string, Labels> = {
  fr: {
    charger: 'Afficher les créneaux disponibles',
    avis: 'Le calendrier est fourni par Google. En l’affichant, vous acceptez que Google dépose ses cookies.',
    chargement: 'Chargement du calendrier…',
    sansAgendaTitre: 'Réservation par téléphone pour l’instant',
    sansAgendaTexte:
      'Le calendrier en ligne arrive. D’ici là, le plus rapide est un appel ou un message WhatsApp : nous fixons le créneau ensemble en deux minutes.',
    appeler: 'Appeler le',
    whatsapp: 'Écrire sur WhatsApp',
    formulaire: 'Passer par le formulaire',
    ouvrirNouvelOnglet: 'Ouvrir le calendrier dans un nouvel onglet',
  },
  de: {
    charger: 'Verfügbare Termine anzeigen',
    avis: 'Der Kalender wird von Google bereitgestellt. Mit dem Anzeigen akzeptieren Sie die Cookies von Google.',
    chargement: 'Kalender wird geladen…',
    sansAgendaTitre: 'Vorerst Terminvereinbarung per Telefon',
    sansAgendaTexte:
      'Der Online-Kalender folgt in Kürze. Bis dahin geht es am schnellsten per Anruf oder WhatsApp: Wir finden den Termin in zwei Minuten.',
    appeler: 'Anrufen:',
    whatsapp: 'Über WhatsApp schreiben',
    formulaire: 'Über das Formular',
    ouvrirNouvelOnglet: 'Kalender in neuem Tab öffnen',
  },
  en: {
    charger: 'Show available slots',
    avis: 'The calendar is provided by Google. Displaying it means accepting Google’s cookies.',
    chargement: 'Loading the calendar…',
    sansAgendaTitre: 'Booking by phone for now',
    sansAgendaTexte:
      'The online calendar is on its way. Until then, a call or a WhatsApp message is fastest: we settle the slot together in two minutes.',
    appeler: 'Call',
    whatsapp: 'Message on WhatsApp',
    formulaire: 'Use the contact form',
    ouvrirNouvelOnglet: 'Open the calendar in a new tab',
  },
  it: {
    charger: 'Mostra gli orari disponibili',
    avis: 'Il calendario è fornito da Google. Visualizzandolo accetti i cookie di Google.',
    chargement: 'Caricamento del calendario…',
    sansAgendaTitre: 'Per ora prenotazione telefonica',
    sansAgendaTexte:
      'Il calendario online arriva presto. Nel frattempo una chiamata o un messaggio WhatsApp è la via più rapida: fissiamo l’orario in due minuti.',
    appeler: 'Chiama',
    whatsapp: 'Scrivi su WhatsApp',
    formulaire: 'Usa il formulario',
    ouvrirNouvelOnglet: 'Apri il calendario in una nuova scheda',
  },
};

// Google sert la page de reservation en mode integrable uniquement avec gv=true.
// Sans ce parametre, l'iframe affiche l'interface complete de Google Agenda.
// hl : sans lui, Google suit la langue du navigateur, et une page en francais peut
// afficher un calendrier en anglais.
function urlIntegrable(url: string, locale: string): string {
  if (!url) return '';
  let u = url;
  if (!u.includes('gv=true')) u += (u.includes('?') ? '&' : '?') + 'gv=true';
  if (!/[?&]hl=/.test(u)) u += `&hl=${locale}`;
  return u;
}

export default function AgendaEmbed({
  url,
  locale,
  sujet,
  ancre,
  direct = false,
}: {
  url: string;
  locale: string;
  sujet: string;
  ancre?: string;
  direct?: boolean;
}) {
  const [affiche, setAffiche] = useState(direct);
  const t = L[locale] ?? L.fr;

  useEffect(() => {
    if (!ancre || !url) return;
    const surClic = (e: MouseEvent) => {
      const cible = e.target as Element | null;
      if (cible?.closest?.(`a[href="#${ancre}"]`)) setAffiche(true);
    };
    document.addEventListener('click', surClic);
    return () => document.removeEventListener('click', surClic);
  }, [ancre, url]);

  // Mesure GA4 : combien de visiteurs ouvrent vraiment le calendrier (pendant de
  // rdv_rappel_demande sur le formulaire de rappel).
  useEffect(() => {
    if (!affiche) return;
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    w.gtag?.('event', 'rdv_agenda_ouvert', { page: window.location.pathname });
  }, [affiche]);

  if (!url) {
    const message = encodeURIComponent(sujet);
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h3 className="text-lg font-semibold text-[#1B2A4A]">{t.sansAgendaTitre}</h3>
        <p className="mt-2 text-gray-700">{t.sansAgendaTexte}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={`tel:${TEL_LIEN}`}
            className="rounded bg-[#FF0000] px-5 py-3 font-semibold text-white hover:opacity-90"
          >
            {t.appeler} {TEL_AFFICHE}
          </a>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-[#1B2A4A] px-5 py-3 font-semibold text-[#1B2A4A] hover:bg-[#1B2A4A] hover:text-white"
          >
            {t.whatsapp}
          </a>
          <Link
            href="/contact"
            className="rounded border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:border-gray-500"
          >
            {t.formulaire}
          </Link>
        </div>
        <p className="mt-4 text-sm text-gray-500">{EMAIL}</p>
      </div>
    );
  }

  if (!affiche) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
        <button
          type="button"
          onClick={() => setAffiche(true)}
          className="rounded bg-[#FF0000] px-6 py-3 font-semibold text-white hover:opacity-90"
        >
          {t.charger}
        </button>
        <p className="mx-auto mt-3 max-w-md text-sm text-gray-500">{t.avis}</p>
        <div className="mt-4 text-sm">
          <a href={`tel:${TEL_LIEN}`} className="text-[#1B2A4A] underline">
            {t.appeler} {TEL_AFFICHE}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <iframe
        src={urlIntegrable(url, locale)}
        title={sujet}
        loading={direct ? 'eager' : 'lazy'}
        className={direct ? 'h-[1000px] w-full sm:h-[760px]' : 'h-[620px] w-full rounded-lg border border-gray-200'}
        style={{ border: 0 }}
      />
      <p className={direct ? 'border-t border-gray-100 px-5 py-3 text-sm text-gray-500' : 'mt-3 text-sm text-gray-500'}>
        <a href={url} target="_blank" rel="noopener noreferrer" className="underline">
          {t.ouvrirNouvelOnglet}
        </a>
        {' · '}
        <a href={`tel:${TEL_LIEN}`} className="underline">
          {TEL_AFFICHE}
        </a>
      </p>
    </div>
  );
}
