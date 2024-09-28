export default function ReviewsLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ border: '2px solid red', padding: '1rem' }}>
        [Sidebar with Review Filters]
      </aside>
      <div style={{ marginLeft: '1rem' }}>
        {children}
      </div>
    </div>
  );
}