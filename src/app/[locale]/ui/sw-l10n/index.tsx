import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { NavLinks, Pages } from '@/lib/constants';
import { SplitSection } from '../split-section';
import { LocalizedCard } from './project-card';

import { WordPress2 } from '../icons';
import homebrew from '@/../public/images/sw-l10n/homebrew.svg';
import cronjob from '@/../public/images/sw-l10n/cron-job.png';
import cronjobWhite from '@/../public/images/sw-l10n/cron-job-white.png';
import discourse from '@/../public/images/sw-l10n/discourse.svg';
import discourseWhite from '@/../public/images/sw-l10n/discourse-white.png';
import poedit from '@/../public/images/sw-l10n/poedit.png';
import tldraw from '@/../public/images/sw-l10n/tldraw.jpg';
import weblate from '@/../public/images/sw-l10n/weblate.svg';
import wpcli from '@/../public/images/sw-l10n/wp-cli.png';
import wptranslations from '@/../public/images/sw-l10n/wp-translations.pro.png';

const localizedSw: { name: string; logo: StaticImport; darkLogo?: StaticImport; url: string; i18nKey: string }[] = [
  {
    name: 'WordPress',
    logo: <WordPress2 className='h-6 w-6' />,
    url: 'https://make.wordpress.org/polyglots/teams/?locale=ro_RO#locale-header',
    i18nKey: 'wordpress'
  },
  { name: 'WP-Translations.PRO', logo: wptranslations, url: 'https://wp-translations.pro', i18nKey: 'wp-translations' },
  { name: 'WP-CLI', logo: wpcli, url: 'https://wp-cli.org', i18nKey: 'wp-cli' },
  { name: 'Discourse', logo: discourse, darkLogo: discourseWhite, url: 'https://discourse.org', i18nKey: 'discourse' },
  { name: 'Homebrew', logo: homebrew, url: 'https://brew.sh', i18nKey: 'homebrew' },
  { name: 'tldraw', logo: tldraw, url: 'https://tldraw.com', i18nKey: 'tldraw' },
  { name: 'Poedit', logo: poedit, url: 'https://poedit.net', i18nKey: 'poedit' },
  { name: 'Weblate', logo: weblate, url: 'https://hosted.weblate.org/user/vladilie', i18nKey: 'weblate' },
  { name: 'Cron-job.org', logo: cronjob, darkLogo: cronjobWhite, url: 'https://cron-job.org', i18nKey: 'cron-job' }
];

export const SoftwareLocalization: React.FC = () => {
  const t = useTranslations('homepage.sw-l10n');

  return (
    <SplitSection
      id={NavLinks.Localization}
      index='06'
      label={t('title')}
      lead={t('description')}
      aside={
        <Link href={`/${Pages.Contact}`} className='text-[15px] underline decoration-1 underline-offset-[3px]'>
          {t('quote')}
        </Link>
      }
    >
      <div className='border-hairline bg-hairline grid grid-cols-1 gap-px border sm:grid-cols-2 lg:grid-cols-3'>
        {localizedSw.map((item) => (
          <LocalizedCard key={item.name} {...item} />
        ))}
      </div>
    </SplitSection>
  );
};
