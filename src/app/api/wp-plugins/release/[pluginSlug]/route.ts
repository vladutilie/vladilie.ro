import { headers } from 'next/headers';
import { Webhooks } from '@octokit/webhooks';

import prisma from '@/lib/prisma';

const webhooks = new Webhooks({ secret: process.env.GITHUB_RELEASE_PLUGIN_SECRET! });

export async function POST(request: Request, { params }: { params: Promise<{ pluginSlug: string }> }) {
  const headersList = await headers();
  const signature = headersList.get('x-hub-signature-256');
  const body = await request.json();

  if (!(await webhooks.verify(JSON.stringify(body), signature!))) {
    return Response.json({ message: 'Unauthorized.' }, { status: 401 });
  }

  const { pluginSlug: slug } = await params;

  const newRelease = await prisma.wPPlugin.upsert({
    create: {
      name: body.release.name,
      slug,
      downloads: 0,
      version: body.release.tag_name,
      requires: '',
      requiresPhp: '',
      tested: '',
      author: body.release.author.login,
      sections: { description: body.release.body },
      homepage: '',
      assetId: body.release.assets[0].id
    },

    where: { slug },
    // TODO: I have to implement a way to get the changelog from the release body and update the "sections" field.
    update: { version: body.release.tag_name, assetId: body.release.assets[0].id }
  });

  return Response.json(newRelease);
}
