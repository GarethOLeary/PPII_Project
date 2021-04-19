import React, { Component } from 'react';
import Spinner from './Spinner'
import Movie2 from './Movie2'
import Favorite from './Favorite';
const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '12a3069539c26ded272cb55534169534';


class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false
    
  }
  
  componentDidMount() {
    if(localStorage.getItem(`${this.props.match.params.movieId}`)) {
      const state = JSON.parse(localStorage.getItem(`${this.props.match.params.movieId}`));
      this.setState({...state});
    } else {
      // First fetch the movie ...
      this.setState({ loading: true })
      const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
      this.fetchItems(endpoint);
    }
    }
    
  fetchItems = (endpoint) => {
    fetch(endpoint)
    .then(result => result.json())
    .then(result => {
        console.log(result);
        
      if (result.status_code) {
        this.setState({ loading: false });
      } else {
        this.setState({ movie: result }, () => {
          // then fetch actors in the setState callback function
          const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`;
          fetch(endpoint)
          .then(result => result.json())
          .then(result => {
            const directors = result.crew.filter( (member) => member.job === "Director");

            this.setState({
              actors: result.cast,
              directors,
              loading: false
            }, () => {
              localStorage.setItem(`${this.props.match.params.movieId}`, JSON.stringify(this.state));
            })
          })
        })
      }
    })
    .catch(error => console.error('Error:', error))
  }

  render() {
    return (
      <div className="rmdb-movie">
        {this.state.movie ? 
        
        <div>
            
            <Movie2 movie={this.state.movie} directors={this.state.directors} 
             time={this.state.movie.runtime} budget={this.state.movie.budget} revenue={this.state.movie.revenue} />
        </div>
        : null }
       
        {this.state.loading ? <Spinner /> : null}   
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={this.state.movie} movieId={this.state.movieId} userFrom={localStorage.getItem('userId')} />
                </div>     
      </div>
    )
  }
}

export default Movie;