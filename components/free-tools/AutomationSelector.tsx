'use client';
import { useState, type FormEvent } from 'react';
import { automationTriage, type AutomationInputs } from '@/lib/free-tools/calculators';
import { trackTool } from './tracking';
import s from './tools.module.css';
const questions: [keyof AutomationInputs, string][] = [
  ['repetitive', 'La tâche se répète-t-elle régulièrement ?'],
  ['clearRules', 'Les règles de traitement sont-elles explicites ?'],
  ['stableInputs', 'Les informations d’entrée sont-elles suffisamment stables ?'],
  ['languageTask', 'Le travail consiste-t-il surtout à préparer ou reformuler du texte ?'],
  ['frequentExceptions', 'Rencontrez-vous souvent des exceptions ?'],
  ['sensitiveData', 'La tâche manipule-t-elle des données sensibles ou confidentielles ?'],
  ['consequentialDecision', 'Une erreur de décision aurait-elle des conséquences importantes ?'],
];
export default function AutomationSelector() {
  const [output, setOutput] = useState<ReturnType<typeof automationTriage> | null>(null);
  const [error, setError] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    try {
      const entries = questions.map(([key]) => {
        const value = data.get(key);
        if (value !== 'yes' && value !== 'no') throw new Error('Répondez à chaque question.');
        return [key, value === 'yes'];
      });
      setOutput(automationTriage(Object.fromEntries(entries) as AutomationInputs)); setError(''); trackTool('tool_complete', 'choisir-automatisation');
    } catch (failure) { setError(failure instanceof Error ? failure.message : 'Vérifiez vos réponses.'); }
  }
  return <><p className={s.help}>Sept questions pour distinguer automatisation classique, assistance et décision humaine. Ce tri explique ses règles ; il ne certifie ni une conformité ni un gain.</p>
    <form onSubmit={submit} onChange={() => { setOutput(null); setError(''); }}>{questions.map(([key, label]) => <fieldset className={s.question} key={key}><legend>{label}</legend><div className={s.options}>{[['yes', 'Oui'], ['no', 'Non']].map(([value, text]) => <label className={s.option} key={value}><input type="radio" name={key} value={value} required />{text}</label>)}</div></fieldset>)}
      <button type="submit" className={s.primary}>Examiner cette tâche</button>{error && <p role="alert" className={s.error}>{error}</p>}
    </form><div aria-live="polite">{output && <section className={s.result} aria-label="Orientation de la tâche"><h4>{{ automate: 'Tester une automatisation classique', assist: 'Préparer avec assistance et faire relire', human: 'Conserver une validation humaine' }[output.decision]}</h4><p>{output.reason}</p><p className={s.note}>L’orientation décrit uniquement les réponses renseignées. Faites examiner le processus réel et ses exceptions avant toute mise en place.</p></section>}</div>
  </>;
}