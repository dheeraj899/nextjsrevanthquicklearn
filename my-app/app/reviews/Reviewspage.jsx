import Link from 'next/link';

export default function ReviewsPage() {
    return (
      <>
        <h1 className="text-2xl font-bold">Reviews</h1>
        <p className="text-lg">Here we will list all the reviews.</p>
        <ul className="bg-gray-200 p-4">
          <li>
            <Link href="/reviews/hollow-knight">Hollow Knight</Link>
          </li>
          <li>
            <Link href="/reviews/stardew-valley">Stardew Valley</Link>
          </li>
        </ul>
      </>
    );
}
