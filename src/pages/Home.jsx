import React, { useState, useEffect } from 'react';
import { getPopularMovies } from '../api/api';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

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
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>There was an error fetching the popular movies: {error.message}</div>
    );
  }

  return (
    <div className="{styles.homeContainer}">
      <h1>Trending today</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to="{`/movies/{movieId}`}">
              {movie.title} -{movie.release_date}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
