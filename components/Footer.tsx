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
            <address className="mt-4 not-italic text-xs leading-relaxed text-gray-400">
              <div className="font-semibold text-gray-300">Laurent Duplat</div>
              <div>Directeur de la publication & Formateur IA</div>
              <div className="mt-2">Chem. Saint-Hubert 2</div>
              <div>1950 Sion · Valais · Suisse</div>
              <a href="mailto:contact@iapmesuisse.ch" className="mt-2 inline-block text-gray-300 hover:text-white">
                contact@iapmesuisse.ch
              </a>
            </address>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="inline-block rounded-md border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-300">nLPD</span>
              <span className="inline-block rounded-md border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-300">AI Act</span>
              <span className="inline-block rounded-md border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-300">RGPD</span>
              <span className="inline-block rounded-md border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-300">FR · DE · IT · EN</span>
            </div>
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
              <li><Link href="/formation-ia-pme" className="text-sm text-gray-300 transition-colors hover:text-white">{nav('formation')}</Link></li>
              <li><Link href="/consulting" className="text-sm text-gray-300 transition-colors hover:text-white">{nav('consulting')}</Link></li>
              <li><Link href="/evenements-ia" className="text-sm text-gray-300 transition-colors hover:text-white">{nav('evenements')}</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-300 transition-colors hover:text-white">{nav('contact')}</Link></li>
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

        {/* Nos sites */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 text-center">Nos sites</h4>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://vocalis.pro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 text-sm transition-all">
              <span className="w-2 h-2 bg-blue-400 rounded-full" />Vocalis.pro
            </a>
            <a href="https://vocalis.blog" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 text-sm transition-all">
              <span className="w-2 h-2 bg-green-400 rounded-full" />Vocalis.blog
            </a>
            <a href="https://tesla-mag.ch" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 text-sm transition-all">
              <span className="w-2 h-2 bg-red-400 rounded-full" />Tesla-Mag.ch
            </a>
            <a href="https://master-seller.fr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 text-sm transition-all">
              <span className="w-2 h-2 bg-orange-400 rounded-full" />Master-Seller.fr
            </a>
            <a href="https://iapmesuisse.ch" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF0000]/10 border border-[#FF0000]/30 text-white text-sm font-medium cursor-default">
              <span className="w-2 h-2 bg-[#FF0000] rounded-full" />IAPME Suisse
            </a>
            <a href="https://seo-true.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 text-sm transition-all">
              <span className="w-2 h-2 bg-cyan-400 rounded-full" />SEO-True.com
            </a>
            <a href="https://trustly-ai.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 text-sm transition-all">
              <span className="w-2 h-2 bg-purple-400 rounded-full" />Trustly-AI.com
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} IAPME Suisse. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
