import { StaticImageData } from 'next/image';

export type FeaturedServiceType = {
  image: StaticImageData;
  title: string;
  url: string;
  description: string;
};
