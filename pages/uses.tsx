import type { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { Tool as ToolType } from '../src/types';
import { readData } from '../src/utils/readData';
import { Tool } from '../src/components';
import { PAGES } from '../src/utils/constants';

type Props = { tools: { [key: string]: ToolType[] }; categories: string[] };
const Uses: NextPage<Props> = ({ tools, categories }) => (
  <>
    <NextSeo
      title={[process.env.NEXT_PUBLIC_SITE_NAME, PAGES.USES?.label].join(' - ')}
      description="I can't do magic by myself, but the right software tools in the right hands are doing a great job."
    />

    <main className='container mx-auto flex max-w-3xl flex-col gap-y-8 px-4'>
      <div className='flex flex-col gap-y-3'>
        <h2>Uses</h2>
        <p>I can&apos;t do magic by myself, but the right software tools in the right hands are doing a great job.</p>
      </div>

      <div className='flex flex-col'>
        {categories.map((category: string) => (
          <div key={category} className='mb-8 flex flex-col gap-y-4'>
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

export default Uses;
