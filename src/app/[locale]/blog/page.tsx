import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { getPathname } from '@/navigation';
import { allPosts, type Post as PostType } from 'contentlayer/generated';

import { PostCard } from './ui/post-card';
import { Search } from './ui/Search';

export async function generateMetadata({ params: { locale } }: { params: { locale: 'en' | 'ro' } }): Promise<Metadata> {
  const t = await getTranslations('blog');
  const commonFields = { title: t('title'), description: t('metadata.description') };

  return {
    ...commonFields,
    keywords: t('metadata.keywords'),
    openGraph: {
      ...commonFields,
      url: getPathname({ href: '/blog', locale }),
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      images: [{ url: '/images/social-card.png', width: 1200, height: 630 }],
      locale,
      type: 'website'
    },
    twitter: {
      ...commonFields,
      card: 'summary_large_image',
      creator: '@vladilie94',
      creatorId: '66733656',
      images: ['/images/social-card.png']
    }
  };
}

export default function Blog({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('blog');
  const posts = allPosts.filter(({ locale: l }) => l === locale);

  return (
    <main className='container mx-auto flex max-w-7xl flex-col gap-8 px-4 py-20 md:py-32'>
      <div className='flex items-center justify-between gap-x-4'>
        <h1>Blog</h1>
        {/* <Search /> */}
      </div>

      {posts.length ? (
        <ul className='flex flex-col gap-y-4'>
          {posts.map((post: PostType, idx: number) => (
            <PostCard key={idx} {...post} />
          ))}
        </ul>
      ) : (
        <p>{t('no-posts')}</p>
      )}
    </main>
  );
}
