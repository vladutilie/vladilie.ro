'use client';

import { createContext, useContext } from 'react';

/** `blog/<locale>/<slug>` or `projects/<locale>/<slug>` → the slug in the other language. */
const TranslationsContext = createContext<Record<string, string>>({});

export const TranslationsProvider: React.FC<{ translations: Record<string, string>; children: React.ReactNode }> = ({
  translations,
  children
}) => <TranslationsContext value={translations}>{children}</TranslationsContext>;

export const useDocumentTranslations = (): Record<string, string> => useContext(TranslationsContext);
