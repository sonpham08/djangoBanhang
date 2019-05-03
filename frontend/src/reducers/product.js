import * as types from '../constants/UserConstants';

var initialState = {};

var myReducer = (state=initialState, action) => {
    var newState = Object.assign({}, state);
    switch(action.type){
        case types.GET_PRODUCT_BY_ID:
            newState = action.product;
            return newState;
        default:
            return state;
    }
} 

export default myReducer;