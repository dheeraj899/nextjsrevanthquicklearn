import { getReview,getSlugs } from '@/lib/reviews'; // Adjust the path based on your structure
import Image from 'next/image';
import ShareButtons from '@/components/ShareLinkButton';
import { notFound } from 'next/navigation';
export const dynamic = 'force-dynamic';
export const revalidate = 0; // This line is often assumed to make pages dynamic, but it's the 'force-dynamic' setting that does so.
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import CommentForm from '@/components/CommentForm';
import CommentList from '@/components/CommentList';

// Generate metadata dynamically based on review data
export async function generateMetadata({ params: { slug } }) {
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  return {
    title: review.title,
  };
}

export default async function Page({ params }) {
  const { slug } = params; // Extract slug from the URL
  const review = await getReview(slug); // Fetch review based on slug
  //slug page
  console.log('[ReviewPage] rendering:', slug);
  if (!review) {
    notFound();
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
      <article dangerouslySetInnerHTML={{ __html: review.body }} className="max-w-screen-sm prose prose-slate" />
      <section className="border-dashed border-t max-w-screen-sm mt-3 py-3">
      <h2 className="font-bold flex gap-2 items-center text-xl">
              <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
              Comments
      </h2>
      <CommentForm title={review.title} />
      <CommentList />
     </section>
      <ShareButtons/>
      
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}
