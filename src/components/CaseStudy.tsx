import Link from 'next/link';
import { format } from 'timeago.js';

import { LoadingDots } from './';
import { CaseStudy as CaseStudyType } from '../types';
import { usePostViews } from '../hooks/usePostViews';

export const CaseStudy: React.FC<CaseStudyType> = ({ title, description, date, slug, readingTime }) => {
  const { views, isLoading, isError } = usePostViews(slug);

  return (
    <Link href={`/case-studies/${slug}`}>
      <a className='flex flex-col gap-y-2 rounded-md p-4 transition-all hover:scale-105 hover:bg-white'>
        <h3>{title}</h3>

        <div>
          <span>{format(date)} · </span>
          <span>{isError || isLoading ? <LoadingDots /> : views} views </span>
          <span>· {readingTime}</span>
        </div>

        <span>{description}</span>
      </a>
    </Link>
  );
};
