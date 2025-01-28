import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getPathname } from '@/i18n/routing';
const environment = [
  ['environment.desk.name', 'environment.desk.description'],
  ['environment.chair.name', 'environment.chair.description'],
  ['environment.laptop-stand.name', 'environment.laptop-stand.description'],
  ['environment.monitors-support.name', 'environment.monitors-support.description'],
  ['environment.mousepad.name', 'environment.mousepad.description'],
  'environment.lamp'
];

const hardware = [
  ['hardware.macbook.name', 'hardware.macbook.description'],
  ['hardware.monitors.name', 'hardware.monitors.description'],
  'hardware.mouse',
  'hardware.keyboard',
  'hardware.mic'
];

const software = [
  ['software.vscode.name', 'software.vscode.description'],
  'software.postman',
  ['software.chrome.name', 'software.chrome.description'],
  'software.neo4j',
  'software.signal',
  'software.slack'
];

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'ro' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('uses');
  const commonFields = { title: t('title'), description: t('description') };

  return {
    alternates: { canonical: ('ro' === locale ? '/ro/' : '') + getPathname({ locale, href: '/uses' }) },
    ...commonFields,
    keywords: t('metadata.keywords'),
    openGraph: {
      ...commonFields,
      url: getPathname({ href: '/uses', locale }),
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

export default async function Uses() {
  const t = await getTranslations('uses');

  return (
    <main className='container mx-auto max-w-7xl gap-8 px-4 py-32'>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>

      <h2 className='mt-8 text-3xl'>{t('environment.title')}</h2>
      <ul className='list-inside list-disc space-y-2'>
        {environment.map((item) => {
          if (Array.isArray(item)) {
            return (
              <li key={item[0]}>
                <p className='inline'>{t(item[0])}</p>
                <span className='block text-sm text-gray-500'>{t(item[1])}</span>
              </li>
            );
          }

          return (
            <li key={item} className='text-gray-600 dark:text-gray-300'>
              {t(item)}
            </li>
          );
        })}
      </ul>

      <h2 className='mt-8 text-3xl'>{t('hardware.title')}</h2>
      <ul className='list-inside list-disc space-y-2'>
        {hardware.map((item) => {
          if (Array.isArray(item)) {
            return (
              <li key={item[0]}>
                <p className='inline'>{t(item[0])}</p>
                <span className='block text-sm text-gray-500'>{t(item[1])}</span>
              </li>
            );
          }

          return (
            <li key={item} className='text-gray-600 dark:text-gray-300'>
              {t(item)}
            </li>
          );
        })}
      </ul>

      <h2 className='mt-8 text-3xl'>{t('software.title')}</h2>
      <ul className='list-inside list-disc space-y-2'>
        {software.map((item) => {
          if (Array.isArray(item)) {
            return (
              <li key={item[0]}>
                <p className='inline'>{t(item[0])}</p>
                <span className='block text-sm text-gray-500'>{t(item[1])}</span>
              </li>
            );
          }

          return (
            <li key={item} className='text-gray-600 dark:text-gray-300'>
              {t(item)}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
