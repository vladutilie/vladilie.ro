import { useEffect, useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

import { PAGES } from '../src/utils/constants';
import { Testimonials } from '../src/components/Testimonials';
import { Testimonial } from '../src/types/Testimonial.type';
import { readData } from '../src/utils/readData';

type Props = { testimonials: Testimonial[] };
const About: NextPage<Props> = ({ testimonials }) => {
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
      <NextSeo
        title={[process.env.NEXT_PUBLIC_SITE_NAME, PAGES.ABOUT?.label].join(' - ')}
        description='Here you can find some details about me.'
      />

      <main className='container mx-auto flex max-w-3xl flex-col gap-y-8 px-4 pt-28'>
        <div className='flex flex-col gap-y-3'>
          <h2>About me</h2>
          <h3>{message}</h3>
          <p>Here you can find some details about me.</p>
        </div>

        <div className='flex w-full flex-col gap-x-4 gap-y-8 md:flex-row'>
          <div className='flex w-full flex-col gap-y-8 pr-2 md:w-1/2 md:border-r-2'>
            <div>
              <h2>♡ Life so far...</h2>
              <ul className='mt-4 list-disc space-y-2 pl-4'>
                <li>Breathing since 1994.</li>
                <li>Got my first PC in 2006, an IBM Pentium III, a gift from an uncle in Timișoara.</li>
                <li>2008 brought me the first line of code.</li>
                <li>Got my first award from Oracle, SQL Highschool Course in 2013.</li>
                <li>Moved to Timișoara for my studies.</li>
                <li>Got my engineering degree in 2017.</li>
                <li>
                  Moved to Cluj-Napoca for a master&apos;s degree in{' '}
                  <abbr title='Business Modelling and Distributed Computing' className='cursor-help'>
                    BMDC
                  </abbr>
                  . Never finished.
                </li>
                <li>And started freelance.</li>
              </ul>
            </div>
          </div>

          <div className='flex w-full flex-col gap-y-8 md:w-1/2'>
            <div>
              <h2>⛰ Passionate about...</h2>
              <ul className='mt-4 list-disc space-y-2 pl-4'>
                <li>technology,</li>
                <li>
                  sw <abbr title='internationalization'>i18n</abbr> &amp; localization,
                </li>
                <li>
                  <Link href={PAGES.BOOKS?.href as string}>books</Link>,
                </li>
                <li>
                  <Link href={PAGES.BOARDGAMES?.href as string}>board games</Link>,
                </li>
                <li>sudoku,</li>
                <li>hiking, nature and</li>
                <li>a bit of 🧩 puzzles.</li>
              </ul>
            </div>

            <div>
              <h2>💭 Thinking about...</h2>
              <ul className='mt-4 list-disc space-y-2 pl-4'>
                <li>a better world and</li>
                <li>ecology and sustainability</li>
              </ul>
            </div>
          </div>
        </div>

        <Testimonials testimonials={testimonials} />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { testimonials } = await readData<Props>('/public/data/testimonials.json');

  return { props: { testimonials } };
};

export default About;
