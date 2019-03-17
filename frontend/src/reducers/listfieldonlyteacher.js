import * as types from './../constants/ActionTypes';

var initialState = [
    {
        user:"",
        subjectfield:[]
    }
];
var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.GET_LIST_FIELD_ONLY_TEACHER:
        console.log(action);
            return action.field;
        default:
            return state;
    }
};

export default myReducer;