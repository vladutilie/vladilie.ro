export const NavLinks = {
  About: 'about',
  Education: 'education',
  Skills: 'skills',
  Projects: 'projects',
  Blog: 'blog',
  Contact: 'contact'
} as const;

export const Pages = [
  { i18nKey: 'blog', url: '/blog' },
  { i18nKey: 'projects', url: '/projects' },
  { i18nKey: 'contact', url: '/contact' },
  { i18nKey: 'colophon', url: '/colophon' },
  { i18nKey: 'uses', url: '/uses' },
  { i18nKey: 'books', url: '/books' },
  { i18nKey: 'boardgames', url: '/boardgames' }
] as const;
