import * as types from './../constants/ActionTypes';
import * as typesUser from './../constants/UserConstants';

var initialState = {
    id: "",
    username: "",
    fullname: "",
    is_superuser: false,
    email: "",
    is_staff_gun: false,
    is_user: false,
    phone: "",
    address: "",
    cmnd: "",
    logging: {
        date: "",
        user: []
    }
}

var myReducer = (state=initialState, action) => {
    var newState = Object.assign({}, state);
    switch(action.type){
        case types.USER_INFO:
            newState.id = action.user.data.id;
            newState.username = action.user.data.username;
            newState.is_staff_gun = action.user.data.is_staff_gun;
            newState.is_superuser = action.user.data.is_superuser;
            newState.is_user = action.user.data.is_user;
            newState.fullname = action.user.data.fullname;
            newState.email = action.user.data.email;
            newState.phone = action.user.data.phone;
            newState.address = action.user.data.address;
            newState.cmnd = action.user.data.cmnd;
            state = newState;
            return state;

        case typesUser.CHANGE_INFO:
            console.log(action.user);
            
            return state;
        case types.GET_LOGGING:
            let get_logging = Object.assign({}, newState.logging);
            get_logging.date = action.user.date,
            get_logging.user = action.user.user;
            newState.logging = get_logging;
            return newState;
        default:
            return state;
    }
} 

export default myReducer;