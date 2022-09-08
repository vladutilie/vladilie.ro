import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../src/utils/prisma';

// For BigInt serialization
// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const allowedMethods = ['GET', 'POST'];
  if (!allowedMethods.includes(method as string)) {
    res.setHeader('Allow', allowedMethods);

    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const slug = req.query.slug as string;
  if ('GET' === req.method) {
    const post = await prisma.postCounter.findUnique({ where: { slug } });

    return res.status(200).json(post?.views || 1);
  }

  if ('POST' === req.method) {
    const isLive = 'undefined' !== typeof req.headers['x-forwarded-for'];

    const post = await prisma.postCounter.upsert({
      where: { slug },
      create: { slug, views: 0 },
      update: { views: { increment: isLive ? 1 : 0 } }
    });

    return res.status(200).json(post?.views || 1);
  }
}
