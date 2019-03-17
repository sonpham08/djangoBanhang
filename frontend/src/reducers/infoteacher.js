import * as types from './../constants/ActionTypes';

var initialState = {
    data:{
        username:"",
        id:"",
        is_teacher:true,
        email:"",
        user_field:""
    }
};
var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.GET_INFO_TEACHER_BY_ID:
            console.log(action);
            return action.infoteacher;
        default:
            return state;
    }
};

export default myReducer;