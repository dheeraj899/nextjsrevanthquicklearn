import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <>
      <header>
        {/* Navigation links */}
      </header>
      <main>{children}</main>
    </>
  );
}