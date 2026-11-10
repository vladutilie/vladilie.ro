import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ro'],

  // Romanian is served at the root, English under /en.
  defaultLocale: 'ro',
  localePrefix: 'as-needed',
  // No redirects based on the browser language or a cookie: every URL always serves the same language,
  // which is what search engines expect. Visitors switch with the language toggle.
  localeDetection: false,
  // With detection off the NEXT_LOCALE cookie would never be read, so don't set it.
  localeCookie: false,
  pathnames: {
    '/': '/',
    '/locations': { en: '/locations', ro: '/locatii' },
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/projects': { en: '/projects', ro: '/proiecte' },
    '/projects/[slug]': { en: '/projects/[slug]', ro: '/proiecte/[slug]' },
    '/contact': '/contact',
    '/colophon': { en: '/colophon', ro: '/colofon' },
    '/uses': { en: '/uses', ro: '/utilizari' },
    '/books': { en: '/books', ro: '/carti' },
    '/boardgames': { en: '/boardgames', ro: '/jocuri-societate' },
    '/terms': { en: '/terms', ro: '/termeni' },
    '/privacy': { en: '/privacy', ro: '/confidentialitate' },
    '/cookie-policy': { en: '/cookie-policy', ro: '/politica-cookie-uri' }
  }
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
