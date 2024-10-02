// app/reviews/hollow-knight/page.jsx
import Heading from '@/components/Heading';

export default function HollowKnightPage() {
  return (
    <>
      <Heading>Hollow Knight</Heading>
      <img 
        src="/images/hollow-knight.jpg" 
        alt="Hollow Knight" 
        width="640" 
        height="360" 
        className="mb-2 rounded" 
      />
      <p>
        This will be the review for Hollow Knight.
      </p>
    </>
  );
}