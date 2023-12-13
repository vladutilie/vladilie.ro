import { Metadata } from 'next';
import { type Book as BookT, BookState } from '@prisma/client';
import { getTranslations } from 'next-intl/server';
import { getPathname } from '@/navigation';
import { getPlaiceholder } from 'plaiceholder';

import prisma from '@/lib/prisma';
import { readData } from '@/lib/readData';
import { Book } from './ui/book';

export async function generateMetadata({ params: { locale } }: { params: { locale: 'en' | 'ro' } }): Promise<Metadata> {
  const t = await getTranslations('books');
  const commonFields = { title: t('title'), description: t('description') };

  return {
    alternates: { canonical: ('ro' === locale ? '/ro/' : '') + getPathname({ locale, href: '/books' }) },
    ...commonFields,
    keywords: t('metadata.keywords'),
    openGraph: {
      ...commonFields,
      url: getPathname({ href: '/books', locale }),
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      images: [{ url: '/images/social-card.png', width: 1200, height: 630 }],
      locale,
      type: 'website'
    },
    twitter: {
      ...commonFields,
      card: 'summary_large_image',
      creator: '@vladilie94',
      creatorId: '66733656',
      images: ['/images/social-card.png']
    }
  };
}

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
  const bookList = [];

  let i = 1;
  for await (let book of books) {
    const { blurDataUrl, state, ...rest } = book;

    const bufferImage = await fetch(rest.cover).then(async (r) => Buffer.from(await r.arrayBuffer()));
    const { base64 } = await getPlaiceholder(bufferImage, { size: 10 });

    bookList.push({
      id: i++,
      ...rest,
      blurData: base64,
      state: 'Favorite' === state ? BookState.Completed : (state as BookState),
      isFavorite: 'Favorite' === state
    });
  }

  await prisma.book.createMany({ data: bookList });
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
      <h1>{t('title')}</h1>
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
