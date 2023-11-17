import createMiddleware from 'next-intl/middleware';
import { locales, pathnames } from './navigation';

export default createMiddleware({
  defaultLocale: locales[0],
  locales,
  pathnames,
  localePrefix: 'as-needed'
});

export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml).*)'] };
