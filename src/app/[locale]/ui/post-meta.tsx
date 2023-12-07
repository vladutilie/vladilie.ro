'use client';

import { useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { format, register } from 'timeago.js';
import roFunc from 'timeago.js/lib/lang/ro';
import enFunc from 'timeago.js/lib/lang/en_US';

import { numberFormat } from '@/lib/numberFormat';
import { usePollIfInView } from '@/hooks/usePollIfInView';
import { usePostViews } from '@/hooks/usePostViews';
import { LoadingDots } from './loading-dots';

type Props = { date: string; readingTime: number; slug: string };

export const PostMeta: React.FC<Props> = ({ date, readingTime, slug }) => {
  const locale = useLocale();
  const t = useTranslations('blog');

  if ('ro' === locale) {
    register('ro', roFunc);
  } else {
    register('en', enFunc);
  }
  const interval = 5000;
  const { shouldPoll, intersectionRef } = usePollIfInView(interval);

  const {
    views,
    isLoading: viewsIsLoading,
    isError: viewsIsError,
    increment: incrementViews
  } = usePostViews(slug, {
    // Avoid fetching view count we *know* is stale since increment() mutation
    // returns view count
    revalidateOnMount: false,
    // Only poll when in view
    refreshInterval: shouldPoll ? interval : 0,
    // Override `usePostViews` default dedupingInterval for the polling usecase
    // (refresh interval can never be faster than deduping interval)
    dedupingInterval: interval
  });

  useEffect(() => {
    incrementViews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='text-sm text-gray-400'>
      <span>{format(date, locale)} · </span>
      <span ref={intersectionRef}>
        {viewsIsError || viewsIsLoading ? <LoadingDots /> : t('views', { count: numberFormat(Number(views)) })}
      </span>
      <span> · {t('reading-time', { minutes: Math.ceil(readingTime) })}</span>
    </div>
  );
};
