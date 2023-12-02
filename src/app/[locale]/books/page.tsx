import { type Book as BookT, BookState } from '@prisma/client';
import { getTranslations } from 'next-intl/server';

import prisma from '@/utils/prisma';
import { readData } from '@/utils/readData';
import { Book } from './ui/book';

type BookTFile = {
  author: string;
  blurDataUrl: string;
  cover: string;
  link: string;
  state: BookState | 'Favorite';
  title: string;
};

// TODO: Run this when on production, then remove it :)
const seedBooks = async () => {
  const { books } = await readData<{ books: BookTFile[] }>('/public/data/books.json');
  await prisma.book.createMany({
    data: books.map(({ blurDataUrl, state, ...book }) => ({
      ...book,
      blurData: blurDataUrl,
      state: 'Favorite' === state ? BookState.Completed : (state as BookState),
      isFavorite: 'Favorite' === state
    }))
  });

  return books;
};

const getBooks = async () => {
  const books: BookT[] = await prisma.book.findMany();

  return {
    reading: books.filter(({ state }) => state === BookState.Reading).sort((a, b) => (a.title > b.title ? 1 : -1)),
    completed: books.filter(({ state }) => state === BookState.Completed).sort((a, b) => (a.title > b.title ? 1 : -1)),
    wishing: books.filter(({ state }) => state === BookState.Wish).sort((a, b) => (a.title > b.title ? 1 : -1))
  };
};

export default async function BookPage() {
  const t = await getTranslations('books');
  const books = await getBooks();

  return (
    <main className='container mx-auto max-w-7xl gap-8 px-4 py-20 md:py-32'>
      <h2>{t('title')}</h2>
      <p>{t('description')}</p>

      <div>
        <h3 className='text-2xl'>{t('currently-reading')}</h3>
        <div className='mt-4 grid grid-cols-6'>
          {books.reading.map((book) => (
            <Book key={book.id} {...book} />
          ))}
        </div>
      </div>

      <div>
        <h3 className='text-2xl'>{t('read')}</h3>
        <div className='mt-4 grid grid-cols-6'>
          {books.completed.map((book) => (
            <Book key={book.id} {...book} />
          ))}
        </div>
      </div>

      <div>
        <h3 className='text-2xl'>{t('wishlist')}</h3>
        <div className='mt-4 grid grid-cols-6'>
          {books.wishing.map((book) => (
            <Book key={book.id} {...book} />
          ))}
        </div>
      </div>
    </main>
  );
}
