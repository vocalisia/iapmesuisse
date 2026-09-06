'use client';
import { useState } from 'react';
import Link from 'next/link';
import AgentDiagnostic from './free-tools/AgentDiagnostic';
import s from './free-tools/tools.module.css';
const copy = {
  fr: { title: 'Quel agent IA aiderait votre entreprise ?', body: 'Décrivez votre activité, identifiez une première mission utile et demandez à être rappelé pour votre projet sur mesure.', steps: 'Votre entreprise → vos besoins → votre agent et le rappel', start: 'Trouver mon agent IA', contact: 'Parler de mon projet', close: 'Fermer le diagnostic' },
  de: { title: 'Welcher KI-Agent passt zu Ihrem Unternehmen?', body: 'Beschreiben Sie Ihre Tätigkeit und Ihren Bedarf. Gemeinsam prüfen wir eine passende, individuelle Lösung.', steps: 'Unternehmen → Bedarf → persönlicher Austausch', start: 'KI-Diagnose starten (Französisch)', contact: 'Mein Projekt besprechen', close: '' },
  en: { title: 'Which AI agent could help your business?', body: 'Describe your business and needs. We will discuss a suitable first use case and a tailored solution with you.', steps: 'Your business → your needs → a personal conversation', start: 'Start the AI diagnostic (in French)', contact: 'Discuss my project', close: '' },
  it: { title: 'Quale agente IA può aiutare la vostra azienda?', body: 'Descrivete la vostra attività e le vostre esigenze. Valuteremo insieme un primo utilizzo utile e una soluzione su misura.', steps: 'Azienda → esigenze → colloquio personale', start: 'Avviare la diagnosi IA (in francese)', contact: 'Parlare del mio progetto', close: '' },
};
export default function ContactFunnel({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false), t = copy[locale as keyof typeof copy] ?? copy.fr;
  return <section id="contact-projet" data-contact-funnel className={s.funnel} aria-label={t.title}><div className={s.container}>
    <h2>{t.title}</h2><p>{t.body}</p><p className={s.note}>{t.steps}</p><div className={s.actions}>
      {locale === 'fr' ? <button type="button" className={s.primary} aria-expanded={open} aria-controls="footer-diagnostic" onClick={() => setOpen(!open)}>{open ? t.close : t.start}</button> : <Link className={s.primary} href="/fr/ressources#agent-sur-mesure">{t.start}</Link>}
      <Link className={s.secondary} href={`/${locale}/contact`}>{t.contact}</Link>
    </div>{open && <div id="footer-diagnostic" className={s.panel}><AgentDiagnostic placement="site_footer" /></div>}
  </div></section>;
}
