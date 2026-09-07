import { getTranslations } from 'next-intl/server';

export default async function CatchAllPages() {
  const t = await getTranslations('not-found');

  return (
    <main className='mx-auto max-w-[1180px] gap-8 px-5 py-16 md:px-8 md:py-24'>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </main>
  );
}
