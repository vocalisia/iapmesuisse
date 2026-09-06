'use client';
import { useRef, useState, type FormEvent } from 'react';
import { buildPrompt, CHARTER_KIT, PROMPT_CATALOG, SECTORS, type PromptRequest } from '@/lib/free-tools/prompts';
import { FIELD_LABELS, SECTOR_LABELS } from './labels';
import { trackTool } from './tracking';
import s from './tools.module.css';
export default function PromptComposer({ templateId, toolId }: { templateId?: string; toolId: string }) {
  const [selected, setSelected] = useState(templateId ?? PROMPT_CATALOG[0].id);
  const template = [...PROMPT_CATALOG, CHARTER_KIT].find(item => item.id === selected)!;
  return <>
    {!templateId && <label className={s.field} htmlFor="prompt-task">Votre tâche parmi les 20 modèles
      <select id="prompt-task" value={selected} onChange={event => setSelected(event.target.value)}>{PROMPT_CATALOG.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select>
    </label>}
    <PromptForm key={selected} templateId={selected} toolId={toolId} />
    <details className={s.note}><summary>Points à vérifier avant utilisation</summary><ul className={s.checklist}>{template.reviewChecklist.map(item => <li key={item}>{item}</li>)}</ul></details>
  </>;
}
function PromptForm({ templateId, toolId }: { templateId: string; toolId: string }) {
  const template = [...PROMPT_CATALOG, CHARTER_KIT].find(item => item.id === templateId)!;
  const [output, setOutput] = useState(''), [error, setError] = useState(''), [copyStatus, setCopyStatus] = useState('');
  const outputRef = useRef<HTMLTextAreaElement>(null);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    try {
      const request: PromptRequest = {
        templateId, sector: String(data.get('sector')) as keyof typeof SECTORS,
        tone: String(data.get('tone')) as PromptRequest['tone'], language: String(data.get('language')) as PromptRequest['language'],
        fields: Object.fromEntries(template.fields.map(name => [name, String(data.get(name) ?? '')])),
      };
      const result = buildPrompt(request); setOutput(result.text); setError(''); setCopyStatus(''); trackTool('tool_complete', toolId);
    } catch (failure) {
      let message = failure instanceof Error ? failure.message : 'Vérifiez les champs saisis.';
      for (const [key, label] of Object.entries(FIELD_LABELS)) message = message.replaceAll(key, label);
      setError(message); setOutput('');
    }
  }
  async function copy() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(output); setCopyStatus('Prompt copié. Vous pouvez le coller dans votre outil habituel.'); trackTool('tool_copy', toolId);
    } catch {
      outputRef.current?.focus(); outputRef.current?.select(); setCopyStatus('Copie automatique indisponible. Le texte est sélectionné : utilisez Copier dans le menu de votre appareil ou Ctrl+C / Cmd+C.');
    }
  }
  function download() {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' }); const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = `iapmesuisse-${template.id}.txt`; anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <>
    <p className={s.help}>{template.purpose} Renseignez uniquement les faits utiles, anonymisés lorsque possible. Tous les champs sont requis ; indiquez « à confirmer » pour une information inconnue.</p>
    {template.id === 'charte-ia' && <p className={s.note}>Ce kit prépare un brouillon à faire valider. Consultez aussi le <a href="https://www.ge.ch/document/modele-charte-intelligence-artificielle-destination-entreprises" className="underline">modèle officiel du canton de Genève</a>. Il ne constitue pas une certification ni un avis juridique.</p>}
    <form onSubmit={prepare} onChange={() => { setOutput(''); setError(''); setCopyStatus(''); }}>
      <div className={s.fields}>
        <label className={s.field} htmlFor="prompt-sector">Votre métier<select name="sector" id="prompt-sector" defaultValue="services">{Object.keys(SECTORS).map(key => <option key={key} value={key}>{SECTOR_LABELS[key]}</option>)}</select></label>
        <label className={s.field} htmlFor="prompt-tone">Ton souhaité<select name="tone" id="prompt-tone" defaultValue="courtois"><option value="courtois">Courtois</option><option value="direct">Direct</option><option value="formel">Formel</option></select></label>
        <label className={`${s.field} ${s.full}`} htmlFor="prompt-language">Langue du résultat à demander<select name="language" id="prompt-language" defaultValue={template.id === 'email-allemand' ? 'de-CH' : 'fr'}>
          {template.id !== 'email-allemand' && <option value="fr">Français</option>}<option value="de-CH">Allemand standard suisse</option>{template.id !== 'email-allemand' && <><option value="it">Italien</option><option value="en">Anglais</option></>}
        </select><small>Le prompt reste rédigé en français. La réponse future dans la langue choisie devra être relue.</small></label>
        {template.fields.map(name => <label className={`${s.field} ${s.full}`} key={name} htmlFor={`prompt-${name}`}>{FIELD_LABELS[name] ?? name}
          <textarea name={name} id={`prompt-${name}`} required maxLength={6000} rows={3} aria-describedby="prompt-limits" />
        </label>)}
      </div>
      <p className={s.note} id="prompt-limits">6 000 caractères maximum par champ, 20 000 au total. Aucune donnée de formulaire n’est envoyée à un service IA. Vérifiez ensuite les règles de l’outil dans lequel vous collerez le prompt.</p>
      <div className={s.actions}><button className={s.primary} type="submit">Préparer mon prompt</button><button className={s.secondary} type="reset" onClick={() => { setOutput(''); setError(''); setCopyStatus(''); }}>Vider les champs</button></div>
      {error && <p className={s.error} role="alert">{error}</p>}
    </form>
    <p role="status" className={s.note}>{output ? 'Votre prompt est prêt à copier. Aucune réponse IA n’a été générée.' : ''}</p>
    {output && <section className={s.result} aria-label="Prompt préparé"><h4>Votre prompt personnalisé</h4><label htmlFor="prepared-prompt">Texte à copier dans votre outil habituel</label>
      <textarea className={s.output} id="prepared-prompt" ref={outputRef} value={output} readOnly spellCheck={false} />
      <div className={s.actions}><button type="button" className={s.primary} onClick={copy}>Copier le prompt</button><button type="button" className={s.secondary} onClick={download}>Télécharger le texte</button></div>
      <p className={s.note} role="status">{copyStatus}</p>
    </section>}
  </>;
}