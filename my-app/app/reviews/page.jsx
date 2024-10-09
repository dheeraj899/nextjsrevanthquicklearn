import Link from 'next/link';
import Heading from '@/components/Heading';
import { getReviews } from '@/lib/reviews';
import Image from 'next/image';
import ShareLinkButton from '@/components/ShareLinkButton'; // Import your ShareLinkButton component

export const metadata = {
  title: 'Reviews',
};

export default async function ReviewsPage() {
  const reviews = await getReviews();
  console.log('[ReviewsPage] reviews:', reviews);

  return (
    <>
      <Heading>Reviews</Heading>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{review.date}</p>
        <ShareLinkButton />
      </div>

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
