import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../actions/authActions';
import '../App.css';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logoutUser }) => {
  const authLinks = (
    <ul>
      <li>
        
     
          <span className="hide-sm">Welcome {user && user.name}</span>
        
      </li>
      <li>
        <a onClick={logoutUser} href="#!">
        
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <ul class="a">
        <li class="a">
        <Link to="/">
          Imovies
        </Link>
        </li>
        <li>
        <Link to="/topRatedMovies">
          Top Rated
        </Link>
        </li><li>
        <Link to="/upcomingMovies">
          Upcoming
        </Link>
        </li>
      </ul>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);