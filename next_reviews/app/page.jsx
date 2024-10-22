import Link from 'next/link';
import Heading from '@/components/Heading';
import { getReviews } from '@/lib/reviews';
import Image from 'next/image';
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Again, this won't replace 'force-dynamic'.
export default async function HomePage() {
  const review = await getReviews(3);
  console.log('[HomePage] rendering:', review.map((review) => review.slug).join(', '));
  return (
    <>
      <Heading>Featured Review</Heading>
      <p className="text-center mb-4">
        only the best indiegames reviewed for you!
      </p>
      <ul className="flex flex-row flex-wrap gap-3">
        {review.map((review, index) => (
          <li key={review.slug} className="bg-white border rounded shadow w-80 hover:shadow-xl sm:w-full">
          <Link href={`/reviews/${review.slug}`} className="flex flex-col sm:flex-row">
            <Image src={review.image} alt="" priority={index === 0} width="320" height="180" className="rounded-t sm:rounded-l sm:rounded-r-none" />
            <h2 className="font-orbitron font-semibold py-1 text-center sm:px-2">
              {review.title}
            </h2>
            <p className="flex-1 mt-2 text-center sm:px-2 sm:mt-0">{review.subtitle}</p>
          </Link>
        </li>
        ))}
      </ul>
      
    </>
  );
}