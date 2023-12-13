'use client';

import { usePostLikes } from '@/hooks/usePostReactions';
import type { Reaction as ReactionT } from '@/hooks/usePostReactions';
import { Reaction } from './reaction';

const reactions: ReactionT[] = [
  { reaction: 'likes', emoji: '👍' },
  { reaction: 'loves', emoji: '❤️' },
  { reaction: 'awards', emoji: '🏆' },
  { reaction: 'wows', emoji: '😲' }
];

export const Reactions: React.FC<{ slug: string }> = ({ slug }) => {
  const { counter, session, react } = usePostLikes(slug);

  return (
    <div className='flex flex-wrap gap-3'>
      {reactions.map(({ reaction, emoji }) => (
        <Reaction
          key={reaction}
          reaction={reaction}
          emoji={emoji}
          session={session?.[reaction]}
          counter={counter?.[reaction]}
          react={react}
        />
      ))}
    </div>
  );
};
