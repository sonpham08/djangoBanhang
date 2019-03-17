import * as types from './../constants/ActionTypes';

var initialState = {
    lists:[{
        name:"",
        subject:[{
            subjectfield:[]
        }]
    }]
};
var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.GET_LIST_TEACHER_AND_TOPIC:
        console.log(action);
            return {...action.lists.data};
        default:
            return {...state};
    }
};

export default myReducer;