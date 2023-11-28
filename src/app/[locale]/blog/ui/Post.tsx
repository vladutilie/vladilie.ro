'use client';

import { useTranslations } from 'next-intl';
import { format } from 'timeago.js';
import { Link } from '@/navigation';

import { LoadingDots } from '../../ui/loading-dots';
import { type Post as PostType } from '@/../../.contentlayer/generated';
import { usePostViews } from '@/hooks/usePostViews';
import { numberFormat } from '@/utils/numberFormat';

export const Post: React.FC<PostType> = ({ title, description, date, slug, readingTime }) => {
  const t = useTranslations('blog');
  const { views, isLoading, isError } = usePostViews(slug);

  return (
    <Link href={{ pathname: '/blog/[slug]', params: { slug } }} className='flex flex-col'>
      <h2 className='my-0 text-lg'>{title}</h2>

      <span className='text-sm text-gray-400'>
        {`${format(date)} · ${readingTime} · `}
        {isError || isLoading ? <LoadingDots /> : t('views', { count: numberFormat(Number(views)) })}
      </span>

      <span className='text-sm text-gray-400'>{description}</span>
    </Link>
  );
};
