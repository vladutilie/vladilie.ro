import { NextRequest } from 'next/server';

import prisma from '@/lib/prisma';
import { LicensePlan } from '@prisma/client';

const GITHUB_API_URL = 'https://api.github.com/repos';
const GITHUB_TOKEN = process.env.GITHUB_CNRWOO_LICENSING_TOKEN;
const GITHUB_REPO = process.env.GITHUB_CNRWOO_REPOSITORY;

export async function GET(req: NextRequest, { params }: { params: Promise<{ pluginSlug: string }> }) {
  try {
    const { pluginSlug } = await params;
    const [slug] = pluginSlug.split('.');

    const plugin = await prisma.wPPlugin.findUnique({ where: { slug } });
    if (!plugin) {
      return Response.json({ error: 'Plugin not found.' }, { status: 404 });
    }

    const searchParams = req.nextUrl.searchParams;
    const licenseKey = searchParams.get('license');

    if (!licenseKey) {
      return Response.json({ error: 'License key not found.' }, { status: 404 });
    }

    const license = await prisma.license.findFirst({ where: { key: licenseKey } });

    if (!license) {
      return Response.json({ error: 'License key not found.' }, { status: 404 });
    } else if (license.validity < new Date()) {
      return Response.json({ error: 'License key is expired.' }, { status: 400 });
      /*} else if (license.plan === LicensePlan.Annual && license.domain !== 'referer') {
      return Response.json({ error: 'License key is already set for another domain.' }, { status: 400 });
    */
    } else {
      const download = await fetch(`${GITHUB_API_URL}/${GITHUB_REPO}/releases/assets/${plugin.assetId}`, {
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: 'application/octet-stream' }
      });

      if (!download.ok) {
        return Response.json({ error: 'Failed to download the file.' }, { status: 500 });
      }

      await prisma.wPPlugin.update({ where: { slug }, data: { downloads: { increment: 1 } } });

      const zipBuffer = await download.arrayBuffer();
      const zipBlob = new Blob([zipBuffer], { type: 'application/zip' });

      return new Response(zipBlob, {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${slug}.${plugin.version}.zip"`,
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  } catch (error: any) {
    return Response.json({ error: error.message });
  }
}
