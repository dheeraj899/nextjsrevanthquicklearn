import NavBar from './components/NavBar';
import './globals.css';
import { exo2,orbitron } from './fonts';
export const metadata = {
  title: {
    default: 'Indie Gamer',
    template: '%s | Indie Gamer',
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${exo2.variable} ${orbitron.variable}`}>
      <body className="bg-orange-50 flex flex-col px-4 py-2 min-h-screen">
        <header>
          <NavBar />
        </header>
        <main className="grow py-3">
          {children}
        </main>
        <footer className="border-t py-3 text-center  text-slate-500 text-xs">
          Quick Learn Blogs by <a href="https://www.revanthquicklearn.com/" target="_blank" className="text-orange-800 hover:underline">
            Revanth
          </a>
        </footer>
      </body>
    </html>
  );
}