// components/SearchBox.jsx
'use client';

import { Combobox, ComboboxOption } from '@headlessui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useIsClient } from '@/lib/hooks'; // Your custom hook

export default function SearchBox({ reviews }) {
    const isClient = useIsClient();
    const router = useRouter();
    const [query, setQuery] = useState('');

    if (!isClient) {
        return null; // Prevent rendering on the server
    }

    // Filter reviews based on the user's query
    const filtered = reviews.filter((review) =>
        review.title.toLowerCase().includes(query.toLowerCase())
    );

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
                {filtered.length === 0 ? (
                    <span className="block px-2 truncate w-full">No results found</span>
                ) : (
                    filtered.map((review) => (
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
