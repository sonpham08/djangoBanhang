import * as types from './../constants/UserConstants';

var initialState = {
    product: [],
    user: ""
};

var myReducer = (state=initialState, action) => {
    var newState = Object.assign({}, state);
    switch(action.type){
        case types.GET_LIST_CART:
            newState=action.cart;
            return newState;
        case types.ADD_CART:
            newState = action.cart;
            return newState;
        case types.DELETE_CART:
            let index = newState.product.findIndex(obj => obj.cart_id == action.cart_id);
            newState.product.splice(index,1);
            return newState;
        default:
            return state;
    }
} 

export default myReducer;