import * as types from './../constants/ActionTypes';

var initialState = {
    "data":{
        "teachers":[]
    }
};
var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.FET_USERS_TEACHER:
        console.log(action);
            return action.listTeacher;
        default:
            return state;
    }
};

export default myReducer;