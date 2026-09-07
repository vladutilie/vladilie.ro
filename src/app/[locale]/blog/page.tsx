import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { allPosts } from '@/lib/content';
import type { Post as PostType } from '@/lib/content.types';

import { getPathname } from '@/i18n/routing';
import { PostCard } from './ui/post-card';
import { Search } from './ui/Search';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'ro' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('blog');
  const commonFields = { title: t('title'), description: t('metadata.description') };

  return {
    alternates: { canonical: ('ro' === locale ? '/ro/' : '') + getPathname({ locale, href: '/blog' }) },
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

export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('blog');
  const posts = allPosts().filter(({ locale: l }) => l === locale);

  return (
    <main className='mx-auto flex max-w-[1180px] flex-col gap-8 px-5 py-16 md:px-8 md:py-24'>
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
