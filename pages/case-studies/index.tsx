import type { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { CaseStudy } from '../../src/components';
import { CaseStudy as CaseStudyType } from '../../src/types';
import { PAGES } from '../../src/utils/constants';
import { getCaseStudies } from '../../src/utils/getCaseStudies';

type Props = { caseStudies: CaseStudyType[] };
const CaseStudies: NextPage<Props> = ({ caseStudies }) => {
  return (
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
          <div className='gap-y- flex flex-col gap-y-2'>
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
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const caseStudies = await getCaseStudies();
  const props: Props = { caseStudies };

  return { props };
};

export default CaseStudies;
