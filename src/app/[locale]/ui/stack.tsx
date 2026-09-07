import { useTranslations } from 'next-intl';

import { NavLinks } from '@/lib/constants';
import { SplitSection } from './split-section';

const groups: { key: string; items: { name: string; url: string }[] }[] = [
  {
    key: 'core',
    items: [
      { name: 'WordPress', url: 'https://wordpress.org' },
      { name: 'WooCommerce', url: 'https://woocommerce.com' },
      { name: 'Next.js', url: 'https://nextjs.org' },
      { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { name: 'TypeScript', url: 'https://typescriptlang.org' },
      { name: 'PHP', url: 'https://php.net' }
    ]
  },
  {
    key: 'also',
    items: [
      { name: 'ReactJS', url: 'https://react.dev' },
      { name: 'NodeJS', url: 'https://nodejs.org' },
      { name: 'NestJS', url: 'https://nestjs.com' },
      { name: 'ExpressJS', url: 'https://expressjs.com' },
      { name: 'Tailwind CSS', url: 'https://tailwindcss.com' }
    ]
  },
  {
    key: 'data',
    items: [
      { name: 'MySQL', url: 'https://mysql.com' },
      { name: 'PostgreSQL', url: 'https://postgresql.org' },
      { name: 'MongoDB', url: 'https://mongodb.com' },
      { name: 'Neo4j', url: 'https://neo4j.com' },
      { name: 'SQLite', url: 'https://sqlite.org' },
      { name: 'Prisma', url: 'https://prisma.io' },
      { name: 'Supabase', url: 'https://supabase.com' }
    ]
  },
  {
    key: 'tooling',
    items: [
      { name: 'WP-CLI', url: 'https://wp-cli.org' },
      { name: 'Git', url: 'https://git-scm.com' },
      { name: 'Cloudinary', url: 'https://cloudinary.com' },
      { name: 'Linux', url: 'https://kernel.org' }
    ]
  }
];

export const Stack: React.FC = () => {
  const t = useTranslations('homepage.skills');

  return (
    <SplitSection id={NavLinks.Skills} index='03' label={t('tag')} lead={t('description')}>
      <div className='grid gap-10'>
        {groups.map(({ key, items }) => (
          <div key={key} className='grid grid-cols-1 items-start gap-4 sm:grid-cols-[130px_1fr] sm:gap-7'>
            <div className='text-content/50 font-mono text-xs tracking-[0.06em] sm:pt-2'>{t(`groups.${key}`)}</div>

            <ul className='flex flex-wrap gap-2'>
              {items.map(({ name, url }) => (
                <li key={name}>
                  <a
                    href={url}
                    target='_blank'
                    rel='noreferrer'
                    className='border-hairline-strong text-content hover:border-accent hover:text-accent inline-block rounded-full border px-[15px] py-2 text-sm transition-colors'
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SplitSection>
  );
};
