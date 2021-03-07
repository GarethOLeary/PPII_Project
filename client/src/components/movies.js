import React from 'react';
import data from "../data.json";
import MovieList from './MovieList';

export class Movies extends React.Component {
    constructor(){
        super();
        this.state = {
            moviesList: data.moviesList,
            sort: "",
        }
    }

    render() {
        return (
            <div className="grid-container">
                <header>
                    <a href="/movies">Movies</a>
                </header>
                <main>
                    <div className="content">
                        <div className="main">
                            <MovieList moviesList={this.state.moviesList}></MovieList>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}
