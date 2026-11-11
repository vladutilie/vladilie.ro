import { ReactNode, JSX } from 'react';
import { useTranslations } from 'next-intl';

import { NavLinks } from '@/lib/constants';
import { SectionHeading } from './section-heading';

const credentials = ['wporg', 'neo4j', 'npm', 'degree', 'team'] as const;

/** Where the `<link>` in a credential's value points; credentials without one stay plain text. */
const credentialLinks: Partial<Record<(typeof credentials)[number], string>> = {
  wporg: 'https://make.wordpress.org/polyglots/teams/?locale=ro_RO',
  npm: 'https://www.npmjs.com/package/euplatesc',
  degree: 'https://ac.upt.ro',
  team: 'https://wp-translations.pro/team/'
};

const linkClasses = 'text-content hover:text-accent underline decoration-1 underline-offset-[3px]';

const localizedSoftware = [
  { name: 'WordPress', url: 'https://make.wordpress.org/polyglots/teams/?locale=ro_RO' },
  { name: 'WP-CLI', url: 'https://wp-cli.org' },
  { name: 'Discourse', url: 'https://discourse.org' },
  { name: 'Homebrew', url: 'https://brew.sh' },
  { name: 'tldraw', url: 'https://tldraw.com' },
  { name: 'Poedit', url: 'https://poedit.net' },
  { name: 'Weblate', url: 'https://hosted.weblate.org/user/vladilie' },
  { name: 'Cron-job.org', url: 'https://cron-job.org' }
];

export const About: React.FC = () => {
  const t = useTranslations('homepage.about');

  return (
    <section id={NavLinks.About} className='border-t border-hairline bg-surface-raised'>
      <div className='mx-auto flex max-w-[1200px] flex-wrap gap-14 px-6 py-20 md:py-[104px]'>
        <div className='min-w-0 flex-[1_1_420px]'>
          <SectionHeading eyebrow={t('tag')} title={t('title')} className='mb-[22px] text-[30px]! leading-[1.12]!' />
          <p className='my-0 mb-4 text-[17px] leading-[1.7] text-content/80'>{t('p1')}</p>
          <p className='my-0 text-[17px] leading-[1.7] text-content/80'>
            {t.rich('p2', {
              cpf: (chunk: ReactNode): JSX.Element => (
                <a href='https://cartilepefata.ro' target='_blank' rel='noreferrer' className={linkClasses}>
                  {chunk}
                </a>
              )
            })}
          </p>
        </div>

        <dl className='m-0 grid min-w-0 flex-[1_1_420px] gap-px self-start overflow-hidden rounded-xl border border-hairline bg-hairline'>
          {credentials.map((credential) => (
            <div key={credential} className='flex items-baseline gap-[18px] bg-surface px-[22px] py-[18px]'>
              <dt className='min-w-[72px] font-mono text-[12.5px] text-accent'>{t(`credentials.${credential}.key`)}</dt>
              <dd className='m-0 text-[15.5px] leading-normal text-content'>
                {t.rich(`credentials.${credential}.value`, {
                  link: (chunk: ReactNode): ReactNode => {
                    const url = credentialLinks[credential];

                    return url ? (
                      <a href={url} target='_blank' rel='noreferrer' className={linkClasses}>
                        {chunk}
                      </a>
                    ) : (
                      chunk
                    );
                  }
                })}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className='mx-auto max-w-[1200px] px-6 pb-[88px]'>
        <div className='mb-3.5 text-[14.5px] font-bold'>{t('localization')}</div>
        <div className='flex flex-wrap gap-2'>
          {localizedSoftware.map(({ name, url }) => (
            <a
              key={name}
              href={url}
              target='_blank'
              rel='noreferrer'
              className='rounded-full border border-hairline-strong px-[15px] py-2 text-sm font-medium text-content transition-colors hover:border-signal hover:text-content'
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
