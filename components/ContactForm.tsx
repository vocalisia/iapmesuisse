'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
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

      {/* Company */}
      <div>
        <label
          htmlFor="company"
          className="mb-1 block text-sm font-medium text-[#1B2A4A]"
        >
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

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-lg bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md"
      >
        {t('form.submit')}
      </button>
    </form>
  );
}
