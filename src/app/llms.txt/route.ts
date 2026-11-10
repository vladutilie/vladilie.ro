import { getTranslations } from 'next-intl/server';

import { allPosts, allProjects } from '@/lib/content';
import { getPathname } from '@/i18n/routing';

// Built once per deploy from the same MDX content and messages the site renders.
export const dynamic = 'force-static';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

const url = (locale: 'en' | 'ro', href: Parameters<typeof getPathname>[0]['href']): string =>
  new URL(getPathname({ href, locale }), siteUrl).toString();

const services = ['build', 'rescue', 'care', 'localize'] as const;

/** https://llmstxt.org — a Markdown summary of the site for language models. */
export async function GET(): Promise<Response> {
  const t = await getTranslations({ locale: 'en', namespace: 'homepage' });
  const projects = allProjects();
  const posts = allPosts();

  const projectLinks = (locale: 'en' | 'ro') =>
    projects
      .filter((project) => project.locale === locale)
      .map(
        ({ title, slug, description }) =>
          `- [${title}](${url(locale, { pathname: '/projects/[slug]', params: { slug } })}): ${description}`
      );

  const postLinks = (locale: 'en' | 'ro') =>
    posts
      .filter((post) => post.locale === locale)
      .map(
        ({ title, slug, description }) =>
          `- [${title}](${url(locale, { pathname: '/blog/[slug]', params: { slug } })}): ${description}`
      );

  const body = [
    `# ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    '',
    `> ${t('metadata.description')}`,
    '',
    `Vlad Ilie runs Vlad Ilie Development SRL, a one-person software studio in Romania (since 2019). He builds WooCommerce shops, custom WordPress plugins and Next.js products for businesses and NGOs, and maintains them after launch. He has been General Translation Editor for WordPress in Romanian since 2019. The site is available in English and Romanian; Romanian pages live under /ro.`,
    '',
    '## Services',
    '',
    ...services.map((service) => `- **${t(`services.${service}.title`)}**: ${t(`services.${service}.body`)}`),
    '',
    '## Case studies',
    '',
    ...projectLinks('en'),
    '',
    '## Articles',
    '',
    ...postLinks('en'),
    '',
    '## Contact',
    '',
    `- [Contact form](${url('en', '/contact')}): ${t('contact.body')}`,
    `- [GitHub](${process.env.NEXT_PUBLIC_GITHUB})`,
    `- [LinkedIn](${process.env.NEXT_PUBLIC_LINKEDIN})`,
    '',
    '## Optional',
    '',
    `- [All case studies](${url('en', '/projects')})`,
    `- [Blog](${url('en', '/blog')})`,
    `- [Colophon](${url('en', '/colophon')}): how the site is built and the stack it runs on`,
    `- [Uses](${url('en', '/uses')}): hardware and software I use`,
    `- [Books](${url('en', '/books')}), [Boardgames](${url('en', '/boardgames')}), [Location history](${url('en', '/locations')})`,
    '',
    '### In Romanian',
    '',
    ...projectLinks('ro'),
    ...postLinks('ro'),
    ''
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
