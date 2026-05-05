'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';

type GtagWindow = { gtag: (...args: unknown[]) => void };

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const consent = localStorage.getItem('cookie-consent');
      if (consent !== 'accepted' && consent !== 'rejected') {
        setVisible(true);
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  function updateConsent(granted: boolean) {
    if (typeof window !== 'undefined' && typeof (window as unknown as GtagWindow).gtag === 'function') {
      (window as unknown as GtagWindow).gtag('consent', 'update', {
        analytics_storage: granted ? 'granted' : 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
  }

  function handleAccept() {
    localStorage.setItem('cookie-consent', 'accepted');
    updateConsent(true);
    setVisible(false);
  }

  function handleReject() {
    localStorage.setItem('cookie-consent', 'rejected');
    updateConsent(false);
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white px-4 py-4 shadow-lg sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row">
        <p className="flex-1 text-center text-sm leading-relaxed text-gray-600 sm:text-left">
          Ce site utilise des cookies pour améliorer votre expérience et analyser le trafic.{' '}
          <Link
            href="/politique-confidentialite"
            className="font-medium text-[#1B2A4A] underline transition-colors hover:text-[#FF0000]"
          >
            En savoir plus
          </Link>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={handleReject}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="rounded-lg bg-[#1B2A4A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2a3f6e]"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
