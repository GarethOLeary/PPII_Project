import React, { Component } from 'react';
import './App.css';
import Home from './components/MoviePages/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import UpcomingMovies from './components/MoviePages/upcomingMovies';
import TopRatedMovies from './components/MoviePages/topRatedMovies';
import PopularMovies from './components/MoviePages/popularMovies';
import MovieDetails from './components/MoviePages/movieDetails';
import Navbar from './components/views/Navbar'
import FavoritePage from './components/views/FavoritePage';


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
<Navbar/>
            <Switch>
              <Route path='/' component={Home} exact />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/upcomingMovies" component={UpcomingMovies} />
              <Route exact path="/popularMovies" component={PopularMovies} />
              <Route exact path="/topRatedMovies" component={TopRatedMovies} />
              <Route path="/movie/:movieId" component={MovieDetails} exact />
              <Route exact path="/favorite" component={FavoritePage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
