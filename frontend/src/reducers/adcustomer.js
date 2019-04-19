import * as types from '../constants/AdminConstants';

var initialState = [];

var myReducer = (state=initialState, action) => {
    var newState = Object.assign([], state);
    let index = "";
    switch(action.type){
        case types.GET_LIST_CUSTOMER:
            return [...action.adcustomer];
        default:
            return state;
    }
} 

export default myReducer;