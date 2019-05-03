import * as types from '../constants/AdminConstants';

var initialState = [
    {
        name: "",
        phone: ""
    }
];

var myReducer = (state=initialState, action) => {
	var newState = Object.assign([], state);
    switch(action.type){
		case types.GET_LIST_STAFF_SHIP:
			newState = action.adstaffship;
            return action.adstaffship;
        case types.ADD_STAFFSHIP:
            return [...newState, action.adstaffship];
        case types.EDIT_STAFFSHIP:
            let idx = newState.findIndex(obj => obj.staff_id == action.adstaffship.staff_id);
            newState[idx] = action.adstaffship;
            return [...newState];
        case types.DELETE_STAFFSHIP:
            let idxdelete = newState.findIndex(obj => obj.staff_id == action.adstaffship.staff_id);
            newState.splice(idxdelete, 1);
            return [...newState];
        default:
            return state;
    }
} 

export default myReducer;