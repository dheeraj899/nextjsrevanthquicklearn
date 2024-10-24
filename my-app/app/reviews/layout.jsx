export default function ReviewsLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginLeft: '1rem' }}>
        {children}
      </div>
    </div>
  );
}