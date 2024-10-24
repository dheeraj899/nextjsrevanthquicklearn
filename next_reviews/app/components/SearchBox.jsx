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
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(null); // To manage error state
  // Effect to fetch reviews based on debounced query
  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const controller = new AbortController();
      setLoading(true); // Start loading when fetching begins
      const fetchReviews = async () => {
        try {
          const url = `/api/search?query=${encodeURIComponent(debouncedQuery)}`;
          const response = await fetch(url, { signal: controller.signal });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const reviewsData = await response.json();
          setReviews(reviewsData);
        } catch (error) {
          if (error.name === 'AbortError') {
            console.log('Request canceled:', error.message);
          } else {
            setError('Failed to fetch reviews.'); // Set error if fetching fails
            console.error('Fetch error:', error);
          }
        } finally {
          setLoading(false); // Stop loading when fetch is done
        }
      };
      fetchReviews();
      // Cleanup function to abort the request on unmount or before next request
      return () => {
        controller.abort();
      };
    } else {
      setReviews([]); // Clear reviews if the query is empty or too short
    }
  }, [debouncedQuery]);
  // Define handleChange function for selecting a review
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
      {loading && <div className="absolute bg-white py-1 w-full">Loading...</div>}
      <Combobox.Options className="absolute bg-white py-1 w-full">
        {error && <span className="block px-2 truncate w-full text-red-500">{error}</span>}
        {reviews.length === 0 && !loading ? (
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