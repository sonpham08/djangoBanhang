import * as types from '../constants/AdminConstants';

var initialState = [];

var myReducer = (state=initialState, action) => {
    var newState = Object.assign([], state);
    let index = "";
    switch(action.type){
        case types.GET_LIST_CATEGORY:
            newState = action.adcategories;
            return [...newState];
        case types.ADD_CATEGORY:
            return [...newState, action.adcategories];
        case types.EDIT_CATEGORY:
            index = newState.findIndex((obj => obj.category_id == action.adcategories.category_id));
            newState[index].name = action.adcategories.name;
            return [...newState];
        case types.DELETE_CATEGORY:
            let status = action.adcategories.status;
            if(status == 'success') {
                index = newState.findIndex((obj => obj.category_id == action.adcategories.category_id));
                newState.splice(index, 1);
            }
            return [...newState];
        case types.GET_CATEGORY_BY_ID:
            return action.adcategories;
        default:
            return state;
    }
} 

export default myReducer;