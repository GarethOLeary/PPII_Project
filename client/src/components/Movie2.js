import React from 'react';
import './movie2.css';
const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';
const IMG_API = "http://image.tmdb.org/t/p/w1280"


//Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = 'w1280';

// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = 'w500';


const Movie2 = (props) => {
    const FavouriteComponent = props.favouriteComponent;

    return (

        <div className="main">
            <div className="details">
                <div className="movie-img">
                    <img src={props.movie.poster_path ? IMG_API + props.movie.poster_path : "https://images.unsplash.com/photo-1576788445812-0933cb14461f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzN8fG1vdmllJTIwcGxhY2Vob2xkZXJ8ZW58MHwxfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"} alt={props.movie.title} />
                </div>
                <div className="box">
                    <div className="row">
                        <h1>{props.movie.title} </h1>
                    </div>
                    <ul>PLOT</ul>
                    <p>{props.movie.overview}</p>
                    <ul>Running Time</ul>
                    <p>{props.movie.runtime}</p>
                    <ul>Revenue</ul>
                    <p>{props.movie.revenue}</p>
                    <ul>Release Date</ul>
                    <p>{props.movie.release_date}</p>
                </div>
                <div>
                    <p>IMDB RATING: {props.movie.vote_average}/10</p>
                    <p className="rmdb-score"></p>
                </div>
            </div>
        </div>
    )
}

export default Movie2;