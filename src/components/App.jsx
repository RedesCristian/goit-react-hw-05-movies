import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Cast from '../pages/Cast';
import Home from '../pages/Home';
import Movies from '../pages/Movies';
import MoviesDetails from '../pages/MovieDetails';
import Reviews from '../pages/Reviews';
import NotFound from '../pages/NotFound';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  background-color: #333;
  padding: 1rem;
  width: 100%;
`;

const StyledLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  margin-left: 30px;

  &.active {
    font-weight: bold;
    border-bottom: 2px solid white;
  }

  &:hover {
    color: orange; /* Exemplu de schimbare a culorii textului la hover */
    text-decoration: underline; /* Exemplu de subliniere a textului la hover */
  }
`;

const App = () => {
  return (
    <div
      style={{
        // height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Nav>
        <StyledLink to="/" end>
          Home
        </StyledLink>
        <StyledLink to="movies">Movies</StyledLink>
      </Nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MoviesDetails />} />
        <Route path="/movies/:movieId/cast" element={<Cast />} />
        <Route path="/movies/:movieId/reviwes" element={<Reviews />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
export { App };
