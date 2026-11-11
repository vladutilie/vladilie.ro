export const NavLinks = {
  Work: 'work',
  Services: 'services',
  Process: 'process',
  About: 'about',
  Contact: 'contact'
} as const;

// The homepage anchors surfaced in the header navigation, in page order.
export const HeaderAnchors = [NavLinks.Work, NavLinks.Services, NavLinks.Process, NavLinks.About];

export const Pages = {
  Blog: 'blog',
  Projects: 'projects',
  Contact: 'contact',
  Colophon: 'colophon',
  Uses: 'uses',
  Books: 'books',
  Boardgames: 'boardgames'
} as const;
