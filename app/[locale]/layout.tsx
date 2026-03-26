import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterBanner from '@/components/NewsletterBanner';
import CookieBanner from '@/components/CookieBanner';
import SchemaMarkup from '@/components/SchemaMarkup';
import { notFound } from 'next/navigation';
import Script from 'next/script';

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
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale,
      type: 'website',
      siteName: 'IAPME Suisse',
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
        <SchemaMarkup locale={locale} />
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7HQQDGHRT2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7HQQDGHRT2');
          `}
        </Script>
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
