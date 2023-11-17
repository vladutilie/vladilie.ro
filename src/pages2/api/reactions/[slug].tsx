import { NextApiRequest, NextApiResponse } from 'next';
import { createHash } from 'crypto';

import prisma from '../../../utils/prisma';
import { Reaction } from '../../../types';
import { REACTIONS } from '../../../utils/constants';

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

  const ipAddress =
    req.headers['x-forwarded-for'] ||
    // Fallback for localhost or non Vercel deployments
    '0.0.0.0';

  const ipHash = createHash('md5')
    .update(ipAddress + process.env.IP_ADDRESS_SALT!, 'utf8')
    .digest('hex');

  const slug = req.query.slug as string;
  const id = `${slug}_${ipHash}`;

  if ('GET' === req.method) {
    const [counter, session] = await Promise.all([
      prisma.postCounter.findUnique({ where: { slug } }),
      prisma.session.findUnique({ where: { id } })
    ]);

    return res.json({
      counter: {
        views: counter?.views || 0,
        likes: counter?.likes || 0,
        loves: counter?.loves || 0,
        awards: counter?.awards || 0,
        wows: counter?.wows || 0
      },
      session: {
        likes: session?.likes || false,
        loves: session?.loves || false,
        awards: session?.awards || false,
        wows: session?.wows || false
      }
    });
  }

  if ('POST' === req.method) {
    const reaction = req.body.reaction as Reaction;
    if (!REACTIONS.includes(reaction)) {
      return res.status(403).json({ message: 'Reaction value is invalid.' });
    }

    const select = { likes: true, loves: true, awards: true, wows: true };

    try {
      let session = await prisma.session.findFirst({ where: { id, [reaction]: true }, select });
      let counter = await prisma.postCounter.findFirst({ where: { slug }, select });
      if (!session) {
        session = await prisma.session.upsert({
          where: { id },
          create: { id, [reaction]: true },
          update: { [reaction]: true, updatedAt: new Date() },
          select
        });

        counter = await prisma.postCounter.upsert({
          where: { slug },
          create: { slug, views: 1, [reaction]: 1 },
          update: { [reaction]: { increment: 1 } },
          select
        });
      }

      return res.json({ counter, session });
    } catch (error) {
      return res.status(500).json({ message: 'The reaction value is not valid.' });
    }
  }
}
