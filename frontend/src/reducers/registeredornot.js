import * as types from './../constants/ActionTypes';

var initialState = false;
var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.CHECK_SUBJECT_REGISTERED_OR_NOT:
            console.log(action);
            console.log(action.registeredornot.data.choose_by.length);
            if(action.registeredornot.data.choose_by.length > 0) {
                return true; // it have been registered
            } else {
                return false;
            }
        default:
            return state;
    }
};

export default myReducer;