import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import { FeaturedServices, Hero, Projects } from '../src/components';
import { Project, Technology } from '../src/types';
import { readData } from '../src/utils/readData';

type Props = {
  projects: Project[];
  technologies: Technology[];
};
const Home: NextPage<Props> = ({ projects, technologies }) => (
  <>
    <Head>
      <title>{[process.env.NEXT_PUBLIC_SITE_NAME, process.env.NEXT_PUBLIC_SITE_SUBTITLE].join(' - ')}</title>
    </Head>

    <main className='container mx-auto flex max-w-3xl flex-col gap-y-10 px-4'>
      <Hero />
      <FeaturedServices />
      <Projects projects={projects} technologies={technologies} />
    </main>
  </>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { projects } = await readData<Props>('/public/data/projects.json');
  const { technologies } = await readData<Props>('/public/data/technologies.json');
  console.log(technologies);

  return {
    props: {
      projects: projects.sort((a: Project, b: Project) => (a.name > b.name ? 1 : -1)),
      technologies: technologies.sort((a: Technology, b: Technology) => (a.name > b.name ? 1 : -1))
    }
  };
};

export default Home;
