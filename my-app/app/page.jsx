import ExampleComponent from '@/components/ExampleComponent';
import Heading from '@/components/Heading'; // Adjust path if needed
export default function HomePage() {
  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p>
        Only the best indie games, reviewed for you.
      </p>
      {/* Use the ExampleComponent here */}
      <ExampleComponent />
    </>
  );
}
