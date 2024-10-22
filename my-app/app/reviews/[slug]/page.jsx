import { getReview, getSlugs } from '@/lib/reviews';// Adjust the path based on your structure
import Image from 'next/image';
import Heading from '@/components/Heading';
import { ShareButtons } from '@/components/ShareLinkButton';
export const dynamicParams = true;
// Generate metadata dynamically based on review data
export async function generateMetadata({ params }) {
  const { slug } = params;  // Extract 'slug' from 'params'
  console.log('generateMetadata params:', params);  // Log 'params' for debugging
  const review = await getReview(slug);
  return {
    title: review.title,
    description: review.description,
    keywords: Array.isArray(review.keywords) ? review.keywords.join(', ') : '',
  };
}

export default async function Page({ params }) {
  const { slug } = params; // Extract slug from the URL
  const review = await getReview(slug); // Fetch review based on slug
  console.log('[ReviewPage] rendering:', slug);


  if (!review) {
    return <p>Review not found!</p>; // If review is not found, show this message
  }

  return (
    <>
    <Heading>{review.title}</Heading>
    <p className="pb-2">{review.subtitle}</p>
    <div className="flex gap-3 items-baseline">
      <p className="italic pb-2">{review.date}</p>
      
    </div>
    <Image src={review.image} alt={review.title} priority width="640" height="360" className="mb-2 rounded" />
    <article dangerouslySetInnerHTML={{ __html: review.body }} className="prose prose-slate max-w-screen-sm" />
    <ShareButtons />
  </>
);
}

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}
