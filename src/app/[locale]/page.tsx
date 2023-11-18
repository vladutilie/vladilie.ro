import prisma from '@/utils/prisma';
import { Hero } from './ui/hero';
import { About } from './ui/about';

const getLocation = async (): Promise<string> => {
  const location = await prisma.locations.findFirst({
    orderBy: { lastVisitAt: 'desc' },
    take: 1
  });

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
    </>
  );
}
