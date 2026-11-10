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
        className='group border-hairline bg-surface-raised text-content hover:border-signal hover:text-content flex h-full flex-col rounded-[14px] border p-7 transition-colors'
      >
        <div className='text-accent mb-3.5 font-mono text-xs tracking-[0.08em] uppercase'>
          {kind ?? technologies.slice(0, 2).join(' · ')}
        </div>

        <h2 className='my-0 mb-3 text-[22px] leading-[1.15] tracking-[-0.03em]'>{title}</h2>

        <p className='text-content/80 my-0 mb-5 text-[15px] leading-[1.6]'>{description}</p>

        <ul className='m-0 mb-6 flex list-none flex-wrap gap-1.5 p-0'>
          {technologies.slice(0, 5).map((technology) => (
            <li
              key={technology}
              className='border-hairline-strong text-content rounded-full border px-2.5 py-1 font-mono text-[11.5px]'
            >
              {technology}
            </li>
          ))}
        </ul>

        <div className='border-hairline text-content/60 mt-auto flex flex-wrap items-center gap-x-2 border-t pt-4 font-mono text-[11.5px]'>
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
