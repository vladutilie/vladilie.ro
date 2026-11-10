import { useTranslations } from 'next-intl';

import { NavLinks } from '@/lib/constants';
import { SectionHeading } from './section-heading';

const steps = ['call', 'scope', 'build', 'launch'] as const;

export const Process: React.FC = () => {
  const t = useTranslations('homepage.process');

  return (
    <section id={NavLinks.Process} className='mx-auto max-w-[1200px] px-6 py-20 md:py-[104px]'>
      <SectionHeading eyebrow={t('tag')} title={t('title')} />

      <ol className='border-content m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(230px,1fr))] border-t-2 p-0'>
        {steps.map((step, idx) => (
          <li key={step} className='pt-[26px] pr-6 pb-6'>
            <div className='text-accent mb-3.5 text-[46px] leading-none font-extrabold tracking-[-0.04em]'>
              {String(idx + 1).padStart(2, '0')}
            </div>
            <div className='text-content mb-2 text-[19px] font-bold'>{t(`${step}.title`)}</div>
            <div className='text-content/78 text-[15px] leading-[1.6]'>{t(`${step}.body`)}</div>
          </li>
        ))}
      </ol>
    </section>
  );
};
