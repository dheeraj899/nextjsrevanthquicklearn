import { readFile } from 'node:fs/promises';
import { marked } from 'marked';
import Heading from '@/components/Heading';
import path from 'path';
export default async function StardewValleyPage() {
  const filePath = path.join(process.cwd(), 'app', 'reviews', 'stardew-valley', 'stardew-valley.md'); // Updated path
  const text = await readFile(filePath, 'utf8');
  const html = marked(text, { mangle: false, headerIds: false }); // Disable deprecated options
  return (
    <>
      <Heading>Stardew Valley</Heading>
      <img src="/images/stardew-valley.jpg" alt="Stardew Valley" width="640" height="360" className="mb-2 rounded" />
      <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}