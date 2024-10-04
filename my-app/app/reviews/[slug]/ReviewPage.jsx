import { getReview } from '@/lib/reviews'; // Correct path for your setup
import Image from 'next/image';

export default async function ReviewPage({ slug }) {
  const review = await getReview(slug); // Fetch review based on slug

  if (!review) {
    return <p>Review not found!</p>; // Handle missing reviews
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{review.title}</h1>
      <Image
        src={`/images/${review.image}`} // This should point to the correct image path
        alt={review.title}
        width={640}
        height={360}
      />
      <p className="text-gray-600">{review.date}</p>
      <div dangerouslySetInnerHTML={{ __html: review.body }} />
    </div>
  );
}
