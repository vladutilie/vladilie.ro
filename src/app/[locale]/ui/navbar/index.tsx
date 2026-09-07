'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { Wordmark } from '../wordmark';
import { Menu } from './menu';

export const Navbar: React.FC = () => {
  const t = useTranslations('navbar');

  return (
    <header className='sticky top-0 z-20 border-b border-hairline bg-header backdrop-blur-[14px]'>
      <div className='mx-auto flex h-[72px] max-w-[1180px] items-center justify-between gap-6 px-5 md:px-8'>
        <Link href='/' aria-label={t('go-to-homepage-al')} className='text-content hover:text-content'>
          <Wordmark />
        </Link>

        <Menu />
      </div>
    </header>
  );
};
