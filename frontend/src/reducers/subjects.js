import * as types from './../constants/ActionTypes';

var initialState ={
    name:'',
    teacher:[]
};
var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.ADD_FIELD:
            console.log(action);
            let newState=Object.assign({}, state)
            newState= action.data
            state = newState;
            return {...state};
        case types.DELETE_FIELD:
            return {...state};
        default:
            return {...state};
    }
};

export default myReducer;