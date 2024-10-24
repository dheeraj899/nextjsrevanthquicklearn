'use client';

import { Combobox, ComboboxOption } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [fetchedReviews, setFetchedReviews] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController(); // Step 1: Initialize AbortController

    if (query.length > 1) {
      (async () => {
        const url = `/api/search?query=${encodeURIComponent(query)}`;
        try {
          const response = await fetch(url, { signal: controller.signal }); // Step 2: Configure Fetch with Signal
          const reviews = await response.json();
          setFetchedReviews(reviews); // Update state with fetched reviews
        } catch (error) {
          // Handle the abort error
          if (error.name === 'AbortError') {
            console.log('Fetch aborted:', error.message);
          } else {
            console.error('Fetch failed:', error);
          }
        }
      })();

      return () => {
        controller.abort(); // Step 3: Cleanup function to abort previous request
      };
    } else {
      setFetchedReviews([]); // Clear fetched reviews if query is too short
    }
  }, [query]);

  const handleChange = (review) => {
    if (review && review.slug) {
      router.push(`/reviews/${review.slug}`);
    }
  };

  return (
    <Combobox onChange={handleChange}>
      <Combobox.Input
        placeholder="Search…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="border px-2 py-1 rounded w-full"
      />
      <Combobox.Options className="absolute bg-white py-1 w-full">
        {fetchedReviews.length === 0 ? (
          <span className="block px-2 truncate w-full">No results found</span>
        ) : (
          fetchedReviews.map((review) => (
            <ComboboxOption key={review.slug} value={review}>
              {({ active }) => (
                <span className={`block px-2 truncate w-full ${active ? 'bg-orange-100' : ''}`}>
                  {review.title}
                </span>
              )}
            </ComboboxOption>
          ))
        )}
      </Combobox.Options>
    </Combobox>
  );
}
