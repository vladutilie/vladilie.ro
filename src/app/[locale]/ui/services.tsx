import { useTranslations } from 'next-intl';

import { NavLinks } from '@/lib/constants';
import { SplitSection } from './split-section';

const services = ['wordpress', 'nextjs', 'infrastructure', 'localization'] as const;

export const Services: React.FC = () => {
  const t = useTranslations('homepage.services');

  return (
    <SplitSection id={NavLinks.Services} index='02' label={t('tag')} lead={t('lead')}>
      <div className='grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-2'>
        {services.map((service, idx) => (
          <div key={service} className='bg-surface p-8 transition-colors hover:bg-hover-tint'>
            <div className='mb-4 font-mono text-[11px] tracking-[0.12em] text-accent'>
              {String(idx + 1).padStart(2, '0')}
            </div>
            <h3 className='my-0 mb-2.5 text-xl'>{t(`${service}.title`)}</h3>
            <p className='my-0 text-[15px] leading-[1.65]'>{t(`${service}.body`)}</p>
          </div>
        ))}
      </div>
    </SplitSection>
  );
};
