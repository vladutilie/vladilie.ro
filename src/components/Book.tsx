import Image from 'next/image';
import Link from 'next/link';

import { Done, Favorite, Glasses, Wishlist } from '../icons';
import { Book as BookType, BookState } from '../types/Book.type';

export const Book: React.FC<BookType> = ({ title, author, cover, state, link }) => {
  return (
    <Link href={link}>
      <a className=' w-full p-2 transition-transform hover:scale-105 md:w-1/2' target='_blank'>
        <div className='flex w-full items-center gap-x-4 rounded-md bg-white p-4'>
          <div className='relative h-20 w-12'>
            <Image src={cover} alt={title} objectFit='contain' layout='fill' />
            <div
              className={`absolute -right-1 z-10 flex h-5 w-5 items-center justify-center rounded-full p-1 ${
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

          <div className='flex flex-col gap-y-2'>
            <p className='font-quicksand text-base font-semibold text-gray-700'>{title}</p>
            <span className='text-xs'>{author}</span>
          </div>
        </div>
      </a>
    </Link>
  );
};
