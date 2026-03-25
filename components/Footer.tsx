import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const svc = useTranslations('services');

  return (
    <footer className="bg-[#1B2A4A] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: About */}
          <div>
            <h3 className="text-lg font-bold">
              IAPME<span className="text-[#FF0000]">Suisse</span>
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-300">
              {t('description')}
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              {t('services')}
            </h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/services" className="text-sm text-gray-300 transition-colors hover:text-white">{svc('audit.title')}</Link></li>
              <li><Link href="/services" className="text-sm text-gray-300 transition-colors hover:text-white">{svc('training.title')}</Link></li>
              <li><Link href="/services" className="text-sm text-gray-300 transition-colors hover:text-white">{svc('integration.title')}</Link></li>
              <li><Link href="/services" className="text-sm text-gray-300 transition-colors hover:text-white">{svc('strategy.title')}</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              {t('company')}
            </h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/a-propos" className="text-sm text-gray-300 transition-colors hover:text-white">{nav('about')}</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-300 transition-colors hover:text-white">{nav('blog')}</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-300 transition-colors hover:text-white">{nav('contact')}</Link></li>
              <li><Link href="/ressources" className="text-sm text-gray-300 transition-colors hover:text-white">{nav('resources')}</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              {t('legal')}
            </h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/mentions-legales" className="text-sm text-gray-300 transition-colors hover:text-white">{nav('mentions')}</Link></li>
              <li><Link href="/politique-confidentialite" className="text-sm text-gray-300 transition-colors hover:text-white">{nav('privacy_page')}</Link></li>
              <li><Link href="/cgv" className="text-sm text-gray-300 transition-colors hover:text-white">{nav('terms_page')}</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} IAPME Suisse. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
