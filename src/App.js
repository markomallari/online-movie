import React, { useEffect, useState } from 'react';
import SearchIcon from './search.svg';
import './App.css';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=6b107e35';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data);
    setMovies(data.Search);
  }

  useEffect(()=>{
    searchMovies('one piece');
  }, []);

  return (
    <div className="app">
      <h1>Mega Movies</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) =>{ setSearchTerm(e.target.value) }}
          placeholder="Search for movies"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              searchMovies(searchTerm ? searchTerm : 'One Piece')
            }
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {
        movies?.length > 0 
        ? (
          <div className="container">
            {movies.map(movie=>( 
              <MovieCard movie={movie} key={movie.imdbID} />
            ))}
          </div>
        )  : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )
      }
    </div>
  )
}

export default App
