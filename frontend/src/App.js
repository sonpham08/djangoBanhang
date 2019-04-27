import React, { Component } from 'react';
import './App.css';
import Body from './components/Body';
import NotFound from './components/NotFound.jsx';
import Login from './components/Login';
import Register from './components/Register';
import Sale from './components/sale/Sale';
// import ProductDetail from './components/product/ProductDetail';
import CheckTransfer from './components/product/CheckTransfer';
import {Route, Switch, BrowserRouter,HashRouter} from 'react-router-dom';
import * as authActions from './actions/authActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class App extends Component {

  render() {

  return (
    <BrowserRouter>
      <Switch>
      
      <Route exact path="/" component={Body} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/sale" component={Sale} />
      {/* <Route exact path="/product_detail" component={ProductDetail} /> */}
      <Route exact path="/transfer" component={CheckTransfer} />
      <Route path="**" component={NotFound} />
      
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
      // authLogin: (username, password) => {
      //     dispatch(actions.authLogin(username,password));
      // }
      authActions: bindActionCreators(authActions, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);