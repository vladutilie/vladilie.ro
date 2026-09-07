import Image from 'next/image';
import type { BookModel as BookT } from '@/../generated/prisma/models';
import { BookState } from '@/../generated/prisma/enums';

import { Done, Favorite, Glasses, Wishlist } from '@/icons';

export const Book: React.FC<BookT> = ({ title, author, cover, state, link, blurData, isFavorite }) => (
  <a
    className='group bg-surface hover:bg-hover-tint flex items-stretch gap-x-4 p-5 transition-colors'
    href={link}
    target='_blank'
    rel='noreferrer'
  >
    <div className='relative h-20 w-12 shrink-0'>
      <Image
        alt={title}
        blurDataURL={`data:image/jpeg,${blurData}`}
        className='object-contain'
        fill
        placeholder='blur'
        sizes='50px'
        src={cover}
      />

      <div
        className={`absolute -right-1 flex h-5 w-5 items-center justify-center rounded-full p-1 ${
          BookState.Reading === state
            ? 'bg-yellow-400' // Reading
            : isFavorite
              ? 'bg-red-400' // Favorite
              : BookState.Completed === state
                ? 'bg-green-400' // Completed
                : 'bg-accent' // Wishlist
        }`}
      >
        {BookState.Reading === state ? (
          <Glasses className='fill-white' />
        ) : isFavorite ? (
          <Favorite className='text-white' />
        ) : BookState.Completed === state ? (
          <Done className='fill-white' />
        ) : (
          <Wishlist className='text-white' />
        )}
      </div>
    </div>

    <div className='flex flex-col justify-center'>
      <p className="text-content group-hover:text-accent my-0 font-semibold transition-colors group-hover:after:content-['_↗']">
        {title}
      </p>
      <span className='text-content/50 mt-1 font-mono text-[11px] tracking-[0.08em] uppercase'>{author}</span>
    </div>
  </a>
);
