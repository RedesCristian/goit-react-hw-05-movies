import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCredits } from '../api/api';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCastDetails = async () => {
      try {
        const castDetails = await getCredits(movieId);
        setCast(castDetails);
      } catch (error) {
        setError('Oops... something went wrong!');
      } finally {
        setLoading(false);
      }
    };

    fetchCastDetails();
  }, [movieId]);

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <ul className={styles.detailsContainer}>
        {cast.map(listElement => (
          <li key={listElement.id}>
            <img
              src={
                listElement.profile_path
                  ? `https://image.tmdb.org/t/p/w300${listElement.profile_path}`
                  : 'https://via.placeholder.com/300?text=No+Image'
              }
              alt={`${listElement.name} portrait`}
            />
            <p>{listElement.name}</p>
            <p>{listElement.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;
