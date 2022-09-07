import { usePostLikes } from '../../hooks/usePostReactions';
import { Reaction as ReactionType } from '../../types';
import { ReactionEmoji } from '../../types/Reaction.type';
import { Reaction } from './Reaction';

const reactions: { reaction: ReactionType; emoji: ReactionEmoji }[] = [
  { reaction: 'likes', emoji: '👍' },
  { reaction: 'loves', emoji: '❤️' },
  { reaction: 'awards', emoji: '🏆' },
  { reaction: 'wows', emoji: '😲' }
];
export const Reactions: React.FC<{ slug: string }> = ({ slug }) => {
  const { counter, session, react } = usePostLikes(slug);

  return (
    <div className='flex gap-x-3'>
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
