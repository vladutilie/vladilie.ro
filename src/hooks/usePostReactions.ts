import { useState } from 'react';
import { useDebounce } from 'react-use';
import useSWR, { SWRConfiguration } from 'swr';

import { Reaction } from '../types';

const API_URL = `/api/reactions`;

type Payload = {
  counter: { likes: number; loves: number; awards: number; wows: number };
  session: { likes: boolean; loves: boolean; awards: boolean; wows: boolean };
};

const getPostLikes = async (slug: string): Promise<Payload> => {
  const res = await fetch(`${API_URL}/${slug}`);

  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }

  return await res.json();
};

const updatePostLikes = async (slug: string, reaction: Reaction): Promise<Payload> => {
  const res = await fetch(`${API_URL}/${slug}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reaction })
  });

  if (!res.ok) {
    throw new Error('An error occurred while posting the data.');
  }

  return await res.json();
};

// A custom hook to abstract away fetching and updating a user's likes
export const usePostLikes = (slug: string, config?: SWRConfiguration) => {
  const { data, error, mutate } = useSWR([API_URL, slug], () => getPostLikes(slug), {
    dedupingInterval: 60000,
    ...config
  });

  const [reaction, setReaction] = useState<Reaction>();
  const [batchedLikes, setBatchedLikes] = useState<{ [key: Reaction | string]: boolean }>();

  const react = (reaction: Reaction) => {
    setReaction(reaction);
    // Prevent the user from liking again if already liked.
    if (!data || true === data.session[reaction]) {
      return;
    }

    // Optimistic ui pattern
    // update the local swr cache so like count updates immediately for the user
    // while we update the database
    mutate(
      {
        counter: {
          ...data?.counter,
          [reaction]: Number(data?.counter?.[reaction]) + 1
        },
        session: {
          ...data?.session,
          [reaction]: true
        }
      },
      false
    );

    // use local state and debounce to batch updates
    setBatchedLikes({ [reaction]: true });
  };

  useDebounce(
    () => {
      if (reaction) {
        if (false === batchedLikes?.[reaction]) return;

        // update the database and use the data updatePostLikes returns to update
        // the local cache with database data
        mutate(updatePostLikes(slug, reaction));
        setBatchedLikes({ [reaction]: false });
      }
    },
    1000,
    [batchedLikes, reaction]
  );

  return {
    session: data?.session,
    counter: data?.counter,
    isLoading: !error && !data,
    isError: !!error,
    react
  };
};
