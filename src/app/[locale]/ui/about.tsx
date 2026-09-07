import { ReactNode, JSX } from 'react';
import { useTranslations } from 'next-intl';

import { NavLinks } from '@/lib/constants';
import { SplitSection } from './split-section';

const stats = ['gte', 'euplatesc', 'experience'] as const;

export const About: React.FC = () => {
  const t = useTranslations('homepage.about');

  return (
    <SplitSection id={NavLinks.About} index='01' label={t('tag')} lead={t('lead')}>
      <div className='grid max-w-[68ch] gap-6'>
        <p className='my-0 text-xl leading-[1.55] tracking-[-0.015em] text-content'>{t('p1')}</p>

        <p className='my-0 text-[17px] leading-[1.7]'>
          {t.rich('p2', {
            cpf: (chunk: ReactNode): JSX.Element => (
              <a
                href='https://cartilepefata.ro'
                target='_blank'
                className='underline decoration-1 underline-offset-[3px]'
                title='Cărțile pe Față'
              >
                {chunk}
              </a>
            )
          })}
        </p>

        <p className='my-0 text-[17px] leading-[1.7]'>{t('p3')}</p>

        <div className='mt-3.5 grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-3'>
          {stats.map((stat) => (
            <div key={stat} className='bg-surface p-6'>
              <div className='mb-2 font-mono text-[26px] text-accent'>{t(`stats.${stat}.value`)}</div>
              <div className='text-sm leading-normal text-content/65'>{t(`stats.${stat}.label`)}</div>
            </div>
          ))}
        </div>
      </div>
    </SplitSection>
  );
};
