import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';

// checks to see if the user is logged in 
// if yes displays logout
const Navbar = ({ auth: { isAuthenticated, loading, user }, logoutUser }) => {
  const authLinks = (
    <ul>
      <li>
        {/*displays logged in users name*/}
        <span className="hide-sm">Welcome {user && user.name}</span>
      </li>
      <li>
        <a onClick={logoutUser} href="#!">
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );
  // links to login and register , only show in navbar if not logged in
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
  // navbar with links to pages
  return (
    <nav className="navbar">
      <ul class="a">
        <li class="a">
          <Link to="/">
            <img className="logo-img" src="/images/logo_small.png" alt="" />
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

//prop-types package to define types
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
// mapStateToProps allows us to get our state from Redux and map it to props which we can use inside components
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);



