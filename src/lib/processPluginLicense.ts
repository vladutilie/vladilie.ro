'use server';

import { NextRequest } from 'next/server';
import { LicensePlan } from '@prisma/client';

import prisma from '@/lib/prisma';

export const processPluginLicense = async (request: NextRequest, fallbackLicense: string = '') => {
  const slug = request.nextUrl.pathname
    .split('/')
    .pop()
    ?.replace(/\.\d+\.\d+\.\d+\.zip$/, '');
  const headersList = request.headers;

  const userAgent = headersList.get('user-agent');
  const [, domain] = userAgent?.match(/https?:\/\/([^\s]+)/) || '';

  const licenseKey = headersList.get('x-license-key') || fallbackLicense;
  const plugin = await prisma.wPPlugin.findUnique({ where: { slug } });
  if (!plugin) {
    throw new Error(`The "${slug}" plugin was not found.`);
  }

  const license = await prisma.license.findFirst({ where: { key: licenseKey } });
  if (!license) {
    const checkGumroadLicense = await fetch('https://api.gumroad.com/v2/licenses/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: plugin.productId, license_key: licenseKey })
    });

    const licenseData = await checkGumroadLicense.json();
    if (!licenseData.success) {
      console.warn(`Gumroad license "${licenseKey}" error.`, licenseData);

      throw new Error(`Gumroad license "${licenseKey}" error.`);
    }

    let plan: LicensePlan = LicensePlan.Annual;
    if ('(Lifetime)' === licenseData.purchase.variants) {
      plan = LicensePlan.Lifetime;
    }

    await prisma.license.create({
      data: {
        pluginId: plugin.id,
        key: licenseKey,
        domain,
        plan,
        validity: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      }
    });
  } else if (license.plan === LicensePlan.Annual && !domain) {
    throw new Error(
      'The license could not be verified agains an empty domain URL. The "user-agent" header is required.'
    );
  } else if (license.plan === LicensePlan.Annual && license.domain !== domain) {
    throw new Error(
      `The license "${licenseKey}" is only available for the "${license.domain}" domain, not for "${domain}".`
    );
  } else if (license.validity < new Date()) {
    throw new Error(`The license "${licenseKey}" is expired at ${license.validity}.`);
  }

  return plugin;
};
