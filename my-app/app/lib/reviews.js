import { readFile } from 'node:fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';
import qs from 'qs';
const CMS_URL = 'http://localhost:1337';

// Function to fetch a single review from a Markdown file
export async function getReview(slug) {
  const url = `${CMS_URL}/api/reviews?`
    + qs.stringify({
      filters: { slug: { $eq: slug } },
      fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
      populate: { image: { fields: ['url'] } },
      pagination: { pageSize: 1, withCount: false },
    }, { encodeValuesOnly: true });

  const response = await fetch(url);
  const { data } = await response.json();

  const { attributes } = data[0];
  return {
    slug: attributes.slug,
    title: attributes.title,
    date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
    image: CMS_URL + attributes.image.data.attributes.url,
    body: marked(attributes.body),
  };
}

export async function getReviews() {
  const url = `${CMS_URL}/api/reviews?` + qs.stringify({
    fields: ['slug', 'title', 'subtitle', 'publishedAt'],
    populate: { image: { fields: ['url'] } },
    sort: ['publishedAt:desc'],
    pagination: { pageSize: 6 },
  }, { encodeValuesOnly: true });

  const response = await fetch(url);
  const { data } = await response.json();

  return data.map(({ attributes }) => ({
    slug: attributes.slug,
    title: attributes.title,
    date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
    image: CMS_URL + attributes.image.data.attributes.url,
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
