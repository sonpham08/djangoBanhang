import * as types from '../constants/UserConstants';

var initialState = [];

var myReducer = (state=initialState, action) => {
    var newState = Object.assign([], state);
    switch(action.type){
        case types.GET_COMMENT:
            newState = action.comment;
            return [...newState];
        case types.USER_COMMENT:
            return [...newState, action.comment];
        default:
            return state;
    }
} 

export default myReducer;