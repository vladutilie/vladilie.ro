import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';
import readingTime from 'reading-time';

import { CaseStudy } from '../../src/types';
import { getCaseStudies } from '../../src/utils/getCaseStudies';
import { readCaseStudy } from '../../src/utils/readCaseStudy';
import { MDXComponents } from '../../src/components/MDXComponents';
import { PAGES } from '../../src/utils/constants';
import { PostMeta } from '../../src/components';
import { Reactions } from '../../src/components/Reactions';

type Props = CaseStudy & { source: MDXRemoteSerializeResult };

const CaseStudy: React.FC<Props> = ({ title, description, date, source, readingTime, slug }) => {
  return (
    <>
      <NextSeo
        title={[process.env.NEXT_PUBLIC_SITE_NAME, PAGES.CASE_STUDIES?.label, title].join(' - ')}
        description={description}
      />

      <main className='container mx-auto flex max-w-3xl flex-col gap-y-8 px-4 pt-28'>
        <div className='flex flex-col gap-y-3'>
          <h1>
            {' '}
            <Link href='/case-studies'>
              <a>Case studies</a>
            </Link>{' '}
            &gt; {title}
          </h1>
          <PostMeta date={date} readingTime={readingTime} slug={slug} />
          <Reactions slug={slug} />
        </div>

        <MDXRemote {...source} components={MDXComponents} />
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCaseStudies();

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
