import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import { Tag } from '../tag';
import { Stage } from './stage';
import { NavLinks } from '@/lib/constants';

export const Education: React.FC = () => {
  const t = useTranslations('homepage.education');
  const keys = ['neo4j', 'bachelor-degree', 'oracle', 'high-school'] as const;

  return (
    <section id={NavLinks.Education} className='container mx-auto max-w-7xl px-4 py-16 md:py-20 2xl:py-24'>
      <div className='col-span-3 text-center'>
        <Tag label={t('tag')} />
      </div>

      <div className='relative pt-12'>
        <span className='absolute left-0 top-0 h-full w-[1px] bg-gray-200 sm:left-1/2' />

        <div className='flex flex-wrap'>
          {keys.map((key, idx) => (
            <Stage
              key={idx}
              title={t(`${key}.title`)}
              subtitle={t(`${key}.subtitle`)}
              label={t(`${key}.interval`)}
              description={t.rich(`${key}.description`, {
                url: (chunk: ReactNode): JSX.Element => (
                  <a
                    href='https://graphacademy.neo4j.com/certificates/d03b95acad8d8f00a601355f8b420dc8c8361fefad256e9a369549db7d35bec2.pdf'
                    target='_blank'
                    className="after:content-['_↗']"
                    title={t('neo4j.title')}
                  >
                    {chunk}
                  </a>
                )
              })}
              isEven={0 == idx % 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
