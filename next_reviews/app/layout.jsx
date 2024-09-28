import Link from 'next/link';
import './globals.css';
import ExampleComponent from './components/ExampleComponent';  // Import ExampleComponent
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col px-4 py-2 min-h-screen">
        <header>
          <nav>
            <ul className="flex gap-2">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/reviews">Reviews</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </nav>
        </header>
        {/* ExampleComponent can be rendered here */}
        <ExampleComponent />
        <main className="grow py-3">
  {children}
</main>
<footer className="border-t py-3 text-center text-xs">
  Game data and images courtesy of ...
</footer>
      </body>
    </html>
  );
}