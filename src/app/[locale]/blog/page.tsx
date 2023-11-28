import { allPosts, type Post as PostType } from '@/../../.contentlayer/generated';

import { Post } from './ui/Post';
import { Search } from './ui/Search';
import { useTranslations } from 'next-intl';

export default function Blog() {
  const t = useTranslations('blog');

  return (
    <section className='container mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 md:py-32'>
      <div className='flex items-center justify-between gap-x-4'>
        <h1>Blog</h1>
        {/* <Search /> */}
      </div>

      {!allPosts.length ? (
        <div className='flex flex-col gap-y-4'>
          {allPosts.map((post: PostType, idx: number) => (
            <Post key={idx} {...post} />
          ))}
        </div>
      ) : (
        <p>{t('no-posts')}</p>
      )}
    </section>
  );
}
