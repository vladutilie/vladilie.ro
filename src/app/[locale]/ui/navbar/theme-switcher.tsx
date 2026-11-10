'use client';

import { useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

const Sun: React.FC = () => (
  <svg viewBox='0 0 24 24' width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden>
    <circle cx='12' cy='12' r='4' />
    <path
      strokeLinecap='round'
      d='M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41'
    />
  </svg>
);

const Moon: React.FC = () => (
  <svg viewBox='0 0 24 24' width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden>
    <path strokeLinejoin='round' d='M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z' />
  </svg>
);

export const ThemeSwitcher: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations('navbar');
  // The resolved theme is only known in the browser, so the icon has to wait
  // for hydration to avoid a server/client mismatch.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const isDark = 'dark' === resolvedTheme;
  // The icon shows the theme you switch *to*: the sun in dark mode, the moon in light mode.
  const label = mounted ? t(isDark ? 'switch-to-light' : 'switch-to-dark') : t('switch-theme');

  return (
    <button
      className='border-hairline-strong text-content hover:border-content grid h-8 w-8 cursor-pointer place-items-center rounded-full border transition-colors'
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      title={label}
      aria-label={label}
    >
      {mounted ? isDark ? <Sun /> : <Moon /> : <span className='h-4 w-4' />}
    </button>
  );
};
