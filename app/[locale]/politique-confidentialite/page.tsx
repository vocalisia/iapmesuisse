import { getTranslations } from 'next-intl/server';
import Breadcrumbs from '@/components/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal.privacy' });
  return { title: t('meta_title'), description: t('meta_description') };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal.privacy' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const sections = [
    { title: t('responsible_title'), text: t('responsible_text') },
    { title: t('data_collected_title'), text: t('data_collected_text') },
    { title: t('purpose_title'), text: t('purpose_text') },
    { title: t('retention_title'), text: t('retention_text') },
    { title: t('rights_title'), text: t('rights_text') },
    { title: t('cookies_title'), text: t('cookies_text') },
    { title: t('transfer_title'), text: t('transfer_text') },
    { title: t('update_title'), text: t('update_text') },
  ];

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: tNav('home'), href: '/' }, { label: t('title') }]} />
      </div>
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-3xl font-bold text-[#1B2A4A] sm:text-4xl">{t('title')}</h1>
          <p className="mb-10 text-lg leading-relaxed text-gray-600">{t('intro')}</p>
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
