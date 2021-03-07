import React, { Component } from 'react'

export default class MovieList extends Component {
    render() {
        return (
            <div>
                <ul className="movies">
                    {this.props.moviesList.map((movie) => (
                        <li key={movie._id}>
                            <div className="movie">
                                <a href={"#" + movie._id}>
                                    <img src={movie.image} alt={movie.title}></img>
                                        <p>
                                            {movie.title}
                                        </p>
                                </a>
                                    <div className="movie-category">
                                        {movie.category}
                                    </div>
                                    <div className="movie-description">
                                        {movie.description}
                                    </div>
                                    <button className="button primary">Book</button>
                             </div>
                        </li>
                    ))}
                        </ul>
            </div>
        )
    }
}
