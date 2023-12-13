'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { format, register } from 'timeago.js';
import roFunc from 'timeago.js/lib/lang/ro';
import enFunc from 'timeago.js/lib/lang/en_US';
import { type Project as ProjectT } from 'contentlayer/generated';
import { Link } from '@/navigation';

import { usePostViews } from '@/hooks/usePostViews';
import { numberFormat } from '@/lib/numberFormat';
import { LoadingDots } from '../../ui/loading-dots';

export const Project: React.FC<ProjectT> = ({
  title,
  locale,
  featuredImage,
  blurDataImage,
  description,
  date,
  slug,
  readingTime
}) => {
  const t = useTranslations('projects');
  const { views, isLoading, isError } = usePostViews(slug);

  if ('ro' === locale) {
    register('ro', roFunc);
  } else {
    register('en', enFunc);
  }

  return (
    <Link
      href={{ pathname: '/projects/[slug]', params: { slug } }}
      className='col-span-6 rounded-lg border bg-gray-50 dark:border-slate-800 dark:bg-slate-900 sm:col-span-3 lg:col-span-2'
    >
      <div className='relative h-52 border-b'>
        <Image
          alt={title}
          blurDataURL={blurDataImage}
          className='rounded-t-lg object-cover'
          fill
          placeholder='blur'
          sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
          src={featuredImage}
        />
      </div>

      <div className='flex flex-col px-4 py-2'>
        <h2 className='line-clamp-1 text-xl'>{title}</h2>
        <p className='line-clamp-2 text-sm text-gray-500'>{description}</p>

        <div className='flex justify-between text-xs text-gray-500'>
          <span>{t('reading-time', { minutes: Math.ceil(readingTime) })}</span>
          <span>{isError || isLoading ? <LoadingDots /> : t('views', { count: numberFormat(Number(views)) })}</span>
          <span>{format(date, locale)}</span>
        </div>
      </div>
    </Link>
  );
};
