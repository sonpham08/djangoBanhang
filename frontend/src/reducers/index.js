import { combineReducers } from 'redux';
import auth from './auth';

const myReducer = combineReducers({
    auth
});

export default myReducer;