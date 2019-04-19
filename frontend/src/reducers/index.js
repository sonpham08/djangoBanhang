import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import adproduct from './adproduct';
import adcategories from './adcategories';
import adstaff from './adstaff';
import adcustomer from './adcustomer';
import usproduct from './usproduct';

const myReducer = combineReducers({
    auth,
    user,
    adproduct,
    adcategories,
    adstaff,
    adcustomer,
    usproduct
});

export default myReducer;