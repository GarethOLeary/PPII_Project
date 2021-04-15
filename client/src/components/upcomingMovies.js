import React, { useState, useEffect } from "react";
//import { NavLink, Link } from 'react-router-dom'
import '../App.css';
//import logo from '../icinema.png'
//import styled from "styled-components";
import Movie from "./Movie"

import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom'
import { get } from "mongoose";

//const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=12a3069539c26ded272cb55534169534&page=1';
const API_URL = 'https://api.themoviedb.org/3/movie/upcoming?api_key=12a3069539c26ded272cb55534169534';
const API_KEY = '12a3069539c26ded272cb55534169534';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=12a3069539c26ded272cb55534169534&query=';

// For categoty eg horror, comedian etc 
// https://api.themoviedb.org/3/discover/movie?sort_by=comedian&api_key=12a3069539c26ded272cb55534169534

// Images
// An image URL looks like this example:
// http://image.tmdb.org/t/p/w780/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg

const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';

function UpcomingMovies() {
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
            
        </div>

        {movies.length > 0 &&
            movies.map((movie) => <Movie key={movie.id} {...movie} />)}
    </div>

}

export default UpcomingMovies;