export const NavLinks = {
  About: 'about',
  Services: 'services',
  Skills: 'skills',
  Education: 'education',
  Work: 'work',
  Localization: 'localization',
  Writing: 'writing'
} as const;

// The anchors surfaced in the header navigation, in the order of the page.
export const HeaderLinks = [NavLinks.About, NavLinks.Skills, NavLinks.Work, NavLinks.Localization, NavLinks.Writing];

export const Pages = {
  Blog: 'blog',
  Projects: 'projects',
  Contact: 'contact',
  Colophon: 'colophon',
  Uses: 'uses',
  Books: 'books',
  Boardgames: 'boardgames'
} as const;
