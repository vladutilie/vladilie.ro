import { ReactNode, JSX } from 'react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { format, register } from 'timeago.js';
import roFunc from 'timeago.js/lib/lang/ro';
import enFunc from 'timeago.js/lib/lang/en_US';

import { getPathname } from '@/i18n/routing';
import { everyLocale, localeAlternates } from '@/lib/alternates';
import prisma from '@/lib/prisma';
import { Page, PageHeader } from '../ui/page-header';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'ro' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('locations');

  const commonFields = { title: t('title'), description: t('description') };

  return {
    alternates: localeAlternates(locale, everyLocale('/locations')),
    ...commonFields,
    keywords: t('metadata.keywords'),
    openGraph: {
      ...commonFields,
      url: getPathname({ href: '/locations', locale }),
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

const getLocations = async () => await prisma.location.findMany({ orderBy: { lastVisitAt: 'desc' } });

export default async function Locations({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('locations');

  const locations = await getLocations();

  if ('ro' === locale) {
    register('ro', roFunc);
  } else {
    register('en', enFunc);
  }

  return (
    <Page>
      <PageHeader meta={t('count', { count: locations.length })} title={t('title')} lead={t('description')} />

      <ul className='border-hairline bg-hairline grid gap-px border-y'>
        {locations.map(({ name, visitCounter, lastVisitAt }) => (
          <li key={name} className='bg-surface px-4 py-5 sm:px-6'>
            <h2 className='my-0 text-xl'>{name}</h2>
            <div className='text-content/50 mt-1 font-mono text-[11px] tracking-[0.08em] uppercase'>
              {t.rich('visited', {
                visitCounter,
                lastVisitAt,
                lastVisit: (chunk: ReactNode): JSX.Element => (
                  <abbr title={new Date(lastVisitAt).toLocaleDateString()} className='cursor-pointer'>
                    {format(lastVisitAt, locale)}
                  </abbr>
                )
              })}
            </div>
          </li>
        ))}
      </ul>
    </Page>
  );
}
