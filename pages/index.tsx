import type { NextPage } from 'next';
import Head from 'next/head';

import { FeaturedServices, Hero, Navbar, Projects } from '../src/components';

const Home: NextPage = () => (
  <>
    <Head>
      <title>{[process.env.NEXT_PUBLIC_SITE_NAME, process.env.NEXT_PUBLIC_SITE_SUBTITLE].join(' - ')}</title>
    </Head>

    <main className='container mx-auto flex max-w-3xl flex-col gap-y-10 px-4'>
      <Hero />
      <FeaturedServices />
      <Projects />
    </main>
  </>
);

export default Home;
