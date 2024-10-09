// DetailsPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

function DetailsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const movie = useSelector(store => store.selectedMovie);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIE_DETAILS', payload: id });
  }, [dispatch, id]);

  const handleBackClick = () => {
    history.push('/');
  };

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div data-testid="movieDetails">
      <h2>{movie.title}</h2>
      <img src={movie.poster} alt={movie.title} />
      <p>{movie.description}</p>
      <ul>
        {movie.genres.map(genre => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
      <button data-testid="toList" onClick={handleBackClick}>
        Back to Movie List
      </button>
    </div>
  );
}

export default DetailsPage;
