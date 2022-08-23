import Image from 'next/image';
import Link from 'next/link';

import { Boardgame as BoardgameType } from '../types/Boardgame.type';
import { Duration, Players } from '../icons';

export const Boardgame: React.FC<BoardgameType> = ({ age, blurDataUrl, duration, image, name, players, link }) => (
  <Link href={link}>
    <a className='h-52 w-full p-2 transition-transform hover:scale-105 md:w-1/3' target='_blank'>
      <div className='flex h-full flex-col gap-y-4 rounded-md bg-white'>
        <div className='flex h-12 items-center justify-between rounded-t-md bg-gray-200 px-2'>
          <h3 className='w-4/6 text-sm'>{name.length > 34 ? `${name.slice(0, 34)}...` : name}</h3>
          <span className='w-2/6 text-right'>Age: {age}</span>
        </div>

        <div className='relative h-20 w-full'>
          <Image
            alt={name}
            blurDataURL={`data:image/png,${blurDataUrl}`}
            layout='fill'
            objectFit='contain'
            placeholder='blur'
            src={image}
          />
        </div>

        <div className='flex justify-between px-2'>
          <span className='flex w-1/2 items-center gap-x-2'>
            <Players className='w-5 fill-gray-500' /> {players}
          </span>
          <span className='flex w-1/2 items-center justify-end gap-x-2'>
            <Duration className='w-5 fill-gray-500' /> {duration}&quot;
          </span>
        </div>
      </div>
    </a>
  </Link>
);
