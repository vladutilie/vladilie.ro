import { ReactNode, JSX } from 'react';
import { useTranslations } from 'next-intl';

import { NavLinks } from '@/lib/constants';
import { SplitSection } from './split-section';

const stages = ['neo4j', 'bachelor-degree', 'oracle'] as const;

export const Education: React.FC = () => {
  const t = useTranslations('homepage.education');

  return (
    <SplitSection id={NavLinks.Education} index='04' label={t('tag')} lead={t('lead')}>
      <ul className='border-hairline bg-hairline grid gap-px border'>
        {stages.map((stage) => (
          <li key={stage} className='bg-surface p-6 md:p-8'>
            <div className='flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6'>
              <h3 className='my-0 text-xl'>{t(`${stage}.title`)}</h3>
              <span className='text-accent shrink-0 font-mono text-xs tracking-[0.06em]'>{t(`${stage}.interval`)}</span>
            </div>

            <p className='text-content/70 mt-1.5 mb-2 text-sm font-medium'>{t(`${stage}.subtitle`)}</p>

            <p className='my-0 text-[15px] leading-[1.65]'>
              {t.rich(`${stage}.description`, {
                url: (chunk: ReactNode): JSX.Element => (
                  <a
                    href='https://graphacademy.neo4j.com/certificates/d03b95acad8d8f00a601355f8b420dc8c8361fefad256e9a369549db7d35bec2.pdf'
                    target='_blank'
                    className="underline decoration-1 underline-offset-[3px] after:content-['_↗']"
                    title={t('neo4j.title')}
                  >
                    {chunk}
                  </a>
                )
              })}
            </p>
          </li>
        ))}
      </ul>
    </SplitSection>
  );
};
