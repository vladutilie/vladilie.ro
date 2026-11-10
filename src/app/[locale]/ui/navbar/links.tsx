'use client';

import { useTranslations } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/routing';
import { ThemeSwitcher } from './theme-switcher';
import { LangChanger } from './lang-changer';
import { scrollTo } from '@/lib/utils';
import { HeaderAnchors, NavLinks } from '@/lib/constants';

const itemClasses = 'text-content/78 transition-colors hover:text-content';

export const Links: React.FC<{ isMobile?: boolean; closeMenu?: () => void }> = ({ isMobile = false, closeMenu }) => {
  const t = useTranslations('navbar');
  const pathname = usePathname();
  const { replace } = useRouter();

  const goToAnchor = (anchor: string): void => {
    closeMenu?.();

    if ('/' !== pathname) {
      // @ts-ignore
      replace(`/#${anchor}`);
    } else {
      scrollTo(anchor);
    }
  };

  return (
    <ul
      className={
        isMobile
          ? 'flex flex-col gap-y-5 overflow-y-auto text-lg'
          : 'hidden items-center gap-[22px] text-[14.5px] font-medium md:flex'
      }
    >
      {HeaderAnchors.map((anchor) => (
        <li key={anchor}>
          <button className={`cursor-pointer ${itemClasses}`} onClick={() => goToAnchor(anchor)}>
            {t(anchor)}
          </button>
        </li>
      ))}

      <li className={isMobile ? 'border-hairline mt-2 border-t pt-5' : ''}>
        <ThemeSwitcher />
      </li>

      <li>
        <LangChanger />
      </li>

      <li className={isMobile ? 'mt-2' : ''}>
        <button
          className='bg-content text-surface hover:bg-signal hover:text-ink block w-full cursor-pointer rounded-full px-[18px] py-2.5 text-center font-semibold transition-colors'
          onClick={() => goToAnchor(NavLinks.Contact)}
        >
          {t('get-a-quote')}
        </button>
      </li>
    </ul>
  );
};
