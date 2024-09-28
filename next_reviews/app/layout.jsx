import Link from 'next/link';
import './globals.css';
import ExampleComponent from './components/ExampleComponent';  // Import ExampleComponent
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/reviews">Reviews</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </nav>
        </header>
        {/* ExampleComponent can be rendered here */}
        <ExampleComponent />
        <main>{children}</main>
        <footer>
          Game data and images courtesy of{' '}
          <a href="https://rawg.io/" target="_blank" rel="noopener noreferrer">
            RAWG
          </a>
        </footer>
      </body>
    </html>
  );
}