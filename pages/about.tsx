import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { PAGES } from '../src/utils/constants';

const About: NextPage = () => {
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    // 06-08 Good morning, sunshine! 🌞
    // 08-12 Good morning! ☀️
    // 12-18 Good afternoon! 🏸
    // 18-23 Good evening! 🥱
    // 23-06 Hey, you night bird! 😴

    const h = new Date().getHours();
    let message: string;

    if (6 <= h && h < 8) {
      message = 'Good morning, sunshine! 🌞';
    } else if (8 <= h && h < 12) {
      message = 'Good morning! ☀️';
    } else if (12 <= h && h < 18) {
      message = 'Good afternoon! 🏸';
    } else if (18 <= h && h < 23) {
      message = 'Good evening! 🥱';
    } else {
      message = 'Hey, you night bird! 🦉';
    }
    setMessage(message);
  }, []);

  return (
    <>
      <Head>
        <title>{[process.env.NEXT_PUBLIC_SITE_NAME, 'About'].join(' - ')}</title>
      </Head>

      <main className='container mx-auto flex max-w-3xl flex-col gap-y-8 px-4'>
        <div className='flex flex-col gap-y-3'>
          <h2>About me</h2>
          <p>{message} Here you can find some professional and personal details about me.</p>
        </div>

        <div className='flex w-full flex-col gap-x-4 gap-y-8 md:flex-row'>
          <div className='flex w-full flex-col gap-y-8 pr-2 md:w-1/2 md:border-r-2'>
            <div>
              <h2>♡ Life so far...</h2>
              <ul className='mt-4 list-disc space-y-2 pl-4'>
                <li>Breathing since 1994</li>
                <li>Got my first PC in 2006, an IBM Pentium III, a gift from an uncle in Timișoara</li>
                <li>2008 brought me the first line of code</li>
                <li>Got my first award from Oracle, SQL Highschool Course in 2013</li>
                <li>Moved in Timișoara for studies</li>
                <li>Got my engineering degree in 2017</li>
                <li>Moved in Cluj-Napoca for a master&apos;s degree in business, never finished</li>
                <li>And started freelance</li>
                <li>
                  Passionate about{' '}
                  <Link href={PAGES.BOOKS?.href as string}>
                    <a>books</a>
                  </Link>
                  ,{' '}
                  <Link href={PAGES.BOARDGAMES?.href as string}>
                    <a>board games</a>
                  </Link>
                  , hiking, nature and a bit of puzzles.
                </li>
              </ul>
            </div>
          </div>

          <div className='flex w-full flex-col gap-y-8 md:w-1/2'>
            <div>
              <h2>💻 Preferred technologies</h2>
              <ul className='mt-4 list-disc space-y-2 pl-4'>
                <li>TypeScript</li>
                <li>NodeJS</li>
                <li>Neo4j</li>
                <li>TailwindCSS</li>
                <li>Prisma</li>
              </ul>
            </div>

            <div>
              <h2>🖱 I also use...</h2>
              <ul className='mt-4 list-disc space-y-2 pl-4'>
                <li>NextJS, NestJS</li>
                <li>Supabase</li>
                <li>PostgreSQL, MongoDB, MySQL</li>
                <li>PHP</li>
                <li>WordPress</li>
                <li>and other related technologies</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
