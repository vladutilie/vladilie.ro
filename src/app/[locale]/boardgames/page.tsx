import { Metadata } from 'next';
import { Boardgame } from '@prisma/client';
import { getTranslations } from 'next-intl/server';

import { getPathname } from '@/i18n/routing';
import prisma from '@/lib/prisma';
import { Categories } from './ui/categories';
import { List } from './ui/list';

export async function generateMetadata({ params: { locale } }: { params: { locale: 'en' | 'ro' } }): Promise<Metadata> {
  const t = await getTranslations('boardgames');
  const commonFields = { title: t('title'), description: t('description') };

  return {
    alternates: { canonical: ('ro' === locale ? '/ro/' : '') + getPathname({ locale, href: '/boardgames' }) },
    ...commonFields,
    keywords: t('metadata.keywords'),
    openGraph: {
      ...commonFields,
      url: getPathname({ href: '/boardgames', locale }),
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

const getBoardgames = async () => {
  const boardgames = await prisma.boardgame.findMany();
  let categories: string[] = [];

  boardgames.forEach((boardgame: Boardgame) => {
    categories = [...new Set([...categories, ...boardgame.tags.split(',')])];
  });

  return { boardgames, categories };
};

export default async function Boardgames() {
  const t = await getTranslations('boardgames');
  const { boardgames, categories } = await getBoardgames();

  return (
    <main className='container mx-auto max-w-7xl gap-8 px-4 py-20 md:py-32'>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>

      <Categories list={categories} />

      <List list={boardgames} />
    </main>
  );
}
