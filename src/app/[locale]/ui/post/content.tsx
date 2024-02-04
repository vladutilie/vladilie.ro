import Link from 'next/link';
import { useMDXComponent } from 'next-contentlayer/hooks';

export const Content: React.FC<{ content: string }> = ({ content }) => {
  const MDXContent = useMDXComponent(content);

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

  // @ts-ignore
  return <MDXContent components={{ ...components }} />;
};
