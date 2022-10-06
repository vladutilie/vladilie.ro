import { GetServerSidePropsContext } from 'next';

import { PAGES } from 'src/utils/constants';
import { allPosts, type Post as PostType } from '../.contentlayer/generated';
import { allCaseStudies, type CaseStudy as CaseStudyType } from '../.contentlayer/generated';

const generateSiteMap = () => {
  const blogPosts = allPosts.map(({ slug, date, modified }: PostType) => ({
    slug: `/blog/${slug}`,
    date,
    modified
  }));
  const caseStudies = allCaseStudies.map(({ slug, date, modified }: CaseStudyType) => ({
    slug: `/case-studies/${slug}`,
    date,
    modified
  }));

  const date = new Date().toISOString();
  const pages: { slug: string; date: string; modified?: string }[] = [
    { slug: PAGES.HOME?.href as string, date },
    { slug: PAGES.ABOUT?.href as string, date },
    { slug: PAGES.BLOG?.href as string, date },
    { slug: PAGES.CASE_STUDIES?.href as string, date },
    { slug: PAGES.COLOPHON?.href as string, date },
    { slug: PAGES.USES?.href as string, date },
    { slug: PAGES.BOOKS?.href as string, date },
    { slug: PAGES.BOARDGAMES?.href as string, date },
    ...blogPosts,
    ...caseStudies
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pages
       .map(({ slug, date, modified }) => {
         return `
        <url>
            <loc>${`${process.env.NEXT_PUBLIC_SITE_URL}${slug}`}</loc>
            <lastmod>${modified || date}</lastmod>
            <priority>1.0</priority>
        </url>
      `;
       })
       .join('')}
   </urlset>
 `;
};

function SiteMap() {}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {}
  };
}

export default SiteMap;
