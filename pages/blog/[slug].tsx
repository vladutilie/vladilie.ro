import { NextPage, type GetStaticProps } from 'next';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { allPosts, type Post } from '../../.contentlayer/generated';
import { PAGES } from 'src/utils/constants';
import { PostMeta, Reactions } from 'src/components';

const BlogPost: NextPage<Post> = ({ title, description, body, date, slug, readingTime }) => {
  const MDXContent = useMDXComponent(body.code);

  return (
    <>
      <NextSeo
        title={[process.env.NEXT_PUBLIC_SITE_NAME, PAGES.BLOG?.label, title].join(' - ')}
        description={description}
      />
      <ArticleJsonLd
        type='Blog'
        url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`}
        title={title}
        images={[]}
        datePublished={date}
        authorName={process.env.NEXT_PUBLIC_SITE_NAME}
        description={description}
      />

      <main className='container mx-auto flex max-w-3xl flex-col gap-y-8 px-4 pt-28'>
        <div className='flex flex-col gap-y-3'>
          <h1>{title}</h1>
          <PostMeta date={date} readingTime={readingTime} slug={slug} />
          <Reactions slug={slug} />

          <MDXContent />
        </div>
      </main>
    </>
  );
};

export const getStaticPaths = () => ({
  paths: allPosts.map((post: Post) => ({ params: { slug: post.slug } })),
  fallback: false
});

export const getStaticProps: GetStaticProps = ({ params }) => {
  const post = allPosts.find((post: Post) => post.slug === params?.slug);

  if (!post) {
    return { notFound: true };
  }

  return { props: { ...post } };
};

export default BlogPost;
