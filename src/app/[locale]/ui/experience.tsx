import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import { NavLinks } from '@/lib/constants';

import javascript from '@/../../public/images/technologies/javascript.svg';
import typescript from '@/../../public/images/technologies/typescript.svg';
import nodejs from '@/../../public/images/technologies/nodejs.svg';
import expressjs from '@/../../public/images/technologies/expressjs.svg';
import nextjs from '@/../../public/images/technologies/nextjs.svg';
import nestjs from '@/../../public/images/technologies/nestjs.svg';
import php from '@/../../public/images/technologies/php.svg';
import neo4j from '@/../../public/images/technologies/neo4j.svg';
import mongodb from '@/../../public/images/technologies/mongodb.svg';
import mysql from '@/../../public/images/technologies/mysql.svg';
import postgresql from '@/../../public/images/technologies/postgresql.svg';
import sqlite from '@/../../public/images/technologies/sqlite.svg';
import prisma from '@/../../public/images/technologies/prisma.svg';
import supabase from '@/../../public/images/technologies/supabase.svg';
import reactjs from '@/../../public/images/technologies/reactjs.svg';
import tailwindcss from '@/../../public/images/technologies/tailwindcss.svg';
import git from '@/../../public/images/technologies/git.svg';
import wordpress from '@/../../public/images/technologies/wordpress.svg';

const technologies: { name: string; image: StaticImport; url: string }[] = [
  { name: 'JavaScript', image: javascript, url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'TypeScript', image: typescript, url: 'https://typescriptlang.org' },
  { name: 'Node.js', image: nodejs, url: 'https://nodejs.org' },
  { name: 'ExpressJS', image: expressjs, url: 'https://expressjs.com' },
  { name: 'NestJS', image: nestjs, url: 'https://nestjs.com' },
  { name: 'NextJS', image: nextjs, url: 'https://nextjs.org' },
  { name: 'PHP', image: php, url: 'https://php.net' },
  { name: 'WordPress', image: wordpress, url: 'https://wordpress.org' },

  { name: 'MySQL', image: mysql, url: 'https://mysql.com' },
  { name: 'PostgreSQL', image: postgresql, url: 'https://postgresql.org' },
  { name: 'Neo4j', image: neo4j, url: 'https://neo4j.com' },
  { name: 'MongoDB', image: mongodb, url: 'https://mongodb.com' },
  { name: 'Prisma', image: prisma, url: 'https://prisma.io' },
  { name: 'Supabase', image: supabase, url: 'https://supabase.com' },
  { name: 'SQLite', image: sqlite, url: 'https://sqlite.org' },

  { name: 'ReactJS', image: reactjs, url: 'https://react.dev/' },
  { name: 'TailwindCSS', image: tailwindcss, url: 'https://tailwindcss.com' },
  { name: 'Git', image: git, url: 'https://git-scm.com' }
];

export const Experience: React.FC = () => {
  const t = useTranslations('homepage.experience');

  return (
    <section id={NavLinks.Experience} className='bg-gray-50 transition-colors dark:bg-slate-900'>
      <div className='container mx-auto grid max-w-7xl grid-cols-4 gap-8 px-4 py-16 sm:grid-cols-5 md:grid-cols-7 md:py-20 lg:grid-cols-10 2xl:py-24'>
        <div className='col-span-4 text-center sm:col-span-5 md:col-span-7 lg:col-span-10'>
          <span className='rounded-xl bg-gray-600 px-4 py-1 text-sm text-gray-200'>{t('tag')}</span>
        </div>

        {technologies.map(({ name, image, url }) => (
          <a
            key={name}
            href={url}
            target='_blank'
            className='group flex flex-col items-center justify-end gap-y-2 text-sm text-gray-400'
          >
            <Image
              src={image}
              alt={name}
              className='max-h-[64px] grayscale transition-transform group-hover:scale-110 group-hover:grayscale-0'
            />
            {name}
          </a>
        ))}
      </div>
    </section>
  );
};
