import type { NextPage } from 'next';
import Head from 'next/head';

const Tools: NextPage = () => (
  <>
    <Head>
      <title>{[process.env.NEXT_PUBLIC_SITE_NAME, 'Tools'].join(' - ')}</title>
    </Head>

    <main className='container mx-auto flex max-w-3xl flex-col gap-y-10 px-4'></main>
  </>
);

export default Tools;
