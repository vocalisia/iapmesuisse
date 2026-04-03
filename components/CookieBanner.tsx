'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('cookie-consent') !== 'accepted') {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem('cookie-consent', 'accepted');
    if (typeof window !== 'undefined' && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === 'function') {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('consent', 'update', { analytics_storage: 'granted' });
    }
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white px-4 py-4 shadow-lg sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row">
        <p className="flex-1 text-center text-sm leading-relaxed text-gray-600 sm:text-left">
          Ce site utilise des cookies techniques nécessaires à son
          fonctionnement.{' '}
          <Link
            href="/politique-confidentialite"
            className="font-medium text-[#1B2A4A] underline transition-colors hover:text-[#FF0000]"
          >
            En savoir plus
          </Link>
        </p>
        <button
          type="button"
          onClick={handleAccept}
          className="shrink-0 rounded-lg bg-[#1B2A4A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2a3f6e]"
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
