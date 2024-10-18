import { getAllReviewSlugs, getReviewImage } from '@lib/reviews'; // Adjusted path
//import { getAllReviewSlugs, getReviewImage } from '/absolute/path/to/my-app/app/lib/reviews'; 


export async function generateStaticParams() {
  const slugs = await getAllReviewSlugs(); // Fetch all slugs
  console.log("Fetched slugs for OpenGraph:", slugs);

  if (!slugs || slugs.length === 0) {
    console.error("No slugs found. Check if the slugs are generated properly.");
    throw new Error("No slugs found.");
  }

  // Return slugs as strings
  return slugs.map((slug) => ({
    slug: slug.slug, // Access the slug property
  }));
}

export default async function OpenGraphImage({ params }) {
  const { slug } = params; // Destructure slug from params

  try {
    const image = await getReviewImage(slug); // Fetch image based on the slug
    console.log(`Fetched image for slug "${slug}":`, image);

    if (!image || !image.url) {
      console.error(`No image found for slug "${slug}"`);
      return new Response("No image found", { status: 404 });
    }

    // Here, you can generate your image response or perform other operations
    return new Response(
      JSON.stringify({ url: image.url }), 
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(`Error fetching image for slug "${slug}":`, error);
    return new Response("Error generating OpenGraph image", { status: 500 });
  }
}
