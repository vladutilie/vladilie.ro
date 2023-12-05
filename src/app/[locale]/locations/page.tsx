import { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { format, register } from 'timeago.js';
import roFunc from 'timeago.js/lib/lang/ro';
import enFunc from 'timeago.js/lib/lang/en_US';

import prisma from '@/utils/prisma';

const getLocations = async () => await prisma.location.findMany({ orderBy: { lastVisitAt: 'desc' } });

export default async function Locations({ params: { locale } }: { params: { locale: string } }) {
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
            <div className='text-sm text-gray-400'>
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
