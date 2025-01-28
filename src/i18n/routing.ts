import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ro'],

  // Used when no locale matches
  defaultLocale: 'en',
  localePrefix: 'as-needed',
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
    '/privacy': { en: '/privacy', ro: '/confidentialitate' }
  }
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
