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
    <li className='bg-surface transition-colors hover:bg-hover-tint'>
      <Link
        href={{ pathname: '/blog/[slug]', params: { slug } }}
        className='group flex flex-col gap-2 px-4 py-7 text-content hover:text-content sm:px-6'
      >
        <span className='flex flex-wrap items-center gap-x-2 font-mono text-[11px] tracking-[0.1em] text-content/50 uppercase'>
          <span>{format(date, locale)}</span>
          <span aria-hidden>·</span>
          <span>{t('reading-time', { minutes: Math.ceil(readingTime) })}</span>
          <span aria-hidden>·</span>
          {isError || isLoading ? <LoadingDots /> : <span>{t('views', { count: numberFormat(Number(views)) })}</span>}
        </span>

        <h2 className='my-0 text-2xl transition-colors group-hover:text-accent'>{title}</h2>

        <p className='my-0 max-w-[70ch] text-[15px] leading-relaxed'>{description}</p>
      </Link>
    </li>
  );
};
