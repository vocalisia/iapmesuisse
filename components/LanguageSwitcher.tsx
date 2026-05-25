'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import ReactCountryFlag from 'react-country-flag';

const locales = [
  { code: 'fr', label: 'Français', countryCode: 'FR' },
  { code: 'de', label: 'Deutsch', countryCode: 'DE' },
  { code: 'en', label: 'English', countryCode: 'GB' },
  { code: 'it', label: 'Italiano', countryCode: 'IT' },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = locales.find((l) => l.code === locale) ?? locales[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function switchLocale(newLocale: string) {
    setIsOpen(false);
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-[#1B2A4A] hover:bg-gray-100 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <ReactCountryFlag countryCode={currentLocale.countryCode} svg style={{ width: '1.4em', height: '1.4em' }} />
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-1 w-44 origin-top-right rounded-md border border-gray-200 bg-white py-1 shadow-lg"
        >
          {locales.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === locale}
                onClick={() => switchLocale(l.code)}
                className={`flex w-full items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
                  l.code === locale
                    ? 'bg-gray-50 font-semibold text-[#1B2A4A]'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ReactCountryFlag countryCode={l.countryCode} svg style={{ width: '1.4em', height: '1.4em' }} />
                <span>{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
