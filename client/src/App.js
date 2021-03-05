import React, { Component } from 'react';
import './App.css';
import { Home } from './components/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Register from "./components/Register";
import Login from "./components/Login";
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render(){
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
      
        <Switch>
          <Route path='/' component={Home} exact/>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
    </div>
    </Router>
    </Provider>
  );
}
}

export default App;
