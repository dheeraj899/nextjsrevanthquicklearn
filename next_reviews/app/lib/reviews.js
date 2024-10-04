//`E:\nextjsrevanthquicklearn\next_reviews\app\reviews
import { readFile } from 'node:fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';
export async function getReview(slug) {
  const filePath = `E:\nextjsrevanthquicklearn\next_reviews\app\reviews/${slug}/${slug}.md`; // Update path to match your file location
  const text = await readFile(filePath, 'utf8');
  const { content, data: { title, date, image } } = matter(text);
  const body = marked(content);
  return { title, date, image, body };
}