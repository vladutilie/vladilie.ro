import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import vlad from '../../public/assets/images/vlad-ilie.jpg';
import { fetcher } from '../utils/fetcher';
import { Social } from './';
import { PAGES } from 'src/utils/constants';

export const Hero: React.FC = () => {
  const { query } = useRouter();
  const { data } = useSWR('/api/locations?takeLastOne=yep', fetcher);

  useEffect(() => {
    if (query.updateLocationKey) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        if (window.confirm(`Actualizezi locația?`)) {
          updateLocation({
            lat: coords.latitude,
            lng: coords.longitude
          });
        }
      });

      function updateLocation({ lat, lng }: { lat: number; lng: number }) {
        fetch('/api/locations', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({ lat, lng, updateLocationKey: query.updateLocationKey })
        });
      }
    }
  }, [query.updateLocationKey]);

  return (
    <section className='flex flex-col-reverse items-center gap-x-4 gap-y-10 md:flex-row'>
      <div className='w-full md:w-2/3'>
        <h1 className='text-center md:text-left'>Hi there, Vlad here!</h1>
        <p className='mt-3 mb-4 leading-7'>
          I&apos;m a <strong>Software Engineer</strong> based in Romania, love to juggle with technologies and put my
          soul into every project to get the best out of it.{' '}
          <strong>
            <Link
              href={process.env.NEXT_PUBLIC_NEO4J as string}
              target='_blank'
              className="after:content-['_↗'] hover:underline"
            >
              Neo4j
            </Link>{' '}
            Certified Professional
          </strong>
          {', '} <strong>NextJS</strong> fan, enthusiastic about <strong>JavaScript</strong> technologies, nostalgic{' '}
          <strong>WordPress</strong> lover, and the maintainer of{' '}
          <Link
            href='https://cartilepefata.ro'
            target='_blank'
            className="font-semibold after:content-['_↗'] hover:underline"
          >
            Cărțile pe Față
          </Link>{' '}
          websites. I also like to travel around the country, so now I am in{' '}
          {!data ? (
            <Image
              alt='loading'
              className='inline animate-spin'
              src='/assets/images/loading.svg'
              width={20}
              height={20}
            />
          ) : (
            <Link href={PAGES.LOCATIONS?.href as string}>📍 {data?.[0]?.name || 'Romania'}</Link>
          )}
          {', and tomorrow I might be somewhere else.'}
        </p>
        <Social />
      </div>

      <div className='w-56'>
        <Image
          src={vlad}
          alt={process.env.NEXT_PUBLIC_SITE_NAME as string}
          className='rounded-full'
          placeholder='blur'
        />
      </div>
    </section>
  );
};
