import Heading from '@/components/Heading';
import { getReview } from '@/lib/reviews';

export default async function ReviewPage({ params: { slug } }) {
  const review = await getReview(slug);

  if (!review) {
    // Handle the case when the review is not found
    return <p>Review not found</p>;
  }

  return (
    <>
      <Heading>{review.title}</Heading>
      <p className="italic pb-2">{review.date}</p>
      <img src={review.image} alt={review.title} width="640" height="360" className="mb-2 rounded" />
      <article dangerouslySetInnerHTML={{ __html: review.body }} className="prose prose-slate max-w-screen-sm" />
    </>
  );
}
