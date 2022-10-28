import Link from 'next/link';
import { format } from 'timeago.js';

import { LoadingDots } from './';
import { type Post as PostType } from '../../.contentlayer/generated';
import { usePostViews } from '../hooks/usePostViews';
import { numberFormat } from 'src/utils/numberFormat';

export const Post: React.FC<PostType> = ({ title, description, date, slug, readingTime }) => {
  const { views, isLoading, isError } = usePostViews(slug);

  return (
    <Link
      href={`/blog/${slug}`}
      className='flex flex-col gap-y-2 rounded-md p-2 transition-all hover:scale-105 hover:bg-white'
    >
      <h3>{title}</h3>

      <div>
        <span>{format(date)}</span>
        <span> · {readingTime} · </span>
        <span>{isError || isLoading ? <LoadingDots /> : numberFormat(Number(views))} views </span>
      </div>

      <span>{description}</span>
    </Link>
  );
};
