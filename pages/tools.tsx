import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import { ToolType } from '../src/types/Tool.type';
import { readData } from '../src/utils/readData';
import { Tool } from '../src/components';

type Props = {
  tools: { [key: string]: ToolType[] };
  categories: string[];
};

const Tools: NextPage<Props> = ({ tools, categories }) => (
  <>
    <Head>
      <title>{[process.env.NEXT_PUBLIC_SITE_NAME, 'Tools'].join(' - ')}</title>
    </Head>

    <main className='container mx-auto flex max-w-3xl flex-col px-4'>
      <h2>Software tools</h2>
      <p className='mt-3'>
        I can&apos;t do magic by myself, but the right software tools in the right hands are doing a great job.
      </p>

      <div className='flex flex-col'>
        {categories.map((category) => (
          <div key={category} className='mt-16 flex flex-col gap-y-4'>
            <h2 className='capitalize'>{category}</h2>
            <ul className='flex flex-col gap-y-10'>
              {tools[category].map((tool) => (
                <li key={tool.url}>
                  <Tool {...tool} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  </>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { tools: toolsData } = await readData<{ tools: ToolType[] }>('/public/data/tools.json');
  const tools: { [key: string]: ToolType[] } = {};

  toolsData.forEach((tool: ToolType) => {
    if (!tools[tool.category]) {
      tools[tool.category] = [];
    }
    tools[tool.category] = [...tools[tool.category], tool];
  });
  const categories = Object.keys(tools);

  return { props: { tools, categories } };
};

export default Tools;
