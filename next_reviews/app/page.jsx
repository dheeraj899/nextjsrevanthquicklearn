import Link from 'next/link';
import Heading from '@/components/Heading';
import { getFeaturedReview } from '@/lib/reviews';
export const metadata = {
  title: 'Indie Gamer',
  description: 'Your go-to source for indie game reviews and news.',
  openGraph: {
    title: 'Indie Gamer',
    description: 'Your go-to source for indie game reviews and news.',
    url: 'https://indiegamer.com',
    type: 'website',
    images: [
      {
        url: 'https://indiegamer.com/images/og-image.jpg',
        width: 800,
        height: 600,
        alt: 'Indie Gamer Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@indiegamer',
    title: 'Indie Gamer',
    description: 'Your go-to source for indie game reviews and news.',
    image: 'https://indiegamer.com/images/twitter-image.jpg',
  },
};



export default async function HomePage() {
  const review = await getFeaturedReview();
  console.log('[HomePage] rendering');
  return (
    <>
      <Heading>Featured Review</Heading>
      <p className="text-center mb-4">
        Check out our latest review!
      </p>
      <div className="bg-white border rounded shadow w-80 hover:shadow-xl sm:w-full">
        <Link href={`/reviews/${review.slug}`} className="flex flex-col sm:flex-row">
          <img src={review.image} alt="" width="320" height="180" className="rounded-t sm:rounded-l sm:rounded-r-none" />
          <h2 className="font-orbitron font-semibold py-1 text-center sm:px-2">
            {review.title}
          </h2>
        </Link>
      </div>
    </>
  );
}