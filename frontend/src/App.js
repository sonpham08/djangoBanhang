import React, { Component } from 'react';
import './App.css';
import Body from './components/Body';
import NotFound from './components/NotFound.jsx';
import {Route, Switch, BrowserRouter,HashRouter} from 'react-router-dom';
import SignUp from './components/commons/SignUp.jsx';
import AdminHome from './components/AdminHome';

class App extends Component {
  render() {
  return (
    <BrowserRouter>
      <Switch>
      
      <Route exact path="/" component={Body} />
      <Route exact={true} path="/signup" component={SignUp}/>
      <Route exact={true} path="/adminhome" component={AdminHome}/>
      <Route component={NotFound} />
      
      </Switch>
    </BrowserRouter>
  );
  }
}

export default App;