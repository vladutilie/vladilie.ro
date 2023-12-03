import { Boardgame, BoardgameState } from '@prisma/client';
import { getTranslations } from 'next-intl/server';

import prisma from '@/utils/prisma';
import { readData } from '@/utils/readData';
import { Categories } from './ui/categories';
import { List } from './ui/list';

const seedBoardgames = async () => {
  type BoardgameType = {
    age: string;
    blurDataUrl: string;
    duration: string;
    image: string;
    name: string;
    players: string;
    state: string;
    tags: string[];
    link: string;
  };

  const { boardgames } = await readData<{ boardgames: BoardgameType[] }>('/public/data/boardgames.json');

  // TODO: install plaiceholder to generate the blur data for images.
  await prisma.boardgame.createMany({
    data: boardgames.map(({ blurDataUrl, tags, state, ...boardgame }) => ({
      ...boardgame,
      blurData: blurDataUrl,
      state: 'Wish' === state ? BoardgameState.Wishlist : BoardgameState.Own,
      tags: tags.toString()
    }))
  });
};

const getBoardgames = async () => {
  const boardgames = await prisma.boardgame.findMany();
  let categories: string[] = [];

  boardgames.forEach((boardgame: Boardgame) => {
    categories = [...new Set([...categories, ...boardgame.tags.split(',')])];
  });

  return { boardgames, categories };
};

export default async function Boardgames() {
  //   await seedBoardgames();
  const t = await getTranslations('boardgames');
  const { boardgames, categories } = await getBoardgames();

  return (
    <main className='container mx-auto max-w-7xl gap-8 px-4 py-20 md:py-32'>
      <h2>{t('title')}</h2>
      <p>{t('description')}</p>

      <Categories list={categories} />

      <List list={boardgames} />
    </main>
  );
}
