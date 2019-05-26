import * as types from '../constants/UserConstants';

var initialState = [];

var myReducer = (state=initialState, action) => {
    var newState = Object.assign([], state);
    switch(action.type){
        case types.GET_COIN:
            newState = action.coin;
            return [...newState];
        case types.GET_COIN_BY_USER:
            let newCoin = {
                coin_id: action.coin.coin_id,
                count: action.coin.count,
                user: [{user_id: action.coin.user_id, fullname: action.coin.fullname}]
            };
            return [newCoin];
        case types.INITIAL_COIN:
            return [...newState, action.coin];
        case types.ADD_COIN:
            return [...newState, action.coin];
        case types.UPDATE_COIN:
            let index = newState.findIndex(obj => obj.coin_id == action.coin.coin_id);
            newState[index].count = action.coin.count;
            return [...newState];
        default:
            return state;
    }
} 

export default myReducer;