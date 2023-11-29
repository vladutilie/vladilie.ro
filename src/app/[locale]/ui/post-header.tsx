import Image from 'next/image';
import { Post } from 'contentlayer/generated';

import { PostMeta } from './post-meta';
import { Reactions } from './reactions';

export const PostHeader: React.FC<Post> = async ({ title, blurDataImage, featuredImage, slug, date, readingTime }) => (
  <div className='flex flex-col gap-y-4'>
    <div className='relative h-96 w-full'>
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
      <PostMeta date={date} readingTime={readingTime} slug={slug} />
    </div>
  </div>
);
