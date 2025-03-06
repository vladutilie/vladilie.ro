import { NextRequest } from 'next/server';

import { processPluginLicense } from '@/lib/processPluginLicense';

export async function GET(request: NextRequest, { params }: { params: Promise<{ pluginSlug: string }> }) {
  try {
    const { pluginSlug: slug } = await params;
    const plugin = await processPluginLicense(request);

    return Response.json({ slug, latest: plugin.version });
  } catch (error: any) {
    console.error(error.message);

    return Response.json({ error: error.message }, { status: 400 });
  }
}
