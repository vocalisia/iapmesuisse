'use client';
import { useId, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { AGENT_OPTIONS, CHANNELS, normalizeWebsite, recommendAgent, validateDiagnosis, type Callback, type Diagnosis } from '@/lib/free-tools/agent-diagnostic';
import { submitCallback } from '@/lib/free-tools/callback-submit';
import { trackTool } from './tracking';
import s from './tools.module.css';
const initial: Diagnosis = { company: '', niche: '', website: '', goal: '' as Diagnosis['goal'], channels: [], volume: '' as Diagnosis['volume'], sensitive: 'unknown', needs: '', systems: '' };
export default function AgentDiagnostic({ placement = 'resources_fr' }: { placement?: 'resources_fr' | 'site_footer' }) {
  const uid = useId(), heading = useRef<HTMLHeadingElement>(null), busy = useRef(false);
  const [step, setStep] = useState(1), [data, setData] = useState<Diagnosis>(initial), [error, setError] = useState(''), [sending, setSending] = useState(false), [sent, setSent] = useState(false);
  const id = (name: string) => `${uid}-${name}`;
  const track = (event: Parameters<typeof trackTool>[0]) => trackTool(event, 'agent-sur-mesure', placement);
  function move(next: number) { setError(''); setStep(next); requestAnimationFrame(() => { heading.current?.focus({ preventScroll: true }); heading.current?.scrollIntoView({ block: 'nearest' }); }); }
  const get = (f: FormData, name: string) => String(f.get(name) ?? '').trim();
  function companyStep(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const f = new FormData(event.currentTarget);
    try {
      const company = get(f, 'company'), niche = get(f, 'niche');
      if (!company || !niche) throw new Error('Précisez le nom et l’activité de votre entreprise.');
      setData({ ...data, company, niche, website: normalizeWebsite(get(f, 'website')) }); track('diagnostic_start'); move(2);
    } catch (e) { setError(e instanceof Error ? e.message : 'Vérifiez vos informations.'); }
  }
  function needsStep(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const f = new FormData(event.currentTarget);
    try {
      const next = validateDiagnosis({ ...data, goal: get(f, 'goal') as Diagnosis['goal'], channels: f.getAll('channels') as Diagnosis['channels'], volume: get(f, 'volume') as Diagnosis['volume'], sensitive: get(f, 'sensitive') as Diagnosis['sensitive'], needs: get(f, 'needs'), systems: get(f, 'systems') });
      setData(next); track('diagnostic_result'); move(3);
    } catch (e) { setError(e instanceof Error ? e.message : 'Vérifiez vos besoins.'); }
  }
  async function requestCallback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busy.current) return;
    const f = new FormData(event.currentTarget);
    const callback: Callback = { name: get(f, 'name'), email: get(f, 'email'), phone: get(f, 'phone'), preferredTime: get(f, 'preferredTime'), consent: f.get('consent') === 'on', botcheck: f.get('botcheck') === 'on' };
    busy.current = true; setSending(true); setError('');
    try { track('callback_request'); await submitCallback(data, callback, window.location.pathname); setSent(true); track('callback_success'); requestAnimationFrame(() => heading.current?.focus()); }
    catch (e) { track('callback_error'); setError(e instanceof Error ? e.message : 'Envoi non confirmé.'); }
    finally { busy.current = false; setSending(false); }
  }
  const recommendation = step === 3 ? recommendAgent(data) : null;
  return <div data-agent-diagnostic className={s.diagnostic}>
    <ol className={s.steps} aria-label="Étapes du diagnostic">{['Votre entreprise', 'Vos besoins', 'Votre agent et le rappel'].map((label, i) => <li key={label} aria-current={step === i + 1 ? 'step' : undefined}><span aria-hidden="true">{i + 1}</span>{label}</li>)}</ol>
    <h4 tabIndex={-1} ref={heading}>{sent ? 'Votre demande a été transmise' : step === 1 ? 'Présentez votre entreprise' : step === 2 ? 'Quelle tâche souhaitez-vous confier à un agent ?' : 'Voici l’agent à étudier pour votre entreprise'}</h4>
    {sent ? <div role="status" className={s.result}><p>Votre demande de rappel et le récapitulatif du projet ont été acceptés par notre service de contact. L’équipe pourra examiner votre besoin pour concevoir votre agent sur mesure.</p><p className={s.note}>Aucun rendez-vous n’est réservé automatiquement. Nous conviendrons avec vous des prochaines étapes.</p><button type="button" className={s.secondary} onClick={() => { setData(initial); setSent(false); move(1); }}>Préparer une autre demande</button></div> : <>
      {step === 1 && <form onSubmit={companyStep} className={s.diagnosticForm}>
        <p className={s.help}>Identifiez un agent à partir de votre activité et de vos besoins. Vos coordonnées ne seront transmises que si vous demandez à être rappelé.</p>
        <div className={s.fields}>
          <label className={s.field} htmlFor={id('company')}>Nom de votre entreprise<input id={id('company')} name="company" autoComplete="organization" maxLength={120} required defaultValue={data.company} /></label>
          <label className={s.field} htmlFor={id('niche')}>Votre activité / niche<input id={id('niche')} name="niche" maxLength={180} required defaultValue={data.niche} placeholder="Ex. fiduciaire, garage, agence immobilière" /></label>
          <label className={`${s.field} ${s.full}`} htmlFor={id('website')}>Site web de l’entreprise (facultatif)<input id={id('website')} name="website" type="text" inputMode="url" autoComplete="url" maxLength={250} defaultValue={data.website} placeholder="votre-entreprise.ch" /><small>Sans site web, laissez ce champ vide. Cette adresse sera transmise avec votre demande ; aucun audit automatique du site n’est effectué.</small></label>
        </div><div className={s.actions}><button type="submit" className={s.primary}>Continuer vers mes besoins</button></div>
        {error && <p className={s.error} role="alert">{error}</p>}
      </form>}
      {step === 2 && <form onSubmit={needsStep} className={s.diagnosticForm} onChange={event => { const f = new FormData(event.currentTarget); setData({ ...data, goal: get(f, 'goal') as Diagnosis['goal'], channels: f.getAll('channels') as Diagnosis['channels'], volume: get(f, 'volume') as Diagnosis['volume'], sensitive: get(f, 'sensitive') as Diagnosis['sensitive'], needs: get(f, 'needs'), systems: get(f, 'systems') }); }}>
        <div className={s.fields}>
          <label className={`${s.field} ${s.full}`} htmlFor={id('goal')}>Votre besoin prioritaire<select name="goal" id={id('goal')} required defaultValue={data.goal}><option value="" disabled>Choisir une priorité</option>{Object.entries(AGENT_OPTIONS).map(([key, agent]) => <option key={key} value={key}>{agent.label}</option>)}</select></label>
          <label className={`${s.field} ${s.full}`} htmlFor={id('needs')}>Décrivez votre besoin et le résultat attendu<textarea name="needs" id={id('needs')} required maxLength={2500} rows={4} defaultValue={data.needs} /><small>Expliquez la tâche et les difficultés actuelles, sans données de clients ni informations confidentielles.</small></label>
          <fieldset className={`${s.question} ${s.full}`}><legend>Où l’agent devrait-il intervenir ? Au moins un choix.</legend><div className={s.options}>{Object.entries(CHANNELS).map(([key, label]) => <label className={s.option} key={key}><input type="checkbox" name="channels" value={key} defaultChecked={data.channels.includes(key as Diagnosis['channels'][number])} />{label}</label>)}</div></fieldset>
          <label className={s.field} htmlFor={id('volume')}>Volume de demandes ou tâches par semaine<select name="volume" id={id('volume')} required defaultValue={data.volume}><option value="" disabled>Choisir un volume</option><option value="low">Moins de 20</option><option value="medium">20 à 100</option><option value="high">Plus de 100</option></select></label>
          <label className={s.field} htmlFor={id('sensitive')}>Données sensibles ou confidentielles ?<select name="sensitive" id={id('sensitive')} defaultValue={data.sensitive}><option value="unknown">À déterminer</option><option value="yes">Oui</option><option value="no">Non</option></select></label>
          <label className={`${s.field} ${s.full}`} htmlFor={id('systems')}>Outils actuels à connecter (facultatif)<input name="systems" id={id('systems')} maxLength={500} defaultValue={data.systems} placeholder="Ex. messagerie, agenda, CRM, logiciel métier" /></label>
        </div><div className={s.actions}><button type="button" className={s.secondary} onClick={() => move(1)}>Retour à mon entreprise</button><button type="submit" className={s.primary}>Découvrir l’agent adapté</button></div>
        {error && <p className={s.error} role="alert">{error}</p>}
      </form>}
      {step === 3 && recommendation && <>
        <section className={s.result} aria-label="Agent recommandé"><h4>{recommendation.agent}</h4><p><strong>Pour {data.company}</strong></p><p>{recommendation.reason}</p><dl>
          {[['Sa mission', recommendation.job], ['Canaux envisagés', recommendation.channels.join(', ')], ['À préparer', recommendation.inputs], ['Contrôle humain', recommendation.control], ['Premier essai', recommendation.nextStep], ['Comment le mesurer', recommendation.metric]].map(([label, value]) => <div className={s.metric} key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl><p className={s.note}>{recommendation.limitation}</p></section>
        <form onSubmit={requestCallback} className={s.diagnosticForm} aria-label="Demander un rappel" aria-busy={sending}>
          <h4>Faisons le point sur votre agent sur mesure</h4><p className={s.help}>Demandez à être rappelé. Votre entreprise, votre niche, vos besoins et cette orientation seront joints à votre demande.</p>
          <fieldset disabled={sending} className={s.callbackFields}><legend className="sr-only">Vos coordonnées de rappel</legend><div className={s.fields}>
            <label className={s.field} htmlFor={id('name')}>Votre nom<input name="name" id={id('name')} autoComplete="name" required maxLength={120} /></label>
            <label className={s.field} htmlFor={id('phone')}>Numéro de téléphone<input name="phone" id={id('phone')} autoComplete="tel" type="tel" required maxLength={40} placeholder="+41…" /></label>
            <label className={s.field} htmlFor={id('email')}>Adresse email<input name="email" id={id('email')} autoComplete="email" type="email" required maxLength={254} /></label>
            <label className={s.field} htmlFor={id('preferredTime')}>Disponibilités pour le rappel (facultatif)<input name="preferredTime" id={id('preferredTime')} maxLength={150} placeholder="Ex. en semaine, entre 14 h et 17 h" /></label>
          </div><div className={s.honeypot} aria-hidden="true"><label>Ne pas cocher<input name="botcheck" type="checkbox" tabIndex={-1} /></label></div>
          <label className={s.consent}><input type="checkbox" name="consent" required />Je demande à IAPME Suisse de me contacter pour ce projet et j’accepte la transmission de mes coordonnées et du diagnostic à cette fin.</label>
          <p className={s.note}>Envoi via le service de formulaire déjà utilisé par IAPME. Aucun abonnement marketing. <Link href="/fr/politique-confidentialite">Politique de confidentialité</Link>.</p>
          <div className={s.actions}><button type="button" className={s.secondary} onClick={() => move(2)}>Modifier mes besoins</button><button type="submit" className={s.primary}>{sending ? 'Envoi en cours…' : 'Être rappelé pour créer mon agent IA'}</button></div></fieldset>
          {error && <p className={s.error} role="alert">{error} <Link href="/fr/contact">Ouvrir la page Contact</Link></p>}
        </form>
      </>}
    </>}
  </div>;
}
