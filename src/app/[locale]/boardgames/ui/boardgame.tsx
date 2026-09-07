import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { BoardgameModel as BoardgameT } from '@/../generated/prisma/models';

import { Duration, Players } from '@/icons';

export const Boardgame: React.FC<BoardgameT> = ({ age, blurData, duration, image, name, players, link }) => {
  const t = useTranslations('boardgames');

  return (
    <a
      href={link}
      className='group col-span-12 h-52 p-2 transition-transform hover:scale-105 sm:col-span-6 lg:col-span-4 xl:col-span-3'
      target='_blank'
    >
      <div className='bg-surface-raised flex h-full flex-col gap-y-4 rounded-md'>
        <div className='bg-hover-tint dark:bg-surface-raised flex h-12 items-center justify-between rounded-t-md px-2'>
          <h4 className="text-content/70 w-4/6 text-sm group-hover:text-blue-500 group-hover:after:inline-block group-hover:after:content-['_↗']">
            {name.length > 34 ? `${name.slice(0, 34)}...` : name}
          </h4>
          <span className='text-content/60 w-2/6 text-right text-sm'>{t('age', { age })}</span>
        </div>

        <div className='relative h-20 w-full'>
          <Image
            alt={name}
            blurDataURL={`data:image/png,${blurData}`}
            className='object-contain'
            fill
            placeholder='blur'
            sizes='100px'
            src={image}
          />
        </div>

        <div className='flex justify-between px-2'>
          <span className='text-content/60 flex w-1/2 items-center gap-x-2'>
            <Players className='w-5 fill-gray-500' /> {players}
          </span>
          <span className='text-content/60 flex w-1/2 items-center justify-end gap-x-2'>
            <Duration className='w-5 fill-gray-500' /> {duration}&quot;
          </span>
        </div>
      </div>
    </a>
  );
};
