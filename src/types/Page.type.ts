type PageType =
  | 'HOME'
  | 'ABOUT'
  | 'BLOG'
  | 'CASE_STUDIES'
  | 'COLOPHON'
  | 'USES'
  | 'BOOKS'
  | 'BOARDGAMES'
  | 'INSPIRATION'
  | 'LOCATIONS';
type SocialType = 'GITHUB' | 'LINKEDIN' | 'TWITTER' | 'WORDPRESS' | 'POLYWORK';

export type Page = { label: string; href: string };

export type Pages = {
  [k in PageType]?: Page;
};

export type Socials = {
  [k in SocialType]?: Page;
};
