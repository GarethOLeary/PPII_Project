import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../actions/authActions';

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
    
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <ul class="a">
        <li class="a">
        <Link to="/">
        <img className="logo-img" src="/images/logo_small.png" alt=""/>
        </Link>
        </li>
        <li>
        <Link to="/topRatedMovies">
          Top Rated
        </Link>
        </li>
        <li>
        <Link to="/popularMovies">
          Popular
        </Link>
        </li>
        <li>
        <Link to="/upcomingMovies">
          Upcoming
        </Link>
        </li>
        <li>
        <a href="/favorite">Favorite</a>
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



