import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { BoardgameModel as BoardgameT } from '@/../generated/prisma/models';

import { Duration, Players } from '@/icons';

export const Boardgame: React.FC<BoardgameT> = ({ age, blurData, duration, image, name, players, link }) => {
  const t = useTranslations('boardgames');

  return (
    <a
      href={link}
      className='group flex flex-col gap-4 bg-surface p-5 transition-colors hover:bg-hover-tint'
      target='_blank'
      rel='noreferrer'
    >
      <div className='flex items-start justify-between gap-3'>
        <h3 className="my-0 text-base leading-snug font-semibold text-content transition-colors group-hover:text-accent group-hover:after:content-['_↗']">
          {name}
        </h3>
        <span className='shrink-0 font-mono text-[11px] tracking-[0.08em] text-content/50 uppercase'>
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

      <div className='flex justify-between border-t border-hairline pt-3 font-mono text-[11px] text-content/50'>
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
