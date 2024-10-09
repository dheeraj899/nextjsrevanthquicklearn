"use client";
import { useState } from 'react';
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
        Share link
      </button>
     {clicked && <span className="ml-2 text-green-500">Link copied!</span>} {/* Optional message */}
    </div>

    );
  }