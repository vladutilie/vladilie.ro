import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next/Vercel internals and anything that looks like a file (llms.txt, /.well-known/*.json…).
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
