import * as types from './../constants/ActionTypes';

var initialState = [];
var myReducer = (state = initialState, action) =>{
    let newState=Object.assign([], state);
    switch(action.type){
        case types.ADMIN_GET_INFO_TOPIC_REGISTER:
            newState=action.register;
            return newState;
        case types.LOAD_LIST_HISTORY:
            console.log(action);
            newState=action.register;
            return newState;
        case types.TEACHER_LOAD_LIST_HISTORY:
            console.log(action);
            newState = action.register;
            return newState;
        default:
            return newState;
    }
};

export default myReducer;