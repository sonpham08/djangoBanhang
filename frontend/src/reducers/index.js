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
import promotion from './promotion';
import news from './news';
import comment from './comment';
import coin from './coin';
import flashsale from './flashsale';
import transporter from './transporter';
import statistic from './statistic';

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
    promotion,
    news,
    comment,
    coin,
    transporter,
    flashsale,
    statistic,
});

export default myReducer;