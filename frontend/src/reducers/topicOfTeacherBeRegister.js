import * as types from './../constants/ActionTypes';

var initialState ={
    register:[]
};
var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.TOPIC_OF_TEACHER_BE_REGISTER:
            console.log(action);
            let newState={...state};
            newState=action.register.data;
            state.register=newState;
            return state;
        default:
            return {...state};
    }
};

export default myReducer;