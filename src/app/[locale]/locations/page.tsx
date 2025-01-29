import { ReactNode, JSX } from 'react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { format, register } from 'timeago.js';
import roFunc from 'timeago.js/lib/lang/ro';
import enFunc from 'timeago.js/lib/lang/en_US';

import { getPathname } from '@/i18n/routing';
import prisma from '@/lib/prisma';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'ro' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('locations');

  const commonFields = { title: t('title'), description: t('description') };

  return {
    alternates: { canonical: ('ro' === locale ? '/ro/' : '') + getPathname({ locale, href: '/locations' }) },
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
    <main className='container mx-auto max-w-7xl gap-8 px-4 py-32'>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>

      <div className='flex flex-col gap-y-2'>
        {locations.map(({ name, visitCounter, lastVisitAt }) => (
          <div key={name}>
            <h3 className='my-0 text-xl'>{name}</h3>
            <div className='text-sm text-gray-500'>
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
          </div>
        ))}
      </div>
    </main>
  );
}
