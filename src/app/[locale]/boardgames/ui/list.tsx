'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { BoardgameModel as BoardgameT } from '@/../generated/prisma/models';
import { BoardgameState } from '@/../generated/prisma/enums';

import { Boardgame } from './boardgame';
import { GroupHeading } from '../../ui/page-header';

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

  const group = (state: BoardgameState): BoardgameT[] =>
    boardgames.filter((bg) => bg.state === state).sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <div className='grid gap-14'>
      {ownLength > 0 && (
        <section>
          <GroupHeading>{t('own', { count: ownLength })}</GroupHeading>

          <div className='border-hairline bg-hairline grid grid-cols-1 gap-px border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {group(BoardgameState.Own).map((boardgame: BoardgameT) => (
              <Boardgame {...boardgame} key={boardgame.id} />
            ))}
          </div>
        </section>
      )}

      {wishLength > 0 && (
        <section>
          <GroupHeading>{t('wishlist', { count: wishLength })}</GroupHeading>

          <div className='border-hairline bg-hairline grid grid-cols-1 gap-px border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {group(BoardgameState.Wishlist).map((boardgame: BoardgameT) => (
              <Boardgame {...boardgame} key={boardgame.id} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
