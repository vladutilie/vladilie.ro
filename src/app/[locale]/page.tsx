import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Octokit } from '@octokit/rest';

import { getPathname } from '@/i18n/routing';
import { UpdateLocation } from './ui/update-location';
import { Hero } from './ui/hero';
import { About } from './ui/about';
import { Education } from './ui/education/';
import { Experience } from './ui/experience';
import { Projects } from './ui/projects';
import { SoftwareLocalization } from './ui/sw-l10n';
import prisma from '@/lib/prisma';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'ro' }> }): Promise<Metadata> {
  const { locale } = await params;
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
  const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN });

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  try {
    const { data: repos } = await octokit.repos.listForAuthenticatedUser({
      username: new URL(process.env.NEXT_PUBLIC_GITHUB!).pathname.split('/')[1],
      sort: 'updated',
      per_page: 10
    });

    let totalCommits = 0;

    for (const repo of repos) {
      try {
        const { data: commits } = await octokit.repos.listCommits({
          owner: repo.full_name.split('/')[0],
          repo: repo.name,
          since: oneWeekAgo.toISOString(),
          per_page: 100
        });

        totalCommits += commits.length;
      } catch (error: any) {
        if (error.status !== 409) {
          console.log(`getCommits() repository ${repo.name} error: ${error.message}`);
        }
      }
    }

    return totalCommits;
  } catch (error: any) {
    console.error(`getCommits() error: ${error.message}`);

    return 0;
  }
};

export default async function Home() {
  const [location, totalCommits] = await Promise.all([getLocation(), getCommits()]);

  return (
    <>
      <UpdateLocation />
      <Hero location={location} commits={totalCommits} />
      <About />
      <Education />
      <Experience />
      <Projects />
      <SoftwareLocalization />
    </>
  );
}
