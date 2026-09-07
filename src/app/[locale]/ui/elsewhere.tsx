import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { NavLinks, Pages } from '@/lib/constants';
import { SectionLabel } from './section-label';

const entries = [Pages.Blog, Pages.Uses, Pages.Books, Pages.Boardgames];

export const Elsewhere: React.FC = () => {
  const t = useTranslations();

  return (
    <section id={NavLinks.Writing} className='border-t border-hairline py-16 md:py-20 lg:py-[88px]'>
      <div className='mb-10 flex items-end justify-between gap-8'>
        <SectionLabel index='07'>{t('homepage.elsewhere.tag')}</SectionLabel>

        <Link
          href={`/${Pages.Blog}`}
          className='border-b border-accent pb-1 font-mono text-xs uppercase tracking-[0.06em]'
        >
          {t('blog.title')} →
        </Link>
      </div>

      <div className='grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4'>
        {entries.map((page) => (
          <Link
            key={page}
            href={`/${page}`}
            className='block bg-surface p-7 text-content transition-colors hover:bg-hover-tint hover:text-content'
          >
            <div className='mb-2 text-lg font-semibold tracking-[-0.02em]'>{t(`${page}.title`)}</div>
            <p className='my-0 text-sm leading-[1.55]'>{t(`homepage.elsewhere.${page}`)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
