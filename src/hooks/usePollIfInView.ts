'use client';

import { useRef, useState } from 'react';
import { useIntersection, useInterval } from 'react-use';

// 1. only poll when intersecting (in view)
// 2. stop polling after `max` polls (before novelty has wears off and it becomes distracting)
// todo: move to useReducer
export const usePollIfInView = (interval: number = 1000, max: number = 3) => {
  const intersectionRef = useRef<HTMLElement>({} as HTMLElement);
  const intersection = useIntersection(intersectionRef, {});

  const [shouldPoll, setShouldPoll] = useState<boolean>(false);
  const [polledCount, setPolledCount] = useState<number>(0);

  useInterval(
    () => {
      if (polledCount >= max) {
        // stop polling after max is reached
        setShouldPoll(false);
      } else {
        // increment poll count
        setPolledCount(polledCount + 1);
      }
    },
    shouldPoll ? interval : null
  );

  // Reset when the element scrolls into view, stop when it leaves. Adjusting state during
  // render (instead of in an effect) avoids an extra cascading render.
  const isIntersecting = !!intersection?.isIntersecting;
  const [wasIntersecting, setWasIntersecting] = useState<boolean>(false);

  if (isIntersecting !== wasIntersecting) {
    setWasIntersecting(isIntersecting);
    setShouldPoll(isIntersecting);

    if (isIntersecting) {
      setPolledCount(0);
    }
  }

  return {
    intersectionRef,
    shouldPoll
  };
};
