import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import { FeaturedServices, Hero, Projects, Technologies } from '../components';
import { Project, Technology } from '../types';
import { readData } from '../utils/readData';

type Props = { projects: Project[]; technologies: Technology[] };
const Home: NextPage<Props> = ({ projects, technologies }) => (
  <>
    <Head>
      <meta name='google-site-verification' content='Skw9d5BjwW9jYkVIi4YMMU4Hr5a_9GiCRKWflaKhOFo' />
    </Head>

    <main className='container mx-auto flex max-w-3xl flex-col gap-y-10 px-4 pt-28'>
      <Hero />
      <FeaturedServices />
      <Projects projects={projects} />
      <Technologies technologies={technologies} />
    </main>
  </>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { projects } = await readData<Props>('/public/data/projects.json');
  const { technologies } = await readData<Props>('/public/data/technologies.json');

  return {
    props: {
      projects: projects.sort((a: Project, b: Project) => (a.name > b.name ? 1 : -1)),
      technologies: technologies
    }
  };
};

export default Home;
