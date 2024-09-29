import ExampleComponent from './components/ExampleComponent';

export default function HomePage() {
  console.log('[HomePage] rendering');
  return (
    <>
      <h1 className="text-3xl font-bold underline">Indie Gamer</h1>
      <p>Only the best indie games, reviewed for you.</p>

      {/* Use the ExampleComponent here */}
      <ExampleComponent />
    </>
  );
}
