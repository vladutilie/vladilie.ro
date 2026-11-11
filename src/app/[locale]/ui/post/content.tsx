import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';

import { rehypeOptions } from '@/lib/rehypeOptions';

// Custom components in MDX: https://github.com/delbaoliveira/website/blob/main/ui/MdxComponents.tsx
const components = {
  Link: (props: any) => {
    if (props.href.startsWith('http')) {
      return <Link className="after:content-['_↗']" target='_blank' {...props} />;
    }

    return <Link {...props} />;
  },
  ul: (props: any) => <ul className='list-inside list-disc' {...props} />,
  ol: (props: any) => <ul className='list-inside list-decimal' {...props} />
};

export const Content: React.FC<{ content: string }> = ({ content }) => (
  <MDXRemote
    source={content}
    components={components}
    options={{ mdxOptions: { rehypePlugins: [[rehypePrettyCode, rehypeOptions]] } }}
  />
);
