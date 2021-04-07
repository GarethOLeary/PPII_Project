import React, { Component } from 'react';
import Modal from 'react-modal';
// importing fade efect animation 
import Fade from "react-reveal/Fade";
// importing zoom efect animation 
import Zoom from "react-reveal/Zoom";

export default class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: null
        }
    }

    // implementing openModal which accepts movie as a parameter
    // when click on movie it should be set as a movie of the state component 
    openModal = (movie) => {
        this.setState({ movie });
    };

    // implementing openModal - movie is set to null
    closeModal = () => {
        this.setState({ movie: null });
    };

    render() {
        // introducting modal inside the render function, using contracting assignment  
        const {movie} = this.state;

        return (
            <div>
                <Fade bottom cascade>
                    <ul className="movies">
                        {this.props.moviesList.map((movie) => (
                            <li key={movie._id}>
                                <div className="movie">
                                    <a href={"#" + movie._id} onClick={() => this.openModal(movie)}>
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
                                </div>
                            </li>
                        ))}
                    </ul>
                </Fade>
                {
                    // Using conditional rendering
                    // isOpen - when there is a movie the modal will be shown 
                    movie && (<Modal isOpen={true} onRequestClose={this.closeModal}>
                        <Zoom>
                            <button className="close-modal" onClick={this.closeModal}>x</button>
                            <div>
                                <div className="movie-details-description">
                                   <img src={movie.image} alt={movie.title}></img>
                                   <p>
                                       <strong><h1>{movie.title}</h1></strong>
                                    </p> 
                                    <p>
                                        <strong>Year:</strong> {movie.year}
                                    </p>
                                    <p>
                                        <strong>Category:</strong> {movie.category}
                                    </p>
                                    <p>
                                        <strong>Movie description:</strong> {movie.description}
                                    </p>
                                </div>
                            </div>
                            <button onClick={()=> this.props.addToCart(movie)} className="button primary">Book</button>
                        </Zoom>
                        </Modal>
                    )
                }
            </div>
        )
    }
}


//MovieList is Product 