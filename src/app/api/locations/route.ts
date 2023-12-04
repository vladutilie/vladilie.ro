import { NextRequest } from 'next/server';

import prisma from '@/utils/prisma';
import { revalidatePath } from 'next/cache';

export async function GET(): Promise<Response> {
  try {
    const locations = await prisma.location.findMany({
      orderBy: { lastVisitAt: 'desc' }
    });

    return Response.json(locations);
  } catch (error) {
    console.error('GET /api/locations ERROR', error);

    return new Response(
      JSON.stringify({
        error: 'The connection to database cannot be established.',
        currentLocation: 'Cluj-Napoca, RO'
      }),
      { status: 500, headers: { 'Content-type': 'application/json' } }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { lat, lng } = await request.json();
    const locationKey = request.headers.get('x-location-key');

    if (process.env.UPDATE_LOCATION_KEY !== locationKey) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-type': 'application/json' }
      });
    }

    const coords = `${lat},${lng}`;
    const url = `${process.env.GEOCODE_API_URL}?latlng=${coords}&key=${process.env.GEOCODE_API_KEY}`;
    const geocode = await fetch(url, { headers: new Headers({ 'Content-Type': 'application/json' }) });

    const result: { [k: string]: string } = {};

    // Kudos to https://gist.github.com/AmirHossein/92a0597b5f723b19c648?permalink_comment_id=4016401#gistcomment-4016401
    if (geocode.statusText === 'OK') {
      const response = await geocode.json();
      if (response.results?.[0]?.address_components) {
        response.results[0].address_components.map(
          (address: { long_name: string; short_name: string; types: string[] }) => {
            if (address.types[0]) {
              result[address.types[0]] = address.short_name;
            }
          }
        );
      }
    }

    const currentLocation = result.locality
      ? `${result.locality}, ${result.administrative_area_level_1}, ${result.country}`
      : `${result.administrative_area_level_2}, ${result.country}`;

    await prisma.location.upsert({
      where: { name: currentLocation },
      update: { visitCounter: { increment: 1 }, lastVisitAt: new Date() },
      create: { name: currentLocation }
    });

    revalidatePath('/', 'layout');

    return Response.json({ currentLocation });
  } catch (error: any) {
    console.error('POST /api/locations ERROR', error);

    return new Response(JSON.stringify({ error: error?.message }), {
      status: 500,
      headers: { 'Content-type': 'application/json' }
    });
  }
}
