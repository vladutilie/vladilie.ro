import { useLocale, useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { getProject } from '@/lib/content';

const projects = [
  { key: 'booktruck', slug: 'site-prezentare-strangere-fonduri-booktruck' },
  { key: 'tedx', slug: 'tedxzorilor' },
  { key: 'slam', slug: 'baschet-club-slam' },
  { key: 'transilvaniacar', slug: 'transilvaniacar' },
  { key: 'ebikerent', slug: 'e-bikerent' },
  { key: 'gosup', slug: 'gosup' },
  { key: 'movelo', slug: 'movelo' },
  { key: 'contadocs', slug: 'contadocs-platforma-gestiune-documente-contabile' }
] as const;

export const MoreWork: React.FC = () => {
  const t = useTranslations('homepage.more');
  const locale = useLocale();
  const cardClasses = 'border-hairline bg-surface-raised text-content block rounded-xl border p-6 transition-colors';

  return (
    <section className='mx-auto max-w-[1200px] px-6 pt-6 pb-20 md:pb-[104px]'>
      <h3 className='my-0 mb-[18px] text-lg font-bold tracking-normal'>{t('title')}</h3>

      <div className='grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4'>
        {projects.map(({ key, slug }) => {
          const content = (
            <>
              <div className='text-content/72 mb-2.5 font-mono text-[11.5px] tracking-[0.06em] uppercase'>
                {t(`items.${key}.kind`)}
              </div>
              <div className='mb-2 text-lg font-bold tracking-[-0.02em]'>{t(`items.${key}.title`)}</div>
              <div className='text-content/78 text-[14.5px] leading-[1.55]'>{t(`items.${key}.body`)}</div>
            </>
          );

          // Not every project has a write-up in every language.
          return getProject(slug, locale) ? (
            <Link
              key={key}
              href={{ pathname: '/projects/[slug]', params: { slug } }}
              className={`${cardClasses} hover:border-signal hover:text-content`}
            >
              {content}
            </Link>
          ) : (
            <div key={key} className={cardClasses}>
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
};
