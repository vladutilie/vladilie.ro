import { allPosts, type Post as PostType } from '@/../.contentlayer/generated';

import { PostCard } from './ui/post-card';
import { Search } from './ui/Search';
import { useTranslations } from 'next-intl';

export default function Blog() {
  const t = useTranslations('blog');

  // TODO: Filter posts by locale.
  return (
    <main className='container mx-auto flex max-w-7xl flex-col gap-8 px-4 py-20 md:py-32'>
      <div className='flex items-center justify-between gap-x-4'>
        <h1>Blog</h1>
        {/* <Search /> */}
      </div>

      {allPosts.length ? (
        <ul className='flex flex-col gap-y-4'>
          {allPosts.map((post: PostType, idx: number) => (
            <PostCard key={idx} {...post} />
          ))}
        </ul>
      ) : (
        <p>{t('no-posts')}</p>
      )}
    </main>
  );
}
