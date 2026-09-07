'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { Wordmark } from '../wordmark';
import { Links } from './links';
import { BurgerMenu } from './burger-menu';

export const Menu: React.FC = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const t = useTranslations('navbar');

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const sidebar = document.getElementById('sidebar');
      if (sidebar && !sidebar.contains(event.target) && displayMenu) {
        window.document.body.style.overflow = '';
        setDisplayMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [displayMenu]);

  const handleMenu = (state = true): void => {
    if (state) {
      window.document.body.style.overflow = 'hidden';
      setDisplayMenu(true);
    } else {
      window.document.body.style.overflow = '';
      setDisplayMenu(false);
    }
  };

  return (
    <div>
      <Links />

      <aside
        id='sidebar'
        className={`border-hairline bg-surface fixed top-0 right-0 z-40 flex h-screen w-full max-w-sm flex-col gap-y-8 border-l p-6 transition-all transition-discrete duration-300 md:hidden ${
          displayMenu
            ? 'translate-x-0 opacity-100 starting:translate-x-full starting:opacity-0'
            : 'hidden translate-x-full opacity-0'
        }`}
      >
        <header className='flex items-center justify-between'>
          <Link href='/' aria-label={t('go-to-homepage-al')} className='text-content hover:text-content'>
            <Wordmark />
          </Link>

          <button
            className='text-content flex h-8 w-8 cursor-pointer items-center justify-center'
            onClick={() => handleMenu(false)}
            aria-label={t('close-menu-al')}
          >
            ✕
          </button>
        </header>

        <Links isMobile closeMenu={() => handleMenu(false)} />
      </aside>

      <div className={displayMenu ? 'bg-ink/20 fixed inset-0 z-30 h-screen w-full backdrop-blur-xs md:hidden' : ''} />

      <button className='text-content md:hidden' onClick={() => handleMenu()} aria-label={t('burger-menu-al')}>
        <BurgerMenu />
      </button>
    </div>
  );
};
