import { readFile } from 'node:fs/promises';
import path from 'path';
import { marked } from 'marked';
import Heading from '@/components/Heading';

export default async function StardewValleyPage() {
  const filePath = path.join(process.cwd(), 'app', 'reviews', 'stardew-valley', 'stardew-valley.md'); // Absolute path
  console.log('File path:', filePath); // Debugging line

  try {
    const markdown = await readFile(filePath, 'utf8');
    const htmlContent = marked(markdown);

    return (
      <>
        <Heading>Stardew Valley</Heading>
        <img src="/images/stardew-valley.jpg" alt="Stardew Valley" width="640" height="360" className="mb-2 rounded" />
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </>
    );
  } catch (error) {
    console.error('Error reading the markdown file:', error);
    return <div>Error loading content.</div>; // Handle error gracefully
  }
}
