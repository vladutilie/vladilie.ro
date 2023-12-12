'use client';

import { useLocale, useTranslations } from 'next-intl';
import { format, register } from 'timeago.js';
import roFunc from 'timeago.js/lib/lang/ro';
import enFunc from 'timeago.js/lib/lang/en_US';
import { Link } from '@/navigation';
import { type Post as PostT } from 'contentlayer/generated';

import { LoadingDots } from '../../ui/loading-dots';
import { usePostViews } from '@/hooks/usePostViews';
import { numberFormat } from '@/lib/numberFormat';

export const PostCard: React.FC<PostT> = ({ title, description, date, slug, readingTime }) => {
  const t = useTranslations('blog');
  const locale = useLocale();
  const { views, isLoading, isError } = usePostViews(slug);

  if ('ro' === locale) {
    register('ro', roFunc);
  } else {
    register('en', enFunc);
  }

  return (
    <li>
      <Link href={{ pathname: '/blog/[slug]', params: { slug } }} className='flex flex-col'>
        <h2 className='my-0 text-lg'>{title}</h2>

        <span className='text-sm text-gray-500'>
          {`${format(date, locale)} · ${t('reading-time', { minutes: Math.ceil(readingTime) })} · `}
          {isError || isLoading ? <LoadingDots /> : t('views', { count: numberFormat(Number(views)) })}
        </span>

        <span className='text-sm text-gray-500'>{description}</span>
      </Link>
    </li>
  );
};
