
import React, { useState } from "react";
import axios from 'axios';
import './../styles/App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const API_KEY = '99eb9fd1';

  const handleSearch = () => {
    if (query.trim() === '') {
      setError('Invalid movie name. Please try again.');
      setMovies([]);
      return;
    }

    axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
      .then(response => {
        if (response.data.Response === 'True') {
          setMovies(response.data.Search);
          setError('');
        } else {
          setError('Invalid movie name. Please try again.');
          setMovies([]);
        }
      })
      .catch(() => {
        setError('Error fetching data. Please try again later.');
        setMovies([]);
      });
  };

  return (
    <div>
    <h1>Movie Search</h1>
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Enter movie title"
    />
    <button onClick={handleSearch}>Search</button>

    {error && <p className="error">{error}</p>}

    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.imdbID} className="movie-item">
          <h2>{movie.Title}</h2>
          <p>{movie.Year}</p>
          <img src={movie.Poster} alt={movie.Title} />
        </li>
      ))}
    </ul>
  </div>
  );
}

export default App
