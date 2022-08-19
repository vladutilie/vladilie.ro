import Image from 'next/image';
import Link from 'next/link';

import AerLiber from '../../public/logos/projects/aerliber.png';
import COSPol from '../../public/logos/projects/cospol.png';
import CartilePeFata from '../../public/logos/projects/cartile-pe-fata.png';
import ContaDocs from '../../public/logos/projects/contadocs.png';
import GraphStars from '../../public/logos/projects/graphstars.png';
import TEDxZorilor from '../../public/logos/projects/tedxzorilor.png';
import TablouriColorate from '../../public/logos/projects/tablouri-colorate.png';
import TransilvaniaCar from '../../public/logos/projects/transilvaniacar.png';
import eBikerNation from '../../public/logos/projects/ebikernation.png';
import { BookTruck } from '../icons/BookTruck';
import { EBikeRent } from '../icons/E-BikeRent';
import {
  CSS,
  GitHub,
  HTML,
  JQuery,
  MongoDB,
  MySQL,
  Neo4j,
  NestJS,
  NextJS,
  NodeJS,
  PHP,
  PostgreSQL,
  Prisma,
  ReactJS,
  SQLite,
  Supabase,
  TailwindCSS,
  TypeScript
} from '../technologies';

export const Projects: React.FC = () => {
  return (
    <section className='flex flex-col gap-y-3'>
      <h3>Projects I've built &amp; technologies</h3>
      {/* https://codepen.io/paulobrien/pen/GROOOVQ */}
      <div className='projects relative flex h-14 items-center overflow-x-hidden'>
        <div className='project-stack absolute flex shrink-0 animate-slide justify-around'>
          <Link href='https://booktruck.ro'>
            <a className='flex-inline min-w-max self-center px-6' target='_blank'>
              <BookTruck className='flex-inline h-12 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
            </a>
          </Link>

          <Link href='https://cartilepefata.ro'>
            <a className='flex-inline min-w-max self-center px-6' target='_blank'>
              <Image
                alt='Cărțile pe Față logo'
                className='opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0'
                height={50}
                placeholder='blur'
                src={CartilePeFata}
                width={40}
              />
            </a>
          </Link>

          <Link href='https://transilvaniacar.com'>
            <a className='flex-inline min-w-max self-center px-6' target='_blank'>
              <Image
                alt='TransilvaniaCar logo'
                className='opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0'
                height={50}
                placeholder='blur'
                src={TransilvaniaCar}
                width={250}
              />
            </a>
          </Link>
          <Link href='https://contadocs.ro'>
            <a className='flex-inline min-w-max self-center px-6' target='_blank'>
              <Image
                alt='Contadocs logo'
                className='opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0'
                height={50}
                placeholder='blur'
                src={ContaDocs}
                width={85}
              />
            </a>
          </Link>
          <Link href='https://graphstars.com'>
            <a className='flex-inline min-w-max self-center px-6' target='_blank'>
              <Image
                alt='GraphStars logo'
                className='opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0'
                height={50}
                placeholder='blur'
                src={GraphStars}
                width={119}
              />
            </a>
          </Link>
          <Link href='https://tablouricolorate.ro'>
            <a className='flex-inline min-w-max self-center px-6' target='_blank'>
              <Image
                alt='TablouriColorate logo'
                className='opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0'
                height={50}
                placeholder='blur'
                src={TablouriColorate}
                width={385}
              />
            </a>
          </Link>
          <Link href='https://tedxzorilor.com'>
            <a className='flex-inline min-w-max self-center px-6' target='_blank'>
              <Image
                alt='TEDxZorilor logo'
                className='opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0'
                height={50}
                placeholder='blur'
                src={TEDxZorilor}
                width={236}
              />
            </a>
          </Link>
          <Link href='https://ebikernation.ro'>
            <a className='flex-inline min-w-max self-center px-6' target='_blank'>
              <Image
                alt='eBikerNation logo'
                className='opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0'
                height={50}
                placeholder='blur'
                src={eBikerNation}
                width={168}
              />
            </a>
          </Link>
          <Link href='https://e-bikerent.ro'>
            <a className='flex-inline min-w-max self-center px-6' target='_blank'>
              <EBikeRent className='flex-inline h-12 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
            </a>
          </Link>
          <Link href='https://aerliber.ro'>
            <a className='flex-inline min-w-max self-center px-6' target='_blank'>
              <Image
                alt='Aer liber logo'
                className='opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0'
                height={50}
                placeholder='blur'
                src={AerLiber}
                width={53}
              />
            </a>
          </Link>
          <Link href='https://cospol.upt.ro'>
            <a className='flex-inline min-w-max self-center px-6' target='_blank'>
              <Image
                alt='COSPol logo'
                className='opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0'
                height={50}
                placeholder='blur'
                src={COSPol}
                width={204}
              />
            </a>
          </Link>
        </div>

        <div className='project-stack absolute flex shrink-0 translate-x-1/2 animate-slide2 justify-around'>
          <Link href='https://booktruck.ro'>
            <a className='flex-inline min-w-max self-center px-6' target='_blank'>
              <BookTruck className='flex-inline h-12 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
            </a>
          </Link>

          <Link href='https://cartilepefata.ro'>
            <a className='flex-inline min-w-max self-center px-6' target='_blank'>
              <Image
                alt='Cărțile pe Față logo'
                className='opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0'
                height={50}
                placeholder='blur'
                src={CartilePeFata}
                width={40}
              />
            </a>
          </Link>

          <Link href='https://transilvaniacar.com'>
            <a className='flex-inline min-w-max self-center px-6' target='_blank'>
              <Image
                alt='TransilvaniaCar logo'
                className='opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0'
                height={50}
                placeholder='blur'
                src={TransilvaniaCar}
                width={250}
              />
            </a>
          </Link>
          <Link href='https://contadocs.ro'>
            <a className='flex-inline min-w-max self-center px-6' target='_blank'>
              <Image
                alt='Contadocs logo'
                className='opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0'
                height={50}
                placeholder='blur'
                src={ContaDocs}
                width={85}
              />
            </a>
          </Link>
          <Link href='https://graphstars.com'>
            <a className='flex-inline min-w-max self-center px-6' target='_blank'>
              <Image
                alt='GraphStars logo'
                className='opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0'
                height={50}
                placeholder='blur'
                src={GraphStars}
                width={119}
              />
            </a>
          </Link>
          <Link href='https://tablouricolorate.ro'>
            <a className='flex-inline min-w-max self-center px-6' target='_blank'>
              <Image
                alt='TablouriColorate logo'
                className='opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0'
                height={50}
                placeholder='blur'
                src={TablouriColorate}
                width={385}
              />
            </a>
          </Link>
          <Link href='https://tedxzorilor.com'>
            <a className='flex-inline min-w-max self-center px-6' target='_blank'>
              <Image
                alt='TEDxZorilor logo'
                className='opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0'
                height={50}
                placeholder='blur'
                src={TEDxZorilor}
                width={236}
              />
            </a>
          </Link>
          <Link href='https://ebikernation.ro'>
            <a className='flex-inline min-w-max self-center px-6' target='_blank'>
              <Image
                alt='eBikerNation logo'
                className='opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0'
                height={50}
                placeholder='blur'
                src={eBikerNation}
                width={168}
              />
            </a>
          </Link>
          <Link href='https://e-bikerent.ro'>
            <a className='flex-inline min-w-max self-center px-6' target='_blank'>
              <EBikeRent className='inline-block opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
            </a>
          </Link>
          <Link href='https://aerliber.ro'>
            <a className='flex-inline min-w-max self-center px-6' target='_blank'>
              <Image
                alt='Aer liber logo'
                className='opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0'
                height={50}
                placeholder='blur'
                src={AerLiber}
                width={53}
              />
            </a>
          </Link>
          <Link href='https://cospol.upt.ro'>
            <a className='flex-inline min-w-max self-center px-6' target='_blank'>
              <Image
                alt='COSPol logo'
                className='opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0'
                height={50}
                placeholder='blur'
                src={COSPol}
                width={204}
              />
            </a>
          </Link>
        </div>
      </div>

      <div className='projects relative flex h-10 items-center overflow-x-hidden'>
        <div className='project-stack absolute flex shrink-0 animate-slide-slow justify-around'>
          <div className='flex-inline min-w-max self-center px-3'>
            <CSS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <GitHub className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <HTML className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <JQuery className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <MongoDB className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <MySQL className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <Neo4j className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <NestJS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <NextJS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <NodeJS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <PHP className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <PostgreSQL className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <Prisma className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <ReactJS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <SQLite className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <Supabase className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <TailwindCSS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <TypeScript className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
        </div>

        <div className='project-stack absolute flex shrink-0 translate-x-1/2 animate-slide-slow2 justify-around'>
          <div className='flex-inline min-w-max self-center px-3'>
            <CSS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <GitHub className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <HTML className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <JQuery className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <MongoDB className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <MySQL className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <Neo4j className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <NestJS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <NextJS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <NodeJS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <PHP className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <PostgreSQL className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <Prisma className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <ReactJS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <SQLite className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <Supabase className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <TailwindCSS className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
          <div className='flex-inline min-w-max self-center px-3'>
            <TypeScript className='flex-inline h-10 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0' />
          </div>
        </div>
      </div>
    </section>
  );
};
