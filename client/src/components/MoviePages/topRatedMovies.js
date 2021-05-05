import React, { useState, useEffect, useRef } from "react";
import '../../App.css';
import Movie from "../views/Movie"
import Search from "../views/Search"
import LoadMoreBtn from '../views/LoadMoreBtn'
import Spinner from '../views/Spinner'
const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '12a3069539c26ded272cb55534169534';

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
        if (localStorage.getItem('Homestate')) {
            const state = JSON.parse(localStorage.getItem('Homestate'));
            this.setState({ ...state });
        } else {
            this.setState({ loading: true });
            const endpoint = `${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
            this.fetchItems(endpoint);
        }
    }
    // searches all movies from the api 
    searchItems = (searchTerm) => {
        console.log(searchTerm);

        let endpoint = '';
        this.setState({
            movies: [],
            loading: true,
            searchTerm: searchTerm
        })
        // searchterm displays all movies if its blank otherwise whatever is entered will be searched 
        if (searchTerm === '') {
            endpoint = `${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
        } else {
            endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
        }

        this.fetchItems(endpoint);
    }


    //  method that loads more movies 
    loadMoreItems = () => {
        let endpoint = '';
        this.setState({ loading: true });
        // will load movies straight away when a key is pressed
        if (this.state.searchTerm === '') {
            endpoint = `${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`;
        } else {
            endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.currentPage + 1}`;
        }

        this.fetchItems(endpoint);
    }
    // fetches all movies from api 
    fetchItems = (endpoint) => {
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    // Spread operator to append to current array
                    movies: [...this.state.movies, ...result.results],
                    // If null, it will fetch result
                    loading: false,
                    currentPage: result.page,
                    totalPages: result.total_pages
                }, () => {
                    if (this.state.searchTerm === "") {
                        localStorage.setItem('HomeState', JSON.stringify(this.state));
                    }
                })
            });
    }

    render() {
        return (


            <div className="rmdb-home">
                {/*calls searchpage and ususe callback function */}
                <div>
                    <Search callback={this.searchItems} />

                </div>
                <div className="rmdb-home-grid">
                    <div
                        header={this.state.searchTerm ? 'Search result' : 'top_rated Movies'}
                        loading={this.state.loading} >
                        {/* Displays the details from the movie page */}
                        {this.state.movies.map((element, i) => {
                            return <Movie
                                key={i}
                                clickable={true}
                                poster_path={element.poster_path}
                                movieId={element.id}
                                title={element.title}
                                vote_average={element.vote_average}
                            />
                        })}
                    </div>
                    {this.state.loading ? <Spinner /> : null}
                    {/*load button to load more movies */}
                    {(this.state.currentPage <= this.state.totalPages && !this.state.loading) ?
                        <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} /> : null
                    }
                </div>

            </div>
        )
    }

}

export default TopRatedMovies;