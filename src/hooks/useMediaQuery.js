import { useEffect, useState } from 'react';

export const useMediaQuery = (query) => {
  const getMatches = (query) => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia and check support addEventListener for matchMedia
    if (typeof matchMedia.addEventListener === 'function') {
      matchMedia.addEventListener('change', handleChange);
    } else {
      matchMedia.addListener(() => handleChange());
    }

    return () => {
      if (typeof matchMedia.addEventListener === 'function') {
        matchMedia.removeEventListener('change', handleChange);
      } else {
        matchMedia.removeListener(() => handleChange());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
};
