import type { GetStaticProps, NextPage } from 'next';

import { FeaturedServices, Hero, Projects } from '../src/components';
import { Project, Technology } from '../src/types';
import { readData } from '../src/utils/readData';

type Props = { projects: Project[]; technologies: Technology[] };
const Home: NextPage<Props> = ({ projects, technologies }) => (
  <main className='container mx-auto flex max-w-3xl flex-col gap-y-10 px-4'>
    <Hero />
    <FeaturedServices />
    <Projects projects={projects} technologies={technologies} />
  </main>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { projects } = await readData<Props>('/public/data/projects.json');
  const { technologies } = await readData<Props>('/public/data/technologies.json');

  return {
    props: {
      projects: projects.sort((a: Project, b: Project) => (a.name > b.name ? 1 : -1)),
      technologies: technologies.sort((a: Technology, b: Technology) => (a.name > b.name ? 1 : -1))
    }
  };
};

export default Home;
