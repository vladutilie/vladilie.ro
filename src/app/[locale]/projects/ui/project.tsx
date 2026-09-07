'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
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
  featuredImage,
  blurDataImage,
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
        className='group border-hairline bg-surface text-content hover:border-accent hover:text-content flex h-full flex-col overflow-hidden rounded-[4px] border transition-colors'
      >
        <div className='border-hairline relative aspect-16/10 border-b'>
          <Image
            alt={title}
            blurDataURL={blurDataImage}
            className='object-cover'
            fill
            placeholder='blur'
            sizes='(max-width: 768px) 100vw, 33vw'
            src={featuredImage}
          />
        </div>

        <div className='flex flex-1 flex-col p-6 pb-7'>
          <div className='text-accent mb-3 font-mono text-[11px] tracking-[0.1em] uppercase'>
            {technologies.slice(0, 2).join(' · ')}
          </div>

          <h2 className='group-hover:text-accent my-0 mb-2.5 text-xl leading-tight transition-colors'>{title}</h2>

          <p className='my-0 mb-5 text-[15px] leading-relaxed'>{description}</p>

          <div className='border-hairline text-content/50 mt-auto flex flex-wrap items-center gap-x-2 border-t pt-4 font-mono text-[11px]'>
            <span>{format(date, locale)}</span>
            <span aria-hidden>·</span>
            <span>{t('reading-time', { minutes: Math.ceil(readingTime) })}</span>
            <span aria-hidden>·</span>
            {isError || isLoading ? <LoadingDots /> : <span>{t('views', { count: numberFormat(Number(views)) })}</span>}
          </div>
        </div>
      </Link>
    </li>
  );
};
