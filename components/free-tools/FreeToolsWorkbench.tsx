'use client';
import { useEffect, useState } from 'react';
import Calculator from './Calculator';
import AutomationSelector from './AutomationSelector';
import PromptComposer from './PromptComposer';
import { trackTool } from './tracking';
import Link from 'next/link';
import s from './tools.module.css';
const tools = [
  { id: 'gain-temps', title: 'Calculer le temps gagné', short: 'Temps gagné', kind: 'calculator' },
  { id: 'prompts-metier', title: '20 prompts adaptés à votre métier', short: '20 prompts métier', kind: 'prompt' },
  { id: 'relance-devis', title: 'Préparer une relance de devis', short: 'Relance de devis', kind: 'prompt', template: 'relance-devis' },
  { id: 'choisir-automatisation', title: 'Quelle tâche automatiser ?', short: 'Choisir une tâche', kind: 'triage' },
  { id: 'charge-emails', title: 'Mesurer la charge des emails', short: 'Charge des emails', kind: 'calculator' },
  { id: 'reunion', title: 'Préparer une réunion utile', short: 'Réunion de direction', kind: 'prompt', template: 'reunion' },
  { id: 'procedure', title: 'Préparer une procédure interne', short: 'Procédure interne', kind: 'prompt', template: 'procedure' },
  { id: 'avis-client', title: 'Préparer une réponse à un avis', short: 'Réponse aux avis', kind: 'prompt', template: 'avis-client' },
  { id: 'faq', title: 'Construire votre FAQ métier', short: 'FAQ métier', kind: 'prompt', template: 'faq' },
  { id: 'essai-ia', title: 'Évaluer un essai IA', short: 'Bilan avant / après', kind: 'calculator' },
  { id: 'charte-ia', title: 'Préparer une charte IA', short: 'Kit de charte IA', kind: 'prompt', template: 'charte-ia' },
  { id: 'brief-automatisation', title: 'Préparer un brief d’automatisation', short: 'Brief d’automatisation', kind: 'prompt', template: 'brief-automatisation' },
] as const;
type ToolId = typeof tools[number]['id'];
export default function FreeToolsWorkbench() {
  const [active, setActive] = useState<ToolId>('gain-temps');
  useEffect(() => {
    const sync = () => { const selected = tools.find(tool => `#${tool.id}` === window.location.hash); if (selected) setActive(selected.id); };
    sync(); window.addEventListener('hashchange', sync); return () => window.removeEventListener('hashchange', sync);
  }, []);
  const tool = tools.find(item => item.id === active)!;
  return <section className={s.workbench} aria-labelledby="tools-heading"><div className={s.container}>
    <div className={s.intro}><div><p className={s.eyebrow}>La boîte à outils du dirigeant</p><h2 id="tools-heading">Un besoin précis. Un point de départ utile.</h2><p>Calculez votre charge de travail ou préparez un prompt pour votre prochaine tâche. Gratuit, sans compte et sans envoi de vos saisies à un service IA.</p></div><a className={s.secondary} href="#guide-ressources">Comprendre la méthode</a></div>
    <div className={s.layout}><nav className={s.navigation} aria-label="Choisir un outil">{tools.map((item, i) => <a key={item.id} id={item.id} className={s.toolLink} href={`#${item.id}`} aria-current={active === item.id ? 'true' : undefined} aria-controls="active-tool" onClick={() => { setActive(item.id); trackTool('tool_select', item.id); }}><span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>{item.short}</a>)}</nav>
      <div className={s.panel} id="active-tool"><h3>{tool.title}</h3>
        {tool.kind === 'calculator' ? <Calculator key={tool.id} mode={tool.id} /> : tool.kind === 'triage' ? <AutomationSelector /> : <PromptComposer key={tool.id} templateId={'template' in tool ? tool.template : undefined} toolId={tool.id} />}
        <div className={s.actions}><Link className={s.secondary} href="/fr/contact" onClick={() => trackTool('tool_audit', tool.id)}>Examiner mon cas lors d’un audit gratuit</Link></div>
      </div>
    </div>
    <p className={s.footer}>Les saisies restent dans cette page et sont effacées en changeant d’outil ou en la quittant. Les calculateurs produisent des estimations ; les assistants préparent des prompts à copier et à faire relire. Si vous acceptez les cookies analytics, seuls le choix de l’outil et les actions réalisées sont mesurés, jamais le contenu de vos champs.</p>
    <noscript><p>Activez JavaScript pour utiliser les formulaires. Le guide, les exemples de calcul et les ressources ci-dessous restent accessibles sans JavaScript.</p></noscript>
  </div></section>;
}