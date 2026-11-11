import { useTranslations } from 'next-intl';

import { NavLinks } from '@/lib/constants';
import { SectionHeading } from './section-heading';

const services = ['build', 'rescue', 'care', 'localize'] as const;
const items = ['i1', 'i2', 'i3'] as const;

export const Services: React.FC = () => {
  const t = useTranslations('homepage.services');

  return (
    <section id={NavLinks.Services} className='bg-surface-inverse text-paper'>
      <div className='mx-auto max-w-[1200px] px-6 py-20 md:py-[104px]'>
        <SectionHeading eyebrow={t('tag')} title={t('title')} inverse />

        <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4'>
          {services.map((service, idx) => (
            <div key={service} className='flex flex-col gap-3.5 rounded-[14px] border border-paper/16 bg-white/3 p-7'>
              <div className='font-mono text-xs text-signal'>
                {String(idx + 1).padStart(2, '0')} · {t(`${service}.label`)}
              </div>
              <h3 className='my-0 text-[22px] tracking-[-0.02em] text-paper'>{t(`${service}.title`)}</h3>
              <p className='my-0 text-[15px] leading-[1.55] text-paper/82'>{t(`${service}.body`)}</p>

              <ul className='m-0 grid list-none gap-[7px] p-0 text-[14.5px]'>
                {items.map((item) => (
                  <li key={item} className='text-paper/88'>
                    — {t(`${service}.${item}`)}
                  </li>
                ))}
              </ul>

              <div className='mt-auto border-t border-paper/14 pt-3.5 text-[13.5px] leading-normal text-paper/78'>
                <strong className='text-paper'>{t('fit')}</strong> {t(`${service}.fit`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
