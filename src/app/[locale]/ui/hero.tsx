import { ReactNode } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

import { SocialMedia } from './social-media';
import { Pin } from '../ui/icons';
import vlad from '@/../public/images/vlad-ilie.jpg';

export const Hero: React.FC = () => {
  const t = useTranslations('homepage.hero');

  return (
    <section className='container mx-auto grid max-w-7xl grid-cols-6 gap-8 px-4 py-16 md:py-20 2xl:py-24'>
      <div className='order-last col-span-6 flex flex-col gap-y-8 md:order-first md:col-span-4'>
        <div className='flex flex-col gap-y-4'>
          <h1>{t('hello', { emoji: '👋' })}</h1>

          <p>
            {t.rich('about', {
              strong: (chunk: ReactNode): JSX.Element => <strong>{chunk}</strong>,
              neo4j: (chunk: ReactNode): JSX.Element => (
                <a href={process.env.NEXT_PUBLIC_NEO4J} target='_blank' className="after:content-['_↗']">
                  {chunk}
                </a>
              ),
              cpf: (chunk: ReactNode) => (
                <a href='https://cartilepefata.ro' target='_blank' className="after:content-['_↗']">
                  {chunk}
                </a>
              ),
              city: 'Cluj-Napocăn',
              locations: (chunk: ReactNode) => <Link href={'/location'}>{chunk}</Link>
            })}
          </p>
        </div>

        <div className='flex flex-col gap-y-2'>
          <div className='flex gap-x-2'>
            <Pin />
            <p>Cluj-Napoca, CJ, România</p>
          </div>

          <div className='flex items-center gap-x-2'>
            <div className='flex h-6 w-6 items-center justify-center'>
              <span className='relative flex h-3 w-3 items-center'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75' />
                <span className='relative inline-flex h-3 w-3 rounded-full bg-green-500' />
              </span>
            </div>
            <p>{t('available')}</p>
          </div>
        </div>

        <SocialMedia />
      </div>

      <div className='col-span-6 place-self-center md:col-span-2'>
        <Image src={vlad} alt='Vlad Ilie' width={400} height={400} className='rounded-full' placeholder='blur' />
      </div>
    </section>
  );
};
