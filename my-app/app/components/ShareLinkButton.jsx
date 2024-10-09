'use client';

export default function ShareLinkButton() {
  const handleClick = async () => {
    try {
      const currentUrl = window.location.href; // Get the current page URL
      await navigator.clipboard.writeText(currentUrl); // Copy the URL to the clipboard
      console.log('Link copied to clipboard:', currentUrl);
    } catch (err) {
      console.error('Failed to copy the link:', err);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="border px-2 py-1 rounded text-slate-500 text-sm
                 hover:bg-orange-100 hover:text-slate-700">
      Share link
    </button>
  );
}
