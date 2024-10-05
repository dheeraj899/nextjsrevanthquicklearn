import { readdir, readFile } from 'node:fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';

export async function getReview(slug) {
  const text = await readFile(`./app/content/reviews/${slug}.md`, 'utf8');
  const { content, data: { title, date, image } } = matter(text);
  console.log(`Review fetched - Title: ${title}, Image: ${image}`); // Log title and image
  const body = marked(content);
  return { slug, title, date, image, body };
}

export async function getReviews() {
  const files = await readdir('./app/content/reviews');
  console.log('Files found in reviews directory:', files); // Log all files found
  const slugs = files.filter((file) => file.endsWith('.md'))
    .map((file) => file.slice(0, -'.md'.length));
  console.log('Slugs generated from files:', slugs); // Log the slugs to see if 'hellblade' is in there
  const reviews = [];
  for (const slug of slugs) {
    const review = await getReview(slug);
    reviews.push(review);
  }
  reviews.sort((a, b) => b.date.localeCompare(a.date)); // Sort by date, most recent first
  return reviews;
}
export async function getSlugs() {
  const files = await readdir('./app/content/reviews');
  return files.filter((file) => file.endsWith('.md'))
    .map((file) => file.slice(0, -'.md'.length));
}
export async function getFeaturedReview() {
  const reviews = await getReviews();
  return reviews[0];
}