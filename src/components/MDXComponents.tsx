import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const Code = ({ children: codeString, className: language }: any) => {
  if (!language) {
    return <code className='rounded-md bg-white px-1 py-0.5 text-blue-300'>{codeString}</code>;
  }
  language = language.replace('language-', '');
  const showLineNumbers = !['shell', 'text'].includes(language);

  return (
    <SyntaxHighlighter language={language} style={atomOneLight} showLineNumbers={showLineNumbers}>
      {codeString}
    </SyntaxHighlighter>
  );
};

export const MDXComponents = {
  h2: (props: any) => <h2 id={props.children.toLowerCase().replaceAll(' ', '-')}>{props.children}</h2>,
  code: Code,
  ul: (props: any) => <ul className='ml-4 list-disc space-y-2' {...props} />,
  blockquote: (props: any) => (
    <blockquote className='rounded-md border-l-4 border-red-400 bg-amber-100 p-2'>{props.children}</blockquote>
  )
};
