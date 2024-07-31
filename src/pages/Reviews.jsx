import { useParams } from 'react-router-dom';
import { getReviews } from '../api/api';
import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './Reviews.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchReviewsDetails = async () => {
      try {
        const reviewsDetails = await getReviews(movieId);
        setReviews(reviewsDetails || []);
      } catch (error) {
        setError('Oops...something went wrong!');
      } finally {
        setLoading(false);
      }
    };
    fetchReviewsDetails();
  }, [movieId]);

  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div>
      <ul className={styles.detailsContainer}>
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map(review => (
            <li key={review.id}>
              <p>Author: {review.author}</p>
              <p>Content: {review.content}</p>
            </li>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </ul>
    </div>
  );
};

export default Reviews;
