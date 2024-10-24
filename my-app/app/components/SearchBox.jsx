'use client';

import { Combobox } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';

export default function SearchBox() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);
  const [reviews, setReviews] = useState([]);

  // Effect to fetch reviews based on debounced query
  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const controller = new AbortController();
      (async () => {
        const url = '/api/search?query=' + encodeURIComponent(debouncedQuery);
        const response = await fetch(url, { signal: controller.signal });
        const reviews = await response.json();
        setReviews(reviews);
      })();
      return () => controller.abort();
    } else {
      setReviews([]);
    }
  }, [debouncedQuery]);

  // Define handleChange function
  const handleChange = (review) => {
    if (review && review.slug) {
      router.push(`/reviews/${review.slug}`); // Navigate to the selected review
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
        {reviews.length === 0 ? (
          <span className="block px-2 truncate w-full">No results found</span>
        ) : (
          reviews.map((review) => (
            <Combobox.Option key={review.slug} value={review}>
              {({ active }) => (
                <span className={`block px-2 truncate w-full ${active ? 'bg-orange-100' : ''}`}>
                  {review.title}
                </span>
              )}
            </Combobox.Option>
          ))
        )}
      </Combobox.Options>
    </Combobox>
  );
}
