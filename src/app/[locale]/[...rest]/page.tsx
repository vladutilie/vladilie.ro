import { getTranslations } from 'next-intl/server';

export default async function CatchAllPages() {
  const t = await getTranslations('not-found');

  return (
    <main className='container mx-auto max-w-7xl gap-8 px-4 py-32'>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </main>
  );
}
