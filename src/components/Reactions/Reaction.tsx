import { Reaction as ReactionType } from '../../types';
import { ReactionEmoji } from '../../types/Reaction.type';
import { LoadingDots } from '../LoadingDots';

type Props = {
  reaction: ReactionType;
  emoji: ReactionEmoji;
  session: boolean;
  counter: number;
  react: (r: ReactionType) => void;
};
export const Reaction: React.FC<Props> = ({ reaction, emoji, session, counter, react }) => {
  return (
    <button
      className={`grasyscale flex items-center gap-x-2 rounded-2xl border px-3 py-1 text-lg transition-all hover:grayscale-0 disabled:grayscale-0 ${
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
      disabled={session}
      onClick={() => react(reaction)}
    >
      {emoji}
      {counter ? <span className='text-xs'>{counter}</span> : <LoadingDots />}
    </button>
  );
};
