import Link from 'next/link';
import Heading from '../../components/Heading';
import styles from './Reviews.module.css';
export default function ReviewsPage() {
  return (
    <>
    <Heading /> {/* Render the Heading component here */}
      <Heading>Reviews</Heading>
      <p>Here we'll list all the reviews.</p>
      <ul className={styles.list}></ul>
      <ul>
        <li>
          <Link href="/reviews/hollow-knight">Hollow Knight</Link>
        </li>
        <li>
          <Link href="/reviews/stardew-valley">Stardew Valley</Link>
        </li>
      </ul>
    </>
  );
}