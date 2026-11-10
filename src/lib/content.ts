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
