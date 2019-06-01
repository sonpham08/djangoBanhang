import * as types from '../constants/AdminConstants';

var initialState = {
    "year": {
        "status": "loading",
        "data": null
    }
};

var myReducer = (state=initialState, action) => {
    let newState = Object.assign({}, state);
    switch(action.type){
        case types.STATISTIC_BASIC_YEAR:
            let get_year_basic = Object.assign({}, newState.year);
            get_year_basic.status = action.status;
            get_year_basic.data = null;
            newState.year = get_year_basic;
            return newState;
        case types.RESPONSE_STATISTIC_BASIC_YEAR:
            let response_year_basic = Object.assign({}, newState.year);
            response_year_basic.status = 'loaded';
            response_year_basic.data = action.statistic;
            newState.year = response_year_basic;
            return newState;
        default:
            return state;
    }
} 

export default myReducer;