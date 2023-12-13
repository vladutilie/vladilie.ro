import { type Options } from 'rehype-pretty-code';

export const rehypeOptions: Partial<Options> = {
  theme: 'one-dark-pro',
  onVisitHighlightedLine(node) {
    node.properties.className?.push('line--highlighted');
  }
};
