import * as types from '../constants/StaffContants';

var initialState = [];

var myReducer = (state=initialState, action) => {
    var newState = Object.assign([], state);
    let index = "";
    switch(action.type){
        case types.DETAIL_BILL:
            // return [...newState, ...action.detail];
            return [...action.detail];
        case types.EDIT_BILL_IN_DETAIL:
            index = newState.findIndex(obj => obj.bill.bill_id == action.detail.bill_id);       
            newState[index].bill.status_product = action.detail.status_product;
            newState[index].bill.staff = action.detail.staff;
            return [...newState];
        case types.DELETE_BILL:
            index = newState.findIndex(obj => obj.bill.bill_id == action.detail.bill_id);
            newState.splice(index, 1);
            return [...newState];
        default:
            return state;
    }
} 

export default myReducer;