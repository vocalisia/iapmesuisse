'use client';
import { useEffect, useState } from 'react';
import Calculator from './Calculator';
import AgentDiagnostic from './AgentDiagnostic';
import AutomationSelector from './AutomationSelector';
import PromptComposer from './PromptComposer';
import { trackTool } from './tracking';
import Link from 'next/link';
import s from './tools.module.css';
import ToolIcon from './ToolIcon';
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
  { id: 'agent-sur-mesure', title: 'Quel agent IA pour mon entreprise ?', short: 'Mon agent IA sur mesure', kind: 'diagnostic' },
] as const;
type ToolId = typeof tools[number]['id'];
export default function FreeToolsWorkbench() {
  const [active, setActive] = useState<ToolId>('gain-temps');
  const [catalogOpen, setCatalogOpen] = useState(false);
  useEffect(() => {
    const sync = () => { const selected = tools.find(tool => `#${tool.id}` === window.location.hash); if (selected) { setActive(selected.id); requestAnimationFrame(() => document.getElementById('active-tool')?.scrollIntoView({ block: 'start' })); } };
    sync(); window.addEventListener('hashchange', sync); return () => window.removeEventListener('hashchange', sync);
  }, []);
  const tool = tools.find(item => item.id === active)!;
  return <section className={s.workbench} aria-labelledby="tools-heading"><div className={s.container}>
    <div className={s.intro}><div><p className={s.eyebrow}>La boîte à outils du dirigeant</p><h2 id="tools-heading">Un besoin précis. Un point de départ utile.</h2><p>Calculez votre charge de travail ou préparez un prompt pour votre prochaine tâche. Gratuit, sans compte et sans envoi de vos saisies à un service IA.</p></div><a className={s.secondary} href="#guide-ressources">Comprendre la méthode</a></div>
    <div className={s.layout}>
      <aside className={s.catalog}>
        <div className={s.catalogHeading}><span>Votre espace de travail</span><span className={s.count}>13 outils</span></div>
        <button type="button" className={s.catalogToggle} aria-expanded={catalogOpen} aria-controls="tool-catalog" onClick={() => setCatalogOpen(!catalogOpen)}><ToolIcon kind={tool.kind} /><span>{tool.short}</span><span aria-hidden="true">{catalogOpen ? '−' : '+'}</span></button>
        <nav id="tool-catalog" className={s.navigation} data-open={catalogOpen} aria-label="Choisir un outil">
          {([{ kind: 'diagnostic', label: 'Votre projet IA' }, { kind: 'calculator', label: 'Mesurer et décider' }, { kind: 'triage', label: 'Choisir la bonne tâche' }, { kind: 'prompt', label: 'Préparer votre travail' }] as const).map(group => <div className={s.navGroup} key={group.kind}><p>{group.label}</p>{tools.filter(item => item.kind === group.kind).map(item => <a key={item.id} id={item.id} className={s.toolLink} href={`#${item.id}`} aria-current={active === item.id ? 'true' : undefined} aria-controls="active-tool" onClick={() => { setActive(item.id); setCatalogOpen(false); trackTool('tool_select', item.id); requestAnimationFrame(() => { if (window.matchMedia('(max-width: 800px)').matches) { const panel = document.getElementById('active-tool'); panel?.focus({ preventScroll: true }); panel?.scrollIntoView({ block: 'start' }); } }); }}><ToolIcon kind={item.kind} /><span>{item.short}</span><span className={s.navArrow} aria-hidden="true">↗</span></a>)}</div>)}
        </nav>
        <p className={s.catalogNote}>Sans compte.<br />À votre rythme.</p>
      </aside>
      <div className={s.panel} id="active-tool" tabIndex={-1}>
        <div className={s.panelContent} key={tool.id}>
          <div className={s.panelTop}><span className={s.toolBadge}><ToolIcon kind={tool.kind} />{tool.kind === 'diagnostic' ? 'Votre agent sur mesure' : tool.kind === 'calculator' ? 'Calculateur interactif' : tool.kind === 'triage' ? 'Aide à la décision' : 'Assistant de rédaction'}</span><span className={s.freeBadge}><span aria-hidden="true" />Accès gratuit</span></div>
          <h3>{tool.title}</h3>
          {tool.kind === 'diagnostic' ? <AgentDiagnostic /> : tool.kind === 'calculator' ? <Calculator key={tool.id} mode={tool.id} /> : tool.kind === 'triage' ? <AutomationSelector /> : <PromptComposer key={tool.id} templateId={'template' in tool ? tool.template : undefined} toolId={tool.id} />}
          <div className={s.panelConversion}><p>Et si nous allions plus loin ensemble ?</p><div className={s.actions}>{tool.kind !== 'diagnostic' && <a className={s.primary} href="#agent-sur-mesure">Trouver mon agent IA et demander un rappel</a>}<Link className={s.secondary} href="/fr/contact" onClick={() => trackTool('tool_audit', tool.id)}>Examiner mon cas lors d’un audit gratuit</Link></div></div>
        </div>
      </div>
    </div>
    <p className={s.footer}>Les saisies restent dans cette page jusqu’à sa fermeture ou au changement d’outil. Le diagnostic d’agent transmet vos informations uniquement lorsque vous demandez explicitement un rappel. Les calculateurs produisent des estimations ; les assistants préparent des prompts à copier et à faire relire. Si vous acceptez les cookies analytics, seuls le choix de l’outil et les actions réalisées sont mesurés, jamais le contenu de vos champs.</p>
    <noscript><p>Activez JavaScript pour utiliser les formulaires. Le guide, les exemples de calcul et les ressources ci-dessous restent accessibles sans JavaScript.</p></noscript>
  </div></section>;
}