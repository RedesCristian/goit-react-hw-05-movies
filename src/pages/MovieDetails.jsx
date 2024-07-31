import React, { useState, useEffect } from 'react';
import {
  useParams,
  NavLink,
  useNavigate,
  useLocation,
  Outlet,
} from 'react-router-dom';
import { getDetails } from '../api/api';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './MovieDetails.module.css';

const MoviesDetails = () => {
  const [details, setDetails] = useState(null);
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getDetails(movieId);
        setDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    fetchDetails();
  }, [movieId]);

  if (!details)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  const handleClick = () => navigate(location?.state?.from ?? '/');

  return (
    <div className={styles.detailsContainer}>
      <button type="button" onClick={handleClick}>
        ← Go back
      </button>
      <img
        src={`https://image.tmdb.org/t/p/w200/${details.poster_path}`}
        alt={details.title || details.name}
      />
      <div>
        <h2>{details.title || details.name}</h2>
        <p>User Score: {Math.round(details.popularity)}%</p>
      </div>
      <div>
        <h2>Overview</h2>
        <p>{details.overview}</p>
      </div>
      <div>
        <h3>Genres</h3>
        {details.genres &&
          details.genres.map(({ id, name }) => <p key={id}>{name}</p>)}
      </div>

      <NavLink to={`/movies/${movieId}/cast`}>Cast</NavLink>
      <NavLink to={`/movies/${movieId}/reviews`}>Reviews</NavLink>
      <Outlet />
    </div>
  );
};

export default MoviesDetails;
