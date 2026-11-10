import NextLink from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { getPathname, usePathname } from '@/i18n/routing';
import { useDocumentTranslations } from './translations';

// Pages whose slug differs, or may not exist, in the other language.
const documentPaths = { '/blog/[slug]': 'blog', '/projects/[slug]': 'projects' } as const;

const classes = 'text-content/78 font-mono text-xs uppercase transition-colors';

export const LangChanger: React.FC = () => {
  const t = useTranslations('navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams<{ slug?: string }>();
  const translations = useDocumentTranslations();
  const isEnglish = 'en' === locale;
  const target = isEnglish ? 'ro' : 'en';
  const label = isEnglish ? 'RO' : 'EN';
  const lang = isEnglish ? 'română' : 'English';

  let targetParams: Record<string, string | string[] | undefined> = params;

  if (pathname in documentPaths) {
    const collection = documentPaths[pathname as keyof typeof documentPaths];
    const slug = translations[`${collection}/${locale}/${params.slug}`];

    if (!slug) {
      return (
        <span
          aria-disabled
          className={`${classes} cursor-not-allowed opacity-40`}
          title={t('not-translated', { lang })}
        >
          {label}
        </span>
      );
    }

    targetParams = { ...params, slug };
  }

  // next-intl's <Link locale> always prefixes the default locale (/ro/...) so its middleware can update
  // the locale cookie. Locale detection is off, so link straight to the final URL instead of a redirect.
  // @ts-expect-error -- the pathname comes from the current route, so it is one of the known pathnames.
  const href = getPathname({ locale: target, href: { pathname, params: targetParams } });

  return (
    <NextLink
      href={href}
      hrefLang={target}
      className={`${classes} hover:text-content`}
      title={t('change-language-to', { lang })}
    >
      {label}
    </NextLink>
  );
};
