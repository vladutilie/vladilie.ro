import { getTranslations } from 'next-intl/server';

import { Form } from './ui/form';

export default async function Contact() {
  const t = await getTranslations('contact');

  return (
    <main className='container mx-auto max-w-7xl gap-8 px-4 py-32'>
      <h2>{t('title')}</h2>
      <p>{t('description')}</p>

      <Form />
    </main>
  );
}
