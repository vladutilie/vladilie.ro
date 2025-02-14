'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { usePathname, Link } from '@/i18n/routing';
import { Logo } from '../icons';
import { Menu } from './menu';

export const Navbar: React.FC = () => {
  const [isBlurredBg, setIsBlurredBg] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('navbar');

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY;
      const elementPosition = 100;

      setIsBlurredBg(scrollPosition - elementPosition >= 0);
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-20 w-full transition-all duration-500 ${
        isBlurredBg || '/' !== pathname
          ? 'shadow-surface-glass backdrop-blur-sm will-change-transform [@supports(backdrop-filter:blur(0px))]:bg-white/[30%] dark:[@supports(backdrop-filter:blur(0px))]:bg-gray-950/[30%]'
          : ''
      }`}
    >
      <div className='container mx-auto flex max-w-7xl items-center justify-between gap-x-8 p-4'>
        <Link href='/' aria-label={t('go-to-homepage-al')}>
          <Logo />
        </Link>

        <Menu />
      </div>
    </nav>
  );
};
