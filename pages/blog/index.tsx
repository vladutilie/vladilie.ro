import { NextPage, type GetStaticProps } from 'next';
import { NextSeo, BreadcrumbJsonLd } from 'next-seo';

import { Post } from 'src/components';
import { PAGES } from 'src/utils/constants';
import { allPosts, type Post as PostType } from '../../.contentlayer/generated';

type Props = { posts: PostType[] };
const Posts: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <NextSeo
        title={[process.env.NEXT_PUBLIC_SITE_NAME, PAGES.BLOG?.label].join(' - ')}
        description='Blog posts about technologies I work and challenges I face with.'
      />
      <BreadcrumbJsonLd itemListElements={[{ position: 1, name: PAGES.BLOG?.label }]} />

      <main className='container mx-auto flex max-w-3xl flex-col gap-y-8 px-4 pt-28'>
        <div className='flex flex-col gap-y-3'>
          <h2>Blog</h2>
        </div>

        {posts.length ? (
          <div className='flex flex-col gap-y-2'>
            {posts.map((post: PostType, idx: number) => (
              <Post key={idx} {...post} />
            ))}
          </div>
        ) : (
          <p>There are no blog posts for now. Stay close.</p>
        )}
      </main>
    </>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps<Props> = () => {
  return { props: { posts: allPosts } };
};
