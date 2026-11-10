import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

import type { Post, Project } from './content.types';

const contentDir = path.join(process.cwd(), 'content');

const read = <T>(collection: 'blog' | 'projects'): T[] => {
  const dir = path.join(contentDir, collection);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, fileName), 'utf8'));

      return {
        ...data,
        date: new Date(data.date).toISOString(),
        // `name.mdx`, or `name.<locale>.mdx` when the same document exists in several languages.
        slug: fileName.replace(/(\.(en|ro))?\.mdx$/, ''),
        readingTime: readingTime(content).minutes,
        body: content
      } as T;
    })
    .sort((a: any, b: any) => +new Date(b.date) - +new Date(a.date));
};

export const allPosts = (): Post[] => read<Post>('blog');

export const allProjects = (): Project[] => read<Project>('projects');

export const getPost = (slug: string, locale: string): Post | undefined =>
  allPosts().find((post) => post.slug === slug && post.locale === locale);

export const getProject = (slug: string, locale: string): Project | undefined =>
  allProjects().find((project) => project.slug === slug && project.locale === locale);

/** The slug of every language version of a document, keyed by locale. */
const versions = <T extends Post | Project>(
  items: T[],
  slug: string,
  locale: string
): Partial<Record<string, string>> => {
  const item = items.find((i) => i.slug === slug && i.locale === locale);

  if (!item) {
    return {};
  }

  const result: Partial<Record<string, string>> = { [locale]: slug };

  // The other language shares the slug, or the two documents point at each other with `translation`.
  for (const other of items) {
    if (
      other.locale !== locale &&
      (other.slug === slug || other.slug === item.translation || other.translation === slug)
    ) {
      result[other.locale] = other.slug;
    }
  }

  return result;
};

export const postVersions = (slug: string, locale: string) => versions(allPosts(), slug, locale);

export const projectVersions = (slug: string, locale: string) => versions(allProjects(), slug, locale);

/**
 * For the language toggle: maps `blog/<locale>/<slug>` and `projects/<locale>/<slug>` to the slug of
 * the same document in the other language. Documents without a translation are left out.
 */
export const documentTranslations = (): Record<string, string> => {
  const map: Record<string, string> = {};

  for (const [collection, items, versionsOf] of [
    ['blog', allPosts(), postVersions],
    ['projects', allProjects(), projectVersions]
  ] as const) {
    for (const { slug, locale } of items) {
      for (const [otherLocale, otherSlug] of Object.entries(versionsOf(slug, locale))) {
        if (otherLocale !== locale && otherSlug) {
          map[`${collection}/${locale}/${slug}`] = otherSlug;
        }
      }
    }
  }

  return map;
};
