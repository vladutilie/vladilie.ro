import { getPathname, routing } from '@/i18n/routing';

export type Locale = (typeof routing.locales)[number];
type Href = Parameters<typeof getPathname>[0]['href'];

/**
 * The canonical URL of a page plus its hreflang alternates. `hrefs` maps each locale to its
 * version of the page; leave out a locale that has no version.
 */
export const localeAlternates = (locale: Locale, hrefs: Partial<Record<Locale, Href>>) => {
  const languages: Record<string, string> = {};

  for (const l of routing.locales) {
    const href = hrefs[l];

    if (href) {
      languages[l] = getPathname({ locale: l, href });
    }
  }

  if (1 < Object.keys(languages).length) {
    // Visitors who read neither language get the English version.
    languages['x-default'] = languages.en;
  }

  return { canonical: getPathname({ locale, href: hrefs[locale]! }), languages };
};

/** For pages that exist, at the same internal path, in every language. */
export const everyLocale = (href: Href): Record<Locale, Href> =>
  Object.fromEntries(routing.locales.map((locale) => [locale, href])) as Record<Locale, Href>;
