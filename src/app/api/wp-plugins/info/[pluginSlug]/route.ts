import prisma from '@/lib/prisma';
import { LicensePlan } from '@prisma/client';
import { headers } from 'next/headers';

export async function GET(_: Request, { params }: { params: Promise<{ pluginSlug: string }> }) {
  try {
    const headersList = await headers();
    const referer = headersList.get('referer');
    const licenseKey = headersList.get('x-license-key') || '';

    const { pluginSlug: slug } = await params;
    const plugin = await prisma.wPPlugin.findUnique({ where: { slug } });
    if (!plugin) {
      return Response.json({ error: 'Plugin not found.' }, { status: 404 });
    }

    if (!licenseKey) {
      // return Response.json({ error: 'License key not found.' }, { status: 404 });
    }

    const license = await prisma.license.findFirst({ where: { key: licenseKey, wpPlugin: { slug } } });
    const active_installs = await prisma.license.count();

    let licenseIsValid = true;
    if (!license) {
      licenseIsValid = false;
    } else if (license.validity < new Date()) {
      licenseIsValid = false;
    } else if (license.plan === LicensePlan.Annual && license.domain !== referer) {
      // licenseIsValid = false;
    }
    console.log(licenseIsValid);
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
      download_link: licenseIsValid
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/wp-plugins/package/${slug}.${plugin.version}.zip?license=${licenseKey}`
        : '',
      author: plugin.author,
      homepage: plugin.homepage,
      rating: 0,
      num_ratings: 0,
      req: { latest: '0.1.1', licenseKey, referer, slug }
    };

    return Response.json(response);
  } catch (error: any) {
    console.error(error.message);

    return Response.json({ error: error.message }, { status: 400 });
  }
}
