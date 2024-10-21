"use client";
import { useState } from 'react';
import { LinkIcon } from '@heroicons/react/20/solid';

export default function ShareLinkButton() {
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        console.log('clicked!');
        navigator.clipboard.writeText(window.location.href);
        setClicked(true);
        setTimeout(() => setClicked(false), 1500);
      };
   return (
    <div>
      <button onClick={handleClick}
        className="border px-2 py-1 rounded text-slate-500 text-sm
                   hover:bg-orange-100 hover:text-slate-700">
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