import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getPathname } from '@/i18n/routing';
import { GroupHeading, Page, PageHeader } from '../ui/page-header';
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

export default async function Uses({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('uses');

  return (
    <Page>
      <PageHeader title={t('title')} lead={t('description')} />

      <div className='grid gap-14'>
        {(
          [
            ['environment', environment],
            ['hardware', hardware],
            ['software', software]
          ] as const
        ).map(([key, items]) => (
          <section key={key}>
            <GroupHeading>{t(`${key}.title`)}</GroupHeading>

            <ul className='border-hairline bg-hairline grid gap-px border-y'>
              {items.map((item) => (
                <li key={Array.isArray(item) ? item[0] : item} className='bg-surface px-4 py-4 sm:px-6'>
                  <p className='text-content my-0 font-medium'>{t(Array.isArray(item) ? item[0] : item)}</p>
                  {Array.isArray(item) ? (
                    <span className='text-content/60 mt-1 block text-sm'>{t(item[1])}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Page>
  );
}
