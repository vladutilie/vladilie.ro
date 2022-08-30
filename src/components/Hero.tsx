import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import vlad from '../../public/assets/images/vlad-ilie.jpg';
import { Arrow } from '../icons';
import { fetcher } from '../utils/fetcher';
import { Social } from './';

export const Hero: React.FC = () => {
  const { query } = useRouter();
  const { data } = useSWR('/api/settings', fetcher);

  useEffect(() => {
    if (query.updateLocationKey) {
      navigator.geolocation.getCurrentPosition((position) => {
        updateLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });

      function updateLocation({ lat, lng }: { lat: number; lng: number }) {
        fetch('/api/settings', {
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
          I&apos;m a <strong>Software Engineer</strong> based in Romania, I love to juggle with technologies and put my
          soul in every project to get the best of it.{' '}
          <strong>
            <Link href={process.env.NEXT_PUBLIC_NEO4J as string}>
              <a target='_blank' className='hover:underline'>
                Neo4j <Arrow className='inline w-3 fill-blue-500' />
              </a>
            </Link>{' '}
            Certified Professional
          </strong>
          {', '} <strong>NextJS</strong> fan, enthusiastic of <strong>JavaScript</strong> development technologies,
          nostalgic <strong>WordPress</strong> lover and the maintainer of{' '}
          <Link href='https://cartilepefata.ro'>
            <a target='_blank' className='hover:underline'>
              <strong>Cărțile pe Față</strong>
              <Arrow className='ml-1 inline w-3 fill-blue-500' />
            </a>
          </Link>{' '}
          website network. I also like to travel around the country and that&apos;s why now I am in{' '}
          {!data ? (
            <Image alt='loading' className='animate-spin' height={20} src='/assets/images/loading.svg' width={20} />
          ) : (
            <>
              📍<em>{data?.currentLocation}</em>
            </>
          )}{' '}
          and tomorrow I can be somewhere else.
        </p>
        <Social />
      </div>

      <div className='w-56'>
        <Image src={vlad} alt={process.env.NEXT_PUBLIC_SITE_NAME} className='rounded-full' placeholder='blur' />
      </div>
    </section>
  );
};
