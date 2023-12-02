import { Hero } from './ui/hero';
import { About } from './ui/about';
import { Education } from './ui/education/';
import { Experience } from './ui/experience';
import { Projects } from './ui/projects';
import { SoftwareLocalization } from './ui/sw-l10n';

import prisma from '@/utils/prisma';

const getLocation = async (): Promise<string> => {
  const location = await prisma.location.findFirst({ orderBy: { lastVisitAt: 'desc' }, take: 1 });

  if (!location) {
    return 'Cluj-Napoca, CJ, RO';
  }

  return location.name;
};

export default async function Home() {
  const location = await getLocation();

  return (
    <>
      <Hero location={location} />
      <About />
      <Education />
      <Experience />
      <Projects />
      <SoftwareLocalization />
    </>
  );
}
