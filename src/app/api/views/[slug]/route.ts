import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/utils/prisma';

// For BigInt serialization
// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function GET(request: NextApiRequest, { params: { slug } }: { params: { slug: string } }) {
  const post = await prisma.postCounter.findUnique({ where: { slug } });

  return Response.json(post?.views || 1);
}

// TODO: Test this method and fix it if needed.
export async function POST(request: Request, { params: { slug } }: { params: { slug: string } }) {
  const isLive = 'undefined' !== typeof request.headers.get('x-forwarded-for');

  const post = await prisma.postCounter.upsert({
    where: { slug },
    create: { slug, views: 1 },
    update: { views: { increment: isLive ? 1 : 0 } }
  });

  return Response.json(post?.views || 1);
}
