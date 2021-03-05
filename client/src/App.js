import React, { Component } from 'react';
import './App.css';
import { Home } from './components/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {
  render(){
  return (
    <Router>
    <div className="App">
      
        <Switch>
          <Route path='/' component={Home} exact/>
        </Switch>
    </div>
    </Router>
  );
}
}

export default App;
