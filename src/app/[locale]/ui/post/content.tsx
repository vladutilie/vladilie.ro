import Link from 'next/link';
import { useMDXComponent } from 'next-contentlayer/hooks';

export const Content: React.FC<{ content: string }> = ({ content }) => {
  const MDXContent = useMDXComponent(content);

  const components = {
    Link,
    ul: (props: any) => <ul className='list-inside list-disc' {...props} />,
    ol: (props: any) => <ul className='list-inside list-decimal' {...props} />
  };

  // @ts-ignore
  return <MDXContent components={{ ...components }} />;
};
