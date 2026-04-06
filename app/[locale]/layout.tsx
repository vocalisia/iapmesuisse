import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { getAlternates } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterBanner from '@/components/NewsletterBanner';
import CookieBanner from '@/components/CookieBanner';
import SchemaMarkup from '@/components/SchemaMarkup';
import { notFound } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.home' });

  return {
    title: {
      default: t('title'),
      template: '%s | IAPME Suisse',
    },
    description: t('description'),
    metadataBase: new URL('https://iapmesuisse.ch'),
    alternates: getAlternates(locale),
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon.ico' },
      ],
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale,
      type: 'website',
      siteName: 'IAPME Suisse',
      images: [
        {
          url: 'https://iapmesuisse.ch/images/hero-bg.jpg',
          width: 1200,
          height: 630,
          alt: 'IAPME Suisse – IA pour PME suisses',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['https://iapmesuisse.ch/images/hero-bg.jpg'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.className}>
      <head>
        {/* Consent Mode v2 + dynamic GA4 — raw inline script to avoid Next.js preloading GA URL.
            TODO: Replace G-7HQQDGHRT2 with iapmesuisse.ch's own GA4 property ID (currently uses trustly-ai's). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;var c=typeof localStorage!=='undefined'?localStorage.getItem('cookie-consent'):null;gtag('consent','default',{analytics_storage:c==='accepted'?'granted':'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});gtag('js',new Date());gtag('config','G-7HQQDGHRT2');var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=G-7HQQDGHRT2';document.head.appendChild(s);})();`,
          }}
        />
        <SchemaMarkup locale={locale} />
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <NewsletterBanner />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
