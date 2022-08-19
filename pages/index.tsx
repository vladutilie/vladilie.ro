import type { NextPage } from 'next';
import Head from 'next/head';

import { FeaturedServices, Hero, Navbar, Projects } from '../src/components';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{[process.env.NEXT_PUBLIC_SITE_NAME, process.env.NEXT_PUBLIC_SITE_SUBTITLE].join(' - ')}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container mx-auto flex max-w-3xl flex-col gap-y-10 px-4'>
        <Hero />
        <FeaturedServices />
        <Projects />
      </main>
    </>
  );
};

export default Home;
