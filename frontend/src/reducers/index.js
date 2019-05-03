import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import adproduct from './adproduct';
import adcategories from './adcategories';
import adstaff from './adstaff';
import adcustomer from './adcustomer';
import usproduct from './usproduct';
import cart from './cart';
import bill from './bill';
import adstaffship from './adstaffship';
import staff from './staff';
import product from './product';
import detail from './detail';

const myReducer = combineReducers({
    auth,
    user,
    adproduct,
    adcategories,
    adstaff,
    adcustomer,
    usproduct,
    cart,
    adstaffship,
    bill,
    staff,
    product,
    detail,
});

export default myReducer;