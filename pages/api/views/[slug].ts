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
    const post = await prisma.postCounter.upsert({
      where: { slug },
      create: { slug, views: 1 },
      update: { views: { increment: 1 } }
    });

    return res.status(200).json(post?.views || 1);
  }
}
