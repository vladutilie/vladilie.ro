import { ReactNode, JSX } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { SocialMedia } from './social-media';
import { Commit, Pin } from '../ui/icons';
import { Availability } from '../ui/availability';
import vlad from '@/../public/images/vlad-ilie-portrait.webp';

export const Hero: React.FC<{ location: string; commits: number }> = ({ location, commits }) => {
  const t = useTranslations('homepage.hero');

  return (
    <section className='container mx-auto grid max-w-7xl grid-cols-6 gap-8 px-4 py-20 md:py-32'>
      <div className='order-last col-span-6 flex flex-col gap-y-8 md:order-first md:col-span-4'>
        <div className='flex flex-col gap-y-4'>
          <h1>{t('hello', { emoji: '👋' })}</h1>

          <p>
            {t.rich('about', {
              strong: (chunk: ReactNode): JSX.Element => <strong>{chunk}</strong>,
              neo4j: (chunk: ReactNode): JSX.Element => (
                <a
                  href={process.env.NEXT_PUBLIC_NEO4J}
                  target='_blank'
                  className="after:content-['_↗']"
                  title={t('neo4j-certificate')}
                >
                  {chunk}
                </a>
              ),
              cpf: (chunk: ReactNode) => (
                <a
                  href='https://cartilepefata.ro'
                  target='_blank'
                  className="after:content-['_↗']"
                  title='Cărțile pe Față'
                >
                  {chunk}
                </a>
              ),
              city: location,
              locations: (chunk: ReactNode) => (
                <Link href={'/locations'} title={t('location-history')}>
                  {chunk}
                </Link>
              )
            })}
          </p>
        </div>

        <div className='flex flex-col gap-y-2'>
          <div className='flex items-center gap-x-2'>
            <Pin />
            <p className='my-0'>{location}</p>
          </div>

          <Availability />

          {!!commits && (
            <div className='flex items-center gap-x-2'>
              <Commit />
              <p className='my-0'>
                {t.rich('commits', {
                  count: commits,
                  commits: (chunk: ReactNode): JSX.Element => (
                    <code className='rounded-sm bg-gray-500 p-0.5 text-gray-50'>{chunk}</code>
                  )
                })}
              </p>
            </div>
          )}
        </div>

        <SocialMedia />
      </div>

      <div className='col-span-6 place-self-center md:col-span-2'>
        <Image
          alt='Vlad Ilie'
          className='rounded-full'
          height={400}
          placeholder='blur'
          priority
          fetchPriority='high'
          src={vlad}
          width={400}
        />
      </div>
    </section>
  );
};
