import * as types from '../constants/StaffContants';

var initialState = [
];

var myReducer = (state=initialState, action) => {
    var newState = Object.assign([], state);
    switch(action.type){
        case types.DETAIL_BILL:
            let newBill = action.detail.bill;
            let newProduct = action.detail.product;
            return [...newState, {
                bill: newBill,
                product: newProduct
            }];
        default:
            return state;
    }
} 

export default myReducer;