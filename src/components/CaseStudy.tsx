import Link from 'next/link';
import { format } from 'timeago.js';

import { CaseStudy as CaseStudyType } from '../types';

export const CaseStudy: React.FC<CaseStudyType> = ({ title, description, date, slug, readingTime }) => {
  return (
    <Link href={`/case-studies/${slug}`}>
      <a className='flex flex-col gap-y-2 rounded-md p-4 transition-all hover:scale-105 hover:bg-white'>
        <h3>{title}</h3>
        <span>
          {format(date)} &bull; {readingTime}
        </span>
        <span>{description}</span>
      </a>
    </Link>
  );
};
