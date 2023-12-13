'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export const UpdateLocation: React.FC = () => {
  const query = useSearchParams();

  useEffect(() => {
    const updateLocationKey = query.get('updateLocationKey');
    if (updateLocationKey) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        if (window.confirm(`Actualizezi locația?`)) {
          fetch('/api/locations', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json', 'x-location-key': updateLocationKey }),
            body: JSON.stringify({ lat: coords.latitude, lng: coords.longitude })
          });
        }
      });
    }
  }, [query]);

  return null;
};
