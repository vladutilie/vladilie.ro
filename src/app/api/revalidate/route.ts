import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const path = request.nextUrl.searchParams.get('path');

  if (secret !== process.env.SECRET_REVALIDATE && 'production' === process.env.NEXT_PUBLIC_VERCEL_ENV) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  revalidatePath(path || '/', 'layout');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
