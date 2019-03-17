import * as types from './../constants/ActionTypes';

var initialState = {
    id : '',
    name : '',
};
var myReducer = (state = initialState, action) =>{
    let newState=Object.assign({}, state);
    switch(action.type){
        case types.LOAD_ITEM:
            newState=action.item;
            console.log(newState);
            return newState;

        case types.EDIT_ITEM:
            newState={
                id: action.item.data.id,
                name: action.item.data.name
            }
            console.log(newState);
            return newState;
        default:
            return newState;
    }
};

export default myReducer;