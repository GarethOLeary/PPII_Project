import React, { useState, useEffect, useRef } from "react";
//import { NavLink, Link } from 'react-router-dom'
import '../App.css';
//import logo from '../icinema.png'
//import styled from "styled-components";
import Movie from "./Movie"

import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom'
import { get } from "mongoose";
import LoadMoreBtn from './LoadMoreBtn'
import Spinner from './Spinner'
const POSTER_SIZE = 'w500'
const IMAGE_BASE_URL ='http://image.tmdb.org/t/p/';

const API_URL2 = 'https://api.themoviedb.org/3/';
//const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=12a3069539c26ded272cb55534169534&page=1';
const API_URL = 'https://api.themoviedb.org/3/movie/upcoming?api_key=12a3069539c26ded272cb55534169534';
const API_KEY = '12a3069539c26ded272cb55534169534';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=12a3069539c26ded272cb55534169534&query=';

// For categoty eg horror, comedian etc 
// https://api.themoviedb.org/3/discover/movie?sort_by=comedian&api_key=12a3069539c26ded272cb55534169534

// Images
// An image URL looks like this example:
// http://image.tmdb.org/t/p/w780/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg


class TopRatedMovies extends React.Component {
    state = {
        movies: [],
        loading: false,
        currentPage: 0,
        totalPages: 0,
        searchTerm: ''
    }

    // Life cycle method 
    componentDidMount() {
        if(localStorage.getItem('Homestate')){
            const state = JSON.parse(localStorage.getItem('Homestate'));
            this.setState({...state});
        } else {
            this.setState({loading: true });
            const endpoint = `${API_URL2}movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
            this.fetchItems(endpoint);
        }
    }

    

    loadMoreItems = () => {
        let endpoint = '';
        this.setState({loading: true});

        if(this.state.searchTerm === ''){
            endpoint = `${API_URL2}movie/top_rated?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`;
        } else {
            endpoint = `${API_URL2}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.currentPage + 1}`;
        }

        this.fetchItems(endpoint);
    }

    fetchItems = (endpoint) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
           this.setState({
               // Spread operator to append to current array
               movies: [...this.state.movies,...result.results],
               // If null, it will fetch result
               loading: false,
               currentPage: result.page,
               totalPages: result.total_pages
           }, () => {
               if(this.state.searchTerm === "") {
                localStorage.setItem('HomeState', JSON.stringify(this.state));
               }
           })
        });    
    }

    render() {
        return (
            <div className="rmdb-home">
    
            <div>
                
                
            </div>
             <div className="rmdb-home-grid">
                <div 
                    header={this.state.searchTerm ? 'Search result' : 'top_rated Movies'} 
                    loading={this.state.loading} >
                    {this.state.movies.map((element, i) => {
                        return <Movie 
                                    key={i} 
                                    clickable={true} 
                                    poster_path={element.poster_path}
                                movieId={element.id}
                                title={element.original_title}
                                vote_average={element.vote_average}
                                />
                    })}
                </div>
                {this.state.loading ? <Spinner/> : null}
                {(this.state.currentPage <= this.state.totalPages && !this.state.loading) ? 
                  <LoadMoreBtn text="Load More" onClick={this.loadMoreItems}/> : null
                }
             </div>   

            </div>
        )
    }

}

export default TopRatedMovies;