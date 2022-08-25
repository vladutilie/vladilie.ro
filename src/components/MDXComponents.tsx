import NextImage from 'next/image';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const Pre = (props: React.PropsWithChildren) => <pre className='overflow-x-auto rounded-md bg-white' {...props} />;

const Code = ({ children: codeString, className: language }: any) => {
  if (!language) {
    return <code>{codeString}</code>;
  }
  language = language.replace('language-', '');
  const showLineNumbers = !['shell', 'text'].includes(language);

  return (
    <SyntaxHighlighter language={language} style={atomOneLight} showLineNumbers={showLineNumbers}>
      {codeString}
    </SyntaxHighlighter>
  );
};

const Image = (props: any) => {
  return <NextImage {...props} layout='responsive' loading='lazy' quality={100} />;
};

export const MDXComponents = {
  h2: (props: any) => <h2 id={props.children.toLowerCase().replaceAll(' ', '-')}>{props.children}</h2>,
  code: Code,
  pre: Pre,
  img: Image,
  ul: (props: any) => <ul className='ml-4 list-disc space-y-2' {...props} />,
  blockquote: (props: any) => (
    <blockquote className='rounded-md border-l-4 border-red-400 bg-amber-100 p-2'>{props.children}</blockquote>
  )
};
