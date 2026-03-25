import { getTranslations } from 'next-intl/server';
import Breadcrumbs from '@/components/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal.mentions' });
  return { title: t('meta_title'), description: t('meta_description') };
}

export default async function MentionsLegalesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal.mentions' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const sections = [
    { title: t('editor_title'), text: t('editor_text') },
    { title: t('hosting_title'), text: t('hosting_text') },
    { title: t('intellectual_title'), text: t('intellectual_text') },
    { title: t('liability_title'), text: t('liability_text') },
    { title: t('law_title'), text: t('law_text') },
  ];

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: tNav('home'), href: '/' }, { label: t('title') }]} />
      </div>
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-10 text-3xl font-bold text-[#1B2A4A] sm:text-4xl">{t('title')}</h1>
          {sections.map((s, i) => (
            <div key={i} className="mb-8">
              <h2 className="mb-3 text-xl font-bold text-[#1B2A4A]">{s.title}</h2>
              <p className="whitespace-pre-line text-gray-600 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
