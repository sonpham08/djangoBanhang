import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import adproduct from './adproduct';
import adcategories from './adcategories';
import adstaff from './adstaff';
import adcustomer from './adcustomer';
import usproduct from './usproduct';
import cart from './cart';
import adstaffship from './adstaffship';

const myReducer = combineReducers({
    auth,
    user,
    adproduct,
    adcategories,
    adstaff,
    adcustomer,
    usproduct,
    cart,
    adstaffship
});

export default myReducer;