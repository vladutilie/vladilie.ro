import { promises as fs } from 'fs';
import path from 'path';
import readingTime from 'reading-time';
import matter from 'gray-matter';

import type { CaseStudy } from '../types';

export const getCaseStudy = async (): Promise<CaseStudy[]> => {
  const result: CaseStudy[] = [];
  const dir = path.join(process.cwd(), './public/data/case-studies');
  const caseStudies = await fs.readdir(dir);

  await Promise.all(
    caseStudies.map(async (caseStudy) => {
      const csPath = path.join(dir, caseStudy, 'index.mdx');
      const slug = caseStudy.replace('.mdx', '');

      const fileContent = await fs.readFile(csPath, 'utf8');

      const {
        content,
        data: { title, description, date }
      } = matter(fileContent);

      result.push({
        title,
        description,
        date,
        slug,
        readingTime: readingTime(content).text
      });
    })
  );

  return result.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
};
