import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useTranslations } from 'next-intl';

import { ProjectCard } from './project-card';
import { Quote } from './quote';

import { WordPress2 } from '../icons';
import homebrew from '@/../../public/images/sw-l10n/homebrew.svg';
import cronjob from '@/../../public/images/sw-l10n/cron-job.png';
import cronjobWhite from '@/../../public/images/sw-l10n/cron-job-white.png';
import discourse from '@/../../public/images/sw-l10n/discourse.svg';
import discourseWhite from '@/../../public/images/sw-l10n/discourse-white.png';
import poedit from '@/../../public/images/sw-l10n/poedit.png';
import tldraw from '@/../../public/images/sw-l10n/tldraw.jpg';
import weblate from '@/../../public/images/sw-l10n/weblate.svg';
import wpcli from '@/../../public/images/sw-l10n/wp-cli.png';
import wptranslations from '@/../../public/images/sw-l10n/wp-translations.pro.png';

const localizedSw: { name: string; logo: StaticImport; darkLogo?: StaticImport; url: string; i18nKey: string }[] = [
  { name: 'Cron-job.org', logo: cronjob, darkLogo: cronjobWhite, url: 'https://cron-job.org', i18nKey: 'cron-job' },
  { name: 'Discourse', logo: discourse, darkLogo: discourseWhite, url: 'https://brew.sh', i18nKey: 'discourse' },
  { name: 'Homebrew', logo: homebrew, url: 'https://brew.sh', i18nKey: 'homebrew' },
  { name: 'Poedit', logo: poedit, url: 'https://poedit.net', i18nKey: 'poedit' },
  { name: 'tldraw', logo: tldraw, url: 'https://tldraw.com', i18nKey: 'tldraw' },
  { name: 'Weblate', logo: weblate, url: 'https://hosted.weblate.org/user/vladilie', i18nKey: 'weblate' },
  {
    name: 'WordPress',
    logo: <WordPress2 className='self-center' />,
    url: 'https://make.wordpress.org/polyglots/teams/?locale=ro_RO#locale-header',
    i18nKey: 'wordpress'
  },
  { name: 'WP-CLI', logo: wpcli, url: 'https://wp-cli.org', i18nKey: 'wp-cli' },
  { name: 'WP-Translations.PRO', logo: wptranslations, url: 'https://wp-translations.pro', i18nKey: 'wp-translations' }
];

export const SoftwareLocalization: React.FC = () => {
  const t = useTranslations('homepage.sw-l10n');

  return (
    <section className='container mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 md:py-20 2xl:py-24'>
      <div className='flex flex-col items-center justify-center gap-x-4 md:flex-row'>
        <h3 className='font-semibold'>{t('title')}</h3>
        <p className='text-center md:text-left'>{t('description')}</p>
      </div>

      <div className='hide-scrollbar flex w-full snap-x snap-mandatory scroll-px-10 items-start gap-x-8 overflow-x-scroll scroll-smooth lg:grid lg:grid-cols-6 lg:gap-4 '>
        {localizedSw.map((item) => (
          <ProjectCard key={item.name} {...item} />
        ))}
      </div>

      <Quote />
    </section>
  );
};
