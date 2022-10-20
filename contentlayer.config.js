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
    date: { type: 'date', required: true },
    modified: { type: 'date', required: false },
    description: { type: 'string', required: true }
  },
  computedFields: {
    slug: { type: 'string', resolve: (post) => post._raw.sourceFileName.replace(/\.mdx$/, '') },
    readingTime: { type: 'string', resolve: (post) => readingTime(post.body.raw).text }
  }
}));

export const CaseStudy = defineDocumentType(() => ({
  name: 'CaseStudy',
  contentType: 'mdx',
  filePathPattern: 'case-studies/*.mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    modified: { type: 'date', required: false },
    description: { type: 'string', required: true }
  },
  computedFields: {
    slug: { type: 'string', resolve: (post) => post._raw.sourceFileName.replace(/\.mdx$/, '') },
    readingTime: { type: 'string', resolve: (post) => readingTime(post.body.raw).text }
  }
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, CaseStudy],
  mdx: {
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]]
  }
});
