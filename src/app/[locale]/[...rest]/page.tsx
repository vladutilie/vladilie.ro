import { getTranslations } from 'next-intl/server';

export default async function CatchAllPages() {
  const t = await getTranslations('not-found');

  return (
    <main className='mx-auto max-w-[1200px] gap-8 px-6 py-16 md:py-24'>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </main>
  );
}
