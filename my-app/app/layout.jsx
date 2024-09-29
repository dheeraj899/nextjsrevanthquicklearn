import Link from 'next/link';
import './globals.css';

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
        <main>{children}</main>
        <footer>
          Quick Learn Blogs by <a href="https://www.revanthquicklearn.com/" target="_blank" rel="noopener noreferrer">Revanth</a>
        </footer>
      </body>
    </html>
  );
}