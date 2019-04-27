import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {createStore,applyMiddleware, compose} from 'redux';
import thunk from "redux-thunk";
import myReducer from './reducers/index';
import {Provider} from 'react-redux';
import { HashRouter } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store=createStore(myReducer,composeEnhances(applyMiddleware(thunk)));
ReactDOM.render(
    <Provider store={store}> 
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
