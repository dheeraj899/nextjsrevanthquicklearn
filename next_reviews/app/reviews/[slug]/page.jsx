// Renders the review based on slug
import ReviewPage from './ReviewPage';
export default async function Page({ params }) {
  // Extract the slug parameter from params
  // Use the slug to fetch data or render content
  return <ReviewPage params={params} />;
}