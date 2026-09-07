'use client';

import { useLocale, useTranslations } from 'next-intl';
import { format, register } from 'timeago.js';
import roFunc from 'timeago.js/lib/lang/ro';
import enFunc from 'timeago.js/lib/lang/en_US';
import type { Post as PostT } from '@/lib/content.types';

import { Link } from '@/i18n/routing';
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
    <li className='bg-surface hover:bg-hover-tint transition-colors'>
      <Link
        href={{ pathname: '/blog/[slug]', params: { slug } }}
        className='group text-content hover:text-content flex flex-col gap-2 px-4 py-7 sm:px-6'
      >
        <span className='text-content/50 flex flex-wrap items-center gap-x-2 font-mono text-[11px] tracking-[0.1em] uppercase'>
          <span>{format(date, locale)}</span>
          <span aria-hidden>·</span>
          <span>{t('reading-time', { minutes: Math.ceil(readingTime) })}</span>
          <span aria-hidden>·</span>
          {isError || isLoading ? <LoadingDots /> : <span>{t('views', { count: numberFormat(Number(views)) })}</span>}
        </span>

        <h2 className='group-hover:text-accent my-0 text-2xl transition-colors'>{title}</h2>

        <p className='my-0 max-w-[70ch] text-[15px] leading-relaxed'>{description}</p>
      </Link>
    </li>
  );
};
