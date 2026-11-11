'use client';

import { useTranslations } from 'next-intl';
import { format, register } from 'timeago.js';
import roFunc from 'timeago.js/lib/lang/ro';
import enFunc from 'timeago.js/lib/lang/en_US';
import type { Project as ProjectT } from '@/lib/content.types';

import { Link } from '@/i18n/routing';
import { usePostViews } from '@/hooks/usePostViews';
import { numberFormat } from '@/lib/numberFormat';
import { LoadingDots } from '../../ui/loading-dots';

export const Project: React.FC<ProjectT> = ({
  title,
  locale,
  kind,
  description,
  technologies,
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
    <li>
      <Link
        href={{ pathname: '/projects/[slug]', params: { slug } }}
        className='group flex h-full flex-col rounded-[14px] border border-hairline bg-surface-raised p-7 text-content transition-colors hover:border-signal hover:text-content'
      >
        <div className='mb-3.5 font-mono text-xs tracking-[0.08em] text-accent uppercase'>
          {kind ?? technologies.slice(0, 2).join(' · ')}
        </div>

        <h2 className='my-0 mb-3 text-[22px] leading-[1.15] tracking-[-0.03em]'>{title}</h2>

        <p className='my-0 mb-5 text-[15px] leading-[1.6] text-content/80'>{description}</p>

        <ul className='m-0 mb-6 flex list-none flex-wrap gap-1.5 p-0'>
          {technologies.slice(0, 5).map((technology) => (
            <li
              key={technology}
              className='rounded-full border border-hairline-strong px-2.5 py-1 font-mono text-[11.5px] text-content'
            >
              {technology}
            </li>
          ))}
        </ul>

        <div className='mt-auto flex flex-wrap items-center gap-x-2 border-t border-hairline pt-4 font-mono text-[11.5px] text-content/60'>
          <span>{format(date, locale)}</span>
          <span aria-hidden>·</span>
          <span>{t('reading-time', { minutes: Math.ceil(readingTime) })}</span>
          <span aria-hidden>·</span>
          {isError || isLoading ? <LoadingDots /> : <span>{t('views', { count: numberFormat(Number(views)) })}</span>}
        </div>
      </Link>
    </li>
  );
};
