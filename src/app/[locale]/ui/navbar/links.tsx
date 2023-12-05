'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/navigation';

import { ThemeSwitcher } from './theme-switcher';
import { LangChanger } from './lang-changer';
import { scrollTo } from '@/lib/utils';
import { NavLinks, Pages } from '@/lib/constants';

export const Links: React.FC<{ isMobile?: boolean; closeMenu?: () => void }> = ({ isMobile = false, closeMenu }) => {
  const t = useTranslations('navbar');
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <ul
      className={`flex-col gap-x-6 after:absolute after:left-0 after:w-full after:border-b after:dark:border-gray-600 md:flex-row md:after:hidden ${
        isMobile ? 'flex gap-y-4 overflow-y-auto text-base' : 'hidden items-center md:flex'
      }`}
    >
      {Object.values(NavLinks).map((item, idx) => (
        <li
          className={`cursor-pointer hover:text-blue-500 ${!idx ? 'pt-4 md:pt-0' : ''}`}
          key={idx}
          onClick={() => {
            if (isMobile && closeMenu) {
              closeMenu();
            }
            if (pathname !== '/') {
              // @ts-ignore
              replace(`/#${item}`);
            } else {
              scrollTo(item);
            }
          }}
        >
          {t(item)}
        </li>
      ))}
      <li>
        <Link
          className='text-inherit'
          href={`/${Pages.Blog}`}
          onClick={() => (isMobile && closeMenu ? closeMenu() : null)}
        >
          {t(Pages.Blog)}
        </Link>
      </li>
      <li>
        <Link
          className='text-inherit'
          href={`/${Pages.Contact}`}
          onClick={() => (isMobile && closeMenu ? closeMenu() : null)}
        >
          {t(Pages.Contact)}
        </Link>
      </li>
      <li className='hidden h-6 w-0.5 bg-gray-100 md:block' />
      <li className='before:absolute before:left-0 before:w-full before:border-b before:dark:border-gray-600 md:before:hidden'>
        <ThemeSwitcher />
      </li>
      <li>
        <LangChanger />
      </li>
    </ul>
  );
};
