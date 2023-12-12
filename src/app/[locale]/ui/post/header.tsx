import Image from 'next/image';
import { Post, Project } from 'contentlayer/generated';

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
  <div className='flex flex-col gap-y-4'>
    <div className='relative h-40 w-full sm:h-96'>
      <Image
        alt={title}
        blurDataURL={blurDataImage}
        className='rounded-md object-cover shadow-lg'
        fill
        placeholder='blur'
        sizes='100vw'
        src={featuredImage}
      />
    </div>

    <h1>{title}</h1>

    <div className='mb-4 flex flex-col justify-between gap-y-2 border-b pb-6 sm:flex-row sm:items-center'>
      <Reactions slug={slug} />
      <Meta date={date} readingTime={readingTime} slug={slug} />
    </div>
  </div>
);
