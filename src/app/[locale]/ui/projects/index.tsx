import { useLocale, useTranslations } from 'next-intl';
import { allProjects } from 'contentlayer/generated';

import { Link } from '@/i18n/routing';
import { NavLinks, Pages } from '@/lib/constants';
import { SectionLabel } from '../section-label';
import { ProjectCard } from './project-card';

export const Projects: React.FC = () => {
  const t = useTranslations('homepage.projects');
  const locale = useLocale();
  const projects = allProjects
    .filter(({ locale: l }) => l === locale)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 3);

  if (!projects.length) {
    return null;
  }

  return (
    <section id={NavLinks.Work} className='border-t border-hairline py-16 md:py-20 lg:py-[88px]'>
      <div className='mb-11 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <SectionLabel index='05'>{t('tag')}</SectionLabel>
          <p className='my-0 mt-[18px] max-w-[24ch] text-3xl font-semibold leading-tight tracking-[-0.03em] text-content'>
            {t('title')}
          </p>
        </div>

        <Link
          href={`/${Pages.Projects}`}
          className='self-start border-b border-accent pb-1 font-mono text-xs uppercase tracking-[0.06em] sm:self-auto'
        >
          {t('see-all')} →
        </Link>
      </div>

      <ul className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {projects.map((project) => (
          <ProjectCard key={project._id} {...project} />
        ))}
      </ul>
    </section>
  );
};
