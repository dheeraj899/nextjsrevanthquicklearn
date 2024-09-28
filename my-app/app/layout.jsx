export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{ border: '2px solid blue' }}>[Header]</header>
        <main>{children}</main>
        <footer style={{ border: '2px solid blue' }}>[Footer]</footer>
      </body>
    </html>
  );
}