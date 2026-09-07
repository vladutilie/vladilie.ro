import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { BoardgameModel as BoardgameT } from '@/../generated/prisma/models';

import { Duration, Players } from '@/icons';

export const Boardgame: React.FC<BoardgameT> = ({ age, blurData, duration, image, name, players, link }) => {
  const t = useTranslations('boardgames');

  return (
    <a
      href={link}
      className='group bg-surface hover:bg-hover-tint flex flex-col gap-4 p-5 transition-colors'
      target='_blank'
      rel='noreferrer'
    >
      <div className='flex items-start justify-between gap-3'>
        <h3 className="text-content group-hover:text-accent my-0 text-base leading-snug font-semibold transition-colors group-hover:after:content-['_↗']">
          {name}
        </h3>
        <span className='text-content/50 shrink-0 font-mono text-[11px] tracking-[0.08em] uppercase'>
          {t('age', { age })}
        </span>
      </div>

      <div className='relative h-24 w-full'>
        <Image
          alt={name}
          blurDataURL={`data:image/png,${blurData}`}
          className='object-contain'
          fill
          placeholder='blur'
          sizes='150px'
          src={image}
        />
      </div>

      <div className='border-hairline text-content/50 flex justify-between border-t pt-3 font-mono text-[11px]'>
        <span className='flex items-center gap-x-2'>
          <Players className='w-4 fill-current' /> {players}
        </span>
        <span className='flex items-center gap-x-2'>
          <Duration className='w-4 fill-current' /> {duration}&quot;
        </span>
      </div>
    </a>
  );
};
