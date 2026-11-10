import { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import { everyLocale, localeAlternates, type Locale } from '@/lib/alternates';
import { allPosts, allProjects, postVersions, projectVersions } from '@/lib/content';

type Entry = MetadataRoute.Sitemap[number];
type Fields = Omit<Entry, 'url' | 'alternates'>;
type Hrefs = Parameters<typeof localeAlternates>[1];

const absolute = (pathname: string): string => new URL(pathname, process.env.NEXT_PUBLIC_SITE_URL).toString();

/** The sitemap entry of one language version, listing every version as an hreflang alternate. */
const entry = (locale: Locale, hrefs: Hrefs, fields: Fields): Entry => {
  const { canonical, languages } = localeAlternates(locale, hrefs);

  return {
    url: absolute(canonical),
    alternates: {
      languages: Object.fromEntries(Object.entries(languages).map(([l, pathname]) => [l, absolute(pathname)]))
    },
    ...fields
  };
};

/** Every language version of a blog post or project, keyed by locale. */
const documentHrefs = (
  versions: Partial<Record<string, string>>,
  pathname: '/blog/[slug]' | '/projects/[slug]'
): Hrefs =>
  Object.fromEntries(Object.entries(versions).map(([locale, slug]) => [locale, { pathname, params: { slug: slug! } }]));

const legalUpdatedAt = '2023-12-06T18:00:00.000Z';

const pages: { href: Parameters<typeof everyLocale>[0]; fields: Fields }[] = [
  { href: '/', fields: { priority: 1, changeFrequency: 'weekly', lastModified: new Date() } },
  { href: '/projects', fields: { priority: 0.9, changeFrequency: 'monthly', lastModified: new Date() } },
  { href: '/blog', fields: { priority: 0.9, changeFrequency: 'monthly', lastModified: new Date() } },
  { href: '/contact', fields: { priority: 0.8, changeFrequency: 'yearly', lastModified: new Date() } },
  { href: '/locations', fields: { priority: 0.8, changeFrequency: 'weekly', lastModified: new Date() } },
  { href: '/colophon', fields: { priority: 0.7, changeFrequency: 'yearly', lastModified: new Date() } },
  { href: '/uses', fields: { priority: 0.7, changeFrequency: 'yearly', lastModified: new Date() } },
  { href: '/books', fields: { priority: 0.7, changeFrequency: 'monthly', lastModified: new Date() } },
  { href: '/boardgames', fields: { priority: 0.7, changeFrequency: 'monthly', lastModified: new Date() } },
  { href: '/terms', fields: { priority: 0.5, changeFrequency: 'yearly', lastModified: legalUpdatedAt } },
  { href: '/privacy', fields: { priority: 0.5, changeFrequency: 'yearly', lastModified: legalUpdatedAt } },
  {
    href: '/cookie-policy',
    fields: { priority: 0.5, changeFrequency: 'yearly', lastModified: '2026-11-10T12:00:00.000Z' }
  }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const document = (date: string): Fields => ({ priority: 0.7, changeFrequency: 'monthly', lastModified: date });

  return [
    ...pages.flatMap(({ href, fields }) => routing.locales.map((locale) => entry(locale, everyLocale(href), fields))),
    ...allPosts().map(({ slug, locale, date }) =>
      entry(locale, documentHrefs(postVersions(slug, locale), '/blog/[slug]'), document(date))
    ),
    ...allProjects().map(({ slug, locale, date }) =>
      entry(locale, documentHrefs(projectVersions(slug, locale), '/projects/[slug]'), document(date))
    )
  ];
}
