import { useTranslations } from 'next-intl';

const stats = ['studio', 'maintained', 'gte', 'senior'] as const;

// Partners without a URL yet are shown as plain text.
const clients: { name: string; url?: string }[] = [
  { name: 'Măslinescu®', url: 'https://maslinescu.ro' },
  { name: 'Cărțile pe Față', url: 'https://cartilepefata.ro' },
  { name: 'TEDxZorilor', url: 'https://tedxzorilor.com' },
  { name: '17 Seconds™', url: 'https://17sec.co.uk' },
  { name: 'Tablouri Colorate', url: 'https://tablouricolorate.ro' },
  { name: 'Baschet Club SLAM', url: 'https://baschetclubslam.ro' },
  { name: 'Abarai', url: 'https://www.abarai.ro' },
  { name: 'Marina Bîra', url: 'https://marinabira.ro' },
  { name: 'DRI UPT', url: 'https://international.upt.ro' },
  { name: 'ContaExpert', url: 'https://contaexpert.ro' }
];

const tech = [
  'WordPress',
  'WooCommerce',
  'PHP',
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Prisma',
  'PostgreSQL',
  'Supabase',
  'Cloudflare',
  'Docker'
];

const rowLabel = 'text-content/70 font-mono text-[11.5px] tracking-[0.12em] uppercase';

export const ProofStrip: React.FC = () => {
  const t = useTranslations('homepage.proof');

  return (
    <section aria-label={t('label')} className='border-hairline bg-surface-raised border-y'>
      <div className='mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(220px,1fr))] px-6'>
        {stats.map((stat) => (
          <div key={stat} className='py-[30px] pr-6'>
            <div className='mb-2.5 text-[40px] leading-none font-extrabold tracking-[-0.04em]'>
              {t(`stats.${stat}.value`)}
            </div>
            <div className='text-content/78 text-[14.5px] leading-normal'>{t(`stats.${stat}.label`)}</div>
          </div>
        ))}
      </div>

      <div className='border-hairline mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-[34px] gap-y-3 border-t px-6 py-[22px]'>
        <span className={rowLabel}>{t('clients')}</span>
        {clients.map(({ name, url }) =>
          url ? (
            <a
              key={name}
              href={url}
              target='_blank'
              rel='noopener'
              className='text-content/85 hover:text-accent text-[17px] font-bold tracking-[-0.02em] transition-colors'
            >
              {name}
            </a>
          ) : (
            <span key={name} className='text-content/85 text-[17px] font-bold tracking-[-0.02em]'>
              {name}
            </span>
          )
        )}
      </div>

      <div className='border-hairline mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-7 gap-y-2.5 border-t px-6 pt-[18px] pb-5'>
        <span className={rowLabel}>{t('built-with')}</span>
        {tech.map((name) => (
          <span
            key={name}
            className='text-content/78 hover:text-accent font-mono text-[13.5px] font-medium transition-colors'
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
};
