import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { format } from 'timeago.js';

import { Link } from '@/navigation';
import { type Project as ProjectT } from '@/../.contentlayer/generated';

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

  return (
    <Link
      href={{ pathname: '/projects/[slug]', params: { slug } }}
      className='col-span-6 rounded-lg border sm:col-span-3 lg:col-span-2'
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
        <p className='line-clamp-2 text-sm text-gray-400'>{description}</p>

        <div className='flex justify-between text-xs text-gray-400'>
          <span>{t('reading-time', { minutes: Math.ceil(readingTime) })}</span>
          <span>{format(date, locale)}</span>
        </div>
      </div>
    </Link>
  );
};
