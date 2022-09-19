import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { NextSeo } from 'next-seo';

import { PAGES } from '../src/utils/constants';

const links = [
  { link: 'https://nikolovlazar.com', name: 'Nikolov Lazar' },
  { link: 'https://jahir.dev', name: 'Jahir Fiquitiva' },
  { link: 'https://delba.dev', name: 'Delba de Oliveira' },
  { link: 'https://jimramsden.com', name: 'Jim Ramsden' }
];

const Inspiration: NextPage = () => {
  return (
    <>
      <NextSeo
        title={[process.env.NEXT_PUBLIC_SITE_NAME, PAGES.INSPIRATION?.label].join(' - ')}
        description='Here you can find some details about me.'
      />

      <main className='container mx-auto flex max-w-3xl flex-col gap-y-8 px-4 pt-28'>
        <div className='flex flex-col gap-y-3'>
          <h2>Inspiration</h2>
          <p>
            These sites inspired parts of my website or people I admire and try to thank them by putting them on my
            &quot;wall of fame&quot; 🙏🏻.
          </p>

          <ul className='flex flex-wrap'>
            {links.map(({ link, name }) => (
              <li key={name} className='w-full p-2 md:w-1/3'>
                <Link href={link}>
                  <a target='_blank' className='flex items-center gap-2 hover:underline'>
                    <Image
                      alt={name}
                      height={24}
                      src={`https://unavatar.io/microlink/${link.replace('https://', '')}`}
                      width={24}
                    />
                    {name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

export default Inspiration;
