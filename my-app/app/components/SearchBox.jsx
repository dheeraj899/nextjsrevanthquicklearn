'use client';

import { Combobox, ComboboxOption } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { searchReviews } from '@/lib/reviews'; // Your custom hook

export default function SearchBox({ reviews }) {
    const [query, setQuery] = useState('');
    const [fetchedReviews, setFetchedReviews] = useState([]); // Renamed here
    const router = useRouter();

    useEffect(() => {
        const fetchReviews = async () => {
            if (query.length > 1) {
                const results = await searchReviews(query);
                setFetchedReviews(results); // Update the state with fetched reviews
            } else {
                setFetchedReviews([]); // Clear reviews if query is too short
            }
        };

        fetchReviews();
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
                {fetchedReviews.length === 0 ? ( // Updated here
                    <span className="block px-2 truncate w-full">No results found</span>
                ) : (
                    fetchedReviews.map((review) => ( // Updated here
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
