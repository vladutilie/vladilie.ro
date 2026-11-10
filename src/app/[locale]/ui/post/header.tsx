import Image from 'next/image';
import type { Post, Project } from '@/lib/content.types';

import { Meta } from './meta';
import { Reactions } from '../reactions';

export const Header: React.FC<(Post | Project) & { kicker?: string; url?: string }> = async ({
  title,
  kicker,
  url,
  blurDataImage,
  featuredImage,
  slug,
  date,
  readingTime
}) => (
  <div className='mb-10 flex flex-col gap-y-6'>
    {featuredImage ? (
      <div className='border-hairline relative aspect-16/9 w-full overflow-hidden rounded-[14px] border'>
        <Image
          alt={title}
          blurDataURL={blurDataImage}
          className='object-cover'
          fill
          placeholder={blurDataImage ? 'blur' : 'empty'}
          sizes='100vw'
          src={featuredImage}
        />
      </div>
    ) : null}

    {kicker ? <div className='text-accent -mb-2 font-mono text-xs tracking-[0.08em] uppercase'>{kicker}</div> : null}

    <h1 className='my-0 text-[clamp(34px,5vw,52px)] leading-[1.05] tracking-[-0.04em] text-balance'>{title}</h1>

    {url ? (
      <a
        href={url}
        target='_blank'
        rel='noreferrer'
        className='border-signal text-content hover:text-accent self-start border-b-2 font-semibold'
      >
        {new URL(url).hostname.replace(/^www\./, '')} ↗
      </a>
    ) : null}

    <div className='border-hairline flex flex-col justify-between gap-y-4 border-y py-5 sm:flex-row sm:items-center'>
      <Meta date={date} readingTime={readingTime} slug={slug} />
      <Reactions slug={slug} />
    </div>
  </div>
);
