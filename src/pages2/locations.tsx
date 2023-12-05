import { NextPage } from 'next';
import useSWR from 'swr';
import { NextSeo } from 'next-seo';
import { format } from 'timeago.js';
import { Location } from '@prisma/client';

import { fetcher } from 'src/utils/fetcher';
import { PAGES } from 'src/utils/constants';

const Locations: NextPage = () => {
  const { data } = useSWR<Location[]>('/api/locations', fetcher);

  return (
    <>
      <NextSeo
        title={[process.env.NEXT_PUBLIC_SITE_NAME, PAGES.LOCATIONS?.label].join(' - ')}
        description="Places I've been, worked from or visited. Since December 2022 🎁."
      />

      <main className='container mx-auto flex max-w-3xl flex-col gap-y-8 px-4 pt-28'>
        <div className='flex flex-col gap-y-3'>
          <h2>Location history</h2>
          <p>Places I&apos;ve been, worked from or visited. Since December 2022 🎁.</p>
        </div>

        <div className='flex flex-col gap-y-2'>
          {data?.length ? (
            data.map(({ name, visitCounter, lastVisitAt }) => (
              <div key={name}>
                <h3>{name}</h3>
                <div className='text-sm text-gray-500'>
                  Visited: {visitCounter} times · Last visit:{' '}
                  <abbr title={new Date(lastVisitAt).toLocaleDateString()} className='cursor-pointer'>
                    {format(lastVisitAt)}
                  </abbr>
                </div>
              </div>
            ))
          ) : (
            <>Loading, please wait...</>
          )}
        </div>
      </main>
    </>
  );
};

export default Locations;
