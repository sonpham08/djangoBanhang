import * as types from './../constants/ActionTypes';

var initialState = {
    token: null, 
    error: null,
    flag_for_msg: false
}

var myReducer = (state=initialState, action) => {
    var newState = Object.assign({}, state);
    switch(action.type){
        case types.AUTH_START:
            newState.error=null;
            newState.flag_for_msg=false;
            return newState;
        case types.AUTH_SUCCESS:
            newState.token=action.token;
            newState.error=null;
            newState.flag_for_msg=false;
            state=newState;
            return state;
        case types.AUTH_FAIL:
            newState.error=action.error;
            newState.flag_for_msg=true;       
            return newState;
        case types.AUTH_LOGOUT:
            newState.token=null;
            return state;
        case types.REGISTER_FAIL:
            newState.error = action.error;
            state.error = newState;
            return state;
        default:
            return state;
    }
} 

export default myReducer;