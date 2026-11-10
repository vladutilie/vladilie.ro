# vladilie.ro

My personal website: a bilingual (EN/RO) portfolio and blog — case studies, articles, the software I localize into Romanian, and the books, boardgames and places I keep track of.

Live at **[vladilie.ro](https://vladilie.ro)**.

## Stack

| Area         | Choice                                                                                                    |
| ------------ | --------------------------------------------------------------------------------------------------------- |
| Framework    | [Next.js 16](https://nextjs.org) (App Router, Turbopack), React 19                                        |
| Language     | TypeScript                                                                                                |
| Styling      | [Tailwind CSS v4](https://tailwindcss.com) — design tokens in `globals.css`                               |
| Content      | MDX files under `content/`, rendered with [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) |
| Highlighting | [rehype-pretty-code](https://rehype-pretty.pages.dev) + Shiki                                             |
| i18n         | [next-intl](https://next-intl.dev) with localized pathnames                                               |
| Database     | PostgreSQL (Supabase) via [Prisma 7](https://prisma.io) + `@prisma/adapter-pg`                            |
| Validation   | [zod](https://zod.dev)                                                                                    |
| Forms        | [react-hook-form](https://react-hook-form.com)                                                            |
| Email        | [Brevo](https://brevo.com) transactional templates                                                        |
| Hosting      | [Vercel](https://vercel.com)                                                                              |

## Getting started

Requires Node.js 20+ and npm.

```bash
npm install
cp .env.example .env    # then fill it in
npx prisma generate     # writes the client to generated/prisma
npm run dev             # http://localhost:3000
```

### Scripts

| Script            | What it does                                             |
| ----------------- | -------------------------------------------------------- |
| `npm run dev`     | Development server                                       |
| `npm run build`   | Production build                                         |
| `npm start`       | Serves the production build                              |
| `npm run lint`    | ESLint (flat config, `eslint.config.mjs`)                |
| `npm run db:seed` | Seeds books, boardgames and locations (`prisma/seed.ts`) |

### Environment

Copy `.env.example` and fill in what you need — the site degrades gracefully when the optional integrations are missing.

- **Site**: `NEXT_PUBLIC_SITE_NAME`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_AVAILABLE_FOR_WORK` (drives the hero availability badge), company and social links.
- **Database**: `DATABASE_URL` for the app (pooled) and `DIRECT_URL` for migrations — both read by `prisma.config.ts`.
- **GitHub**: `GITHUB_PERSONAL_ACCESS_TOKEN` for the commit counter in the hero.
- **Contact form**: `BREVO_API_KEY`, `BREVO_TEMPLATE_ID`, `EMAIL`.
- **Locations**: `UPDATE_LOCATION_KEY`, `GEOCODE_API_URL`, `GEOCODE_API_KEY`.
- **Misc**: `IP_ADDRESS_SALT` (view/reaction sessions), `SECRET_REVALIDATE`, the `GITHUB_*_PLUGIN*` tokens for the WordPress plugin update endpoints.

## Project structure

```
content/           MDX sources — blog/ and projects/, one file per locale
messages/          en.json, ro.json — every string on the site
prisma/            schema, migrations and seed
src/app/[locale]/  pages and the UI that belongs to them
  ui/              shared components: navbar, footer, homepage sections,
                   page primitives (Page, PageHeader, GroupHeading)
src/app/api/       views, reactions, locations, revalidate, WP plugin updates
src/lib/content.ts the content layer: reads the MDX files, front matter and reading time
src/i18n/          routing and localized pathnames
src/proxy.ts       next-intl locale negotiation (the Next 16 proxy convention)
```

### Writing content

Add an `.mdx` file to `content/blog` or `content/projects`. The file name becomes the slug, and the front matter is:

```yaml
---
title: The title
locale: en # or ro
featuredImage: https://res.cloudinary.com/...
blurDataImage: data:image/png;base64,...
description: Shown in listings, meta tags and share links.
keywords: [one, two]
technologies: [NextJS, Tailwind CSS] # projects only
date: December 11, 2023 18:40:55
---
```

Reading time is computed from the body, so nothing else needs maintaining.

### Design

The visual language lives in `src/app/[locale]/globals.css`: paper/ink surfaces, one electric-blue accent, hairline rules instead of shadows, Instrument Sans for text and JetBrains Mono for labels. Colors are CSS variables with light/dark values, exposed to Tailwind through `@theme inline` — so `bg-surface`, `text-content`, `border-hairline` and `text-accent` are all theme-aware.

The previous design is preserved on the [`design/legacy-2019`](https://github.com/vladutilie/vladilie.ro/tree/design/legacy-2019) branch, and an older iteration on `old-version-2023`.

## License

The source code is open. The content — articles, case studies, images — is not; please don't republish it.
