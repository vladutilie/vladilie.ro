import Image from 'next/image';
import Link from 'next/link';

import { Done, Favorite, Glasses, Wishlist } from '../icons';
import { Book as BookType } from '../types';
import { BookState } from '../types/Book.type';

export const Book: React.FC<BookType> = ({ title, author, cover, state, link, blurDataUrl }) => {
  return (
    <Link href={link} className='w-full p-2 transition-transform hover:scale-105 md:w-1/2' target='_blank'>
      <div className='flex w-full items-center gap-x-4 rounded-md bg-white p-4'>
        <div className='relative h-20 w-12'>
          <Image
            alt={title}
            blurDataURL={`data:image/jpeg,${blurDataUrl}`}
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
                : BookState.Favorite === state
                ? 'bg-red-400' // Favorite
                : BookState.Completed === state
                ? 'bg-green-400' // Completed
                : 'bg-blue-400' // Wishlist
            }`}
          >
            {BookState.Reading === state ? (
              <Glasses className='fill-white' />
            ) : BookState.Favorite === state ? (
              <Favorite className='text-white' />
            ) : BookState.Completed === state ? (
              <Done className='fill-white' />
            ) : (
              <Wishlist className='text-white' />
            )}
          </div>
        </div>

        <div className='flex w-fit flex-col gap-y-2'>
          <p className='font-quicksand text-base font-semibold text-gray-700'>{title}</p>
          <span className='text-xs'>{author}</span>
        </div>
      </div>
    </Link>
  );
};
