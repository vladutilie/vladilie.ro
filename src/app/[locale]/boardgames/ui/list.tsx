'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type Boardgame as BoardgameT, BoardgameState } from '@prisma/client';

import { Boardgame } from './boardgame';

export const List: React.FC<{ list: BoardgameT[] }> = ({ list }) => {
  const t = useTranslations('boardgames');
  const params = useSearchParams();

  const boardgames = useMemo(() => {
    const cat = params.get('cat');
    if (!cat) {
      return list;
    }

    return list.filter(({ tags }) => tags.includes(cat as string));
  }, [list, params]);

  const ownLength: number = boardgames.filter((bg) => bg.state === BoardgameState.Own).length;
  const wishLength: number = boardgames.filter((bg) => bg.state === BoardgameState.Wishlist).length;

  return (
    <>
      {ownLength > 0 && (
        <div className='grid grid-cols-12 gap-4'>
          <h3 className='col-span-12 text-2xl'>{t('own', { count: ownLength })}</h3>
          {boardgames
            .filter((bg) => bg.state === BoardgameState.Own)
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((boardgame: BoardgameT) => (
              <Boardgame {...boardgame} key={boardgame.id} />
            ))}
        </div>
      )}

      {wishLength > 0 && (
        <div className='grid grid-cols-12 gap-4'>
          <h3 className='col-span-12 text-2xl'>{t('wishlist', { count: wishLength })}</h3>
          {boardgames
            .filter((bg) => bg.state === BoardgameState.Wishlist)
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((boardgame: BoardgameT) => (
              <Boardgame {...boardgame} key={boardgame.id} />
            ))}
        </div>
      )}
    </>
  );
};
