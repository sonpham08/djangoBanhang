import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import adproduct from './adproduct';
import adcategories from './adcategories';

const myReducer = combineReducers({
    auth,
    user,
    adproduct,
    adcategories
});

export default myReducer;