'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import moon from '@/../public/images/moon.svg';
import sun from '@/../public/images/sun.svg';

export const ThemeSwitcher: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations('navbar');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='flex h-10 w-10 items-center justify-center'>
        <Image src={sun} width={24} height={24} alt='moon' />
      </div>
    );
  }

  return (
    <div className='flex items-center justify-between'>
      <span className='transition-colors md:hidden'>{t('switch-theme')}</span>
      <button
        className='relative flex items-center justify-center gap-x-2 overflow-hidden p-2'
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <Image
          src={moon}
          width={24}
          height={24}
          alt='moon'
          className={`transition-transform duration-300 ${theme === 'light' ? 'translate-x-none' : '-translate-x-8'}`}
        />
        <Image
          src={sun}
          width={24}
          height={24}
          alt='sun'
          className={`absolute w-6 transition-transform duration-300 ${
            theme === 'light' ? '-translate-x-8' : 'translate-x-none'
          }`}
        />
      </button>
    </div>
  );
};
