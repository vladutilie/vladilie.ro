/** The shape of the front matter shared by every MDX document. */
type Document = {
  title: string;
  locale: 'en' | 'ro';
  featuredImage?: string;
  blurDataImage?: string;
  description: string;
  keywords: string[];
  date: string;
  /** File name without the extension. */
  slug: string;
  /** Estimated reading time, in minutes. */
  readingTime: number;
  /** The raw MDX body, without the front matter. */
  body: string;
};

export type Post = Document;

export type Project = Document & {
  technologies: string[];
  /** Short mono kicker shown on cards, e.g. "WooCommerce · Ops". */
  kind?: string;
  /** Public URL of the project, when there is one. */
  url?: string;
};
