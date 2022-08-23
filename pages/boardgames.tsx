import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { Boardgame } from '../src/components';
import { Boardgame as BoardgameType, BoardgameState } from '../src/types/Boardgame.type';
import { readData } from '../src/utils/readData';

type Props = {
  boardgames: BoardgameType[];
  categories: string[];
};

const Boardgames: NextPage<Props> = ({ boardgames, categories }) => {
  const [activeCat, setActiveCat] = useState<string>();
  const [bgList, setBgList] = useState<BoardgameType[]>(boardgames);
  const [listItems, setListItems] = useState<{ own: boolean; wish: boolean }>({ own: true, wish: true });

  useEffect(() => {
    setListItems({
      own: boardgames.some(
        (bg) => bg.state === BoardgameState.Own && (activeCat ? bg.tags.includes(activeCat as string) : true)
      ),
      wish: boardgames.some(
        (bg) => bg.state === BoardgameState.Wish && (activeCat ? bg.tags.includes(activeCat as string) : true)
      )
    });
  }, [boardgames, activeCat]);

  const filterBoardgames = (tag?: string) => {
    if (tag) {
      setBgList(boardgames.filter(({ tags }) => tags.includes(tag)));
    } else {
      setBgList(boardgames);
    }
    setActiveCat(tag as string);
  };

  return (
    <>
      <Head>
        <title>{[process.env.NEXT_PUBLIC_SITE_NAME, 'Tools'].join(' - ')}</title>
      </Head>

      <main className='container mx-auto flex max-w-3xl flex-col gap-y-8 px-4'>
        <div className='flex flex-col gap-y-3'>
          <h2>Board games</h2>
          <p>
            Beyond learning and working, I also ensure myself fun experiences. Here are my board games I play with
            friends.
          </p>
        </div>

        <div className='flex w-full flex-wrap gap-2'>
          <button
            className={`rounded-md px-2 py-1 text-xs font-semibold uppercase ${
              !activeCat ? 'bg-blue-500 text-white' : 'text-blue-500'
            }`}
            onClick={() => filterBoardgames()}
          >
            All
          </button>
          {categories.map((cat: string, idx: number) => (
            <button
              key={idx}
              className={`rounded-md px-2 py-1 text-xs font-semibold uppercase ${
                activeCat === cat ? 'bg-blue-500 text-white' : 'text-blue-500'
              }`}
              onClick={() => filterBoardgames(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {listItems.own && (
          <div className='flex flex-wrap'>
            <h3 className='basis-full'>Own</h3>
            {bgList
              .filter((bg) => bg.state === BoardgameState.Own)
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((boardgame: BoardgameType, idx: number) => (
                <Boardgame {...boardgame} key={idx} />
              ))}
          </div>
        )}

        {listItems.wish && (
          <div className='flex flex-wrap'>
            <h3 className='basis-full'>Wishlist</h3>
            {bgList
              .filter((bg) => bg.state === BoardgameState.Wish)
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((boardgame: BoardgameType, idx: number) => (
                <Boardgame {...boardgame} key={idx} />
              ))}
          </div>
        )}
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { boardgames } = await readData<{ boardgames: BoardgameType[] }>('/public/data/boardgames.json');

  let categories: string[] = [];

  boardgames.forEach((boardgame: BoardgameType) => {
    categories = [...new Set([...categories, ...boardgame.tags])];
  });

  return { props: { boardgames, categories } };
};

export default Boardgames;
