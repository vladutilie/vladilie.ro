import prisma from '@/lib/prisma';

// For BigInt serialization
// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function GET(_r: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.postCounter.findUnique({ where: { slug } });

  return Response.json(post?.views || 1);
}

// TODO: Test this method and fix it if needed.
export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ip = request.headers.get('x-forwarded-for');
  const isLive = 'undefined' !== typeof ip && '::1' !== ip && 'production' === process.env.NEXT_PUBLIC_VERCEL_ENV;

  const post = await prisma.postCounter.upsert({
    where: { slug },
    update: { views: { increment: isLive ? 1 : 0 } },
    create: { slug, views: 1 }
  });

  return Response.json(post?.views || 1);
}
