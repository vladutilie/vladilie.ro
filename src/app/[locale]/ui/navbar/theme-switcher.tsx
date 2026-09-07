'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

const pillClasses =
  'cursor-pointer rounded-full border border-hairline px-3 py-[7px] font-mono text-[11px] uppercase tracking-[0.06em] text-content transition-colors hover:border-accent hover:text-accent';

export const ThemeSwitcher: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations('navbar');

  useEffect(() => {
    setMounted(true);
  }, []);

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
