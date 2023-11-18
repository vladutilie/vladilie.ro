'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export const About: React.FC = () => {
  const t = useTranslations('homepage.about');
  const [showMore, setShowMore] = useState(false);

  return (
    <section className='bg-gray-50 transition-colors dark:bg-slate-900'>
      <div className='container mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-16 md:py-20 2xl:py-24'>
        <div className='col-span-2 text-center'>
          <span className='rounded-xl bg-gray-600 px-4 py-1 text-sm text-gray-200'>{t('tag')}</span>
        </div>

        <div className='col-span-2 mx-auto md:col-span-1'>poză</div>

        <div className='col-span-2 flex flex-col md:col-span-1'>
          <h2>{t('title')}</h2>

          <div className='relative'>
            <div className={`transition-[height] ${showMore ? 'h-full' : 'h-72'}  overflow-hidden`}>
              <p>{t('p1')}</p>
              <p>{t('p2')}</p>
              <p>{t('p3')}</p>
              <p>{t('p4')}</p>
              <p>{t('p5')}</p>
              <p>{t('p6')}</p>
            </div>

            {!showMore && (
              <div className='before:absolute before:bottom-0 before:z-0 before:h-20 before:w-full before:bg-gradient-to-t before:from-gray-50 dark:before:from-slate-900' />
            )}

            {showMore ? (
              <span className='absolute -bottom-4 z-10 mx-auto cursor-pointer' onClick={() => setShowMore(false)}>
                {t('see-less')}
              </span>
            ) : (
              <span onClick={() => setShowMore(true)} className='absolute bottom-0 z-10 mx-auto cursor-pointer'>
                {t('see-more')}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
