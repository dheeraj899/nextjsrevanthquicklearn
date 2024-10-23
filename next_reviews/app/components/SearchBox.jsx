"use client";
import { useState, useEffect } from 'react';
import { Combobox } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { fetchReviews } from '@/lib/reviews';
export default function SearchBox() {
  const [query, setQuery] = useState(''); // Step 1: Capture user input
  const [reviews, setReviews] = useState([]); // State for reviews data
  const [isClient, setIsClient] = useState(false); // State to check client-side rendering
  const router = useRouter(); // Initialize Next.js router for navigation
  // Step 1: Fetch reviews data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const fetchedReviews = await fetchReviews(); // Fetch all reviews from CMS
      setReviews(fetchedReviews);
      setIsClient(true); // Only render after fetching reviews on the client
    };
    fetchData();
  }, []);
  // Step 2: Filter the reviews based on the user's query
  const filtered = reviews.filter((review) =>
    review.title.toLowerCase().includes(query.toLowerCase())
  );
  // Step 4: Handle selection of an option to navigate to the corresponding review page
  const handleChange = (review) => {
    router.push(`/reviews/${review.slug}`);
  };
  // Don't render the component until the client state is true
  if (!isClient) {
    return null;
  }
  return (
    <Combobox onChange={handleChange}>
      <div className="relative">
        {/* Step 1: Bind the input field to the query state */}
        <Combobox.Input
          placeholder="Search…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        {/* Step 3: Display the filtered reviews as options */}
        <Combobox.Options className="absolute bg-white py-1 w-full">
          {filtered.length > 0 ? (
            filtered.map((review) => (
              <Combobox.Option key={review.slug} value={review}>
                {({ active }) => (
                  <span className={`block px-2 truncate w-full ${active ? 'bg-orange-100' : ''}`}>
                    {review.title}
                  </span>
                )}
              </Combobox.Option>
            ))
          ) : (
            <div className="px-2 py-1 text-gray-500">No results found</div>
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}