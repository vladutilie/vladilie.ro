type PageType = 'HOME' | 'ABOUT' | 'BLOG' | 'CASE_STUDIES' | 'COLOPHON' | 'TOOLS' | 'BOOKS' | 'BOARDGAMES' | 'QUOTES';
type SocialType = 'GITHUB' | 'INSTAGRAM' | 'LINKEDIN' | 'TWITTER' | 'WORDPRESS';

export type Page = { label: string; href: string };

export type Pages = {
  [k in PageType]?: Page;
};

export type Socials = {
  [k in SocialType]?: Page;
};
