import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../src/utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ currentLocation: string } | string>) {
  const { method } = req;

  if ('GET' === method) {
    const settings = await prisma.settings.findUnique({ where: { name: 'location' } });

    return res.status(200).json({ currentLocation: settings?.value || 'Cluj-Napoca, Cluj' });
  }

  if ('POST' === method) {
    const { lat, lng, updateLocationKey } = req.body;

    if (process.env.UPDATE_LOCATION_KEY !== updateLocationKey) {
      return res.status(403).send('Forbidden');
    }

    try {
      const coords = `${lat},${lng}`;
      const url = `${process.env.GEOCODE_API_URL}?latlng=${coords}&key=${process.env.GEOCODE_API_KEY}`;

      const request = await fetch(url, { headers: new Headers({ 'Content-Type': 'application/json' }) });

      const result: { [k: string]: string } = {
        locality: 'Cluj-Napoca',
        administrative_area_level_1: 'CJ'
      };
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

      const currentLocation = `${result.locality}, ${result.administrative_area_level_1}`;
      await prisma.settings.upsert({
        where: { name: 'location' },
        update: { value: currentLocation },
        create: { name: 'location', value: currentLocation }
      });

      return res.status(200).json({ currentLocation });
    } catch (error) {
      console.error('POST /api/settings ERROR', error);

      return res.status(500).json('Internal server error.');
    }
  }
}
