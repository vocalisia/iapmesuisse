'use client';

import { useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/routing';

// Le calendrier propre à cette offre est affiché directement ; le lien externe reste disponible en secours.

const TEL_AFFICHE = '021 900 04 83';
const TEL_LIEN = '+41219000483';
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
  // gv/hl sont des parametres Google Agenda : iClosed s'integre tel quel.
  if (url.includes('iclosed.io')) return url + (url.includes('?') ? '&' : '?') + 'embedType=inline&resize=true';
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
  const [affiche, setAffiche] = useState(true);
  // iClosed (avec resize=true) envoie la hauteur de son contenu : le cadre la suit,
  // sans barre de defilement interne ni blanc sous le formulaire.
  const cadre = useRef<HTMLIFrameElement>(null);
  const [hauteur, setHauteur] = useState<number | null>(null);
  useEffect(() => {
    function recevoir(e: MessageEvent) {
      if (e.origin !== 'https://app.iclosed.io' || e.source !== cadre.current?.contentWindow) return;
      if (e.data?.type !== 'iclosed.widget_height') return;
      const h = parseInt(String(e.data.height), 10);
      if (h > 300) setHauteur(h);
    }
    window.addEventListener('message', recevoir);
    return () => window.removeEventListener('message', recevoir);
  }, []);
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
        ref={cadre}
        src={urlIntegrable(url, locale)}
        title={sujet}
        loading={direct ? 'eager' : 'lazy'}
        className={
          url.includes('iclosed.io')
            ? 'h-[1150px] w-full sm:h-[1050px] xl:h-[700px]'
            : direct
              ? 'h-[1000px] w-full sm:h-[760px]'
              : 'h-[620px] w-full rounded-lg border border-gray-200'
        }
        style={hauteur ? { border: 0, height: hauteur } : { border: 0 }}
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
