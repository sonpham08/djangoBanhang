import * as types from '../constants/UserConstants';

var initialState = [
    {
        name: "",
        phone: ""
    }
];

var myReducer = (state=initialState, action) => {
    var newState = Object.assign([], state);
    switch(action.type){
        case types.GET_LIST_STAFFSHIP:
            newState = action.staff;
            return [...newState];
       
        default:
            return state;
    }
} 

export default myReducer;