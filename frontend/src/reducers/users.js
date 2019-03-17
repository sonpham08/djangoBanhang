import * as types from './../constants/ActionTypes';

var initialState = {
    username:"",
    id:"",
    is_student:false,
    is_teacher:true,
    is_superuser:false,
    fullname:"",
    grade:"",
    email:"",
    mssv:""
};
var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.FET_USERS:
            return action.users;
        case types.STUDENT_UPDATE_INFO:
            let newState= Object.assign({}, state);
            console.log(action);
            newState.fullname=action.users.data.fullname;
            newState.grade=action.users.data.grade;
            newState.email=action.users.data.email;
            newState.mssv=action.users.data.mssv;
            console.log(newState);
            return newState;
        default:
            return state;
    }
};

export default myReducer;