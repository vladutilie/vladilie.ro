import { getTranslations } from 'next-intl/server';

const environment = [
  ['environment.desk.name', 'environment.desk.description'],
  ['environment.chair.name', 'environment.chair.description'],
  ['environment.laptop-stand.name', 'environment.laptop-stand.description'],
  ['environment.monitors-support.name', 'environment.monitors-support.description'],
  ['environment.mousepad.name', 'environment.mousepad.description'],
  'environment.lamp'
];

const hardware = [
  ['hardware.macbook.name', 'hardware.macbook.description'],
  ['hardware.monitors.name', 'hardware.monitors.description'],
  'hardware.mouse',
  'hardware.keyboard',
  'hardware.mic'
];

const software = [
  ['software.vscode.name', 'software.vscode.description'],
  'software.postman',
  ['software.chrome.name', 'software.chrome.description'],
  'software.neo4j',
  'software.signal',
  'software.slack'
];

export default async function Uses() {
  const t = await getTranslations('uses');

  return (
    <main className='container mx-auto max-w-7xl gap-8 px-4 py-32'>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>

      <h2 className='mt-8 text-3xl'>{t('environment.title')}</h2>
      <ul className='list-inside list-disc space-y-2'>
        {environment.map((item) => {
          if (Array.isArray(item)) {
            return (
              <li key={item[0]}>
                <p className='inline'>{t(item[0])}</p>
                <span className='block text-sm text-gray-400'>{t(item[1])}</span>
              </li>
            );
          }

          return (
            <li key={item} className='text-gray-600 dark:text-gray-300'>
              {t(item)}
            </li>
          );
        })}
      </ul>

      <h2 className='mt-8 text-3xl'>{t('hardware.title')}</h2>
      <ul className='list-inside list-disc space-y-2'>
        {hardware.map((item) => {
          if (Array.isArray(item)) {
            return (
              <li key={item[0]}>
                <p className='inline'>{t(item[0])}</p>
                <span className='block text-sm text-gray-400'>{t(item[1])}</span>
              </li>
            );
          }

          return (
            <li key={item} className='text-gray-600 dark:text-gray-300'>
              {t(item)}
            </li>
          );
        })}
      </ul>

      <h2 className='mt-8 text-3xl'>{t('software.title')}</h2>
      <ul className='list-inside list-disc space-y-2'>
        {software.map((item) => {
          if (Array.isArray(item)) {
            return (
              <li key={item[0]}>
                <p className='inline'>{t(item[0])}</p>
                <span className='block text-sm text-gray-400'>{t(item[1])}</span>
              </li>
            );
          }

          return (
            <li key={item} className='text-gray-600 dark:text-gray-300'>
              {t(item)}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
