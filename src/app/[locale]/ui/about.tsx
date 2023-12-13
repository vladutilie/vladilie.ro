import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { NavLinks } from '@/lib/constants';
import vlad from '@/../public/images/vlad-ilie.webp';

export const About: React.FC = () => {
  const t = useTranslations('homepage.about');

  return (
    <section id={NavLinks.About} className='bg-gray-50 transition-colors dark:bg-slate-900'>
      <div className='container mx-auto grid max-w-7xl grid-cols-3 gap-8 px-4 py-16 md:py-20 2xl:py-24'>
        <div className='col-span-3 text-center'>
          <span className='rounded-xl bg-gray-600 px-4 py-1 text-sm text-gray-200'>{t('tag')}</span>
        </div>

        <div className='col-span-3 mx-auto self-center lg:col-span-1'>
          <Image src={vlad} alt={t('image-alt')} width={300} height={400} placeholder='blur' />
        </div>

        <div className='col-span-3 flex flex-col lg:col-span-2'>
          <h2>{t('title')}</h2>

          <div className='relative'>
            <div>
              <p>{t('p1')}</p>
              <p>{t('p2')}</p>
              <p>{t('p3')}</p>
              <p>{t('p4')}</p>
              <p>{t('p5')}</p>
              <p>{t('p6')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
