import React from "react";
import './movie.css';
const IMG_API = "http://image.tmdb.org/t/p/w1280"

const Movie = ({ title, poster_path, overview, movieId,
  vote_average }) => (

    <div className="movie">
      <a href={`/movie/${movieId}`} >
        <img src={poster_path ? IMG_API + poster_path : "https://images.unsplash.com/photo-1576788445812-0933cb14461f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzN8fG1vdmllJTIwcGxhY2Vob2xkZXJ8ZW58MHwxfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"} alt={title} />
      </a>
      <div className="movie-info">
        <h3>{title}</h3>
        <span>{vote_average}</span>

      </div>

    </div>
  );
export default Movie;