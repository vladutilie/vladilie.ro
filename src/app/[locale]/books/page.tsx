import { Metadata } from 'next';
import type { BookModel as BookT } from '@/../generated/prisma/models';
import { BookState } from '@/../generated/prisma/enums';
import { getTranslations } from 'next-intl/server';

import { getPathname } from '@/i18n/routing';
import prisma from '@/lib/prisma';
import { Book } from './ui/book';
import { GroupHeading, Page, PageHeader } from '../ui/page-header';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'ro' }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('books');
  const commonFields = { title: t('title'), description: t('description') };

  return {
    alternates: { canonical: ('ro' === locale ? '/ro/' : '') + getPathname({ locale, href: '/books' }) },
    ...commonFields,
    keywords: t('metadata.keywords'),
    openGraph: {
      ...commonFields,
      url: getPathname({ href: '/books', locale }),
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

const getBooks = async () => {
  const books: BookT[] = await prisma.book.findMany();

  return {
    reading: books.filter(({ state }) => state === BookState.Reading).sort((a, b) => (a.title > b.title ? 1 : -1)),
    completed: books.filter(({ state }) => state === BookState.Completed).sort((a, b) => (a.title > b.title ? 1 : -1)),
    wishing: books.filter(({ state }) => state === BookState.Wish).sort((a, b) => (a.title > b.title ? 1 : -1))
  };
};

export default async function BookPage() {
  const t = await getTranslations('books');
  const books = await getBooks();

  return (
    <Page>
      <PageHeader
        meta={t('count', { count: books.reading.length + books.completed.length + books.wishing.length })}
        title={t('title')}
        lead={t('description')}
      />

      <div className='grid gap-14'>
        {(
          [
            ['currently-reading', books.reading],
            ['read', books.completed],
            ['wishlist', books.wishing]
          ] as const
        ).map(([key, list]) =>
          list.length ? (
            <section key={key}>
              <GroupHeading>{t(key)}</GroupHeading>

              <div className='border-hairline bg-hairline grid grid-cols-1 gap-px border sm:grid-cols-2 lg:grid-cols-3'>
                {list.map((book) => (
                  <Book key={book.id} {...book} />
                ))}
              </div>
            </section>
          ) : null
        )}
      </div>
    </Page>
  );
}
