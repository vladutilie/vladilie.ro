import { promises as fs } from 'fs';
import path from 'path';

export const readCaseStudy = async (slug: string) => {
  const postPath = path.join(process.cwd(), './public/data/case-studies', slug, 'index.mdx');

  return await fs.readFile(postPath, 'utf8');
};
