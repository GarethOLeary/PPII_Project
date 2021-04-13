import React, { useState, useEffect } from "react";
//import { NavLink, Link } from 'react-router-dom'
import '../App.css';
//import logo from '../icinema.png'
//import styled from "styled-components";
import Movie from "./Movie"

import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom'

//const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=12a3069539c26ded272cb55534169534&page=1';
const API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=12a3069539c26ded272cb55534169534';
const API_KEY = '12a3069539c26ded272cb55534169534';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=12a3069539c26ded272cb55534169534&query=';

// Images
// An image URL looks like this example:
// http://image.tmdb.org/t/p/w780/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg

const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';

function PopularMovies() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getMovies(API_URL);
    }, []);

    const getMovies = (API) => {
        fetch(API)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setMovies(data.results)
            });
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (searchTerm){
            getMovies(SEARCH_API + searchTerm)
            
            setSearchTerm("");
        }
    }

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    }

    return <div>

        <div>
            <Navbar className="nav-header" bg="dark" variant="dark">
                <Nav.Link href="/">iMovies</Nav.Link>
                <Nav className="mr-auto">
                    <Nav.Link href="/popularMovies">Popular</Nav.Link>
                    <Nav.Link href="/upcomingMovies">Upcoming</Nav.Link>
                </Nav>
                <Nav>
                    <form onSubmit={handleOnSubmit}>
                        <input className="search" type="text" placeholder="Search..." value={searchTerm} onChange={handleOnChange}></input>
                    </form>
                </Nav>
            </Navbar>
        </div>

        {movies.length > 0 &&
            movies.map((movie) => <Movie key={movie.id} {...movie} />)}
    </div>

}

export default PopularMovies;