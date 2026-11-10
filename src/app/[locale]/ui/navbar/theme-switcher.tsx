'use client';

import { useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

const pillClasses =
  'cursor-pointer rounded-full border border-hairline-strong px-[11px] py-1.5 font-mono text-[11.5px] uppercase tracking-[0.06em] text-content transition-colors hover:border-content';

export const ThemeSwitcher: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations('navbar');
  // The resolved theme is only known in the browser, so the label has to wait
  // for hydration to avoid a server/client mismatch.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const isDark = 'dark' === resolvedTheme;

  return (
    <button
      className={pillClasses}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      title={t('switch-theme')}
      aria-label={t('switch-theme')}
      suppressHydrationWarning
    >
      {mounted ? t(isDark ? 'light' : 'dark') : '    '}
    </button>
  );
};
