import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { format } from 'timeago.js';

import { CaseStudy } from '../../src/types';
import { getCaseStudy } from '../../src/utils/getCaseStudy';
import { readCaseStudy } from '../../src/utils/readCaseStudy';
import { MDXComponents } from '../../src/components/MDXComponents';

type Props = CaseStudy & {
  source: MDXRemoteSerializeResult;
};

const CaseStudy: React.FC<Props> = ({ title, description, date, source, readingTime }) => {
  return (
    <>
      <Head>
        <title>{[process.env.NEXT_PUBLIC_SITE_NAME, 'Case study', title].join(' - ')}</title>
      </Head>

      <main className='container mx-auto flex max-w-3xl flex-col gap-y-8 px-4'>
        <div className='flex flex-col gap-y-3'>
          <h1>{title}</h1>
          <span>
            {format(date)} &bull; {readingTime}
          </span>
        </div>

        <MDXRemote {...source} components={MDXComponents} />
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCaseStudy();

  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;

  const postContent = await readCaseStudy(slug);
  const {
    content,
    data: { title, description, date }
  } = matter(postContent);

  return {
    props: {
      source: await serialize(content),
      readingTime: readingTime(content).text,
      title,
      description,
      date,
      slug
    }
  };
};

export default CaseStudy;
