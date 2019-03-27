import * as types from './../constants/ActionTypes';

var initialState = {
    token: null, 
    error: null,
    loading: false
}

var myReducer = (state=initialState, action) => {
    var newState = Object.assign({}, state);
    switch(action.type){
        case types.AUTH_START:
            newState.error=null;
            newState.loading=true;
            return newState;
        case types.AUTH_SUCCESS:
            newState.token=action.token;
            newState.error=null;
            newState.loading=false;
            state=newState;
            return state;
        case types.AUTH_FAIL:
            newState.error=action.error;
            newState.loading=false;       
            return newState;
        case types.AUTH_LOGOUT:
            newState.token=null;
            return state;
        default:
            return state;
    }
} 

export default myReducer;