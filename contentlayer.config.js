import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypePrettyCode from 'rehype-pretty-code';
import readingTime from 'reading-time';

import { rehypePrettyCodeOptions } from './src/utils/rehypePrettyCode';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'mdx',
  filePathPattern: 'blog/*.mdx',
  fields: {
    title: { type: 'string', required: true },
    locale: { type: 'enum', options: ['en', 'ro'], default: 'en', required: true },
    featuredImage: { type: 'string', required: true },
    blurDataImage: { type: 'string', required: true },
    description: { type: 'string', required: true },
    keywords: { type: 'list', of: { type: 'string' }, required: true },
    date: { type: 'date', required: true }
  },
  computedFields: {
    slug: { type: 'string', resolve: (post) => post._raw.sourceFileName.replace(/\.mdx$/, '') },
    readingTime: { type: 'number', resolve: (post) => readingTime(post.body.raw).minutes }
  }
}));

export const Project = defineDocumentType(() => ({
  name: 'Project',
  contentType: 'mdx',
  filePathPattern: 'projects/*.mdx',
  fields: {
    title: { type: 'string', required: true },
    locale: { type: 'enum', options: ['en', 'ro'], default: 'en', required: true },
    featuredImage: { type: 'string', required: true },
    blurDataImage: { type: 'string', required: true },
    description: { type: 'string', required: true },
    keywords: { type: 'list', of: { type: 'string' }, required: true },
    technologies: { type: 'list', of: { type: 'string' }, required: true },
    website: { type: 'string', required: false },
    date: { type: 'date', required: true }
  },
  computedFields: {
    slug: { type: 'string', resolve: (post) => post._raw.sourceFileName.replace(/\.mdx$/, '') },
    readingTime: { type: 'number', resolve: (post) => readingTime(post.body.raw).minutes }
  }
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Project],
  mdx: { rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]] }
});
