import { createLocalizedPathnamesNavigation, Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'ro'] as const;

export const pathnames = {
  '/': '/',
  '/location': { en: '/locations', ro: '/locatii' },
  '/blog': '/blog',
  '/blog/[slug]': '/blog/[slug]',
  '/projects': { en: '/projects', ro: '/proiecte' },
  '/contact': '/contact',
  '/colophon': { en: '/colophon', ro: '/colofon' },
  '/uses': { en: '/uses', ro: '/utilizari' },
  '/books': { en: '/books', ro: '/carti' },
  '/boardgames': { en: '/boardgames', ro: '/jocuri-societate' },
  '/terms': { en: '/terms', ro: '/termeni' },
  '/privacy': { en: '/privacy', ro: '/confidentialitate' }
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } = createLocalizedPathnamesNavigation({
  locales,
  pathnames
});
