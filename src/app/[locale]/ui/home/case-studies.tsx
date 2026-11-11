import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { NavLinks, Pages } from '@/lib/constants';
import { Pill, SectionHeading } from './section-heading';
import { LumeaVisual, MaslinescuVisual, TablouriVisual } from './case-visuals';

const cases = [
  {
    key: 'maslinescu',
    slug: 'maslinescu',
    tags: ['WooCommerce', 'HPOS', 'AI assistant', 'Fan Courier API', 'WP-CLI', 'Cloudflare', 'Grafana', 'Loki'],
    visual: <MaslinescuVisual />,
    visualClassName: 'bg-ink flex-col justify-center gap-3.5'
  },
  {
    key: 'tablouri',
    slug: 'wordpress-plugin-woocommerce-custom-paintings',
    tags: ['Vanilla JS', 'Canvas API', 'WooCommerce', 'PHPStan', 'GitHub Actions'],
    visual: <TablouriVisual />,
    visualClassName: 'bg-signal items-center justify-center'
  },
  {
    key: 'lumea',
    slug: 'lumea-booktruck',
    tags: ['Next.js', 'Prisma', 'Better Auth', 'Google Drive API', 'Redis', 'Vercel'],
    visual: <LumeaVisual />,
    visualClassName: 'bg-[#1f2828] items-center justify-center'
  }
] as const;

const parts = ['problem', 'built', 'result'] as const;

export const CaseStudies: React.FC = () => {
  const t = useTranslations('homepage.work');

  return (
    <section id={NavLinks.Work} className='mx-auto max-w-[1200px] px-6 pt-20 pb-10 md:pt-[104px]'>
      <div className='mb-[52px] flex flex-wrap items-end justify-between gap-5'>
        <div>
          <SectionHeading eyebrow={t('tag')} title={t('title')} className='max-w-[20ch]' />
        </div>

        <Link
          href={`/${Pages.Projects}`}
          className='border-b-2 border-signal pb-[3px] font-semibold text-content hover:text-accent'
        >
          {t('all')} →
        </Link>
      </div>

      <div className='grid gap-7'>
        {cases.map(({ key, slug, tags, visual, visualClassName }, idx) => (
          <article
            key={key}
            className={`flex overflow-hidden rounded-[14px] border border-hairline bg-surface-raised ${
              idx % 2 ? 'flex-row-reverse flex-wrap-reverse' : 'flex-wrap'
            }`}
          >
            <div className='min-w-0 flex-[1_1_460px] p-7 md:p-10'>
              <div className='mb-3.5 font-mono text-xs tracking-[0.08em] text-accent uppercase'>
                {t(`cases.${key}.kicker`)}
              </div>
              <h3 className='my-0 mb-[22px] text-[26px] leading-[1.1] tracking-[-0.03em] md:text-[30px]'>
                {t(`cases.${key}.title`)}
              </h3>

              <dl className='m-0 mb-[26px] grid gap-4'>
                {parts.map((part) => (
                  <div key={part}>
                    <dt className='mb-1 text-sm font-bold'>{t(part)}</dt>
                    <dd className='m-0 text-base leading-[1.6] text-content/80'>{t(`cases.${key}.${part}`)}</dd>
                  </div>
                ))}
              </dl>

              <div className='flex flex-wrap items-center gap-1.5'>
                {tags.map((tag) => (
                  <Pill key={tag}>{tag}</Pill>
                ))}
                <Link
                  href={{ pathname: '/projects/[slug]', params: { slug } }}
                  className='ml-2 border-b-2 border-signal font-semibold text-content hover:text-accent'
                >
                  {t('read')} →
                </Link>
              </div>
            </div>

            <div aria-hidden className={`flex min-w-0 flex-[1_1_380px] p-7 md:p-9 ${visualClassName}`}>
              {visual}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
