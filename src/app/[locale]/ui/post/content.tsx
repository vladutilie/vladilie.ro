import { useMDXComponent } from 'next-contentlayer/hooks';

export const Content: React.FC<{ content: string }> = ({ content }) => {
  const MDXContent = useMDXComponent(content);

  return <MDXContent />;
};
