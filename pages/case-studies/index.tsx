import type { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { CaseStudy } from '../../src/components';
import { PAGES } from '../../src/utils/constants';
import { allCaseStudies, type CaseStudy as CaseStudyType } from '../../.contentlayer/generated';

type Props = { caseStudies: CaseStudyType[] };
const CaseStudies: NextPage<Props> = ({ caseStudies }) => (
  <>
    <NextSeo
      title={[process.env.NEXT_PUBLIC_SITE_NAME, PAGES.CASE_STUDIES?.label].join(' - ')}
      description='The case studies about my work.'
    />

    <main className='container mx-auto flex max-w-3xl flex-col gap-y-8 px-4 pt-28'>
      <div className='flex flex-col gap-y-3'>
        <h2>Case studies</h2>
      </div>

      {caseStudies.length ? (
        <div className='flex flex-col gap-y-2'>
          {caseStudies.map((caseStudy: CaseStudyType, idx: number) => (
            <CaseStudy key={idx} {...caseStudy} />
          ))}
        </div>
      ) : (
        <p>There are no Case studies for now. Stay close.</p>
      )}
    </main>
  </>
);

export default CaseStudies;

export const getStaticProps: GetStaticProps<Props> = () => {
  return { props: { caseStudies: allCaseStudies } };
};
