import { Metadata } from 'next';
import type { BoardgameModel as Boardgame } from '@/../generated/prisma/models';
import { getTranslations } from 'next-intl/server';

import { getPathname } from '@/i18n/routing';
import { everyLocale, localeAlternates } from '@/lib/alternates';
import prisma from '@/lib/prisma';
import { Categories } from './ui/categories';
import { List } from './ui/list';
import { Page, PageHeader } from '../ui/page-header';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'ro' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('boardgames');
  const commonFields = { title: t('title'), description: t('description') };

  return {
    alternates: localeAlternates(locale, everyLocale('/boardgames')),
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
    <Page>
      <PageHeader meta={t('count', { count: boardgames.length })} title={t('title')} lead={t('description')}>
        <div className='mt-8'>
          <Categories list={categories} />
        </div>
      </PageHeader>

      <List list={boardgames} />
    </Page>
  );
}
