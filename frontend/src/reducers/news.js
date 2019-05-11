import * as types from '../constants/UserConstants';

var initialState = [];

var myReducer = (state=initialState, action) => {
    var newState = Object.assign([], state);
    switch(action.type){
        case types.USER_GET_LIST_PRODUCT_NEW:
            newState = action.news;
            return [...newState];
        default:
            return state;
    }
} 

export default myReducer;