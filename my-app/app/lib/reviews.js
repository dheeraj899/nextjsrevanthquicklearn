// lib/reviews.js
import { readFile } from 'node:fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';

export async function getReview(slug) {
  const filePath = `./app/content/reviews/${slug}.md`;
  console.log('Reading file from:', filePath); // Add this line
  const text = await readFile(filePath, 'utf8');
  const { content, data: { title, date, image } } = matter(text);
  const body = marked(content);
  return { title, date, image, body };
}
