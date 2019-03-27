import React, { Component } from 'react';
import './App.css';
import Body from './components/Body';
import NotFound from './components/NotFound.jsx';
import Login from './components/Login';
import {Route, Switch, BrowserRouter,HashRouter} from 'react-router-dom';
import * as actions from './actions/index';
import { connect } from 'react-redux';

class App extends Component {

  render() {

  return (
    <BrowserRouter>
      <Switch>
      
      <Route exact path="/" component={Body} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
      
      </Switch>
    </BrowserRouter>
  );
  }
}

const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
      authLogin: (username, password) => {
          dispatch(actions.authLogin(username,password));
      }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);