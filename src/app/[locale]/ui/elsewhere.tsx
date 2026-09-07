import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { NavLinks, Pages } from '@/lib/constants';
import { SectionLabel } from './section-label';

const entries = [Pages.Blog, Pages.Uses, Pages.Books, Pages.Boardgames];

export const Elsewhere: React.FC = () => {
  const t = useTranslations();

  return (
    <section id={NavLinks.Writing} className='border-hairline border-t py-16 md:py-20 lg:py-[88px]'>
      <div className='mb-10 flex items-end justify-between gap-8'>
        <SectionLabel index='06'>{t('homepage.elsewhere.tag')}</SectionLabel>

        <Link
          href={`/${Pages.Blog}`}
          className='border-accent border-b pb-1 font-mono text-xs tracking-[0.06em] uppercase'
        >
          {t('blog.title')} →
        </Link>
      </div>

      <div className='border-hairline bg-hairline grid grid-cols-1 gap-px border sm:grid-cols-2 lg:grid-cols-4'>
        {entries.map((page) => (
          <Link
            key={page}
            href={`/${page}`}
            className='bg-surface text-content hover:bg-hover-tint hover:text-content block p-7 transition-colors'
          >
            <div className='mb-2 text-lg font-semibold tracking-[-0.02em]'>{t(`${page}.title`)}</div>
            <p className='my-0 text-sm leading-[1.55]'>{t(`homepage.elsewhere.${page}`)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
