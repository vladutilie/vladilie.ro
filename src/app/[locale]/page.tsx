import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getPathname } from '@/navigation';

import { Hero } from './ui/hero';
import { About } from './ui/about';
import { Education } from './ui/education/';
import { Experience } from './ui/experience';
import { Projects } from './ui/projects';
import { SoftwareLocalization } from './ui/sw-l10n';
import prisma from '@/utils/prisma';

export async function generateMetadata({ params: { locale } }: { params: { locale: 'en' | 'ro' } }): Promise<Metadata> {
  const t = await getTranslations('homepage.metadata');
  const commonFields = { title: `${process.env.NEXT_PUBLIC_SITE_NAME} | ${t('title')}`, description: t('description') };

  return {
    ...commonFields,
    keywords: t('keywords'),
    openGraph: {
      ...commonFields,
      url: getPathname({ href: '/', locale }),
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      images: [{ url: '/images/social-card.png', width: 1200, height: 630 }],
      locale,
      type: 'website'
    },
    twitter: {
      ...commonFields,
      card: 'summary_large_image',
      creator: '@vladilie94',
      creatorId: '66733656',
      images: ['/images/social-card.png']
    }
  };
}

const getLocation = async (): Promise<string> => {
  const location = await prisma.location.findFirst({ orderBy: { lastVisitAt: 'desc' }, take: 1 });

  if (!location) {
    return 'Cluj-Napoca, CJ, RO';
  }

  return location.name;
};

const getCommits = async (): Promise<number> => {
  if ('production' !== process.env.NEXT_PUBLIC_VERCEL_ENV) {
    return Math.floor(Math.random() * 50);
  }

  const apiUrl = `https://api.github.com/users/vladutilie/events?per_page=100`;
  const res = await fetch(apiUrl, { next: { revalidate: 3600 } });

  if (!res.ok) {
    console.error('Failed to fetch GitHub commits.');

    return 0;
  }

  const data = await res.json();

  const commitEvents = data.filter((event: { created_at: string; type: string }) => {
    const createdAt = new Date(event.created_at);
    const ago7days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    return event.type === 'PushEvent' && createdAt >= ago7days;
  });

  const totalCommits: number = commitEvents.reduce(
    (total: number, event: { payload: { commits: { author: { email: string } }[] } }) => {
      const commits = event.payload.commits.filter((commit) => process.env.GITHUB_EMAIL === commit.author.email);

      return total + commits.length;
    },
    0
  );

  return totalCommits;
};

export default async function Home() {
  const [location, commits] = await Promise.all([getLocation(), getCommits()]);

  return (
    <>
      <Hero location={location} commits={commits} />
      <About />
      <Education />
      <Experience />
      <Projects />
      <SoftwareLocalization />
    </>
  );
}
