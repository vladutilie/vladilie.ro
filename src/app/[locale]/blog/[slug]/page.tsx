import { notFound } from 'next/navigation';
import Image from 'next/image';
import { allPosts, type Post } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { PostMeta } from '../../ui/post-meta';
import { Reactions } from '../../ui/reactions';

export default function Post({ params: { slug, locale } }: { params: { slug: string; locale: string } }) {
  const post = allPosts.find((post: Post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <section className='container mx-auto max-w-4xl px-4 py-16 md:py-32'>
      <div className='flex flex-col gap-y-4'>
        <div className='relative h-96 w-full'>
          <Image
            alt={post.title}
            blurDataURL={post.blurDataImage}
            className='rounded-md border object-cover'
            fill
            placeholder='blur'
            src={post.featuredImage}
          />
        </div>

        <h1 className='text-4xl'>{post.title}</h1>

        <div className='flex flex-col items-center justify-between md:flex-row'>
          <Reactions slug={slug} />
          <PostMeta date={post.date} readingTime={post.readingTime} slug={slug} />
        </div>
      </div>

      <MDXContent />
    </section>
  );
}
