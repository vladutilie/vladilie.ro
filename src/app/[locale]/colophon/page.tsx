import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

export default function Colophon() {
  const t = useTranslations('colophon');

  return (
    <main className='container mx-auto max-w-7xl gap-8 px-4 py-32'>
      <h2>{t('title')}</h2>
      <p>
        {t.rich('p1', {
          url: (chunk: ReactNode): JSX.Element => (
            <a href='https://sagarshah.dev' target='_blank' className="after:content-['_↗']">
              {chunk}
            </a>
          )
        })}
      </p>
      <p>
        {t.rich('p2', {
          nextjs: (chunk: ReactNode): JSX.Element => (
            <a href='https://nextjs.org' target='_blank' className="after:content-['_↗']">
              {chunk}
            </a>
          ),
          planet: (chunk: ReactNode): JSX.Element => (
            <a href='https://planetscale.com' target='_blank' className="after:content-['_↗']">
              {chunk}
            </a>
          ),
          mdx: (chunk: ReactNode): JSX.Element => (
            <a href='https://mdxjs.com' target='_blank' className="after:content-['_↗']">
              {chunk}
            </a>
          ),
          tailwind: (chunk: ReactNode): JSX.Element => (
            <a href='https://tailwindcss.com' target='_blank' className="after:content-['_↗']">
              {chunk}
            </a>
          ),
          typescript: (chunk: ReactNode): JSX.Element => (
            <a href='https://www.typescriptlang.org' target='_blank' className="after:content-['_↗']">
              {chunk}
            </a>
          ),
          vercel: (chunk: ReactNode): JSX.Element => (
            <a href='https://vercel.com' target='_blank' className="after:content-['_↗']">
              {chunk}
            </a>
          )
        })}
      </p>
      <p>
        {t.rich('p3', {
          new: (chunk: ReactNode) => (
            <a href='https://github.com/vladutilie/vladilie.ro' target='_blank' className="after:content-['_↗']">
              {chunk}
            </a>
          ),
          old: (chunk: ReactNode) => (
            <a
              href='https://github.com/vladutilie/vladilie.ro/tree/old-version-2023'
              target='_blank'
              className="after:content-['_↗']"
            >
              {chunk}
            </a>
          )
        })}
      </p>
    </main>
  );
}
