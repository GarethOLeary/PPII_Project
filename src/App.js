import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, Nav } from 'react-bootstrap';
import { Home } from './components/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {
  render(){
  return (
    <Router>
    <div className="App">
      <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Movies</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/header">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav> 
        </Navbar>
        <br />
        <Switch>
          <Route path='/' component={Home} exact/>
        </Switch>
    </div>
    </Router>
  );
}
}

export default App;
