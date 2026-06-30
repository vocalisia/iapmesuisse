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
            <Link href="/" className="inline-flex items-center gap-3">
              <img
                src="/brand/iapmesuisse-emblem-logo.png"
                alt=""
                width={512}
                height={512}
                aria-hidden="true"
                className="h-14 w-14 flex-shrink-0 rounded-xl bg-white object-contain p-1 shadow-sm ring-1 ring-white/20"
              />
              <span className="whitespace-nowrap text-xl font-extrabold tracking-tight">
                <span className="text-white">iapmesuisse</span>
                <span className="text-[#22C55E]">.ch</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-300">
              {t('description')}
            </p>
            <address className="mt-4 not-italic text-xs leading-relaxed text-gray-400">
              <div className="font-semibold text-gray-300">Laurent Duplat</div>
              <div>Directeur de la publication & Formateur IA</div>
              <div className="mt-2">Chem. Saint-Hubert 2</div>
              <div>1950 Sion · Valais · Suisse</div>
              <div className="mt-3 flex max-w-full flex-col items-start gap-2">
                <a href="mailto:contact@iapmesuisse.ch" className="max-w-full break-all text-gray-300 hover:text-white">
                  contact@iapmesuisse.ch
                </a>
                <a
                  href="https://wa.me/41799394222"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 max-w-full items-center gap-2 whitespace-nowrap rounded-full border border-[#25D366]/35 bg-[#25D366]/10 px-3.5 text-xs font-semibold text-[#DDFBE7] transition-all hover:border-[#25D366]/70 hover:bg-[#25D366]/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B2A4A]"
                  aria-label="Contact WhatsApp"
                >
                  <svg className="h-4 w-4 shrink-0 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
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
