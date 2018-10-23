import React, { Component } from 'react';
import './App.css';
import Body from './components/Body';
import NotFound from './components/NotFound';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import TopicForm from './components/TopicForm';
import HistoryList from './components/HistoryList';

class App extends Component {
  render() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Body} />
      <Route path="/createField" component={TopicForm} />
      <Route path="/history" component={HistoryList}/>
      <Route component={NotFound} />
    </Switch>
    </BrowserRouter>
  );
  }
}

export default App;