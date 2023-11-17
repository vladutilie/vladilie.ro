import { createLocalizedPathnamesNavigation, Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'ro'] as const;

export const pathnames = {
  '/': '/',
  '/location': {
    en: '/locations',
    ro: '/locatii'
  },
  '/blog': '/blog'
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } = createLocalizedPathnamesNavigation({
  locales,
  pathnames
});
