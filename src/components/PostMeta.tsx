import { useEffect } from 'react';
import { format } from 'timeago.js';

import { usePollIfInView } from '../hooks/usePollIfInView';
import { usePostViews } from '../hooks/usePostViews';
import { LoadingDots } from './';

type Props = { date: string; readingTime: string; slug: string };
export const PostMeta: React.FC<Props> = ({ date, readingTime, slug }) => {
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
    <div>
      <span>{format(date)} · </span>
      <span ref={intersectionRef}>{viewsIsError || viewsIsLoading ? <LoadingDots /> : views?.toString()} views </span>
      <span>· {readingTime}</span>
    </div>
  );
};
