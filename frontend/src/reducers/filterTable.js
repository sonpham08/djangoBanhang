
import * as types from './../constants/ActionTypes';

var initialState = {
    name : '',
};
var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.FILTER_TABLE:
            return {
                name : action.filter.name,
            };
        default:
            return state;
    }
};

export default myReducer;