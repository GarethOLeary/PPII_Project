import React, { useState, useEffect } from "react";
//import { NavLink, Link } from 'react-router-dom'
import '../App.css';
//import logo from '../icinema.png'
//import styled from "styled-components";
import Movie from "./Movie"

import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom'

//const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=12a3069539c26ded272cb55534169534&page=1';
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=12a3069539c26ded272cb55534169534';
const API_KEY = '12a3069539c26ded272cb55534169534';

// Images
// An image URL looks like this example:
// http://image.tmdb.org/t/p/w780/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg

const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';

function MovieDetails() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setMovies(data.results)
            });
    }, []);

    return <div>
        <div>
            <Navbar className="nav-header" bg="dark" variant="dark">
                <Nav.Link href="/">iMovies</Nav.Link>
                <Nav className="mr-auto">
                </Nav>
                <Nav>
                    <NavLink className="signIn-btn" to="/login">Sign In </NavLink>
                </Nav>
            </Navbar>
        </div>

        {movies.length > 0 &&
            movies.map((movie) => <Movie key={movie.id} {...movie} />)}
    </div>



}



export default MovieDetails;