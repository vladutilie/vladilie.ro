'use client';

import { numberFormat } from 'src/utils/numberFormat';
import type { Reaction as ReactionT } from '@/hooks/usePostReactions';
import { LoadingDots } from '../loading-dots';

type Props = ReactionT & {
  session: boolean | undefined;
  counter: number | undefined;
  react: (r: ReactionT['reaction']) => void;
};

export const Reaction: React.FC<Props> = ({ reaction, emoji, session, counter, react }) => (
  <button
    className={`grasyscale flex items-center gap-x-2 rounded-2xl border px-2 text-lg transition-all hover:grayscale-0 disabled:grayscale-0 ${
      'likes' === reaction
        ? 'hover:border-amber-300 disabled:border-amber-300 disabled:bg-amber-300/25'
        : 'loves' === reaction
          ? 'hover:border-red-600 disabled:border-red-600 disabled:bg-red-600/25'
          : 'awards' === reaction
            ? 'hover:border-amber-900 disabled:border-amber-900 disabled:bg-amber-900/25'
            : 'wows' === reaction
              ? 'hover:border-blue-500 disabled:border-blue-500 disabled:bg-blue-500/25'
              : 'hover:border-gray-300'
    }`}
    disabled={!!session}
    onClick={() => react(reaction)}
  >
    {emoji}
    {'number' === typeof counter ? <span className='text-xs'>{numberFormat(counter)}</span> : <LoadingDots />}
  </button>
);
