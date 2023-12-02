import Image from 'next/image';
import { BookState, Book as BookT } from '@prisma/client';

import { Done, Favorite, Glasses, Wishlist } from '@/icons';

export const Book: React.FC<BookT> = ({ title, author, cover, state, link, blurData, isFavorite }) => (
  <a
    className='col-span-6 p-2 transition-transform hover:scale-105 sm:col-span-3 lg:col-span-2'
    href={link}
    target='_blank'
  >
    <div className='flex w-full items-stretch gap-x-4 rounded-md bg-gray-50 p-4 dark:bg-slate-900'>
      <div className='relative h-20 w-12'>
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
                  : 'bg-blue-400' // Wishlist
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

      <div className='flex flex-col py-2'>
        <p className='my-0 grow font-semibold'>{title}</p>
        <span className='text-xs'>{author}</span>
      </div>
    </div>
  </a>
);
