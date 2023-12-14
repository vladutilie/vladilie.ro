'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

import { Logo } from '../icons';
import { Links } from './links';
import { BurgerMenu } from './burger-menu';

export const Menu: React.FC = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const t = useTranslations('navbar');

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const sidebar = document.getElementById('sidebar');
      if (sidebar && !sidebar.contains(event.target) && displayMenu) {
        window.document.body.style.overflowY = '';
        setDisplayMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [displayMenu]);

  const handleMenu = (state = true): void => {
    if (state) {
      window.document.body.style.overflowY = 'hidden';
      setDisplayMenu(true);
    } else {
      window.document.body.style.overflowY = '';
      setDisplayMenu(false);
    }
  };

  return (
    <div>
      <Links />

      <aside
        id='sidebar'
        className={`fixed right-0 top-0 z-40 flex h-screen w-full max-w-sm origin-right flex-col gap-y-4 bg-white p-4 transition dark:bg-gray-950 ${
          displayMenu ? '-translate-x-0 opacity-100 md:hidden' : 'translate-x-full opacity-0'
        }`}
      >
        <header className='flex items-center justify-between'>
          <Link href='/' aria-label={t('go-to-homepage-al')}>
            <Logo />
          </Link>

          <button className='flex h-8 w-8 cursor-pointer items-center justify-center' onClick={() => handleMenu(false)}>
            ✕
          </button>
        </header>

        <Links isMobile closeMenu={() => handleMenu(false)} />
      </aside>

      <div
        className={displayMenu ? 'fixed inset-0 z-30 h-screen w-full bg-gray-900/10 backdrop-blur-sm md:hidden' : ''}
      />

      <button className='md:hidden' onClick={() => handleMenu()} aria-label={t('burger-menu-al')}>
        <BurgerMenu />
      </button>
    </div>
  );
};
