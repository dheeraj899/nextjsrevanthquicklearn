import { readdir, readFile } from 'node:fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';

export async function getReview(slug) {
  const text = await readFile(`./app/content/reviews/${slug}.md`, 'utf8');
  const { content, data: { title, date, image } } = matter(text);
  const body = marked(content);
  return { slug, title, date, image, body };
}

export async function getReviews() {
  const files = await readdir('./app/content/reviews');
  const slugs = files.filter((file) => file.endsWith('.md'))
    .map((file) => file.slice(0, -'.md'.length));
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


























// //`E:\nextjsrevanthquicklearn\next_reviews\app\reviews
// import { readFile } from 'node:fs/promises';
// import matter from 'gray-matter';
// import { marked } from 'marked';
// export async function getReview(slug) {
//   const filePath = `./app/Content/reviews/${slug}.md`; // Update path to match your file location
//   const text = await readFile(filePath, 'utf8');
//   const { content, data: { title, date, image } } = matter(text);
//   const body = marked(content);
//   return { title, date, image, body };
// }