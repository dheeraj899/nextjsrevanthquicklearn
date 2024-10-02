import Link from 'next/link';
export default function ReviewsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Link href="/reviews/hollow-knight" className="block">
        <img src="/images/hollow-knight.jpg" alt="Hollow Knight" width="320" height="180" className="rounded-t" />
        <h2 className="font-orbitron font-semibold py-1 text-center">
          Hollow Knight
        </h2>
        <p className="text-justify">
          The Hollow Knight is an incredible game that takes you on a journey through a beautifully crafted world...
        </p>
      </Link>
      <Link href="/reviews/stardew-valley" className="block">
        <img src="/images/stardew-valley.jpg" alt="Stardew Valley" width="320" height="180" className="rounded-t" />
        <h2 className="font-orbitron font-semibold py-1 text-center">
          Stardew Valley
        </h2>
        <p className="text-justify">
          Stardew Valley is a charming farming simulation game that allows you to build and manage your own farm...
        </p>
      </Link>
    </div>
  );
}
