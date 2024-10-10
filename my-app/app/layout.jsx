// RootLayout.jsx
import NavBar from '../components/NavBar';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-orange-50 flex flex-col px-4 py-2 min-h-screen">
        <header>
          <NavBar />
        </header>
        <main className="grow py-3">
          {children}
        </main>
        <footer className="border-t py-3 text-center text-xs">
  Quick Learn Blogs by <a href="https://www.revanthquicklearn.com/" target="_blank" className="text-blue-800 hover:underline">
    Revanth
  </a>
</footer>
      </body>
    </html>
  );
}

