import React, { useState, useEffect } from 'react';
import { getPopularMovies } from '../api/api';
import { NavLink } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './Home.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div>There was an error fetching the popular movies: {error.message}</div>
    );
  }

  return (
    <div className={styles.homeContainer}>
      <h1>Trending today</h1>
      <ul className={styles.homeText}>
        {movies &&
          movies.length > 0 &&
          movies.map(movie => (
            <li key={movie.id}>
              <NavLink to={`/movies/${movie.id}`}>
                {movie.title} - {new Date(movie.release_date).getFullYear()}
              </NavLink>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;
