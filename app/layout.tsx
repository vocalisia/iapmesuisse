import Script from 'next/script';
import "./globals.css";

// NOTE: GA4 ID G-7HQQDGHRT2 belongs to trustly-ai.com — replace with iapmesuisse.ch's own GA4 property ID
const GA_ID = 'G-7HQQDGHRT2';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script id="consent-init" strategy="beforeInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        var _c = (typeof localStorage !== 'undefined') ? localStorage.getItem('cookie-consent') : null;
        gtag('consent', 'default', { analytics_storage: _c === 'accepted' ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500 });
      `}</Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-config" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `}</Script>
      {children}
    </>
  );
}
