'use client';
import { useState, type FormEvent } from 'react';
import { emailWorkload, pilotComparison, timeSavings, type PilotPeriod } from '@/lib/free-tools/calculators';
import { trackTool } from './tracking';
import s from './tools.module.css';
type Mode = 'gain-temps' | 'charge-emails' | 'essai-ia';
type Field = { name: string; label: string; value: number; help?: string; min?: number; max?: number; step?: number };
type Result = { total: number; heading: string; rows: [string, string][]; note: string };
const format = (n: number) => new Intl.NumberFormat('fr-CH', { maximumFractionDigits: 2 }).format(n);
const durationFields: Field[] = [
  { name: 'beforeMinutes', label: 'Durée actuelle par tâche (min)', value: 8, help: 'Temps de travail complet avant assistance.' },
  { name: 'assistedMinutes', label: 'Préparation avec assistance (min)', value: 3 },
  { name: 'reviewMinutes', label: 'Contrôle et corrections par tâche (min)', value: 2, help: 'Temps supplémentaire, non compris dans la préparation.' },
  { name: 'setupMinutes', label: 'Mise en place initiale (min)', value: 240 },
  { name: 'amortizationWeeks', label: 'Répartition de la mise en place (semaines)', value: 8, min: 1, step: 1 },
];
function NumericField({ field }: { field: Field }) {
  return <label className={s.field} htmlFor={field.name}>{field.label}
    <input id={field.name} name={field.name} type="number" inputMode="decimal" required min={field.min ?? 0} max={field.max} step={field.step ?? 'any'} defaultValue={field.value} aria-describedby={field.help ? `${field.name}-help` : undefined} />
    {field.help && <small id={`${field.name}-help`}>{field.help}</small>}
  </label>;
}
export default function Calculator({ mode }: { mode: Mode }) {
  const [output, setOutput] = useState<Result | null>(null);
  const [error, setError] = useState('');
  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError('');
    const data = new FormData(event.currentTarget);
    const n = (name: string) => {
      const value = data.get(name);
      if (typeof value !== 'string' || !value.trim()) throw new Error('Complétez tous les champs numériques.');
      const parsed = Number(value);
      if (!Number.isFinite(parsed)) throw new Error('Utilisez des nombres finis pour chaque champ.');
      return parsed;
    };
    try {
      if (mode === 'essai-ia') {
        const period = (prefix: string): PilotPeriod => ({ tasks: n(`${prefix}Tasks`), productionMinutes: n(`${prefix}Production`), reviewMinutes: n(`${prefix}Review`), correctionMinutes: n(`${prefix}Correction`), tasksWithErrors: n(`${prefix}Errors`) });
        const r = pilotComparison(period('before'), period('after'), n('setupMinutes'));
        setOutput({ total: r.netSavedHours, heading: 'Écart net sur le volume observé après l’essai', rows: [
          ['Temps complet avant, par tâche', `${format(r.before.minutesPerTask)} min`],
          ['Temps complet après, par tâche', `${format(r.after.minutesPerTask)} min`],
          ['Tâches avec erreur avant', `${format(r.before.errorRate * 100)} %`],
          ['Tâches avec erreur après', `${format(r.after.errorRate * 100)} %`],
          ['Mise en place comprise dans le bilan', `${format(n('setupMinutes'))} min`],
        ], note: `${r.limitation} Une valeur négative signifie davantage de temps consommé. Des erreurs plus nombreuses demandent un examen séparé du gain de vitesse.` });
      } else {
        const shared = { beforeMinutes: n('beforeMinutes'), assistedMinutes: n('assistedMinutes'), reviewMinutes: n('reviewMinutes'), setupMinutes: n('setupMinutes'), amortizationWeeks: n('amortizationWeeks') };
        const r = mode === 'gain-temps' ? timeSavings({ ...shared, weeklyTasks: n('weeklyTasks') }) : emailWorkload({ ...shared, emailsPerDay: n('emailsPerDay'), workDaysPerWeek: n('workDaysPerWeek'), repetitivePercent: n('repetitivePercent') });
        setOutput({ total: r.savedHours, heading: 'Temps net récupérable par semaine', rows: [
          ['Charge actuelle', `${format(r.baselineMinutes / 60)} h / semaine`],
          ['Charge du scénario, mise en place comprise', `${format(r.futureMinutes / 60)} h / semaine`],
          ['Mise en place répartie', `${format(r.allocatedSetupMinutes)} min / semaine`],
          ['Écart relatif', r.savedPercent === null ? 'Non calculable : référence nulle' : `${format(r.savedPercent)} %`],
        ], note: 'Estimation fondée sur vos saisies, pas un gain garanti. Une valeur négative signale du travail supplémentaire. Pour les emails, seuls les messages de la part répétitive utilisent la durée assistée.' });
      }
      trackTool('tool_complete', mode);
    } catch (failure) { setOutput(null); setError(failure instanceof Error ? failure.message : 'Vérifiez les données saisies.'); }
  }
  const fields: Field[] = mode === 'gain-temps' ? [{ name: 'weeklyTasks', label: 'Tâches pour toute l’équipe, par semaine', value: 60, help: 'Ne multipliez pas une seconde fois ce total par le nombre de collaborateurs.' }, ...durationFields] : [
    { name: 'emailsPerDay', label: 'Emails traités par jour', value: 40 },
    { name: 'workDaysPerWeek', label: 'Jours travaillés par semaine', value: 5, max: 7 },
    { name: 'repetitivePercent', label: 'Messages répétitifs concernés (%)', value: 25, max: 100 }, ...durationFields,
  ];
  return <>
    <p className={s.help}>Les valeurs de départ sont un exemple fictif. Remplacez-les par vos mesures. Toutes les durées sont en minutes ; les résultats restent calculés dans votre navigateur.</p>
    <form onSubmit={calculate} onInput={() => { setOutput(null); setError(''); }}>
      {mode !== 'essai-ia' ? <div className={s.fields}>{fields.map(field => <NumericField key={field.name} field={field} />)}</div> : <>
        {(['before', 'after'] as const).map(prefix => <fieldset key={prefix} className={s.group}>
          <legend>{prefix === 'before' ? 'Avant l’essai' : 'Après l’essai'}</legend>
          <div className={s.fields}>{[
            { name: `${prefix}Tasks`, label: 'Tâches observées', value: prefix === 'before' ? 20 : 40, min: 1, step: 1 },
            { name: `${prefix}Production`, label: 'Préparation totale (min)', value: 120 },
            { name: `${prefix}Review`, label: 'Relecture totale (min)', value: prefix === 'before' ? 20 : 40 },
            { name: `${prefix}Correction`, label: 'Corrections totales (min)', value: prefix === 'before' ? 20 : 40, help: 'Durée non déjà comptée dans la préparation ou la relecture.' },
            { name: `${prefix}Errors`, label: 'Tâches comportant au moins une erreur', value: prefix === 'before' ? 2 : 8, step: 1 },
          ].map(field => <NumericField key={field.name} field={field} />)}</div>
        </fieldset>)}
        <NumericField field={{ name: 'setupMinutes', label: 'Mise en place initiale à déduire du bilan (min)', value: 100 }} />
      </>}
      <div className={s.actions}><button className={s.primary} type="submit">Calculer mon résultat</button><button className={s.secondary} type="reset" onClick={() => { setOutput(null); setError(''); }}>Rétablir l’exemple</button></div>
      {error && <p className={s.error} role="alert">{error}</p>}
    </form>
    <div aria-live="polite" aria-atomic="true">{output && <section className={s.result} aria-label="Résultat du calcul">
      <h4>{output.heading}</h4><p className={`${s.total} ${output.total < 0 ? s.negative : ''}`}>{format(output.total)} h{mode === 'essai-ia' ? '' : ' / semaine'}</p>
      <dl>{output.rows.map(([label, value]) => <div className={s.metric} key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <p className={s.note}>{output.note}</p>
    </section>}</div>
  </>;
}