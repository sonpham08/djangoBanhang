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
        default:
            return state;
    }
} 

export default myReducer;