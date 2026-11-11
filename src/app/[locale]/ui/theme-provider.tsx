'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

// next-themes injects an inline <script> that sets the theme before the first paint. It only has to run
// in the server-rendered HTML; when the root layout re-renders on the client (e.g. after switching the
// language), React 19 warns about rendering a <script>. A non-executable type on the client avoids that.
const scriptProps = 'undefined' === typeof window ? undefined : ({ type: 'application/json' } as const);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider scriptProps={scriptProps} {...props}>
      {children}
    </NextThemesProvider>
  );
}
