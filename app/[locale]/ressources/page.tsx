import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getAlternates } from '@/lib/metadata';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQ from '@/components/FAQ';
import FreeToolsWorkbench from '@/components/free-tools/FreeToolsWorkbench';
import ResourcesGuide from '@/components/free-tools/ResourcesGuide';
import Image from 'next/image';
import styles from '@/components/free-tools/tools.module.css';
import { getBlogPosts } from '@/lib/markdown';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.resources' });
  return {
    title: locale === 'fr' ? { absolute: 'Ressources IA gratuites pour PME suisses' } : t('title'),
    description: locale === 'fr' ? 'Calculez le temps gagné, préparez vos relances et personnalisez 20 prompts métier. Des ressources gratuites pour les dirigeants de PME suisses.' : t('description'),
    alternates: getAlternates(locale, '/ressources'),
  };
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'resources' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const guides = t.raw('guides') as {
    title: string;
    description: string;
  }[];

  const links = t.raw('links') as {
    title: string;
    url: string;
    description: string;
  }[];

  const faqItems = t.raw('faq') as {
    question: string;
    answer: string;
  }[];

  const resourceArticles = locale === 'fr' ? getBlogPosts('fr').filter((post) => [
    'outils-ia-gratuits-pme-suisse-top-15-2026',
    'agent-ia-vente-prospection-suisse',
    'ia-fiduciaire-comptable-suisse-guide-2026',
    'automatisation-emails-ia-pme-suisse-guide-2026',
  ].includes(post.slug)) : [];

  return (
    <>
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: tNav('home'), href: '/' },
            { label: tNav('resources') },
          ]}
        />
      </div>

      {/* Header */}
      {locale === 'fr' ? <section className={styles.resourceHero}>
        <div className={styles.heroCopy}><p className={styles.eyebrow}>IAPME Suisse · Ressources gratuites</p><h1>Ressources IA gratuites pour PME suisses</h1><p>Moins de tâches répétitives.<br />Plus de place pour votre entreprise.</p><div className={styles.actions}><a href="#agent-sur-mesure" className={styles.primary}>Trouver mon agent IA <span aria-hidden="true">↗</span></a><a href="#tools-heading" className={styles.secondary}>Explorer les 13 outils</a></div><div className={styles.heroDetails}><span>Calculateurs</span><span>Prompts métier</span><span>Diagnostic IA</span></div></div>
        <div className={styles.heroVisual}><Image src="/images/iapmesuisse-workflow-verre-20260906.png" alt="Composition contemporaine de verre et de métal évoquant un processus de travail connecté." width={1536} height={1024} sizes="(max-width: 800px) 100vw, 50vw" priority /><div className={styles.heroCaption}><span aria-hidden="true">↗</span><div>Un premier pas concret.<small>Vos idées, prêtes à prendre forme.</small></div></div></div>
      </section> : <section className="bg-white px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#1B2A4A] sm:text-5xl">
            {locale === 'fr' ? 'Ressources IA gratuites pour PME suisses' : t('title')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
            {locale === 'fr' ? 'Des calculateurs et des prompts pour préparer vos tâches, mesurer vos essais et décider de la prochaine étape.' : t('subtitle')}
          </p>
        </div>
      </section>}

      {locale === 'fr' && <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Ressources IA gratuites pour PME suisses', url: 'https://iapmesuisse.ch/fr/ressources', inLanguage: 'fr-CH', isAccessibleForFree: true, image: 'https://iapmesuisse.ch/images/iapmesuisse-workflow-verre-20260906.png' }).replace(/</g, '\u003c') }} />
        <FreeToolsWorkbench />
        <ResourcesGuide />
        <section className="bg-white px-4 pb-16 sm:px-6 lg:px-8" aria-labelledby="resources-articles-title" data-resource-cocoon>
          <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-9">
            <div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-wide text-accent">Continuer selon votre besoin</p><h2 id="resources-articles-title" className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-3xl">Des guides pour passer de l’idée à une première action</h2><p className="mt-3 leading-relaxed text-slate-600">Après le diagnostic ou un outil, retrouvez le guide qui correspond à votre contexte. Chaque lecture garde un lien vers les ressources et la prise de contact.</p></div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {resourceArticles.map((post) => <Link key={post.slug} href={`/blog/${post.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md"><p className="text-sm font-semibold text-primary group-hover:text-accent">{post.title}</p><p className="mt-2 text-sm leading-relaxed text-slate-600">{post.excerpt}</p><span className="mt-4 inline-flex text-sm font-semibold text-accent">Lire le guide <span aria-hidden="true" className="ml-1">→</span></span></Link>)}
            </div>
          </div>
        </section>
      </>}

      {/* Guides Section */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-[#1B2A4A] sm:text-4xl">
            {t('guides_title')}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide, index) => {
              const href = index === 1 ? '/ressources/checklist-nlpd-ai-act' : '/contact';
              return (
              <div
                key={index}
                className="flex flex-col rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 text-3xl">
                  <svg
                    className="h-7 w-7 text-[#1B2A4A]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#1B2A4A]">
                  {guide.title}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600">
                  {guide.description}
                </p>
                <Link
                  href={href}
                  className="inline-flex items-center rounded-lg bg-[#1B2A4A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#FF0000]"
                >
                  {t('download')}
                </Link>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* Useful Links Section */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-[#1B2A4A] sm:text-4xl">
            {t('links_title')}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 text-3xl">
                  <svg
                    className="h-7 w-7 text-[#1B2A4A] transition-colors group-hover:text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#1B2A4A] transition-colors group-hover:text-accent">
                  {link.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-gray-600">
                  {link.description}
                </p>
                <span className="mt-4 text-sm font-medium text-accent">
                  {link.url.replace('https://', '')}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-[#1B2A4A] sm:text-4xl">
            {t('faq_title')}
          </h2>
          <FAQ items={faqItems} />
        </div>
      </section>
    </>
  );
}
