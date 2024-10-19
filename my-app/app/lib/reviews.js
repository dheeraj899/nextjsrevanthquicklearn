import { readFile } from 'node:fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';
import qs from 'qs';

// Function to fetch a single review from a Markdown file
export async function getReview(slug) {
  const text = await readFile(`./app/content/reviews/${slug}.md`, 'utf8');
  const { content, data: { title, date, image } } = matter(text);
  console.log(`Review fetched - Title: ${title}, Image: ${image}`); // Log title and image
  const body = marked(content);
  return { slug, title, date, image, body };
}

export async function getReviews() {
  const url = 'http://localhost:1337/api/reviews?' + qs.stringify({
    fields: ['slug', 'title', 'subtitle', 'publishedAt'],
    populate: { image: { fields: ['url'] } },
    sort: ['publishedAt:desc'],
    pagination: { pageSize: 6 },
  }, { encodeValuesOnly: true });

  console.log('getReviews:', url);
  const response = await fetch(url);
  const { data } = await response.json();
  
  return data.map(({ attributes }) => ({
    slug: attributes.slug,
    title: attributes.title,
  }));
}
// Function to get slugs from the Markdown files
export async function getSlugs() {
  const files = await readdir('./app/content/reviews');
  return files.filter((file) => file.endsWith('.md'))
    .map((file) => file.slice(0, -'.md'.length));
}

// Function to get featured review
export async function getFeaturedReview() {
  const reviews = await getReviews();
  return reviews[0];
}

// Fetch all review slugs for generating static paths
export async function getAllReviewSlugs() {
  const slugs = await getSlugs();
  console.log('All review slugs:', slugs); // Log the slugs to debug
  return slugs.map((slug) => ({ slug })); // Ensure it's an array of objects
}

// Fetch review image based on the slug
export async function getReviewImage(slug) {
  const review = await getReview(slug);
  console.log(`Image for slug "${slug}":`, review.image); // Log the image to debug
  return { url: review.image };
}
