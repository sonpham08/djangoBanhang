import * as types from '../constants/UserConstants';

var initialState = {
    create_date: "",
    total_price: 0,
    address: "",
    status: "",
    user: {},
    status_product: 1,
    staff: {},
    product: [],
};

var myReducer = (state=initialState, action) => {
	var newState = Object.assign({}, state);
    switch(action.type){
		case types.CREATE_BILL:
            newState = action.bill;
            return action.bill;
        default:
            return state;
    }
} 

export default myReducer;