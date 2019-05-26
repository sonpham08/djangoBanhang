import * as types from '../constants/UserConstants';
import * as typeAdmin from '../constants/AdminConstants';

var initialState = [];

var myReducer = (state=initialState, action) => {
    var newState = Object.assign([], state);
    switch(action.type){
        case typeAdmin.GET_TRANSPORTER:
            newState = action.transporter;
            return [...newState];
        default:
            return state;
    }
}

export default myReducer;