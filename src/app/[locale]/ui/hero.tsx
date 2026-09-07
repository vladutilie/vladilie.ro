import { ReactNode, JSX } from 'react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { Availability } from './availability';
import { SocialMedia } from './social-media';
import { Pages } from '@/lib/constants';

export const Hero: React.FC<{ location: string; commits: number }> = ({ location, commits }) => {
  const t = useTranslations('homepage.hero');

  return (
    <section id='top' className='flex flex-col items-center pt-24 pb-16 text-center md:pt-32 md:pb-[72px]'>
      <div className='mb-10'>
        <Availability />
      </div>

      <h1 className='my-0 max-w-[17ch] text-5xl leading-[0.95] tracking-[-0.05em] text-balance md:text-7xl lg:text-[88px]'>
        {t.rich('title', {
          accent: (chunk: ReactNode): JSX.Element => <span className='text-accent'>{chunk}</span>
        })}
      </h1>

      <p className='mt-8 mb-11 max-w-[60ch] text-lg leading-[1.6] md:text-xl'>
        {t.rich('intro', {
          strong: (chunk: ReactNode): JSX.Element => <strong className='text-content font-semibold'>{chunk}</strong>
        })}
      </p>

      <div className='flex flex-wrap items-center justify-center gap-3.5'>
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

      <div className='border-hairline text-content/60 mt-14 flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t pt-[30px] font-mono text-[12.5px]'>
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
    </section>
  );
};
