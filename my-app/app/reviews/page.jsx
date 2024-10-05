// Ensure you import the required components at the top
import Link from 'next/link'; // Link for navigating between pages
import Heading from '@/components/Heading'; // Adjust the path if necessary
import { getReviews } from '@/lib/reviews';
import Image from 'next/image'; // Don't forget to import the Next.js Image component

export default async function ReviewsPage() {
  const reviews = await getReviews();
  console.log('[ReviewsPage] reviews:', reviews);

  return (
    <>
      <Heading>Reviews</Heading>
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review) => (
          <li key={review.slug} className="bg-white border rounded shadow w-80 hover:shadow-xl">
            <Link href={`/reviews/${review.slug}`}>
              <Image
                src={review.image}
                alt={review.title}
                width={320}
                height={180}
                className="rounded-t"
              />
              <h2 className="font-orbitron font-semibold py-1 text-center">
                {review.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
