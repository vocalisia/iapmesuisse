'use client';

import { useState } from 'react';

type Props = { locale: string; title: string; url: string };
const labels = {
  fr: { title: 'Partager ce guide', copy: 'Copier le lien', copied: 'Lien copié', native: 'Partager', network: 'Sur {network}' },
  de: { title: 'Diesen Leitfaden teilen', copy: 'Link kopieren', copied: 'Link kopiert', native: 'Teilen', network: 'Auf {network}' },
  en: { title: 'Share this guide', copy: 'Copy link', copied: 'Link copied', native: 'Share', network: 'On {network}' },
  it: { title: 'Condividi questa guida', copy: 'Copia il link', copied: 'Link copiato', native: 'Condividi', network: 'Su {network}' },
};
function Icon({ name }: { name: 'linkedin' | 'facebook' | 'whatsapp' | 'x' | 'link' | 'share' }) {
  const paths = {
    linkedin: <path d="M6.5 8.5V18M6.5 5.5v.01M10.5 18v-5.1c0-1.75 1.1-2.65 2.4-2.65 1.3 0 2.1.85 2.1 2.65V18M10.5 11.2v-2.7" />,
    facebook: <path d="M13.5 18v-5h1.8l.27-2h-2.07V9.72c0-.58.16-.97.99-.97h1.05V6.96c-.18-.02-.8-.08-1.52-.08-1.5 0-2.53.92-2.53 2.61V11H9.8v2h1.7v5" />,
    whatsapp: <path d="M18.3 5.75a7.8 7.8 0 0 0-12.2 9.4L5 19l3.98-1.04A7.8 7.8 0 0 0 18.3 5.75Zm-6.2 10.9a6.1 6.1 0 0 1-3.1-.84l-.22-.13-2.36.62.63-2.3-.14-.24a6.1 6.1 0 1 1 5.2 2.88Zm3.35-4.57c-.18-.09-1.07-.53-1.23-.58-.17-.06-.29-.09-.41.09-.12.18-.47.58-.58.7-.1.12-.2.13-.38.05-.18-.09-.75-.28-1.43-.9a5.37 5.37 0 0 1-.99-1.23c-.1-.18-.01-.28.08-.37l.28-.33c.1-.12.13-.2.19-.33.06-.12.03-.23-.01-.33-.05-.1-.41-.99-.57-1.36-.15-.36-.3-.3-.41-.31h-.35c-.12 0-.33.05-.5.23-.17.18-.66.64-.66 1.56s.68 1.81.77 1.93c.1.12 1.34 2.05 3.25 2.88.45.2.81.32 1.08.4.45.14.86.12 1.18.07.36-.05 1.07-.44 1.22-.87.15-.42.15-.79.1-.87-.04-.08-.16-.13-.34-.22Z" />,
    x: <path d="M5.25 5.5 10.52 12.55 5.2 18.5h1.4l4.55-5.08 3.8 5.08h4.8l-5.58-7.47 4.96-5.53h-1.4l-4.18 4.67-3.48-4.67H5.25Zm3.03 1.13h1.22l7.2 10.74h-1.22L8.28 6.63Z" />,
    link: <path d="M9.5 14.5 14.5 9.5M8 17H6.75A2.75 2.75 0 0 1 4 14.25v-1.5A2.75 2.75 0 0 1 6.75 10H8m8 0h1.25A2.75 2.75 0 0 1 20 12.75v1.5A2.75 2.75 0 0 1 17.25 17H16" />,
    share: <path d="M15 5.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm9 8.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7.7 11.2l5.6-3.2M7.7 12.8l5.6 3.2" />,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}
export default function ArticleActions({ locale, title, url }: Props) {
  const t = labels[locale as keyof typeof labels] ?? labels.fr;
  const [copied, setCopied] = useState(false);
  const message = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const shares = [
    { name: 'LinkedIn', icon: 'linkedin' as const, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { name: 'Facebook', icon: 'facebook' as const, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: 'WhatsApp', icon: 'whatsapp' as const, href: `https://wa.me/?text=${message}%20${encodedUrl}` },
    { name: 'X', icon: 'x' as const, href: `https://x.com/intent/post?text=${message}&url=${encodedUrl}` },
  ];
  async function copyLink() {
    try { await navigator.clipboard.writeText(url); setCopied(true); window.setTimeout(() => setCopied(false), 2600); }
    catch { window.prompt(t.copy, url); }
  }
  async function nativeShare() { if (navigator.share) await navigator.share({ title, url }); else await copyLink(); }
  return <aside className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-5" aria-label={t.title} data-article-share>
    <p className="mb-3 text-sm font-semibold text-slate-700 sm:mb-0">{t.title}</p><div className="flex flex-wrap gap-2">
      <button type="button" onClick={nativeShare} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50" aria-label={t.native}><Icon name="share" />{t.native}</button>
      {shares.map((share) => <a key={share.name} href={share.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50" aria-label={t.network.replace('{network}', share.name)}><Icon name={share.icon} /><span className="sr-only sm:not-sr-only">{share.name}</span></a>)}
      <button type="button" onClick={copyLink} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#172b46] px-3 text-sm font-semibold text-white transition hover:bg-[#294762]" aria-live="polite"><Icon name="link" />{copied ? t.copied : t.copy}</button>
    </div></aside>;
}
