import { createHash } from 'crypto';

import prisma from '@/lib/prisma';

// For BigInt serialization
// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ipAddress = request.headers.get('x-forwarded-for') || '0.0.0.0'; // Fallback for localhost or non Vercel deployments
  const ipHash = createHash('md5')
    .update(ipAddress + process.env.IP_ADDRESS_SALT!, 'utf8')
    .digest('hex');
  const id = `${slug}_${ipHash}`;

  const [counter, session] = await Promise.all([
    prisma.postCounter.findUnique({ where: { slug } }),
    prisma.session.findUnique({ where: { id } })
  ]);

  return Response.json({
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

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const { reaction } = await request.json();
    const reactions = ['likes', 'loves', 'awards', 'wows'];
    if (!reactions.includes(reaction)) {
      return new Response(JSON.stringify({ message: 'Reaction value is invalid.' }), {
        status: 403,
        headers: { 'Content-type': 'application/json' }
      });
    }

    const ipAddress = request.headers.get('x-forwarded-for') || '0.0.0.0'; // Fallback for localhost or non Vercel deployments
    const ipHash = createHash('md5')
      .update(ipAddress + process.env.IP_ADDRESS_SALT!, 'utf8')
      .digest('hex');
    const id = `${slug}_${ipHash}`;

    const select = { likes: true, loves: true, awards: true, wows: true };
    let session = await prisma.session.findFirst({ where: { id, [reaction]: true }, select });
    let counter = await prisma.postCounter.findFirst({ where: { slug }, select });
    if (!session) {
      session = await prisma.session.upsert({
        where: { id },
        create: { id, [reaction]: true },
        update: { [reaction]: true },
        select
      });

      counter = await prisma.postCounter.upsert({
        where: { slug },
        create: { slug, views: 1, [reaction]: 1 },
        update: { [reaction]: { increment: 1 } },
        select
      });
    }

    return Response.json({ counter, session });
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { 'Content-type': 'application/json' }
    });
  }
}
