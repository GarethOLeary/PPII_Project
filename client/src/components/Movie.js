import React from "react";
import './movie.css';
const IMG_API = "http://image.tmdb.org/t/p/w1280"

const Movie = ({ title, poster_path, overview, movieId,
  vote_average }) => (

    <div className="movie">
      <a href={`/movie/${movieId}`} >
        <img src={IMG_API + poster_path} alt={title} />
      </a>
      <div className="movie-info">
        <h3>{title}</h3>
        <span>{vote_average}</span>

      </div>

    </div>
  );
export default Movie;