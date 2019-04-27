import * as types from '../constants/UserConstants';

var initialState = [
    {
        name: ""
    }
];

var myReducer = (state=initialState, action) => {
    var newState = Object.assign({}, state);
    switch(action.type){
        case types.USER_GET_CATEGORY_BY_ID:
            newState = action.uscategories;
            return newState;
       
        default:
            return state;
    }
} 

export default myReducer;