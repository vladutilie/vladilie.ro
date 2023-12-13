import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getPathname } from '@/navigation';

const texts = [
  'last-update',
  'welcome',
  ['cap1.title', 'cap1.p1'],
  ['cap2.title', 'cap2.p1', 'cap2.p2'],
  ['cap3.title', 'cap3.p1'],
  ['cap4.title', 'cap4.p1'],
  ['cap5.title', 'cap5.p1'],
  ['cap6.title', 'cap6.p1'],
  ['cap7.title', 'cap7.p1'],
  ['cap8.title', 'cap8.p1', 'cap8.p2']
];

export async function generateMetadata({ params: { locale } }: { params: { locale: 'en' | 'ro' } }): Promise<Metadata> {
  const t = await getTranslations('terms');
  const commonFields = { title: t('title'), description: `${t('metadata.description')} ${t('last-update')}` };

  return {
    alternates: { canonical: ('ro' === locale ? '/ro/' : '') + getPathname({ locale, href: '/terms' }) },
    ...commonFields,
    keywords: t('metadata.keywords'),
    openGraph: {
      ...commonFields,
      url: getPathname({ href: '/terms', locale }),
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      images: [{ url: '/images/social-card.png', width: 1200, height: 630 }],
      locale,
      type: 'website'
    },
    twitter: {
      ...commonFields,
      card: 'summary_large_image',
      creator: '@vladilie94',
      creatorId: '66733656',
      images: ['/images/social-card.png']
    }
  };
}

export default async function Terms() {
  const t = await getTranslations('terms');

  return (
    <main className='container mx-auto max-w-7xl gap-8 px-4 py-32'>
      <h1>{t('title')}</h1>

      {texts.map((item) => {
        if (Array.isArray(item)) {
          return item.map((text) => {
            if (text.includes('title')) {
              return (
                <h2 key={text} className='text-2xl'>
                  {t(text)}
                </h2>
              );
            }

            return <p key={text}>{t(text)}</p>;
          });
        }

        return <p key={item[0]}>{t(item)}</p>;
      })}
    </main>
  );
}
