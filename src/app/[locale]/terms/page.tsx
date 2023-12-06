import { getTranslations } from 'next-intl/server';

const texts = [
  'last-update',
  'welcome',
  ['cap1.title', 'cap1.p1'],
  ['cap2.title', 'cap2.p1', 'cap2.p2'],
  ['cap3.title', 'cap3.p1'],
  ['cap4.title', 'cap4.p1'],
  ['cap5.title', 'cap5.p1'],
  ['cap6.title', 'cap6.p1'],
  ['cap7.title', 'cap7.p1'],
  ['cap8.title', 'cap8.p1', 'cap8.p2']
];
export default async function Terms() {
  const t = await getTranslations('terms');

  return (
    <main className='container mx-auto max-w-7xl gap-8 px-4 py-32'>
      <h1>{t('title')}</h1>

      {texts.map((item) => {
        if (Array.isArray(item)) {
          return item.map((text) => {
            if (text.includes('title')) {
              return (
                <h2 key={text} className='text-2xl'>
                  {t(text)}
                </h2>
              );
            }

            return <p key={text}>{t(text)}</p>;
          });
        }

        return <p key={item[0]}>{t(item)}</p>;
      })}
    </main>
  );
}
