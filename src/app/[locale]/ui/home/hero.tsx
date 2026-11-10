import { ReactNode, JSX } from 'react';
import { useTranslations } from 'next-intl';

import { NavLinks } from '@/lib/constants';
import { OpsPanel } from './ops-panel';

const promises = ['fixed-scope', 'invoice', 'reply'] as const;

export const Hero: React.FC<{ location: string }> = ({ location }) => {
  const t = useTranslations('homepage.hero');
  const isAvailable = 'true' === process.env.NEXT_PUBLIC_AVAILABLE_FOR_WORK;

  return (
    <section className='mx-auto flex max-w-[1200px] flex-wrap items-center gap-14 px-6 pt-16 pb-16 md:pt-[88px]'>
      <div className='min-w-0 flex-[1_1_540px]'>
        <div className='text-accent mb-7 inline-flex items-center gap-[9px] font-mono text-xs tracking-[0.08em] uppercase'>
          <span
            aria-hidden
            className={`animate-pulse-dot h-2 w-2 rounded-full ${isAvailable ? 'bg-signal' : 'bg-red-500'}`}
          />
          {isAvailable ? t('available') : t('not-available')} · {location}
        </div>

        <h1 className='my-0 mb-[26px] text-[clamp(36px,4.6vw,58px)] leading-[1.02] tracking-[-0.04em] text-balance'>
          {t.rich('title', {
            accent: (chunk: ReactNode): JSX.Element => <span className='text-accent'>{chunk}</span>
          })}
        </h1>

        <p className='text-content/80 my-0 mb-[34px] max-w-[56ch] text-[19px] leading-[1.6]'>{t('intro')}</p>

        <div className='mb-10 flex flex-wrap gap-3'>
          <a
            href={`#${NavLinks.Contact}`}
            className='bg-signal text-ink hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink rounded-full px-[26px] py-4 text-base font-bold transition-colors'
          >
            {t('cta-primary')} →
          </a>
          <a
            href={`#${NavLinks.Work}`}
            className='border-hairline-strong text-content hover:border-content hover:text-content rounded-full border-[1.5px] px-[26px] py-4 text-base font-semibold transition-colors'
          >
            {t('cta-secondary')}
          </a>
        </div>

        <ul className='m-0 flex list-none flex-wrap gap-x-[26px] gap-y-2.5 p-0 text-[14.5px]'>
          {promises.map((promise) => (
            <li key={promise} className='text-content/80'>
              ✓ {t(`promises.${promise}`)}
            </li>
          ))}
        </ul>
      </div>

      <OpsPanel />
    </section>
  );
};
