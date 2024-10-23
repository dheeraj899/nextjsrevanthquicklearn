// components/SearchBox.jsx
'use client';

import { Combobox, ComboboxOption } from '@headlessui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useIsClient } from '@/lib/hooks'; // Your custom hook

export default function SearchBox() {
    const isClient = useIsClient();
    const router = useRouter();

    // Initialize the state outside of the conditional
    const [query, setQuery] = useState('');

    // Only set the reviews if the component is rendered on the client
    const reviews = [
        { slug: 'hades-2018', title: 'Hades' },
        { slug: 'fall-guys', title: 'Fall Guys: Ultimate Knockout' },
        { slug: 'black-mesa', title: 'Black Mesa' },
        { slug: 'disco-elysium', title: 'Disco Elysium' },
        { slug: 'dead-cells', title: 'Dead Cells' },
    ];

    // Ensure to return null immediately if not on client
    if (!isClient) {
        return null;
    }

    const filtered = reviews.filter((review) =>
        review.title.toLowerCase().includes(query.toLowerCase())
    );

    const handleChange = (review) => {
        // Check if review is valid before accessing its slug
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
