import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getPathname } from '@/i18n/routing';
import { UpdateLocation } from './ui/update-location';
import { Hero } from './ui/home/hero';
import { ProofStrip } from './ui/home/proof-strip';
import { CaseStudies } from './ui/home/case-studies';
import { MoreWork } from './ui/home/more-work';
import { Services } from './ui/home/services';
import { Process } from './ui/home/process';
import { About } from './ui/home/about';
import { Contact } from './ui/home/contact';
import prisma from '@/lib/prisma';
import { getWeeklyCommits } from '@/lib/github';

export const dynamic = 'force-static';
// Revalidate the page cache to pick up the latest location and GitHub commits.
export const revalidate = 3600;

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
    return 'Cluj, RO';
  }

  return location.name;
};

export default async function Home() {
  const [location, commits] = await Promise.all([getLocation(), getWeeklyCommits()]);

  return (
    <main>
      <UpdateLocation />
      <Hero location={location} commits={commits} />
      <ProofStrip />
      <CaseStudies />
      <MoreWork />
      <Services />
      <Process />
      <About />
      <Contact />
    </main>
  );
}
