import * as types from './../constants/ActionTypes';

var initialState = {
    user:'',
    status:'',
    deadline_at:''
};
var myReducer = (state = initialState, action) =>{
    let newState=Object.assign({}, state);
    switch(action.type){
        case types.ACCEPT_TOPIC:
            newState=action.accepted;        
            return newState;
        default:
            return newState;
    }
};

export default myReducer;