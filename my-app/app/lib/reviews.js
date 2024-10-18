import { readdir, readFile } from 'node:fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';

// Function to fetch a single review from a Markdown file
export async function getReview(slug) {
  const text = await readFile(`./app/content/reviews/${slug}.md`, 'utf8');
  const { content, data: { title, date, image } } = matter(text);
  console.log(`Review fetched - Title: ${title}, Image: ${image}`); // Log title and image
  const body = marked(content);
  return { slug, title, date, image, body };
}

// Function to fetch all reviews
export async function getReviews() {
  const reviewsFromMarkdown = await fetchReviewsFromMarkdown();
  
  // If no reviews found, fall back to hardcoded reviews
  if (reviewsFromMarkdown.length === 0) {
    return getHardcodedReviews();
  }
  
  return reviewsFromMarkdown;
}

// Helper function to read reviews from Markdown files
async function fetchReviewsFromMarkdown() {
  const files = await readdir('./app/content/reviews');
  console.log('Files found in reviews directory:', files); // Log all files found
  const slugs = files.filter((file) => file.endsWith('.md'))
    .map((file) => file.slice(0, -'.md'.length));
  console.log('Slugs generated from files:', slugs); // Log the slugs

  const reviews = [];
  for (const slug of slugs) {
    const review = await getReview(slug);
    reviews.push(review);
  }
  
  reviews.sort((a, b) => b.date.localeCompare(a.date)); // Sort by date, most recent first
  return reviews;
}

// Function to return hardcoded reviews
function getHardcodedReviews() {
  const reviews = [
    {
      slug: "hollow-knight",
      title: "Hollow Knight",
      image: "/images/hollow-knight.jpg",
      date: "2023-10-10"
    },
    {
      slug: "stardew-valley",
      title: "Stardew Valley",
      image: "/images/stardew-valley.jpg",
      date: "2023-10-11"
    },
    {
      slug: "hellblade",
      title: "Hellblade",
      image: "/images/hellblade.jpg",
      date: "2023-10-12"
    }
  ];

  // Log review objects for debugging
  console.log('Hardcoded reviews fetched:', reviews);
  return reviews;
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
