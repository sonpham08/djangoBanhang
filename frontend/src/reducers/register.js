import * as types from './../constants/ActionTypes';

var initialState ={
    user:"",
    choose_subjects:[]
};
var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.REGISTER_TOPIC:
            console.log(action);
            return {...state};
        default:
            return {...state};
    }
};

export default myReducer;