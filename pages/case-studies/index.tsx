import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import { CaseStudy } from '../../src/components';
import { CaseStudy as CaseStudyType } from '../../src/types';
import { getCaseStudies } from '../../src/utils/getCaseStudies';

type Props = { caseStudies: CaseStudyType[] };

const CaseStudies: NextPage<Props> = ({ caseStudies }) => {
  return (
    <>
      <Head>
        <title>{[process.env.NEXT_PUBLIC_SITE_NAME, 'Case studies'].join(' - ')}</title>
      </Head>

      <main className='container mx-auto flex max-w-3xl flex-col gap-y-8 px-4'>
        <div className='flex flex-col gap-y-3'>
          <h2>Case studies</h2>
        </div>

        <div className='gap-y- flex flex-col gap-y-2'>
          {caseStudies.map((caseStudy: CaseStudyType, idx: number) => (
            <CaseStudy key={idx} {...caseStudy} />
          ))}
        </div>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const caseStudies = await getCaseStudies();
  const props: Props = { caseStudies: [...caseStudies, ...caseStudies] };

  return { props };
};

export default CaseStudies;
