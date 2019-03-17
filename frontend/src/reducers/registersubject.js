import * as types from './../constants/ActionTypes';

var initialState ={
    id:"",
    name:'',
    register_at:"",
    teacher:[]
};
var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.SHOW_TOPIC_REGISTER:
            console.log(action);
            return action.registersubject.data;
        default:
            return {...state};
    }
};

export default myReducer;