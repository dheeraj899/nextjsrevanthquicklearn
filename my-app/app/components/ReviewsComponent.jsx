import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Make sure to import the Image component
import { getReviews } from '../path/to/reviews'; // Adjust this import path based on where your getReviews function is defined

const ReviewsComponent = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const fetchedReviews = await getReviews();
      console.log('Fetched Reviews:', fetchedReviews); // Check what is being returned
      setReviews(fetchedReviews);
    };

    fetchReviews();
  }, []);

  return (
    <div>
      {reviews.length === 0 ? (
        <p>No reviews available</p>
      ) : (
        reviews.map((review) => (
          <div key={review.slug}>
            <h2>{review.title}</h2>
            <Image
              src={review.image}
              alt={review.title}
              width={500} // Adjust width as needed
              height={300} // Adjust height as needed
            />
            <p>{review.body}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewsComponent;
