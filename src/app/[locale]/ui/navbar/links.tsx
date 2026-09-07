'use client';

import { useTranslations } from 'next-intl';

import { Link, usePathname, useRouter } from '@/i18n/routing';
import { ThemeSwitcher } from './theme-switcher';
import { LangChanger } from './lang-changer';
import { scrollTo } from '@/lib/utils';
import { HeaderLinks, Pages } from '@/lib/constants';

export const Links: React.FC<{ isMobile?: boolean; closeMenu?: () => void }> = ({ isMobile = false, closeMenu }) => {
  const t = useTranslations('navbar');
  const pathname = usePathname();
  const { replace } = useRouter();

  const goToAnchor = (anchor: string): void => {
    if (isMobile && closeMenu) {
      closeMenu();
    }

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
          : 'hidden items-center gap-7 text-sm md:flex lg:gap-8'
      }
    >
      {HeaderLinks.map((anchor) => (
        <li key={anchor}>
          <button
            className='cursor-pointer text-content/70 transition-colors hover:text-accent'
            onClick={() => goToAnchor(anchor)}
          >
            {t(anchor)}
          </button>
        </li>
      ))}

      {isMobile && (
        <>
          <li>
            <Link
              href={`/${Pages.Projects}`}
              className='text-content/70 hover:text-accent'
              onClick={() => closeMenu?.()}
            >
              {t(Pages.Projects)}
            </Link>
          </li>
          <li>
            <Link href={`/${Pages.Blog}`} className='text-content/70 hover:text-accent' onClick={() => closeMenu?.()}>
              {t(Pages.Blog)}
            </Link>
          </li>
        </>
      )}

      <li className='hidden h-[18px] w-px bg-hairline md:block' aria-hidden />

      <li className={isMobile ? 'mt-2 border-t border-hairline pt-5' : ''}>
        <ThemeSwitcher />
      </li>

      <li>
        <LangChanger />
      </li>

      <li className={isMobile ? 'mt-2' : ''}>
        <Link
          href={`/${Pages.Contact}`}
          className='block rounded-full bg-accent px-[18px] py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-ink hover:text-white dark:hover:bg-white dark:hover:text-ink'
          onClick={() => closeMenu?.()}
        >
          {t('lets-talk')}
        </Link>
      </li>
    </ul>
  );
};
