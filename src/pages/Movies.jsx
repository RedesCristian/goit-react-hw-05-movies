import React, { useState } from 'react';
import { searchMovies } from '../api/api';
import { NavLink } from 'react-router-dom';
import styles from './Movies.module.css';

const Movies = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (query.trim() === '') {
      alert('Te rugăm să introduci un cuvânt cheie pentru căutare.');
      return;
    }
    try {
      const data = await searchMovies(query);
      setResult(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Caută filme..."
        />
        <button type="submit">Caută</button>
      </form>
      <div className={styles.missingResults}>
        {result.length > 0 ? (
          <ul className={styles.detailsContainer}>
            {result.map((movie, index) => (
              <li key={index}>
                <NavLink to={`/movies/${movie.id}`}>{movie.title}</NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Movies;
