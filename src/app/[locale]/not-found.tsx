import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/routing';
import { Page } from './ui/page-header';

export default async function NotFound() {
  const t = await getTranslations('not-found');

  return (
    <Page narrow>
      <div className='flex flex-col items-start gap-6 border-y border-hairline py-20'>
        <span className='font-mono text-[11.5px] tracking-[0.14em] text-accent uppercase'>404</span>
        <h1 className='my-0 text-5xl lg:text-6xl'>{t('title')}</h1>
        <p className='my-0 max-w-[50ch] text-lg leading-relaxed'>{t('description')}</p>

        <Link
          href='/'
          className='mt-2 rounded-full border border-hairline-strong px-6 py-3 text-[15px] font-semibold text-content transition-colors hover:border-signal hover:text-accent'
        >
          {t('back-home')}
        </Link>
      </div>
    </Page>
  );
}
