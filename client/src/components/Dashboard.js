import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Link } from 'react-router-dom'
import '../App.css';
import logo from '../icinema.png'
import styled from "styled-components";

import MovieDetails from './movieDetails';

import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (

      <div>
       
        <div>
          <MovieDetails></MovieDetails>
        </div>
      </div>

    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);

const Container = styled.div`
.signIn-btn{
   right: 0;
   margin: 1.125rem 3% 0;
   padding: 0.4375rem 1.0625rem;
   font-weight: 400;
   line-height: normal;
   border-radius: 0.1875rem;
   font-size: 1rem;
   background: var(--main-red);
   position: absolute;
   color: white;
   translate: transform(-50%, -50%);
   cursor: pointer;
   transition: background 0.2s ease-in;
   &:hover{
       background: var(--main-red-hover);
   }
}

.topcorner{
  position:absolute;
  top:20px;
  right: 150px;
}


.content{
  width: 65%;
  position: relative;
  margin: 4.5rem auto 0;
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  flex-direction: column;
  z-index: 1;
}

`;
