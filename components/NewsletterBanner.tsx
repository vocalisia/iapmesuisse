'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function NewsletterBanner() {
  const t = useTranslations('newsletter');

  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Check if already dismissed in this session
    if (sessionStorage.getItem('newsletter-banner-dismissed') === 'true') {
      return;
    }

    setDismissed(false);

    function handleScroll() {
      const scrolled =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrolled >= 0.5) {
        setVisible(true);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleDismiss() {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem('newsletter-banner-dismissed', 'true');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Brevo integration later
    console.log('Newsletter banner signup:', email);
    handleDismiss();
  }

  if (dismissed || !visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 translate-y-0 animate-[slideUp_0.4s_ease-out] bg-[#1B2A4A] px-4 py-4 shadow-lg sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row">
        {/* Text */}
        <p className="flex-1 text-center text-sm font-medium text-white sm:text-left">
          {t('banner_text')}
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center gap-2 sm:w-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('email_placeholder')}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/60 transition-colors focus:border-white focus:outline-none sm:w-64"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-[#FF0000] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            {t('banner_cta')}
          </button>
        </form>

        {/* Dismiss button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute right-3 top-3 rounded-full p-1 text-white/70 transition-colors hover:text-white sm:static"
          aria-label="Fermer"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
