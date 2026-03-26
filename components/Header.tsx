'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

const mainLinks = [
  { href: '/', labelKey: 'home' },
  { href: '/services', labelKey: 'services' },
  { href: '/formation-ia-pme', labelKey: 'formation' },
  { href: '/consulting', labelKey: 'consulting' },
  { href: '/blog', labelKey: 'blog' },
  { href: '/contact', labelKey: 'contact' },
] as const;

const moreLinks = [
  { href: '/a-propos', labelKey: 'about' },
  { href: '/ressources', labelKey: 'resources' },
  { href: '/outils-ia', labelKey: 'outils' },
  { href: '/evenements-ia', labelKey: 'evenements' },
  { href: '/temoignages', labelKey: 'temoignages' },
  { href: '/faq', labelKey: 'faq' },
  { href: '/newsletter', labelKey: 'newsletter' },
  { href: '/partenaires', labelKey: 'partenaires' },
  { href: '/quiz/maturite-ia', labelKey: 'quiz' },
  { href: '/jeux-ia', labelKey: 'games' },
] as const;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const t = useTranslations('nav');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-0.5 text-2xl font-bold tracking-tight">
          <span className="text-[#1B2A4A]">IAPME</span>
          <span className="text-[#FF0000]">Suisse</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {mainLinks.map((link) => (
            <Link
              key={link.labelKey}
              href={link.href}
              className="rounded-md px-2.5 py-2 text-sm font-medium text-[#1B2A4A] transition-colors hover:bg-gray-100 hover:text-[#FF0000]"
            >
              {t(link.labelKey)}
            </Link>
          ))}
          {/* More dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button
              type="button"
              onClick={() => setMoreOpen(!moreOpen)}
              className="flex items-center gap-1 rounded-md px-2.5 py-2 text-sm font-medium text-[#1B2A4A] transition-colors hover:bg-gray-100 hover:text-[#FF0000]"
            >
              {t('more')}
              <svg className={`h-3.5 w-3.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {moreOpen && (
              <div className="absolute right-0 z-50 mt-1 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
                {moreLinks.map((link) => (
                  <Link
                    key={link.labelKey}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#FF0000]"
                  >
                    {t(link.labelKey)}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right side: language switcher + mobile toggle */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-[#1B2A4A] hover:bg-gray-100 lg:hidden"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile slide-in menu */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity lg:hidden ${
          mobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <nav
        className={`fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
          <span className="text-lg font-bold text-[#1B2A4A]">
            IAPME<span className="text-[#FF0000]">Suisse</span>
          </span>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {mainLinks.map((link) => (
            <Link
              key={link.labelKey}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-md px-3 py-3 text-base font-medium text-[#1B2A4A] transition-colors hover:bg-gray-100 hover:text-[#FF0000]"
            >
              {t(link.labelKey)}
            </Link>
          ))}
          <div className="my-2 border-t border-gray-200" />
          {moreLinks.map((link) => (
            <Link
              key={link.labelKey}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-md px-3 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#FF0000]"
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
