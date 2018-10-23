import * as types from './../constants/ActionTypes';

var initialState = {
    username:"",
    id:"",
    is_student:false,
    is_teacher:true,
    is_superuser:false
};
var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.FET_USERS:
        console.log(action);
            return action.users;
        default:
            return state;
    }
};

export default myReducer;