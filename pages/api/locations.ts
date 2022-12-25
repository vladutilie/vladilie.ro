import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../src/utils/prisma';

type Response = { currentLocation?: string; error?: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if ('GET' === method) {
    try {
      const { takeLastOne } = req.query;

      const location = await prisma.locations.findMany({
        orderBy: { lastVisitAt: 'desc' },
        ...(takeLastOne ? { take: 1 } : {})
      });

      return res.status(200).json(location);
    } catch (_error) {
      return res
        .status(500)
        .json({ error: 'The connection to database cannot be established.', currentLocation: 'Cluj-Napoca, RO' });
    }
  }

  if ('POST' === method) {
    const { lat, lng, updateLocationKey } = req.body;

    if (process.env.UPDATE_LOCATION_KEY !== updateLocationKey) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    try {
      const coords = `${lat},${lng}`;
      const url = `${process.env.GEOCODE_API_URL}?latlng=${coords}&key=${process.env.GEOCODE_API_KEY}`;

      const request = await fetch(url, { headers: new Headers({ 'Content-Type': 'application/json' }) });

      const result: { [k: string]: string } = {};

      // Kudos to https://gist.github.com/AmirHossein/92a0597b5f723b19c648?permalink_comment_id=4016401#gistcomment-4016401
      if (request.statusText === 'OK') {
        const response = await request.json();

        if (response.results[0]) {
          if (response.results[0].address_components) {
            response.results[0].address_components.map(
              (address: { long_name: string; short_name: string; types: string[] }) => {
                if (address.types[0]) {
                  result[address.types[0]] = address.short_name;
                }
              }
            );
          }
        }
      }

      const currentLocation = result.locality
        ? `${result.locality}, ${result.administrative_area_level_1}`
        : `${result.administrative_area_level_2}, ${result.country}`;
      console.log(currentLocation);

      await prisma.locations.upsert({
        where: { name: currentLocation },
        update: { visitCounter: { increment: 1 }, lastVisitAt: new Date() },
        create: { name: currentLocation }
      });

      return res.status(200).json({ currentLocation });
    } catch (error) {
      console.error('POST /api/locations ERROR', error);

      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}
