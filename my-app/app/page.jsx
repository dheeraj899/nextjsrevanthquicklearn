'use client';

import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    window.alert('Welcome to my site!!!');
  }, []);

  return (
    <div className="px-4 py-2">
      <h1>Indie Gamer</h1>
      <p>Welcome to the Indie Gamer website!</p>
    </div>
  );
}


