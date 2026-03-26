'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function NewsletterForm() {
  const t = useTranslations('newsletter');

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="mt-4 text-lg font-semibold text-green-800">
          {t('success')}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email input */}
      <div>
        <label
          htmlFor="newsletter-email"
          className="mb-1 block text-sm font-medium text-[#1B2A4A]"
        >
          {t('email_label')}
        </label>
        <input
          type="email"
          id="newsletter-email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('email_placeholder')}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 transition-colors focus:border-[#FF0000] focus:outline-none focus:ring-2 focus:ring-[#FF0000]/20"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[#FF0000] px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? '...' : t('subscribe')}
      </button>

      {/* Consent text */}
      <p className="text-xs leading-relaxed text-gray-500">
        {t('consent')}
      </p>
    </form>
  );
}
