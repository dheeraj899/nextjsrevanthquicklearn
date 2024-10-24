import Link from 'next/link';
import Heading from '@/components/Heading';
import { getReviews } from '@/lib/reviews';
import Image from 'next/image';
import PaginationBar from '@/components/PaginationBar';
import SearchBox from '@/components/SearchBox';

// In your page configuration

export const dynamicParams = true;
export const dynamic = 'force-dynamic';
export const revalidate = 0; // This line is often assumed to make pages dynamic, but it's the 'force-dynamic' setting that does so.
export const metadata = {
  title: 'Reviews',
};
function parsePageParam(paramValue) {
  if (paramValue) {
    const page = parseInt(paramValue);
    if (isFinite(page) && page > 0) {
      return page;
    }
  }
  return 1;
}
const PAGE_SIZE = 5;
 //app/reviews/page.jsx
export default async function ReviewsPage({ searchParams }) {
  //const searchableReviews = await getSearchableReviews();
  const page = parsePageParam(searchParams.page);
  const pageSize = PAGE_SIZE;
  const { reviews, pagination } = await getReviews(pageSize, page);
  
  return (
    <>
      <Heading>Reviews</Heading>
      
     
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review, index) => (
          <li key={review.slug} title={review.title} className="bg-white border rounded shadow w-80 hover:shadow-xl">
            <Link href={`/reviews/${review.slug}`}>
              <Image
                src={review.image}
                alt={review.title}  // Update alt for better accessibility
                priority={index === 0} // This will make the first image load eagerly
                width={320}  // Specify the width here (adjust as needed)
                height={180} // Specify the height here (adjust as needed)
                className="rounded-t"
              />
            </Link>
            <h2 className="font-orbitron font-semibold py-1 text-center">
              {review.title}
            </h2>
            <div className="flex gap-3 items-baseline p-2">
              <p className="italic">{review.date || 'Date not available'}</p> {/* Safe fallback */}
            </div>
          </li>
        ))}
      </ul>
      <PaginationBar
        href="/reviews" 
        page={pagination.page} 
        pageCount={pagination.pageCount} 
      />
      <SearchBox />
    </>
  );
}