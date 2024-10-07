import { getAllPages } from '@/lib/pages'; // Example function to get all pages

export default async function Sitemap() {
  const pages = await getAllPages();
  return `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map(page => `
        <url>
          <loc>${`https://yourwebsite.com/${page.slug}`}</loc>
        </url>
      `).join('')}
    </urlset>
  `;
}