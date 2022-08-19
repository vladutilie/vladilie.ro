import Image from 'next/image';
import Link from 'next/link';

import vlad from '../../public/vlad-ilie.jpg';
import { Github, Instagram, LinkedIn, Twitter, WordPress } from '../icons';

export const Hero: React.FC = () => {
  return (
    <section className='flex flex-col-reverse items-center gap-x-4 gap-y-10 md:flex-row'>
      <div className='w-full md:w-2/3'>
        <h1 className='text-center md:text-left'>Hi there, Vlad here!</h1>
        <p className='mt-3 mb-4 leading-7'>
          I'm a <strong>Software Engineer</strong> based in Romania, I love to juggle with technologies and put my soul
          in every project to get the best of it. I'm a{' '}
          <strong>
            <Link href={process.env.NEXT_PUBLIC_NEO4J as string}>
              <a target='_blank'>Neo4j ↗</a>
            </Link>{' '}
            Certified Professional
          </strong>
          {', '}a <strong>NextJS</strong> fan, an enthusiastic of <strong>JavaScript</strong> development technologies
          and a nostalgic <strong>WordPress</strong> lover. I'm also the maintainer of{' '}
          <Link href='https://cartilepefata.ro'>
            <a target='_blank'>
              <strong>Cărțile pe Față</strong> ↗
            </a>
          </Link>{' '}
          website network.
        </p>

        <ul className='flex gap-x-2'>
          <li>
            <Link href={process.env.NEXT_PUBLIC_GITHUB as string}>
              <a>
                <Github className='hover:fill-blue-500' />
              </a>
            </Link>
          </li>
          <li>
            <Link href={process.env.NEXT_PUBLIC_INSTAGRAM as string}>
              <a>
                <Instagram className='hover:fill-blue-500' />
              </a>
            </Link>
          </li>
          <li>
            <Link href={process.env.NEXT_PUBLIC_LINKEDIN as string}>
              <a>
                <LinkedIn className='hover:fill-blue-500' />
              </a>
            </Link>
          </li>
          <li>
            <Link href={process.env.NEXT_PUBLIC_TWITTER as string}>
              <a>
                <Twitter className='hover:fill-blue-500' />
              </a>
            </Link>
          </li>
          <li>
            <Link href={process.env.NEXT_PUBLIC_WORDPRESS as string}>
              <a>
                <WordPress className='hover:fill-blue-500' />
              </a>
            </Link>
          </li>
        </ul>
      </div>

      <div className='w-56'>
        <Image src={vlad} alt={process.env.NEXT_PUBLIC_SITE_NAME} className='rounded-full' placeholder='blur' />
      </div>
    </section>
  );
};
