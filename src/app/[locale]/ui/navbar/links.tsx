import { useTranslations } from 'next-intl';

import { ThemeSwitcher } from './theme-switcher';
import { LangChanger } from './lang-changer';
import { scrollTo } from '@/lib/utils';
import { NavLinks } from '@/lib/constants';

export const Links: React.FC<{ isMobile?: boolean; closeMenu?: () => void }> = ({ isMobile = false, closeMenu }) => {
  const t = useTranslations('navbar');

  return (
    <ul
      className={`flex-col gap-x-6 after:absolute after:left-0 after:w-full after:border-b after:dark:border-gray-600 md:flex-row md:after:hidden ${
        isMobile ? 'flex gap-y-4 overflow-y-auto text-base' : 'hidden items-center md:flex'
      }`}
    >
      {Object.values(NavLinks).map((item, idx) => (
        <li
          className={`cursor-pointer transition-colors hover:text-blue-500 ${!idx ? 'pt-4 md:pt-0' : ''}`}
          key={idx}
          onClick={() => {
            scrollTo(item);
            if (isMobile && closeMenu) {
              closeMenu();
            }
          }}
        >
          {t(item)}
        </li>
      ))}
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
