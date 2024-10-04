import Link from 'next/link';
import Image from 'next/image';
import Heading from '@/components/Heading';
import { getReviews } from '@/lib/reviews';

export default async function ReviewsPage() {
  const reviews = await getReviews();  // Dynamically fetch reviews
  console.log('[ReviewsPage] reviews:', reviews);

  return (
    <>
      <Heading>Reviews</Heading>
      <ul className="flex flex-col gap-3">
        {reviews.map((review) => (
          <li key={review.slug} className="bg-white border rounded shadow w-80 hover:shadow-xl">
            <Link href={`/reviews/${review.slug}`}>
              <Image 
                src={`/images/${review.slug}.jpg`}  // Dynamic image loading based on slug
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