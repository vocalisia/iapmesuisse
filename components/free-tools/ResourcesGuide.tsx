import fs from 'node:fs/promises';
import path from 'node:path';
import Image from 'next/image';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';
import s from './tools.module.css';
export default async function ResourcesGuide() {
  const source = await fs.readFile(path.join(process.cwd(), 'content/resources/ressources-ia-fr.md'), 'utf8');
  const body = (await remark().use(html, { sanitize: true }).process(source)).toString();
  return <section className={s.guide} id="guide-ressources" aria-labelledby="guide-title">
    <h2 id="guide-title">Utiliser ces ressources dans votre PME</h2>
    <figure><Image src="/images/iapmesuisse-workflow-verre-20260906.png" alt="Composition de verre et de métal illustrant des tâches reliées dans un processus de travail." width={1536} height={1024} sizes="(max-width: 850px) 100vw, 800px" /><figcaption>Illustration dédiée aux ressources pratiques d’IAPME Suisse.</figcaption></figure>
    <div data-editorial-content dangerouslySetInnerHTML={{ __html: body }} />
    <aside className={s.related} aria-label="Approfondir votre projet"><h2>Pour aller plus loin</h2><ul>
      <li><Link href="/fr/blog/roi-intelligence-artificielle-pme-suisse">Comprendre la méthode de calcul du ROI de l’IA</Link></li>
      <li><Link href="/fr/blog/automatisation-processus-ia-pme-checklist">Cadrer un processus avant son automatisation</Link></li>
      <li><Link href="/fr/outils-ia">Consulter la sélection de logiciels IA</Link></li>
      <li><Link href="/fr/quiz/maturite-ia">Faire le point avec le quiz de maturité IA</Link></li>
    </ul></aside>
  </section>;
}