'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.startsWith('41') && digits.length >= 3) {
    const local = digits.slice(2);
    const parts = [local.slice(0, 2), local.slice(2, 5), local.slice(5, 7), local.slice(7, 9)].filter(Boolean);
    return '+41 ' + parts.join(' ');
  }
  if (digits.startsWith('0') && digits.length > 1) {
    const parts = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 8), digits.slice(8, 10)].filter(Boolean);
    return parts.join(' ');
  }
  return raw;
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 9 && digits.length <= 13;
}

export default function ContactForm() {
  const t = useTranslations('contact');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    website: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    if (name === 'phone') {
      const formatted = formatPhone(value);
      setFormData((prev) => ({ ...prev, phone: formatted }));
      setPhoneError(formatted.length > 3 && !isValidPhone(formatted) ? 'Format invalide — ex: +41 79 123 45 67' : '');
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidPhone(formData.phone)) {
      setPhoneError('Numéro requis — ex: +41 79 123 45 67');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '0ab0bb41-b3fc-46cd-9498-7007bb919de5',
          subject: `iapmesuisse.ch - Nouveau message de ${formData.name}`,
          from_site: 'iapmesuisse.ch',
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          website: formData.website,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || 'Une erreur est survenue');
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
          {t('form.success')}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-[#1B2A4A]"
        >
          {t('form.name')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder={t('form.name_placeholder')}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 transition-colors focus:border-[#FF0000] focus:outline-none focus:ring-2 focus:ring-[#FF0000]/20"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-[#1B2A4A]"
        >
          {t('form.email')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder={t('form.email_placeholder')}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 transition-colors focus:border-[#FF0000] focus:outline-none focus:ring-2 focus:ring-[#FF0000]/20"
        />
      </div>

      {/* Phone + Company */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-[#1B2A4A]">
            Téléphone <span className="text-[#FF0000]">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+41 79 123 45 67"
            className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 transition-colors focus:outline-none focus:ring-2 ${phoneError ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-gray-300 focus:border-[#FF0000] focus:ring-[#FF0000]/20'}`}
          />
          {phoneError && <p className="mt-1 text-xs text-red-500">{phoneError}</p>}
        </div>
        <div>
          <label htmlFor="company" className="mb-1 block text-sm font-medium text-[#1B2A4A]">
            {t('form.company')}
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder={t('form.company_placeholder')}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 transition-colors focus:border-[#FF0000] focus:outline-none focus:ring-2 focus:ring-[#FF0000]/20"
          />
        </div>
      </div>

      {/* Website */}
      <div>
        <label htmlFor="website" className="mb-1 block text-sm font-medium text-[#1B2A4A]">
          Site web de votre entreprise
        </label>
        <input
          type="url"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://votre-entreprise.ch"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 transition-colors focus:border-[#FF0000] focus:outline-none focus:ring-2 focus:ring-[#FF0000]/20"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-sm font-medium text-[#1B2A4A]"
        >
          {t('form.message')}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder={t('form.message_placeholder')}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 transition-colors focus:border-[#FF0000] focus:outline-none focus:ring-2 focus:ring-[#FF0000]/20"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? '...' : t('form.submit')}
      </button>
    </form>
  );
}
