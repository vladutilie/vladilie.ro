import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

export async function GET(_: Request, { params }: { params: Promise<{ pluginSlug: string }> }) {
  try {
    const headersList = await headers();

    // TODO: Think about how should I handle the license key and the referer.
    const referer = headersList.get('referer');
    const licenseKey = headersList.get('x-license-key');

    const { pluginSlug: slug } = await params;
    const plugin = await prisma.wPPlugin.findUnique({ where: { slug } });
    if (!plugin) {
      return Response.json({ error: 'Plugin not found.' }, { status: 404 });
    }

    return Response.json({ slug, latest: plugin.version });
  } catch (error: any) {
    console.error(error.message);

    return Response.json({ error: error.message }, { status: 400 });
  }
}
