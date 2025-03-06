import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

import prisma from '@/lib/prisma';
import { processPluginLicense } from '@/lib/processPluginLicense';

export async function GET(request: NextRequest, { params }: { params: Promise<{ pluginSlug: string }> }) {
  try {
    const headersList = await headers();
    const licenseKey = headersList.get('x-license-key') || '';

    const { pluginSlug: slug } = await params;
    const plugin = await processPluginLicense(request);

    const active_installs = await prisma.license.count();

    const response = {
      name: plugin.name,
      slug,
      plugin_name: slug,
      version: plugin.version,
      requires: plugin.requires,
      requires_php: plugin.requiresPhp,
      tested: plugin.tested,
      downloaded: plugin.downloads,
      active_installs, // the number of licenses, just for stats.
      last_updated: plugin.updatedAt.toISOString(),
      sections: plugin.sections,
      url: '',
      download_link: `${process.env.NEXT_PUBLIC_SITE_URL}/api/wp-plugins/package/${slug}.${plugin.version}.zip?license=${licenseKey}`,
      author: plugin.author,
      homepage: plugin.homepage,
      rating: 0,
      num_ratings: 0
    };

    return Response.json(response);
  } catch (error: any) {
    console.error(error.message);

    return Response.json({ error: error.message }, { status: 400 });
  }
}
