export const NavLinks = {
  About: 'about',
  Services: 'services',
  Skills: 'skills',
  Work: 'work',
  Localization: 'localization',
  Writing: 'writing'
} as const;

// The homepage anchors surfaced in the header navigation, in page order.
export const HeaderAnchors = [NavLinks.About, NavLinks.Skills, NavLinks.Localization];

export const Pages = {
  Blog: 'blog',
  Projects: 'projects',
  Contact: 'contact',
  Colophon: 'colophon',
  Uses: 'uses',
  Books: 'books',
  Boardgames: 'boardgames'
} as const;
