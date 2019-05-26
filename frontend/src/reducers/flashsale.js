import * as types from '../constants/StaffContants';
import * as typeUSers from '../constants/UserConstants';

var initialState = {
    'flashsale': {
        'data': [],
        'status': 'loading'
    },
    'flashproduct': {
        'data': [],
        'status': 'loading'
    },
    'flashsale_user': {
        'data': [],
        'status': 'loading'
    }
};

var myReducer = (state=initialState, action) => {
    var newState = Object.assign({}, state);
    switch(action.type){
        case types.GET_LIST_FLASH_SALE:
            let obj_flashsale = Object.assign({}, newState.flashsale);
            obj_flashsale.data = action.flashsale;
            obj_flashsale.status = 'loaded';
            newState.flashsale = obj_flashsale;
            return newState;
        case types.OPEN_FLASH_SALE:
            let new_flashsale = Object.assign({}, newState.flashsale);
            new_flashsale.data.unshift(action.flashsale);
            new_flashsale.status = 'loaded';
            newState.flashsale = new_flashsale;
            return newState;
        case types.ADD_FLASH_PRODUCT:
            let new_flashproduct = Object.assign({}, newState.flashproduct);
            new_flashproduct.data.unshift(action.flashproduct);
            new_flashproduct.status = 'loaded';
            newState.flashproduct = new_flashproduct;
            return newState;
        case typeUSers.GET_FLASH_SALE_USER:
            let flashsale_user = Object.assign({}, newState.flashsale_user);
            flashsale_user.data = action.flashsale;
            flashsale_user.status = "loaded";
            newState.flashsale_user = flashsale_user;
            return newState;
        default:
            return state;
    }
} 

export default myReducer;