import * as types from '../constants/AdminConstants';

var initialState = [];

var myReducer = (state=initialState, action) => {
    var newState = Object.assign([], state);
    let index = "";
    switch(action.type){
        case types.GET_LIST_STAFF:
            return [...action.adstaff];
        case types.EDIT_STAFF_INFO:
            index = newState.findIndex((obj => obj.id == action.adstaff.id));
            newState[index].fullname = action.adstaff.fullname;
            newState[index].phone = action.adstaff.phone;
            newState[index].email = action.adstaff.email;
            newState[index].address = action.adstaff.address;
            newState[index].cmnd = action.adstaff.cmnd;
            return [...newState];
        case types.DELETE_STAFF:
            let status = action.adstaff.status;
            if(status == 'success') {
                index = newState.findIndex((obj => obj.id == action.adstaff.id));
                newState.splice(index, 1);
            }
        default:
            return state;
    }
} 

export default myReducer;