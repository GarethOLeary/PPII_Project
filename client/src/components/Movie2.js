import React from 'react';
import './movie2.css';
const IMAGE_BASE_URL ='http://image.tmdb.org/t/p/';
const IMG_API = "http://image.tmdb.org/t/p/w1280"


//Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = 'w1280';

// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = 'w500';


const Movie2 = (props) => {
    const FavouriteComponent = props.favouriteComponent;

    return (
        <div className="rmdb-movieinfo"
      
        >
           <div className="rmdb-movieinfo-content">
               <div className="rmdb-movie-info-thumb" >
               <img src={props.movie.poster_path ? IMG_API + props.movie.poster_path : "https://images.unsplash.com/photo-1576788445812-0933cb14461f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzN8fG1vdmllJTIwcGxhY2Vob2xkZXJ8ZW58MHwxfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"} alt={props.movie.title} />
               
               </div>
               <div className="rmdb-movieinfo-text">
               
                   <h1>{props.movie.title}</h1>
                   <h3>PLOT</h3>
                   <p>{props.movie.overview}</p>
                   <h3>IMDB RATING</h3>
                   <div className="rmdb-rating">
                       <p className="rmdb-score">{props.movie.vote_average}</p>
                   </div>
                   <h3>Running Time</h3>
                   <p>{props.movie.runtime}</p>
                   <h3>Revenue</h3>
                   <p>{props.movie.revenue}</p>
                   <h3>Release Date</h3>
                   <p>{props.movie.release_date}</p>
                   {props.directors.length > 1 ? <h3>Directors</h3> : <h3>Director</h3>}
                   {props.directors.map((element, i) => {
                       return <p key={i} className="rmdb-director">{element.name}</p>
                   })}
               </div>
           </div>
        </div>
    )
}

export default Movie2;