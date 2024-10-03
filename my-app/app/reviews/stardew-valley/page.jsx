import Heading from '@/components/Heading';
import { getReview } from '@/lib/reviews';


export default async function StardewValleyPage() {
  const review = await getReview('stardew-valley'); // Use the slug to get the review data
  
  return (
    <>
      <Heading>{review.title}</Heading>
      <p className="italic pb-2">{review.date}</p>
      <img src="/images/stardew-valley.jpg" alt={review.title} width="640" height="360" className="mb-2 rounded" />

      <article className="prose prose-slate max-w-screen-sm" dangerouslySetInnerHTML={{ __html: review.body }} />
    </>
  );
}
