import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { allProjects } from 'contentlayer/generated';

import { NavLinks } from '@/lib/constants';
import { ProjectCard } from './project-card';

export const Projects: React.FC = () => {
  const t = useTranslations('homepage.projects');
  const locale = useLocale();
  const projects = allProjects.filter(({ locale: l }) => l === locale).slice(0, 3);

  return (
    <section
      id={NavLinks.Projects}
      className='container mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 md:py-20 2xl:py-24'
    >
      <div className='col-span-3 text-center'>
        <span className='rounded-xl bg-gray-600 px-4 py-1 text-sm text-gray-200'>{t('tag')}</span>
      </div>

      {projects.map((project, idx) => (
        <ProjectCard {...project} key={idx} idx={idx} />
      ))}

      <Link
        href='/projects'
        className='self-center rounded-xl bg-blue-450 px-4 py-2 font-semibold text-white hover:text-white'
      >
        {t('see-all')}
      </Link>
    </section>
  );
};
