// MovieList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css';

function MovieList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const movies = useSelector(store => store.movies);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, [dispatch]);

  const handleMovieClick = (id) => {
    history.push(`/details/${id}`); 
  };

  return (
    <main>
      <h1>MovieList</h1>
      <section className="movies">
        {movies.map(movie => {
          return (
            <div data-testid="movieItem" key={movie.id}>
              <h3>{movie.title}</h3>
              <img
                data-testid="toDetails"
                src={movie.poster}
                alt={movie.title}
                onClick={() => handleMovieClick(movie.id)}
              />
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;
