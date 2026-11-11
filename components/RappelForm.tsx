'use client';

import { useEffect, useRef, useState } from 'react';
import IconeWhatsApp from '@/components/IconeWhatsApp';

// Formulaire « rappelez-moi » des pages de reservation personnelles. Il passe par
// /api/contact, qui envoie la demande par e-mail : le champ `persona` dit qui doit rappeler,
// `origine` reprend les parametres utm_* de l'e-mail pour savoir quel scenario a converti.

type Props = { persona: string; prenom: string; messageAide: string; whatsapp: string };

type GtagWindow = { gtag?: (...args: unknown[]) => void };

const MOMENTS = ['Le matin', 'En début d’après-midi', 'En fin de journée', 'Peu importe'];

function telephoneValide(tel: string): boolean {
  const chiffres = tel.replace(/\D/g, '');
  return chiffres.length >= 9 && chiffres.length <= 13;
}

function origine(): string {
  const qs = new URLSearchParams(window.location.search);
  const parts = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']
    .map((k) => qs.get(k))
    .filter(Boolean);
  return parts.length ? parts.join(' / ') : 'visite directe';
}

const CHAMP =
  'mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-base font-normal normal-case tracking-normal text-primary placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';
const LIBELLE = 'block text-xs font-bold uppercase tracking-[0.08em] text-gray-600';

// Champs pre-remplis depuis le lien de l'e-mail (?email=…&company=…), comme sur MeilleurArtisan :
// le prospect n'a plus qu'a confirmer son numero.
const PRE_REMPLIS = ['name', 'company', 'email', 'phone'];

export default function RappelForm({ persona, prenom, messageAide, whatsapp }: Props) {
  const formulaire = useRef<HTMLFormElement>(null);
  const [envoye, setEnvoye] = useState(false);
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const f = formulaire.current;
    if (!f) return;
    for (const k of PRE_REMPLIS) {
      const champ = f.elements.namedItem(k) as HTMLInputElement | null;
      const valeur = qs.get(k);
      if (champ && valeur && !champ.value) champ.value = valeur;
    }
  }, []);

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const champ = (k: string) => String(f.get(k) ?? '').trim();

    if (!telephoneValide(champ('phone'))) {
      setErreur('Vérifiez le numéro de téléphone, par exemple +41 79 123 45 67.');
      return;
    }
    setErreur('');
    setEnCours(true);

    const message = [
      `Demande de rappel depuis la page de ${prenom}.`,
      `Moment préféré : ${champ('moment') || 'non précisé'}`,
      champ('sujet') && `Sujet : ${champ('sujet')}`,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: champ('name'),
          company: champ('company'),
          email: champ('email'),
          phone: champ('phone'),
          message,
          persona,
          origine: origine(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error('envoi');

      (window as unknown as GtagWindow).gtag?.('event', 'rdv_rappel_demande', { conseiller: persona });
      setEnvoye(true);
    } catch {
      setErreur(`L’envoi n’a pas abouti. Appelez-nous directement au 021 900 04 83 ou répondez à l’e-mail de ${prenom}.`);
    } finally {
      setEnCours(false);
    }
  }

  if (envoye) {
    return (
      <div role="status" className="flex h-full flex-col items-center justify-center rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <svg className="mx-auto h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="mt-4 text-lg font-semibold text-green-800">C’est noté, merci.</p>
        <p className="mt-2 text-green-800">{prenom} vous rappelle au moment que vous avez indiqué.</p>
      </div>
    );
  }

  return (
    <form ref={formulaire} onSubmit={envoyer} className="grid gap-5 sm:grid-cols-2">
      <label className={LIBELLE}>
        Nom et prénom
        <input name="name" required autoComplete="name" placeholder="Votre nom" className={CHAMP} />
      </label>
      <label className={LIBELLE}>
        Entreprise
        <input name="company" required autoComplete="organization" placeholder="Nom de l’entreprise" className={CHAMP} />
      </label>
      <label className={LIBELLE}>
        Téléphone
        <input name="phone" type="tel" required autoComplete="tel" placeholder="+41 79 123 45 67" className={CHAMP} />
      </label>
      <label className={LIBELLE}>
        E-mail
        <input name="email" type="email" required autoComplete="email" placeholder="vous@entreprise.ch" className={CHAMP} />
      </label>
      <label className={`${LIBELLE} sm:col-span-2`}>
        Quand vous joindre ?
        <select name="moment" defaultValue={MOMENTS[3]} className={CHAMP}>
          {MOMENTS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>
      <label className={`${LIBELLE} sm:col-span-2`}>
        {messageAide}
        <textarea name="sujet" rows={3} className={CHAMP} />
      </label>

      {erreur && (
        <p role="alert" className="text-sm font-medium text-red-700 sm:col-span-2">
          {erreur}
        </p>
      )}

      <div className="grid gap-3 sm:col-span-2 sm:grid-cols-[1fr_auto]">
        <button
          type="submit"
          disabled={enCours}
          className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-accent-dark hover:shadow-xl disabled:opacity-60"
        >
          {enCours ? 'Envoi…' : `Demander le rappel de ${prenom}`}
        </button>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#1ebe5a]"
        >
          <IconeWhatsApp />
          WhatsApp
        </a>
      </div>
      <p className="text-xs leading-relaxed text-gray-500 sm:col-span-2">
        Vos coordonnées servent uniquement à ce rappel. Vous pouvez demander leur suppression à tout moment.
      </p>
    </form>
  );
}
