import { getReviewImage } from '@/lib/reviews';

export default async function OpenGraphImage({ params: { slug } }) {
  const image = await getReviewImage(slug);
  return `
    <meta property="og:image" content="${image.url}" />
  `;
}
