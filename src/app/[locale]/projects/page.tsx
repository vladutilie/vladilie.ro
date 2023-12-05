import { getTranslations } from 'next-intl/server';

import { allProjects, type Project as ProjectT } from '@/../.contentlayer/generated';
import { Project } from './ui/project';

export default async function Projects({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('projects');
  const projects = allProjects.filter(({ locale: l }) => l === locale);

  return (
    <main className='container mx-auto max-w-7xl gap-8 px-4 py-32'>
      <h1>{t('title')}</h1>

      {projects.length ? (
        <>
          <p>{t('description')}</p>
          <div className='grid grid-cols-6 gap-8'>
            {projects.map((project: ProjectT) => (
              <Project key={project._id} {...project} />
            ))}
          </div>
        </>
      ) : (
        <p>{t('no-projects')}</p>
      )}
    </main>
  );
}
