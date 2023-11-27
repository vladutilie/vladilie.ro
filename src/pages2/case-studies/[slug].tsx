import { GetStaticProps } from 'next';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { PAGES } from '../../utils/constants';
import { PostMeta } from '../../components';
import { Reactions } from '../../components/Reactions';
import { allProjects, Project } from 'contentlayer/generated';

const CaseStudy: React.FC<Project> = ({ title, description, body, date, slug, readingTime }) => {
  const MDXContent = useMDXComponent(body.code);

  return (
    <>
      <NextSeo
        title={[process.env.NEXT_PUBLIC_SITE_NAME, PAGES.CASE_STUDIES?.label, title].join(' - ')}
        description={description}
      />
      <ArticleJsonLd
        type='Article'
        url={`${process.env.NEXT_PUBLIC_SITE_URL}/case-studies/${slug}`}
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
        </div>

        <MDXContent />
      </main>
    </>
  );
};

export const getStaticPaths = () => ({
  paths: allProjects.map((caseStudy: Project) => ({ params: { slug: caseStudy.slug } })),
  fallback: false
});

export const getStaticProps: GetStaticProps = ({ params }) => {
  const caseStudies = allProjects.find((caseStudy: Project) => caseStudy.slug === params?.slug);

  if (!caseStudies) {
    return { notFound: true };
  }

  return { props: { ...caseStudies } };
};

export default CaseStudy;
