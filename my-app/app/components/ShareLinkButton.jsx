"use client";

export default function ShareLinkButton({ slug }) {
  const handleClick = () => {
    const url = `${window.location.origin}/reviews/${slug}`; // Construct the URL for the review
    navigator.clipboard.writeText(url) // Copy the URL to the clipboard
      .then(() => {
        console.log('URL copied to clipboard:', url);
        alert('Link copied to clipboard!'); // Optional: Alert the user
      })
      .catch(err => console.error('Failed to copy: ', err));
  };

  return (
    <button
      onClick={handleClick}
      className="border px-2 py-1 rounded text-slate-500 text-sm hover:bg-orange-100 hover:text-slate-700"
    >
      Share link
    </button>
  );
}
