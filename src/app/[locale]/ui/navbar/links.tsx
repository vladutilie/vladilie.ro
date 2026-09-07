'use client';

import { useTranslations } from 'next-intl';

import { Link, usePathname, useRouter } from '@/i18n/routing';
import { ThemeSwitcher } from './theme-switcher';
import { LangChanger } from './lang-changer';
import { scrollTo } from '@/lib/utils';
import { HeaderAnchors, Pages } from '@/lib/constants';

const itemClasses = 'text-content/70 transition-colors hover:text-accent';

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
          : 'hidden items-center gap-6 text-sm md:flex lg:gap-7'
      }
    >
      {HeaderAnchors.map((anchor) => (
        <li key={anchor}>
          <button className={`cursor-pointer ${itemClasses}`} onClick={() => goToAnchor(anchor)}>
            {t(anchor)}
          </button>
        </li>
      ))}

      <li>
        <Link href={`/${Pages.Projects}`} className={itemClasses} onClick={() => closeMenu?.()}>
          {t(Pages.Projects)}
        </Link>
      </li>

      <li>
        <Link href={`/${Pages.Blog}`} className={itemClasses} onClick={() => closeMenu?.()}>
          {t(Pages.Blog)}
        </Link>
      </li>

      <li className='bg-hairline hidden h-[18px] w-px md:block' aria-hidden />

      <li className={isMobile ? 'border-hairline mt-2 border-t pt-5' : ''}>
        <ThemeSwitcher />
      </li>

      <li>
        <LangChanger />
      </li>

      <li className={isMobile ? 'mt-2' : ''}>
        <Link
          href={`/${Pages.Contact}`}
          className='bg-accent hover:bg-ink dark:hover:text-ink block rounded-full px-[18px] py-2.5 text-center text-sm font-semibold text-white transition-colors hover:text-white dark:hover:bg-white'
          onClick={() => closeMenu?.()}
        >
          {t('lets-talk')}
        </Link>
      </li>
    </ul>
  );
};
