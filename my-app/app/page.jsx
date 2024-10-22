import Link from 'next/link';
import Image from 'next/image';
import Heading from '@/components/Heading';
export const dynamic = 'force-dynamic';
export const revalidate = 30; // Again, this won't replace 'force-dynamic'.
//import { getFeaturedReview } from '@/lib/reviews';
import { getReviews } from '@/lib/reviews';
export default async function HomePage() {
  //const review = await getFeaturedReview();
  const review = await getReviews(3);
  console.log('[HomePage] rendering:', review.map((review) => review.slug).join(', '));
  return (
    <>
      <Heading>Featured Review</Heading>
      <p className="text-center mb-4">
        Only the best indie games, reviewed for you.
      </p>
      <ul className="flex flex-row flex-wrap gap-3">
        {review.map((review, index) => (
          <li key={review.slug} className="bg-white border rounded shadow w-80 hover:shadow-xl sm:w-full">
          <Link href={`/reviews/${review.slug}`} className="flex flex-col sm:flex-row">
            <Image src={review.image} alt="" priority={index === 0} width="320" height="180" className="rounded-t sm:rounded-l sm:rounded-r-none" />
            <div className="px-2 py-1 text-center sm:text-left">
              <h2 className="font-orbitron font-semibold py-1 text-center sm:px-2">
                {review.title}
              </h2>
            <p className="hidden pt-2 sm:block">
              {review.subtitle}
            </p>
            </div>
          </Link>
        </li>
        ))}
      </ul>
      
    </>
  );
}
