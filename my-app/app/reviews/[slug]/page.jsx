import { getReview, getSlugs } from '@/lib/reviews';// Adjust the path based on your structure
import Image from 'next/image';

export default async function Page({ params }) {
  const { slug } = params; // Extract slug from the URL
  const review = await getReview(slug); // Fetch review based on slug

  if (!review) {
    return <p>Review not found!</p>; // If review is not found, show this message
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{review.title}</h1>
      <Image
        src={review.image} // This should point to the correct image path in 'public/images'
        alt={review.title}
        width={640}
        height={360}
      />
      <p className="text-gray-600">{review.date}</p>
      <div className="markdown-content" dangerouslySetInnerHTML={{ __html: review.body }} />
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}
