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

        <h1 className='mb-7 mt-8 text-5xl leading-[0.98] lg:text-7xl'>
          {t.rich('title', {
            accent: (chunk: ReactNode): JSX.Element => <span className='text-accent'>{chunk}</span>,
            br: (): JSX.Element => <br />
          })}
        </h1>

        <p className='mb-10 max-w-[52ch] text-lg leading-relaxed md:text-[19px]'>
          {t.rich('intro', {
            strong: (chunk: ReactNode): JSX.Element => (
              <strong className='font-semibold text-content'>{chunk}</strong>
            )
          })}
        </p>

        <div className='flex flex-wrap items-center gap-3.5'>
          <Link
            href={`/${Pages.Projects}`}
            className='rounded-full border border-ink bg-ink px-6 py-[15px] text-[15px] font-semibold text-paper transition-colors hover:border-accent hover:bg-accent hover:text-white dark:border-paper dark:bg-paper dark:text-ink dark:hover:border-accent dark:hover:bg-accent dark:hover:text-white'
          >
            {t('cta-work')}
          </Link>
          <Link
            href={`/${Pages.Contact}`}
            className='rounded-full border border-hairline-strong px-6 py-[15px] text-[15px] font-semibold text-content transition-colors hover:border-accent hover:text-accent'
          >
            {t('cta-quote')}
          </Link>
        </div>

        <div className='mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-hairline pt-8 font-mono text-[12.5px] text-content/60'>
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
        <div className='relative aspect-4/5 overflow-hidden rounded-[4px] border border-hairline-strong'>
          <Image
            alt='Vlad Ilie'
            className='h-full w-full object-cover'
            placeholder='blur'
            priority
            fetchPriority='high'
            src={vlad}
            sizes='(max-width: 1024px) 90vw, 380px'
          />
          <span className='absolute bottom-0 left-0 h-[46px] w-[46px] bg-accent' aria-hidden />
        </div>
      </div>
    </section>
  );
};
