import { ReactNode, JSX } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { Availability } from './availability';
import { SocialMedia } from './social-media';
import { Pages } from '@/lib/constants';
import vlad from '@/../public/images/vlad-ilie-portrait.webp';

export const Hero: React.FC<{ location: string; commits: number }> = ({ location, commits }) => {
  const t = useTranslations('homepage.hero');

  return (
    <section
      id='top'
      className='grid grid-cols-1 items-center gap-12 py-20 md:py-24 lg:grid-cols-[1.35fr_1fr] lg:gap-[72px] lg:py-[108px]'
    >
      <div>
        <Availability />

        <h1 className='mt-8 mb-7 text-5xl leading-[0.98] lg:text-7xl'>
          {t.rich('title', {
            accent: (chunk: ReactNode): JSX.Element => <span className='text-accent'>{chunk}</span>,
            br: (): JSX.Element => <br />
          })}
        </h1>

        <p className='mb-10 max-w-[52ch] text-lg leading-relaxed md:text-[19px]'>
          {t.rich('intro', {
            strong: (chunk: ReactNode): JSX.Element => <strong className='text-content font-semibold'>{chunk}</strong>
          })}
        </p>

        <div className='flex flex-wrap items-center gap-3.5'>
          <Link
            href={`/${Pages.Projects}`}
            className='border-ink bg-ink text-paper hover:border-accent hover:bg-accent dark:border-paper dark:bg-paper dark:text-ink dark:hover:border-accent dark:hover:bg-accent rounded-full border px-6 py-[15px] text-[15px] font-semibold transition-colors hover:text-white dark:hover:text-white'
          >
            {t('cta-work')}
          </Link>
          <Link
            href={`/${Pages.Contact}`}
            className='border-hairline-strong text-content hover:border-accent hover:text-accent rounded-full border px-6 py-[15px] text-[15px] font-semibold transition-colors'
          >
            {t('cta-quote')}
          </Link>
        </div>

        <div className='border-hairline text-content/60 mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t pt-8 font-mono text-[12.5px]'>
          <span>{location}</span>
          {!!commits && (
            <span>
              {t.rich('commits', {
                count: commits,
                commits: (chunk: ReactNode): JSX.Element => <span className='text-accent'>{chunk}</span>
              })}
            </span>
          )}
          <span>{t('meta-stack')}</span>
          <span>{t('meta-gte')}</span>
        </div>

        <div className='mt-8'>
          <SocialMedia />
        </div>
      </div>

      <div className='mx-auto w-full max-w-sm lg:max-w-none'>
        <div className='border-hairline-strong relative aspect-4/5 overflow-hidden rounded-[4px] border'>
          <Image
            alt='Vlad Ilie'
            className='h-full w-full object-cover'
            placeholder='blur'
            priority
            fetchPriority='high'
            src={vlad}
            sizes='(max-width: 1024px) 90vw, 380px'
          />
          <span className='bg-accent absolute bottom-0 left-0 h-[46px] w-[46px]' aria-hidden />
        </div>
      </div>
    </section>
  );
};
