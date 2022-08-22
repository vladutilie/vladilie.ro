import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import { Book } from '../src/components/Book';
import { Book as BookType, BookState } from '../src/types/Book.type';
import { readData } from '../src/utils/readData';

type Props = {
  reading: BookType[];
  favorites: BookType[];
  completed: BookType[];
  wishing: BookType[];
};

const Books: NextPage<Props> = ({ reading, favorites, completed, wishing }) => (
  <>
    <Head>
      <title>{[process.env.NEXT_PUBLIC_SITE_NAME, 'Books'].join(' - ')}</title>
    </Head>

    <main className='container mx-auto flex max-w-3xl flex-col px-4'>
      <h2>Books</h2>
      <p className='mt-3'>My book collection. A travel through my knowledge and stories along life.</p>

      <div className='mt-8'>
        <h3>Currently reading</h3>
        <div className='mt-4 flex w-full flex-wrap'>
          {reading.map((book: BookType, idx: number) => (
            <Book key={idx} {...book} />
          ))}
        </div>
      </div>

      <div className='mt-8'>
        <h3>Read</h3>
        <div className='mt-4 flex w-full flex-wrap'>
          {[...favorites, ...completed].map((book: BookType, idx: number) => (
            <Book key={idx} {...book} />
          ))}
        </div>
      </div>

      <div className='mt-8'>
        <h3>Wishlist</h3>
        <div className='mt-4 flex w-full flex-wrap'>
          {wishing.map((book: BookType, idx: number) => (
            <Book key={idx} {...book} />
          ))}
        </div>
      </div>
    </main>
  </>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { books } = await readData<{ books: BookType[] }>('/public/data/books.json');

  return {
    props: {
      reading: books.filter(({ state }) => state === BookState.Reading),
      completed: books.filter(({ state }) => state === BookState.Completed),
      favorites: books.filter(({ state }) => state === BookState.Favorite),
      wishing: books.filter(({ state }) => state === BookState.Wish)
    },
    revalidate: 60 * 60
  };
};

export default Books;
