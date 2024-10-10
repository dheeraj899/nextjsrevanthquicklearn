"use client"; // This directive ensures the component is rendered on the client side

import { useState } from 'react'; // Import useState from React
import { LinkIcon } from '@heroicons/react/20/solid';


export default function ShareLinkButton({ slug }) {
  const [clicked, setClicked] = useState(false); // State to manage the clicked status

  const handleClick = () => {
    console.log('clicked!');
    navigator.clipboard.writeText(window.location.href); // Copies the current URL to clipboard
    setClicked(true); // Set clicked to true to show the message
    setTimeout(() => setClicked(false), 1500); // Reset clicked status after 1.5 seconds
  };

  return (
    <div>
      <button
        onClick={handleClick} // Calls handleClick when button is clicked
        className="border px-2 py-1 rounded text-slate-500 text-sm hover:bg-orange-100 hover:text-slate-700"
      >
        <LinkIcon className="h-4 w-4" />
        Share link
      </button>
      {clicked && <span className="ml-2 text-green-500">Link copied!</span>} {/* Optional message */}
    </div>
  );
}
export function ShareButtons() {
  return (
    <div>
      <ShareLinkButton />
      <button>Twitter</button>
      <button>Facebook</button>
    </div>
  );
}
