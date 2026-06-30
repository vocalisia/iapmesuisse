'use client';

import { useEffect, useRef, useState } from 'react';
import { Link, usePathname } from '@/i18n/routing';
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
  const [moreOpen, setMoreOpen] = useState(false);
  const t = useTranslations('nav');
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const moreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setMoreOpen(false), 200);
  };

  useEffect(() => {
    if (!moreOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMoreOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEsc);
    };
  }, [moreOpen]);

  useEffect(() => () => cancelClose(), []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="flex min-h-20 w-full items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex flex-none items-center gap-3">
          <img
            src="/brand/iapmesuisse-emblem-logo.png"
            alt=""
            width={512}
            height={512}
            aria-hidden="true"
            className="h-16 w-16 flex-shrink-0 rounded-2xl bg-white object-contain p-1 shadow-sm ring-1 ring-gray-200 xl:h-20 xl:w-20"
          />
          <span className="hidden items-baseline gap-0.5 whitespace-nowrap text-xl font-extrabold tracking-tight sm:flex xl:text-2xl">
            <span className="text-[#1B2A4A]">iapmesuisse</span>
            <span className="text-[#16A34A]">.ch</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1">
          {mainLinks.map((link) => (
            <Link
              key={link.labelKey}
              href={link.href}
              className="rounded-md px-2 py-2 text-[13px] font-medium text-[#1B2A4A] transition-colors hover:bg-gray-100 hover:text-[#FF0000] lg:px-2.5 lg:text-sm"
            >
              {t(link.labelKey)}
            </Link>
          ))}
          {/* More dropdown */}
          <div
            ref={moreRef}
            className="relative"
            onMouseEnter={() => {
              cancelClose();
              setMoreOpen(true);
            }}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              aria-haspopup="true"
              className="flex items-center gap-1 rounded-md px-2 py-2 text-[13px] font-medium text-[#1B2A4A] transition-colors hover:bg-gray-100 hover:text-[#FF0000] lg:px-2.5 lg:text-sm"
            >
              {t('more')}
              <svg className={`h-3.5 w-3.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {moreOpen && (
              <div
                className="absolute right-0 z-50 w-[min(12rem,calc(100vw-2rem))] pt-2"
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
              >
                <div className="rounded-md border border-gray-200 bg-white py-1 shadow-lg">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.labelKey}
                      href={link.href}
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#FF0000]"
                    >
                      {t(link.labelKey)}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right side: Quiz CTA + language switcher + mobile toggle */}
        <div className="flex flex-none items-center gap-2">
          <Link
            href="/quiz/maturite-ia"
            className="hidden rounded-lg bg-[#FF0000] px-3 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md xl:inline-flex xl:items-center xl:gap-1.5 xl:px-4 xl:text-sm"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            {t('quiz_cta')}
          </Link>
          <LanguageSwitcher />

          <details className="group lg:hidden">
            <summary
              className="inline-flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-md p-2 text-[#1B2A4A] hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden"
              aria-label="Toggle navigation menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </summary>

            <nav className="fixed left-0 right-0 top-20 z-50 max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-gray-200 bg-white px-4 py-4 shadow-xl">
              <Link
                href="/quiz/maturite-ia"
                className="mb-3 flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#FF0000] px-4 py-3 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-700"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                {t('quiz_cta')}
              </Link>
              <div className="my-2 border-t border-gray-200" />
              {mainLinks.map((link) => (
                <Link
                  key={link.labelKey}
                  href={link.href}
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
                  className="block rounded-md px-3 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#FF0000]"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
