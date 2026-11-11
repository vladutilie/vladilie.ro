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

      {isMobile ? (
        // On mobile both preferences share one row under the anchors.
        <li className='mt-2 flex items-center gap-5 border-t border-hairline pt-5'>
          <ThemeSwitcher />
          <LangChanger />
        </li>
      ) : (
        <>
          <li>
            <ThemeSwitcher />
          </li>

          <li>
            <LangChanger />
          </li>
        </>
      )}

      <li className={isMobile ? 'mt-2' : ''}>
        <button
          className='block w-full cursor-pointer rounded-full bg-content px-[18px] py-2.5 text-center font-semibold text-surface transition-colors hover:bg-signal hover:text-ink'
          onClick={() => goToAnchor(NavLinks.Contact)}
        >
          {t('get-a-quote')}
        </button>
      </li>
    </ul>
  );
};
