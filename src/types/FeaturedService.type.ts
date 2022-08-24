import { StaticImageData } from 'next/image';

export type FeaturedService = {
  image: StaticImageData;
  title: string;
  url: string;
  description: string;
};
