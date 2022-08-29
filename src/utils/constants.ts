import { Pages, Socials } from '../types/Page.type';

export const PAGES: Pages = {
  HOME: { label: 'Home', href: '/' },
  ABOUT: { label: 'About', href: '/about' },
  BLOG: { label: 'Blog', href: '/blog' },
  CASE_STUDIES: { label: 'Case studies', href: '/case-studies' },
  COLOPHON: { label: 'Colophon', href: '/colophon' },
  USES: { label: 'Uses', href: '/uses' },
  BOOKS: { label: 'Books', href: '/books' },
  BOARDGAMES: { label: 'Board games', href: '/boardgames' }
};

export const SOCIAL_LINKS: Socials = {
  GITHUB: { label: 'GitHub', href: process.env.NEXT_PUBLIC_GITHUB as string },
  INSTAGRAM: { label: 'Instagram', href: process.env.NEXT_PUBLIC_INSTAGRAM as string },
  LINKEDIN: { label: 'LinkedIn', href: process.env.NEXT_PUBLIC_LINKEDIN as string },
  TWITTER: { label: 'Twitter', href: process.env.NEXT_PUBLIC_TWITTER as string },
  WORDPRESS: { label: 'WordPress', href: process.env.NEXT_PUBLIC_WORDPRESS as string }
};

export const SEO_DESCRIPTION =
  'Neo4j Certified Professional, NextJS fan, enthusiastic of JavaScript development technologies and nostalgic WordPress lover.';
