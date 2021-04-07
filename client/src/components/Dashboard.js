import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Link} from 'react-router-dom'
import '../App.css';
import logo from '../icinema.png'
import styled  from "styled-components";
import { NavLink } from 'react-router-dom'

//importing navbar that allows the navbar to work and be displayed 
import { Navbar, Nav } from 'react-bootstrap';

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
    const { user } = this.props.auth;
return (

<div>
  <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/"><img height="70" width="70" src={logo} /></Navbar.Brand>
            
            <Nav className="mr-auto">
                <Navbar.Brand href="/movies">Movies</Navbar.Brand>
            </Nav>
            <Nav>
            <b>Hey there,</b> {user.name.split(" ")[0]}
            </Nav>
            <Nav>
            <Link className="signIn-btn" onClick={this.onLogoutClick}>Logout</Link>
            </Nav>
          </Navbar>

      <Container style={{ height: "75vh" }} className="container1">
         
         
        <div className="row">
        
          <div className="topcorner">
            
           
           
          </div>
        </div>
      </Container>
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
            