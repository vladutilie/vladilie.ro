import Image from 'next/image';
import type { Post, Project } from '@/lib/content.types';

import { Meta } from './meta';
import { Reactions } from '../reactions';

export const Header: React.FC<Post | Project> = async ({
  title,
  blurDataImage,
  featuredImage,
  slug,
  date,
  readingTime
}) => (
  <div className='mb-10 flex flex-col gap-y-6'>
    <div className='border-hairline relative aspect-16/9 w-full overflow-hidden rounded-[4px] border'>
      <Image
        alt={title}
        blurDataURL={blurDataImage}
        className='object-cover'
        fill
        placeholder='blur'
        sizes='100vw'
        src={featuredImage}
      />
    </div>

    <h1 className='my-0 text-4xl lg:text-5xl'>{title}</h1>

    <div className='border-hairline flex flex-col justify-between gap-y-4 border-y py-5 sm:flex-row sm:items-center'>
      <Meta date={date} readingTime={readingTime} slug={slug} />
      <Reactions slug={slug} />
    </div>
  </div>
);
