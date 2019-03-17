import * as types from './../constants/ActionTypes';

var initialState = {
    id : '',
    name : '',
    register_at:'',
    deadline_at:''
};
var myReducer = (state = initialState, action) =>{
    let newState= Object.assign({},state);
    switch(action.type){
        case types.EDIT_TASK:
            return action.task;
        case types.LOAD_SUBJECT_BE_ACCEPTION:
        console.log(action);
            newState=action.itemEditing;
            return newState;
        default:
            return newState;
    }
};

export default myReducer;