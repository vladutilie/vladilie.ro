import { MetadataRoute } from 'next';
import { getPathname } from '@/navigation';
import { Post, Project, allPosts, allProjects } from 'contentlayer/generated';

export default function sitemap(): MetadataRoute.Sitemap {
  const links: MetadataRoute.Sitemap = [
    { url: '/', priority: 1, changeFrequency: 'weekly', lastModified: new Date() },
    { url: '/ro', priority: 1, changeFrequency: 'weekly', lastModified: new Date() },

    { url: '/blog', priority: 0.9, changeFrequency: 'monthly', lastModified: new Date() },
    { url: '/ro/blog', priority: 0.9, changeFrequency: 'monthly', lastModified: new Date() },

    { url: '/projects', priority: 0.9, changeFrequency: 'monthly', lastModified: new Date() },
    { url: '/ro/proiecte', priority: 0.9, changeFrequency: 'monthly', lastModified: new Date() },

    { url: '/locations', priority: 0.8, changeFrequency: 'weekly', lastModified: new Date() },
    { url: '/ro/locatii', priority: 0.8, changeFrequency: 'weekly', lastModified: new Date() },

    { url: '/contact', priority: 0.8, changeFrequency: 'yearly', lastModified: new Date() },
    { url: '/ro/contact', priority: 0.8, changeFrequency: 'yearly', lastModified: new Date() },

    { url: '/colophon', priority: 0.7, changeFrequency: 'yearly', lastModified: new Date() },
    { url: '/ro/colofon', priority: 0.7, changeFrequency: 'yearly', lastModified: new Date() },

    { url: '/uses', priority: 0.7, changeFrequency: 'yearly', lastModified: new Date() },
    { url: '/ro/utilizari', priority: 0.7, changeFrequency: 'yearly', lastModified: new Date() },

    { url: '/books', priority: 0.7, changeFrequency: 'monthly', lastModified: new Date() },
    { url: '/ro/carti', priority: 0.7, changeFrequency: 'monthly', lastModified: new Date() },

    { url: '/boardgames', priority: 0.7, changeFrequency: 'monthly', lastModified: new Date() },
    { url: '/ro/jocuri-societate', priority: 0.7, changeFrequency: 'monthly', lastModified: new Date() },

    { url: '/terms', priority: 0.5, changeFrequency: 'yearly', lastModified: '2023-12-06T18:00:00.000Z' },
    { url: '/ro/termeni', priority: 0.7, changeFrequency: 'yearly', lastModified: '2023-12-06T18:00:00.000Z' },

    { url: '/privacy', priority: 0.5, changeFrequency: 'yearly', lastModified: '2023-12-06T18:00:00.000Z' },
    { url: '/ro/confidentialitate', priority: 0.7, changeFrequency: 'yearly', lastModified: '2023-12-06T18:00:00.000Z' }
  ];

  links.forEach((item) => {
    item.url = new URL(item.url, process.env.NEXT_PUBLIC_SITE_URL).toString();
  });

  allPosts.map(({ slug, date, locale }: Post) =>
    links.push({
      url: new URL(
        ('ro' === locale ? '/ro' : '') + getPathname({ href: { pathname: '/blog/[slug]', params: { slug } }, locale }),
        process.env.NEXT_PUBLIC_SITE_URL
      ).toString(),
      priority: 0.7,
      changeFrequency: 'monthly',
      lastModified: date
    })
  );

  allProjects.map(({ slug, date, locale }: Project) =>
    links.push({
      url: new URL(
        ('ro' === locale ? '/ro' : '') +
          getPathname({ href: { pathname: '/projects/[slug]', params: { slug } }, locale }),
        process.env.NEXT_PUBLIC_SITE_URL
      ).toString(),
      priority: 0.7,
      changeFrequency: 'monthly',
      lastModified: date
    })
  );

  return links;
}
