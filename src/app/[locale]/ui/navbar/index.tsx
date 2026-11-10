'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { Wordmark } from '../wordmark';
import { Menu } from './menu';

export const Navbar: React.FC = () => {
  const t = useTranslations('navbar');

  return (
    <header className='border-hairline bg-header sticky top-0 z-20 border-b backdrop-blur-[14px]'>
      <div className='mx-auto flex h-[68px] max-w-[1200px] items-center justify-between gap-6 px-6'>
        <Link href='/' aria-label={t('go-to-homepage-al')} className='text-content hover:text-content'>
          <Wordmark />
        </Link>

        <Menu />
      </div>
    </header>
  );
};
